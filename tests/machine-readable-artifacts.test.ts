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
  { heading: "MiMo V2.5 Free", id: "mimo-v2-5-free-v2" },
  { heading: "Gemma 4 26B", id: "gemma-4-26b-v2" },
  { heading: "Laguna M.1 Free", id: "laguna-m-1-v2" },
  { heading: "North Mini Code Free", id: "north-mini-code-free-v2" },
  { heading: "Owl Alpha", id: "owl-alpha-v2" },
  { heading: "Claude Opus 4.6 Thinking", id: "opus-4-6-thinking-v2" },
  { heading: "Gemini 3.5 Flash High", id: "gemini-3-5-flash-high-v2" },
  { heading: "Claude Sonnet 4.6 Thinking", id: "sonnet-4-6-thinking-v2" },
  { heading: "Gemini 3.1 Pro High", id: "gemini-3-1-pro-high-v2" },
  { heading: "GPT 5.4 High", id: "gpt-5-4-high-v2" },
  { heading: "GPT 5.5 High", id: "gpt-5-5-high-v2" },
  { heading: "gpt-oss-120b", id: "gpt-oss-120b-v2" },
  { heading: "DeepSeek V4 Pro", id: "deepseek-v4-pro-v2" },
  { heading: "GLM-5.2", id: "glm-5-2-v2" },
  { heading: "Kimi K2.7", id: "kimi-k2-7-v2" },
  { heading: "MiMo V2.5 Pro", id: "mimo-v2-5-pro-v2" },
  { heading: "MiniMax M3", id: "minimax-m3-v2" },
  { heading: "Qwen3.7 Max", id: "qwen-3-7-max-v2" },
  { heading: "Nemotron 3 Ultra", id: "nemotron-3-ultra-v2" },
  { heading: "Hy3 Preview", id: "hy3-preview-v2" },
  { heading: "Hy3 Free", id: "hy3-free-v2" },
  { heading: "GPT 5.6 Sol", id: "gpt-5-6-sol-v2" },
  { heading: "GPT 5.6 Terra", id: "gpt-5-6-terra-v2" },
  { heading: "GPT 5.6 Luna", id: "gpt-5-6-luna-v2" },
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
    phoneticBenchmarkRuns.map((run) => run.id).sort(),
    benchmarkRunData.map((run) => run.id).sort(),
  );
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

  assert.match(content, /^# Piotr Kacała$/m);
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

  assert.match(content, /^# Piotr Kacała$/m);
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
  assert.match(content, /^#### Current Batch$/m);
  assert.match(content, /^#### v1 Snapshot$/m);
  assert.match(
    content,
    /^- DeepSeek V4 Flash \(v2\): https:\/\/piotrkacala\.pl\/phonetic-benchmark\/runs\/deepseek-v4-flash-v2\/$/m,
  );
  assert.match(
    content,
    /^- GPT 5\.4 High \(v1\): https:\/\/piotrkacala\.pl\/phonetic-benchmark\/runs\/gpt-5-4-high\/$/m,
  );
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
  assert.match(content, /^### Current Batch$/m);
  assert.match(content, /^### v1 Snapshot$/m);
  assert.ok(
    content.indexOf("### Current Batch") < content.indexOf("### v1 Snapshot"),
  );
  phoneticBenchmarkRuns.forEach((run) => {
    assert.match(
      content,
      new RegExp(`^#### ${escapeRegExp(run.heading)}$`, "m"),
    );
  });
  assert.ok(
    content.indexOf("#### Owl Alpha") < content.indexOf("#### Big Pickle"),
  );
  assert.ok(
    content.indexOf("#### GPT 5.4 High") < content.indexOf("#### Big Pickle"),
  );
  assert.match(content, /^- ID: gpt-5-4-high$/m);
  assert.match(content, /^- ID: big-pickle-v2$/m);
  assert.match(content, /^- ID: kimi-k2-6$/m);
  assert.match(content, /^- Benchmark version: v1$/m);
  assert.match(content, /^- Benchmark version: v2$/m);
  assert.match(content, /^- Status: Contract-failing$/m);
  assert.match(content, /^- Failure types: attribution, test workflow$/m);
  assert.match(content, /^- Run date: 2026-06-01$/m);
  assert.match(content, /^- Source LoC: 2314$/m);
  assert.match(content, /^- Automated test evidence: 43$/m);
  assert.match(content, /^- Stack: /m);
  assert.match(
    content,
    /^- Details: https:\/\/piotrkacala\.pl\/phonetic-benchmark\/runs\/gpt-5-4-high\/$/m,
  );
  assert.match(content, /^## Why this benchmark exists$/m);
  assert.match(content, /^## Current Read Of The Batch$/m);
  assert.match(content, /^### Models That Clear The Contract$/m);
  assert.match(content, /^### Strongest Current References$/m);
  assert.match(content, /^### Positive Surprises$/m);
  assert.match(content, /^### Gemini 3\.1 Pro vs Gemini 3\.5 Flash$/m);
  assert.match(content, /^### Qwen's 2025 Date Is A Small Evidence Failure$/m);
  assert.match(
    content,
    /^### Polish Footer Declension Is A Useful Localization Detail$/m,
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
    content.indexOf("## Why this benchmark exists") <
      content.indexOf("## What This Benchmark Is"),
  );
  assert.ok(
    content.indexOf("## What This Benchmark Is") <
      content.indexOf("## How To Read The Results"),
  );
  assert.ok(
    content.indexOf("## How To Read The Results") <
      content.indexOf("## Current Read Of The Batch"),
  );
  assert.ok(
    content.indexOf("## Current Read Of The Batch") <
      content.indexOf("## Results"),
  );
  assert.ok(
    content.indexOf("## Results") < content.indexOf("## Selected Case Notes"),
  );
  assert.ok(
    content.indexOf("## Selected Case Notes") <
      content.indexOf("## What The Runs Show"),
  );
  assert.ok(
    content.indexOf("## What The Runs Show") <
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
  assert.match(content, /^## Aktualny Odczyt Batcha$/m);
  assert.match(content, /^### Modele Spełniające Kontrakt$/m);
  assert.match(content, /^### Najmocniejsze Aktualne Referencje$/m);
  assert.match(content, /^### Pozytywne Niespodzianki$/m);
  assert.match(content, /^### Gemini 3\.1 Pro vs Gemini 3\.5 Flash$/m);
  assert.match(content, /^### Data 2025 W Qwenie To Mały Błąd Evidence$/m);
  assert.match(
    content,
    /^### Odmiana Nazwiska W Stopce To Dobry Sygnał Lokalizacji$/m,
  );
  assert.match(content, /^## Wyniki$/m);
  assert.match(content, /^### Aktualna seria$/m);
  assert.match(content, /^### Snapshot v1$/m);
  assert.ok(
    content.indexOf("### Aktualna seria") < content.indexOf("### Snapshot v1"),
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
  assert.match(content, /^- Wersja benchmarku: v2$/m);
  assert.match(content, /^- Status: Niedziałająca$/m);
  assert.match(content, /^- Typy problemów: atrybucja, workflow testów$/m);
  assert.match(content, /^- Data próby: 2026-05-29$/m);
  assert.match(content, /^- Dowody testów automatycznych: 40$/m);
  assert.match(content, /^## Dlaczego ten benchmark powstał\?$/m);
  assert.match(content, /^## Co Pokazują Próby$/m);
  assert.match(content, /^## Wybrane Przypadki$/m);
  assert.match(content, /^## Archiwalne Demo$/m);
  assert.ok(
    content.indexOf("## Dlaczego ten benchmark powstał?") <
      content.indexOf("## Czym Jest Ten Benchmark"),
  );
  assert.ok(
    content.indexOf("## Czym Jest Ten Benchmark") <
      content.indexOf("## Jak Czytać Wyniki"),
  );
  assert.ok(
    content.indexOf("## Jak Czytać Wyniki") <
      content.indexOf("## Aktualny Odczyt Batcha"),
  );
  assert.ok(
    content.indexOf("## Aktualny Odczyt Batcha") < content.indexOf("## Wyniki"),
  );
  assert.ok(
    content.indexOf("## Wyniki") < content.indexOf("## Wybrane Przypadki"),
  );
  assert.ok(
    content.indexOf("## Wybrane Przypadki") <
      content.indexOf("## Co Pokazują Próby"),
  );
  assert.ok(
    content.indexOf("## Co Pokazują Próby") <
      content.indexOf("## Archiwalne Demo"),
  );
  phoneticBenchmarkRuns.forEach(({ id: runId }) => {
    assert.match(
      content,
      new RegExp(
        `^- Zrzut ekranu: https:\\/\\/piotrkacala\\.pl\\/phonetic-benchmark\\/screenshots\\/${runId}-quiz\\.png$`,
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

  assert.equal(report.runs.length, 41);

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
    comparable: 14,
    "contract-failing": 26,
    unrunnable: 1,
  });
  assert.deepEqual(Object.fromEntries(versionCounts), {
    v1: 15,
    v2: 26,
  });
  assert.deepEqual(
    report.spotlights.map((spotlight) => spotlight.id),
    [
      "contract-clearing-models",
      "strongest-current-references",
      "positive-surprises",
      "gemini-31-vs-35",
      "qwen-date-evidence",
      "polish-footer-declension",
    ],
  );
  report.spotlights.forEach((spotlight) => {
    spotlight.runIds.forEach((runId) => {
      assert.ok(
        report.runs.some((run) => run.id === runId),
        `${spotlight.id} references ${runId}`,
      );
    });
  });
  assert.deepEqual(
    report.caseNotes.flatMap((caseNote) => caseNote.runIds).sort(),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "deepseek-v4-pro",
      "deepseek-v4-pro-v2",
      "deepseek-v4-pro-v2",
      "deepseek-v4-pro-v2",
      "gemini-3-1-pro-high",
      "gemini-3-1-pro-high-v2",
      "gemini-3-1-pro-high-v2",
      "gemini-3-5-flash-high-v2",
      "gemini-3-5-flash-high-v2",
      "gemma-4-26b-v2",
      "glm-5-2-v2",
      "glm-5-2-v2",
      "gpt-5-4-high",
      "gpt-5-4-high-v2",
      "gpt-5-4-high-v2",
      "gpt-5-5-high",
      "gpt-5-5-high-v2",
      "gpt-5-5-high-v2",
      "gpt-oss-120b",
      "gpt-oss-120b-v2",
      "gpt-oss-120b-v2",
      "kimi-k2-7-v2",
      "kimi-k2-7-v2",
      "laguna-m-1-v2",
      "mimo-v2-5-free-v2",
      "mimo-v2-5-pro-v2",
      "minimax-m3-v2",
      "nemotron-3-super",
      "north-mini-code-free-v2",
      "opus-4-6-thinking-v2",
      "owl-alpha-v2",
      "owl-alpha-v2",
      "qwen-3-7-max-v2",
      "sonnet-4-6-thinking",
      "sonnet-4-6-thinking-v2",
      "sonnet-4-6-thinking-v2",
    ],
  );
});

test("benchmark publication metadata derives coverage and avoids inferred inference settings", () => {
  const results = getPhoneticBenchmarkResultsData();

  assert.equal(phoneticBenchmarkMetadata.publishedDate, "2026-05-26");
  assert.equal(phoneticBenchmarkMetadata.updatedDate, "2026-07-12");
  assert.equal(phoneticBenchmarkMetadata.coveredThroughDate, "2026-07-12");
  assert.deepEqual(phoneticBenchmarkMetadata.coveredBenchmarkVersions, [
    "v1",
    "v2",
  ]);
  assert.equal(phoneticBenchmarkMetadata.currentBenchmarkVersion, "v2");
  assert.equal(results.runs.length, 41);
  assert.equal(results.benchmark.coveredThroughDate, "2026-07-12");
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
      testEvidence?: string;
      detailsUrl: string;
      markdownUrl: string;
      observations?: {
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
  assert.equal(results.runs.length, 41);
  assert.deepEqual(
    results.runs.slice(0, 26).map((run) => run.id),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "mimo-v2-5-free-v2",
      "gemma-4-26b-v2",
      "laguna-m-1-v2",
      "north-mini-code-free-v2",
      "owl-alpha-v2",
      "opus-4-6-thinking-v2",
      "gemini-3-5-flash-high-v2",
      "sonnet-4-6-thinking-v2",
      "gemini-3-1-pro-high-v2",
      "gpt-5-4-high-v2",
      "gpt-5-5-high-v2",
      "gpt-oss-120b-v2",
      "deepseek-v4-pro-v2",
      "glm-5-2-v2",
      "kimi-k2-7-v2",
      "mimo-v2-5-pro-v2",
      "minimax-m3-v2",
      "qwen-3-7-max-v2",
      "nemotron-3-ultra-v2",
      "hy3-preview-v2",
      "hy3-free-v2",
      "gpt-5-6-sol-v2",
      "gpt-5-6-terra-v2",
      "gpt-5-6-luna-v2",
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
    if (run.observations) {
      assert.ok(run.observations.observedStrengths.length > 0);
      assert.ok(run.observations.observedWeaknesses.length > 0);
    }
    assert.ok(run.interpretationLimitations.length > 0);
  });
  assert.equal(
    results.runs.find((run) => run.id === "deepseek-v4-flash-v2")
      ?.comparativeScore,
    undefined,
  );
  assert.equal(
    results.runs.find((run) => run.id === "deepseek-v4-flash-v2")?.testEvidence,
    "20 framework-style static cases; controlled runner reported 20 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "mimo-v2-5-free-v2")?.testEvidence,
    "35 framework-style static cases; controlled runner reported 35 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gemma-4-26b-v2")?.testEvidence,
    "0 framework-style static cases; controlled runner blocked by dependency-policy failures; npm test exits with no test files found",
  );
  assert.equal(
    results.runs.find((run) => run.id === "laguna-m-1-v2")?.testEvidence,
    "0 framework-style static cases; custom runner reported 9 passed, 0 failed; controlled runner reported 9 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "north-mini-code-free-v2")
      ?.testEvidence,
    "0 framework-style static cases; package test command reported 7 verification sections passed, 0 failed; unreferenced Jest-style tests are not run by npm test",
  );
  assert.equal(
    results.runs.find((run) => run.id === "owl-alpha-v2")?.testEvidence,
    "33 framework-style static cases; controlled runner reported 33 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "opus-4-6-thinking-v2")?.testEvidence,
    "45 framework-style static cases; controlled runner reported 45 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gemini-3-5-flash-high-v2")
      ?.testEvidence,
    "10 framework-style static cases; controlled runner reported 10 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "sonnet-4-6-thinking-v2")
      ?.testEvidence,
    "96 framework-style static cases; controlled runner reported 158 assertions passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gemini-3-1-pro-high-v2")
      ?.testEvidence,
    "0 framework-style static cases; custom Node assertion script; controlled runner reported the documented test command passed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-4-high-v2")?.testEvidence,
    "12 framework-style static cases; controlled runner reported 12 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-4-high-v2")?.comparativeScore,
    89,
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-5-high-v2")?.testEvidence,
    "0 framework-style static cases; no automated test runner evidence in archived artifact",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-oss-120b-v2")?.testEvidence,
    "0 framework-style static cases; no automated test runner evidence in archived artifact",
  );
  assert.equal(
    results.runs.find((run) => run.id === "deepseek-v4-pro-v2")?.testEvidence,
    "67 framework-style static cases; controlled runner reported 67 passed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "deepseek-v4-pro-v2")
      ?.comparativeScore,
    74,
  );
  assert.equal(
    results.runs.find((run) => run.id === "glm-5-2-v2")?.testEvidence,
    "28 framework-style static cases; controlled runner reported 28 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "glm-5-2-v2")?.comparativeScore,
    87,
  );
  assert.equal(
    results.runs.find((run) => run.id === "kimi-k2-7-v2")?.testEvidence,
    "16 framework-style static cases; controlled runner reported 16 tests passing",
  );
  assert.equal(
    results.runs.find((run) => run.id === "kimi-k2-7-v2")?.comparativeScore,
    90,
  );
  assert.equal(
    results.runs.find((run) => run.id === "mimo-v2-5-pro-v2")?.testEvidence,
    "44 framework-style static cases; controlled runner reported 44 tests and npm run test passed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "minimax-m3-v2")?.testEvidence,
    "47 framework-style static cases; controlled runner reported 47 tests passing",
  );
  assert.equal(
    results.runs.find((run) => run.id === "qwen-3-7-max-v2")?.testEvidence,
    "32 framework-style static cases; controlled runner reported 32 tests passing",
  );
  assert.equal(
    results.runs.find((run) => run.id === "nemotron-3-ultra-v2")?.testEvidence,
    "0 framework-style static cases; no automated test runner evidence in archived artifact",
  );
  assert.equal(
    results.runs.find((run) => run.id === "hy3-preview-v2")?.testEvidence,
    "0 framework-style static cases; no automated test runner evidence in archived artifact",
  );
  assert.equal(
    results.runs.find((run) => run.id === "hy3-free-v2")?.testEvidence,
    "22 framework-style static cases; controlled runner reported 17 passed, 5 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-6-sol-v2")?.testEvidence,
    "10 framework-style static cases; controlled runner reported 10 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-6-terra-v2")?.testEvidence,
    "6 framework-style static cases; controlled runner reported 6 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-6-luna-v2")?.testEvidence,
    "4 framework-style static cases; controlled runner reported 4 passed, 0 failed",
  );
  assert.equal(
    results.runs.find((run) => run.id === "owl-alpha-v2")?.comparativeScore,
    87,
  );
  assert.equal(
    results.runs.find((run) => run.id === "gpt-5-4-high")?.comparativeScore,
    undefined,
  );

  const csvLines = csvContent.trimEnd().split("\n");

  assert.equal(csvLines.length, 42);
  assert.deepEqual(
    csvLines.slice(1, 27).map((line) => line.split(",")[0]),
    [
      "big-pickle-v2",
      "deepseek-v4-flash-v2",
      "mimo-v2-5-free-v2",
      "gemma-4-26b-v2",
      "laguna-m-1-v2",
      "north-mini-code-free-v2",
      "owl-alpha-v2",
      "opus-4-6-thinking-v2",
      "gemini-3-5-flash-high-v2",
      "sonnet-4-6-thinking-v2",
      "gemini-3-1-pro-high-v2",
      "gpt-5-4-high-v2",
      "gpt-5-5-high-v2",
      "gpt-oss-120b-v2",
      "deepseek-v4-pro-v2",
      "glm-5-2-v2",
      "kimi-k2-7-v2",
      "mimo-v2-5-pro-v2",
      "minimax-m3-v2",
      "qwen-3-7-max-v2",
      "nemotron-3-ultra-v2",
      "hy3-preview-v2",
      "hy3-free-v2",
      "gpt-5-6-sol-v2",
      "gpt-5-6-terra-v2",
      "gpt-5-6-luna-v2",
    ],
  );
  assert.match(
    csvLines[0],
    /^run_id,execution_order,model,run_date,benchmark_version,status,failure_types,source_loc,static_automated_tests,test_evidence,comparative_score,stack,functional_read,details_url,markdown_url,demo_url,screenshot_url$/,
  );
  assert.match(
    csvContent,
    /gpt-5-4-high,1,GPT 5\.4 High,2026-05-25,v1,comparable,/,
  );
  assert.match(
    csvContent,
    /deepseek-v4-flash-v2,2,DeepSeek V4 Flash,2026-06-10,v2,contract-failing,attribution,809,20,/,
  );
  assert.match(
    csvContent,
    /gemma-4-26b-v2,4,Gemma 4 26B,2026-06-11,v2,contract-failing,core behavior \| submission documentation \| attribution \| test workflow,635,0,/,
  );
  assert.match(
    csvContent,
    /laguna-m-1-v2,5,Laguna M\.1 Free,2026-06-11,v2,contract-failing,core behavior \| attribution,716,0,/,
  );
  assert.match(
    csvContent,
    /north-mini-code-free-v2,6,North Mini Code Free,2026-06-11,v2,contract-failing,core behavior \| attribution \| test workflow,1191,0,"0 framework-style static cases; package test command reported 7 verification sections passed, 0 failed; unreferenced Jest-style tests are not run by npm test",,/,
  );
  assert.match(
    csvContent,
    /owl-alpha-v2,7,Owl Alpha,2026-06-11,v2,comparable,,1330,33,"33 framework-style static cases; controlled runner reported 33 passed, 0 failed",87,/,
  );
  assert.match(
    csvContent,
    /gemini-3-5-flash-high-v2,9,Gemini 3\.5 Flash High,2026-06-12,v2,contract-failing,core behavior \| attribution,1441,10,"10 framework-style static cases; controlled runner reported 10 passed, 0 failed",,/,
  );
  assert.match(
    csvContent,
    /sonnet-4-6-thinking-v2,10,Claude Sonnet 4\.6 Thinking,2026-06-13,v2,contract-failing,submission documentation \| attribution,2352,96,"96 framework-style static cases; controlled runner reported 158 assertions passed, 0 failed",,/,
  );
  assert.match(
    csvContent,
    /gemini-3-1-pro-high-v2,11,Gemini 3\.1 Pro High,2026-06-13,v2,contract-failing,core behavior \| attribution,694,0,0 framework-style static cases; custom Node assertion script; controlled runner reported the documented test command passed,,/,
  );
  assert.match(
    csvContent,
    /gpt-5-4-high-v2,12,GPT 5\.4 High,2026-06-15,v2,comparable,,1573,12,"12 framework-style static cases; controlled runner reported 12 passed, 0 failed",89,/,
  );
  assert.match(
    csvContent,
    /gpt-5-5-high-v2,13,GPT 5\.5 High,2026-06-15,v2,comparable,,1056,0,0 framework-style static cases; no automated test runner evidence in archived artifact,,/,
  );
  assert.match(
    csvContent,
    /gpt-oss-120b-v2,14,gpt-oss-120b,2026-06-15,v2,contract-failing,core behavior \| submission documentation \| attribution \| test workflow,187,0,0 framework-style static cases; no automated test runner evidence in archived artifact,,/,
  );
  assert.match(
    csvContent,
    /deepseek-v4-pro-v2,15,DeepSeek V4 Pro,2026-06-23,v2,comparable,,1259,67,67 framework-style static cases; controlled runner reported 67 passed,74,/,
  );
  assert.match(
    csvContent,
    /glm-5-2-v2,16,GLM-5\.2,2026-06-23,v2,comparable,,1268,28,"28 framework-style static cases; controlled runner reported 28 passed, 0 failed",87,/,
  );
  assert.match(
    csvContent,
    /kimi-k2-7-v2,17,Kimi K2\.7,2026-06-23,v2,comparable,,891,16,16 framework-style static cases; controlled runner reported 16 tests passing,90,/,
  );
  assert.match(
    csvContent,
    /mimo-v2-5-pro-v2,18,MiMo V2\.5 Pro,2026-06-23,v2,contract-failing,attribution,1517,44,44 framework-style static cases; controlled runner reported 44 tests and npm run test passed,,/,
  );
  assert.match(
    csvContent,
    /minimax-m3-v2,19,MiniMax M3,2026-06-23,v2,contract-failing,localization,2017,47,47 framework-style static cases; controlled runner reported 47 tests passing,,/,
  );
  assert.match(
    csvContent,
    /qwen-3-7-max-v2,20,Qwen3\.7 Max,2026-06-23,v2,contract-failing,core behavior \| submission documentation \| attribution,1083,32,32 framework-style static cases; controlled runner reported 32 tests passing,,/,
  );
  assert.match(
    csvContent,
    /nemotron-3-ultra-v2,21,Nemotron 3 Ultra,2026-06-26,v2,contract-failing,core behavior \| attribution,1102,0,0 framework-style static cases; no automated test runner evidence in archived artifact,,/,
  );
  assert.match(
    csvContent,
    /hy3-preview-v2,22,Hy3 Preview,2026-06-30,v2,contract-failing,core behavior \| attribution \| localization,722,0,0 framework-style static cases; no automated test runner evidence in archived artifact,,/,
  );
  assert.match(
    csvContent,
    /hy3-free-v2,23,Hy3 Free,2026-07-07,v2,contract-failing,test workflow,1424,22,"22 framework-style static cases; controlled runner reported 17 passed, 5 failed",,/,
  );
  assert.match(
    csvContent,
    /gpt-5-6-sol-v2,24,GPT 5\.6 Sol,2026-07-11,v2,comparable,,1189,10,"10 framework-style static cases; controlled runner reported 10 passed, 0 failed",94,/,
  );
  assert.match(
    csvContent,
    /gpt-5-6-terra-v2,25,GPT 5\.6 Terra,2026-07-11,v2,comparable,,660,6,"6 framework-style static cases; controlled runner reported 6 passed, 0 failed",87,/,
  );
  assert.match(
    csvContent,
    /gpt-5-6-luna-v2,26,GPT 5\.6 Luna,2026-07-12,v2,contract-failing,core behavior \| attribution \| submission documentation,600,4,"4 framework-style static cases; controlled runner reported 4 passed, 0 failed",,/,
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
  assert.match(
    methodology,
    /Each result is one archived run for one model label and one benchmark version/,
  );
  assert.doesNotMatch(methodology, /Each model currently has one run/);

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
    if (run.observations) {
      assert.match(content, /^## Observed Strengths$/m);
      assert.match(content, /^## Observed Weaknesses$/m);
    } else {
      assert.doesNotMatch(content, /^## Observed Strengths$/m);
      assert.doesNotMatch(content, /^## Observed Weaknesses$/m);
    }
    assert.match(content, /^## Evidence$/m);
    assert.match(content, /^## Interpretation Limits$/m);
    assert.match(content, /not a general model review or universal ranking/);
    assert.match(
      content,
      new RegExp(`^- Run ID: ${escapeRegExp(run.id)}$`, "m"),
    );
    assert.match(
      content,
      new RegExp(`^- Model label: ${escapeRegExp(run.model)}$`, "m"),
    );
    assert.match(
      content,
      new RegExp(`^- Benchmark version: ${run.benchmarkVersion}$`, "m"),
    );
    assert.match(content, new RegExp(`^- Run date: ${run.runDate}$`, "m"));
    assert.match(content, new RegExp(`^- Status: ${run.status}$`, "m"));
    assert.match(content, new RegExp(`^- Source LoC: ${run.sourceLoc}$`, "m"));
    assert.match(
      content,
      new RegExp(
        `^- Automated test evidence: ${escapeRegExp(run.testEvidence ?? String(run.testCount))}$`,
        "m",
      ),
    );
    if (run.comparativeScore !== undefined) {
      assert.match(
        content,
        new RegExp(`^- Comparative score: ${run.comparativeScore}$`, "m"),
      );
    } else {
      assert.doesNotMatch(content, /^- Comparative score:/m);
    }
    assert.match(
      content,
      new RegExp(`^- Archived demo: ${escapeRegExp(run.demoUrl)}$`, "m"),
    );
    assert.match(
      content,
      new RegExp(`^- Screenshot: ${escapeRegExp(run.screenshotUrl)}$`, "m"),
    );
    assert.match(
      content,
      /Each result is one archived run for one model label and one benchmark version/,
    );
    assert.doesNotMatch(content, /Each model currently has one run/);
  });
});

test("benchmark galleries expose versioned screenshots and explicit demo links", () => {
  for (const gallery of Object.values(phoneticBenchmarkGalleries)) {
    assert.equal(gallery.runs.length, 41);
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
      Array.from({ length: 26 }, (_, index) => index + 1),
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

test("shared layout exposes llms.txt and keeps repeated navigation out of snippets", () => {
  const layout = readFileSync("src/layouts/Base.astro", "utf8");

  assert.match(
    layout,
    /<link rel="alternate" type="text\/plain" title="LLMs\.txt" href="\/llms\.txt" \/>/,
  );
  assert.match(layout, /<header\s+class="site-header[^"]*"/);
  assert.match(layout, /data-nosnippet/);
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

test("benchmark report component keeps readable result cards and selected screenshot case notes", () => {
  const component = readFileSync(
    "src/components/PhoneticBenchmarkReport.astro",
    "utf8",
  );

  assert.match(
    component,
    /firstRun\.executionOrder - secondRun\.executionOrder/,
  );
  assert.match(component, /const spotlightHeadingId = "benchmark-spotlights";/);
  assert.match(
    component,
    /const currentSummaryHeadingId = "current-v2-summary";/,
  );
  assert.match(component, /currentComparableRuns\.map/);
  assert.match(component, /getCurrentStatusCount\(status\)/);
  assert.match(component, /aria-labelledby=\{spotlightHeadingId\}/);
  assert.match(component, /report\.spotlights\.map/);
  assert.match(component, /spotlight\.runIds\.map/);
  assert.match(component, /getStatusRank\(firstRun\.status\)/);
  assert.match(component, /open=\{!group\.isHistorical\}/);
  assert.match(component, /class="result-card"/);
  assert.match(component, /class="result-screenshot"/);
  assert.match(component, /<details\s+class="result-evidence"/);
  assert.match(
    component,
    /<summary>\{report\.tableLabels\.evidenceDetails\}<\/summary>/,
  );
  assert.match(component, /data-run-date=\{run\.runDate\}/);
  assert.match(component, /data-stack=\{run\.stack\}/);
  assert.match(component, /report\.tableLabels\.failureTypes/);
  assert.match(component, /report\.tableLabels\.testCount/);
  assert.match(component, /run\.testEvidence \?\? String\(run\.testCount\)/);
  assert.match(component, /run\.functionalRead/);
  assert.match(
    component,
    /aria-label=\{`\$\{report\.detailLabels\.screenshot\}: \$\{run\.model\}`\}/,
  );
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
      component.indexOf("aria-labelledby={spotlightHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={spotlightHeadingId}") <
      component.indexOf("aria-labelledby={resultsHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={resultsHeadingId}") <
      component.indexOf("aria-labelledby={caseNotesHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={caseNotesHeadingId}") <
      component.indexOf("aria-labelledby={findingsHeadingId}"),
  );
  assert.ok(
    component.indexOf("aria-labelledby={findingsHeadingId}") <
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
  assert.match(
    component,
    /\{run\.testEvidence \?\? String\(run\.testCount\)\}/,
  );
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
