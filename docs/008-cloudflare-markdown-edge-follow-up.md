# Cloudflare Markdown Edge Follow-up

Repo-safe operational notes for the small Cloudflare layer around the Cloudflare Pages deployment.

This document is intentionally narrow:

- no account identifiers
- no rule IDs
- no screenshots
- no copied scanner output

The goal is not to turn Cloudflare into part of the product surface.
The goal is to protect the existing markdown discovery layer and, where useful, expose a little more machine-readable intent to scanners.

---

## Current Production State

Production is now hosted on Cloudflare Pages. The exact migration date is not recorded here.

A public HTTP check on 2026-07-13 verified:

Currently live:

- `/index.md` and `/pl/index.md` are served with `content-type: text/markdown; charset=utf-8`
- `GET /` with `Accept: text/markdown` returns the markdown homepage variant
- `GET /pl/` with `Accept: text/markdown` returns the markdown homepage variant
- HTML responses on `/` and `/pl/` include `Link` alternate headers pointing at `/index.md` and `/pl/index.md`
- the behavior is intentionally limited to `/` and `/pl/`
- `/projects/400m.md` exists as a companion profile, but `400m` does not have its own negotiation layer

The same check found two operational differences from the earlier documented target:

- negotiated responses did not expose `Vary: Accept`
- homepage HTML returned both the repo-controlled relative `Link` header and a second absolute
  Cloudflare-managed `Link` header

The missing `Vary` header must be checked again after the repo `_headers` update is deployed. The
duplicate `Link` header is not a content failure, but its ownership should be simplified only after
the Pages and edge settings are inspected in the Cloudflare dashboard.

Still out of scope:

- `.well-known`
- MCP, OAuth, WebMCP, commerce, Agent Skills
- scanner-only fake capabilities

This document records the live edge behavior and the intentional boundaries around it.

---

## Why This Exists

The repo-controlled Phase 1 work already ships the real artifacts:

- `/index.md`
- `/pl/index.md`
- `/llms.txt`
- `/llms-full.txt`
- `/projects/400m.md`

Cloudflare Pages now serves the static site directly. A narrow edge configuration still negotiates
homepage markdown without changing the repo-owned content model.

---

## Scope

Included:

- documenting the current production negotiation behavior on `/` and `/pl/`
- documenting cache correctness for markdown negotiation on `/` and `/pl/`
- documenting `Link` response headers for the same two routes

Excluded:

- `.well-known`
- MCP, OAuth, WebMCP, commerce, Agent Skills
- negotiation for `/400m/`
- negotiation for `/projects/400m.md`
- path ownership changes for separately deployed tools

---

## Route Boundaries

Apply these edge behaviors only to:

- `/`
- `/pl/`

Do not extend them to:

- `/400m/`
- `/projects/400m.md`
- arbitrary project routes

The root site owns homepage discovery.
External tool surfaces stay on the companion-profile pattern unless they earn a separate machine-readable layer on their own terms.

---

## Edge Rules

### 1. Cache correctness for markdown negotiation

The current production behavior negotiates markdown on `/` and `/pl/`. The earlier configuration
used an explicit cache-bypass rule, but rule presence must be confirmed in the dashboard rather than
inferred from response headers.

Minimum acceptable outcome:

- `GET /` with normal browser `Accept` returns HTML
- `GET /` with `Accept: text/markdown` returns markdown
- `GET /pl/` with normal browser `Accept` returns HTML
- `GET /pl/` with `Accept: text/markdown` returns markdown
- responses for negotiated routes preserve `Vary: Accept`
- cached HTML and cached markdown do not collapse into one variant

Previously chosen implementation:

- bypass edge caching for markdown-negotiated requests on `/` and `/pl/`

Reasoning:

- the site does not need a more complex cache-key design for this feature
- bypass is simpler to reason about in a public, manually operated setup
- correctness matters more than elegance here

### 2. `Link` response headers for markdown alternates

Cloudflare adds `Link` response headers on the HTML route responses for the same two homepage routes:

- `/` → alternate markdown at `/index.md`
- `/pl/` → alternate markdown at `/pl/index.md`

Intent:

- mirror the existing HTML `<link rel="alternate" type="text/markdown" ...>` hint
- provide a scanner-visible HTTP-level signal without inventing new capabilities

Recommended shape:

- `Link: <https://piotrkacala.pl/index.md>; rel="alternate"; type="text/markdown"`
- `Link: <https://piotrkacala.pl/pl/index.md>; rel="alternate"; type="text/markdown"`

Keep the scope local to the two homepage routes.
Do not emit generic or site-wide markdown alternates that imply unsupported coverage.

---

## Verification

Validate manually at the HTTP layer after any rule changes.

Minimum checks:

1. `GET /` with default `Accept` returns HTML.
2. `GET /` with `Accept: text/markdown` returns markdown.
3. `GET /pl/` with default `Accept` returns HTML.
4. `GET /pl/` with `Accept: text/markdown` returns markdown.
5. Negotiated responses include `content-type: text/markdown; charset=utf-8`.
6. Negotiated responses include `Vary: Accept`; this was not present in the 2026-07-13 check and
   remains a required follow-up after deployment.
7. HTML route responses include the expected `Link` alternate header.
8. Repeated requests confirm cache behavior does not mix HTML and markdown variants.

It is enough to verify the intended public behavior.
Do not turn this into a larger observability project.

---

## Decision Rule

If a Cloudflare tweak improves correctness or reinforces already-true discovery, it is acceptable.

If it exists only to simulate unsupported capabilities or inflate scanner scores, do not add it.
