# Architecture

## Overview

A static personal website built with Astro. The bilingual homepage remains the primary visitor flow,
with static proof-artifact pages and generated machine-readable discovery routes alongside it. No
backend, no database, no auth. Built output is a folder of static files uploaded to classic shared
hosting via FTP. Production runs over HTTPS behind Cloudflare. The repo is public — its structure,
commit history, and agent instructions are part of the portfolio.

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
│   └── phonetic-benchmark/   ← archived benchmark screenshots and static demos
├── src/
│   ├── pages/
│   │   ├── 404.astro         ← custom 404 page
│   │   ├── index.astro       ← English version
│   │   ├── phonetic-benchmark/ ← report, gallery, methodology, and EN-only run details
│   │   └── pl/
│   │       ├── index.astro   ← Polish version
│   │       └── phonetic-benchmark/ ← localized report and gallery
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
│   │   └── machine-readable-artifacts.mjs ← build hook that writes discovery assets into `dist/`
│   ├── env.d.ts              ← Astro type declarations
│   ├── layouts/
│   │   └── Base.astro        ← shared document shell
│   ├── site/
│   │   ├── external-projects.ts ← companion markdown profiles for linked projects
│   │   ├── phonetic-benchmark.ts ← benchmark facts, copy, observations, and JSON-LD helpers
│   │   └── profile.ts        ← shared public profile/discovery metadata
│   └── styles/
│       └── global.css        ← Tailwind entrypoint + global CSS custom properties
├── docs/                      ← spec docs
├── tools/
│   └── smoke-production.sh    ← post-deploy production consistency checks
├── tests/                     ← machine-readable artifact regression coverage
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

The site includes a static machine-readable layer without introducing a second content system.

Build output now includes:

- `/index.md` ← generated English markdown version of the homepage
- `/pl/index.md` ← generated Polish markdown version of the homepage
- `/projects/<slug>.md` ← companion markdown profiles for linked projects and dated private-project records
- `/phonetic-benchmark/index.md` and `/pl/phonetic-benchmark/index.md` ← generated report markdown
- `/phonetic-benchmark/methodology/index.md` ← generated canonical English methodology markdown
- `/phonetic-benchmark/runs/<run-id>/index.md` ← generated canonical English run-details records
- `/phonetic-benchmark/results.json` and `/phonetic-benchmark/results.csv` ← language-neutral exports
- `/sitemap.xml` ← generated sitemap aligned with static routes and discovery artifacts
- `/llms-full.txt` ← compact single-file public context resource
- `/llms.txt` ← concise directory for agents, copied from `public/`

Source of truth remains the existing EN/PL copy in `src/i18n/en.ts` and `src/i18n/pl.ts`.
Benchmark publication facts remain centralized in `src/site/phonetic-benchmark.ts`. Generated
artifacts are written at build time by an Astro build hook. They are not edited manually.
The typed public profile in `src/site/profile.ts` also supplies the canonical AI-agent summary used
by consolidated machine-readable output.

The shared layout emits factual `Person` JSON-LD, optional page-level benchmark JSON-LD, and
page-level `rel="alternate" type="text/markdown"` links so the discovery layer stays tied to the
actual public pages.

### Companion project profiles

Some projects or tools may be linked from this site while being deployed outside this Astro app's
route tree, including tools that live under the same domain on separately managed paths. A dated
private-project record can use the same profile mechanism when there is intentionally no runtime
link.

For those cases, this repo acts as a discovery and metadata layer, not as the runtime owner of the tool path. The correct pattern is:

- keep the live project URL as the canonical runtime location when one exists
- expose a repo-controlled companion markdown profile under a non-conflicting path such as `/projects/<slug>.md`
- avoid creating Astro routes that would shadow separately deployed paths like `/400m/`
- state the publication boundary explicitly for private-project records

This keeps machine-readable discovery inside the public repo without creating deploy collisions between the personal site and linked tools.

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

Static discovery files such as `robots.txt` and `llms.txt` live in `public/` and are copied into the
final build. Generated machine-readable files such as `sitemap.xml`, `index.md`, `pl/index.md`, and
`llms-full.txt` are written into `dist/` during `astro build` and should be deployed together with
the HTML output.

Companion markdown profiles follow the same deploy rule: they are static artifacts owned by this
repo and must not conflict with separately deployed application paths on the same domain.

After each FTP upload, run `npm run smoke:production`. It verifies EN and PL HTML, explicit and
negotiated markdown, Cloudflare `Link` alternate headers, `llms.txt`, `llms-full.txt`, and sitemap
discovery and direct availability for the companion profiles.

Production currently uses a thin Cloudflare-only layer for route-scoped markdown negotiation on `/` and `/pl/`, returning markdown for clients that explicitly send `Accept: text/markdown`. That same edge layer also adds route-scoped `Link` alternate headers and keeps markdown-negotiated requests out of edge cache as a simple correctness guardrail. It remains intentionally separate from the repo-controlled artifact generation and should stay narrow: preserve `Vary: Accept`, expose markdown alternates where useful, and avoid taking ownership of external tool routes. See `docs/008-cloudflare-markdown-edge-follow-up.md` for the repo-safe operational scope and current state.

---

## Quality Rails

| Concern    | Tool                                                      |
| ---------- | --------------------------------------------------------- |
| Formatting | Prettier                                                  |
| Linting    | ESLint (Astro plugin)                                     |
| Typecheck  | TypeScript (Astro built-in)                               |
| Tests      | Node test runner for machine-readable artifact generation |

---

## Explicitly Deferred

- Contact form (email link is sufficient for v1)
- Dark mode
- Any server-side rendering (SSR)
- Any CMS integration
- Additional languages beyond EN and PL
