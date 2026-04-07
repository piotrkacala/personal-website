# Copy and Voice

Content guidelines for the personal website. This document is the reference for all text decisions.

**Primary source:** `../personal-os/positioning/positioning-context.md` (private repo, not accessible during implementation). The summary below contains everything needed to write website copy.

---

## Positioning Context (summary)

**Background:** In IT since 2013 (building web pages since ~2000). Full stack JavaScript. Never identified as a tool-specific developer — rode every technology shift without resistance. Wore many hats: development, design, product, QA. Self-taught. Before IT: ran a business in trade — understands budgets, costs, and when to stop.

**Current position:** Zero-code, full AI agent development. Not an experiment — a conclusion. More productive now than at any point in career. Building weeks of work in days, across the full product stack, solo.

**The core edge:** Judgment, mental models, and vocabulary built over 13 years across multiple disciplines. Can write a design brief, a QA report, a product requirement. Can context-switch prompting registers like talking to different people on a team — a wide prompting vocabulary most people don't have. Also text-native: consumes by reading, thinks in text, always reads docs over video. AI interfaces are text interfaces — this clicks naturally.

**Key ideas (established, don't relitigate):**
- The AI answers the question you ask. It won't tell you you're asking the wrong question. Experience knows which questions to ask before the problem surfaces.
- Prompting mirrors leading a team. Prompt in the language of the domain — like writing a Slack message to a dev, a bug report to QA, a brief to a designer. Models were trained on exactly that data.
- "The design is visually busy, relax it" lands in one pass. "Make it pretty" is a gamble. The prompt is only as good as the thinking behind it.
- Tool knowledge still matters — not for remembering commands, but for knowing which door to open. Experience built the map.
- Bug rate on mojeaudyty.pl felt the same as classically coded projects. The "AI code must be buggy" counter-argument doesn't hold.
- AI compressed the technical timeline by an order of magnitude. But the human timeline (decisions, feedback, priorities) stayed the same. The bottleneck is no longer technical.
- Never been precious about tools. Never tied worth to syntax. Every technology shift confirmed the strategy: depth in judgment, not tools.
- Writes more now than ever did when coding. The interface became writing.

**Career direction:** The natural profile is a "mini firm" — product decisions, real problem solving, UX, design, outcome delivery, without a team. Most probable trajectory: consulting as the base, own products as the long-term bet. Employment for the right early-stage startup (founding engineer, AI product role).

**Job title:** Product Builder. "Engineer" implies writing code. "Builder" means someone who sees a project through to the end. AI is the method, not the identity.

**Tone calibration:** The productivity claims are true but shouldn't lead — too easy to dismiss before trust is established. Let output speak first.

---

## Voice and Tone

Direct and precise. No marketing language, no LinkedIn corporate fluff, no buzzword stacking. The writing reflects someone who thinks clearly and writes to be understood, not to impress.

**Dos:**
- Say what's true. Let the numbers and the output speak.
- Active voice. "I built X" not "X was built."
- Specific over general. "295 commits, 25 DB models" over "large-scale application."
- Neutral register — readable by both a technical founder and a non-technical client.

**Don'ts:**
- "Passionate about", "results-driven", "leverage", "synergy", or any phrase that belongs on a bad LinkedIn profile
- Explaining that AI is a tool (this is obvious)
- Hedging or qualifying the productivity claims — they are documented and confirmed
- Referring to yourself in third person

---

## Language

**English** — primary language, default route (`/`). International reach, GitHub audience, employer and consulting clients outside Poland.

**Polish** — full translation at `/pl/`. Not a reduced version — all sections, same content, same quality. Polish is Piotr's first language; Polish-speaking clients and employers get a site in their own language.

**Language switcher:** visible on the page, simple toggle between EN and PL.

**Translation approach:** all strings centralized in `src/i18n/en.ts` and `src/i18n/pl.ts`. No hardcoded UI text in components. Polish IT terms (agent, framework, commit, deploy) stay in English within Polish text — this is standard Polish IT writing convention.

**Numeric claims:** project metrics are maintained manually, not generated automatically. Any quantitative claim shown on the site should be dated inline ("as of April 2026") and refreshed manually after material project changes or before a major copy refresh.

---

## Section 1 — Positioning

**Headline:** Product Builder

Short expansion (4–6 sentences). Should convey:
- In IT since 2013, zero-code AI development since early 2026
- The core edge: judgment, mental models, and vocabulary built over 13 years — not syntax
- The prompting vocabulary point: can write in the register of a developer, a QA engineer, a designer, a product manager — and AI was trained on exactly that data
- Text-native, which is an advantage when the interface is text
- The competitive edge is knowing which questions to ask before the problem surfaces

**Lines available as raw material (from positioning-context.md):**
- *The AI answers the question you ask. Experience knows which questions to ask.*
- *You can't prompt your way out of not knowing what to ask.*
- *AI writes the code. Experience decides if it's worth shipping.*
- *I write more now than I ever did when I was coding.*
- *Technology changes, judgment doesn't.*
- *I don't need to remember every command. I need to know which door to open. Experience built the map.*
- *The prompt is only as good as the thinking behind it.*
- *Using AI as autocomplete is like asking an elephant to carry a feather.*
- *AI compressed the technical timeline. The human timeline stayed the same.*
- *AI is the method, not the identity. I don't want to be the jQuery developer of 2030.*
- *Prompt in the language of the domain. Jargon isn't gatekeeping — it's precision.*

---

## Section 2 — Projects

Three projects, presented in deliberate arc order. The arc is explicit, not implied.

### Arc framing (opening or connecting sentence)
Phonetic = testing whether AI understands an existing codebase.
Surfaced = first docs-driven build from scratch.
mojeaudyty.pl = validation on a real product for a real customer.
This is a deliberate, documented progression — not a random collection of side projects.

### Phonetic Alphabet Trainer
- Existing React project reopened to test AI on a real codebase
- Used to compare models and IDEs (Cursor, Windsurf, Copilot-style autocomplete)
- Discovered a gap in Polish Ministry of Defence documentation (missing letters in official Polish phonetic alphabet)
- Ships in English and Polish; scoring logic, two answer modes, time limits, streak tracking, tests, changelog
- Link: piotrkacala.github.io/phonetic/

### Surfaced
- First project built docs-driven from scratch, zero-code
- Firefox extension: tracks scroll depth, notifies when you've gone too far into infinite scroll — three depth zones with escalating urgency
- Passed Mozilla public review; listed on Firefox Add-ons
- The "why" is a product decision, not a technical one
- Link: addons.mozilla.org/firefox/addon/surfaced/

### mojeaudyty.pl
- First full production project with the mature workflow
- Built spec-first for a real customer
- **Numbers (current as of April 2026):** ~21,000 lines of production code, ~9,400 lines of tests, 295 commits, 25 DB models, ~96 API routes, 37 pages, 50 components, full i18n (PL+EN)
- **The validation story:** Before the project was done, asked both AI models and an experienced CEO to estimate the project. Both landed at 13–17 weeks for one developer. The CEO confirmed — and was visibly surprised when told the project was already finished.
- Cumulative build time: ~25–30 days. Solo no-AI estimate: 5–8 months. Speedup ratio: ~15–20x.
- Site is invite-only; no public trace; no NDA issue; full numbers can be shown

---

## Section 3 — Contact

Simple and direct. No explanation needed.

Something like: "Get in touch." followed by an email address or a mailto link.

No contact form at v1. No "I'm open to opportunities" hedging — just the address.

---

## What to Avoid Across All Sections

- "AI enthusiast" or "AI-first developer" — too generic
- Listing technologies ("React, TypeScript, Astro, PostgreSQL...") — skills lists belong on a CV, not here
- Explaining the shift from traditional coding to AI development in a way that sounds like an apology
- Any sentence that implies the reader needs to be convinced AI is legitimate
