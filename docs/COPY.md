# Copy and Voice

Content guidelines for the personal website. This document is the reference for all text decisions.

**Primary source:** private positioning context, intentionally not required during implementation.
The summary below contains everything needed to write website copy.

---

## Positioning Context (summary)

**Background:** In IT since 2013 (building web pages since ~2000). Full stack JavaScript. Never identified as a tool-specific developer — rode every technology shift without resistance. Wore many hats: development, design, product, QA. Self-taught. Before IT: ran a business in trade — understands budgets, costs, and when to stop.

**Current position:** AI agents are the implementation interface. Piotr owns the product decisions,
system boundaries, review, integration, and outcome. AI is the implementation method, not the
professional identity.

**The core edge:** Judgment, mental models, and vocabulary built over 13 years across multiple disciplines. Can write a design brief, a QA report, a product requirement. Can context-switch prompting registers like talking to different people on a team — a wide prompting vocabulary most people don't have. Also text-native: consumes by reading, thinks in text, always reads docs over video. AI interfaces are text interfaces — this clicks naturally.

**Key ideas (established, don't relitigate):**

- The AI answers the question you ask. It won't tell you you're asking the wrong question. Experience knows which questions to ask before the problem surfaces.
- Prompting mirrors leading a team. Prompt in the language of the domain — like writing a Slack message to a dev, a bug report to QA, a brief to a designer. Models were trained on exactly that data.
- "The design is visually busy, relax it" lands in one pass. "Make it pretty" is a gamble. The prompt is only as good as the thinking behind it.
- Tool knowledge still matters — not for remembering commands, but for knowing which door to open. Experience built the map.
- AI compressed the technical timeline by an order of magnitude. But the human timeline (decisions, feedback, priorities) stayed the same. The bottleneck is no longer technical.
- Never been precious about tools. Never tied worth to syntax. Every technology shift confirmed the strategy: depth in judgment, not tools.
- Writes more now than ever did when coding. The interface became writing.
- AI agents are the implementation interface. Piotr owns the product decisions, system boundaries,
  review, integration, and outcome.

**Professional direction:** The natural profile is an accountable owner of product context and delivery decisions across product, UX, implementation, review, and release. This does not replace independent QA, security review, or specialist expertise where risk requires them. Independent project delivery through consulting and own products is the primary direction; selected early-stage founding-engineer or AI-product roles may also fit.

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

**Numeric claims:** derive metrics from structured source data when it exists; benchmark counts and
evidence totals come from `src/site/phonetic-benchmark.ts`. Maintain other project metrics manually.
Date any manually maintained quantitative claim inline and refresh it after material project changes
or before a major copy refresh.

---

## Section 1 — Positioning

**Headline:** Product Builder

**Responsibility statement (EN, July 2026):**

AI agents are the implementation interface. I own the product decisions, system boundaries, review,
and outcome.

I have worked across development, design, product, and QA since 2013. That range lets me turn
ambiguous ideas into scoped systems, direct agents in the language of each discipline, integrate the
result, and decide what is ready to ship.

**Responsibility statement (PL, July 2026):**

Agenty AI są interfejsem implementacji. Ja odpowiadam za decyzje produktowe, granice systemu, review i
rezultat.

Od 2013 roku pracuję na styku developmentu, designu, produktu i QA. Dzięki temu potrafię zamienić
niejasny pomysł w konkretny system, prowadzić agenty językiem każdej z tych domen, zintegrować rezultat
i zdecydować, co jest gotowe do wdrożenia.

**Original brief — should convey:**

- In IT since 2013, with AI agents now used as the implementation interface
- The core edge: product decisions, system boundaries, review, integration, and outcome ownership
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

**Finalized arc framing (EN, July 2026):**

The public work shows the method from different angles: an existing codebase, a released extension
built from a written specification, this repository as an inspectable workflow artifact, and a
task-specific benchmark with archived results.

**Finalized arc framing (PL, July 2026):**

Publiczne projekty pokazują tę metodę z różnych stron: istniejący codebase, opublikowane rozszerzenie
zbudowane z pisemnej specyfikacji, to repozytorium jako sprawdzalny artefakt workflow i zadaniowy
benchmark z archiwalnymi wynikami.

**Current brief:** The public proof hierarchy must stay explicit, not implied. Phonetic Alphabet
Trainer = testing an existing codebase. Surfaced = first docs-first build from scratch and public store
review. The site itself = inspectable workflow artifact and host for public utilities. Phonetic
Benchmark = task-specific, archived evidence of coding-agent implementation review.

### Phonetic Alphabet Trainer

**Finalized description (EN, April 2026):**

I reopened an existing React project to test how AI handles a real codebase and compare models and
IDEs. Along the way, I discovered that the published Polish Ministry of Defence phonetic alphabet
omits some letters. The app ships in English and Polish, with scoring, two answer modes, and streak
tracking.

The project later became the product brief for Phonetic Benchmark.

- Link: piotrkacala.github.io/phonetic/

**Finalized description (PL, April 2026):**

Otworzyłem ponownie istniejący projekt w React, żeby sprawdzić, jak AI radzi sobie z istniejącym
codebase i porównać modele oraz IDE. Po drodze odkryłem, że opublikowany przez Ministerstwo Obrony
Narodowej alfabet fonetyczny pomija część liter. Aplikacja działa po polsku i angielsku, ma punktację,
dwa tryby odpowiedzi i śledzenie serii.

Projekt stał się później bazą briefu produktowego dla Phonetic Benchmark.

- Link: piotrkacala.github.io/phonetic/

### Surfaced

**Finalized description (EN, April 2026):**

Surfaced was my first project built from scratch: I wrote a docs-first specification, then used AI
agents for implementation. The browser extension tracks scroll depth and adds increasingly direct
reminders when someone scrolls too far through an interface with no natural endpoint. It passed
Mozilla's public review and is available from Firefox Add-ons and the Chrome Web Store.

- Firefox Add-ons: Surfaced — target: addons.mozilla.org/firefox/addon/surfaced/
- Chrome Web Store: Surfaced — target:
  chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem

**Finalized description (PL, April 2026):**

Surfaced był moim pierwszym projektem zbudowanym od zera: napisałem docs-first specyfikację, a do
implementacji wykorzystałem agenty AI. Rozszerzenie śledzi głębokość scrolla i dodaje coraz bardziej
bezpośrednie przypomnienia w miarę zagłębiania się użytkownika w interfejs bez naturalnego końca.
Przeszło publiczny review Mozilli i jest dostępne w Firefox Add-ons oraz Chrome Web Store.

- Firefox Add-ons: Surfaced — target: addons.mozilla.org/firefox/addon/surfaced/
- Chrome Web Store: Surfaced — target:
  chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem

### This site

**Finalized description (EN, May 2026):**

This repository makes the working method inspectable. I define the product, content model, system
boundaries, and review criteria; agents implement against the documentation; I integrate and verify
the result. The repo is public and intentionally readable, including AGENTS.md, the docs directory,
tests, and commit history.

The site now also hosts small public utilities. The first one is `400m`, a local-first GPX track tool for runners that estimates corrected distance from lap progress instead of raw GPS length.

- Repo: github.com/piotrkacala/personal-website
- Tool: piotrkacala.pl/400m/

**Finalized description (PL, May 2026):**

To repozytorium pokazuje metodę pracy w sprawdzalnej formie. Ja definiuję produkt, model treści, granice
systemu i kryteria review; agenty implementują według dokumentacji; ja integruję i weryfikuję rezultat.
Repo jest publiczne i celowo czytelne — razem z AGENTS.md, katalogiem docs, testami i historią
commitów.

Strona hostuje teraz także niewielkie publiczne narzędzia. Pierwszym z nich jest `400m`: local-first narzędzie do analizy GPX z bieżni, które szacuje skorygowany dystans z postępu po okrążeniach zamiast z surowej długości śladu GPS.

- Repo: github.com/piotrkacala/personal-website
- Narzędzie: piotrkacala.pl/400m/

### Phonetic Benchmark

**Finalized description (EN, July 2026):**

A practical, task-specific evaluation of coding-agent outputs. The report covers 43 archived outputs:
28 in the current v2 batch and 15 in the original v1 snapshot. I define the contract and review each
result for required behavior, UX, testing, and delivery evidence. This is not a universal model
ranking.

- Report: piotrkacala.pl/phonetic-benchmark/
- Gallery: piotrkacala.pl/phonetic-benchmark/gallery/
- Methodology: piotrkacala.pl/phonetic-benchmark/methodology/
- Public benchmark package: github.com/piotrkacala/phonetic-benchmark

**Finalized description (PL, July 2026):**

Praktyczna, zadaniowa ewaluacja outputów agentów programistycznych. Raport obejmuje 43 archiwalne
wyniki: 28 w aktualnym batchu v2 i 15 w oryginalnym snapshocie v1. Definiuję kontrakt i sprawdzam
każdy wynik pod kątem wymaganego zachowania, UX, testów i materiałów potwierdzających sposób
dostarczenia. To nie jest uniwersalny ranking modeli.

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

The offer leads with bounded delivery rather than a standalone scoping package:

- one accountable owner retains project context and delivery decisions from first-version
  definition to an agreed completion point
- internal workflow tools and bounded web platforms lead the project examples; product and company
  websites remain valid but secondary
- the first contact is free; substantial uncertainty may require a separate paid definition stage
- pricing follows an agreed result or stage rather than an open ticket queue
- delivery, optional maintenance, and operational responsibility are agreed for the specific
  project
- project fit depends on accessible decisions and a responsible technical and operational risk
  boundary
- AI agents are the implementation interface, with human ownership of product decisions, system
  boundaries, review, and outcome

Do not publish a standard price range, minimum budget, delivery duration, response-time commitment,
maintenance level, or contract mechanics until real engagement evidence supports durable defaults.

The finalized localized public strings live in `src/i18n/en.ts` and `src/i18n/pl.ts`.

---

## Metadata

**Finalized values (EN, July 2026):**

- `<title>`: `Piotr Kacała`
- `meta description`: `Piotr Kacała is a Product Builder who owns product decisions, system boundaries, review, and outcomes while AI agents provide the implementation interface.`
- `og:title`: `Piotr Kacała`
- `og:description`: `AI agents are the implementation interface. I own the product decisions, system boundaries, review, and outcome.`

**Finalized values (PL, July 2026):**

- `<title>`: `Piotr Kacała`
- `meta description`: `Piotr Kacała jest Product Builderem odpowiedzialnym za decyzje produktowe, granice systemu, review i rezultat; agenty AI są interfejsem implementacji.`
- `og:title`: `Piotr Kacała`
- `og:description`: `Agenty AI są interfejsem implementacji. Ja odpowiadam za decyzje produktowe, granice systemu, review i rezultat.`

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
