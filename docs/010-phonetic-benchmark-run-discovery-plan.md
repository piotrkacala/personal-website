# Phonetic Benchmark Run Discovery Plan

Execution plan for making the public Phonetic Benchmark easier to retrieve, cite, and summarize at
the level of an individual model run.

The existing report already works as the primary human-facing document. This follow-up should add
small evidence pages and structured exports around that report without turning the site into a
benchmark portal or weakening its editorial character.

---

## Goal

Keep the current report at:

```text
/phonetic-benchmark/
```

as the main reading experience while adding stable, static surfaces for questions such as:

- What were the observed strengths of GPT 5.5 High in this benchmark?
- What failed in the Kimi K2.6 run?
- Which archived artifact supports the summary for Gemini 3.1 Pro High?
- What methodology and review limitations apply to these observations?

The answer should remain factual and narrowly scoped: each page documents one run against one small
product brief. It must not present a run card as a general model review or universal ranking.

---

## Human-facing UX Invariant

The main report remains one readable document with:

- a short benchmark explanation
- the results table
- narrative findings
- selected case notes
- archived demos

Do not add a second top-level navigation system, a grid of model cards, or another large section
listing all runs.

### Results table change

Replace the current per-row archived demo action with a run-details action:

```text
Run details
```

The action should link to:

```text
/phonetic-benchmark/runs/<run-id>/
```

The table should keep its existing compact shape. Do not add another action column.

Direct archived demo links remain available:

- on the run-details page
- in the existing `Archived Demos` section
- in the screenshot gallery where direct inspection is still the primary purpose
- in the generated markdown and structured data exports

### Report metadata line

Add one restrained metadata line below the report summary:

```text
Benchmark v1 · 15 runs · Updated <date> · Methodology
```

Use localized metadata-line copy on the Polish report. `Methodology` links to the canonical English
methodology page. Mark English-only resource links visibly in Polish UI, for example:

```text
Metodologia (EN)
Szczegóły próby (EN)
```

### Machine-readable links

Add a compact resource line near the existing archived-artifact section:

```text
Machine-readable data: JSON · CSV · Markdown
```

This should be visually secondary. It exists for readers who want the raw material and for tools
that discover the report through HTML.

---

## Public Route Shape

Add static English run-details routes:

```text
/phonetic-benchmark/runs/<run-id>/
```

Add corresponding generated markdown artifacts:

```text
/phonetic-benchmark/runs/<run-id>/index.md
```

Add one canonical English methodology page:

```text
/phonetic-benchmark/methodology/
```

Add its generated markdown artifact:

```text
/phonetic-benchmark/methodology/index.md
```

Add language-neutral structured exports:

```text
/phonetic-benchmark/results.json
/phonetic-benchmark/results.csv
```

English is the canonical language for run-details pages, methodology, and structured exports. The
existing Polish report remains a human-facing localized summary and links to the canonical English
details where useful.

Do not generate Polish duplicates of retrieval-oriented run cards or methodology. LLMs can answer
Polish-language queries from the canonical English evidence pages, while a single source avoids
translation drift across 15 run cards.

---

## Run-details Page Shape

Each run-details page is an evidence card, not a new article.

Recommended section order:

1. Breadcrumb or compact link back to the main report.
2. Run title: `<model label> — Phonetic Benchmark v1 run`.
3. Scope note: one run, one product brief, not a general model ranking.
4. Structured run facts.
5. Observed strengths in this task.
6. Observed weaknesses in this task.
7. Archived evidence links.
8. Interpretation limitations.

Minimum visible facts:

- run ID
- model label
- run date
- benchmark version
- formal status
- failure types
- source LoC
- static automated test count
- stack

Minimum evidence links:

- archived demo
- screenshot
- main report
- methodology

Every run page must state that the observation is based on one run against one small product brief.

---

## Source Data Model

Keep `src/site/phonetic-benchmark.ts` as the source of truth. Extend the run data model rather than
introducing manually maintained markdown pages.

Recommended additive fields:

```ts
interface BenchmarkRunData {
  id: string;
  executionOrder: number;
  model: string;
  runDate: string;
  benchmarkVersion: "v1";
  status: BenchmarkStatus;
  failureTypes: readonly BenchmarkFailureType[];
  sourceLoc: number;
  testCount: number;
  stack: string;
}

interface BenchmarkRunCopy extends BenchmarkRunData {
  functionalRead: string;
  observedStrengths: readonly string[];
  observedWeaknesses: readonly string[];
  interpretationLimitations: readonly string[];
  detailsUrl: string;
  markdownUrl: string;
  screenshotPath: `/${string}`;
  demoUrl: string;
}
```

For `v1`, do not add provider, canonical API model identifier, or inference-effort fields to public
run facts. Those values were not captured consistently enough to support a controlled comparison.
Do not infer a default effort value from missing UI controls.

Add report-level structured metadata:

```ts
interface BenchmarkMetadata {
  version: "v1";
  publishedDate: string;
  updatedDate: string;
  coveredThroughDate: string;
}
```

These are report-level dates. Each run keeps its own `runDate`.

Add methodology copy as structured English data so HTML and markdown stay aligned.

Do not infer strengths and weaknesses automatically by splitting `functionalRead`. Populate them
explicitly from the reviewed benchmark notes. The current compact read can stay optimized for the
main report table.

---

## Methodology Page

The methodology page should make the evaluation reproducible enough to interpret correctly without
copying private working notes into the public repo.

Required sections:

1. Purpose and intended use.
2. Benchmark task, fixed input package, and public source-package link.
3. Contract `v1`.
4. Run procedure.
5. Manual review procedure.
6. Source LoC counting rule.
7. Static automated test counting rule.
8. Status definitions and failure-type definitions.
9. Interpretation limits.
10. Version history.

The methodology page should explicitly state:

- each model currently has one run
- the benchmark covers one small browser application task
- the clean `v1` benchmark package is available at
  `https://github.com/piotrkacala/phonetic-benchmark`
- the output is reviewed qualitatively
- source LoC and test counts are evidence about implementation shape, not quality scores
- archived demos are preserved snapshots, not maintained products
- `v1` did not consistently capture provider, canonical API model identifier, or inference-effort
  settings
- `v1` compares observed run outputs in the used agent workflows, not isolated model quality under
  controlled inference parameters

---

## Structured Exports

Generate `results.json` and `results.csv` from the same run data used by HTML and markdown.

### JSON shape

Recommended top-level fields:

```json
{
  "schemaVersion": "1",
  "benchmark": {
    "name": "Phonetic Benchmark",
    "version": "v1",
    "reportUrl": "https://piotrkacala.pl/phonetic-benchmark/",
    "methodologyUrl": "https://piotrkacala.pl/phonetic-benchmark/methodology/",
    "updatedDate": "YYYY-MM-DD",
    "coveredThroughDate": "YYYY-MM-DD"
  },
  "runs": []
}
```

Each run should expose facts, observations, limitations, and evidence URLs. Do not export private
workflow notes unless they are deliberately approved for publication.

### CSV shape

Keep the CSV flat and useful for comparison:

```text
run_id,execution_order,model,run_date,benchmark_version,status,failure_types,source_loc,static_automated_tests,stack,functional_read,details_url,markdown_url,demo_url,screenshot_url
```

Keep richer strengths, weaknesses, and limitations in JSON and the run-details pages. Avoid packing
multi-paragraph narrative into CSV cells.

Add provider, canonical model identifier, and effort fields only in a future benchmark version with
a required run manifest.

---

## JSON-LD

The shared layout currently emits factual `Person` JSON-LD on every page. Preserve that profile and
add optional page-level JSON-LD through a typed layout prop.

Recommended report graph:

- `Article` or `TechArticle` for the public report
- `Dataset` as the report's `mainEntity`
- `DataDownload` entries for `results.json` and `results.csv`
- `Person` as `author` and `creator`

Recommended methodology graph:

- `TechArticle`
- `Person` as `author`
- links back to the report and dataset

Recommended run-details graph:

- `Article` or `TechArticle`
- `isPartOf` pointing at the report
- `about` describing the model run
- evidence URLs matching the visible page

The structured data must only repeat claims visible in the page content or structured exports. Do
not add speculative model capabilities.

---

## Machine-readable Artifact Pipeline

Extend `src/i18n/machine-readable.ts` and the existing Astro build hook.

Generated artifacts should include:

- report markdown, as today
- canonical English methodology markdown
- canonical English markdown for every run-details page
- `results.json`
- `results.csv`
- consolidated `llms-full.txt`

Keep the main report markdown complete. Run markdown pages add focused entry points for model-centric
retrieval; they do not replace the report.

Avoid inlining every run-details page into `llms-full.txt`. The consolidated file already contains
the full report twice. Add a concise run-details directory instead so the file remains useful.

---

## Discovery

Update `public/llms.txt` with concise top-level references:

- methodology HTML and markdown
- results JSON
- results CSV
- run-details directory pattern or index

Do not list all 15 run pages in `llms.txt`. The file should remain a compact directory.

Update the sitemap with:

- canonical methodology HTML and markdown URLs
- canonical run-details HTML and markdown URLs for every run
- results JSON and CSV if included in sitemap policy
- accurate `<lastmod>` values where the source date is known

The sitemap is currently maintained manually in `public/sitemap.xml`. With 15 run pages and their
markdown variants, manual maintenance becomes fragile. Prefer generating the benchmark entries from
the structured run data at build time, or generate the full sitemap if that remains simple and
reviewable.

Keep `.well-known`, MCP, and new scanner-only capabilities out of scope.

---

## Implementation Sequence

### Phase A — approve public benchmark inputs

Use the approved public-safe inputs in `docs/011-phonetic-benchmark-publication-inputs.md`.

Acceptance target:

- public methodology copy can be written without guessing
- each run has explicit strengths, weaknesses, and limitations
- report-level publication dates have a defined source

### Phase B — extend the benchmark content model

Add report metadata, methodology copy, run observations, and URL helpers in
`src/site/phonetic-benchmark.ts`.

Acceptance target:

- one typed source can render every new surface
- no renderer parses prose to recover structured meaning

### Phase C — add run-details and methodology HTML routes

Add reusable Astro components and static English routes.

Acceptance target:

- the main report stays visually compact
- every run page links back to the English report
- every run page exposes the archived demo and screenshot
- methodology is linked from the metadata line in both report languages

### Phase D — generate markdown, JSON, and CSV artifacts

Extend the existing build-time artifact pipeline.

Acceptance target:

- HTML, markdown, JSON, and CSV derive from the same typed source
- generated files are static and FTP-deployable
- CSV escaping is standards-compliant

### Phase E — add page-level JSON-LD

Extend `Base.astro` with an optional typed page schema or schema graph prop.

Acceptance target:

- homepage behavior remains unchanged
- report, methodology, and run-details pages emit page-appropriate factual schema
- visible content and schema do not drift

### Phase F — update discovery and tests

Update `llms.txt`, `llms-full.txt`, sitemap handling, architecture docs, and tests.

Acceptance target:

- compact discovery points toward the new resources
- sitemap maintenance does not require manually adding four entries per run
- tests fail if a run lacks a details page, markdown artifact, observation fields, or evidence URL

---

## Publication Inputs

The current repo already contains:

- 15 run IDs and display labels
- execution order
- run dates
- formal statuses
- failure types
- source LoC values
- static automated test counts
- stack summaries
- compact EN/PL functional reads
- screenshots
- archived demos
- selected narrative case notes

Public-safe methodology boundaries, private audit exclusions, and run-level publication drafts have
now been copied into:

```text
docs/011-phonetic-benchmark-publication-inputs.md
```

The publication inputs are ready for implementation. No unresolved publication inputs remain.

Do not make the personal-site build depend on private notes or files outside this repository.

---

## Benchmark V2 Follow-up

`v1` did not consistently capture inference parameters. It remains publishable as a qualitative
comparison of observed run outputs, but it must not imply a controlled comparison of isolated model
quality.

Before starting `v2`, add a required run manifest that records:

- benchmark version
- public run ID
- display label
- canonical model identifier
- provider or gateway
- editor or agent interface
- requested effort or reasoning setting
- effective effort or reasoning setting when exposed by the provider
- explicit `unknown` when the interface does not expose the effective value
- run date
- baseline commit

Version the manifest with the benchmark package. Do not silently retrofit inferred values into
historical `v1` runs.

---

## Tests and Validation

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Add focused coverage for:

- artifact inventory
- one canonical English HTML and markdown details page per run
- methodology HTML and markdown alternates
- JSON schema shape and all 15 run IDs
- CSV header, row count, and escaping
- report links to run details rather than direct demos in the results table
- continued direct demo links in the archived-demo section and gallery
- page-level JSON-LD on report, methodology, and run-details pages
- compact `llms.txt` references
- sitemap coverage without manual per-run drift
- consistent report update dates across HTML, markdown, JSON-LD, JSON, CSV metadata where relevant

---

## Non-Goals

- No model leaderboard.
- No universal model recommendations.
- No aggregate score invented for retrieval convenience.
- No blog or CMS.
- No client-side filtering or JavaScript search.
- No live benchmark runner.
- No duplication of private working notes.
- No dependency on files outside this public repo at build time.
- No `.well-known`, MCP, or scanner-only capability surface.

---

## Risks To Avoid

- implying that one run is a general review of a model
- turning the main report into a dense directory
- adding a second manually maintained content source for run pages
- publishing model metadata that has not been verified
- letting JSON-LD claim more than the visible report
- bloating `llms-full.txt` by repeating every run card
- manually maintaining dozens of sitemap entries that can be generated

---

## Definition Of Done

- the main report remains calm and readable for humans
- the results table links to focused run-details pages without adding a new column
- every run has canonical English HTML and markdown evidence cards
- methodology is public, canonical in English, and linked from both report languages
- JSON and CSV exports are generated from the same source data
- report, methodology, and run pages emit accurate page-level JSON-LD
- `llms.txt`, `llms-full.txt`, and the sitemap expose the new resources without becoming noisy
- all outputs remain static and deployable through the existing FTP workflow
