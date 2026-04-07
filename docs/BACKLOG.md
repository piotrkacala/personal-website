# Backlog

Versioned record of tasks, decisions pending, and ideas. This file is the source of truth for what's next — not memory, not chat history.

**Rules:**
- Move completed items to the Done section with a date, don't delete them.
- Ideas that are explicitly rejected go to Rejected with a reason — so they don't resurface.
- Open questions that need a decision go here before becoming ADRs.

---

## Now — before any code

- [ ] Decide visual direction (light/dark, accent color, typography feel) — see STYLE.md open questions
- [ ] Decide on domain name
- [ ] Decide on photo: yes or no
- [ ] Define page layout (spatial arrangement of sections, alignment, spacing rhythm) — write into STYLE.md or a separate LAYOUT.md
- [ ] Define SEO and social meta: `<title>`, meta description, OG tags (title, description, image) — this is content, not a technical detail
- [ ] Write the actual positioning text (headline expansion, 4–6 sentences) in both EN and PL
- [ ] Write project descriptions in both EN and PL (raw content exists in COPY.md)
- [ ] Decide: link to repo root from site, or link to specific commits to show process?
- [ ] Initialize Astro project (`npm create astro@latest`)

## Next — first implementation

- [ ] Base layout (`Base.astro`) — fonts, meta, global styles
- [ ] Hero section — headline + expansion
- [ ] Projects section — three entries with arc framing
- [ ] Contact section — email link
- [ ] Language switcher EN ↔ PL
- [ ] Polish strings (`src/i18n/pl.ts`) filled in
- [ ] Mobile layout tested at 375px
- [ ] Build passes (`astro build`)
- [ ] Deploy to FTP

## Later — post-launch

- [ ] Analytics (Plausible or similar — privacy-friendly, no cookie banner needed)
- [ ] OG image for social sharing
- [ ] Polish the repo for public readability: check commit history reads as a story, not a work log

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

*(Nothing yet — project just started)*
