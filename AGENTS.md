# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

Personal website for Piotr Kacała — a static portfolio and public proof-artifact site. The primary
visitor flow remains a bilingual homepage, with durable static report and machine-readable routes
for public evidence. Built with Astro and deployed via FTP to classic shared hosting.

## Key Invariants

- Static output only. No SSR, no server-side logic, no API routes.
- Zero JavaScript by default. Add JS only when interaction explicitly requires it.
- The repo is public. Commit messages, `AGENTS.md`, and docs structure are part of the portfolio.

## Commands

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Quality

```bash
npm test
npm run typecheck
npm run lint
npm run format:check
```

### Deploy

Manual FTP upload of `dist/` to shared hosting. No CI/CD at v1.

After deploy:

```bash
npm run smoke:production
```

## Architecture

Single Astro project, no monorepo. The bilingual homepage lives at `/` and `/pl/`. The focused
consulting surface lives at `/consulting/` and `/pl/consulting/`. Static proof artifacts, generated
markdown, and discovery routes extend that primary flow without introducing a blog, CMS, SSR, or
API layer.

```text
src/
  pages/index.astro     ← English version
  pages/pl/index.astro  ← Polish version
  pages/consulting/     ← focused EN consulting next-step surface
  pages/pl/consulting/  ← focused PL consulting next-step surface
  pages/phonetic-benchmark/ ← report, gallery, methodology, run details
  i18n/                 ← centralized EN/PL strings
  site/                 ← public profile, benchmark data, companion profiles
  integrations/         ← build-time machine-readable artifact generation
  components/           ← homepage and proof-artifact components
  layouts/Base.astro    ← <html>, <head>, fonts, global meta
  styles/global.css     ← Tailwind base + CSS custom properties
public/                 ← favicon, OG image, llms.txt, archived benchmark assets
tools/                  ← post-deploy production smoke checks
tests/                  ← machine-readable regression coverage
docs/                   ← spec documents
```

## Key Docs

- `docs/PRODUCT.md` — scope, visitor flows, launch criteria, non-goals
- `docs/ARCH.md` — stack decisions, structure, infrastructure
- `docs/007-external-project-machine-readable-profiles.md` — workflow for companion markdown profiles for external or separately deployed project surfaces
- `docs/DECISIONS.md` — ADR log (read before changing any architectural decision)
- `docs/QUESTIONS.md` — unresolved product/design choices that are not accepted decisions yet
- `docs/STYLE.md` — Tailwind conventions, component rules, visual direction
- `docs/COPY.md` — voice, tone, content for each section, lines to use/avoid
- `docs/BACKLOG.md` — executable work, follow-up tasks, rejected ideas

## Machine-readable Workflow

- If a new project or tool is added to the homepage, `llms.txt`, or another public discovery surface, add a companion markdown profile for it in this repo as well.
- For tools or projects that live on the same domain but are deployed separately, do not create an Astro route that would take over their production path. Publish a companion profile under a non-conflicting path such as `/projects/<slug>.md`.
- Keep the public site, `llms.txt`, `llms-full.txt`, and companion markdown profiles aligned so project discovery does not depend on HTML alone.

## Code Style

- TypeScript where Astro supports it; props typed in components
- Tailwind utility classes directly in markup — no `@apply`
- No arbitrary Tailwind values unless unavoidable
- Component files: `PascalCase.astro`
- No inline hardcoded strings where a data file or prop makes more sense

## Commit Style

Commits are public and are part of the portfolio. Write them accordingly:

- Describe intent: `add projects section with narrative arc` not `update Projects.astro`
- Active voice, present tense
- No `wip`, no `fix #123` alone, no conventional commit prefixes unless they genuinely add clarity
- Do not use `Co-authored-by` for AI agents
- If agent involvement should be visible in history, use explicit trailers such as `Assisted-by: Codex`
- Only include `Assisted-by` trailers for agents that materially contributed to the changes in that specific commit
