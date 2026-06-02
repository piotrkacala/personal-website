# Phonetic Benchmark Publication Inputs

Public-safe source material for the Phonetic Benchmark run-discovery implementation.

This document copies the approved factual inputs needed by the personal-site repository. It is
deliberately self-contained:

- the website build must depend only on files committed to this repository
- private workflow metrics stay private
- implementation data should move into `src/site/phonetic-benchmark.ts`, not be parsed from this file

---

## Publication Boundary

Publish:

- benchmark version
- run date
- formal status
- failure types
- source LoC
- static automated test count
- stack summary
- evidence URLs
- public benchmark-package URL
- concise functional read
- explicit observed strengths and weaknesses
- interpretation limitations

Do not publish:

- prompt count
- execution time
- token usage
- per-run git notes
- local paths
- private scratch notes
- infrastructure interruptions unless they materially explain the final output

---

## Benchmark Framing

The Phonetic Benchmark is a small web-application implementation benchmark. Each model receives the
same docs-first package, fixed benchmark data, and a direct instruction to implement the Phonetic
Alphabet Trainer web app.

The benchmark uses a two-layer review model:

1. Contract verification: can the implementation be meaningfully compared?
2. Qualitative comparison: what does the implementation reveal about product judgment, requirement
   preservation, UX, testing, and delivery quality?

The task is intentionally small so review can focus on details that matter in use:

- whether the main flow works
- whether required behavior survives implementation
- whether repetitive keyboard use is comfortable
- whether visual feedback remains stable
- whether the delivered repository stays understandable

This is not a numeric leaderboard. Each model currently has one run against one small product brief.
No run-details page should present its observations as a general review of the model.

---

## Public Benchmark Package

Link the methodology page to the public clean benchmark package:

```text
https://github.com/piotrkacala/phonetic-benchmark
```

The package is the public source of truth for:

- versioned benchmark framing
- product requirements
- allowed implementation freedoms
- workflow rules
- contract test cases
- evaluation rules
- canonical alphabet and multiple-choice option data

Keep the main report focused. The clean package link belongs on the methodology page and in
machine-readable methodology output, not in every table row.

---

## V1 Inference-parameter Limitation

`v1` did not consistently record provider, canonical API model identifier, or inference-effort
settings. Some runs were performed through interfaces that did not expose an effort setting.

For `v1`:

- publish the model labels already recorded with the runs
- do not infer that missing effort controls mean a known provider default
- do not add provider, canonical model identifier, or effort columns to run pages or structured
  exports
- state that `v1` compares observed outputs from the used agent workflows, not isolated model
  quality under controlled inference parameters

This is a methodology limitation, not a reason to discard the current report. A future benchmark
version should add a required run manifest before collecting new results.

Recommended `v2` manifest fields:

- benchmark version
- public run ID
- display label
- canonical model identifier
- provider or gateway
- editor or agent interface
- requested effort or reasoning setting
- effective effort or reasoning setting when exposed
- explicit `unknown` when the effective value is not exposed
- run date
- baseline commit

Do not silently retrofit inferred values into historical `v1` runs.

---

## Status Taxonomy

Use three formal statuses:

- `comparable`: the implementation clears the formal contract well enough for qualitative
  comparison
- `contract-failing`: the application can be exercised, but a required submission element or
  product behavior is missing or incorrect
- `unrunnable`: the implemented behavior cannot be meaningfully exercised

Missing documented commands alone mean `contract-failing` when clear package scripts still allow
the reviewer to install and exercise the app. Reserve `unrunnable` for inaccessible
implementations.

Use these failure types:

- `core behavior`
- `submission documentation`
- `attribution`
- `test workflow`
- `unrunnable output`

A failed status is not a quality score. Failure types must remain visible because a documentation
miss in an otherwise strong application is not equivalent to a blocked quiz flow.

---

## Source LoC Rule

`source LoC` means lines in:

- implementation source
- tests
- configuration files
- authored HTML and CSS files

Exclude:

- generated build output such as `dist/`
- dependency directories such as `node_modules/`
- lockfiles
- benchmark documentation copied from the starter package
- benchmark data copied from the starter package

Treat Source LoC as approximate repository evidence, not as a ranking metric.

---

## Static Automated Test Count Rule

`static automated test count` means the number of direct authored test declarations matching:

```text
it(...)
test(...)
```

Count declarations in authored JavaScript and TypeScript source files. Exclude generated build output
such as `dist/` and dependency directories such as `node_modules/`.

Do not count:

- grouping constructs such as `describe(...)`
- placeholder package scripts without substantive test files
- generated or dependency code
- parameterized expansions inferred from loops or table data
- skipped, todo, or parameterized declarations expressed through variants such as `test.skip(...)`,
  `test.todo(...)`, or `test.each(...)`

Report test-command success or failure separately from the static count. A repository can expose a
non-zero static count while its documented test command still fails.

This is intentionally a mechanical repository-evidence field. It does not measure test coverage,
assertion quality, executed test count, or passing test count.

The rule reproduces the currently published `v1` values for all 15 runs. If a future run uses test
declaration forms outside this rule, update the counter deliberately and version the methodology
when the change affects comparability.

---

## Contract Review Checklist

The public methodology should state that `v1` requires:

- a browser-based phonetic-alphabet learning web application
- a Node.js-based project workflow with `package.json`
- documented install and run commands
- documented test commands when automated tests are included
- visible attribution to Piotr Kacała, `piotrkacala.pl`, the implementing model name and version, and
  a fixed implementation date
- Polish and NATO phonetic alphabets
- Polish and English interface languages
- exactly two exercise modes: keyboard and four-option suggestion
- separation of input modes within a run
- one full selected alphabet per run, with every symbol appearing once in randomized order
- progression only after a correct answer
- fixed suggestion-mode option sets read from benchmark data
- randomized display order for suggestion buttons
- hint reveal without auto-completion
- deterministic final scoring based on hinted versus clean questions
- a final result screen with score, alphabet, and mode

The public methodology should state that review checks:

- documented install and run workflow
- package scripts
- visible attribution: Piotr Kacała, `piotrkacala.pl`, implementing model name or version, and a
  fixed implementation date
- Polish and English UI
- setup flow
- full alphabet run progression where practical
- randomized symbol order
- keyboard-mode trimming, case insensitivity, and diacritic significance
- suggestion mode: exactly four buttons, fixed repository option data, and randomized display order
- strict separation of keyboard and suggestion modes
- hint reveal behavior without auto-completion
- final scoring and result screen

Use focused source inspection and automated checks for combinatorial cases that are expensive to
click through manually. Do not treat the existence of code or tests as proof that observable
behavior passes.

Open product areas such as reset behavior and active-run language switching should be reviewed for
coherence, but should not be silently converted into contract failures.

The clean benchmark package deliberately leaves implementation choices open, including framework,
architecture, state management, styling, visual design, copy tone, internal randomization approach,
test framework, and test structure.

---

## Private Audit Notes

Do not publish these technical audit notes on the public methodology page:

- full end-to-end UI walkthrough was completed for eight applications
- previously confirmed failures were not always taken through a complete run when targeted smoke
  tests and source inspection were enough to determine status
- randomness was reviewed through implementation, tests, and observable reshuffling rather than a
  statistical distribution test
- UI localization was not exhaustively audited label-by-label in both languages
- offline installation from local cache does not verify external registry availability

Keep the public limitation concise:

- each model currently has one run against one small browser-application task
- `v1` did not consistently capture provider, canonical API model identifier, or inference-effort
  settings
- `v1` compares observed outputs from the used agent workflows, not isolated model quality under
  controlled inference parameters

---

## Report Snapshot

Current strict `v1` snapshot:

- archived runs: `15`
- `comparable`: `6`
- `contract-failing`: `8`
- `unrunnable`: `1`

Current evidence coverage:

- every run has an archived demo
- every run has a screenshot
- every run has a compact functional read
- selected runs have expanded report case notes

---

## Publication-date Policy

Use two date levels.

Per run:

- `runDate`: date of the individual benchmark attempt, already stored separately for every run

For the report as a whole:

- `publishedDate`: first public publication date of the report: `2026-05-26`
- `updatedDate`: date of the most recent deployed public change to report narrative, methodology, or
  run data: `2026-06-02`
- `coveredThroughDate`: latest included `runDate`, derived mechanically from run data; current value:
  `2026-06-01`

Do not update report-level `updatedDate` for formatting-only or internal documentation changes that
do not alter the deployed public benchmark surface.

## Run Publication Drafts

These are concise public-safe inputs for canonical English run-details pages. Convert them into
typed source data during implementation.

Do not create Polish duplicates of run-details pages or methodology. The existing Polish report
remains the localized human-facing summary and links to the canonical English evidence pages where
useful. A single retrieval-oriented source avoids translation drift across 15 run cards.

Every run inherits this interpretation limitation:

> One run against Phonetic Benchmark v1 and one small product brief. This is not a general model
> ranking.

### GPT 5.4 High

Observed strengths:

- Clears the formal contract.
- Includes automated tests.

Observed weaknesses:

- The answer input loses focus after progression to the next symbol.
- The focus miss forces repeated mouse use in a keyboard-first training loop.

### GPT 5.5 High

Observed strengths:

- Clears the formal contract.
- Compact plain JavaScript implementation with no build step.
- No significant issues found in the reviewed flow.

Observed weaknesses:

- No material weakness recorded in the reviewed flow.

### Gemini 3.5 Flash High

Observed strengths:

- Functionally usable output.
- Includes automated tests.

Observed weaknesses:

- Implementation-specific install and run commands are not documented.
- Quiz notifications cause visible layout shifts during the core loop.

### Gemini 3.1 Pro High

Observed strengths:

- Produces an inspectable interface.

Observed weaknesses:

- Required keyboard hint behavior is broken.
- Implementation-specific workflow instructions are missing.
- Attribution does not preserve a fixed implementation date.
- Attribution does not show `piotrkacala.pl` as visible text.

### Claude Sonnet 4.6 Thinking

Observed strengths:

- Clears the formal contract.
- Strong reference baseline with automated tests.

Observed weaknesses:

- Revealing a hint in suggestion mode re-renders the question and reshuffles button positions.

### Owl Alpha

Observed strengths:

- Functionally usable output.
- Includes a visible automated-test footprint.
- Uses a distinctive fading treatment for wrong answers.

Observed weaknesses:

- Implementation-specific workflow instructions are missing.
- Attribution uses a runtime-generated date.
- Repetitive use exposes interaction friction: an unnecessary click to continue, no reset control,
  and lost focus after a wrong keyboard answer.

### Gemma 4 26B

Observed strengths:

- Final application is functionally usable.

Observed weaknesses:

- Implementation-specific workflow instructions are missing.
- Attribution uses a runtime-generated date.
- Keyboard input loses focus after progression to the next symbol.

### Nemotron 3 Super

Observed strengths:

- Produces an interface that starts.

Observed weaknesses:

- The quiz cannot progress past the first correct answer.
- Suggestion mode also shows keyboard input, mixing the required input modes.
- Required attribution is not usable.
- Implementation-specific workflow instructions are missing.

### Laguna M.1

Observed strengths:

- Clears the formal contract.
- Includes automated tests.

Observed weaknesses:

- No reset control is available in the UI.
- Focus handling after progression remains unfinished.

### DeepSeek V4 Pro

Observed strengths:

- Functionally strong output.
- Explicitly documents restrictive product decisions.
- Active-run restart and language-switching choices are reviewable as coherent decisions.

Observed weaknesses:

- Install, run, and test commands are not documented.

### gpt-oss-120b

Observed strengths:

- No material product strength recorded in the reviewed output.

Observed weaknesses:

- Output crashes before benchmark behavior can be meaningfully exercised.
- UI is incomplete.
- Workflow documentation and required attribution are missing.

### Hy3 Preview

Observed strengths:

- Final reviewed application is functionally usable.
- Includes static automated tests.

Observed weaknesses:

- Attribution generates the current date at runtime instead of preserving the implementation date.
- Documented `npm test` workflow fails.
- No reset control is available.

### MiMo V2.5 Pro

Observed strengths:

- Clears the formal contract.
- Includes a visible automated-test footprint.

Observed weaknesses:

- Content jumps during use.
- No active-run reset control is available.

### MiniMax M3

Observed strengths:

- Functionally strong output.
- Includes substantive implementation notes.
- Includes automated tests.

Observed weaknesses:

- Attribution date is generated at startup or build time instead of being preserved as a fixed
  implementation date.
- Documentation and UI differ around active-run language switching.

### Kimi K2.6

Observed strengths:

- Clears the formal contract.
- Returning to the menu during an active run asks for confirmation.
- Includes automated tests.

Observed weaknesses:

- Keyboard answer input does not receive focus automatically.

---

## Inputs Still Needed

No unresolved publication inputs remain for the planned implementation.
