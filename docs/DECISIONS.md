# Decision Log

ADR-style record of key decisions. Append only — never edit past entries.

---

## ADR-001 — Astro over Next.js or plain HTML

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Choosing a framework for a static personal website. Options: plain HTML/CSS, Next.js (already familiar from other projects), Astro.

**Decision:**
Astro with static output mode.

**Reasoning:**
Plain HTML is viable but gives up Tailwind integration, component composition, and a build pipeline — worth having even for a small site. Next.js produces a larger bundle and brings SSR complexity that adds zero value here. Astro is designed for content-first static sites: zero JS by default, native `.astro` components, excellent Tailwind integration, simple mental model. Right tool for the job.

---

## ADR-002 — FTP deploy over VPS or Vercel/Netlify

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Deployment target for the built static files.

**Decision:**
FTP upload of `dist/` to existing classic shared hosting.

**Reasoning:**
Classic hosting already exists — no new infrastructure to provision or pay for. The output is static files; any host that serves files works. Vercel/Netlify add CI/CD automation but also a vendor dependency and account to manage. For a personal site updated infrequently, manual FTP is sufficient and simpler. Can revisit if deployment frequency increases.

---

## ADR-003 — Single page over multi-page

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Whether the site should be a single scrollable page or multiple pages with routing.

**Decision:**
Single page (`index.astro`) with three sections stacked vertically.

**Reasoning:**
The content scope is small — three short sections. Multi-page navigation adds cognitive load without adding value. A visitor arriving from a CV or LinkedIn profile wants a quick read, not a site to navigate. Single page keeps the visitor moving in one direction.

---

## ADR-004 — Public repo

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Whether the GitHub repository should be public or private.

**Decision:**
Public repository.

**Reasoning:**
The repo is itself part of the portfolio. A public repo with visible commit history, a real CLAUDE.md, and a docs-driven workflow is direct evidence of how the work is done — not just that it was done. This is especially relevant for a site positioned around AI-assisted development methodology. No sensitive content in the repo; no reason to hide it.

---

## ADR-005 — No blog

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Whether to include a blog section.

**Decision:**
No blog at v1, and likely not later either.

**Reasoning:**
A blog requires ongoing commitment to produce content or it becomes a liability (last post: 3 years ago). The positioning is about output and judgment, not thought leadership. If long-form writing becomes a priority, it can be added — but it shouldn't be added speculatively.

---

## ADR-006 — No CMS

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Whether to use a headless CMS (Contentful, Sanity, etc.) for content management.

**Decision:**
Content lives directly in Astro component files or a local data file. No CMS.

**Reasoning:**
The content is authored by one person, changes infrequently, and is simple enough to edit directly. A CMS adds infrastructure, a vendor dependency, and integration complexity — none of which is justified here. If the site grows significantly, this decision can be revisited.

---

## ADR-007 — No component library (no shadcn)

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Whether to use a component library like shadcn/ui.

**Decision:**
Plain Tailwind CSS with handwritten Astro components.

**Reasoning:**
shadcn/ui is designed for React. Astro supports React islands, but bringing in React to render a button is disproportionate overhead for a static site. The design surface is small (one page, three sections, no complex UI patterns). Plain Tailwind gives full control without dependencies.

---

## ADR-008 — Polish version (i18n)

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
Initial plan was English-only. Polish is Piotr's first language and the primary market for consulting work.

**Decision:**
Build the site in both English and Polish using Astro's built-in i18n routing. English at `/`, Polish at `/pl/`. A language switcher on the page.

**Reasoning:**
A Polish version is a different audience segment, not just a translation. Polish-speaking clients and employers who find the site land in their own language, which signals local context. English stays primary (international reach, GitHub audience). Astro's built-in i18n routing handles this cleanly with static output — no runtime overhead, just two sets of pages and a strings file per language.

---

## ADR-009 — Two-layer portfolio design

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
The site is being built to demonstrate AI-assisted zero-code development methodology, not just to present a personal profile.

**Decision:**
The site and its repo are both intentionally public-facing portfolio artifacts. The repo is designed to be read: public commit history, CLAUDE.md, spec docs in `docs/`, meaningful commit messages. The site content references the methodology; the repo shows the methodology in practice.

**Reasoning:**
A visitor who only reads the site gets a profile. A visitor who opens the repo gets a demonstration of how the work was done — docs-driven, agent-assisted, zero-code. These two layers reinforce each other. The repo must therefore be maintained to the same quality standard as the site: no `wip` commits, no placeholder files left in, CLAUDE.md kept accurate.

---

## ADR-010 — Separate pending questions from backlog and ADR log

**Date:** 2026-04-07
**Status:** Accepted

**Context:**
The repository needs a clear place for unresolved choices. `BACKLOG.md` should track work to do, while `DECISIONS.md` is an append-only log of accepted decisions. Mixing pending questions into either file creates drift and blurs document responsibilities.

**Decision:**
Track unresolved choices in a dedicated `docs/QUESTIONS.md` file. `BACKLOG.md` contains executable tasks only. `DECISIONS.md` contains accepted ADRs only.

**Reasoning:**
These are three different states: undecided, decided, and actionable. Giving each state a separate document keeps the workflow readable in a public repo, prevents "open questions" from lingering inside the accepted decision log, and makes it easier for agents to know where to read and where to write.

---

## ADR-011 — Visual direction: light editorial minimal

**Date:** 2026-04-08
**Status:** Accepted

**Context:**
Choosing the visual language for the site. The positioning is "product builder" not "coder" — the design should match the tone of the copy: direct, precise, confident, no fluff.

**Decision:**
Light, editorial, restrained. Single-column document-like layout. No photo. One accent color used sparingly (links, language switcher, possibly metrics). Generous whitespace. Thin rules between sections. Zero decorative elements without function. Headline is large but essay-title scale, not startup-hero scale. Background is light but not pure white — slightly warm or slightly cool/technical.

**Reasoning:**
The content is text-heavy and strong — the design should frame it, not compete. No photo and no project screenshots means the site must work purely on typography and spacing. Terminal/monospace aesthetic signals "coder" which contradicts the positioning. Startup landing page aesthetic signals hype which contradicts the tone. A well-typeset document is the natural visual equivalent of "direct, precise, no marketing language." Simple code in the repo is also part of the portfolio.

Full visual spec recorded in `docs/STYLE.md` under "Visual Direction."

---

## ADR-012 — Font pairing: Spectral + Source Sans 3

**Date:** 2026-04-08
**Status:** Accepted

**Context:**
The visual direction is already set: light, editorial, restrained, document-like. The font system needs to reinforce that tone while staying highly readable in both English and Polish. The headline should carry presence and confidence without feeling like a startup hero; body text should stay neutral and easy to read.

**Decision:**
Use `Spectral` for headlines and project titles. Use `Source Sans 3` for body text and UI.

**Reasoning:**
`Spectral` gives the main headings editorial character and weight, which supports the dossier-like direction. `Source Sans 3` is a humanist sans with strong legibility and a neutral tone, which keeps longer passages calm and readable. This pairing avoids both the coder/monospace look and the generic startup-sans look. Both fonts are open-source and support Polish diacritics.

Recorded in `docs/STYLE.md` under "Stack" and "Typography."

---

## ADR-013 — Metadata and social meta direction

**Date:** 2026-04-08
**Status:** Accepted

**Context:**
The site needs finalized metadata for search and link previews, plus a clear v1 direction for the Open Graph image. This was previously tracked as an open content question and is now resolved.

**Decision:**
Use the finalized `<title>`, `meta description`, `og:title`, and `og:description` values recorded in `docs/COPY.md` under "Metadata — v1" for both English and Polish. For the OG image, use a light editorial composition aligned with the site visual system, with `Piotr Kacała`, `Product Builder`, and a short localized supporting line.

**Reasoning:**
Metadata is content, but it is also an accepted repository-level decision because it defines how the site appears in search and social previews. Recording the direction here closes the open question under the repo rules, while keeping the exact strings and localized OG image copy in `docs/COPY.md`, which is the source of truth for content.

---

## ADR-014 — Link the process narrative to the repo root

**Date:** 2026-04-08
**Status:** Accepted

**Context:**
The site references its own implementation process as part of the portfolio. An open question remained whether this narrative should link visitors to the repository root or to hand-picked commits that illustrate the process.

**Decision:**
Link to the repository root, not to specific commits.

**Reasoning:**
The repository itself is the artifact: README, docs, commit history, and agent instructions all matter together. Linking to the root gives the visitor the full context and lets them browse naturally according to their interest. Deep-linking to specific commits would over-curate the reading path, age poorly as history grows, and create maintenance work every time the narrative evolves.

---

## Superseded Open Questions Note

Open questions are now tracked in `docs/QUESTIONS.md`, not here.
