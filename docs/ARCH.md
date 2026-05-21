# Architecture

## Overview

A static single-page personal website built with Astro. No backend, no database, no auth. Built output is a folder of static files uploaded to classic shared hosting via FTP. Production runs over HTTPS behind Cloudflare. The repo is public — its structure, commit history, and agent instructions are part of the portfolio.

---

## Structure

```
/
├── public/
│   ├── favicon.svg           ← favicon
│   ├── favicon.ico           ← fallback favicon for legacy clients and direct `/favicon.ico` requests
│   ├── fonts/                ← self-hosted Source Sans 3 and Spectral subsets
│   ├── llms.txt              ← concise agent-facing directory copied from `public/`
│   ├── robots.txt            ← crawl policy for search engines and bots
│   ├── og/                   ← localized Open Graph images
│   └── sitemap.xml           ← static sitemap for root public routes
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
│   │   ├── machine-readable.ts ← markdown/LLM artifact renderer from shared copy
│   │   ├── pl.ts             ← Polish strings
│   │   └── schema.ts         ← shared copy schema
│   ├── integrations/
│   │   └── machine-readable-artifacts.mjs ← build hook that writes markdown assets into `dist/`
│   ├── env.d.ts              ← Astro type declarations
│   ├── layouts/
│   │   └── Base.astro        ← shared document shell
│   ├── site/
│   │   └── profile.ts        ← shared public profile/discovery metadata
│   └── styles/
│       └── global.css        ← Tailwind entrypoint + global CSS custom properties
├── docs/                      ← spec docs
├── AGENTS.md                  ← shared repo instructions for coding agents
├── CODEX.md                   ← Codex-specific wrapper over AGENTS.md
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
| Icons      | Hand-authored SVG favicon with generated `.ico` fallback         |
| Fonts      | Self-hosted `Spectral` + `Source Sans 3` in `public/fonts/`      |
| JS         | Zero JS by default; add only if interaction requires it          |
| i18n       | Astro built-in i18n routing — `/` (EN) and `/pl/` (PL)           |
| Routing    | Static routes for EN, PL, and custom `404.html`                  |
| Deployment | `astro build` output uploaded manually via FTP to shared hosting |

No client-side routing. No state management. No API calls. The page is a document.

---

## Machine-readable layer

Phase 1 adds a small static machine-readable layer without introducing a second content system.

Build output now includes:

- `/index.md` ← generated English markdown version of the homepage
- `/pl/index.md` ← generated Polish markdown version of the homepage
- `/llms-full.txt` ← compact single-file public context resource
- `/llms.txt` ← concise directory for agents, copied from `public/`

Source of truth remains the existing EN/PL copy in `src/i18n/en.ts` and `src/i18n/pl.ts`.
The markdown artifacts are generated at build time by an Astro build hook. They are not edited manually.

The shared layout also emits factual `Person` JSON-LD and page-level `rel="alternate" type="text/markdown"` links so the discovery layer stays tied to the actual public pages.

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

Static discovery files such as `robots.txt`, `sitemap.xml`, and `llms.txt` live in `public/` and are copied into the final build. Generated machine-readable files such as `index.md`, `pl/index.md`, and `llms-full.txt` are written into `dist/` during `astro build` and should be deployed together with the HTML output.

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
