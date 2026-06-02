import type { SiteCopy } from "./schema.ts";

export const en = {
  lang: "en",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała — Product Builder",
    description:
      "Personal website of Piotr Kacała. AI agents are the build interface. The differentiator is judgment across product, design, QA, and development.",
    openGraph: {
      title: "Piotr Kacała — Product Builder",
      description:
        "AI agents are the build interface. The differentiator is judgment across product, design, QA, and development.",
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
    arc: "Each project marks a deliberate next step. Testing AI on an existing codebase. Building from scratch, docs-first, zero-code. Delivering a full product for a real customer. Building this site as a public artifact. Then making coding-agent evaluation public.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        blocks: [
          {
            type: "paragraph",
            text: "An existing React project, reopened to test how AI handles a real codebase — and to compare models and IDEs. Along the way, discovered missing letters in the official Polish Ministry of Defence phonetic alphabet. Ships in English and Polish with scoring, two answer modes, and streak tracking.",
          },
          {
            type: "paragraph",
            text: "The project later became the product brief for Phonetic Benchmark.",
          },
          {
            type: "link",
            href: "https://piotrkacala.github.io/phonetic/",
            label: "Link: piotrkacala.github.io/phonetic/",
            machineLabel: "Link",
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
            text: "First project built from scratch, docs-driven, zero-code. A browser extension that tracks scroll depth and notifies you when you've gone too far — three depth zones with escalating urgency. Passed Mozilla's public review and is available from Firefox Add-ons and the Chrome Web Store.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Firefox: addons.mozilla.org/firefox/addon/surfaced/",
            machineLabel: "Firefox Add-ons",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
          {
            type: "link",
            href: "https://chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            label:
              "Chrome: chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            machineLabel: "Chrome Web Store",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
        ],
      },
      {
        title: "Private client audit platform",
        blocks: [
          {
            type: "paragraph",
            text: "First full production project, built spec-first for a real customer. As of April 2026: ~21,000 lines of production code, ~9,400 lines of tests, and 295 commits.",
          },
          {
            type: "paragraph",
            text: "Private client project — no public runtime link.",
            tone: "aside",
          },
        ],
      },
      {
        title: "This site",
        blocks: [
          {
            type: "paragraph",
            text: "Built the same way — spec-first, docs-driven, zero-code — but with one addition: an orchestrator agent that stepped through the implementation plan autonomously, generating prompts, reading results, handling review. The first project where the workflow managed itself. The repo is public and intentionally readable: AGENTS.md, full docs directory, clean commit history.",
          },
          {
            type: "paragraph",
            text: "It now also hosts small public utilities. The first one is 400m, a local-first GPX track tool for runners that estimates corrected distance from lap progress instead of raw GPS length.",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/400m/",
            label: "Tool: piotrkacala.pl/400m/",
            machineLabel: "Tool",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
          {
            type: "link",
            href: "https://github.com/piotrkacala/personal-website",
            label: "Repo: github.com/piotrkacala/personal-website",
            machineLabel: "Repo",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
        ],
      },
      {
        title: "Phonetic Benchmark",
        blocks: [
          {
            type: "paragraph",
            text: "A practical, task-specific evaluation of coding-agent outputs. Fifteen models received the same docs-first brief for a small browser app. I archived every result and reviewed contract compliance, UX behavior, testing, and delivery quality. This is not a universal model ranking. It is a documented comparison of how coding-agent workflows behave on the same product task.",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/phonetic-benchmark/",
            label: "Report: piotrkacala.pl/phonetic-benchmark/",
            machineLabel: "Report",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/phonetic-benchmark/gallery/",
            label: "Gallery: piotrkacala.pl/phonetic-benchmark/gallery/",
            machineLabel: "Gallery",
          },
          {
            type: "link",
            href: "https://piotrkacala.pl/phonetic-benchmark/methodology/",
            label:
              "Methodology: piotrkacala.pl/phonetic-benchmark/methodology/",
            machineLabel: "Methodology",
          },
          {
            type: "link",
            href: "https://github.com/piotrkacala/phonetic-benchmark",
            label: "Package: github.com/piotrkacala/phonetic-benchmark",
            machineLabel: "Public benchmark package",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
        ],
      },
    ],
  },
  contact: {
    heading: "Contact",
    prompt: "Get in touch",
    email: "kontakt@piotrkacala.pl",
    consultingLink: {
      href: "/consulting/",
      label: "Looking for product consulting? See how I work.",
    },
  },
  consulting: {
    lang: "en",
    metadata: {
      title: "Consulting | Piotr Kacała",
      description:
        "Product consulting and complete software delivery for founders and small teams: clarify the scope, write the spec, build, test, deploy, and iterate.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "Product consulting and complete software delivery for founders and small teams: clarify the scope, write the spec, build, test, deploy, and iterate.",
        type: "website",
        locale: "en_US",
        siteName: "Piotr Kacała",
        url: "https://piotrkacala.pl/consulting/",
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-en.png",
          width: 1200,
          height: 630,
          alt: "Piotr Kacała — Product Builder. Across product, design, QA, and development.",
        },
      },
    },
    eyebrow: "Consulting",
    title: "From rough product idea to shipped software.",
    intro:
      "I work with founders and small teams that need to turn an idea into a usable product without assembling a full product team. I clarify the scope, write the practical specification, build the system, test it, deploy it, and iterate.",
    homeLabel: "Back to homepage",
    scope: {
      heading: "Start with the scope",
      paragraphs: [
        "If the idea is still rough, the first useful step is a short product scoping pass with a defined scope. The goal is not to produce a large strategy document. It is to make the project concrete enough to build. It may also identify early that the project should not be built yet.",
        "If you already have a clear brief, we can go directly to build planning.",
      ],
      deliverablesHeading: "The scoping pass produces:",
      deliverables: [
        "practical product brief",
        "focused first scope and explicit list of things to leave for later",
        "key user flows, constraints, and risks",
        "recommended next step",
        "architecture notes and implementation outline when the idea is ready to build",
      ],
    },
    delivery: {
      heading: "From scope to delivery",
      paragraphs: [
        "If the project is a good fit, I can continue through the full delivery loop: specification, implementation, testing, deployment, and iteration. This works best for prototypes, internal tools, automations, and first production versions where one person needs to carry the product context end to end.",
      ],
    },
    ai: {
      heading: "AI is part of the method",
      paragraphs: [
        "I build through AI agent workflows. The value is not that a model writes code. The value is structuring the work well enough to move quickly without lowering the bar for judgment, review, or quality.",
        "If AI belongs inside the product itself, I also help define the model's role: what it should do, what it must not decide, which tools it can use, what it may persist, and which guardrails shape the experience.",
      ],
    },
    fit: {
      goodHeading: "Good fit",
      goodItems: [
        "founders at an early stage with a product idea that needs structure",
        "small companies without a full product team",
        "prototypes, internal tools, automations, and first production versions",
        "work where ownership and practical decisions matter more than filling a ticket queue",
      ],
      notHeading: "Not a fit",
      notItems: [
        "narrow staff augmentation",
        "execution limited to tickets without product context",
        "projects looking mainly for deep specialization in one framework",
        "responsibility for outcomes without authority to make the decisions needed to deliver them",
      ],
    },
    selectedWork: {
      heading: "Selected work",
      body: "The homepage shows the progression: a released browser extension, a private production platform for a real customer, a public website with readable documentation, small useful software, and a published coding agent benchmark with inspectable outputs.",
      linkLabel: "See selected work",
      href: "/#projects",
    },
    contact: {
      heading: "Start a conversation",
      body: "Send a short note: what needs to be built, who it is for, and what exists today.",
      email: "kontakt@piotrkacala.pl",
    },
  },
} satisfies SiteCopy & {
  languageSwitcher: {
    ariaLabel: string;
    en: string;
    pl: string;
  };
};
