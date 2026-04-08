import type { SiteCopy } from "./schema";

export const en = {
  lang: "en",
  title: "Piotr Kacala",
  hero: {
    headline: "Product Builder",
    expansion:
      "In IT since 2013, across development, design, product, and QA — never tied to a single tool, always focused on output. Since early 2026, I build entirely through AI agents, zero-code. The competitive edge isn't the tooling — it's knowing which questions to ask before the problem surfaces, and being able to prompt in the language of the domain: like a developer, a QA engineer, a designer, or a product manager. AI performs best on exactly that kind of material. The interface became writing, and I've been text-native my whole career.",
  },
  projects: {
    heading: "Projects",
    arc: "Three projects, each a deliberate next step. Testing AI on an existing codebase. Building from scratch, docs-first, zero-code. Then a full product for a real customer.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        blocks: [
          {
            type: "paragraph",
            text: "An existing React project, reopened to test how AI handles a real codebase — and to compare models and IDEs. Along the way, discovered missing letters in the official Polish Ministry of Defence phonetic alphabet. Ships in English and Polish with scoring, two answer modes, and streak tracking.",
          },
          {
            type: "link",
            href: "https://piotrkacala.github.io/phonetic/",
            label: "Link: piotrkacala.github.io/phonetic/",
            external: true,
          },
        ],
      },
      {
        title: "Surfaced",
        blocks: [
          {
            type: "paragraph",
            text: "First project built from scratch, docs-driven, zero-code. A Firefox extension that tracks scroll depth and notifies you when you've gone too far — three depth zones with escalating urgency. Passed Mozilla's public review and is listed on Firefox Add-ons.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Link: addons.mozilla.org/firefox/addon/surfaced/",
            external: true,
          },
        ],
      },
      {
        title: "mojeaudyty.pl",
        blocks: [
          {
            type: "paragraph",
            text: "First full production project, built spec-first for a real customer.",
          },
          {
            type: "metrics",
            heading: "As of April 2026",
            items: [
              "~21,000 lines of production code",
              "~9,400 lines of tests",
              "295 commits",
              "25 database models",
              "~96 API routes",
              "37 pages",
              "50 components",
              "full i18n",
            ],
          },
          {
            type: "paragraph",
            text: "Before it was finished, both AI models and an experienced CEO estimated 13–17 weeks for one developer. The CEO was visibly surprised when told it was already done. Cumulative build time: roughly 25–30 days.",
          },
          {
            type: "paragraph",
            text: "Invite-only — no public link.",
            tone: "aside",
          },
        ],
      },
    ],
  },
  contact: {
    heading: "Contact",
    prompt: "Get in touch",
    email: "kontakt@piotrkacala.pl",
  },
} satisfies SiteCopy;
