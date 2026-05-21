import test from "node:test";
import assert from "node:assert/strict";

import { en } from "../src/i18n/en.ts";
import { getMachineReadableArtifacts } from "../src/i18n/machine-readable.ts";
import { pl } from "../src/i18n/pl.ts";
import type { LinkBlock } from "../src/i18n/schema.ts";

type ArtifactPath = `/${string}`;

function getArtifactsByPath() {
  return new Map(
    getMachineReadableArtifacts().map((artifact) => [artifact.pathname, artifact.content] as const),
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
  const project = copy.projects.items.find((item) => item.blocks.some((block) => block.type === "link"));

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

  assert.deepEqual(paths, ["/index.md", "/llms-full.txt", "/pl/index.md"]);
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
  assert.match(content, /^#### As of April 2026$/m);
  assert.match(content, /^- Production code: ~21,000 lines$/m);
  assert.match(content, /^- Tool: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(content, /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m);
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
  assert.match(content, /^### 4\. Ta strona$/m);
  assert.match(content, /^#### Stan na kwiecień 2026$/m);
  assert.match(content, /^- Kod produkcyjny: ~21,000 linii$/m);
  assert.match(content, /^- Narzędzie: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(content, /^- Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m);
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
  assert.match(content, /^- Polish homepage: https:\/\/piotrkacala\.pl\/pl\/$/m);
  assert.match(content, /^- Contact: mailto:kontakt@piotrkacala\.pl$/m);
  assert.match(
    content,
    /^- This site — Repo: https:\/\/github\.com\/piotrkacala\/personal-website$/m,
  );
  assert.match(content, /^- This site — Tool: https:\/\/piotrkacala\.pl\/400m\/$/m);
  assert.match(
    content,
    /^- Phonetic Alphabet Trainer — Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m,
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

    assert.match(englishHomepage, /^- Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m);
    assert.doesNotMatch(englishHomepage, /Primary link ->/);

    assert.match(polishHomepage, /^- Link: https:\/\/piotrkacala\.github\.io\/phonetic\/$/m);
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
