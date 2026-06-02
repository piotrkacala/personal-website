# Product

Personal website for Piotr Kacała — the third career surface after CV and LinkedIn. The homepage is
the primary profile surface. Durable static proof-artifact and machine-readable routes make the
supporting evidence independently discoverable without turning the site into a general content
system. Visitors are potential employers or consulting clients who want to understand the profile,
the method, and the public evidence behind it.

## Core Principles

- **Two-layer portfolio.** The homepage shows the profile. The repo, public proof-artifact routes,
  commit history, `AGENTS.md`, and docs-driven workflow show how the work was built and evaluated.
- The site is a controlled space, not a pitch letter. Tone is neutral — it works for both employer
  and consulting readers.
- Output speaks first. Public artifacts should carry more weight than claims that cannot be
  inspected directly.
- `Private client audit platform` remains useful private client-work proof, but it is framed as a dated
  private-project record rather than publicly verifiable runtime evidence.
- Phonetic Benchmark is a dedicated proof point for methodical coding-agent workflow evaluation,
  not a universal model ranking.
- No separate sections for skills, about, or bio. Who you are is demonstrated by what you've built,
  not listed.
- Every word earns its place. No filler, no marketing language.
- Available in English (primary) and Polish. Polish reaches a different part of the audience and
  signals local context.

## Visitor Flow

Single user type: someone evaluating Piotr as a developer, consultant, or potential hire.

**Primary flow:** Visitor arrives → reads positioning statement and expansion → reads project
narrative → optionally opens public proof artifacts → optionally contacts.

**Consulting flow:** Visitor with a relevant need follows the restrained homepage contact link →
reads the focused consulting offer → optionally returns to selected work → contacts by email.

**Acceptance criteria:**

- Visitor can understand what Piotr does and why it is unusual within 10 seconds of landing.
- Projects section conveys a deliberate five-step arc, not a random collection.
- `Private client audit platform` is compact, dated, and explicit about its private runtime.
- Phonetic Benchmark has a dedicated entry with report, gallery, methodology, and package links.
- Machine-readable artifacts preserve the same framing as the HTML homepage.
- Contact action is clear and requires no explanation.
- Consulting visitors can understand the low-friction scoping entry point and the path from scope
  to delivery without turning the homepage into a services landing page.
- Site loads fast and reads correctly on mobile.

## Current Public Scope

The following must be present and working:

- Section 1: Positioning — single headline, short expansion
- Section 2: Projects — Phonetic Alphabet Trainer, Surfaced, `Private client audit platform`, This site, and
  Phonetic Benchmark with an explicit narrative arc
- Section 3: Contact — simple CTA, no form needed
- Focused consulting route at `/consulting/` and `/pl/consulting/`, linked once from the homepage
  contact footer
- Mobile responsive, no layout breakage at 375px
- Available in English and Polish with a language switcher
- Static Phonetic Benchmark report, gallery, methodology, run-details, JSON, CSV, and markdown
  routes
- Generated EN/PL homepage markdown, `llms.txt`, `llms-full.txt`, sitemap, and project companion
  profiles
- Generated EN/PL consulting markdown at `/consulting.md` and `/pl/consulting.md`
- Deployed to production via FTP

## Non-Goals

- Blog
- Skills list or tech stack inventory
- Separate "About" page
- CV download
- Dark mode toggle
- CMS or admin interface
- Analytics
- Contact form with backend
- General-purpose long-form publishing system
- Homepage services block or general services navigation
