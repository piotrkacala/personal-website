# Prompt 003 — Agent Readiness Phase 1 Discovery And Metadata

Implement the second execution slice of the agent-readiness Phase 1 plan.

Read first:

- `AGENTS.md`
- `CODEX.md`
- `docs/001-agent-readiness-phase-1-plan.md`
- `docs/002-agent-readiness-phase-1-markdown-generation.md`
- current implementation state from the previous prompt

This prompt assumes markdown assets already exist.

Current content-model note from Prompt 002:

- the generated markdown summary currently reuses `metadata.description` from the existing i18n source
- keep that coupling unless Prompt 003 has a clear reason to introduce a dedicated machine-readable summary field
- do not fork summary copy casually between page metadata, markdown artifacts, and discovery files

---

## Goal

Improve the repo-controlled discovery layer and add structured profile metadata without inventing non-existent capabilities.

Primary targets:

- refresh `public/llms.txt`
- add JSON-LD person metadata
- keep existing discovery signals coherent

---

## Constraints

- No Cloudflare-only features
- No `.well-known` resources
- No MCP, OAuth, API catalog, Agent Skills, or commerce standards
- No factual claims that are not already public and supportable

---

## Implementation Requirements

1. Rework `public/llms.txt` so it acts as a concise directory for agents.

It should:

- identify the site clearly
- keep the positioning accurate
- link to the generated markdown resources
- link to relevant public proof artifacts already surfaced on the site
- avoid over-optimizing for any single vendor

2. Add structured metadata in the shared layout.

Use factual JSON-LD for the person/profile layer only.

Likely schema:

- `Person`
- `name`
- `url`
- `jobTitle`
- `email`
- `sameAs`
- `description`
- `knowsAbout`

Only include fields that map cleanly to existing public information.

3. Verify that existing discovery signals still make sense together:

- canonical
- `hreflang`
- `sitemap.xml`
- `robots.txt`
- markdown alternate link

If a repo-controlled cleanup is needed for consistency, make it here.

---

## Verification

Run and report:

- build
- quick inspection of updated `llms.txt`
- quick inspection of rendered `<head>` output or source where practical

---

## Deliverable

Commit no changes in this prompt.

Return:

- what changed
- any follow-up needed for docs or deploy notes
- any reason Prompt 004 should adjust validation scope
