import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const canonical = "https://razonlab.com/";
const sitemapUrl = `${canonical}sitemap.xml`;
const robots = await readFile(path.join(repositoryRoot, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(repositoryRoot, "sitemap.xml"), "utf8");

test("allows the standalone public site and advertises its canonical sitemap", () => {
  assert.equal(
    robots,
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`,
  );
});

test("publishes the exact one-entry standalone sitemap", () => {
  assert.equal(
    sitemap,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonical}</loc>
  </url>
</urlset>
`,
  );
});
