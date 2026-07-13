import type { SiteCopy } from "./schema.ts";
import { phoneticBenchmarkPublicationStats } from "../site/phonetic-benchmark.ts";

export const en = {
  lang: "en",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała",
    description:
      "Piotr Kacała is a Product Builder who owns product decisions, system boundaries, review, and outcomes while AI agents provide the implementation interface.",
    openGraph: {
      title: "Piotr Kacała",
      description:
        "AI agents are the implementation interface. I own the product decisions, system boundaries, review, and outcome.",
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
    statement:
      "AI agents are the implementation interface. I own the product decisions, system boundaries, review, and outcome.",
    expansion:
      "I have worked across development, design, product, and QA since 2013. That range lets me turn ambiguous ideas into scoped systems, direct agents in the language of each discipline, integrate the result, and decide what is ready to ship.",
  },
  projects: {
    heading: "Projects",
    arc: "The public work shows the method from different angles: an existing codebase, a released extension built from a written specification, this repository as an inspectable workflow artifact, and a task-specific benchmark with archived results.",
    items: [
      {
        title: "Phonetic Alphabet Trainer",
        blocks: [
          {
            type: "paragraph",
            text: "I reopened an existing React project to test how AI handles a real codebase and compare models and IDEs. Along the way, I discovered that the published Polish Ministry of Defence phonetic alphabet omits some letters. The app ships in English and Polish, with scoring, two answer modes, and streak tracking.",
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
            text: "Surfaced was my first project built from scratch: I wrote a docs-first specification, then used AI agents for implementation. The browser extension tracks scroll depth and adds increasingly direct reminders when someone scrolls too far through an interface with no natural endpoint. It passed Mozilla's public review and is available from Firefox Add-ons and the Chrome Web Store.",
          },
          {
            type: "link",
            href: "https://addons.mozilla.org/firefox/addon/surfaced/",
            label: "Firefox Add-ons: Surfaced",
            machineLabel: "Firefox Add-ons",
            external: true,
            externalLabel: "(opens in a new tab)",
          },
          {
            type: "link",
            href: "https://chromewebstore.google.com/detail/surfaced/bpbidikjpaffmpcbincadomhbfnoaaem",
            label: "Chrome Web Store: Surfaced",
            machineLabel: "Chrome Web Store",
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
            text: "This repository makes the working method inspectable. I define the product, content model, system boundaries, and review criteria; agents implement against the documentation; I integrate and verify the result. The repo is public and intentionally readable, including AGENTS.md, the docs directory, tests, and commit history.",
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
            text: `A practical, task-specific evaluation of coding-agent outputs. The report now covers ${phoneticBenchmarkPublicationStats.totalRunCount} archived outputs: ${phoneticBenchmarkPublicationStats.v2.runCount} in the current v2 batch and ${phoneticBenchmarkPublicationStats.v1.runCount} in the original v1 snapshot. I define the contract and review each result for required behavior, UX, testing, and delivery evidence. This is not a universal model ranking.`,
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
        "Product consulting and software delivery for founders and small teams, with clear human ownership of product decisions, system boundaries, review, and outcomes.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "Product consulting and software delivery with clear ownership of product decisions, system boundaries, review, and outcomes.",
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
      "I work with founders and small teams that need to turn an idea into a usable product without assembling a full product team. I take responsibility for shaping the scope, making product decisions within it, and carrying the delivery loop: specification, system boundaries, review, integration, deployment, and iteration.",
    homeLabel: "Back to homepage",
    scope: {
      heading: "Start with the scope",
      paragraphs: [
        "If the idea is still rough, the first useful step is a focused product scoping pass with a defined outcome. The goal is not to produce a large strategy document. It is to make the project concrete enough to build. It may also identify early that the project should not be built yet.",
        "If you already have a clear brief, we can go directly to build planning.",
      ],
      deliverablesHeading: "The scoping pass produces:",
      deliverables: [
        "practical product brief",
        "focused initial scope and explicit list of things to leave for later",
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
      heading: "AI is the implementation method",
      paragraphs: [
        "AI agents generate implementation. I remain responsible for the product decisions, system boundaries, review, integration, and outcome. The working interface changed; the ownership did not.",
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
        "projects that mainly require deep specialization in one framework",
        "responsibility for outcomes without authority to make the decisions needed to deliver them",
      ],
    },
    selectedWork: {
      heading: "Selected work",
      body: `The homepage links to a released browser extension, a public repository with readable documentation, a local-first utility, and a task-specific coding-agent benchmark with ${phoneticBenchmarkPublicationStats.totalRunCount} inspectable outputs.`,
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
