import type { SiteCopy } from "./schema.ts";
import { phoneticBenchmarkPublicationStats } from "../site/phonetic-benchmark.ts";

export const en = {
  lang: "en",
  title: "Piotr Kacala",
  metadata: {
    title: "Piotr Kacała",
    description:
      "Piotr Kacała is a Product Builder who implements and ships software himself, using AI coding agents inside his engineering workflow.",
    openGraph: {
      title: "Piotr Kacała",
      description:
        "I implement and ship software myself, using AI coding agents inside my engineering workflow.",
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
      "I implement and ship software myself, using AI coding agents inside my engineering workflow. I work directly in the codebase and own the product decisions, system boundaries, review, integration, and outcome.",
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
            text: "Surfaced was the first project I built and shipped from scratch using a docs-first specification and AI coding agents inside my implementation workflow. The browser extension tracks scroll depth and adds increasingly direct reminders when someone scrolls too far through an interface with no natural endpoint. It passed Mozilla's public review and is available from Firefox Add-ons and the Chrome Web Store.",
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
            text: "This repository makes my implementation workflow inspectable. I work directly in the codebase: I define the product, content model, system boundaries, and review criteria; direct coding agents against the documentation; inspect and debug changes; integrate them; run the tests; and ship the result. The repo is public and intentionally readable, including AGENTS.md, the docs directory, tests, and commit history.",
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
        "Delivery of bounded web projects for founders and small teams, from first-version definition to an agreed completion point.",
      openGraph: {
        title: "Consulting | Piotr Kacała",
        description:
          "One accountable owner for a bounded web project, from first-version definition to an agreed completion point.",
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
    title: "One accountable owner from definition to delivery.",
    intro:
      "I work with founders, business owners, and small teams that have a concrete project but do not want to assemble and coordinate a temporary product team. I define a realistic first version, build and verify it, and carry the work to the delivery boundary agreed for the engagement.",
    homeLabel: "Back to homepage",
    projectExamples: {
      heading: "Projects this model fits",
      intro:
        "The best fit is a bounded web project with a concrete business purpose, accessible domain knowledge, and room to make the decisions needed for delivery.",
      items: [
        {
          heading: "Internal workflow tools",
          body: "Applications that replace spreadsheets, email coordination, repetitive administration, or other manual processes. This can include operational interfaces, dashboards, and custom data processing.",
        },
        {
          heading: "Bounded web platforms",
          body: "Client, contractor, or partner portals with accounts, roles, data storage, file exchange, and administrative views. The first version is deliberately scoped so it can be delivered and verified before the product expands.",
        },
        {
          heading: "Product and company websites",
          body: "Product, campaign, company, or service websites where delivery may also include deployment, hosting guidance, and focused support with product presentation.",
        },
      ],
    },
    clientValue: {
      heading: "One owner of the project context and delivery path",
      paragraphs: [
        "I keep the intended result, scope, system boundaries, implementation, and direct product verification connected throughout the project. You do not need to turn the work into a ticket queue or coordinate several contractors yourself.",
      ],
      items: [
        "a realistic first version and explicit exclusions",
        "one accountable owner of product context and delivery decisions",
        "implementation, review, testing, and direct verification of the product",
        "clear communication of progress, blockers, decisions, and risk",
        "delivery to a boundary agreed before the relevant stage begins",
      ],
      specialistBoundary:
        "Having one accountable owner does not mean one person replaces every specialist. Independent QA, security, reliability, infrastructure, legal, or compliance input is added when the project's risk requires it.",
    },
    engagement: {
      heading: "From first contact to an agreed result",
      steps: [
        {
          heading: "1. Check the fit",
          paragraphs: [
            "The first contact is free. You do not need a complete brief. We establish what you want to achieve, what exists today, the main uncertainties, and whether there is a responsible path to delivery.",
          ],
        },
        {
          heading: "2. Define the first version",
          paragraphs: [
            "If the result is already clear enough, definition can be included in the full project proposal. If substantial uncertainty must be resolved before scope and pricing can be set responsibly, I may recommend a separate paid definition stage.",
          ],
          deliverables: [
            "a practical product brief",
            "the first scope and an explicit list of things left for later",
            "main user scenarios, constraints, exclusions, and risks",
            "a recommended implementation and delivery path",
          ],
        },
        {
          heading: "3. Build, verify, and deliver",
          paragraphs: [
            "Once both sides confirm what completion means, I implement the agreed scope, review and test the result, show working software at useful points, and carry it to the agreed delivery boundary.",
          ],
        },
      ],
    },
    pricingDelivery: {
      heading: "Price follows a defined result",
      paragraphs: [
        "A project or stage can receive a fixed price when both sides have confirmed what completion means. When practical, I provide an indicative overall range before paid work begins. Later stages can become more precise after definition. New or changed requirements may affect time and price.",
        "The agreed completion point may be working code handed to your team, a deployed application, or deployment with a short stabilization period. The engagement can also transition into continued development. Before work begins, we establish who is responsible for hosting, third-party services, deployment, access, and ongoing operation.",
        "Maintenance and continued development are optional. They are discussed after the product's operating needs are known rather than included automatically.",
      ],
    },
    collaboration: {
      heading: "Async-first, with useful visibility",
      paragraphs: [
        "I work independently and provide clear progress summaries. Blocking decisions are separated from normal updates, and working versions or demonstrations are used when they help review the result.",
        "The model works when the right decision maker is accessible, domain knowledge is available, and the client can provide the content, data, access, and feedback needed for delivery.",
      ],
    },
    ai: {
      heading: "AI supports the delivery method",
      paragraphs: [
        "I implement the software myself, using AI coding agents as tools inside my engineering workflow. I remain responsible for product decisions, system boundaries, code review, integration, and outcome. Development is not subcontracted to an external delivery team. The client buys the result and the accountability behind it, not access to an internal AI workflow.",
        "If AI belongs inside the product, its role still needs explicit boundaries: what it may do, what it must not decide, which tools it can use, what data it may retain, and how its behavior is verified.",
      ],
    },
    fit: {
      goodHeading: "Good fit",
      goodItems: [
        "a concrete business objective and a bounded web project or first version",
        "accessible decision makers and domain experts",
        "willingness to prioritize and leave lower-value scope for later",
        "clear responsibility for scope approval and acceptance",
        "a result that can be delivered and verified in meaningful stages",
        "technical and operational risk that is understood, bounded, or supported by the right specialist",
      ],
      notHeading: "Not a fit",
      notItems: [
        "joining an existing ticket queue as a missing developer",
        "responsibility for the result without enough authority to make delivery decisions",
        "projects that depend on extensive coordination across several teams",
        "work that primarily requires specialist security, compliance, reliability, or infrastructure expertise unless the right support can be added",
      ],
    },
    evidence: {
      heading: "Evidence behind the offer",
      paragraphs: [
        "I have worked in IT since 2013 across development, product, QA, design, delivery, and client work. My earlier consulting practice grew through repeat clients and referrals, including periods when I carried both the client relationship and delivery independently.",
        `My public work provides a different kind of evidence: released browser products, useful small web applications, open repositories, tests, delivery documentation, and a published coding-agent evaluation with ${phoneticBenchmarkPublicationStats.totalRunCount} inspectable outputs.`,
      ],
      linkLabel: "See selected work",
      href: "/#projects",
    },
    contact: {
      heading: "Tell me what you want to achieve",
      body: "Write briefly what result you need and what exists today. I will tell you whether the project fits and what next step makes sense.",
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
