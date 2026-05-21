# Prompt 004 — Agent Readiness Phase 1 Validation And Docs

Implement the final execution slice of the agent-readiness Phase 1 plan.

Read first:

- `AGENTS.md`
- `CODEX.md`
- `docs/001-agent-readiness-phase-1-plan.md`
- `docs/002-agent-readiness-phase-1-markdown-generation.md`
- `docs/003-agent-readiness-phase-1-discovery-and-metadata.md`
- current implementation state from the previous prompts

---

## Goal

Finish Phase 1 by validating the output, documenting the new artifact layer, and leaving the repo in a clean, reviewable state.

---

## Constraints

- Do not expand scope into Cloudflare config
- Do not introduce `.well-known`
- Do not add speculative standards support

This prompt is for validation, polish, and documentation.

---

## Implementation Requirements

1. Review the generated markdown and discovery artifacts as a set:

- homepage HTML
- `index.md`
- `pl/index.md`
- `llms.txt`
- `llms-full.txt`
- structured metadata

2. Update docs where necessary so the repo explains the new layer:

- architecture if new static artifacts are part of the public structure
- maintenance notes if these files are generated from shared content
- deploy notes if the FTP payload now intentionally includes additional text artifacts

3. Remove any drift, awkward wording, or unnecessary complexity introduced during implementation.

4. Keep the final shape aligned with the original project invariants:

- static
- minimal
- public-repo readable
- no fake capability surface

---

## Verification

Run and report:

- typecheck
- lint
- build

If any check cannot run, explain why.

Also inspect final output for:

- asset presence in `dist/`
- no broken internal references
- readable markdown output

---

## Deliverable

Return:

- final summary of the Phase 1 implementation state
- files changed
- residual manual Cloudflare follow-up items to discuss in chat, if any
