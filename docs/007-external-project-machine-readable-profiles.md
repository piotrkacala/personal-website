# External Project Machine-readable Profiles

Procedure for handling public projects or tools that are linked from the personal site but do not belong to this Astro app's route tree.

This exists to prevent a recurring failure mode:

- a new project gets linked from the homepage or `llms.txt`
- the live tool is discoverable by humans
- but there is no stable repo-controlled markdown profile for agents

---

## Goal

Keep the personal site as the public discovery layer for Piotr's projects while avoiding route ownership conflicts with separately deployed tools.

The Astro repo should expose machine-readable companion profiles for these projects without pretending to own their runtime path.

---

## When This Applies

Use this procedure whenever a project or tool is:

- mentioned on the homepage
- added to `llms.txt` or `llms-full.txt`
- linked from another public discovery surface in this repo
- hosted outside this Astro app's route tree, even if it shares the same domain

Examples:

- a tool deployed under `https://piotrkacala.pl/400m/`
- a static app hosted on another domain
- a project page maintained in a separate repository or deploy target

---

## Rule

If the project is publicly discoverable through this site, it should also have a repo-controlled machine-readable profile.

For separately deployed tools, the profile must live under a non-conflicting path owned by this Astro repo, for example:

- `/projects/400m.md`
- `/projects/<slug>.md`

Do not create Astro routes that would take over the runtime path of the actual tool, such as `/400m/`, if that path belongs to a separate deploy.

---

## Responsibility Split

This repo owns:

- the main homepage and Polish homepage
- `llms.txt`
- `llms-full.txt`
- companion markdown profiles under repo-controlled paths
- public discovery metadata for linked projects

The external project or tool owns:

- its live runtime path
- its own HTML and application behavior
- its own future markdown negotiation, if added later

This means the personal site can be agent-friendly even when a linked tool has not yet implemented its own agent-facing endpoints.

---

## Required Workflow

When adding a new project or tool mention:

1. Add or update the human-facing mention on the homepage or other public surface.
2. Add or update the machine-readable discovery entry in `llms.txt` and any generated consolidated artifact that should reference it.
3. Create or update a companion markdown profile for that project under a repo-controlled path such as `/projects/<slug>.md`.
4. Make sure tests or assertions cover the new public discovery path when appropriate.

This should be treated as one coherent change, not as optional follow-up work.

---

## Minimum Profile Content

Each companion markdown profile should stay short and factual.

Minimum recommended fields:

- project name
- one-sentence summary
- live URL
- repo URL if public
- status or maturity note if relevant
- what the tool does
- what kind of input it expects, if applicable
- important constraints or privacy behavior, if applicable

The profile is not a sales page. It exists to give agents a stable, compact, high-signal description.

---

## Path Strategy

Recommended public pattern:

- `/projects/<slug>.md`

Reasoning:

- avoids collisions with live tool paths
- stays clearly owned by the Astro repo
- scales to multiple future projects
- keeps companion profiles predictable for both humans and agents

If a different namespace is introduced later, it should preserve the same non-conflicting rule.

---

## 400m As The First Case

`400m` is the first concrete example of this pattern.

It is already surfaced in the site's public discovery layer, but its runtime path is not owned by this Astro repo. Therefore it should be documented through a companion markdown profile such as:

- `/projects/400m.md`

That profile should be linked from future machine-readable discovery outputs where useful, without trying to replace or shadow `https://piotrkacala.pl/400m/`.
