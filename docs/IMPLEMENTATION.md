# Implementation Plan

Execution plan for v1 of the personal website. This document turns the product, copy, style, and architecture decisions into an implementation sequence.

During implementation, this file is the execution-order reference. `docs/BACKLOG.md` remains the broader task inventory.

---

## Goal

Build and ship a static bilingual personal website in Astro with three sections:
- Positioning
- Projects
- Contact

The implementation should preserve the already accepted direction:
- light, editorial, restrained visual language
- `Spectral` for headlines and project titles
- `Source Sans 3` for body text and UI
- single-page structure
- English at `/`
- Polish at `/pl/`

---

## Implementation Order

### Phase 1 — Project setup

Deliverables:
- Astro project initialized
- Tailwind configured
- Project structure aligned with `docs/ARCH.md`
- Astro i18n routing configured for EN and PL pages

Work:
- Initialize Astro 5 with static output
- Add Tailwind CSS v4
- Configure Astro i18n in `astro.config.mjs` with English as the default locale and Polish as the secondary locale
- Create `src/pages/index.astro`
- Create `src/pages/pl/index.astro`
- Create `src/layouts/Base.astro`
- Create `src/i18n/en.ts`
- Create `src/i18n/pl.ts`
- Create `src/styles/global.css`

### Phase 2 — Typography and global layout

Deliverables:
- Font loading in the base layout
- Global CSS variables for colors and spacing
- Page shell that reflects the accepted visual direction

Work:
- Self-host `Spectral` and `Source Sans 3` in `public/fonts/` using WOFF2 files
- Load the fonts from local files in `Base.astro` or global CSS rather than using Google Fonts
- Define text, background, accent, and divider variables
- Set global type scale for `h1`, `h2`, body, and small UI text
- Establish the single-column document grid
- Define spacing rhythm between sections
- Add baseline link, focus, and divider styling
- Add `hreflang` alternates for EN and PL in the shared `<head>`

### Phase 3 — Content structure

Deliverables:
- All three sections rendered in English
- Component structure ready for bilingual content

Work:
- Create `src/components/Hero.astro`
- Create `src/components/Projects.astro`
- Create `src/components/ProjectCard.astro`
- Create `src/components/Contact.astro`
- Implement Hero with the final positioning headline and expansion
- Implement Projects with explicit narrative arc
- Implement Contact with email CTA only
- Ensure projects are rendered as sequential entries, not marketing cards

### Phase 4 — EN/PL content integration

Deliverables:
- Full English and Polish content routed correctly
- No hardcoded user-facing copy in components

Work:
- Put all UI strings and section copy into `src/i18n/en.ts` and `src/i18n/pl.ts`
- Keep EN and PL content equivalent in scope and quality
- Ensure Polish uses normal Polish sentence structure while keeping standard English IT terms where appropriate
- Implement the language switcher so that:
  - English page links to `/pl/`
  - Polish page links to `/`
  - the current language is visually clear

### Phase 5 — Responsive QA

Deliverables:
- Mobile layout working at 375px
- Desktop layout preserving the same document character

Work:
- Test headline wrapping
- Test project spacing and readability
- Verify tap targets for language switcher and links
- Check that metrics remain readable without becoming visually noisy

### Phase 6 — Production readiness

Deliverables:
- Clean production build
- Basic metadata in place
- Site ready for FTP deploy

Work:
- Run `astro build`
- Finalize `<title>`, meta description, OG title, OG description, OG image direction
- Add metadata only after the SEO/social direction is resolved in `docs/QUESTIONS.md`
- Add favicon and any required static assets
- Verify output in `dist/`

---

## EN / PL Rules

- English is the primary version and lives at `/`
- Polish is a full version, not a reduced translation, and lives at `/pl/`
- Components should render from structured content, not duplicated hardcoded markup where avoidable
- Shared structure should stay identical unless language-specific typography or line length requires a small layout adjustment
- Any metric or dated project claim shown in EN must also appear in PL
- Language switching must be immediate and obvious without requiring explanation

---

## Content Dependencies

Implementation can start now. Copy status at this point:

Already finalized in `docs/COPY.md`:
- EN positioning expansion
- EN projects arc framing
- EN project descriptions
- EN contact copy

Still needed during implementation:
- PL positioning expansion
- PL project descriptions
- PL contact copy
- final SEO/meta copy

Source of truth:
- `docs/COPY.md`

---

## Not In Scope For First Pass

- Blog
- Dark mode
- Analytics
- Contact form backend
- CMS
- Animations beyond minimal functional feedback
- Project screenshots or portrait photography

---

## Definition of Done

The implementation is ready for launch when:
- the site renders correctly in EN and PL
- the visual system matches `docs/STYLE.md`
- all three sections are complete
- the language switcher works
- the layout holds at 375px
- `astro build` passes
- the output is ready to upload via FTP
