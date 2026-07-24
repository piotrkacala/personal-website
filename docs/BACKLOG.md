# Backlog

Versioned record of executable work, follow-up tasks, and ideas. This file is the source of truth for what needs doing next — not memory, not chat history.

**Rules:**

- Move completed items to the Done section with a date, don't delete them.
- Ideas that are explicitly rejected go to Rejected with a reason — so they don't resurface.
- Unresolved choices do not live here; keep them in `QUESTIONS.md`.

---

## Now — post-launch polish

- [ ] Run `npm run smoke:production` after each Cloudflare Pages production deployment
- [ ] Record verified Cloudflare Pages dashboard settings: project/account owner, connected repo and
      production branch, Node/runtime, environment variables, preview behavior, and domain/DNS owner
- [ ] Document the source and refresh procedure for the checked-in `public/400m/` build
- [ ] Verify `Vary: Accept` after the next deploy; the 2026-07-13 production check returned negotiated
      Markdown correctly but did not expose the documented `Vary` response header

## Later

- [ ] Keep polishing the public repo as a readable portfolio artifact when useful

## Rejected

- Analytics — intentionally omitted for now; the site is small, privacy-friendly by default, and does not need visitor tracking at this stage
- Blog — ongoing commitment, content maintenance cost, not needed at launch (see ADR-005)
- CMS — unjustified complexity for one-author static site (see ADR-006)
- Skills/tech list — belongs on CV, not here
- Contact form with backend — email link is sufficient for v1
- Public case study for the retired private client project — the project is no longer approved as
  public proof; do not replace it with an anonymized or synthetic case study
- Manual removal of the superseded companion profile from FTP hosting — FTP is no longer the active
  deployment path; absence of the retired route is now verified by the post-deploy Pages smoke check
- Learning-curve timeline built around Phonetic, Surfaced, and the retired private client project —
  it depends on proof that is no longer approved for active publication

---

## Done

- [x] Consulting surface revised around bounded project delivery, including EN/PL HTML,
      machine-readable artifacts, project fit, paid-definition boundary, and local desktop/mobile
      review (2026-07-24)
- [x] Benchmark publication source reconciled across 41 runs, including the four newest v2 results,
      with cross-format JSON, CSV, Markdown, narrative, evidence, and score checks (2026-07-13)
- [x] Homepage, consulting, and benchmark layouts inspected in Chromium at desktop and mobile sizes;
      long mobile project links fixed without changing the visual system (2026-07-13)
- [x] Responsibility-first positioning propagated through EN/PL profile, consulting, metadata, and
      machine-readable sources; retired private client proof removed (2026-07-13)
- [x] Current Cloudflare Pages hosting documented without inventing unverified dashboard settings
      (2026-07-13)
- [x] Focused bilingual consulting surface added with generated markdown, discovery entries, sitemap coverage, and production smoke checks while keeping the homepage compact (2026-06-02)
- [x] Homepage proof hierarchy refreshed with a dedicated Phonetic Benchmark entry and a compact private-project treatment for the private client audit platform (2026-06-02)
- [x] Companion profiles added for Phonetic Alphabet Trainer, Surfaced, and the private client audit platform (2026-06-02)
- [x] Production smoke-check script added for HTML, markdown negotiation, discovery files, and sitemap consistency (2026-06-02)
- [x] Lightweight regression tests added for machine-readable artifact generation (2026-06-02)
- [x] Markdown generation decoupled from presentation-label punctuation through explicit `LinkBlock.machineLabel` fields (2026-06-02)
- [x] Cloudflare homepage markdown edge layer documented with route-scoped negotiation, `Link` alternates, and markdown cache bypass on `/` and `/pl/` (2026-05-22)
- [x] Cloudflare homepage markdown negotiation enabled for `/` and `/pl/` with `Accept: text/markdown` and `Vary: Accept` (2026-05-21)
- [x] First companion machine-readable project profile added under `/projects/400m.md` and linked into public discovery (2026-05-21)
- [x] `robots.txt` added to the static output and allows crawling (2026-05-15)
- [x] `sitemap.xml` added for EN and PL routes and linked from `robots.txt` (2026-05-15)
- [x] Agent-readiness Phase 1 shipped with generated markdown assets, `llms.txt` refresh, and JSON-LD profile metadata (2026-05-21)
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
- [x] Custom `404.html` verified on production after upload (2026-04-08)
- [x] Project metrics reviewed and confirmed current (2026-04-08)
