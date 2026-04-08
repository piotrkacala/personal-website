# Architecture

## Overview

A static single-page personal website built with Astro. No backend, no database, no auth. Built output is a folder of static files uploaded to classic shared hosting via FTP. The repo is public — its structure, commit history, and CLAUDE.md are part of the portfolio.

---

## Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro        ← English version
│   │   └── pl/
│   │       └── index.astro    ← Polish version
│   ├── i18n/
│   │   ├── en.ts              ← English strings
│   │   └── pl.ts              ← Polish strings
│   ├── env.d.ts               ← Astro type declarations
│   ├── layouts/
│   │   └── Base.astro         ← shared document shell
│   └── styles/
│       └── global.css         ← Tailwind entrypoint + global CSS custom properties
├── docs/                      ← spec docs
├── CLAUDE.md
├── astro.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

`public/` does not exist yet in Phase 1. It will be introduced once the project adds static assets such as fonts, favicon, or OG images.

**Tooling:** npm, single package (no monorepo, no workspaces)

---

## Frontend

| Concern    | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Astro 5 (static output mode)                              |
| Styling    | Tailwind CSS v4 via `@tailwindcss/vite`                   |
| Components | Astro native components — no React, no shadcn             |
| Icons      | Inline SVG or a lightweight icon set (TBD at design time) |
| Fonts      | TBD at design time                                        |
| JS         | Zero JS by default; add only if interaction requires it   |
| i18n       | Astro built-in i18n routing — `/` (EN) and `/pl/` (PL)    |
| Deployment | FTP upload of `dist/` to shared hosting                   |

No client-side routing. No state management. No API calls. The page is a document.

---

## Infrastructure

| Component | Tool                                         |
| --------- | -------------------------------------------- |
| Hosting   | Classic shared hosting (FTP)                 |
| Build     | `astro build` → produces `dist/`             |
| Deploy    | Manual FTP upload of `dist/`                 |
| CI/CD     | None at launch — manual deploy is sufficient |
| Domain    | TBD                                          |

---

## Quality Rails

| Concern    | Tool                                            |
| ---------- | ----------------------------------------------- |
| Formatting | Prettier                                        |
| Linting    | ESLint (Astro plugin)                           |
| Typecheck  | TypeScript (Astro built-in)                     |
| Tests      | None at v1 — static site, no logic to unit test |

---

## Explicitly Deferred

- Contact form (email link is sufficient for v1)
- Analytics (can be added post-launch without a rebuild)
- Dark mode
- Any server-side rendering (SSR)
- Any CMS integration
- Additional languages beyond EN and PL
