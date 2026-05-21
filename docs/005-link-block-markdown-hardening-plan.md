# Link Block Markdown Hardening Plan

Execution plan for removing markdown-generation dependence on parsing `LinkBlock.label`.

This plan exists because the current renderer works, but it derives machine-readable meaning from presentation copy. That is too fragile for a shared content model.

---

## Goal

Make machine-readable link rendering explicit and schema-driven so markdown output does not silently drift when human-facing copy changes.

The HTML site should keep its current presentation freedom. The markdown generator should stop inferring structure from label text.

---

## Problem

Current markdown generation uses `formatProjectLink()` to split `LinkBlock.label` on the first `:`.

That creates an implicit contract:

- `Link: ...`
- `Tool: ...`
- `Repo: ...`

If a copy edit changes those labels, the HTML output will still look correct, but the generated markdown may become inconsistent or degraded without a build failure.

This is a model problem, not a copy problem.

---

## Desired End State

`LinkBlock` carries enough structured information for both rendering targets:

- HTML can render the visible label exactly as intended
- markdown can render a stable machine-readable line without string heuristics

The generator should not need to guess what part of a label is semantic versus decorative.

---

## Scope

Included:

- schema update for link blocks
- i18n data update in EN and PL copy
- markdown renderer update
- small documentation update if the content model becomes meaningfully richer

Excluded:

- redesigning site copy
- changing visible link wording unless needed for consistency
- adding tests beyond what is necessary for this refactor itself

Testing of generated artifacts as a wider system belongs to the next plan.

---

## Recommended Direction

Add explicit machine-readable fields to `LinkBlock` instead of deriving them from `label`.

Practical shape options:

1. Minimal additive field

- keep `label` for HTML
- add a field like `machineLabel` or `resourceLabel` for markdown output

2. Stronger structural split

- keep `label`
- add something like `kind` plus optional `machineTitle`
- examples:
  - `kind: "link"`
  - `kind: "tool"`
  - `kind: "repo"`

Recommendation:
Use the minimal additive field unless the model already shows pressure for a richer taxonomy. This repo does not need a larger abstraction unless another caller would use it.

---

## Implementation Sequence

### Phase A — schema change

Update `LinkBlock` so machine-readable output relies on explicit data.

Acceptance target:

- no markdown rendering path depends on parsing punctuation in `label`

### Phase B — content migration

Update all EN and PL link blocks to provide the new explicit field.

Acceptance target:

- HTML output remains unchanged
- markdown output stays semantically equivalent

### Phase C — renderer cleanup

Replace `formatProjectLink()` heuristic logic with deterministic rendering from explicit fields.

Acceptance target:

- renderer code is simpler than before
- no implicit string protocol remains

### Phase D — verification

Verify:

- `npm run build`
- generated `dist/index.md`
- generated `dist/pl/index.md`
- generated `dist/llms-full.txt`

Acceptance target:

- output text stays readable
- no drift in link semantics

---

## Acceptance Criteria

- `LinkBlock.label` is no longer parsed for meaning by the markdown generator
- machine-readable link semantics are explicit in the content model
- EN and PL content stay aligned
- generated markdown remains stable after normal copy edits to visible link labels

---

## Risks To Avoid

- overengineering the link model for a tiny set of cases
- introducing two competing visible labels
- mixing test work into this refactor and making the change harder to review

---

## Recommended Commit Shape

One commit is enough if the change stays small:

`make markdown link rendering explicit in the content model`

If the schema migration turns out larger than expected, split into:

1. schema and content migration
2. renderer cleanup
