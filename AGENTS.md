# AGENTS.md

This file provides guidance to agents and contributors working in this repository.

## Repository role

This repository preserves the standalone Razon Live Lab source while its useful material is evaluated for migration. The target portfolio role is Razon Lab, the experimental research and prototyping arm of RazonWorks.

Razon Lab serves technical peers, builders, and security researchers who want to inspect an experiment, benchmark, writeup, or demo. Its proof comes from methods, environments, observations, limitations, and reproducible artifacts. It is not a commercial intake site, a beginner course catalog, a general creator directory, or a second personal portfolio.

The canonical portfolio decision and contract live in the RazonWorks repository at `RazonIn4K/razonworks/docs/adr/0038-portfolio-brand-and-content-ownership.md`, `RazonIn4K/razonworks/docs/brand/portfolio-charter.md`, and `RazonIn4K/razonworks/docs/brand/content-ownership-ledger.md`. This repository's local boundary must not contradict them. If the documents conflict, pause public changes and reconcile the canonical decision and local boundary together before implementation.

Read [docs/BRAND-BOUNDARY.md](docs/BRAND-BOUNDARY.md) before changing content, links, hosting, or migration plans.

## Current source layout

```text
index.html   Current standalone site, including HTML, inline CSS, metadata,
             structured data, visible copy, and outbound link configuration.
favicon.png Current logo and favicon asset.
og.png      Current social preview image.
README.md   Repository status, change-control rules, and migration boundary.
```

There is no package manifest or build step. Do not add a framework merely to complete the governance phase.

## Portfolio ownership

- RazonWorks is the only owner of commercial services and client intake.
- High Encode Learning owns curriculum, tutorials, learning paths, and learner support.
- DavidTiz owns David's personal identity, curated proof, personal operating notes, and personal contact.
- Razon Lab owns reproducible experiments, benchmarks, evaluations, prototypes, and research artifacts as part of RazonWorks.

When another property needs context, summarize and link to the canonical artifact. Do not duplicate a full service description, lesson, personal case narrative, or experiment report.

## Evidence contract for future Lab material

A Lab artifact should record the fields that apply:

- date and status;
- question or hypothesis;
- environment, versions, and relevant configuration;
- protocol or method;
- observed or reproduced result;
- evidence status and source links;
- limitations and unresolved uncertainty;
- sanitized artifacts or reproduction steps;
- next test.

Use evidence-safe terms such as `observed`, `reproduced`, `inferred`, and `unverified`. Do not invent experiments, clients, outcomes, metrics, security impact, or production status. Do not publish secrets, customer data, private provider output, or unsafe reproduction material.

## Current migration-inventory boundary

The paired `/lab` and `/es/lab` routes now exist in local RazonWorks source.
Their hosted behavior has not been verified. This repository's current slice
adds a source inventory and a local integrity test only. It does not authorize
or complete any of the following:

- changing `index.html`, `favicon.png`, or `og.png`;
- deploying or connecting the repository to Vercel;
- changing `razonlab.com`, DNS, redirects, canonicals, robots rules, or analytics;
- deleting or archiving the standalone source;
- claiming that a replacement destination is live.

No redirect from the standalone domain is authorized until both RazonWorks
routes have verified hosted behavior, useful source material has been
preserved, and the user approves the cutover.

## Safe migration order

1. Inventory the current source and classify each item as preserve, rewrite,
   retire, or verify. Completed in local source on 2026-08-10.
2. Build paired `/lab` and `/es/lab` destinations inside RazonWorks with evidence fields and language parity.
3. Verify metadata, canonical behavior, links, accessibility, responsive layouts, and hosted behavior.
4. Preserve any standalone material that needs an archive URL or artifact record.
5. Propose the domain redirect separately and obtain explicit approval.
6. Verify the redirect and destination after an authorized cutover.

Do not reverse this order. A planned route or local build is not a hosted destination.

## Local validation

For migration-inventory changes, review the diff and run:

```bash
node --test tests/migration-inventory.test.mjs
git diff --check
```

Record browser, provider, Vercel, DNS, redirect, and live-domain checks as not run unless they were separately authorized and completed.
