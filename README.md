# Razon Lab Migration Source

This repository preserves the standalone Razon Live Lab source while useful material is evaluated for migration. The selected portfolio role is Razon Lab, the experimental research and prototyping arm of RazonWorks.

The repository remains a static site with one self-contained HTML file and no
build step. The current source candidate replaces the learning-and-broadcast
presentation with an evidence-led Lab boundary and a zero-record experiment
ledger. It also replaces the outdated live-stream social card. These are source
changes only; no hosting, domain, or redirect behavior has been changed here.

## Brand role

- **Audience:** technical peers, builders, and security researchers.
- **Job:** make an experiment, benchmark, writeup, or demo inspectable.
- **Proof:** method, environment, observations, limitations, evidence status, and reproducible artifacts.
- **Not owned here:** commercial services and client intake, beginner curriculum, or David's personal portfolio and contact hub.

RazonWorks owns commercial services and client intake. High Encode Learning owns education. DavidTiz owns personal identity and curated proof. Full experimental research artifacts belong to Razon Lab as part of RazonWorks.

The canonical portfolio decision and contract live in the `RazonIn4K/razonworks` repository at `docs/adr/0039-portfolio-brand-and-content-ownership.md`, `docs/brand/portfolio-charter.md`, and `docs/brand/content-ownership-ledger.md`. Read [docs/BRAND-BOUNDARY.md](docs/BRAND-BOUNDARY.md) for the local evidence and migration rules.

## Files

- `index.html`: the standalone evidence-led Lab source, including inline CSS, metadata, minimal structured data, and visible copy.
- `favicon.png`: current logo and favicon.
- `og.png`: 1200 x 630 research-led social preview image. It was generated on
  2026-08-12 from the repository's prior `og.png` as an edit reference, then
  downscaled and losslessly optimized locally. The generated visual contains
  no third-party media, people, customer material, or externally licensed
  assets; repository ownership and final publication approval remain with the
  project owner.
- `docs/BRAND-BOUNDARY.md`: target brand contract, evidence standard, and migration guardrails.
- `docs/migration/standalone-source-inventory.json`: source revision, runtime
  hashes, artifact classifications, and required follow-up evidence.
- `tests/migration-inventory.test.mjs`: fail-closed inventory and runtime-byte
  integrity checks.
- `tests/source-boundary.test.mjs`: public-copy, schema, link, discovery, and
  social-image boundary checks.
- `AGENTS.md`: contributor instructions and safe migration order.

## Planned destination

RazonWorks `/lab` and `/es/lab` exist in local source as of 2026-08-10. This
repository has not verified a preview or production deployment. Do not describe
the routes as live.

No standalone-domain redirect is authorized until both routes are hosted,
their English and Spanish behavior is verified there, useful source material
is preserved, and the user approves the cutover.

## Hosting record and change control

The previous README recorded Vercel project `razonlab-site` and production domain `razonlab.com`, and stated that the repository was not connected for push-to-deploy. Those details have not been treated as current provider evidence in this source packet.

Do not deploy, connect Git, change Vercel settings, alter DNS, delete the standalone source, or configure a redirect without explicit authorization. A local documentation change is not evidence of hosted state.

## Source-candidate validation

For this stacked source packet:

```bash
node --test tests/*.test.mjs
git diff --check
```

Inspect `index.html` at 320, 390, 768, and 1440 CSS pixels before publication.
Provider, DNS, redirect, and live-domain state remain separately unverified.
