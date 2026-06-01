export const siteProfile = {
  name: "Piotr Kacała",
  siteName: "Piotr Kacała",
  siteUrl: "https://piotrkacala.pl",
  email: "kontakt@piotrkacala.pl",
  jobTitle: "Product Builder",
  repoUrl: "https://github.com/piotrkacala/personal-website",
  description:
    "Personal website of Piotr Kacała. Product builder across product, design, QA, and development. Now building zero-code through AI agents.",
  knowsAbout: [
    "AI agent development",
    "Product development",
    "Design",
    "Quality assurance",
    "Documentation-driven development",
    "Zero-code workflows",
  ],
  publicProof: [
    {
      label: "Phonetic Alphabet Trainer",
      summary: "existing-codebase AI workflow",
      url: "https://piotrkacala.github.io/phonetic/",
    },
    {
      label: "Phonetic Benchmark Report",
      summary: "qualitative AI-agent output review with archived static demos",
      url: "https://piotrkacala.pl/phonetic-benchmark/",
    },
    {
      label: "Phonetic Benchmark Screenshot Gallery",
      summary: "direct visual comparison of archived AI-agent outputs",
      url: "https://piotrkacala.pl/phonetic-benchmark/gallery/",
    },
    {
      label: "Surfaced",
      summary: "docs-first zero-code browser extension",
      url: "https://addons.mozilla.org/firefox/addon/surfaced/",
    },
    {
      label: "This site repo",
      summary: "public docs-driven portfolio repo",
      url: "https://github.com/piotrkacala/personal-website",
    },
    {
      label: "400m",
      summary: "local-first GPX track tool",
      url: "https://piotrkacala.pl/400m/",
    },
  ],
} as const;

export function getMarkdownUrl(lang: "en" | "pl"): string {
  return new URL(
    lang === "en" ? "/index.md" : "/pl/index.md",
    siteProfile.siteUrl,
  ).toString();
}

export function getLlmsFullUrl(): string {
  return new URL("/llms-full.txt", siteProfile.siteUrl).toString();
}
