# Razon Lab Brand Boundary

> Razon Lab is the experimental research arm of RazonWorks. It publishes inspectable experiment records with explicit evidence and limitations.

## Authority

The accepted public content role is governed by the RazonWorks ADR, portfolio
charter, and content-ownership ledger. The legal entity, DBA, contracting,
payment, privacy-controller, domain-ownership, and RazonWorks-High Encode
relationship remains unresolved in `RazonIn4K/razonworks#160`. This repository
must preserve the accepted content role without presenting it as an answer to
those separate identity questions.

## Brand contract

- **Role:** experimental research and prototyping arm of RazonWorks.
- **Primary audience:** technical peers, builders, and security researchers.
- **Visitor situation:** evaluating how an emerging AI, automation, or security system behaved under a stated method and environment.
- **One job:** make a specific experiment, benchmark, writeup, or demo inspectable.
- **Working promise:** publish reproducible experiments and prototypes before RazonWorks treats an approach as client-ready, and only after the evidence and limitations are inspectable.
- **Primary action:** inspect the method, evidence, limitations, artifacts, and next test.
- **Proof mode:** research method, environment details, observations, reproduction evidence, and limitations.
- **Voice:** precise, calm, testable, and explicit about uncertainty.
- **Visual thesis:** an experiment log whose structure makes evidence status easy to scan, not a services homepage or course catalog.

## In-scope subjects

- experiments, benchmarks, evaluations, and prototypes;
- emerging AI, automation, and security-system behavior;
- methods, environments, versions, observed results, limitations, and artifacts;
- follow-up questions, failed attempts, and next tests.

## Explicit exclusions

- service packages, pricing, consultation intake, or outcome promises;
- curriculum, general tutorials, course enrollment, or learner support;
- David's full personal story, broad portfolio, employment pitch, or personal contact hub;
- unsupported claims, generic trend commentary, or hype presented as a result.

## Public content-routing boundary

- Send commercial service and project-request intent to the current RazonWorks request surface.
- Send structured learning intent to the current High Encode Learning surface.
- Send David's personal, collaboration, speaking, and peer context to DavidTiz.
- Keep the full experiment record with Razon Lab. Another website may summarize and link to the record without duplicating it.

These content-routing roles do not identify a legal entity, DBA, contracting
party, merchant or payment recipient, privacy data controller, domain owner, or
the legal relationship between RazonWorks and High Encode Learning. Issue
`RazonIn4K/razonworks#160` remains the decision record for that unresolved
boundary.

## Evidence standard

Every future experiment page should include the applicable fields:

1. date and publication status;
2. question or hypothesis;
3. environment, versions, and configuration needed to interpret the result;
4. protocol or method;
5. result labeled as observed, reproduced, inferred, or unverified;
6. supporting sources and sanitized artifacts;
7. limitations, failed conditions, and uncertainty;
8. next test.

Do not turn a local demonstration into a claim about production systems, population prevalence, customer harm, or guaranteed security. Never invent results, metrics, clients, testimonials, or deployment status. Never publish secrets, customer data, access tokens, private provider output, or unsafe artifacts.

## Current repository status

This repository contains a self-contained `index.html`, `favicon.png`, and
`og.png`. The current source candidate identifies Razon Lab as the experimental
research arm of RazonWorks and an evidence-led experiment ledger, exposes the
evidence contract, and presents an explicit zero-record state. It retires
learning-in-public, recurring availability, generic channel-directory, broad
contact, and unsupported identity-schema claims. It restores only channel
destinations verified on 2026-08-12 and routes visitor intent without settling
legal identity.

The source inventory at
`docs/migration/standalone-source-inventory.json` now pins the preserved source
revision and runtime hashes, classifies each migration artifact, and keeps
the preserved Phase 0 digests separate from candidate runtime digests. The
inventory and source tests keep recurring availability, unverified contact, and
broadcast claims fail-closed. Current destination checks establish URL and
public-metadata identity only; they do not verify cadence, post content, or
future availability.

The hosting and domain details in the README are repository records. They were not live-verified by the documentation-only Phase 0 packet.

## Planned migration boundary

- RazonWorks `/lab` and `/es/lab` are the accepted targets and exist in local
  source. Their preview and production state remain unverified here.
- Neither Phase 0 nor the standalone source candidate deploys or hosts those routes.
- The source candidate changes `index.html` and `og.png`; Vercel configuration,
  DNS, and the standalone domain remain unchanged by this repository work.
- `https://razonlab.com/` remains the standalone canonical until a redirect is
  separately approved and completed.
- No redirect from `razonlab.com` is authorized until both target routes have
  verified hosted behavior, useful source material is preserved, the identity
  decision is resolved where it affects publication, and the user approves the
  cutover.
- A later archive or redirect must retain provenance for material that is not moved into the new Lab structure.

## Migration sequence

1. Inventory current copy, claims, schedule information, links, metadata, structured data, and assets. Completed in local source on 2026-08-10.
2. Classify each item as preserve, rewrite, retire, or verify. Completed in local source on 2026-08-10.
3. Implement paired RazonWorks `/lab` and `/es/lab` destinations with the
   evidence contract above without inferring legal identity. Local source
   exists; hosted verification remains pending.
4. Validate language parity, accessibility, responsive layout, metadata, canonical behavior, robots rules, sitemap entries, and hosted behavior.
5. Preserve archive-worthy standalone artifacts.
6. Request explicit approval for domain or redirect changes.
7. Verify the approved cutover from the public domain through the final destination.

## Source-candidate non-goals

This source candidate does not modify analytics, hosting, deployment, DNS,
redirects, or live accounts. It does not delete the preserved source revision,
claim a replacement is live, verify an external contact channel, or authorize a
production cutover.
