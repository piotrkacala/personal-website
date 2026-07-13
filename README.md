# personal-website

Personal website for Piotr Kacała.

Live:

- https://piotrkacala.pl
- https://piotrkacala.pl/pl/
- https://piotrkacala.pl/consulting/

This repo is part of the portfolio itself. The homepage shows the profile; the repo and durable
proof-artifact routes show how the work was built and evaluated. The site was implemented through
AI agents from a docs-first spec. The repo is public and intentionally readable, including the docs
and commit history.

## Stack

- Astro 5, static output
- Tailwind CSS v4
- English at `/`
- Polish at `/pl/`
- Cloudflare Pages hosting

## Machine-readable output

- `public/llms.txt` is the concise directory entry point for agents
- `index.md`, `pl/index.md`, consulting markdown, `llms-full.txt`, `sitemap.xml`, benchmark markdown, and companion project profiles are generated during `npm run build`
- those generated text artifacts ship from the same EN/PL source content as the site, so update `src/i18n/en.ts` and `src/i18n/pl.ts` rather than editing generated output
- Cloudflare Pages serves the complete `dist/` output, including generated markdown and text files

## Scripts

- `npm run dev`
- `npm run build`
- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm run format:check`
- `npm run smoke:production` after a production deployment

## Deployment

The repository-verifiable Pages build contract is:

- build command: `npm run build`
- output directory: `dist/`
- production check after deployment: `npm run smoke:production`

The Cloudflare project name, owning account, connected repository and branch, runtime version,
environment variables, preview behavior, and custom-domain/DNS ownership are dashboard settings and
are not recorded in this public repo. Verify them in Cloudflare before changing deployment
configuration. `public/400m/` is a checked-in, separately built utility; Astro copies it into `dist/`
unchanged. Its refresh procedure is not owned by this Astro build and must not be guessed or replaced.

## Project Docs

Specs and implementation notes live in [`docs/`](./docs/).

## Repo Map

- [`docs/PRODUCT.md`](./docs/PRODUCT.md): scope, audience, and launch intent
- [`docs/COPY.md`](./docs/COPY.md): final copy, voice, and dated claims
- [`docs/DECISIONS.md`](./docs/DECISIONS.md): accepted ADR-style decisions
- [`docs/ARCH.md`](./docs/ARCH.md): current technical shape of the site
- [`docs/IMPLEMENTATION.md`](./docs/IMPLEMENTATION.md): implementation plan and build notes
- [`docs/008-cloudflare-markdown-edge-follow-up.md`](./docs/008-cloudflare-markdown-edge-follow-up.md): current Cloudflare markdown edge behavior for negotiation, alternate headers, and cache boundaries
- [`docs/BACKLOG.md`](./docs/BACKLOG.md): follow-up work, rejected ideas, and completed items
- [`src/i18n/en.ts`](./src/i18n/en.ts) and [`src/i18n/pl.ts`](./src/i18n/pl.ts): the actual shipped EN/PL content

## Reading Order

If you want the shortest path through the repo:

1. Read [`docs/PRODUCT.md`](./docs/PRODUCT.md) for intent.
2. Read [`docs/COPY.md`](./docs/COPY.md) for the content and voice.
3. Read [`docs/DECISIONS.md`](./docs/DECISIONS.md) for the constraints and tradeoffs.
4. Open [`src/pages/index.astro`](./src/pages/index.astro) and [`src/pages/pl/index.astro`](./src/pages/pl/index.astro) to see how that maps to the shipped site.
