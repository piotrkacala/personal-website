# personal-website

Personal website for Piotr Kacała.

Live:

- https://piotrkacala.pl
- https://piotrkacala.pl/pl/

This repo is part of the portfolio itself. The site shows the output; the repo shows how it was built.
The site was implemented through AI agents from a docs-first spec. The repo is public and intentionally readable, including the docs and commit history.

## Stack

- Astro 5, static output
- Tailwind CSS v4
- English at `/`
- Polish at `/pl/`
- Manual deploy via FTP

## Scripts

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`
- `npm run format:check`

## Project Docs

Specs and implementation notes live in [`docs/`](./docs/).

## Repo Map

- [`docs/PRODUCT.md`](./docs/PRODUCT.md): scope, audience, and launch intent
- [`docs/COPY.md`](./docs/COPY.md): final copy, voice, and dated claims
- [`docs/DECISIONS.md`](./docs/DECISIONS.md): accepted ADR-style decisions
- [`docs/ARCH.md`](./docs/ARCH.md): current technical shape of the site
- [`docs/IMPLEMENTATION.md`](./docs/IMPLEMENTATION.md): implementation plan and build notes
- [`docs/BACKLOG.md`](./docs/BACKLOG.md): follow-up work, rejected ideas, and completed items
- [`src/i18n/en.ts`](./src/i18n/en.ts) and [`src/i18n/pl.ts`](./src/i18n/pl.ts): the actual shipped EN/PL content

## Reading Order

If you want the shortest path through the repo:

1. Read [`docs/PRODUCT.md`](./docs/PRODUCT.md) for intent.
2. Read [`docs/COPY.md`](./docs/COPY.md) for the content and voice.
3. Read [`docs/DECISIONS.md`](./docs/DECISIONS.md) for the constraints and tradeoffs.
4. Open [`src/pages/index.astro`](./src/pages/index.astro) and [`src/pages/pl/index.astro`](./src/pages/pl/index.astro) to see how that maps to the shipped site.
