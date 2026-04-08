# Architecture

## Overview

A static single-page personal website built with Astro. No backend, no database, no auth. Built output is a folder of static files uploaded to classic shared hosting via FTP. Production runs over HTTPS behind Cloudflare. The repo is public — its structure, commit history, and agent instructions are part of the portfolio.

---

## Structure

```
/
├── public/
│   ├── favicon.svg           ← favicon
│   ├── fonts/                ← self-hosted Source Sans 3 and Spectral subsets
│   └── og/                   ← localized Open Graph images
├── src/
│   ├── pages/
│   │   ├── 404.astro         ← custom 404 page
│   │   ├── index.astro       ← English version
│   │   └── pl/
│   │       └── index.astro   ← Polish version
│   ├── components/
│   │   ├── Contact.astro     ← semantic footer/contact block
│   │   ├── Hero.astro        ← positioning section
│   │   ├── ProjectCard.astro ← single project entry
│   │   └── Projects.astro    ← projects section wrapper
│   ├── i18n/
│   │   ├── en.ts             ← English strings
│   │   ├── pl.ts             ← Polish strings
│   │   └── schema.ts         ← shared copy schema
│   ├── env.d.ts              ← Astro type declarations
│   ├── layouts/
│   │   └── Base.astro        ← shared document shell
│   └── styles/
│       └── global.css        ← Tailwind entrypoint + global CSS custom properties
├── docs/                      ← spec docs
├── CODEX.md                   ← repo instructions for Codex
├── CLAUDE.md
├── astro.config.mjs
├── eslint.config.mjs
├── README.md
├── tsconfig.json
└── package.json
```

**Tooling:** npm, single package (no monorepo, no workspaces)

---

## Frontend

| Concern    | Choice                                                           |
| ---------- | ---------------------------------------------------------------- |
| Framework  | Astro 5 (static output mode)                                     |
| Styling    | Tailwind CSS v4 via `@tailwindcss/vite`                          |
| Components | Astro native components — no React, no shadcn                    |
| Icons      | Hand-authored SVG favicon; no icon library dependency            |
| Fonts      | Self-hosted `Spectral` + `Source Sans 3` in `public/fonts/`      |
| JS         | Zero JS by default; add only if interaction requires it          |
| i18n       | Astro built-in i18n routing — `/` (EN) and `/pl/` (PL)           |
| Routing    | Static routes for EN, PL, and custom `404.html`                  |
| Deployment | `astro build` output uploaded manually via FTP to shared hosting |

No client-side routing. No state management. No API calls. The page is a document.

---

## Infrastructure

| Component  | Tool / Status                                |
| ---------- | -------------------------------------------- |
| Hosting    | Classic shared hosting (FTP)                 |
| CDN / TLS  | Cloudflare in front of the origin            |
| Build      | `astro build` → produces `dist/`             |
| Deploy     | Manual FTP upload of `dist/`                 |
| CI/CD      | None at launch — manual deploy is sufficient |
| Domain     | `piotrkacala.pl`                             |
| Error page | Custom static `404.html`                     |

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
- Dark mode
- Any server-side rendering (SSR)
- Any CMS integration
- Additional languages beyond EN and PL
