# Backlog

Versioned record of executable work, follow-up tasks, and ideas. This file is the source of truth for what needs doing next — not memory, not chat history.

**Rules:**

- Move completed items to the Done section with a date, don't delete them.
- Ideas that are explicitly rejected go to Rejected with a reason — so they don't resurface.
- Unresolved choices do not live here; keep them in `QUESTIONS.md`.

---

## Now — post-launch polish

- [ ] Verify the custom `404.html` on production after the next upload

## Later

- [ ] Analytics (Plausible or similar — privacy-friendly, no cookie banner needed)
- [ ] Review dated project metrics before any copy refresh or relaunch
- [ ] Consider `sitemap.xml` only if the site grows beyond the current small set of routes
- [ ] Keep polishing the public repo as a readable portfolio artifact when useful

## Ideas — not decided

- Showing a timeline of the learning curve (Phonetic → Surfaced → mojeaudyty.pl) visually, not just textually

## Rejected

- Blog — ongoing commitment, content maintenance cost, not needed at launch (see ADR-005)
- CMS — unjustified complexity for one-author static site (see ADR-006)
- Skills/tech list — belongs on CV, not here
- Contact form with backend — email link is sufficient for v1

---

## Done

- [x] Final Polish positioning text written (2026-04-08)
- [x] Final Polish project descriptions written (2026-04-08)
- [x] Final Polish contact copy written (2026-04-08)
- [x] Astro project initialized (2026-04-08)
- [x] SEO/social meta values written into the site copy and implementation (2026-04-08)
- [x] Visual direction decided and recorded in `STYLE.md` and `DECISIONS.md` (2026-04-08)
- [x] Font pairing decided: `Spectral` + `Source Sans 3` (2026-04-08)
- [x] Domain decision recorded: `piotrkacala.pl` (2026-04-08)
- [x] Astro i18n routing configured in `astro.config.mjs` (2026-04-08)
- [x] Base layout implemented with fonts, meta, and global styles (2026-04-08)
- [x] `Spectral` and `Source Sans 3` self-hosted (2026-04-08)
- [x] Hero section implemented (2026-04-08)
- [x] Projects section implemented with arc framing (2026-04-08)
- [x] Contact section implemented with email link (2026-04-08)
- [x] Language switcher EN ↔ PL implemented without JS (2026-04-08)
- [x] Polish strings filled in `src/i18n/pl.ts` (2026-04-08)
- [x] `hreflang` tags added for EN/PL (2026-04-08)
- [x] Mobile layout tested at 375px (2026-04-08)
- [x] Clean production build confirmed (`astro build`) (2026-04-08)
- [x] Site deployed to FTP hosting (2026-04-08)
- [x] Localized OG images added for EN and PL (2026-04-08)
- [x] Favicon added (2026-04-08)
- [x] Public repo made more readable with `README.md` and project-level docs (2026-04-08)
- [x] "This site" project entry added to make the repo/build process explicit on the site itself (2026-04-08)
- [x] Minimal `404.html` added (2026-04-08)
- [x] Unused `Spectral 400` font-face declarations removed from the stylesheet (2026-04-08)
- [x] Small "built with" note linking back to the repo addressed through the site copy and `README.md` (2026-04-08)
- [x] Contact block moved into a semantic `<footer>` while preserving the current visual layout (2026-04-08)
