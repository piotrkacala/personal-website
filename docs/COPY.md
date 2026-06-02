# Copy and Voice

Content guidelines for the personal website. This document is the reference for all text decisions.

**Primary source:** private positioning context, intentionally not required during implementation.
The summary below contains everything needed to write website copy.

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
- Bug rate on Private client audit platform felt the same as classically coded projects. The "AI code must be buggy" counter-argument doesn't hold.
- AI compressed the technical timeline by an order of magnitude. But the human timeline (decisions, feedback, priorities) stayed the same. The bottleneck is no longer technical.
- Never been precious about tools. Never tied worth to syntax. Every technology shift confirmed the strategy: depth in judgment, not tools.
- Writes more now than ever did when coding. The interface became writing.
- AI agents are the build interface. The differentiator is judgment across product, design, QA, and development.

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

**Finalized expansion (EN, April 2026):**

In IT since 2013, across development, design, product, and QA — never tied to a single tool, always focused on output. Since early 2026, I build entirely through AI agents, zero-code. The competitive edge isn't the tooling — it's knowing which questions to ask before the problem surfaces, and being able to prompt in the language of the domain: like a developer, a QA engineer, a designer, or a product manager. AI performs best on exactly that kind of material. The interface became writing, and I've been text-native my whole career.

> Note: "Since early 2026" is time-relative — review and update annually.

**Finalized expansion (PL, April 2026):**

W IT jestem od 2013 roku, na styku developmentu, designu, produktu i QA — nigdy przywiązany do jednego narzędzia, zawsze skupiony na rezultacie. Od początku 2026 buduję w całości przez agenty AI, zero-code. Przewaga nie leży w toolingu, tylko w tym, że wiem, jakie pytania zadać, zanim problem w ogóle się ujawni, i potrafię promptować w języku danej domeny: jak developer, QA engineer, designer albo product manager. AI działa najlepiej właśnie na takim materiale. Interfejs stał się pisaniem, a ja przez całą karierę pracowałem przede wszystkim w tekście.

**Original brief — should convey:**

- In IT since 2013, zero-code AI development since early 2026
- The core edge: judgment, mental models, and vocabulary built over 13 years — not syntax
- The prompting vocabulary point: can write in the register of a developer, a QA engineer, a designer, a product manager — and AI was trained on exactly that data
- Text-native, which is an advantage when the interface is text
- The competitive edge is knowing which questions to ask before the problem surfaces

**Lines available as raw material (from positioning-context.md):**

- _The AI answers the question you ask. Experience knows which questions to ask._
- _You can't prompt your way out of not knowing what to ask._
- _AI writes the code. Experience decides if it's worth shipping._
- _I write more now than I ever did when I was coding._
- _Technology changes, judgment doesn't._
- _I don't need to remember every command. I need to know which door to open. Experience built the map._
- _The prompt is only as good as the thinking behind it._
- _Using AI as autocomplete is like asking an elephant to carry a feather._
- _AI compressed the technical timeline. The human timeline stayed the same._
- _AI is the method, not the identity. I don't want to be the jQuery developer of 2030._
- _Prompt in the language of the domain. Jargon isn't gatekeeping — it's precision._

---

## Section 2 — Projects

**Finalized arc framing (EN, June 2026):**

Each project marks a deliberate next step. Testing AI on an existing codebase. Building from scratch, docs-first, zero-code. Delivering a full product for a real customer. Building this site as a public artifact. Then making coding-agent evaluation public.

**Finalized arc framing (PL, June 2026):**

Każdy projekt to świadomie wybrany kolejny krok. Sprawdzenie AI na istniejącym codebase. Budowa od zera, docs-first, zero-code. Pełny produkt dla realnego klienta. Ta strona jako publiczny artifact. Potem publiczna ewaluacja agentów programistycznych.

**Current brief:** The core arc must stay explicit, not implied. Phonetic Alphabet Trainer = testing whether AI understands an existing codebase. Surfaced = first docs-driven build from scratch. `Private client audit platform` = validation on a real product for a real customer. The site itself = public workflow artifact. Phonetic Benchmark = public evidence of methodical coding-agent workflow evaluation.

### Phonetic Alphabet Trainer

**Finalized description (EN, April 2026):**

An existing React project, reopened to test how AI handles a real codebase — and to compare models and IDEs. Along the way, discovered missing letters in the official Polish Ministry of Defence phonetic alphabet. Ships in English and Polish with scoring, two answer modes, and streak tracking.

The project later became the product brief for Phonetic Benchmark.

- Link: piotrkacala.github.io/phonetic/

**Finalized description (PL, April 2026):**

Istniejący projekt w React, otwarty ponownie, żeby sprawdzić, jak AI radzi sobie z istniejącym codebase — i porównać modele oraz IDE. Po drodze wyszły na jaw brakujące litery w oficjalnym alfabecie fonetycznym Ministerstwa Obrony Narodowej. Działa po angielsku i po polsku, ma scoring, dwa tryby odpowiedzi i śledzenie serii.

Projekt stał się później bazą briefu produktowego dla Phonetic Benchmark.

- Link: piotrkacala.github.io/phonetic/

### Surfaced

**Finalized description (EN, April 2026):**

First project built from scratch, docs-driven, zero-code. A browser extension that tracks scroll depth and notifies you when you've gone too far — three depth zones with escalating urgency. Passed Mozilla's public review and is available from Firefox Add-ons and the Chrome Web Store.

- Firefox: addons.mozilla.org/firefox/addon/surfaced/
- Chrome: chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem

**Finalized description (PL, April 2026):**

Pierwszy projekt zbudowany od zera, docs-driven, zero-code. Rozszerzenie do przeglądarki, które śledzi głębokość scrolla i powiadamia, gdy zajdziesz za daleko — trzy strefy głębokości i rosnący poziom pilności. Przeszło publiczny review Mozilli i jest dostępne w Firefox Add-ons oraz Chrome Web Store.

- Firefox: addons.mozilla.org/firefox/addon/surfaced/
- Chrome: chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem

### Private client audit platform

**Finalized description (EN, June 2026):**

First full production project, built spec-first for a real customer. As of April 2026: ~21,000 lines of production code, ~9,400 lines of tests, and 295 commits.

Private client project — no public runtime link.

> Note: project metrics are a dated April 2026 snapshot. Review before a later copy refresh.

**Finalized description (PL, June 2026):**

Pierwszy pełny projekt produkcyjny, zbudowany spec-first dla realnego klienta. Stan na kwiecień 2026: ~21,000 linii kodu produkcyjnego, ~9,400 linii testów i 295 commitów.

Prywatny projekt kliencki — bez publicznego linku do działającej aplikacji.

### This site

**Finalized description (EN, May 2026):**

Built the same way — spec-first, docs-driven, zero-code — but with one addition: an orchestrator agent that stepped through the implementation plan autonomously, generating prompts, reading results, handling review. The first project where the workflow managed itself. The repo is public and intentionally readable: AGENTS.md, full docs directory, clean commit history.

The site now also hosts small public utilities. The first one is `400m`, a local-first GPX track tool for runners that estimates corrected distance from lap progress instead of raw GPS length.

- Repo: github.com/piotrkacala/personal-website
- Tool: piotrkacala.pl/400m/

**Finalized description (PL, May 2026):**

Zbudowana tak samo — spec-first, docs-driven, zero-code — ale z jednym dodatkiem: agent orkiestrujący, który samodzielnie przechodził przez plan implementacji, generował prompty, czytał wyniki i obsługiwał przegląd zmian. To pierwszy projekt, w którym workflow zarządzał samym sobą. Repo jest publiczne i celowo czytelne: AGENTS.md, pełny katalog docs, czysta historia commitów.

Strona hostuje teraz także niewielkie publiczne narzędzia. Pierwszym z nich jest `400m`: local-first narzędzie do analizy GPX z bieżni, które szacuje skorygowany dystans z postępu po okrążeniach zamiast z surowej długości śladu GPS.

- Repo: github.com/piotrkacala/personal-website
- Narzędzie: piotrkacala.pl/400m/

### Phonetic Benchmark

**Finalized description (EN, June 2026):**

A practical, task-specific evaluation of coding-agent outputs. Fifteen models received the same docs-first brief for a small browser app. I archived every result and reviewed contract compliance, UX behavior, testing, and delivery quality. This is not a universal model ranking. It is a documented comparison of how coding-agent workflows behave on the same product task.

- Report: piotrkacala.pl/phonetic-benchmark/
- Gallery: piotrkacala.pl/phonetic-benchmark/gallery/
- Methodology: piotrkacala.pl/phonetic-benchmark/methodology/
- Public benchmark package: github.com/piotrkacala/phonetic-benchmark

**Finalized description (PL, June 2026):**

Praktyczna, zadaniowa ewaluacja outputów agentów programistycznych. Piętnaście modeli dostało ten sam docs-first brief małej aplikacji webowej. Każdy wynik zarchiwizowałem i sprawdziłem pod kątem zgodności z kontraktem, UX, testów i jakości dostarczenia. To nie jest uniwersalny ranking modeli, tylko udokumentowane porównanie zachowania workflow agentów na tym samym zadaniu produktowym.

- Raport: piotrkacala.pl/pl/phonetic-benchmark/
- Galeria: piotrkacala.pl/pl/phonetic-benchmark/gallery/
- Metodologia (EN): piotrkacala.pl/phonetic-benchmark/methodology/
- Publiczny pakiet benchmarku: github.com/piotrkacala/phonetic-benchmark

---

## Section 3 — Contact

**Finalized (EN, April 2026):**

Get in touch: kontakt@piotrkacala.pl

No contact form at v1. No "I'm open to opportunities" hedging — just the address.

**Finalized (PL, April 2026):**

Kontakt: kontakt@piotrkacala.pl

---

## Consulting Surface

The homepage stays compact. Add one restrained localized link in the contact footer:

- EN: `Looking for product consulting? See how I work.`
- PL: `Szukasz wsparcia produktowego? Zobacz, jak pracuję.`

The dedicated bilingual consulting surface lives at `/consulting/` and `/pl/consulting/`. It is a
focused next-step page for visitors with a relevant need, not the beginning of a general services
section or publishing system.

The offer leads with product clarity and delivery:

- a short fixed-scope product scoping pass when the idea is still rough
- direct build planning when the client already has a clear brief
- end-to-end specification, implementation, testing, deployment, and iteration when the project
  fits
- AI agent workflows as part of the method, with model role design included when AI belongs inside
  the product itself

The finalized localized public strings live in `src/i18n/en.ts` and `src/i18n/pl.ts`.

---

## Metadata

**Finalized values (EN, June 2026):**

- `<title>`: `Piotr Kacała — Product Builder`
- `meta description`: `Personal website of Piotr Kacała. AI agents are the build interface. The differentiator is judgment across product, design, QA, and development.`
- `og:title`: `Piotr Kacała — Product Builder`
- `og:description`: `AI agents are the build interface. The differentiator is judgment across product, design, QA, and development.`

**Finalized values (PL, June 2026):**

- `<title>`: `Piotr Kacała — Product Builder`
- `meta description`: `Strona Piotra Kacały. Agenty AI są interfejsem budowy. Wyróżnikiem są ocena i decyzje na styku produktu, designu, QA i developmentu.`
- `og:title`: `Piotr Kacała — Product Builder`
- `og:description`: `Agenty AI są interfejsem budowy. Wyróżnikiem są ocena i decyzje na styku produktu, designu, QA i developmentu.`

**OG image direction (v1):**

- Light editorial image that feels like a cropped extension of the site, not a promo banner
- Primary content: `Piotr Kacała` and `Product Builder`, with one short supporting line localized per language
- Supporting line (EN): `Across product, design, QA, and development.`
- Supporting line (PL): `Na styku produktu, designu, QA i developmentu.`
- Same visual language as the page: restrained typography, off-white background, thin rule, minimal accent color
- No portrait, no screenshots, no logos, no device mockups, no decorative AI imagery
- The image should communicate calm clarity and document-like credibility before it communicates "personal brand"

---

## What to Avoid Across All Sections

- "AI enthusiast" or "AI-first developer" — too generic
- Listing technologies ("React, TypeScript, Astro, PostgreSQL...") — skills lists belong on a CV, not here
- Explaining the shift from traditional coding to AI development in a way that sounds like an apology
- Any sentence that implies the reader needs to be convinced AI is legitimate
