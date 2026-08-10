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
  "external-unverified",
  "claim-unverified",
]);

test("pins the preserved runtime source and paired local target routes", () => {
  assert.equal(inventory.schemaVersion, 1);
  assert.match(inventory.sourceRevision, /^[0-9a-f]{40}$/);
  assert.equal(
    inventory.sourceRevision,
    "4ee09a343c10f3ff5177f617193585640f067aab",
  );
  assert.deepEqual(inventory.targetRoutes, ["/lab", "/es/lab"]);
  assert.equal(inventory.targetHostedState, "unverified");
});

test("matches every runtime file to its pinned Git blob and inventory SHA-256", async () => {
  assert.deepEqual(
    inventory.runtimeFiles.map((file) => file.path).sort(),
    ["favicon.png", "index.html", "og.png"],
  );

  for (const file of inventory.runtimeFiles) {
    assert.match(file.sha256, /^[0-9a-f]{64}$/);
    const currentBytes = await readFile(path.join(repositoryRoot, file.path));
    const sourceBytes = execFileSync(
      "git",
      ["show", `${inventory.sourceRevision}:${file.path}`],
      { cwd: repositoryRoot, encoding: null },
    );
    const currentDigest = createHash("sha256").update(currentBytes).digest("hex");
    const sourceDigest = createHash("sha256").update(sourceBytes).digest("hex");

    assert.equal(sourceDigest, file.sha256, `${file.path} source digest drifted`);
    assert.equal(currentDigest, sourceDigest, `${file.path} no longer matches pinned source`);
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

test("does not preserve unverified schedules, channels, contact, or broadcast claims as truth", () => {
  const artifacts = Object.fromEntries(
    inventory.artifacts.map((artifact) => [artifact.id, artifact]),
  );

  for (const id of [
    "schedule",
    "channel-links",
    "contact",
    "structured-broadcast",
  ]) {
    assert.equal(artifacts[id].classification, "verify");
    assert.match(artifacts[id].evidenceStatus, /unverified$/);
  }

  assert.equal(artifacts["related-directory"].classification, "retire");
  assert.equal(artifacts["stream-loop"].classification, "preserve");

  for (const id of ["metadata", "hero", "structured-identity", "safety-rule"]) {
    assert.equal(artifacts[id].classification, "rewrite");
    assert.notEqual(artifacts[id].classification, "preserve");
  }
});
