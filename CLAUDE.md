# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project Overview

Personal website for Piotr Kacała — a static single-page site serving as the third career surface (after CV and LinkedIn). Built with Astro and deployed via FTP to classic shared hosting.

**Key invariants:**
- Static output only. No SSR, no server-side logic, no API routes.
- Zero JavaScript by default. Add JS only when interaction explicitly requires it.
- The repo is public. Commit messages, CLAUDE.md, and docs structure are part of the portfolio.

## Commands

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build        # produces dist/
npm run preview      # preview the built output locally
```

### Quality
```bash
npm run typecheck
npm run lint
npm run format:check
```

### Deploy
Manual FTP upload of `dist/` to shared hosting. No CI/CD at v1.

## Architecture

Single Astro project, no monorepo. One page (`src/pages/index.astro`) with three sections composed from components.

```
src/
  pages/index.astro     ← the only page
  components/           ← Hero, Projects, ProjectCard, Contact
  layouts/Base.astro    ← <html>, <head>, fonts, global meta
  styles/global.css     ← Tailwind base + CSS custom properties
public/                 ← favicon, OG image, static assets
docs/                   ← spec documents
```

## Key Docs

- `docs/PRODUCT.md` — scope, visitor flows, launch criteria, non-goals
- `docs/ARCH.md` — stack decisions, structure, infrastructure
- `docs/DECISIONS.md` — ADR log (read before changing any architectural decision)
- `docs/STYLE.md` — Tailwind conventions, component rules, visual direction
- `docs/COPY.md` — voice, tone, content for each section, lines to use/avoid
- `docs/BACKLOG.md` — what's next, open questions, rejected ideas (versioned in repo, not in memory)

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
