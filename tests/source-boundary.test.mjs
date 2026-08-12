import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(path.join(repositoryRoot, "index.html"), "utf8");

function attributeValues(name) {
  return [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, "g"))].map(
    (match) => match[1],
  );
}

test("publishes the standalone Lab relationship and evidence contract", () => {
  assert.match(html, /Experimental research arm of RazonWorks/);
  assert.match(html, /Experiments earn their claims here\./);
  assert.match(html, /A result is not yet a record\./);
  assert.match(html, /The public experiment ledger is intentionally empty\./);

  for (const field of [
    "Date",
    "Environment and versions",
    "Hypothesis",
    "Method",
    "Observed result",
    "Evidence status",
    "Limitations",
    "Artifacts",
    "Next test",
  ]) {
    assert.match(html, new RegExp(`<strong>${field}</strong>`));
  }
});

test("removes unverified broadcast, schedule, directory, and identity assertions", () => {
  for (const forbidden of [
    "BroadcastEvent",
    "jobTitle",
    "worksFor",
    "sameAs",
    "Mon-Fri",
    "6:00-8:00",
    "Raw Dogging Programming",
    "Learning programming",
    "Related work by David",
    "youtube.com",
    "twitch.tv",
    "x.com/",
    "davidtiz.com",
    "mailto:",
    "data-link",
  ]) {
    assert.equal(html.includes(forbidden), false, `found retired assertion: ${forbidden}`);
  }
});

test("uses minimal, non-duplicated WebSite and WebPage schema", () => {
  const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(match, "JSON-LD block is required");
  const graph = JSON.parse(match[1]);

  assert.deepEqual(
    graph.map((node) => node["@type"]),
    ["WebSite", "WebPage"],
  );
  assert.equal(graph[0].url, "https://razonlab.com/");
  assert.equal(graph[1].isPartOf["@id"], "https://razonlab.com/#website");
  assert.equal(html.match(/<script\b/g)?.length, 1);
});

test("keeps discovery metadata and outbound navigation bounded", () => {
  assert.equal(
    html.match(/<link rel="canonical" href="https:\/\/razonlab\.com\/">/g)?.length,
    1,
  );
  assert.match(html, /<meta property="og:image:width" content="1200">/);
  assert.match(html, /<meta property="og:image:height" content="630">/);
  assert.match(
    html,
    /<meta property="og:image:alt" content="Razon Lab research flask and Evidence before adoption message">/,
  );

  const hrefs = attributeValues("href");
  for (const href of hrefs) {
    assert.ok(
      href.startsWith("#") ||
        href === "favicon.png" ||
        href === "https://razonlab.com/" ||
        href === "https://razonworks.com/",
      `unexpected link destination: ${href}`,
    );
  }
});

test("preserves the accessibility and reduced-motion boundary", () => {
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<nav aria-label="Primary">/);
  assert.equal(html.match(/<h1\b/g)?.length, 1);
  assert.match(html, /a:focus-visible\{outline:3px solid var\(--amber\)/);
  assert.match(
    html,
    /@media\(prefers-reduced-motion:reduce\)\{html\{scroll-behavior:auto\}\}/,
  );

  const ids = attributeValues("id");
  assert.equal(new Set(ids).size, ids.length, "element IDs must be unique");
  assert.equal(attributeValues("alt").length, html.match(/<img\b/g)?.length);
});

test("declares a 320px navigation layout without horizontal scrolling", () => {
  assert.match(html, /@media\(max-width:360px\)/);
  assert.match(
    html,
    /@media\(max-width:360px\)\{[\s\S]*?\.nav nav\{display:grid; grid-template-columns:1fr 1fr; gap:5px 12px; font-size:\.78rem\}/,
  );
  assert.match(
    html,
    /@media\(max-width:360px\)\{[\s\S]*?\.nav nav a\{white-space:normal\}/,
  );
});

test("serves a correctly sized PNG social card", async () => {
  const image = await readFile(path.join(repositoryRoot, "og.png"));
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});
