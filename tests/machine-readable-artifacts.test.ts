import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { en } from "../src/i18n/en.ts";
import { getMachineReadableArtifacts } from "../src/i18n/machine-readable.ts";
import { pl } from "../src/i18n/pl.ts";
import type { LinkBlock } from "../src/i18n/schema.ts";
import {
  getPhoneticBenchmarkMethodologySchemas,
  getPhoneticBenchmarkReportSchemas,
  getPhoneticBenchmarkResultsData,
  getPhoneticBenchmarkRunSchemas,
  phoneticBenchmarkMetadata,
  phoneticBenchmarkGalleries,
  phoneticBenchmarkReports,
  phoneticBenchmarkRuns as benchmarkRunData,
} from "../src/site/phonetic-benchmark.ts";

type ArtifactPath = `/${string}`;

const phoneticBenchmarkRuns = [
  { heading: "Big Pickle", id: "big-pickle-v2" },
  { heading: "DeepSeek V4 Flash", id: "deepseek-v4-flash-v2" },
  { heading: "MiMo 2.5", id: "mimo-v2-5-v2" },
  { heading: "Nemotron 3 Super", id: "nemotron-3-super-v2" },
  { heading: "GPT 5.4 High", id: "gpt-5-4-high" },
  { heading: "GPT 5.5 High", id: "gpt-5-5-high" },
  { heading: "Gemini 3.5 Flash High", id: "gemini-3-5-flash-high" },
  { heading: "Gemini 3.1 Pro High", id: "gemini-3-1-pro-high" },
  { heading: "Claude Sonnet 4.6 Thinking", id: "sonnet-4-6-thinking" },
  { heading: "Owl Alpha", id: "owl-alpha" },
  { heading: "Gemma 4 26B", id: "gemma-4-26b" },
  { heading: "Nemotron 3 Super", id: "nemotron-3-super" },
  { heading: "Laguna M.1", id: "laguna-m-1" },
  { heading: "DeepSeek V4 Pro", id: "deepseek-v4-pro" },
  { heading: "gpt-oss-120b", id: "gpt-oss-120b" },
  { heading: "Hy3 Preview", id: "hy3-preview" },
  { heading: "MiMo V2.5 Pro", id: "mimo-v2-5-pro" },
  { heading: "MiniMax M3", id: "minimax-m3" },
  { heading: "Kimi K2.6", id: "kimi-k2-6" },
] as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

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

  assert.deepEqual(
    paths,
    [
      "/consulting.md",
      "/index.md",
      "/llms-full.txt",
      "/phonetic-benchmark/index.md",
      "/phonetic-benchmark/methodology/index.md",
      "/phonetic-benchmark/results.csv",
      "/phonetic-benchmark/results.json",
      ...phoneticBenchmarkRuns.map(
        (run) => `/phonetic-benchmark/runs/${run.id}/index.md`,
      ),
      "/pl/index.md",
      "/pl/consulting.md",
      "/pl/phonetic-benchmark/index.md",
      "/projects/400m.md",
      "/projects/client-audit-platform.md",
      "/projects/phonetic-alphabet-trainer.md",
      "/projects/surfaced.md",
      "/sitemap.xml",
    ].sort(),
  );
});

test("English homepage markdown keeps its key structure and references", () => {
  const content = getArtifactContent("/index.md");

  assert.match(content, /^# Piotr Kacała — Product Builder$/m);
  assert.match(
    content,
    /^> Personal website of Piotr Kacała\. AI agents are the build interface\. The differentiator is judgment across product, design, QA, and development\.$/m,
  );
  assert.match(content, /^## Product Builder$/m);
  assert.match(content, /^## Projects$/m);
  assert.match(content, /^### 1\. Phonetic Alphabet Trainer$/m);
  assert.match(content, /^### 2\. Surfaced$/m);
  assert.match(
    content,
    /^- Firefox Add-ons: https:\/\/addons\.mozilla\.org\/firefox\/addon\/surfaced\/$/m,
  );
  assert.match(
    content,
    /^- Chrome Web Store: https:\/\/chromewebstore\.google\.com\/detail\/surfaced\/bpbidikjpaffmpcbincadomhbfnoaaem$/m,
  );
  assert.match(
    content,
    /^- Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- Gallery: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.match(content, /^### 5\. Phonetic Benchmark$/m);
  assert.match(content, /^Private client project — no public runtime link\.$/m);
  assert.match(
    content,
    /^- Methodology: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/methodology\/$/m,
  );
  assert.match(
    content,
    /^- Public benchmark package: https:\/\/github\.com\/piotrkacala\/phonetic-benchmark$/m,
  );
  assert.doesNotMatch(content, /experienced CEO|#### As of April 2026/);
  assert.match(content, /^- Tool: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(
    content,
    /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(content, /^## Contact$/m);
  assert.match(content, /^Get in touch: kontakt@piotrkacala\.pl$/m);
  assert.match(
    content,
    /^Looking for product consulting\? See how I work\.: https:\/\/piotrkacala\.pl\/consulting\/$/m,
  );
});

test("Polish homepage markdown keeps its key structure and references", () => {
  const content = getArtifactContent("/pl/index.md");

  assert.match(content, /^# Piotr Kacała — Product Builder$/m);
  assert.match(
    content,
    /^> Strona Piotra Kacały\. Agenty AI są interfejsem budowy\. Wyróżnikiem są ocena i decyzje na styku produktu, designu, QA i developmentu\.$/m,
  );
  assert.match(content, /^## Product Builder$/m);
  assert.match(content, /^## Projekty$/m);
  assert.match(content, /^### 2\. Surfaced$/m);
  assert.match(
    content,
    /^- Firefox Add-ons: https:\/\/addons\.mozilla\.org\/firefox\/addon\/surfaced\/$/m,
  );
  assert.match(
    content,
    /^- Chrome Web Store: https:\/\/chromewebstore\.google\.com\/detail\/surfaced\/bpbidikjpaffmpcbincadomhbfnoaaem$/m,
  );
  assert.match(
    content,
    /^- Raport: https:\/\/piotrkacala\.pl\/pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- Galeria: https:\/\/piotrkacala\.pl\/pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.match(content, /^### 4\. Ta strona$/m);
  assert.match(content, /^### 5\. Phonetic Benchmark$/m);
  assert.match(
    content,
    /^Prywatny projekt kliencki — bez publicznego linku do działającej aplikacji\.$/m,
  );
  assert.match(
    content,
    /^- Metodologia \(EN\): https:\/\/piotrkacala\.pl\/phonetic-benchmark\/methodology\/$/m,
  );
  assert.match(
    content,
    /^- Publiczny pakiet benchmarku: https:\/\/github\.com\/piotrkacala\/phonetic-benchmark$/m,
  );
  assert.doesNotMatch(content, /doświadczony CEO|#### Stan na kwiecień 2026/);
  assert.match(content, /^- Narzędzie: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(
    content,
    /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(content, /^## Kontakt$/m);
  assert.match(content, /^Napisz do mnie: kontakt@piotrkacala\.pl$/m);
  assert.match(
    content,
    /^Szukasz wsparcia produktowego\? Zobacz, jak pracuję\.: https:\/\/piotrkacala\.pl\/pl\/consulting\/$/m,
  );
});

test("consulting markdown publishes the localized offer from shared copy", () => {
  const english = getArtifactContent("/consulting.md");
  const polish = getArtifactContent("/pl/consulting.md");

  assert.match(english, /^# Consulting \| Piotr Kacała$/m);
  assert.match(english, /^## From rough product idea to shipped software\.$/m);
  assert.match(english, /^## Start with the scope$/m);
  assert.match(english, /^- practical product brief$/m);
  assert.match(english, /^## From scope to delivery$/m);
  assert.match(english, /^## AI is part of the method$/m);
  assert.match(english, /^## Good fit$/m);
  assert.match(english, /^## Not a fit$/m);
  assert.match(english, /^## Selected work$/m);
  assert.match(
    english,
    /^See selected work: https:\/\/piotrkacala\.pl\/#projects$/m,
  );
  assert.match(english, /^## Start a conversation$/m);
  assert.match(english, /^Email: kontakt@piotrkacala\.pl$/m);

  assert.match(polish, /^# Consulting \| Piotr Kacała$/m);
  assert.match(
    polish,
    /^## Od niejasnego pomysłu do działającego produktu\.$/m,
  );
  assert.match(polish, /^## Zacznijmy od zakresu$/m);
  assert.match(polish, /^- praktyczny brief produktowy$/m);
  assert.match(polish, /^## Od zakresu do wdrożenia$/m);
  assert.match(polish, /^## AI jest częścią metody$/m);
  assert.match(polish, /^## Dobre dopasowanie$/m);
  assert.match(polish, /^## Słabe dopasowanie$/m);
  assert.match(polish, /^## Wybrane projekty$/m);
  assert.match(
    polish,
    /^Zobacz wybrane projekty: https:\/\/piotrkacala\.pl\/pl\/#projects$/m,
  );
  assert.match(polish, /^## Porozmawiajmy$/m);
  assert.match(polish, /^Email: kontakt@piotrkacala\.pl$/m);
});

test("llms-full.txt carries the consolidated public references", () => {
  const content = getArtifactContent("/llms-full.txt");

  assert.match(content, /^# Piotr Kacała — Full Public Site Context$/m);
  assert.match(content, /^## English homepage$/m);
  assert.match(content, /^## Polish homepage$/m);
  assert.match(content, /^## English consulting$/m);
  assert.match(content, /^## Polish consulting$/m);
  assert.match(content, /^## Public references$/m);
  assert.match(content, /^## Canonical summary$/m);
  assert.match(
    content,
    /^AI agents are the build interface\. The differentiator is judgment across product, design, QA, and development\.$/m,
  );
  assert.match(content, /^- English homepage: https:\/\/piotrkacala\.pl\/$/m);
  assert.match(
    content,
    /^- Polish homepage: https:\/\/piotrkacala\.pl\/pl\/$/m,
  );
  assert.match(
    content,
    /^- Consulting: https:\/\/piotrkacala\.pl\/consulting\/$/m,
  );
  assert.match(
    content,
    /^- Polish consulting markdown: https:\/\/piotrkacala\.pl\/pl\/consulting\.md$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark markdown report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/index\.md$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark screenshot gallery: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark methodology: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/methodology\/$/m,
  );
  assert.match(content, /^### Run-details directory$/m);
  assert.match(content, /^- Contact: mailto:kontakt@piotrkacala\.pl$/m);
  assert.match(
    content,
    /^- Phonetic Benchmark — Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    content,
    /^- Phonetic Benchmark — Gallery: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/gallery\/$/m,
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
    /^- Phonetic Alphabet Trainer — Companion profile: https:\/\/piotrkacala\.pl\/projects\/phonetic-alphabet-trainer\.md$/m,
  );
  assert.match(
    content,
    /^- Surfaced — Companion profile: https:\/\/piotrkacala\.pl\/projects\/surfaced\.md$/m,
  );
  assert.match(
    content,
    /^- Private client audit platform — Companion profile: https:\/\/piotrkacala\.pl\/projects\/client-audit-platform\.md$/m,
  );
  assert.match(
    content,
    /^- Phonetic Alphabet Trainer — Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
  );
  assert.match(
    content,
    /^- Surfaced — Firefox Add-ons: https:\/\/addons\.mozilla\.org\/firefox\/addon\/surfaced\/$/m,
  );
  assert.match(
    content,
    /^- Surfaced — Chrome Web Store: https:\/\/chromewebstore\.google\.com\/detail\/surfaced\/bpbidikjpaffmpcbincadomhbfnoaaem$/m,
  );
});

test("English Phonetic Benchmark markdown publishes all runs without private workflow metrics", () => {
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
  assert.match(content, /^## What This Benchmark Is$/m);
  assert.match(content, /docs-first package/);
  assert.match(content, /^## How To Read The Results$/m);
  assert.match(content, /^- `comparable`:/m);
  assert.match(content, /^- `contract-failing`:/m);
  assert.match(content, /^- `unrunnable`:/m);
  assert.match(content, /^## Results$/m);
  assert.match(content, /grouped by benchmark version/);
  assert.match(content, /^### v2 Batch$/m);
  assert.match(content, /^### v1 Snapshot$/m);
  assert.ok(
    content.indexOf("### v2 Batch") < content.indexOf("### v1 Snapshot"),
  );
  phoneticBenchmarkRuns.forEach((run) => {
    assert.match(
      content,
      new RegExp(`^#### ${escapeRegExp(run.heading)}$`, "m"),
    );
  });
  assert.ok(
    content.indexOf("#### Big Pickle") < content.indexOf("#### GPT 5.4 High"),
  );
  assert.match(content, /^- ID: gpt-5-4-high$/m);
  assert.match(content, /^- ID: big-pickle-v2$/m);
  assert.match(content, /^- ID: kimi-k2-6$/m);
  assert.match(content, /^- Benchmark version: v1$/m);
  assert.match(content, /^- Benchmark version: v2$/m);
  assert.match(content, /^- Status: contract-failing$/m);
  assert.match(content, /^- Failure types: attribution, test workflow$/m);
  assert.match(content, /^- Run date: 2026-06-01$/m);
  assert.match(content, /^- Source LoC: 2314$/m);
  assert.match(content, /^- Static automated tests: 43$/m);
  assert.match(content, /^- Stack: /m);
  assert.match(
    content,
    /^- Details: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/runs\/gpt-5-4-high\/$/m,
  );
  assert.match(content, /^## What The Runs Show$/m);
  assert.match(content, /^## Selected Case Notes$/m);
  assert.match(content, /^## Archived Demos$/m);
  assert.match(
    content,
    /Open screenshot gallery: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.doesNotMatch(content, /^- Prompts?:/m);
  assert.doesNotMatch(content, /^- Elapsed:/m);
  assert.doesNotMatch(content, /^- Git(?: use)?:/m);
  assert.doesNotMatch(content, /token usage/i);
  assert.ok(
    content.indexOf("## What The Runs Show") <
      content.indexOf("## Selected Case Notes"),
  );
  assert.ok(
    content.indexOf("## Selected Case Notes") <
      content.indexOf("## Archived Demos"),
  );
  phoneticBenchmarkRuns.forEach(({ id: runId }) => {
    assert.match(
      content,
      new RegExp(
        `^- Screenshot: https:\\/\\/piotrkacala\\.pl\\/phonetic-benchmark\\/screenshots\\/${runId}-quiz\\.png$`,
        "m",
      ),
    );
    assert.match(
      content,
      new RegExp(
        `^- Demo: https:\\/\\/piotrkacala\\.pl\\/phonetic-benchmark\\/demos\\/${runId}\\/index\\.html$`,
        "m",
      ),
    );
  });
});

test("Polish Phonetic Benchmark markdown carries localized narrative and all demo links", () => {
  const content = getArtifactContent("/pl/phonetic-benchmark/index.md");

  assert.match(content, /^# Phonetic Benchmark Report$/m);
  assert.match(content, /^## Czym Jest Ten Benchmark$/m);
  assert.match(content, /pakiet dokumentacji/);
  assert.match(content, /^## Jak Czytać Wyniki$/m);
  assert.match(content, /^- `comparable`:/m);
  assert.match(content, /^- `contract-failing`:/m);
  assert.match(content, /^- `unrunnable`:/m);
  assert.match(content, /^## Wyniki$/m);
  assert.match(content, /^### Batch v2$/m);
  assert.match(content, /^### Snapshot v1$/m);
  assert.ok(
    content.indexOf("### Batch v2") < content.indexOf("### Snapshot v1"),
  );
  phoneticBenchmarkRuns.forEach((run) => {
    assert.match(
      content,
      new RegExp(`^#### ${escapeRegExp(run.heading)}$`, "m"),
    );
  });
  assert.match(content, /^- ID: gpt-5-4-high$/m);
  assert.match(content, /^- ID: deepseek-v4-flash-v2$/m);
  assert.match(content, /^- ID: kimi-k2-6$/m);
  assert.match(content, /^- Status: unrunnable$/m);
  assert.match(content, /^- Typy problemów: atrybucja, workflow testów$/m);
  assert.match(content, /^- Data próby: 2026-05-29$/m);
  assert.match(content, /^- Statycznie policzone testy automatyczne: 40$/m);
  assert.match(content, /^## Co Pokazują Próby$/m);
  assert.match(content, /^## Wybrane Przypadki$/m);
  assert.match(content, /^## Archiwalne Demo$/m);
  assert.ok(
    content.indexOf("## Co Pokazują Próby") <
      content.indexOf("## Wybrane Przypadki"),
  );
  phoneticBenchmarkRuns.forEach(({ id: runId }) => {
    assert.match(
      content,
      new RegExp(
        `^- Screenshot: https:\\/\\/piotrkacala\\.pl\\/phonetic-benchmark\\/screenshots\\/${runId}-quiz\\.png$`,
        "m",
      ),
    );
    assert.match(
      content,
      new RegExp(
        `^- Demo: https:\\/\\/piotrkacala\\.pl\\/phonetic-benchmark\\/demos\\/${runId}\\/index\\.html$`,
        "m",
      ),
    );
  });
});

test("machine-readable demo links point at explicit static index files", () => {
  const artifacts = getMachineReadableArtifacts();
  const demoUrlPattern =
    /https:\/\/piotrkacala\.pl\/phonetic-benchmark\/demos\/[a-z0-9-]+\/[^\s)">,\]]*/gu;

  const demoUrls = artifacts.flatMap((artifact) =>
    [...artifact.content.matchAll(demoUrlPattern)].map((match) => ({
      pathname: artifact.pathname,
      url: match[0],
    })),
  );

  assert.ok(demoUrls.length > 0);

  demoUrls.forEach(({ pathname, url }) => {
    assert.match(
      url,
      /\/index\.html$/,
      `${pathname} contains a directory-style demo URL: ${url}`,
    );
  });
});

test("Sonnet archived demo loads benchmark data relative to its index file", () => {
  const demoRoot = "public/phonetic-benchmark/demos/sonnet-4-6-thinking";
  const html = readFileSync(`${demoRoot}/index.html`, "utf8");
  const scriptMatch = html.match(
    /<script type="module" crossorigin src="(\.\/assets\/[^"]+\.js)"><\/script>/u,
  );

  assert.ok(scriptMatch, "Expected the Sonnet demo module script");

  const bundle = readFileSync(`${demoRoot}/${scriptMatch[1]}`, "utf8");

  assert.match(bundle, /fetch\("\.\/data\/alphabets\.json"\)/u);
  assert.match(bundle, /fetch\("\.\/data\/multiple-choice-options\.json"\)/u);
  assert.doesNotMatch(bundle, /fetch\("\/data\//u);
});

test("benchmark structured data covers versioned runs and selected screenshot cases", () => {
  const report = phoneticBenchmarkReports.en;
  const statusCounts = new Map<string, number>();
  const versionCounts = new Map<string, number>();

  assert.equal(report.runs.length, 19);

  report.runs.forEach((run) => {
    statusCounts.set(run.status, (statusCounts.get(run.status) ?? 0) + 1);
    versionCounts.set(
      run.benchmarkVersion,
      (versionCounts.get(run.benchmarkVersion) ?? 0) + 1,
    );
    assert.match(run.runDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(run.stack.length > 0);
    assert.ok(existsSync(`public${run.screenshotPath}`), run.screenshotPath);
    assert.ok(
      existsSync(`public${new URL(run.demoUrl).pathname}`),
      new URL(run.demoUrl).pathname,
    );
  });

  assert.deepEqual(Object.fromEntries(statusCounts), {
    comparable: 8,
    "contract-failing": 10,
    unrunnable: 1,
  });
  assert.deepEqual(Object.fromEntries(versionCounts), {
    v1: 15,
    v2: 4,
  });
  assert.deepEqual(
    report.caseNotes.flatMap((caseNote) => caseNote.runIds).sort(),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "deepseek-v4-pro",
      "gemini-3-1-pro-high",
      "gpt-5-4-high",
      "gpt-5-5-high",
      "gpt-oss-120b",
      "mimo-v2-5-v2",
      "nemotron-3-super",
      "nemotron-3-super-v2",
      "sonnet-4-6-thinking",
    ],
  );
});

test("benchmark publication metadata derives coverage and avoids inferred inference settings", () => {
  const results = getPhoneticBenchmarkResultsData();

  assert.equal(phoneticBenchmarkMetadata.publishedDate, "2026-05-26");
  assert.equal(phoneticBenchmarkMetadata.updatedDate, "2026-06-08");
  assert.equal(phoneticBenchmarkMetadata.coveredThroughDate, "2026-06-03");
  assert.deepEqual(phoneticBenchmarkMetadata.coveredBenchmarkVersions, [
    "v1",
    "v2",
  ]);
  assert.equal(phoneticBenchmarkMetadata.currentBenchmarkVersion, "v2");
  assert.equal(results.runs.length, 19);
  assert.equal(results.benchmark.coveredThroughDate, "2026-06-03");
  assert.deepEqual(results.benchmark.coveredBenchmarkVersions, ["v1", "v2"]);
  assert.equal(results.benchmark.currentBenchmarkVersion, "v2");

  const serialized = JSON.stringify(results);

  assert.doesNotMatch(
    serialized,
    /"(?:provider|gateway|canonicalModelId|modelVariant|effort)"\s*:/i,
  );
  assert.match(
    serialized,
    /Missing inference-effort metadata must not be interpreted as a known provider default/,
  );
});

test("benchmark JSON and CSV exports publish one neutral record per run", () => {
  const jsonContent = getArtifactContent("/phonetic-benchmark/results.json");
  const csvContent = getArtifactContent("/phonetic-benchmark/results.csv");
  const results = JSON.parse(jsonContent) as {
    schemaVersion: string;
    benchmark: {
      methodologyUrl: string;
      coveredBenchmarkVersions: string[];
      currentBenchmarkVersion: string;
    };
    runs: Array<{
      id: string;
      benchmarkVersion: string;
      comparativeScore?: number;
      detailsUrl: string;
      markdownUrl: string;
      observations: {
        observedStrengths: string[];
        observedWeaknesses: string[];
      };
      interpretationLimitations: string[];
    }>;
  };

  assert.equal(results.schemaVersion, "1");
  assert.equal(
    results.benchmark.methodologyUrl,
    "https://piotrkacala.pl/phonetic-benchmark/methodology/",
  );
  assert.deepEqual(results.benchmark.coveredBenchmarkVersions, ["v1", "v2"]);
  assert.equal(results.benchmark.currentBenchmarkVersion, "v2");
  assert.equal(results.runs.length, 19);
  assert.deepEqual(
    results.runs.slice(0, 4).map((run) => run.id),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "mimo-v2-5-v2",
      "nemotron-3-super-v2",
    ],
  );
  results.runs.forEach((run) => {
    assert.equal(
      run.detailsUrl,
      `https://piotrkacala.pl/phonetic-benchmark/runs/${run.id}/`,
    );
    assert.equal(
      run.markdownUrl,
      `https://piotrkacala.pl/phonetic-benchmark/runs/${run.id}/index.md`,
    );
    assert.ok(run.observations.observedStrengths.length > 0);
    assert.ok(run.observations.observedWeaknesses.length > 0);
    assert.ok(run.interpretationLimitations.length > 0);
  });
  assert.equal(
    results.runs.find((run) => run.id === "deepseek-v4-flash-v2")
      ?.comparativeScore,
    67,
  );
  assert.equal(
    results.runs.find((run) => run.id === "mimo-v2-5-v2")?.comparativeScore,
    80,
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-4-high")?.comparativeScore,
    undefined,
  );

  const csvLines = csvContent.trimEnd().split("\n");

  assert.equal(csvLines.length, 20);
  assert.deepEqual(
    csvLines.slice(1, 5).map((line) => line.split(",")[0]),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "mimo-v2-5-v2",
      "nemotron-3-super-v2",
    ],
  );
  assert.match(
    csvLines[0],
    /^run_id,execution_order,model,run_date,benchmark_version,status,failure_types,source_loc,static_automated_tests,comparative_score,stack,functional_read,details_url,markdown_url,demo_url,screenshot_url$/,
  );
  assert.match(
    csvContent,
    /gpt-5-4-high,1,GPT 5\.4 High,2026-05-25,v1,comparable,/,
  );
  assert.match(
    csvContent,
    /deepseek-v4-flash-v2,2,DeepSeek V4 Flash,2026-06-03,v2,comparable,,834,0,67,/,
  );
  assert.doesNotMatch(
    csvLines[0],
    /provider|gateway|canonical_model_id|model_variant|effort/i,
  );
});

test("benchmark JSON-LD connects reports, methodology, and runs to factual public evidence", () => {
  const reportSchemas = getPhoneticBenchmarkReportSchemas(
    phoneticBenchmarkReports.en,
  );
  const dataset = reportSchemas.find((schema) => schema["@type"] === "Dataset");
  const report = reportSchemas.find((schema) => schema["@type"] === "Article");
  const methodology = getPhoneticBenchmarkMethodologySchemas().find(
    (schema) => schema["@type"] === "TechArticle",
  );
  const run = benchmarkRunData[0];
  const runSchema = getPhoneticBenchmarkRunSchemas(run)[0];
  const reportMainEntity = report?.mainEntity as Record<string, unknown>;
  const methodologyMainEntity = methodology?.mainEntity as Record<
    string,
    unknown
  >;
  const methodologyIsPartOf = methodology?.isPartOf as Record<string, unknown>;
  const runAbout = runSchema.about as Record<string, unknown>;
  const runAssociatedMedia = runSchema.associatedMedia as Record<
    string,
    unknown
  >;

  assert.ok(dataset);
  assert.equal(reportMainEntity["@id"], dataset["@id"]);
  assert.equal(methodologyMainEntity["@id"], dataset["@id"]);
  assert.equal(
    methodologyIsPartOf.url,
    "https://piotrkacala.pl/phonetic-benchmark/",
  );
  assert.equal(runSchema.url, run.detailsUrl);
  assert.equal(runAbout.identifier, run.id);
  assert.equal(runAssociatedMedia.contentUrl, run.screenshotUrl);
});

test("methodology and every run record have generated markdown discovery surfaces", () => {
  const methodology = getArtifactContent(
    "/phonetic-benchmark/methodology/index.md",
  );

  assert.match(methodology, /^# Phonetic Benchmark Methodology$/m);
  assert.match(
    methodology,
    /^Public benchmark package: https:\/\/github\.com\/piotrkacala\/phonetic-benchmark$/m,
  );
  assert.match(methodology, /^## Interpretation Limits$/m);
  assert.match(methodology, /^## Source LoC Counting Rule$/m);
  assert.match(methodology, /^## Static Automated Test Counting Rule$/m);
  assert.match(methodology, /^## Contract v2$/m);
  assert.match(methodology, /Archived demos are preserved static snapshots/);
  assert.match(methodology, /keyboard-mode trimming, case insensitivity/);
  assert.match(
    methodology,
    /Missing inference-effort metadata must not be interpreted as a known provider default/,
  );

  benchmarkRunData.forEach((run) => {
    const content = getArtifactContent(
      `/phonetic-benchmark/runs/${run.id}/index.md`,
    );

    assert.match(
      content,
      new RegExp(
        `^# ${escapeRegExp(run.model)} — Phonetic Benchmark ${run.benchmarkVersion} run details$`,
        "m",
      ),
    );
    assert.match(content, /^## Run Record$/m);
    assert.match(content, /^## Observed Strengths$/m);
    assert.match(content, /^## Observed Weaknesses$/m);
    assert.match(content, /^## Evidence$/m);
    assert.match(content, /^## Interpretation Limits$/m);
    assert.match(content, /not a general model review or universal ranking/);
  });
});

test("benchmark galleries expose versioned screenshots and explicit demo links", () => {
  for (const gallery of Object.values(phoneticBenchmarkGalleries)) {
    assert.equal(gallery.runs.length, 19);
    assert.deepEqual(
      gallery.resultGroups.map((group) => group.benchmarkVersion),
      ["v2", "v1"],
    );
    assert.deepEqual(
      gallery.runs
        .filter((run) => run.benchmarkVersion === "v1")
        .map((run) => run.executionOrder),
      Array.from({ length: 15 }, (_, index) => index + 1),
    );
    assert.deepEqual(
      gallery.runs
        .filter((run) => run.benchmarkVersion === "v2")
        .map((run) => run.executionOrder),
      Array.from({ length: 4 }, (_, index) => index + 1),
    );

    gallery.runs.forEach((run) => {
      assert.equal(
        run.screenshotPath,
        `/phonetic-benchmark/screenshots/${run.id}-quiz.png`,
      );
      assert.equal(
        run.demoUrl,
        `https://piotrkacala.pl/phonetic-benchmark/demos/${run.id}/index.html`,
      );
    });
  }
});

test("static discovery files include consulting, report, and gallery paths", () => {
  const llms = readFileSync("public/llms.txt", "utf8");
  const sitemap = getArtifactContent("/sitemap.xml");

  assert.match(
    llms,
    /^- Consulting: https:\/\/piotrkacala\.pl\/consulting\/$/m,
  );
  assert.match(
    llms,
    /^- Polish consulting markdown: https:\/\/piotrkacala\.pl\/pl\/consulting\.md$/m,
  );
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
    /^- Phonetic Benchmark screenshot gallery: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.match(
    llms,
    /^- Polish Phonetic Benchmark screenshot gallery: https:\/\/piotrkacala\.pl\/pl\/phonetic-benchmark\/gallery\/$/m,
  );
  assert.match(
    llms,
    /^- Phonetic Benchmark methodology: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/methodology\/$/m,
  );
  assert.match(
    llms,
    /^- Phonetic Benchmark results JSON: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/results\.json$/m,
  );
  assert.match(
    llms,
    /^- Phonetic Benchmark run details pattern: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/runs\/\{run-id\}\/$/m,
  );
  assert.match(
    llms,
    /^- Phonetic Benchmark Report: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/$/m,
  );
  assert.match(
    llms,
    /^- Surfaced for Firefox: https:\/\/addons\.mozilla\.org\/firefox\/addon\/surfaced\/$/m,
  );
  assert.match(
    llms,
    /^- Surfaced for Chrome: https:\/\/chromewebstore\.google\.com\/detail\/surfaced\/bpbidikjpaffmpcbincadomhbfnoaaem$/m,
  );
  for (const pathname of [
    "/projects/400m.md",
    "/projects/phonetic-alphabet-trainer.md",
    "/projects/surfaced.md",
    "/projects/client-audit-platform.md",
  ]) {
    assert.match(
      llms,
      new RegExp(
        `^- .+ companion profile: https:\\/\\/piotrkacala\\.pl${pathname.replaceAll("/", "\\/")}$`,
        "m",
      ),
    );
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://piotrkacala\\.pl${pathname.replaceAll("/", "\\/")}</loc>`,
      ),
    );
  }

  for (const pathname of [
    "/consulting/",
    "/pl/consulting/",
    "/consulting.md",
    "/pl/consulting.md",
    "/phonetic-benchmark/",
    "/pl/phonetic-benchmark/",
    "/phonetic-benchmark/gallery/",
    "/pl/phonetic-benchmark/gallery/",
    "/phonetic-benchmark/index.md",
    "/pl/phonetic-benchmark/index.md",
    "/phonetic-benchmark/methodology/",
    "/phonetic-benchmark/methodology/index.md",
    "/phonetic-benchmark/results.json",
    "/phonetic-benchmark/results.csv",
  ]) {
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://piotrkacala\\.pl${pathname.replaceAll("/", "\\/")}</loc>`,
      ),
    );
  }

  phoneticBenchmarkRuns.forEach(({ id }) => {
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://piotrkacala\\.pl/phonetic-benchmark/runs/${id}/</loc>`,
      ),
    );
    assert.match(
      sitemap,
      new RegExp(
        `<loc>https://piotrkacala\\.pl/phonetic-benchmark/runs/${id}/index\\.md</loc>`,
      ),
    );
  });
});

test("consulting routes expose localized alternates and the shared page component", () => {
  const englishRoute = readFileSync("src/pages/consulting/index.astro", "utf8");
  const polishRoute = readFileSync(
    "src/pages/pl/consulting/index.astro",
    "utf8",
  );
  const projects = readFileSync("src/components/Projects.astro", "utf8");

  assert.match(englishRoute, /<ConsultingPage copy=\{copy\} \/>/);
  assert.match(polishRoute, /<ConsultingPage copy=\{copy\} \/>/);
  assert.match(
    englishRoute,
    /markdownUrl=\{getConsultingMarkdownUrl\(copy\.lang\)\}/,
  );
  assert.match(
    polishRoute,
    /markdownUrl=\{getConsultingMarkdownUrl\(copy\.lang\)\}/,
  );
  assert.match(englishRoute, /alternateHref: "\/pl\/consulting\/"/);
  assert.match(polishRoute, /alternateHref: "\/consulting\/"/);
  assert.match(projects, /<section id="projects"/);
});

test("gallery pages use the shared gallery data without claiming a duplicate markdown export", () => {
  const englishRoute = readFileSync(
    "src/pages/phonetic-benchmark/gallery/index.astro",
    "utf8",
  );
  const polishRoute = readFileSync(
    "src/pages/pl/phonetic-benchmark/gallery/index.astro",
    "utf8",
  );

  for (const route of [englishRoute, polishRoute]) {
    assert.match(route, /phoneticBenchmarkGalleries/);
    assert.match(route, /markdownUrl=\{false\}/);
    assert.match(
      route,
      /homeLink=\{\{ href: gallery\.homeHref, ariaLabel: gallery\.homeLabel \}\}/,
    );
    assert.match(route, /contentWidth="wide"/);
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

test("benchmark report component keeps compact rows and selected screenshot case notes", () => {
  const component = readFileSync(
    "src/components/PhoneticBenchmarkReport.astro",
    "utf8",
  );

  assert.match(
    component,
    /firstRun\.executionOrder - secondRun\.executionOrder/,
  );
  assert.match(
    component,
    /<th scope="row" data-label=\{report\.tableLabels\.model\}>/,
  );
  assert.match(component, /data-run-date=\{run\.runDate\}/);
  assert.match(component, /data-stack=\{run\.stack\}/);
  assert.match(component, /report\.tableLabels\.failureTypes/);
  assert.match(component, /report\.tableLabels\.testCount/);
  assert.match(component, /report\.tableLabels\.functionalRead/);
  assert.match(
    component,
    /<a href=\{run\.detailsUrl\}>\{report\.detailsLabel\}<\/a>/,
  );
  assert.match(component, /report\.caseNotes\.map/);
  assert.match(component, /caseNote\.runIds\.map/);
  assert.match(component, /src=\{run\.screenshotPath\}/);
  assert.doesNotMatch(component, /promptCount|elapsed|gitUse|notesDiscipline/);
  assert.match(component, /const artifactHeadingId = "benchmark-artifacts";/);
  assert.match(component, /aria-labelledby=\{artifactHeadingId\}/);
  assert.match(component, /<h2 id=\{artifactHeadingId\}>/);
  assert.match(component, /<a href=\{run\.demoUrl\}>\{run\.model\}<\/a>/);
  assert.match(
    component,
    /<a href=\{report\.galleryHref\}>\{report\.galleryLabel\}<\/a>/,
  );
  assert.ok(
    component.indexOf("aria-labelledby={benchmarkHeadingId}") <
      component.indexOf("aria-labelledby={readingHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={readingHeadingId}") <
      component.indexOf("aria-labelledby={resultsHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={resultsHeadingId}") <
      component.indexOf("aria-labelledby={findingsHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={findingsHeadingId}") <
      component.indexOf("aria-labelledby={caseNotesHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={caseNotesHeadingId}") <
      component.indexOf("aria-labelledby={artifactHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={artifactHeadingId}") <
      component.indexOf("aria-labelledby={closingHeadingId}"),
  );
});

test("benchmark gallery component renders ordered screenshots and demos without image interaction", () => {
  const component = readFileSync(
    "src/components/PhoneticBenchmarkGallery.astro",
    "utf8",
  );

  assert.match(
    component,
    /getBenchmarkRunGroupRuns\(gallery\.runs, group\.benchmarkVersion\)/,
  );
  assert.match(component, /runGroups\.map/);
  assert.match(component, /group\.runs\.map/);
  assert.match(component, /run\.benchmarkVersion/);
  assert.match(component, /data-run-id=\{run\.id\}/);
  assert.match(component, /src=\{run\.screenshotPath\}/);
  assert.match(
    component,
    /<a href=\{run\.demoUrl\}>\{gallery\.demoLabel\}<\/a>/,
  );
  assert.match(component, /run\.sourceLoc\.toLocaleString\(gallery\.lang\)/);
  assert.match(component, /\{run\.testCount\}/);
  assert.doesNotMatch(component, /href=\{run\.screenshotPath\}/);
  assert.doesNotMatch(component, /<script/);
  assert.ok(
    component.indexOf("<figcaption>") <
      component.indexOf("src={run.screenshotPath}"),
  );
});

test("400m companion profile is generated with high-signal operating details", () => {
  const content = getArtifactContent("/projects/400m.md");

  assert.match(content, /^# 400m$/m);
  assert.match(
    content,
    /^> Companion machine-readable profile for 400m, linked from https:\/\/piotrkacala\.pl\/\.$/m,
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

test("project companion profiles publish public-safe discovery records", () => {
  const phonetic = getArtifactContent("/projects/phonetic-alphabet-trainer.md");
  const surfaced = getArtifactContent("/projects/surfaced.md");
  const clientAuditPlatform = getArtifactContent(
    "/projects/client-audit-platform.md",
  );

  assert.match(phonetic, /^# Phonetic Alphabet Trainer$/m);
  assert.match(
    phonetic,
    /^- Live app: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
  );
  assert.match(
    phonetic,
    /^- Later became the product brief for Phonetic Benchmark\.$/m,
  );

  assert.match(surfaced, /^# Surfaced$/m);
  assert.match(
    surfaced,
    /^- Firefox Add-ons: https:\/\/addons\.mozilla\.org\/firefox\/addon\/surfaced\/$/m,
  );
  assert.match(surfaced, /^- Passed Mozilla's public add-on review\.$/m);

  assert.match(clientAuditPlatform, /^# Private client audit platform$/m);
  assert.match(clientAuditPlatform, /^- Runtime: No public runtime link\.$/m);
  assert.match(
    clientAuditPlatform,
    /^- This profile is a dated private-project record, not a public runtime claim\.$/m,
  );
  assert.match(
    clientAuditPlatform,
    /^- Private customer data and implementation details are intentionally excluded\.$/m,
  );
  assert.doesNotMatch(clientAuditPlatform, /API routes|database models/i);
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
