# Positioning and Hosting Refresh Plan

Implementation handoff for aligning the public website with the July 2026 positioning decisions and
the completed migration from classic shared hosting to Cloudflare Pages.

This document defines a later implementation task. Creating it does not authorize copy, code,
generated-artifact, deployment, or unrelated benchmark-demo changes.

---

## Outcome

The public site, repository documentation, generated text surfaces, and deployment guidance should
tell one current story:

> AI agents are the implementation interface. I own the product decisions, system boundaries,
> review, and outcome.

`Product Builder` remains the personal and portfolio umbrella. `Product Engineer` may support it
where market legibility matters, but should not replace the umbrella throughout the personal site.

The retired private client project is no longer approved as public proof. Remove it from active
public and generated surfaces. The detailed status and rationale live outside this public repository;
do not replace the existing entry with a closure narrative or a new case study.

The repository and site must also describe the current hosting fact: the static site is now hosted
on Cloudflare Pages after an earlier period of manual FTP deployment on classic shared hosting. The
exact migration date should not be stated unless it is verified.

---

## Required Changes

### 1. Responsibility-first positioning

- Replace hero-first or profile-first `zero-code` framing with the canonical responsibility
  statement above.
- Explain AI as the implementation method, not the professional identity.
- Preserve the underlying distinction: agents may generate implementation, while the human owns
  product decisions, system boundaries, review, integration, and outcome.
- Keep language direct and specific. Do not introduce model hype, generic `AI expert` claims, or
  speed multipliers.
- Carry the same responsibility model into the consulting pages without inventing unresolved offer
  details such as price, duration, synchronous access, or revision count.

### 2. Public proof hierarchy

- Remove the retired private client project from the homepage narrative arc, selected work, consulting
  proof, discovery files, and active machine-readable profiles.
- Remove its companion profile and every generated reference to it from current public output.
- Cancel the backlog idea for a public case study rather than moving it to another future list.
- Do not replace it with a synthetic or anonymized case study.
- Do not add EchoTaste merely to preserve the current number of projects. Its public role still
  requires product validation and a separate decision.
- Keep public claims bounded by inspectable evidence. Phonetic Benchmark is task-specific evidence,
  not a universal model ranking; Surfaced proves release and store review, not external adoption.

### 3. Single-source content update

Update the structured source rather than patching generated outputs independently. Propagate the
approved framing through all affected surfaces, including:

- English and Polish homepage copy;
- profile and project data;
- consulting copy where relevant;
- document titles, descriptions, canonical metadata, Open Graph copy, and JSON-LD;
- generated homepage Markdown;
- `llms.txt` and `llms-full.txt`;
- companion project profiles;
- sitemap and discovery output;
- regression and smoke-test expectations.

Generated files must agree with their typed or structured source after a clean build.

### 4. Cloudflare Pages documentation

- Update `AGENTS.md`, `README.md`, `docs/PRODUCT.md`, `docs/ARCH.md`, and `docs/BACKLOG.md` so they no
  longer describe FTP/shared hosting as current operation.
- Keep the historical FTP decision intact. Append a new ADR to `docs/DECISIONS.md` that supersedes
  ADR-002 for current deployment; do not rewrite the old record.
- Document the verified Cloudflare Pages build and deployment path.
- Preserve the static-output and no-SSR invariants unless a separate accepted decision changes them.
- Describe where operational ownership lives and which checks are required after a production
  deployment.

Before writing exact deployment instructions, confirm rather than infer:

- Cloudflare Pages project name and owning account;
- connected repository and production branch;
- build command and output directory;
- Node/runtime version and environment variables, if any;
- custom-domain and DNS ownership;
- preview-deployment behavior;
- how the checked-in `public/400m/` build is refreshed and preserved.

### 5. Cloudflare route behavior

Verify that the Pages migration preserved all static and edge behavior that the public evidence layer
depends on:

- `/` and `/pl/`;
- `/consulting/` and `/pl/consulting/`;
- `/phonetic-benchmark/` and its static evidence routes;
- `/400m/` without an Astro route taking ownership of the separately built utility;
- explicit `.md`, `.json`, and `.csv` routes;
- `_headers` content types, alternate links, cache behavior, and `Vary` where applicable;
- `Accept: text/markdown` negotiation on the intended routes;
- redirects, canonical URLs, sitemap entries, and production smoke checks.

Do not claim that Cloudflare behavior works merely because `_headers` or generated files exist in the
repository. Verify the deployed responses.

### 6. Benchmark publication consistency

Repair the structured publication source before copying current benchmark numbers into profile copy.
Add or strengthen sync checks for:

- run and batch counts;
- formal status and failure-type totals;
- source LoC and static test count;
- recorded test-runner evidence;
- comparative score when one is published;
- selected narrative references;
- JSON, CSV, Markdown, HTML, and companion-profile agreement.

Known symptoms include a `14` versus `16` failure-count heading mismatch and stale public GPT 5.5 v2
test evidence. Treat these as examples, not the complete audit scope.

---

## Non-goals

- no visual redesign;
- no blog or CMS;
- no move to SSR or runtime API routes;
- no public case study for the retired private client project;
- no EchoTaste launch or portfolio decision;
- no public productivity multiplier or unverified bug-rate claim;
- no invention of consulting price or engagement boundaries;
- no unrelated Phonetic Benchmark demo cleanup;
- no modification of existing untracked demo directories.

At handoff time the following untracked paths already existed and belong to separate work:

```text
public/phonetic-benchmark/demos/gpt-5-6-luna-v2/
public/phonetic-benchmark/demos/gpt-5-6-sol-v2/
public/phonetic-benchmark/demos/gpt-5-6-terra-v2/
public/phonetic-benchmark/demos/hy3-free-v2/
```

---

## Suggested Implementation Order

1. Confirm the actual Cloudflare Pages settings and deployed route behavior.
2. Record the superseding hosting ADR and update operational documentation.
3. Repair the benchmark publication source and consistency gates.
4. Update responsibility-first EN and PL structured copy.
5. Remove the private client project from public, generated, and discovery surfaces.
6. Regenerate all derived artifacts.
7. Update regression tests and production smoke checks.
8. Run the full quality suite, build, preview checks, and deployed production verification.

---

## Acceptance Criteria

- The canonical responsibility statement is represented accurately on the primary profile surface in
  both languages; the Polish version may be idiomatic rather than word-for-word.
- `Product Builder` remains the site umbrella, with any `Product Engineer` usage clearly supporting
  rather than replacing it.
- Active source, built HTML, generated Markdown, discovery files, metadata, and tests contain no
  retired private client project profile or case-study promotion.
- No current operational or overview document describes FTP/shared hosting as the active deployment
  path; the historical ADR remains intact.
- `docs/DECISIONS.md` preserves ADR-002 and includes a later accepted ADR for Cloudflare Pages.
- Exact deployment instructions contain only settings verified against the real Pages project.
- Benchmark facts agree across the structured source and every generated public format.
- Existing routes and machine-readable behavior pass local regression coverage and production smoke
  checks after deployment.
- The four pre-existing untracked benchmark demo directories remain untouched.

Run at minimum:

```bash
npm test
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run smoke:production
```

The production smoke command belongs after deployment. If Cloudflare preview and production behavior
differ, record and verify both explicitly.
