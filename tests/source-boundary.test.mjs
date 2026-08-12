import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(path.join(repositoryRoot, "index.html"), "utf8");
const governanceText = (
  await Promise.all(
    [
      "index.html",
      "AGENTS.md",
      "README.md",
      "docs/BRAND-BOUNDARY.md",
      "docs/migration/standalone-source-inventory.json",
    ].map((file) => readFile(path.join(repositoryRoot, file), "utf8")),
  )
).join("\n");

function attributeValues(name) {
  return [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, "g"))].map(
    (match) => match[1],
  );
}

test("publishes the standalone Lab evidence contract", () => {
  assert.match(html, /Public experiment ledger/);
  assert.match(html, /Experiments earn their claims here\./);
  assert.match(html, /A result is not yet a record\./);
  assert.match(html, /The public experiment ledger is intentionally empty\./);
  assert.match(html, /Current public channels/);
  assert.match(html, /Use the front door that matches the question\./);

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

test("removes unverified broadcast, cadence, email, and identity assertions", () => {
  for (const forbidden of [
    "BroadcastEvent",
    "isLiveBroadcast",
    "eventSchedule",
    "jobTitle",
    "worksFor",
    "sameAs",
    "Mon-Fri",
    "6:00-8:00",
    "Monday to Friday",
    "Live on Twitch",
    "Raw Dogging Programming",
    "Learning programming",
    "Related work by David",
    "mailto:",
    "data-link",
    "High Encode Learning LLC",
    "experimental research arm of RazonWorks",
    "research arm of RazonWorks",
    "Commercial services",
    "Commercial requests",
    "commercial project",
    "learning surface",
    "guided practice",
    "owner-link",
  ]) {
    assert.equal(
      html.toLowerCase().includes(forbidden.toLowerCase()),
      false,
      `found retired assertion: ${forbidden}`,
    );
  }
});

test("publishes only the verified public channel destinations without cadence claims", () => {
  for (const [label, url] of [
    ["YouTube", "https://www.youtube.com/@razonlab"],
    ["Twitch", "https://www.twitch.tv/razonlab"],
    ["X", "https://x.com/Razonapp"],
  ]) {
    assert.match(html, new RegExp(`<h3>${label}</h3>`));
    assert.equal(attributeValues("href").filter((href) => href === url).length, 1);
  }

  assert.match(html, /Each platform is the source for its own availability\./);
  assert.match(html, /only after it meets the publication standard above\./);
});

test("keeps sibling links classification-neutral and personal routing explicit", () => {
  assert.match(html, /href="https:\/\/davidtiz\.com\/"/);
  assert.match(html, /href="https:\/\/razonworks\.com\/"/);
  assert.match(html, /href="https:\/\/highencodelearning\.com\/"/);
  assert.match(html, /personal portfolio and context for collaboration/);
  assert.match(html, /Open the current RazonWorks website\./);
  assert.match(html, /Open the current High Encode Learning website\./);
  assert.match(html, /does not define a legal, business, payment, contractual, or organizational relationship\./);
  assert.doesNotMatch(html, /RazonWorks (?:is|as|belongs|operates|owns) (?:a|an|the|under)/i);
  assert.doesNotMatch(html, /High Encode Learning (?:is|as|belongs|operates|owns) (?:a|an|the|under)/i);
});

test("forbids the frozen sibling ownership and role classifications", () => {
  for (const forbidden of [
    "experimental research arm of RazonWorks",
    "experimental research and prototyping arm of RazonWorks",
    "experimental arm of RazonWorks",
    "as part of RazonWorks",
    "RazonWorks owns",
    "RazonWorks is the only owner",
    "RazonWorks is the current public route for commercial",
    "current RazonWorks request surface",
    "Commercial project routing",
    "High Encode Learning owns",
    "High Encode Learning is the current learning surface",
    "current learning surface for structured lessons",
    "learning-surface routing",
  ]) {
    assert.equal(
      governanceText.toLowerCase().includes(forbidden.toLowerCase()),
      false,
      `frozen governance classification: ${forbidden}`,
    );
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
        href === "https://www.youtube.com/@razonlab" ||
        href === "https://www.twitch.tv/razonlab" ||
        href === "https://x.com/Razonapp" ||
        href === "https://davidtiz.com/" ||
        href === "https://razonworks.com/" ||
        href === "https://highencodelearning.com/",
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
    /@media\(prefers-reduced-motion:reduce\)\{[\s\S]*?html\{scroll-behavior:auto\}/,
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
