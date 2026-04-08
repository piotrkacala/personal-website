import type { SiteCopy } from "./schema";

export const en = {
  lang: "en",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała — Product Builder",
    description:
      "Personal website of Piotr Kacała. Product builder across product, design, QA, and development. Now building zero-code through AI agents.",
    openGraph: {
      title: "Piotr Kacała — Product Builder",
      description:
        "In IT since 2013. Now building zero-code through AI agents, across product, design, QA, and development.",
      type: "website",
      locale: "en_US",
      siteName: "Piotr Kacała",
      url: "https://piotrkacala.pl/",
      image: {
        url: "https://piotrkacala.pl/og/piotr-kacala-en.png",
        width: 1200,
        height: 630,
        alt: "Piotr Kacała — Product Builder. Across product, design, QA, and development.",
      },
    },
  },
  languageSwitcher: {
    ariaLabel: "Language switcher",
    en: "EN",
    pl: "PL",
  },
  hero: {
    headline: "Product Builder",
    expansion:
      "In IT since 2013, across development, design, product, and QA — never tied to a single tool, always focused on output. Since early 2026, I build entirely through AI agents, zero-code. The competitive edge isn't the tooling — it's knowing which questions to ask before the problem surfaces, and being able to prompt in the language of the domain: like a developer, a QA engineer, a designer, or a product manager. AI performs best on exactly that kind of material. The interface became writing, and I've been text-native my whole career.",
  },
  projects: {
    heading: "Projects",
    arc: "Each project, a deliberate next step. Testing AI on an existing codebase. Building from scratch, docs-first, zero-code. A full product for a real customer. Then this site.",
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
            externalLabel: "(opens in a new tab)",
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
            externalLabel: "(opens in a new tab)",
          },
        ],
      },
      {
        title: "This site",
        blocks: [
          {
            type: "paragraph",
            text: "Built the same way — spec-first, docs-driven, zero-code — but with one addition: an orchestrator agent that stepped through the implementation plan autonomously, generating prompts, reading results, handling review. The first project where the workflow managed itself. The repo is public and intentionally readable: CLAUDE.md, full docs directory, clean commit history.",
          },
          {
            type: "link",
            href: "https://github.com/piotrkacala/personal-website",
            label: "Repo: github.com/piotrkacala/personal-website",
            external: true,
            externalLabel: "(opens in a new tab)",
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
              { label: "Production code", value: "~21,000 lines" },
              { label: "Tests", value: "~9,400 lines" },
              { label: "Commits", value: "295" },
              { label: "Database models", value: "25" },
              { label: "API routes", value: "~96" },
              { label: "Pages", value: "37" },
              { label: "Components", value: "50" },
              { label: "Internationalization", value: "Full i18n" },
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
} satisfies SiteCopy & {
  languageSwitcher: {
    ariaLabel: string;
    en: string;
    pl: string;
  };
};
