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

*(To be defined before implementation starts. Record the decision here once made.)*

Key questions to answer before writing a line of CSS:
- Background: light or dark?
- Accent color: yes or no? If yes, what role does it play?
- Typography scale: how big is the headline relative to body text?
- Spacing rhythm: generous whitespace (editorial feel) or compact?
- Whether to use a photo

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
