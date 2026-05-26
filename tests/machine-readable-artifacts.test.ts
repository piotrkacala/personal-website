import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { en } from "../src/i18n/en.ts";
import { getMachineReadableArtifacts } from "../src/i18n/machine-readable.ts";
import { pl } from "../src/i18n/pl.ts";
import type { LinkBlock } from "../src/i18n/schema.ts";

type ArtifactPath = `/${string}`;

function getArtifactsByPath() {
  return new Map(
    getMachineReadableArtifacts().map(
      (artifact) => [artifact.pathname, artifact.content] as const,
    ),
  );
}

function getArtifactContent(pathname: ArtifactPath): string {
  const content = getArtifactsByPath().get(pathname);

  if (content === undefined) {
    assert.fail(`Expected artifact for ${pathname}`);
  }

  return content;
}

function getFirstLinkBlock(language: "en" | "pl"): LinkBlock {
  const copy = language === "en" ? en : pl;
  const project = copy.projects.items.find((item) =>
    item.blocks.some((block) => block.type === "link"),
  );

  if (!project) {
    assert.fail(`Expected at least one project link in ${language} copy`);
  }

  const linkBlock = project.blocks.find((block) => block.type === "link");

  if (!linkBlock || linkBlock.type !== "link") {
    assert.fail(`Expected a link block in ${language} copy`);
  }

  return linkBlock;
}

test("getMachineReadableArtifacts returns the expected artifact inventory", () => {
  const paths = getMachineReadableArtifacts()
    .map((artifact) => artifact.pathname)
    .sort();

  assert.deepEqual(paths, [
    "/index.md",
    "/llms-full.txt",
    "/phonetic-benchmark/index.md",
    "/pl/index.md",
    "/pl/phonetic-benchmark/index.md",
    "/projects/400m.md",
  ]);
});

test("English homepage markdown keeps its key structure and references", () => {
  const content = getArtifactContent("/index.md");

  assert.match(content, /^# Piotr Kacała — Product Builder$/m);
  assert.match(
    content,
    /^> Personal website of Piotr Kacała\. Product builder across product, design, QA, and development\./m,
  );
  assert.match(content, /^## Product Builder$/m);
  assert.match(content, /^## Projects$/m);
  assert.match(content, /^### 1\. Phonetic Alphabet Trainer$/m);
  assert.match(content, /^### 2\. Surfaced$/m);
  assert.match(
    content,
    /^- Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(content, /^#### As of April 2026$/m);
  assert.match(content, /^- Production code: ~21,000 lines$/m);
  assert.match(content, /^- Tool: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(
    content,
    /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(content, /^## Contact$/m);
  assert.match(content, /^Get in touch: kontakt@piotrkacala\.pl$/m);
});

test("Polish homepage markdown keeps its key structure and references", () => {
  const content = getArtifactContent("/pl/index.md");

  assert.match(content, /^# Piotr Kacała — Product Builder$/m);
  assert.match(
    content,
    /^> Strona Piotra Kacały\. Product Builder na styku produktu, designu, QA i developmentu\./m,
  );
  assert.match(content, /^## Product Builder$/m);
  assert.match(content, /^## Projekty$/m);
  assert.match(content, /^### 2\. Surfaced$/m);
  assert.match(
    content,
    /^- Raport: https:\/\/piotrkacala\.pl\/pl\/phonetic-benchmark\/$/m,
  );
  assert.match(content, /^### 4\. Ta strona$/m);
  assert.match(content, /^#### Stan na kwiecień 2026$/m);
  assert.match(content, /^- Kod produkcyjny: ~21,000 linii$/m);
  assert.match(content, /^- Narzędzie: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(
    content,
    /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(content, /^## Kontakt$/m);
  assert.match(content, /^Napisz do mnie: kontakt@piotrkacala\.pl$/m);
});

test("llms-full.txt carries the consolidated public references", () => {
  const content = getArtifactContent("/llms-full.txt");

  assert.match(content, /^# Piotr Kacała — Full Public Site Context$/m);
  assert.match(content, /^## English homepage$/m);
  assert.match(content, /^## Polish homepage$/m);
  assert.match(content, /^## Public references$/m);
  assert.match(content, /^- English homepage: https:\/\/piotrkacala\.pl\/$/m);
  assert.match(
    content,
    /^- Polish homepage: https:\/\/piotrkacala\.pl\/pl\/$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark markdown report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/index\.md$/m,
  );
  assert.match(content, /^- Contact: mailto:kontakt@piotrkacala\.pl$/m);
  assert.match(
    content,
    /^- Phonetic Alphabet Trainer — Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- This site — Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(
    content,
    /^- This site — Tool: https:\/\/piotrkacala\.pl\/400m\/$/m,
  );
  assert.match(
    content,
    /^- 400m — Companion profile: https:\/\/piotrkacala\.pl\/projects\/400m\.md$/m,
  );
  assert.match(
    content,
    /^- Phonetic Alphabet Trainer — Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
  );
});

test("English Phonetic Benchmark report markdown carries run labels, protocol, and demo links", () => {
  const content = getArtifactContent("/phonetic-benchmark/index.md");

  assert.match(content, /^# Phonetic Benchmark Report$/m);
  assert.match(
    content,
    /^Report URL: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^Markdown URL: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/index\.md$/m,
  );
  assert.match(content, /^## Benchmark Protocol$/m);
  assert.match(content, /working project that matches the specification/);
  assert.match(content, /^## Run Review Matrix$/m);
  assert.match(content, /oldest to newest by execution order/);
  assert.match(content, /^### GPT 5\.4 High$/m);
  assert.match(content, /^### GPT 5\.5 High$/m);
  assert.match(content, /^### Gemini 3\.5 Flash High$/m);
  assert.ok(
    content.indexOf("### GPT 5.4 High") < content.indexOf("### GPT 5.5 High"),
  );
  assert.ok(
    content.indexOf("### GPT 5.5 High") <
      content.indexOf("### Gemini 3.5 Flash High"),
  );
  assert.match(content, /^- Execution order: 1$/m);
  assert.match(content, /^## Best Current Read$/m);
  assert.match(content, /GPT 5\.5 High is the only archived output/);
  assert.ok(
    content.indexOf("## Qualitative Findings") <
      content.indexOf("## Benchmark Protocol"),
  );
  assert.ok(
    content.indexOf("## Benchmark Protocol") <
      content.indexOf("## Archived Demos"),
  );
  assert.match(
    content,
    /^- Screenshot: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/screenshots\/gpt-5-4-high-quiz\.png$/m,
  );
  assert.match(
    content,
    /^- Demo: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/demos\/gpt-5-4-high\/$/m,
  );
  assert.match(
    content,
    /^- Screenshot: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/screenshots\/gpt-5-5-high-quiz\.png$/m,
  );
  assert.match(
    content,
    /^- Demo: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/demos\/gpt-5-5-high\/$/m,
  );
  assert.match(
    content,
    /^- Screenshot: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/screenshots\/gemini-3-5-flash-high-quiz\.png$/m,
  );
  assert.match(
    content,
    /^- Demo: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/demos\/gemini-3-5-flash-high\/$/m,
  );
});

test("Polish Phonetic Benchmark report markdown carries localized protocol and demo links", () => {
  const content = getArtifactContent("/pl/phonetic-benchmark/index.md");

  assert.match(content, /^# Phonetic Benchmark Report$/m);
  assert.match(content, /^## Protokół benchmarku$/m);
  assert.match(content, /działający projekt zgodny ze specyfikacją/);
  assert.match(content, /^## Tabela przeglądu prób$/m);
  assert.match(content, /od najstarszej do najnowszej/);
  assert.match(content, /^### GPT 5\.4 High$/m);
  assert.match(content, /^### GPT 5\.5 High$/m);
  assert.match(content, /^### Gemini 3\.5 Flash High$/m);
  assert.match(content, /^- Kolejność wykonania: 1$/m);
  assert.match(content, /^## Najlepszy odczyt na teraz$/m);
  assert.match(content, /GPT 5\.5 High jest jedyną archiwalną wersją/);
  assert.ok(
    content.indexOf("## Wnioski jakościowe") <
      content.indexOf("## Protokół benchmarku"),
  );
  assert.match(
    content,
    /^- Zrzut ekranu: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/screenshots\/gpt-5-4-high-quiz\.png$/m,
  );
  assert.match(
    content,
    /^- Demo: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/demos\/gpt-5-4-high\/$/m,
  );
});

test("static discovery files include report HTML and markdown paths", () => {
  const llms = readFileSync("public/llms.txt", "utf8");
  const sitemap = readFileSync("public/sitemap.xml", "utf8");

  assert.match(
    llms,
    /^- Phonetic Benchmark report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    llms,
    /^- Polish Phonetic Benchmark markdown report: https:\/\/piotrkacala\.pl\/pl\/phonetic-benchmark\/index\.md$/m,
  );
  assert.match(
    llms,
    /^- Phonetic Benchmark Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );

  for (const pathname of [
    "/phonetic-benchmark/",
    "/pl/phonetic-benchmark/",
    "/phonetic-benchmark/index.md",
    "/pl/phonetic-benchmark/index.md",
  ]) {
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://piotrkacala\\.pl${pathname.replaceAll("/", "\\/")}</loc>`,
      ),
    );
  }
});

test("report pages wire markdown alternate URLs through the shared layout", () => {
  const englishRoute = readFileSync(
    "src/pages/phonetic-benchmark/index.astro",
    "utf8",
  );
  const polishRoute = readFileSync(
    "src/pages/pl/phonetic-benchmark/index.astro",
    "utf8",
  );

  for (const route of [englishRoute, polishRoute]) {
    assert.match(
      route,
      /markdownUrl=\{getPhoneticBenchmarkMarkdownUrl\(report\.lang\)\}/,
    );
    assert.match(
      route,
      /homeLink=\{\{ href: report\.homeHref, ariaLabel: report\.homeLabel \}\}/,
    );
    assert.match(route, /contentWidth="wide"/);
  }
});

test("benchmark report component links table rows to newest-first findings", () => {
  const component = readFileSync(
    "src/components/PhoneticBenchmarkReport.astro",
    "utf8",
  );

  assert.match(
    component,
    /secondRun\.executionOrder - firstRun\.executionOrder/,
  );
  assert.match(component, /return `benchmark-finding-\$\{runId\}`;/);
  assert.match(
    component,
    /<a href=\{`#\$\{getFindingId\(run\.id\)\}`\}>\{run\.model\}<\/a>/,
  );
  assert.match(
    component,
    /<article class="finding-entry" id=\{getFindingId\(run\.id\)\}>/,
  );
  assert.ok(
    component.indexOf("aria-labelledby={resultsHeadingId}") <
      component.indexOf("aria-labelledby={currentBestHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={currentBestHeadingId}") <
      component.indexOf("aria-labelledby={findingsHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={findingsHeadingId}") <
      component.indexOf("aria-labelledby={protocolHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={protocolHeadingId}") <
      component.indexOf("aria-labelledby={closingHeadingId}"),
  );
});

test("400m companion profile is generated with high-signal operating details", () => {
  const content = getArtifactContent("/projects/400m.md");

  assert.match(content, /^# 400m$/m);
  assert.match(
    content,
    /^> Companion machine-readable profile for the public 400m tool linked from https:\/\/piotrkacala\.pl\/\.$/m,
  );
  assert.match(content, /^## Summary$/m);
  assert.match(
    content,
    /^400m is a free local-first GPX analyzer for runners on standard athletics tracks\./m,
  );
  assert.match(content, /^## Live tool$/m);
  assert.match(content, /^- URL: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(content, /^- Type: Browser-based GPX analyzer$/m);
  assert.match(content, /^## What it does$/m);
  assert.match(
    content,
    /^- Calculates corrected distance from lap count and official lane length\.$/m,
  );
  assert.match(content, /^## Intended input$/m);
  assert.match(content, /^- GPX file recorded during a run\.$/m);
  assert.match(content, /^## Privacy and runtime$/m);
  assert.match(
    content,
    /^- No GPX file, coordinates, or telemetry are sent to a server for the calculation\.$/m,
  );
  assert.match(content, /^## Constraints$/m);
  assert.match(
    content,
    /^- Designed for track sessions, not general route analysis\.$/m,
  );
  assert.match(content, /^## Discovery note$/m);
  assert.match(
    content,
    /^- The interactive analyzer itself lives at https:\/\/piotrkacala\.pl\/400m\/$/m,
  );
});

test("machine-readable links do not depend on visible label punctuation", () => {
  const enLink = getFirstLinkBlock("en");
  const plLink = getFirstLinkBlock("pl");
  const originalEnLabel = enLink.label;
  const originalPlLabel = plLink.label;

  enLink.label = "Primary link -> piotrkacala.github.io/phonetic/";
  plLink.label = "Odsyłacz bez dwukropka i prefiksu";

  try {
    const englishHomepage = getArtifactContent("/index.md");
    const polishHomepage = getArtifactContent("/pl/index.md");
    const fullContext = getArtifactContent("/llms-full.txt");

    assert.match(
      englishHomepage,
      /^- Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
    );
    assert.doesNotMatch(englishHomepage, /Primary link ->/);

    assert.match(
      polishHomepage,
      /^- Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
    );
    assert.doesNotMatch(polishHomepage, /Odsyłacz bez dwukropka/);

    assert.match(
      fullContext,
      /^- Phonetic Alphabet Trainer — Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
    );
    assert.doesNotMatch(fullContext, /Primary link ->|Odsyłacz bez dwukropka/);
  } finally {
    enLink.label = originalEnLabel;
    plLink.label = originalPlLabel;
  }
});
