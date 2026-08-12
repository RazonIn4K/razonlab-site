# Razon Lab Migration Source

This repository preserves the standalone Razon Live Lab source while useful material is evaluated for migration. The selected source role is an evidence-led Razon Lab experiment ledger.

The repository remains a static site with one self-contained HTML file and no
build step. The current source candidate replaces the learning-and-broadcast
presentation with an evidence-led Lab boundary and a zero-record experiment
ledger. It keeps only public channel destinations verified on 2026-08-12,
without a recurring availability claim, and keeps sibling-site links
classification-neutral. It also replaces the outdated live-stream social card.
These are source changes only; no hosting, domain, or redirect behavior has
been changed here.

## Brand role

- **Audience:** technical peers, builders, and security researchers.
- **Job:** make an experiment, benchmark, writeup, or demo inspectable.
- **Proof:** method, environment, observations, limitations, evidence status, and reproducible artifacts.
- **Not represented here:** service intake, curriculum, or David's personal portfolio and contact hub.

DavidTiz is the current personal portfolio and collaboration surface.
RazonWorks and High Encode Learning are retained only as verified public-site
destinations. Their presence does not classify a legal, ownership, commercial,
learning, payment, contract, domain, replacement, or organizational
relationship.

The unresolved identity decision is tracked in `RazonIn4K/razonworks#160`.
Read [docs/BRAND-BOUNDARY.md](docs/BRAND-BOUNDARY.md) for the local evidence and
migration rules.

## Files

- `index.html`: the standalone evidence-led Lab source, including inline CSS, metadata, minimal structured data, and visible copy.
- `favicon.png`: current logo and favicon.
- `og.png`: 1200 x 630 research-led social preview image. It was generated on
  2026-08-12 from the repository's prior `og.png` as an edit reference, then
  downscaled and losslessly optimized locally. The generated visual contains
  no third-party media, people, customer material, or externally licensed
  assets. The recorded provenance does not replace final publication approval.
- `docs/BRAND-BOUNDARY.md`: target brand contract, evidence standard, and migration guardrails.
- `docs/migration/standalone-source-inventory.json`: source revision, runtime
  hashes, artifact classifications, and required follow-up evidence.
- `tests/migration-inventory.test.mjs`: fail-closed inventory and runtime-byte
  integrity checks.
- `tests/source-boundary.test.mjs`: public-copy, schema, link, discovery, and
  social-image boundary checks.
- `AGENTS.md`: contributor instructions and safe migration order.

## Verified external destinations

The candidate links below were checked through their public HTTP response and
page metadata on 2026-08-12. This verifies the destination and displayed public
identity only; it does not verify a publishing cadence, future availability, or
the content of any post or stream.

- YouTube: `https://www.youtube.com/@razonlab` (`Razon Live Lab`)
- Twitch: `https://www.twitch.tv/razonlab` (`RazonLab`)
- X: `https://x.com/Razonapp` (`Razon Live Lab`, `@Razonapp`)
- DavidTiz: `https://davidtiz.com/` (personal portfolio)
- RazonWorks: `https://razonworks.com/` (verified current website destination; classification-neutral)
- High Encode Learning: `https://highencodelearning.com/` (verified current website destination; classification-neutral)

## Candidate migration state

Candidate `/lab` and `/es/lab` routes exist in separate local source as of
2026-08-10. This repository has not selected a migration destination or
verified a preview or production deployment. Do not describe the routes as live
or infer their relationship to this standalone site.

No standalone-domain redirect is authorized until a destination is selected,
its hosted behavior is verified, useful source material is preserved, the
identity decision is resolved, and the user approves the cutover.

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
