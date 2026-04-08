# Backlog

Versioned record of executable work, follow-up tasks, and ideas. This file is the source of truth for what needs doing next — not memory, not chat history.

**Rules:**
- Move completed items to the Done section with a date, don't delete them.
- Ideas that are explicitly rejected go to Rejected with a reason — so they don't resurface.
- Unresolved choices do not live here; keep them in `QUESTIONS.md`.

---

## Now — before any code

- [ ] Write the final Polish positioning text
- [ ] Write the final Polish project descriptions
- [ ] Write the final Polish contact copy
- [ ] Initialize Astro project (`npm create astro@latest`)
- [ ] Once SEO/social meta direction is decided, write final values into the site copy/spec

## Next — first implementation

- [ ] Configure Astro i18n routing in `astro.config.mjs`
- [ ] Base layout (`Base.astro`) — fonts, meta, global styles
- [ ] Self-host `Spectral` and `Source Sans 3`
- [ ] Hero section — headline + expansion
- [ ] Projects section — three entries with arc framing
- [ ] Contact section — email link
- [ ] Language switcher EN ↔ PL
- [ ] Polish strings (`src/i18n/pl.ts`) filled in
- [ ] Add `hreflang` tags for EN/PL
- [ ] Mobile layout tested at 375px
- [ ] Build passes (`astro build`)
- [ ] Deploy to FTP

## Later — post-launch

- [ ] Analytics (Plausible or similar — privacy-friendly, no cookie banner needed)
- [ ] OG image for social sharing
- [ ] Polish the repo for public readability: check commit history reads as a story, not a work log
- [ ] Review dated project metrics before any copy refresh or relaunch

## Ideas — not decided

- Showing a timeline of the learning curve (Phonetic → Surfaced → mojeaudyty.pl) visually, not just textually
- A small "built with" note that links to the repo — makes the two-layer concept explicit for visitors who might not think to check

## Rejected

- Blog — ongoing commitment, content maintenance cost, not needed at launch (see ADR-005)
- CMS — unjustified complexity for one-author static site (see ADR-006)
- Skills/tech list — belongs on CV, not here
- Contact form with backend — email link is sufficient for v1

---

## Done

- [x] Visual direction decided and recorded in `STYLE.md` and `DECISIONS.md` (2026-04-08)
- [x] Font pairing decided: `Spectral` + `Source Sans 3` (2026-04-08)
- [x] Domain decision recorded: `piotrkacala.pl` (2026-04-08)
