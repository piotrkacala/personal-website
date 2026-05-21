# Prompt 002 — Agent Readiness Phase 1 Markdown Generation

Implement the first execution slice of the agent-readiness Phase 1 plan.

Read first:

- `AGENTS.md`
- `CODEX.md`
- `docs/001-agent-readiness-phase-1-plan.md`
- `docs/ARCH.md`
- `docs/COPY.md`

Do not implement any Cloudflare-only behavior. This prompt is repo-controlled only.

---

## Goal

Add build-time generation for machine-readable markdown assets derived from the same public content source as the site.

Target outputs:

- `/index.md`
- `/pl/index.md`
- `/llms-full.txt`

---

## Constraints

- Static output only
- No SSR
- No API routes
- No second content system
- No manual duplication of page copy
- Public git history must stay clean and understandable

Do not:

- add `.well-known` resources
- add scanner-specific filler copy
- hardcode duplicate narrative text in a generator file if it already exists in `src/i18n/`

---

## Implementation Requirements

1. Design a single-source path from the existing i18n content model to markdown artifacts.

2. Generate concise but complete markdown page versions for:

- English homepage
- Polish homepage

3. Generate `llms-full.txt` as a compact single-file context resource for the public site.

4. Keep markdown structure deliberate and stable:

- H1
- short summary blockquote or equivalent summary section
- clear section headings
- project links where relevant
- contact line

5. Ensure the generated content is plain-text readable and not HTML-shaped markdown noise.

---

## Verification

Run and report:

- build
- quick inspection of generated files in `dist/`

Check specifically:

- the files exist in final output
- the EN and PL markdown versions reflect the current site content
- `llms-full.txt` is useful but not bloated

---

## Deliverable

Commit no changes in this prompt.

Return:

- what was implemented
- which files were added or changed
- any content-model tradeoffs that affect Prompt 003
