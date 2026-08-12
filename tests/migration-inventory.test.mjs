import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const inventoryPath = path.join(
  repositoryRoot,
  "docs/migration/standalone-source-inventory.json",
);
const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));

const requiredArtifactIds = [
  "metadata",
  "structured-identity",
  "structured-broadcast",
  "hero",
  "schedule",
  "stream-loop",
  "safety-rule",
  "channel-links",
  "related-directory",
  "contact",
  "navigation",
  "favicon",
  "social-image",
  "analytics-placeholder",
  "discovery-files",
];

const allowedClassifications = new Set([
  "preserve",
  "rewrite",
  "retire",
  "verify",
]);
const allowedEvidenceStatuses = new Set([
  "source-observed",
  "asset-hash-observed",
  "external-observed",
  "external-unverified",
  "claim-unverified",
]);

test("pins the preserved runtime source without selecting a migration owner", () => {
  assert.equal(inventory.schemaVersion, 2);
  assert.match(inventory.sourceRevision, /^[0-9a-f]{40}$/);
  assert.equal(
    inventory.sourceRevision,
    "4ee09a343c10f3ff5177f617193585640f067aab",
  );
  assert.equal(inventory.targetRepository, null);
  assert.deepEqual(inventory.targetRoutes, []);
  assert.equal(inventory.targetHostedState, "unverified");
  assert.equal(inventory.identityDecision, "RazonIn4K/razonworks#160");
  assert.equal(inventory.candidateStatus, "local-source-only");
  assert.equal(inventory.candidateDeploymentAuthorized, false);
  assert.equal(inventory.candidateRedirectAuthorized, false);
  assert.equal(inventory.candidateCanonical, "https://razonlab.com/");
});

test("preserves hashes for every pinned source runtime file", () => {
  assert.deepEqual(
    inventory.preservedRuntimeFiles.map((file) => file.path).sort(),
    ["favicon.png", "index.html", "og.png"],
  );

  for (const file of inventory.preservedRuntimeFiles) {
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
    const sourceBytes = execFileSync(
      "git",
      ["show", `${inventory.sourceRevision}:${file.path}`],
      { cwd: repositoryRoot, encoding: null },
    );
    const sourceDigest = createHash("sha256").update(sourceBytes).digest("hex");

    assert.equal(sourceDigest, file.sha256, `${file.path} source digest drifted`);
  }
});

test("matches every local source candidate file to its recorded digest", async () => {
  assert.deepEqual(
    inventory.candidateRuntimeFiles.map((file) => file.path).sort(),
    ["favicon.png", "index.html", "og.png", "robots.txt", "sitemap.xml"],
  );

  for (const file of inventory.candidateRuntimeFiles) {
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
    const currentBytes = await readFile(path.join(repositoryRoot, file.path));
    const currentDigest = createHash("sha256").update(currentBytes).digest("hex");

    assert.equal(currentDigest, file.sha256, `${file.path} candidate digest drifted`);
  }
});

test("records the bounded external-link verification", () => {
  assert.deepEqual(
    inventory.candidateExternalLinks.map((link) => link.id),
    ["youtube", "twitch", "x", "personal", "razonworks", "high-encode"],
  );
  assert.deepEqual(
    inventory.candidateExternalLinks.map((link) => link.url),
    [
      "https://www.youtube.com/@razonlab",
      "https://www.twitch.tv/razonlab",
      "https://x.com/Razonapp",
      "https://davidtiz.com/",
      "https://razonworks.com/",
      "https://highencodelearning.com/",
    ],
  );

  for (const link of inventory.candidateExternalLinks) {
    assert.equal(link.verifiedAt, "2026-08-12");
    assert.equal(link.evidenceStatus, "external-observed");
    assert.ok(link.publicIdentity.trim());
    assert.ok(link.claimBoundary.trim());
  }

  for (const id of ["razonworks", "high-encode"]) {
    const link = inventory.candidateExternalLinks.find((item) => item.id === id);
    assert.match(link.claimBoundary, /classification-neutral/i);
    assert.match(link.claimBoundary, /no relationship is asserted/i);
  }
});

test("keeps the standalone canonical until an authorized redirect", () => {
  assert.equal(inventory.candidateCanonical, "https://razonlab.com/");
  assert.equal(inventory.candidateRedirectAuthorized, false);

  const metadata = inventory.artifacts.find((artifact) => artifact.id === "metadata");
  assert.match(metadata.destination, /Keep https:\/\/razonlab\.com\/ canonical/);
  assert.match(metadata.followUp, /change the canonical only with an authorized redirect/i);

  const discovery = inventory.artifacts.find(
    (artifact) => artifact.id === "discovery-files",
  );
  assert.match(discovery.destination, /one crawlable standalone canonical/i);
  assert.match(discovery.followUp, /canonical or redirect decision/i);
});

test("does not freeze unresolved ownership or sibling classifications", () => {
  const serialized = JSON.stringify(inventory);
  for (const forbidden of [
    "experimental arm of RazonWorks",
    "experimental research arm of RazonWorks",
    "Commercial project routing",
    "learning-surface routing",
    "Use only RazonWorks-approved analytics",
  ]) {
    assert.equal(serialized.includes(forbidden), false, `frozen classification: ${forbidden}`);
  }
});

test("classifies every required source artifact with a fail-closed follow-up", () => {
  const ids = inventory.artifacts.map((artifact) => artifact.id);
  assert.equal(new Set(ids).size, ids.length, "artifact IDs must be unique");
  assert.deepEqual([...ids].sort(), [...requiredArtifactIds].sort());

  for (const artifact of inventory.artifacts) {
    assert.ok(artifact.kind.trim());
    assert.ok(artifact.source.trim());
    assert.ok(Array.isArray(artifact.selectors) && artifact.selectors.length > 0);
    assert.ok(allowedClassifications.has(artifact.classification));
    assert.ok(artifact.destination.trim());
    assert.ok(allowedEvidenceStatuses.has(artifact.evidenceStatus));
    assert.ok(artifact.followUp.trim());
  }
});

test("applies the canonical dispositions to schedules, channels, contact, and broadcast claims", () => {
  const artifacts = Object.fromEntries(
    inventory.artifacts.map((artifact) => [artifact.id, artifact]),
  );

  for (const id of ["schedule", "contact", "structured-broadcast"]) {
    assert.match(artifacts[id].evidenceStatus, /unverified$/);
  }

  assert.equal(artifacts["schedule"].classification, "retire");
  assert.equal(artifacts["structured-broadcast"].classification, "retire");
  assert.equal(artifacts["contact"].classification, "rewrite");
  assert.equal(artifacts["channel-links"].classification, "rewrite");
  assert.equal(artifacts["channel-links"].evidenceStatus, "external-observed");
  assert.equal(artifacts["related-directory"].classification, "retire");
  assert.equal(artifacts["stream-loop"].classification, "preserve");

  for (const id of ["metadata", "hero", "structured-identity", "safety-rule"]) {
    assert.equal(artifacts[id].classification, "rewrite");
    assert.notEqual(artifacts[id].classification, "preserve");
  }
});
