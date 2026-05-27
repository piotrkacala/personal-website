# Phonetic Benchmark Report Implementation Plan

Plan for adding a public, linkable Phonetic Benchmark results report to the personal website.

This is a standalone report page, not a blog post and not the start of a CMS. It should preserve
the site's static, repo-controlled, machine-readable publishing model.

## Goal

Publish a static report page at:

```text
/phonetic-benchmark/
```

The page should:

- state the benchmark protocol briefly
- summarize the first three model runs
- emphasize qualitative findings over a numeric leaderboard
- link to archived demo artifacts already stored under `public/phonetic-benchmark/demos/`
- link back to the homepage and reinforce the portfolio positioning
- expose a machine-readable markdown equivalent through the existing artifact pipeline

## Non-Goals

- No blog system.
- No CMS.
- No client-side JavaScript.
- No server-side rendering.
- No live benchmark runner.
- No private working notes or local-only context copied into the public repo.
- No implementation plan that depends on material outside this repository.

## Source Data

Create structured source data in TypeScript, likely:

```text
src/site/phonetic-benchmark.ts
```

Recommended data shape:

- report title and summary
- benchmark protocol notes
- benchmark run records:
  - model label
  - reasoning or effort label
  - prompt count
  - elapsed time
  - source LoC by current counting rule
  - stack
  - demo URL
  - notes discipline
  - git usage note
  - primary finding
  - qualitative verdict
- artifact links
- optional screenshot metadata

Use TypeScript rather than markdown as the source of truth because the report contains repeatable
structured records that need to render consistently in HTML, markdown, and tests.

## Human-Facing Pages

Add an English report route:

```text
src/pages/phonetic-benchmark/index.astro
```

Add a Polish report route:

```text
src/pages/pl/phonetic-benchmark/index.astro
```

The Polish homepage should not link to an English-only report. If the report is surfaced in both
homepage languages, both report pages should exist.

The report layout can reuse the existing `Base.astro` shell or introduce a narrow report-specific
component layer while keeping the same editorial visual language.

Suggested report structure:

1. Title and summary.
2. Link back to the homepage.
3. Benchmark protocol and methodology.
4. Results table for the first three runs.
5. Qualitative findings.
6. Archived demo links.
7. Optional screenshot section.
8. Short closing note tying the report back to developer judgment and AI-agent workflow quality.

The benchmark protocol should stay short because it is stable across reports: each model is tested
on whether it can deliver a working project that matches the specification and survives a manual
walkthrough of the intended user path. The report should focus on the resulting artifacts,
tradeoffs, and observed quality differences, not on re-explaining the same benchmark premise each
time.

## Homepage Integration

Add a compact project entry to the existing Projects section, likely after `Phonetic Alphabet
Trainer`.

Purpose of the entry:

- show that Phonetic became a benchmark surface, not only an app
- point to the public report
- avoid turning the homepage into the report itself

The entry should be concise and should not duplicate the full methodology or findings.

## Machine-Readable Integration

Extend the existing machine-readable layer in `src/i18n/machine-readable.ts`.

Expected generated artifacts:

```text
/phonetic-benchmark/index.md
/pl/phonetic-benchmark/index.md
```

Required discovery updates:

- add report links to `public/llms.txt`
- include the report in `/llms-full.txt`
- add `rel="alternate" type="text/markdown"` links on the report pages
- add report URLs and markdown URLs to `public/sitemap.xml`
- add or update tests in `tests/machine-readable-artifacts.test.ts`

The report is owned by this Astro repo, so it does not need a `/projects/<slug>.md` companion
profile. Companion profiles remain for externally deployed tools or surfaces.

## Archived Demo Links

Use the already archived demo paths:

```text
/phonetic-benchmark/demos/gpt-5-4-high/index.html
/phonetic-benchmark/demos/gpt-5-5-high/index.html
/phonetic-benchmark/demos/gemini-3-5-flash-high/index.html
```

These are static artifacts. The report should describe them as archived outputs, not as live
benchmark infrastructure.

## Screenshots

Screenshots are optional for the first implementation but should use this path if added:

```text
public/phonetic-benchmark/screenshots/
```

Preferred naming:

```text
gpt-5-4-high-quiz.png
gpt-5-5-high-quiz.png
gemini-3-5-flash-high-quiz.png
```

Primary screenshot standard:

- viewport: `1440x900`
- state: active quiz, not setup screen
- no crop
- use detail screenshots only when they document a specific finding

## Tests and Validation

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected test coverage:

- artifact inventory includes report markdown pages
- English report markdown includes title, protocol, all three run labels, and demo URLs
- Polish report markdown includes localized title and demo URLs
- `llms-full.txt` includes report references
- existing homepage markdown still renders project links using machine labels

## Open Implementation Questions

- Exact public title: `Phonetic Benchmark Results` or a more specific title.
- Whether screenshots are included in the first implementation or follow as a second pass.
- Exact wording of the qualitative verdicts so the report stays factual and does not overfit the
  first three runs.
- Whether the homepage entry should be a separate project entry or a link block added to the
  existing Phonetic Alphabet Trainer entry.
