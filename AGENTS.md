# AGENTS.md

This file provides guidance to agents and contributors working in this repository.

## Repository role

This repository preserves the standalone Razon Live Lab source while its useful material is evaluated for migration. The accepted portfolio role is Razon Lab, the experimental research and prototyping arm of RazonWorks.

Razon Lab serves technical peers, builders, and security researchers who want to inspect an experiment, benchmark, writeup, or demo. Its proof comes from methods, environments, observations, limitations, and reproducible artifacts. It is not a commercial intake site, a beginner course catalog, a general creator directory, or a second personal portfolio.

The canonical public content decision lives in the RazonWorks repository at
`RazonIn4K/razonworks/docs/adr/0039-portfolio-brand-and-content-ownership.md`,
`RazonIn4K/razonworks/docs/brand/portfolio-charter.md`, and
`RazonIn4K/razonworks/docs/brand/content-ownership-ledger.md`. The separate
legal, DBA, contracting, payment, privacy-controller, and RazonWorks-High
Encode relationship decision remains unresolved in `RazonIn4K/razonworks#160`.
Do not treat the accepted content role as an answer to that identity decision.

Read [docs/BRAND-BOUNDARY.md](docs/BRAND-BOUNDARY.md) before changing content, links, hosting, or migration plans.

## Current source layout

```text
index.html   Current standalone site, including HTML, inline CSS, metadata,
             structured data, visible copy, and bounded navigation.
favicon.png Current logo and favicon asset.
og.png      Current social preview image.
README.md   Repository status, change-control rules, and migration boundary.
```

There is no package manifest or build step. Do not add a framework merely to complete the governance phase.

## Public content routing and identity boundary

- RazonWorks owns the commercial content role and current project-request route.
- High Encode Learning owns the learning content role.
- DavidTiz owns David's personal portfolio and collaboration context.
- Razon Lab publishes reproducible experiments, benchmarks, evaluations,
  prototypes, and research artifacts as the experimental arm of RazonWorks.

These are public content-routing roles. They do not identify a legal entity,
DBA, contracting party, merchant or payment recipient, privacy data controller,
domain registrant, or the legal relationship between RazonWorks and High Encode
Learning. Issue `RazonIn4K/razonworks#160` remains the decision record for those
unresolved roles.

When another website needs context, summarize and link to the relevant artifact. Do not duplicate a full service description, lesson, personal case narrative, or experiment report.

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

## Current source-candidate boundary

The paired `/lab` and `/es/lab` target routes exist in local RazonWorks source.
Their hosted behavior has not been verified. This source-only candidate awaiting
approval preserves the inventory, rewrites the standalone presentation as an
evidence-led Lab surface, restores only verified public channel destinations
without a fixed availability claim, routes visitor intent to the current public
surfaces without settling legal identity, preserves the standalone canonical,
replaces the outdated social card, and adds local integrity tests. It does not
authorize or complete any of the following:

- deploying or connecting the repository to Vercel;
- changing the hosted `razonlab.com` artifact, DNS, redirects, provider
  settings, or analytics;
- deleting or archiving the standalone source;
- claiming that a replacement destination is live.

No redirect from the standalone domain is authorized until both target routes
have verified hosted behavior, useful source material has been preserved, the
identity decision is resolved where it affects publication, and the user
approves the cutover.

## Safe migration order

1. Inventory the current source and classify each item as preserve, rewrite,
   retire, or verify. Completed in local source on 2026-08-10.
2. Build paired `/lab` and `/es/lab` destinations in RazonWorks with evidence
   fields and language parity without inferring legal identity.
3. Verify metadata, canonical behavior, links, accessibility, responsive layouts, and hosted behavior.
4. Preserve any standalone material that needs an archive URL or artifact record.
5. Propose the domain redirect separately and obtain explicit approval.
6. Verify the redirect and destination after an authorized cutover.

Do not reverse this order. A planned route or local build is not a hosted destination.

## Local validation

For source or migration-inventory changes, review the diff and run:

```bash
node --test tests/*.test.mjs
git diff --check
```

Inspect the source at 390, 768, and 1440 CSS pixels when runtime files change.
Record provider, Vercel, DNS, redirect, and live-domain checks as not run unless
they were separately authorized and completed.
