# Razon Lab Brand Boundary

> Razon Lab is the experimental research arm of RazonWorks. It publishes evidence, not commercial promises or beginner curriculum.

## Authority

The canonical portfolio decision and contract live in the RazonWorks repository at `RazonIn4K/razonworks/docs/adr/0038-portfolio-brand-and-content-ownership.md`, `RazonIn4K/razonworks/docs/brand/portfolio-charter.md`, and `RazonIn4K/razonworks/docs/brand/content-ownership-ledger.md`. This repository's local boundary must not contradict them. If the documents conflict, pause public changes and reconcile the canonical decision and local boundary together before implementation.

## Brand contract

- **Role:** experimental research and prototyping arm of RazonWorks.
- **Primary audience:** technical peers, builders, and security researchers.
- **Visitor situation:** evaluating how an emerging AI, automation, or security system behaved under a stated method and environment.
- **One job:** make a specific experiment, benchmark, writeup, or demo inspectable.
- **Working promise:** publish reproducible experiments and prototypes before RazonWorks treats them as client-ready.
- **Primary action:** inspect the method, evidence, limitations, artifacts, and next test.
- **Proof mode:** research method, environment details, observations, reproduction evidence, and limitations.
- **Voice:** precise, calm, testable, and explicit about uncertainty.
- **Visual thesis:** an experiment log whose structure makes evidence status easy to scan, not a services homepage or course catalog.

## Owned subjects

- experiments, benchmarks, evaluations, and prototypes;
- emerging AI, automation, and security-system behavior;
- methods, environments, versions, observed results, limitations, and artifacts;
- follow-up questions, failed attempts, and next tests.

## Explicit exclusions

- service packages, pricing, consultation intake, or client-ready promises;
- beginner curriculum, general tutorials, course enrollment, or learner support;
- David's full personal story, broad portfolio, employment pitch, or personal contact hub;
- unsupported claims, generic trend commentary, or hype presented as a result.

## Portfolio routing

- Send commercial service and project-intake needs to RazonWorks.
- Send structured learning, tutorials, exercises, and learner support to High Encode Learning.
- Send David's personal role, judgment, curated proof, and personal contact to DavidTiz.
- Keep the full experiment record with Razon Lab. Other properties may summarize it for their audience and link to the canonical artifact.

No property should clone a full Lab report. A RazonWorks service case may cite the experiment that informed a decision, High Encode may teach established knowledge derived from it, and DavidTiz may explain David's role or judgment. Those are summaries for different visitor jobs, not duplicate reports.

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

This repository contains a self-contained `index.html` for the existing Razon Live Lab presentation plus `favicon.png` and `og.png`. The current source mixes learning-in-public language, scheduled-stream claims, broad project links, and experimental topics. Phase 0 preserves that source for later inventory. It does not endorse every current statement as accurate or current.

The hosting and domain details in the README are repository records. They were not live-verified by the documentation-only Phase 0 packet.

## Planned migration boundary

- `RazonIn4K/razonworks` `/lab` and `/es/lab` are planned source destinations.
- Phase 0 does not implement, deploy, or host those routes.
- `index.html`, assets, Vercel configuration, DNS, and the standalone domain remain unchanged.
- No redirect from `razonlab.com` is authorized until both planned routes exist, English and Spanish behavior is verified in the hosted environment, useful source material is preserved, and the user approves the cutover.
- A later archive or redirect must retain provenance for material that is not moved into the new Lab structure.

## Migration sequence

1. Inventory current copy, claims, schedule information, links, metadata, structured data, and assets.
2. Classify each useful item as preserve, rewrite, summarize, move, or retire.
3. Implement paired RazonWorks Lab routes with the evidence contract above.
4. Validate language parity, accessibility, responsive layout, metadata, canonical behavior, robots rules, sitemap entries, and hosted behavior.
5. Preserve archive-worthy standalone artifacts.
6. Request explicit approval for domain or redirect changes.
7. Verify the approved cutover from the public domain through the final destination.

## Phase 0 non-goals

This governance change does not modify public copy, navigation, metadata, structured data, assets, analytics, hosting, deployment, DNS, redirects, or live accounts. It does not delete content, claim a replacement is live, or authorize a production cutover.
