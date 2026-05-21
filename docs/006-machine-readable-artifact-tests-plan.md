# Machine-readable Artifact Tests Plan

Execution plan for adding regression coverage around generated markdown and text artifacts.

The goal is not broad testing infrastructure. The goal is to protect the small machine-readable layer from silent drift.

---

## Goal

Add lightweight automated tests that fail when machine-readable artifact generation regresses in structure or key content.

The tests should be cheap to run, easy to read in a public repo, and tightly scoped to this feature.

---

## Why This Matters

The current build confirms that artifacts are produced, but it does not protect against subtle regressions such as:

- missing files
- wrong output paths
- broken section structure
- lost references
- markdown output drifting from the public content model
- renderer behavior changing after a future copy or schema edit

For this layer, small deterministic tests are more valuable than broad end-to-end machinery.

---

## Scope

Included:

- a minimal test runner setup
- direct tests for the artifact generator
- assertions on generated output shape and critical strings
- a script wired into `package.json`

Excluded:

- browser automation
- visual testing
- production HTTP header checks
- Cloudflare behavior
- snapshot sprawl of full large files unless it remains very small and readable

---

## Recommended Tooling

Use Node's built-in test runner first.

Recommendation:

- `node:test`
- `node:assert/strict`

Reasoning:

- no extra test framework dependency by default
- matches the repo's current minimalism
- good enough for deterministic string-generation tests

Only introduce `vitest` if the implementation runs into real ergonomics limits.

---

## Test Targets

### 1. Artifact inventory

Test that the generator returns the expected artifact set:

- `/index.md`
- `/pl/index.md`
- `/llms-full.txt`

### 2. Homepage markdown structure

Test key structure for EN and PL artifacts:

- H1 exists
- summary block exists
- core section headings exist
- contact line exists

Do not assert entire file equality if smaller structural assertions are enough.

### 3. Critical references

Test that important public references are present where expected:

- homepage URLs
- repo URL
- public project links

### 4. Model-coupling regression

After the `LinkBlock` hardening work, add tests that prove markdown link rendering does not depend on visible label punctuation conventions.

This should directly protect the review finding that triggered the follow-up work.

---

## Recommended Structure

Suggested shape:

- `src/i18n/machine-readable.test.ts`

or, if you want tests separated from source:

- `tests/machine-readable-artifacts.test.ts`

Recommendation:
Keep the test close to the generator unless that starts to clutter the source tree.

---

## Implementation Sequence

### Phase A — introduce minimal test entry point

Add:

- test file
- `npm` script such as `test`

Acceptance target:

- tests can run locally with one command

### Phase B — artifact generator tests

Test the pure output of `getMachineReadableArtifacts()`.

Acceptance target:

- no Astro build required for the main assertions
- failures point directly to content-generation regressions

### Phase C — optional build-level smoke check

Only if it stays simple, add a very small smoke assertion that the built output contains the expected files.

This can remain manual if adding it would force disproportionate infrastructure.

### Phase D — CI-style quality integration

Decide whether the repo should treat artifact tests as part of the normal quality rail.

Recommendation:

- add `npm test`
- keep `typecheck`, `lint`, and `build`
- decide later whether `README` and workflow docs should mention `npm test` as a standard command

---

## Test Philosophy

Prefer:

- narrow assertions
- stable text anchors
- deterministic outputs

Avoid:

- giant opaque snapshots
- assertions on every line of generated prose
- brittle tests that fail whenever copy is edited intentionally

The tests should defend structure and key meaning, not freeze all content forever.

---

## Acceptance Criteria

- one-command local test execution exists
- the artifact generator has direct automated coverage
- regressions in path names or key markdown structure fail fast
- the tests remain readable enough to belong in a public portfolio repo

---

## Recommended Commit Shape

One commit is probably enough:

`add regression tests for machine-readable artifacts`

If the setup and assertions grow apart, split into:

1. add minimal test runner and script
2. add machine-readable artifact coverage
