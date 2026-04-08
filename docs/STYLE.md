# Frontend Style Guide

UI conventions for the personal website. Claude follows these when writing any frontend code.

---

## Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Tailwind CSS v4
- **Components:** Native `.astro` components only — no React, no Vue
- **Icons:** Inline SVG preferred (no icon library dependency)
- **Fonts:** TBD at design time — defined in `Base.astro` layout

---

## Component Rules

### Structure

```
src/components/
  Hero.astro         ← positioning section (headline + expansion)
  Projects.astro     ← projects section wrapper
  ProjectCard.astro  ← single project entry
  Contact.astro      ← contact section
```

- Components receive data as props or from a local data file — no inline hardcoded strings where possible
- Layout (`Base.astro`) owns `<html>`, `<head>`, font loading, global meta

### Naming

- Components: `PascalCase.astro`
- No `index.astro` inside component folders — name the file directly

---

## Tailwind Conventions

- Mobile-first: base styles for mobile, `md:` / `lg:` for wider viewports
- No arbitrary values (`p-[17px]`) unless there is no Tailwind equivalent
- No `@apply` in component files — utility classes directly in markup
- Use CSS custom properties for any values that appear in more than one place (colors, spacing rhythm)

**Responsive breakpoints:** Tailwind defaults. No custom breakpoints at v1.

---

## Visual Direction

**Decided April 2026.** Light, editorial, restrained, confident. The site reads like a well-designed document or dossier — not a landing page, not a startup hero.

### Background
Light. Not pure white — slightly warm or slightly cool/technical. The exact tone is a design-time decision, but the feel is "quality paper" not "browser default."

### Text
Dark, dense. High contrast against the background. Body text is readable and tight — no airy line heights, no light font weights.

### Headline (h1)
Large but not startup-hero large. Feels like an essay title or a dossier heading. Confident scale, not shouting.

### Layout
Single-column, document-like grid anchored to one clear left edge. The page should read top-to-bottom as a composed document, not as a set of independent blocks. Thin rules or subtle dividers between sections are welcome if they clarify structure. Zero decorative elements without function. The structure should feel like a well-typeset page — alignment, rhythm, restraint.

Projects may introduce a secondary internal structure (for example numbering, a narrow metadata column, or a visible step-by-step rhythm), but the overall page should still feel like one document, not a card layout.

### Accent color
One color only. Used sparingly and with clear functional purpose:
- Links
- Language switcher
- Possibly metrics/numbers in the mojeaudyty.pl section

Not used for large backgrounds, decorative surfaces, or branding-heavy gestures. It may appear in small borders, rules, or emphasis details only if that use improves orientation. The accent highlights interactive or notable elements and must never compete with the main text color for visual dominance.

### Spacing
Generous whitespace, editorial feel. Sections breathe. Not cramped, not wasteful — the spacing rhythm signals confidence and clarity.

### Photo
No photo at v1. The page should establish presence through typography, copy, spacing, and proof of work rather than portrait photography.

### Typography
TBD — font pairing is a design-time decision. The character should be: precise, readable, slightly editorial. Not monospace (signals "coder"), not geometric sans (signals "startup").

### Interaction details
Links should feel deliberate and editorial, not app-like. Underlines, offset underlines, or other restrained text-link treatments are preferred over button styling for in-flow links. Any focus and hover treatment should be clearly visible but quiet.

### Project presentation
Do not render projects as isolated marketing cards. They should read as entries in a deliberate sequence with a clear narrative arc from Phonetic to Surfaced to mojeaudyty.pl. The mojeaudyty.pl metrics should be scannable at a glance and visually distinct from the surrounding prose without becoming infographic-style decoration.

### Density
Keep the interface visually calm but not sparse to the point of feeling empty. This is not a luxury-brand layout with huge dead zones. The density should suggest a serious reader-facing document: enough air to feel controlled, enough content presence to feel substantive.

### Surfaces and effects
Avoid shadows, glassmorphism, glow effects, tinted panels, and soft UI treatment. If any surface distinction is needed, prefer contrast through spacing, rules, background tone shifts, or typography rather than raised-card metaphors.

---

## Mobile-First Rules

- Minimum touch target: 44×44px for any interactive element
- Test layout at 375px viewport before considering a section done
- No hover-only interactions for anything that needs to work on touch

---

## Accessibility

- Semantic HTML: use `<header>`, `<main>`, `<section>`, `<footer>` — not `<div>` soup
- Heading hierarchy follows document outline: one `<h1>`, sections use `<h2>`, subsections `<h3>` — no skipped levels
- All interactive elements (links, buttons, language switcher) are keyboard-accessible and have visible focus styles
- Contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- No information conveyed by color alone
- If a photo is used, it gets a meaningful `alt` attribute
- Language attribute set on `<html>` (`lang="en"` / `lang="pl"`) — important for screen readers and SEO

---

## What Not To Do

- No animations or transitions at v1 unless they serve a clear purpose
- No JavaScript unless required — the site is a document, not an app
- No loading states, skeletons, or spinners — everything is static
- No modal dialogs
