# Agent Readiness Phase 1 Plan

Execution plan for the first practical agent-readiness upgrade of `piotrkacala.pl`.

This document is intentionally repo-safe:

- no Cloudflare account identifiers
- no scan screenshots
- no copied output from third-party scanners
- no private infrastructure details beyond deploy-relevant notes

The goal is to improve real machine readability of the site without adding fake capabilities just to raise a score.

---

## Goal

Ship the first agent-readiness layer that matches the site's positioning as a public AI-native artifact, while keeping the project static, minimal, and repo-readable.

Phase 1 focuses on content and discovery, not on protocols for interactive tools.

---

## Scope

Included:

- markdown-readable versions of the homepage content
- improved `llms.txt` structure
- `llms-full.txt`
- machine-readable person/profile metadata
- light discovery improvements that do not imply non-existent APIs or tools
- documentation updates for deploy and maintenance

Explicitly excluded:

- MCP server card
- WebMCP
- Agent Skills
- API Catalog
- OAuth discovery / protected resource metadata
- commerce protocols
- any `.well-known` resource that would only exist to satisfy a scanner

---

## Working Assumptions

These assumptions keep Phase 1 grounded and avoid implementation theatre:

1. Phase 1 is repo-controlled first.
   Repo assets should work correctly even without Cloudflare-specific features.

2. `.well-known` remains blocked for now unless we publish a real standard-compliant resource there.
   We should not open it globally just because a scanner probes those paths.

3. Markdown artifacts should be generated from the same source content as the HTML pages.
   Manual duplication would create drift and produce low-value public commits.

4. Public git history is part of the portfolio.
   Commit messages, docs, and generated public-facing files must stay clean and intentional.

---

## Deliverables

### 1. Markdown page assets

Provide stable markdown URLs for the current public content:

- `/index.md`
- `/pl/index.md`

Content should be lean, readable, and structurally aligned with the actual page:

- title
- short summary
- positioning section
- projects section
- contact section

These files should not become a second content system. They should be produced from the existing i18n content model.

### 2. Refined `llms.txt`

Refresh `public/llms.txt` so it acts as a concise directory rather than only a profile note.

It should:

- keep the site framing accurate
- point to the markdown URLs above
- point to important external proof links already surfaced on the site
- avoid overstating capabilities

### 3. `llms-full.txt`

Add a larger single-file resource for agents that want the full public site context in one fetch.

Suggested scope:

- homepage content in English
- homepage content in Polish
- key external public proof links as references only

This should remain compact. The site is small, so the file should stay readable rather than artificially exhaustive.

### 4. Structured metadata

Add JSON-LD for the person/profile layer in the shared layout.

Likely schema shape:

- `Person`
- `name`
- `url`
- `jobTitle`
- `email`
- `sameAs`
- `knowsAbout`
- `description`

The goal is entity clarity, not SEO cargo cult. Every field should map to something that is already true and public.

### 5. Discovery polish

Keep and verify existing discovery signals:

- `robots.txt`
- `sitemap.xml`
- canonical URLs
- `hreflang`
- markdown alternate link in the page head

Optional in this phase only if the implementation stays simple and documented:

- response `Link` headers for markdown resources

If headers require Cloudflare-only configuration, document them as an optional edge follow-up rather than making the repo depend on invisible infrastructure.

### 6. Docs and deploy notes

Update documentation where needed so the repo remains self-explanatory:

- architecture notes if new static artifacts are added
- deploy notes if FTP upload now includes new markdown files
- maintenance notes for refreshing `llms.txt` and `llms-full.txt`

---

## Implementation Sequence

### Phase A — content source design

Decide the internal shape for markdown generation from the existing i18n data.

Target:

- one source of truth for public copy
- no manual copy-paste between HTML and markdown artifacts

Likely output path:

- small build-time generator script or Astro-compatible generation step

### Phase B — markdown outputs

Generate:

- `index.md`
- `pl/index.md`
- `llms-full.txt`

Acceptance checks:

- content matches the site
- no broken internal links
- no extra marketing copy
- no hidden scanner-specific filler

### Phase C — `llms.txt` refresh

Rework `public/llms.txt` to point agents toward the markdown artifacts and public proof links in a cleaner directory structure.

Acceptance checks:

- concise first screen
- accurate summary
- no inflated labels
- no duplicated low-signal sections

### Phase D — JSON-LD

Add shared structured profile metadata in the layout.

Acceptance checks:

- valid JSON
- only factual public data
- no mismatch between EN/PL content and metadata

### Phase E — verification and docs

Verify:

- build output includes all new assets
- existing page head remains clean
- generated markdown reads well in plain text
- docs mention the new artifact layer

---

## Recommended Prompt Split

Implementation should be split into a few focused prompt files instead of one long run.

Recommended split:

1. Prompt 002
   Build-time markdown generation for `/index.md`, `/pl/index.md`, and `llms-full.txt`.

2. Prompt 003
   Refresh `llms.txt`, add JSON-LD, and wire any small discovery polish that remains repo-controlled.

3. Prompt 004
   Validation pass, docs refresh, deploy notes, and final cleanup.

This split keeps each step auditable in public history and reduces the chance of context drift.

---

## Fresh Context Recommendation

Use a fresh chat window for implementation.

Reasoning:

- the planning discussion already includes product, strategy, scanner interpretation, and standards triage
- the actual implementation work is narrower
- a fresh window will make the execution prompts cleaner and easier to review later in git history

---

## Decisions Confirmed Before Commit

1. Phase 1 stays repo-controlled.

Cloudflare-managed markdown negotiation, response headers, or other edge-only changes are out of scope for the committed implementation round. They can be discussed in chat and applied manually as infrastructure follow-up.

2. `.well-known` stays blocked.

There is no reason to expose `.well-known` during Phase 1 without a real resource behind it. Scanner-driven exposure is explicitly rejected.

3. Implementation should use a fresh context and multiple prompt files.

The execution flow for this plan should start in a new chat window and use at least three focused implementation prompts.

---

## Definition of Done

Phase 1 is complete when:

- the site exposes stable markdown versions of the public homepage content
- `llms.txt` points to those resources cleanly
- `llms-full.txt` exists and is useful
- JSON-LD adds factual entity clarity
- no fake protocol capability is introduced
- the repo documents the new layer clearly
- the result still fits the project's static, minimal architecture
