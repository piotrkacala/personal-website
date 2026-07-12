import type { SiteMetadata } from "../i18n/schema.ts";
import { siteProfile } from "./profile.ts";

export type BenchmarkReportLang = "en" | "pl";
export type BenchmarkVersion = "v1" | "v2";
export type BenchmarkStatus = "comparable" | "contract-failing" | "unrunnable";
export type BenchmarkFailureType =
  | "core behavior"
  | "submission documentation"
  | "attribution"
  | "localization"
  | "test workflow"
  | "unrunnable output";

interface BenchmarkRunData {
  id: string;
  executionOrder: number;
  model: string;
  runDate: string;
  benchmarkVersion: BenchmarkVersion;
  status: BenchmarkStatus;
  failureTypes: readonly BenchmarkFailureType[];
  sourceLoc: number;
  testCount: number;
  testEvidence?: string;
  stack: string;
  comparativeScore?: number;
}

export interface BenchmarkRunObservations {
  observedStrengths: readonly string[];
  observedWeaknesses: readonly string[];
}

export interface BenchmarkRunCopy extends BenchmarkRunData {
  functionalRead: string;
  screenshotPath: `/${string}`;
  screenshotUrl: string;
  screenshotAlt: string;
  screenshotCaption: string;
  demoUrl: string;
  detailsUrl: string;
  markdownUrl: string;
  observations?: BenchmarkRunObservations;
}

export interface BenchmarkNarrativeSection {
  heading: string;
  paragraphs: readonly string[];
}

export interface BenchmarkCaseNote {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  runIds: readonly string[];
}

export interface BenchmarkSpotlight {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  runIds: readonly string[];
}

export interface BenchmarkRunGroupCopy {
  benchmarkVersion: BenchmarkVersion;
  heading: string;
  intro: string;
}

export interface BenchmarkReportCopy {
  lang: BenchmarkReportLang;
  metadata: SiteMetadata;
  markdownPath: `/${string}`;
  homeHref: string;
  homeLabel: string;
  languageSwitcher: {
    ariaLabel: string;
    currentLabel: string;
    currentLanguage: BenchmarkReportLang;
    alternateLabel: string;
    alternateHref: string;
    alternateLanguage: BenchmarkReportLang;
  };
  eyebrow: string;
  title: string;
  summary: string;
  currentSummaryKicker: string;
  currentSummaryHeading: string;
  currentSummaryText: string;
  currentSummaryComparableLabel: string;
  currentSummaryResultsLabel: string;
  currentSummaryGalleryLabel: string;
  benchmarkHeading: string;
  benchmarkParagraphs: readonly string[];
  readingHeading: string;
  readingIntro: string;
  statusDescriptions: Readonly<Record<BenchmarkStatus, string>>;
  evidenceText: string;
  spotlightHeading: string;
  spotlightIntro: string;
  spotlights: readonly BenchmarkSpotlight[];
  resultsHeading: string;
  resultsIntro: string;
  resultGroups: readonly BenchmarkRunGroupCopy[];
  tableLabels: {
    model: string;
    status: string;
    failureTypes: string;
    sourceLoc: string;
    testCount: string;
    functionalRead: string;
    evidenceDetails: string;
    details: string;
  };
  detailLabels: {
    id: string;
    benchmarkVersion: string;
    comparativeScore: string;
    runDate: string;
    stack: string;
    markdownDetails: string;
    screenshot: string;
    demo: string;
  };
  statusLabels: Readonly<Record<BenchmarkStatus, string>>;
  failureTypeLabels: Readonly<Record<BenchmarkFailureType, string>>;
  versionLabels: Readonly<Record<BenchmarkVersion, string>>;
  noneLabel: string;
  detailsLabel: string;
  demoLabel: string;
  metadataLabels: {
    benchmark: string;
    runs: string;
    updated: string;
    methodology: string;
    machineReadable: string;
  };
  methodologyLabel: string;
  methodologyHref: string;
  resourceLinks: readonly {
    label: string;
    href: string;
  }[];
  runs: readonly BenchmarkRunCopy[];
  findingsHeading: string;
  findings: readonly BenchmarkNarrativeSection[];
  caseNotesHeading: string;
  caseNotes: readonly BenchmarkCaseNote[];
  artifactHeading: string;
  artifactIntro: string;
  galleryText: string;
  galleryHref: string;
  galleryLabel: string;
  closingHeading: string;
  closingText: string;
}

export interface BenchmarkMethodologySection {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}

export interface BenchmarkMethodologyCopy {
  metadata: SiteMetadata;
  markdownPath: `/${string}`;
  reportHref: string;
  reportLabel: string;
  eyebrow: string;
  title: string;
  summary: string;
  sourcePackageLabel: string;
  sourcePackageUrl: string;
  sections: readonly BenchmarkMethodologySection[];
}

export interface BenchmarkMetadata {
  schemaVersion: "1";
  coveredBenchmarkVersions: readonly BenchmarkVersion[];
  currentBenchmarkVersion: BenchmarkVersion;
  publishedDate: string;
  updatedDate: string;
  coveredThroughDate: string;
}

export interface BenchmarkGalleryCopy {
  lang: BenchmarkReportLang;
  metadata: SiteMetadata;
  homeHref: string;
  homeLabel: string;
  reportHref: string;
  reportLabel: string;
  languageSwitcher: BenchmarkReportCopy["languageSwitcher"];
  eyebrow: string;
  title: string;
  introParagraphs: readonly string[];
  resultGroups: readonly BenchmarkRunGroupCopy[];
  detailLabels: {
    status: string;
    sourceLoc: string;
    testCount: string;
  };
  statusLabels: Readonly<Record<BenchmarkStatus, string>>;
  versionLabels: Readonly<Record<BenchmarkVersion, string>>;
  demoLabel: string;
  runs: readonly BenchmarkRunCopy[];
}

const siteUrl = siteProfile.siteUrl;
export const phoneticBenchmarkPublicPackageUrl =
  "https://github.com/piotrkacala/phonetic-benchmark";
export const phoneticBenchmarkResultsJsonPath =
  "/phonetic-benchmark/results.json";
export const phoneticBenchmarkResultsCsvPath =
  "/phonetic-benchmark/results.csv";
export const phoneticBenchmarkMethodologyPath =
  "/phonetic-benchmark/methodology/";
export const phoneticBenchmarkMethodologyMarkdownPath =
  "/phonetic-benchmark/methodology/index.md";

function url(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

const runData = [
  {
    id: "gpt-5-4-high",
    executionOrder: 1,
    model: "GPT 5.4 High",
    runDate: "2026-05-25",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1261,
    testCount: 8,
    stack: "Vite, TypeScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "gpt-5-5-high",
    executionOrder: 2,
    model: "GPT 5.5 High",
    runDate: "2026-05-25",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1117,
    testCount: 7,
    stack:
      "plain JavaScript, plain browser DOM APIs, custom Node static server, node:test",
  },
  {
    id: "gemini-3-5-flash-high",
    executionOrder: 3,
    model: "Gemini 3.5 Flash High",
    runDate: "2026-05-25",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["submission documentation"],
    sourceLoc: 1913,
    testCount: 21,
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "gemini-3-1-pro-high",
    executionOrder: 4,
    model: "Gemini 3.1 Pro High",
    runDate: "2026-05-26",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["core behavior", "submission documentation", "attribution"],
    sourceLoc: 857,
    testCount: 0,
    stack: "Vite, TypeScript, plain browser DOM APIs",
  },
  {
    id: "sonnet-4-6-thinking",
    executionOrder: 5,
    model: "Claude Sonnet 4.6 Thinking",
    runDate: "2026-05-26",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1235,
    testCount: 23,
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "owl-alpha",
    executionOrder: 6,
    model: "Owl Alpha",
    runDate: "2026-05-26",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["submission documentation", "attribution"],
    sourceLoc: 1137,
    testCount: 35,
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "gemma-4-26b",
    executionOrder: 7,
    model: "Gemma 4 26B",
    runDate: "2026-05-26",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["submission documentation", "attribution"],
    sourceLoc: 635,
    testCount: 0,
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs",
  },
  {
    id: "nemotron-3-super",
    executionOrder: 8,
    model: "Nemotron 3 Super",
    runDate: "2026-05-27",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["core behavior", "submission documentation", "attribution"],
    sourceLoc: 612,
    testCount: 0,
    stack: "plain JavaScript, plain browser DOM APIs, http-server",
  },
  {
    id: "laguna-m-1",
    executionOrder: 9,
    model: "Laguna M.1",
    runDate: "2026-05-27",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 885,
    testCount: 20,
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "deepseek-v4-pro",
    executionOrder: 10,
    model: "DeepSeek V4 Pro",
    runDate: "2026-05-27",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["submission documentation"],
    sourceLoc: 1601,
    testCount: 43,
    stack:
      "plain JavaScript, plain browser DOM APIs, custom Node static/API server, node:test",
  },
  {
    id: "gpt-oss-120b",
    executionOrder: 11,
    model: "gpt-oss-120b",
    runDate: "2026-05-27",
    benchmarkVersion: "v1",
    status: "unrunnable",
    failureTypes: ["unrunnable output"],
    sourceLoc: 110,
    testCount: 0,
    stack: "Express, plain JavaScript, minimal static page",
  },
  {
    id: "hy3-preview",
    executionOrder: 12,
    model: "Hy3 Preview",
    runDate: "2026-06-01",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["attribution", "test workflow"],
    sourceLoc: 956,
    testCount: 19,
    stack: "plain JavaScript, plain browser DOM APIs, http-server, Jest",
  },
  {
    id: "mimo-v2-5-pro",
    executionOrder: 13,
    model: "MiMo V2.5 Pro",
    runDate: "2026-06-01",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1275,
    testCount: 40,
    stack: "plain JavaScript, plain browser DOM APIs, Express, Jest",
  },
  {
    id: "minimax-m3",
    executionOrder: 14,
    model: "MiniMax M3",
    runDate: "2026-06-01",
    benchmarkVersion: "v1",
    status: "contract-failing",
    failureTypes: ["attribution"],
    sourceLoc: 2314,
    testCount: 33,
    stack: "Vite, TypeScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "kimi-k2-6",
    executionOrder: 15,
    model: "Kimi K2.6",
    runDate: "2026-05-29",
    benchmarkVersion: "v1",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 910,
    testCount: 11,
    stack: "Vite, TypeScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "big-pickle-v2",
    executionOrder: 1,
    model: "Big Pickle",
    runDate: "2026-06-10",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "submission documentation"],
    sourceLoc: 856,
    testCount: 24,
    testEvidence:
      "24 framework-style static cases; controlled runner reported 24 passed, 0 failed",
    stack: "plain JavaScript, Vite 6.3.5, Vitest 3.1.3",
  },
  {
    id: "deepseek-v4-flash-v2",
    executionOrder: 2,
    model: "DeepSeek V4 Flash",
    runDate: "2026-06-10",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["attribution"],
    sourceLoc: 809,
    testCount: 20,
    testEvidence:
      "20 framework-style static cases; controlled runner reported 20 passed, 0 failed",
    stack:
      "plain JavaScript, plain browser DOM APIs, Express 4.21.2, node:test",
  },
  {
    id: "mimo-v2-5-free-v2",
    executionOrder: 3,
    model: "MiMo V2.5 Free",
    runDate: "2026-06-10",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution"],
    sourceLoc: 1020,
    testCount: 35,
    testEvidence:
      "35 framework-style static cases; controlled runner reported 35 passed, 0 failed",
    stack:
      "plain JavaScript, plain browser DOM APIs, Express 4.21.2, node:test",
  },
  {
    id: "gemma-4-26b-v2",
    executionOrder: 4,
    model: "Gemma 4 26B",
    runDate: "2026-06-11",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: [
      "core behavior",
      "submission documentation",
      "attribution",
      "test workflow",
    ],
    sourceLoc: 635,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; controlled runner blocked by dependency-policy failures; npm test exits with no test files found",
    stack: "Vite 5.4.21, TypeScript, plain browser DOM APIs, Vitest",
  },
  {
    id: "laguna-m-1-v2",
    executionOrder: 5,
    model: "Laguna M.1 Free",
    runDate: "2026-06-11",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution"],
    sourceLoc: 716,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; custom runner reported 9 passed, 0 failed; controlled runner reported 9 passed, 0 failed",
    stack:
      "plain JavaScript, plain browser DOM APIs, Node http server, custom Node test runner",
  },
  {
    id: "north-mini-code-free-v2",
    executionOrder: 6,
    model: "North Mini Code Free",
    runDate: "2026-06-11",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution", "test workflow"],
    sourceLoc: 1191,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; package test command reported 7 verification sections passed, 0 failed; unreferenced Jest-style tests are not run by npm test",
    stack:
      "plain JavaScript, plain browser DOM APIs, Express 4.18.2, custom verification script",
  },
  {
    id: "owl-alpha-v2",
    executionOrder: 7,
    model: "Owl Alpha",
    runDate: "2026-06-11",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1330,
    testCount: 33,
    testEvidence:
      "33 framework-style static cases; controlled runner reported 33 passed, 0 failed",
    stack:
      "plain JavaScript, plain browser DOM APIs, Node http server, node:test",
    comparativeScore: 87,
  },
  {
    id: "opus-4-6-thinking-v2",
    executionOrder: 8,
    model: "Claude Opus 4.6 Thinking",
    runDate: "2026-06-12",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["attribution"],
    sourceLoc: 2051,
    testCount: 45,
    testEvidence:
      "45 framework-style static cases; controlled runner reported 45 passed, 0 failed",
    stack:
      "Vite 6.3.5, vanilla JavaScript, plain browser DOM APIs, Vitest 3.2.1",
  },
  {
    id: "gemini-3-5-flash-high-v2",
    executionOrder: 9,
    model: "Gemini 3.5 Flash High",
    runDate: "2026-06-12",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution"],
    sourceLoc: 1441,
    testCount: 10,
    testEvidence:
      "10 framework-style static cases; controlled runner reported 10 passed, 0 failed",
    stack:
      "Vite 5.2.11, vanilla JavaScript, plain browser DOM APIs, Vitest 1.6.0",
  },
  {
    id: "sonnet-4-6-thinking-v2",
    executionOrder: 10,
    model: "Claude Sonnet 4.6 Thinking",
    runDate: "2026-06-13",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["submission documentation", "attribution"],
    sourceLoc: 2352,
    testCount: 96,
    testEvidence:
      "96 framework-style static cases; controlled runner reported 158 assertions passed, 0 failed",
    stack:
      "Vite 6.3.5, vanilla JavaScript, plain browser DOM APIs, Vitest 3.2.3",
  },
  {
    id: "gemini-3-1-pro-high-v2",
    executionOrder: 11,
    model: "Gemini 3.1 Pro High",
    runDate: "2026-06-13",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution"],
    sourceLoc: 694,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; custom Node assertion script; controlled runner reported the documented test command passed",
    stack: "Vite 8.0.16, TypeScript 6.0.3, plain browser DOM APIs",
  },
  {
    id: "gpt-5-4-high-v2",
    executionOrder: 12,
    model: "GPT 5.4 High",
    runDate: "2026-06-15",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1573,
    testCount: 12,
    testEvidence:
      "12 framework-style static cases; controlled runner reported 12 passed, 0 failed",
    stack:
      "plain JavaScript, plain browser DOM APIs, custom Node static server, node:test",
    comparativeScore: 89,
  },
  {
    id: "gpt-5-5-high-v2",
    executionOrder: 13,
    model: "GPT 5.5 High",
    runDate: "2026-06-15",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1056,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; no automated test runner evidence in archived artifact",
    stack: "plain JavaScript, plain browser DOM APIs",
  },
  {
    id: "gpt-oss-120b-v2",
    executionOrder: 14,
    model: "gpt-oss-120b",
    runDate: "2026-06-15",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: [
      "core behavior",
      "submission documentation",
      "attribution",
      "test workflow",
    ],
    sourceLoc: 187,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; no automated test runner evidence in archived artifact",
    stack:
      "plain JavaScript, plain browser DOM APIs, static JSON data endpoint",
  },
  {
    id: "deepseek-v4-pro-v2",
    executionOrder: 15,
    model: "DeepSeek V4 Pro",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1259,
    testCount: 67,
    testEvidence:
      "67 framework-style static cases; controlled runner reported 67 passed",
    stack:
      "Vite 5.4.11, vanilla JavaScript ES modules, plain CSS, Vitest 2.1.8",
    comparativeScore: 74,
  },
  {
    id: "glm-5-2-v2",
    executionOrder: 16,
    model: "GLM-5.2",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1268,
    testCount: 28,
    testEvidence:
      "28 framework-style static cases; controlled runner reported 28 passed, 0 failed",
    stack: "Vite 8.0.16, vanilla JavaScript, plain browser DOM APIs, node:test",
    comparativeScore: 87,
  },
  {
    id: "kimi-k2-7-v2",
    executionOrder: 17,
    model: "Kimi K2.7",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 891,
    testCount: 16,
    testEvidence:
      "16 framework-style static cases; controlled runner reported 16 tests passing",
    stack: "Vite 5.4.14, plain JavaScript, plain browser DOM APIs, node:test",
    comparativeScore: 90,
  },
  {
    id: "mimo-v2-5-pro-v2",
    executionOrder: 18,
    model: "MiMo V2.5 Pro",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["attribution"],
    sourceLoc: 1517,
    testCount: 44,
    testEvidence:
      "44 framework-style static cases; controlled runner reported 44 tests and npm run test passed",
    stack:
      "plain JavaScript, plain browser DOM APIs, custom Node http server, node:test",
  },
  {
    id: "minimax-m3-v2",
    executionOrder: 19,
    model: "MiniMax M3",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["localization"],
    sourceLoc: 2017,
    testCount: 47,
    testEvidence:
      "47 framework-style static cases; controlled runner reported 47 tests passing",
    stack: "plain HTML, CSS, native ES modules, Node.js http server, node:test",
  },
  {
    id: "qwen-3-7-max-v2",
    executionOrder: 20,
    model: "Qwen3.7 Max",
    runDate: "2026-06-23",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "submission documentation", "attribution"],
    sourceLoc: 1083,
    testCount: 32,
    testEvidence:
      "32 framework-style static cases; controlled runner reported 32 tests passing",
    stack:
      "Vite 6.3.5, vanilla JavaScript ES modules, plain browser DOM APIs, Vitest 3.2.4",
  },
  {
    id: "nemotron-3-ultra-v2",
    executionOrder: 21,
    model: "Nemotron 3 Ultra",
    runDate: "2026-06-26",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution"],
    sourceLoc: 1102,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; no automated test runner evidence in archived artifact",
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs",
  },
  {
    id: "hy3-preview-v2",
    executionOrder: 22,
    model: "Hy3 Preview",
    runDate: "2026-06-30",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution", "localization"],
    sourceLoc: 722,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; no automated test runner evidence in archived artifact",
    stack: "Vite, vanilla JavaScript, plain browser DOM APIs",
  },
  {
    id: "hy3-free-v2",
    executionOrder: 23,
    model: "Hy3 Free",
    runDate: "2026-07-07",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["test workflow"],
    sourceLoc: 1424,
    testCount: 22,
    testEvidence:
      "22 framework-style static cases; controlled runner reported 17 passed, 5 failed",
    stack:
      "plain HTML/CSS, vanilla JavaScript ES modules, zero-dependency Node.js static server, node:test",
  },
  {
    id: "gpt-5-6-sol-v2",
    executionOrder: 24,
    model: "GPT 5.6 Sol",
    runDate: "2026-07-11",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 1189,
    testCount: 10,
    testEvidence:
      "10 framework-style static cases; controlled runner reported 10 passed, 0 failed",
    stack:
      "plain JavaScript, browser-native modules, custom Node static server, node:test",
    comparativeScore: 94,
  },
  {
    id: "gpt-5-6-terra-v2",
    executionOrder: 25,
    model: "GPT 5.6 Terra",
    runDate: "2026-07-11",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 660,
    testCount: 6,
    testEvidence:
      "6 framework-style static cases; controlled runner reported 6 passed, 0 failed",
    stack:
      "plain JavaScript, browser ES modules, custom Node static server, node:test",
    comparativeScore: 87,
  },
  {
    id: "gpt-5-6-luna-v2",
    executionOrder: 26,
    model: "GPT 5.6 Luna",
    runDate: "2026-07-12",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution", "submission documentation"],
    sourceLoc: 600,
    testCount: 4,
    testEvidence:
      "4 framework-style static cases; controlled runner reported 4 passed, 0 failed",
    stack:
      "plain JavaScript, browser ES modules, custom Node static server, node:test",
  },
] as const satisfies readonly BenchmarkRunData[];

export type BenchmarkRunId = (typeof runData)[number]["id"];

function getLatestRunDate(): string {
  return runData.reduce<string>(
    (latestDate, run) => (run.runDate > latestDate ? run.runDate : latestDate),
    runData[0].runDate,
  );
}

function getEarliestRunDate(): string {
  return runData.reduce<string>(
    (earliestDate, run) =>
      run.runDate < earliestDate ? run.runDate : earliestDate,
    runData[0].runDate,
  );
}

export const phoneticBenchmarkMetadata = {
  schemaVersion: "1",
  coveredBenchmarkVersions: ["v1", "v2"],
  currentBenchmarkVersion: "v2",
  publishedDate: "2026-05-26",
  updatedDate: "2026-07-12",
  coveredThroughDate: getLatestRunDate(),
} as const satisfies BenchmarkMetadata;

const runObservations: Partial<
  Record<BenchmarkRunId, BenchmarkRunObservations>
> = {
  "gpt-5-4-high": {
    observedStrengths: ["Clears the v1 contract.", "Includes automated tests."],
    observedWeaknesses: [
      "The answer input loses focus after progression to the next symbol.",
      "The focus miss forces repeated mouse use in a keyboard-first training loop.",
    ],
  },
  "gpt-5-5-high": {
    observedStrengths: [
      "Clears the v1 contract.",
      "Uses a compact plain JavaScript implementation with no build step.",
      "No significant issue was found in the reviewed flow.",
    ],
    observedWeaknesses: ["No material reviewed weakness was recorded."],
  },
  "gemini-3-5-flash-high": {
    observedStrengths: [
      "Produces a functionally usable output.",
      "Includes automated tests.",
    ],
    observedWeaknesses: [
      "Implementation-specific install and run commands are not documented.",
      "Quiz notifications cause visible layout shifts during the core loop.",
    ],
  },
  "gemini-3-1-pro-high": {
    observedStrengths: ["Produces an inspectable interface."],
    observedWeaknesses: [
      "Required keyboard hint behavior is broken.",
      "Implementation-specific workflow instructions are missing.",
      "Attribution does not preserve a fixed implementation date.",
      "Attribution does not show piotrkacala.pl as visible text.",
    ],
  },
  "sonnet-4-6-thinking": {
    observedStrengths: [
      "Clears the v1 contract.",
      "Includes a strong automated test footprint.",
    ],
    observedWeaknesses: [
      "Revealing a hint in suggestion mode reshuffles button positions.",
    ],
  },
  "owl-alpha": {
    observedStrengths: [
      "Produces a functionally usable output.",
      "Includes a visible automated-test footprint.",
      "Uses a distinctive fading treatment for wrong answers.",
    ],
    observedWeaknesses: [
      "Implementation-specific workflow instructions are missing.",
      "Attribution uses a runtime-generated date.",
      "Repetitive use exposes interaction friction: an unnecessary click to continue, no reset control, and lost focus after a wrong keyboard answer.",
    ],
  },
  "gemma-4-26b": {
    observedStrengths: ["Produces a functionally usable final application."],
    observedWeaknesses: [
      "Implementation-specific workflow instructions are missing.",
      "Attribution uses a runtime-generated date.",
      "Keyboard input loses focus after progression to the next symbol.",
    ],
  },
  "nemotron-3-super": {
    observedStrengths: ["Produces an interface that starts."],
    observedWeaknesses: [
      "The quiz cannot progress past the first correct answer.",
      "Suggestion mode also shows keyboard input, mixing the required input modes.",
      "Required attribution is not usable.",
      "Implementation-specific workflow instructions are missing.",
    ],
  },
  "laguna-m-1": {
    observedStrengths: ["Clears the v1 contract.", "Includes automated tests."],
    observedWeaknesses: [
      "No reset control is available in the UI.",
      "Focus handling after progression remains unfinished.",
    ],
  },
  "deepseek-v4-pro": {
    observedStrengths: [
      "Produces a functionally strong output.",
      "Explicitly documents restrictive product decisions.",
      "Active-run restart and language-switching choices are reviewable as coherent decisions.",
    ],
    observedWeaknesses: ["Does not document install, run, and test commands."],
  },
  "gpt-oss-120b": {
    observedStrengths: [
      "No material product strength was recorded in the reviewed output.",
    ],
    observedWeaknesses: [
      "The output crashes before the benchmark behavior can be exercised.",
      "The UI is incomplete.",
      "Workflow documentation and required attribution are missing.",
    ],
  },
  "hy3-preview": {
    observedStrengths: [
      "Produces a functionally usable final application.",
      "Includes static automated tests.",
    ],
    observedWeaknesses: [
      "Attribution generates the current date at runtime instead of preserving the implementation date.",
      "The documented npm test workflow fails.",
      "No reset control is available.",
    ],
  },
  "mimo-v2-5-pro": {
    observedStrengths: [
      "Clears the v1 contract.",
      "Includes a visible automated-test footprint.",
    ],
    observedWeaknesses: [
      "Content jumps during use.",
      "No active-run reset control is available.",
    ],
  },
  "minimax-m3": {
    observedStrengths: [
      "Produces a functionally strong output.",
      "Includes substantive implementation notes.",
      "Includes automated tests.",
    ],
    observedWeaknesses: [
      "Attribution date is generated at startup or build time instead of being preserved as a fixed implementation date.",
      "Documentation and UI differ around active-run language switching.",
    ],
  },
  "kimi-k2-6": {
    observedStrengths: [
      "Clears the v1 contract.",
      "Returning to the menu during an active run asks for confirmation.",
      "Includes automated tests.",
    ],
    observedWeaknesses: [
      "Keyboard answer input does not receive focus automatically.",
    ],
  },
  "big-pickle-v2": {
    observedStrengths: [
      "The application starts and setup language selection works.",
      "Includes clear submission docs and passing automated tests.",
      "A normal-paced keyboard run can complete successfully.",
    ],
    observedWeaknesses: [
      "Rapid repeated keyboard submits can skip a symbol.",
      "Rapid repeated suggestion clicks can skip a symbol.",
      "The documented active-run language switching is not actually available in the UI.",
    ],
  },
  "deepseek-v4-flash-v2": {
    observedStrengths: [
      "The application works in the reviewed flow.",
      "Includes clear submission docs and passing automated tests.",
      "The overall execution is good.",
    ],
    observedWeaknesses: [
      "The required attribution footer is empty on the initial setup screen until a later UI re-render.",
      "Suggestion buttons reshuffle during hint or feedback re-renders.",
    ],
  },
  "mimo-v2-5-free-v2": {
    observedStrengths: [
      "The application works in the reviewed flow.",
      "Includes clear submission docs and passing controlled runner evidence.",
      "Uses a compact no-build vanilla JavaScript structure.",
    ],
    observedWeaknesses: [
      "The required attribution footer remains English after switching the UI to Polish.",
      "Rapid repeated keyboard submits can skip a symbol.",
      "The submitted git worktree was dirty during review.",
    ],
  },
  "gemma-4-26b-v2": {
    observedStrengths: [
      "The static demo starts and can be inspected.",
      "The submission includes README and implementation-report artifacts.",
      "The implementation uses the fixed benchmark data for suggestion options.",
    ],
    observedWeaknesses: [
      "The dependency policy blocks the controlled runner.",
      "The package test command fails because no test files exist.",
      "The footer attribution remains English after switching the UI to Polish.",
      "Keyboard mode lacks autofocus and Enter-to-submit behavior.",
      "Suggestion buttons reshuffle after wrong answers and hints.",
    ],
  },
  "laguna-m-1-v2": {
    observedStrengths: [
      "The application works in the reviewed flow.",
      "Includes clear submission docs and passing controlled runner evidence.",
      "Uses a compact no-build vanilla JavaScript structure.",
    ],
    observedWeaknesses: [
      "Repeated hint clicks on one question are counted as multiple hinted questions.",
      "The required attribution footer remains English after switching the UI to Polish.",
    ],
  },
  "north-mini-code-free-v2": {
    observedStrengths: [
      "The application starts and can create exercise sessions in the server-backed submission.",
      "Includes clear submission docs and a package test command that passes its verification script.",
      "The UI includes both alphabets, both modes, and visible progress scaffolding.",
    ],
    observedWeaknesses: [
      "The visible attribution uses a generic model label and a runtime-generated date instead of a fixed implementation date.",
      "After revealing a hint, the client blocks answer submission for that question.",
      "The package test command does not run the submitted Jest-style test file.",
      "The final result screen reports hinted questions as 0 regardless of actual hint use.",
    ],
  },
  "owl-alpha-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Includes clear submission docs and passing controlled-runner evidence.",
      "Setup language switching, keyboard focus, hint behavior, and suggestion-mode progression worked well in the reviewed flow.",
    ],
    observedWeaknesses: [
      "No reset is available during an active run, by documented decision.",
      "The implementation report records the final commit status as a future action even though the final repository history contains the implementation commit.",
    ],
  },
  "opus-4-6-thinking-v2": {
    observedStrengths: [
      "The application works in the reviewed core flows.",
      "Includes clear submission docs and passing controlled-runner evidence.",
      "Keyboard focus, answer locking, fixed-data suggestion options, final scoring, and quit confirmation worked in targeted browser review.",
    ],
    observedWeaknesses: [
      "The required attribution footer remains English after switching the setup UI to Polish.",
      "Repeated setup and quiz re-renders fade the whole card, which is distracting in repetitive use.",
    ],
  },
  "gemini-3-5-flash-high-v2": {
    observedStrengths: [
      "The application is runnable and functionally usable.",
      "Includes clear submission docs and passing controlled-runner evidence.",
      "Suggestion mode starts with four fixed-data buttons and no reproduced keyboard-field overlap in targeted review.",
    ],
    observedWeaknesses: [
      "The required attribution footer remains English after switching the UI to Polish.",
      "Rapid repeated keyboard submits can skip symbols.",
    ],
  },
  "sonnet-4-6-thinking-v2": {
    observedStrengths: [
      "The application is runnable and the reviewed core flows work.",
      "Includes clear setup/run documentation and passing controlled-runner evidence.",
      "Suggestion mode uses fixed-data options, hint reveal does not reshuffle buttons in the reviewed flow, and a full NATO keyboard run reaches the result screen.",
    ],
    observedWeaknesses: [
      "The visible footer and submission docs identify the implementation as Claude Sonnet 4.5 even though the run was recorded as Sonnet 4.6 Thinking.",
      "The required attribution footer remains English after switching the UI to Polish.",
      "Keyboard mode does not focus the answer input after start or after a wrong answer.",
    ],
  },
  "gemini-3-1-pro-high-v2": {
    observedStrengths: [
      "The application is runnable and functionally usable.",
      "Includes clear submission docs and passing controlled-runner evidence.",
      "Suggestion mode renders exactly four fixed-data buttons, wrong selections remain visibly marked, and hint reveal does not move options or mark the correct button.",
    ],
    observedWeaknesses: [
      "The required attribution footer remains English after switching the UI to Polish.",
      "Switching language during an active run hides a revealed hint before the current question is completed.",
    ],
  },
  "gpt-5-4-high-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Includes clear submission docs and passing controlled-runner evidence.",
      "Setup copy explains the app and scoring clearly; keyboard focus, suggestion hints, and a full NATO keyboard run worked in targeted browser review.",
    ],
    observedWeaknesses: [
      "Polish interface copy is understandable, but many words are ASCII-simplified instead of using proper Polish diacritics.",
    ],
  },
  "gpt-5-5-high-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Attribution localizes between English and Polish.",
      "Keyboard focus, fixed-data suggestion options, hint reveal, and final scoring are implemented in the archived artifact.",
    ],
    observedWeaknesses: [
      "No automated test runner evidence is present in the archived artifact.",
    ],
  },
  "gpt-oss-120b-v2": {
    observedStrengths: [
      "The static page starts and loads alphabet data for inspection.",
      "The implementation keeps the alphabet data outside the HTML shell.",
    ],
    observedWeaknesses: [
      "It does not implement the required quiz flow.",
      "It has no keyboard or four-option suggestion exercise modes.",
      "It does not provide hint behavior, run progression, or final scoring.",
      "Attribution lacks the implementing model name and fixed implementation date.",
      "No automated test runner evidence is present in the archived artifact.",
    ],
  },
  "deepseek-v4-pro-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Includes complete submission artifacts and passing controlled-runner evidence.",
      "Core scoring behavior was verified in a full NATO keyboard run.",
    ],
    observedWeaknesses: [
      "Suggestion options reshuffle after wrong-answer feedback and hint reveal.",
      "Keyboard focus is lost after starting and after correct-answer progression.",
      "Setup language switching resets the selected alphabet and answer mode.",
    ],
  },
  "glm-5-2-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Includes complete submission artifacts and passing controlled-runner evidence.",
      "Setup language switching, attribution localization, keyboard focus, and final scoring worked in targeted review.",
    ],
    observedWeaknesses: [
      "Suggestion buttons reshuffle after wrong answers and after revealing a hint.",
    ],
  },
  "kimi-k2-7-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "Includes complete submission artifacts and passing controlled-runner evidence.",
      "Keyboard, suggestion, hint, language-switching, repeat-submit, full-run, and final-scoring probes worked cleanly.",
    ],
    observedWeaknesses: [
      "The keyboard input is visibly taller than the adjacent submit button.",
    ],
  },
  "mimo-v2-5-pro-v2": {
    observedStrengths: [
      "The application works in the reviewed keyboard, suggestion, and result flows.",
      "Includes complete submission artifacts and passing controlled-runner evidence.",
      "Rapid repeated Enter and suggestion-click locking worked in browser smoke.",
    ],
    observedWeaknesses: [
      "The required footer attribution misspells Piotr Kacała's name.",
      "Operator-observed setup selection confusion keeps the qualitative assessment weak.",
    ],
  },
  "minimax-m3-v2": {
    observedStrengths: [
      "Functionally strong zero-dependency v2 run.",
      "Includes complete submission artifacts and 47 passing node:test cases.",
      "Keyboard, suggestion, active language switching, full-run, and final-scoring behavior worked cleanly in targeted review.",
    ],
    observedWeaknesses: [
      "The Polish setup screen leaves visible English count labels.",
      "Suggestion-mode hint reveal reshuffles answer buttons.",
    ],
  },
  "qwen-3-7-max-v2": {
    observedStrengths: [
      "The application is runnable and generally solid in normal-paced use.",
      "Includes complete submission artifacts and passing controlled-runner evidence.",
      "A full NATO keyboard run completed with the expected 100% result screen.",
    ],
    observedWeaknesses: [
      "Rapid repeated keyboard submits can skip symbols.",
      "Rapid repeated suggestion clicks can skip symbols.",
      "The attribution footer does not localize to Polish.",
      "The displayed and documented implementation date conflicts with the 2026 run evidence.",
      "Suggestion-mode hint reveal reshuffles answer buttons.",
    ],
  },
  "nemotron-3-ultra-v2": {
    observedStrengths: [
      "The application starts and can enter the exercise flow.",
      "Keyboard mode includes autofocus and a result screen with clean and hinted question counts.",
      "Attribution includes the model label, canonical model ID, fixed date, and piotrkacala.pl.",
    ],
    observedWeaknesses: [
      "A wrong suggestion-mode answer disables all options, blocking progress on that question.",
      "The hint container is visibly present before a hint is requested.",
      "The attribution footer remains English after switching the UI to Polish.",
      "No automated test runner evidence is present in the archived artifact.",
    ],
  },
  "hy3-preview-v2": {
    observedStrengths: [
      "The application starts and can enter the exercise flow.",
      "The interface includes both alphabets, both exercise modes, fixed-data suggestion options, and final scoring.",
      "The archived artifact keeps benchmark data separate from the HTML shell.",
    ],
    observedWeaknesses: [
      "Rapid repeated suggestion clicks can skip symbols.",
      "The footer attribution spells Piotr Kacała's name without the Polish diacritic.",
      "The required attribution footer remains English after switching the UI to Polish.",
      "The hint prefix remains English in the Polish exercise flow.",
      "No automated test runner evidence is present in the archived artifact.",
    ],
  },
};

const functionalReads = {
  en: {
    "gpt-5-4-high":
      "Works, but loses input focus between questions. That is a serious UX miss in a keyboard-first drill.",
    "gpt-5-5-high":
      "A compact plain JavaScript baseline with no significant issues found in the reviewed flow.",
    "gemini-3-5-flash-high":
      "Functionally usable, but install and run commands are not documented. Feedback messages also cause visible layout shifts.",
    "gemini-3-1-pro-high":
      "The required keyboard hint does not reveal the answer. Workflow documentation and required attribution details are also incomplete.",
    "sonnet-4-6-thinking":
      "A strong baseline with tests. Its small UX miss is that revealing a hint in suggestion mode reshuffles button positions.",
    "owl-alpha":
      "Functionally usable with 35 static automated test cases, but formally non-compliant. The repetitive exercise loop also contains several avoidable interaction frictions. The Owl Alpha label was later disclosed as LongCat-2.0.",
    "gemma-4-26b":
      "The final app is usable, but formally non-compliant and fragile around keyboard focus.",
    "nemotron-3-super":
      "The app starts, but the quiz cannot progress past its first symbol. It also mixes the required input modes and misses usable attribution.",
    "laguna-m-1":
      "Works, but repeated use exposes unfinished reset and focus handling.",
    "deepseek-v4-pro":
      "Functionally strong and unusually explicit about product decisions. Its formal failure is narrow: install, run, and test commands are not documented.",
    "gpt-oss-120b":
      "The minimal output crashes before its benchmark behavior can be meaningfully exercised.",
    "hy3-preview":
      "The final app is usable, but its date is generated at runtime and its documented test command fails.",
    "mimo-v2-5-pro":
      "Works, with visible layout shifts and no active-run reset control.",
    "minimax-m3":
      "Functionally strong with substantive implementation notes. Its formal failure is a build-time generated date instead of a preserved implementation date.",
    "kimi-k2-6":
      "Works, with a keyboard-focus miss and a useful confirmation step before abandoning a run.",
    "big-pickle-v2":
      "Vite and plain JavaScript submission with clear docs and passing tests, but formally contract-failing. Rapid repeated keyboard submits or suggestion clicks can skip a symbol, and the documented active-run language switching is not actually available in the UI.",
    "deepseek-v4-flash-v2":
      "Working run with clear docs and passing tests, but formally contract-failing because the required attribution is not visible on the initial setup screen.",
    "mimo-v2-5-free-v2":
      "Clear submission with passing runner evidence and useful docs, but formally contract-failing. The footer attribution does not localize to Polish, and rapid repeated keyboard submits can skip a symbol.",
    "gemma-4-26b-v2":
      "Vite and TypeScript submission with a runnable static artifact, but formally contract-failing. Dependency policy blocks the runner, the package test command fails, and keyboard plus suggestion interactions feel unfinished.",
    "laguna-m-1-v2":
      "Compact no-build submission with passing runner evidence and clear docs, but formally contract-failing. Repeated hint clicks on one question lower the final score too much, and the attribution footer does not localize to Polish.",
    "north-mini-code-free-v2":
      "Server-backed submission with a runnable UI and passing verification script, but formally contract-failing. Attribution is generic and runtime-dated, hint use blocks submitting the answer for that question, and the package test command does not run the submitted Jest-style tests.",
    "owl-alpha-v2":
      "Strong no-build run with clear docs, passing controlled-runner evidence, and good observed behavior. It makes a restrictive but coherent decision to lock language and omit reset during an active run. The Owl Alpha label was later disclosed as LongCat-2.0.",
    "opus-4-6-thinking-v2":
      "Runnable submission with strong tests and correct core flows, but formally contract-failing because the required attribution footer does not switch to Polish when the UI language changes. The repeated full-card fade on setup and quiz re-renders is also distracting.",
    "gemini-3-5-flash-high-v2":
      "Runnable submission with clear docs and passing controlled-runner evidence, but formally contract-failing. The attribution footer does not localize to Polish, and rapid repeated keyboard submits can skip symbols.",
    "sonnet-4-6-thinking-v2":
      "Runnable submission with strong automated-test evidence, but formally contract-failing. The visible footer and submission docs identify the implementation as Sonnet 4.5 rather than the recorded Sonnet 4.6 Thinking run, and the attribution footer does not localize to Polish.",
    "gemini-3-1-pro-high-v2":
      "Runnable submission with clear docs and passing controlled-runner evidence, but formally contract-failing. The attribution footer does not localize to Polish, and an active language switch hides a revealed hint before the question is completed.",
    "gpt-5-4-high-v2":
      "Strong comparable run with clear setup copy, passing controlled-runner evidence, and good keyboard plus suggestion-mode behavior. The main weakness is Polish localization quality: the UI is translated, but many Polish diacritics are simplified away.",
    "gpt-5-5-high-v2":
      "Strong plain JavaScript run. The archived artifact implements the required exercise modes, hint reveal, final scoring, and localized attribution, but it does not include automated test runner evidence.",
    "gpt-oss-120b-v2":
      "Thin static output. It loads alphabet data for inspection, but it does not implement the required quiz flow, exercise modes, hint behavior, scoring, or full attribution.",
    "deepseek-v4-pro-v2":
      "Comparable run with clear docs, passing controlled-runner evidence, and correct core scoring behavior. It is functionally solid, but interaction polish is notably weaker: suggestion options reshuffle after feedback or hint reveal, and keyboard focus is lost after progression.",
    "glm-5-2-v2":
      "Comparable run with complete submission artifacts, passing controlled-runner evidence, and good coverage of logic, data, i18n, scoring, and attribution. The app works well overall, but suggestion buttons reshuffle after wrong answers and hints.",
    "kimi-k2-7-v2":
      "Strong comparable run with complete submission artifacts, passing controlled-runner evidence, and clean observed keyboard, suggestion, hint, language-switching, repeated-submit, full-run, and final-scoring behavior. The only noted UX nit is the keyboard input being taller than the adjacent submit button.",
    "mimo-v2-5-pro-v2":
      "Runnable zero-dependency submission with passing controlled-runner evidence and working basic keyboard, suggestion, and result flows in targeted review. It is formally contract-failing because the required footer attribution misspells Piotr Kacała's name, and the operator-observed setup-selection confusion keeps the qualitative assessment weak.",
    "minimax-m3-v2":
      "Functionally strong zero-dependency run with complete submission artifacts, 47 passing node:test cases, and clean observed keyboard, suggestion, active language-switching, full-run, and final-scoring behavior. Formally contract-failing because the Polish setup screen leaves visible English count labels.",
    "qwen-3-7-max-v2":
      "Runnable submission with complete docs, passing controlled-runner evidence, and a generally solid app, but formally contract-failing. Rapid repeated keyboard submits and repeated suggestion clicks can skip symbols; the Polish UI leaves the attribution footer in English; and the displayed implementation date conflicts with the 2026 run evidence.",
    "nemotron-3-ultra-v2":
      "Runnable Vite submission, but formally contract-failing. A wrong suggestion-mode answer disables every option and blocks progress on that question, and the attribution footer stays English after switching the UI to Polish.",
    "hy3-preview-v2":
      "Runnable Vite submission, but formally contract-failing. Rapid repeated suggestion clicks can skip symbols, the attribution misspells Piotr Kacała's name, and Polish exercise copy still exposes an English hint prefix.",
    "hy3-free-v2":
      "A surprisingly strong vanilla JavaScript v2 run: the browser flow is clear, localized, focus-stable, and uses fixed benchmark data correctly in targeted review. It remains formally contract-failing because the documented test command fails in the controlled runner, while the main observed app behavior is otherwise solid.",
    "gpt-5-6-sol-v2":
      "Comparable v2 submission with complete durable artifacts, dependency-free browser-native JavaScript, passing controlled-runner evidence, and clean targeted browser probes. It handles active-run exit confirmation well, localizes the Polish footer naturally, and shows no confirmed contract failures in this pass.",
    "gpt-5-6-terra-v2":
      "Comparable v2 submission with complete durable artifacts, passing controlled-runner evidence, clean suggestion-mode and final scoring probes, and a prepared nested-path demo. The main UX weakness is that keyboard focus is lost after a correct answer advances to the next symbol.",
    "gpt-5-6-luna-v2":
      "Runnable v2 submission with a compact dependency-free workflow and passing controlled-runner evidence, but formally contract-failing. Rapid repeated keyboard submits and repeated suggestion clicks can skip symbols, and the visible/submission attribution is underspecified for the recorded GPT 5.6 Luna run.",
  },
  pl: {
    "gpt-5-4-high":
      "Działa, ale traci fokus pola między pytaniami. To poważny problem UX w ćwiczeniu opartym na klawiaturze.",
    "gpt-5-5-high":
      "Zwarty baseline w plain JavaScript bez istotnych problemów znalezionych w sprawdzonej ścieżce.",
    "gemini-3-5-flash-high":
      "Funkcjonalnie używalna, ale komendy instalacji i uruchomienia nie są udokumentowane. Komunikaty powodują też widoczne skoki layoutu.",
    "gemini-3-1-pro-high":
      "Wymagana podpowiedź klawiaturowa nie ujawnia odpowiedzi. Niekompletna jest też dokumentacja workflow i wymagana atrybucja.",
    "sonnet-4-6-thinking":
      "Mocny baseline z testami. Drobny problem UX: ujawnienie podpowiedzi w trybie sugestii przetasowuje pozycje przycisków.",
    "owl-alpha":
      "Funkcjonalnie używalna, z 35 statycznie znalezionymi przypadkami testowymi, ale formalnie niezgodna. Pętla ćwiczenia zawiera też kilka zbędnych tarć. Etykieta Owl Alpha została później ujawniona jako LongCat-2.0.",
    "gemma-4-26b":
      "Finalna aplikacja jest używalna, ale formalnie niezgodna i krucha pod kątem fokusu.",
    "nemotron-3-super":
      "Aplikacja się uruchamia, ale quiz nie przechodzi dalej niż pierwszy symbol. Miesza też wymagane tryby odpowiedzi i nie pokazuje używalnej atrybucji.",
    "laguna-m-1":
      "Działa, ale powtarzalne użycie ujawnia niedopracowany reset i obsługę fokusu.",
    "deepseek-v4-pro":
      "Funkcjonalnie mocna i wyjątkowo jawna w decyzjach produktowych. Formalny błąd jest wąski: brak dokumentacji komend instalacji, uruchomienia i testów.",
    "gpt-oss-120b":
      "Minimalny wynik crashuje, zanim da się sensownie sprawdzić zachowanie benchmarku.",
    "hy3-preview":
      "Finalna aplikacja działa, ale data powstaje w runtime, a udokumentowana komenda testów kończy się błędem.",
    "mimo-v2-5-pro":
      "Działa, z widocznymi skokami layoutu i bez resetu aktywnej próby.",
    "minimax-m3":
      "Funkcjonalnie mocna, z rzeczowymi notatkami implementacyjnymi. Formalny błąd to data generowana podczas startu lub buildu zamiast zachowanej daty implementacji.",
    "kimi-k2-6":
      "Działa, z problemem fokusu oraz sensownym potwierdzeniem przed opuszczeniem aktywnej próby.",
    "big-pickle-v2":
      "Run w Vite i plain JavaScript z czytelną dokumentacją oraz przechodzącymi testami, ale formalnie contract-failing. Szybkie powtórzenie Entera lub kliknięcia poprawnej opcji może pominąć symbol, a udokumentowane przełączanie języka w aktywnej próbie nie jest dostępne w UI.",
    "deepseek-v4-flash-v2":
      "Działający run z czytelną dokumentacją i przechodzącymi testami, ale formalnie contract-failing, bo wymagana atrybucja nie jest widoczna na początkowym ekranie setupu.",
    "mimo-v2-5-free-v2":
      "Czytelny run z przechodzącym runnerem i użyteczną dokumentacją, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a szybkie powtórne zatwierdzenie odpowiedzi z klawiatury może pominąć symbol.",
    "gemma-4-26b-v2":
      "Run w Vite i TypeScript z działającym statycznym artefaktem, ale formalnie contract-failing. Dependency policy blokuje runner, komenda testowa failuje, a interakcje klawiatury i sugestii są niedopracowane.",
    "laguna-m-1-v2":
      "Zwarty run bez buildu, z przechodzącym runnerem i czytelną dokumentacją, ale formalnie contract-failing. Powtórne kliknięcia hintu na jednym pytaniu zaniżają wynik, a stopka atrybucji nie przełącza się na polski.",
    "north-mini-code-free-v2":
      "Server-backed run z działającym UI i przechodzącym skryptem weryfikacji, ale formalnie contract-failing. Atrybucja jest generyczna i runtime-dated, użycie hintu blokuje możliwość zatwierdzenia odpowiedzi na to pytanie, a komenda testowa nie uruchamia dostarczonych testów w stylu Jest.",
    "owl-alpha-v2":
      "Mocny run bez buildu, z czytelną dokumentacją, przechodzącym controlled runnerem i dobrym zachowaniem w sprawdzonym flow. Restrykcyjnie, ale spójnie blokuje zmianę języka i reset podczas aktywnej próby. Etykieta Owl Alpha została później ujawniona jako LongCat-2.0.",
    "opus-4-6-thinking-v2":
      "Działający run z mocnymi testami i poprawnymi głównymi flow, ale formalnie contract-failing, bo wymagana stopka z atrybucją nie przełącza się na polski po zmianie języka UI. Powtarzające się wygaszanie (fade) całej karty na setupie i w quizie też przeszkadza.",
    "gemini-3-5-flash-high-v2":
      "Działający run z czytelną dokumentacją i przechodzącym controlled runnerem, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a szybkie powtórne zatwierdzenie odpowiedzi klawiaturą może pominąć symbole.",
    "sonnet-4-6-thinking-v2":
      "Działający run z mocnym evidence testowym, ale formalnie contract-failing. Widoczna stopka i dokumentacja submission wskazują Sonnet 4.5 zamiast zapisanego runu Sonnet 4.6 Thinking, a stopka atrybucji nie przełącza się na polski.",
    "gemini-3-1-pro-high-v2":
      "Działający run z czytelną dokumentacją i przechodzącym controlled runnerem, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a zmiana języka w aktywnej próbie ukrywa ujawnioną podpowiedź przed ukończeniem pytania.",
    "gpt-5-4-high-v2":
      "Mocny porównywalny run z czytelnym setupem, przechodzącym controlled runnerem oraz dobrym zachowaniem trybu klawiatury i sugestii. Główna słabość to jakość polskiej lokalizacji: UI jest przetłumaczony, ale wiele polskich znaków diakrytycznych uproszczono do ASCII.",
    "gpt-5-5-high-v2":
      "Mocny run w plain JavaScript. Zarchiwizowany artefakt implementuje wymagane tryby ćwiczenia, hint, finalny wynik i lokalizowaną atrybucję, ale nie zawiera dowodu z automatycznego runnera testów.",
    "gpt-oss-120b-v2":
      "Cienki statyczny output. Ładuje dane alfabetów do inspekcji, ale nie implementuje wymaganego flow quizu, trybów ćwiczenia, hintów, scoringu ani pełnej atrybucji.",
    "deepseek-v4-pro-v2":
      "Porównywalny run z czytelną dokumentacją, przechodzącym controlled runnerem i poprawnym głównym scoringiem. Funkcjonalnie jest solidny, ale interakcje są wyraźnie słabsze: opcje sugestii przetasowują się po feedbacku lub podpowiedzi, a fokus klawiatury ginie po przejściu dalej.",
    "glm-5-2-v2":
      "Porównywalny run z kompletnymi artefaktami submission, przechodzącym controlled runnerem i dobrym pokryciem logiki, danych, i18n, scoringu i atrybucji. Aplikacja ogólnie działa dobrze, ale przyciski sugestii przetasowują się po błędnej odpowiedzi i po podpowiedzi.",
    "kimi-k2-7-v2":
      "Mocny porównywalny run z kompletnymi artefaktami submission, przechodzącym controlled runnerem i czystym zachowaniem w sprawdzonych ścieżkach klawiatury, sugestii, hintu, zmiany języka, powtórnego submitu, pełnej próby i finalnego scoringu. Jedyna zauważona drobnostka UX to pole odpowiedzi wyższe od sąsiedniego przycisku.",
    "mimo-v2-5-pro-v2":
      "Działający zero-dependency run z przechodzącym controlled runnerem oraz działającymi podstawowymi flow klawiatury, sugestii i wyniku. Formalnie contract-failing, bo wymagana stopka atrybucji przekręca nazwisko Piotra Kacały, a zaobserwowane przez operatora zamieszanie w wyborze ustawień obniża ocenę jakościową.",
    "minimax-m3-v2":
      "Funkcjonalnie mocny zero-dependency run z kompletnymi artefaktami submission, 47 przechodzącymi testami node:test i czystym zachowaniem klawiatury, sugestii, aktywnej zmiany języka, pełnej próby i finalnego scoringu. Formalnie contract-failing, bo polski ekran setupu zostawia widoczne angielskie etykiety liczby symboli.",
    "qwen-3-7-max-v2":
      "Działający run z kompletną dokumentacją, przechodzącym controlled runnerem i ogólnie solidną aplikacją, ale formalnie contract-failing. Szybkie powtórne submity z klawiatury i kliknięcia sugestii mogą pomijać symbole; polski UI zostawia stopkę atrybucji po angielsku; a pokazana data implementacji kłóci się z dowodami z 2026 roku.",
    "nemotron-3-ultra-v2":
      "Działający run w Vite, ale formalnie contract-failing. Błędna odpowiedź w trybie sugestii blokuje wszystkie opcje i zatrzymuje progres na tym pytaniu, a stopka atrybucji zostaje po angielsku po przełączeniu UI na polski.",
    "hy3-preview-v2":
      "Działający run w Vite, ale formalnie contract-failing. Szybkie powtórne kliknięcia sugestii mogą pomijać symbole, atrybucja zapisuje nazwisko Piotra Kacały bez polskiego znaku, a polskie ćwiczenie nadal pokazuje angielski prefiks hintu.",
    "hy3-free-v2":
      "Pozytywnie zaskakujący run v2 w vanilla JavaScript: sprawdzony flow w przeglądarce jest czytelny, zlokalizowany, stabilny pod kątem fokusu i poprawnie używa stałych danych benchmarku. Formalnie pozostaje contract-failing, bo udokumentowana komenda testowa failuje w controlled runnerze, mimo że główne zachowanie aplikacji jest solidne.",
    "gpt-5-6-sol-v2":
      "Porównywalny run v2 z kompletnymi, trwałymi artefaktami, browser-native JavaScript bez zależności, przechodzącym controlled runnerem i czystymi targetowanymi probe'ami przeglądarkowymi. Dobrze obsługuje potwierdzenie wyjścia z runu, naturalnie lokalizuje polską stopkę i nie ma potwierdzonych błędów kontraktu.",
    "gpt-5-6-terra-v2":
      "Porównywalny run v2 z kompletnymi artefaktami, przechodzącym controlled runnerem, czystymi probe'ami trybu sugestii i finalnego scoringu oraz przygotowanym demo pod zagnieżdżoną ścieżkę. Główna słabość UX: fokus klawiatury ginie po przejściu poprawnej odpowiedzi do następnego symbolu.",
    "gpt-5-6-luna-v2":
      "Działający run v2 ze zwartym workflow bez zależności i przechodzącym controlled runnerem, ale formalnie contract-failing. Szybkie powtórne submity z klawiatury oraz kliknięcia sugestii mogą pomijać symbole, a widoczna i dostarczona atrybucja jest zbyt mało precyzyjna dla zapisanego runu GPT 5.6 Luna.",
  },
} as const satisfies Record<
  BenchmarkReportLang,
  Record<BenchmarkRunId, string>
>;

export function getPhoneticBenchmarkRunPath(runId: BenchmarkRunId): string {
  return `/phonetic-benchmark/runs/${runId}/`;
}

export function getPhoneticBenchmarkRunMarkdownPath(
  runId: BenchmarkRunId,
): string {
  return `/phonetic-benchmark/runs/${runId}/index.md`;
}

function getRuns(lang: BenchmarkReportLang): readonly BenchmarkRunCopy[] {
  return runData.map((run) => ({
    ...run,
    functionalRead: functionalReads[lang][run.id],
    screenshotPath:
      `/phonetic-benchmark/screenshots/${run.id}-quiz.png` as const,
    screenshotUrl: url(`/phonetic-benchmark/screenshots/${run.id}-quiz.png`),
    screenshotAlt:
      lang === "en"
        ? `Archived quiz state from the ${run.model} Phonetic Alphabet Trainer output.`
        : `Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez ${run.model}.`,
    screenshotCaption:
      lang === "en"
        ? `Archived quiz state for ${run.model}.`
        : `Archiwalny stan quizu dla ${run.model}.`,
    demoUrl: url(`/phonetic-benchmark/demos/${run.id}/index.html`),
    detailsUrl: url(getPhoneticBenchmarkRunPath(run.id)),
    markdownUrl: url(getPhoneticBenchmarkRunMarkdownPath(run.id)),
    observations: runObservations[run.id],
  }));
}

export const phoneticBenchmarkRuns = getRuns("en");
const englishRuns = phoneticBenchmarkRuns;
const polishRuns = getRuns("pl");

export function getBenchmarkRunGroupRuns(
  runs: readonly BenchmarkRunCopy[],
  benchmarkVersion: BenchmarkVersion,
): readonly BenchmarkRunCopy[] {
  return runs
    .filter((run) => run.benchmarkVersion === benchmarkVersion)
    .sort(
      (firstRun, secondRun) =>
        firstRun.executionOrder - secondRun.executionOrder,
    );
}

export const phoneticBenchmarkReports = {
  en: {
    lang: "en",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Qualitative review of archived web applications built from the Phonetic Alphabet Trainer benchmark specification.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "A qualitative review of AI-agent outputs for the Phonetic Alphabet Trainer benchmark, with versioned results, screenshots, and static demos.",
        type: "website",
        locale: "en_US",
        siteName: "Piotr Kacała",
        url: url("/phonetic-benchmark/"),
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-en.png",
          width: 1200,
          height: 630,
          alt: "Phonetic Benchmark Report — Piotr Kacała",
        },
      },
    },
    markdownPath: "/phonetic-benchmark/index.md",
    homeHref: "/",
    homeLabel: "Back to homepage",
    languageSwitcher: {
      ariaLabel: "Language switcher",
      currentLabel: "EN",
      currentLanguage: "en",
      alternateLabel: "PL",
      alternateHref: "/pl/phonetic-benchmark/",
      alternateLanguage: "pl",
    },
    eyebrow: "AI agent development benchmark",
    title: "Phonetic Benchmark Report",
    summary:
      "A qualitative review of 37 archived web applications built from the same Phonetic Alphabet Trainer brief. In the current batch, Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2, and Kimi K2.7 clear the contract; 16 other outputs remain inspectable failures. The original v1 snapshot stays preserved for historical comparison.",
    currentSummaryKicker: "Current outcome",
    currentSummaryHeading: "Why this benchmark exists",
    currentSummaryText:
      "This report records my tests of automated software delivery in a zero-code workflow. Instead of relying on general model leaderboards, I check how models handle precise documentation, QA constraints, localization, and repository evidence. The value is practical: I can compare real, repeatable outputs from my everyday workflow and see which models are worth using after the cost of corrections, extra tokens, and debugging time is included.",
    currentSummaryComparableLabel: "Comparable runs",
    currentSummaryResultsLabel: "Read current results",
    currentSummaryGalleryLabel: "Compare screenshots",
    benchmarkHeading: "What This Benchmark Is",
    benchmarkParagraphs: [
      "Each model received a docs-first package, fixed benchmark data, and a direct instruction to implement the web app. I review each run against the contract for its benchmark version and preserve the result as an archived demo.",
      "The v1 results are the original 15-run snapshot. The current results use the revised review procedure that standardizes test runner evidence and tracks localization quality more rigorously, and should be read as the current batch, not appended to a flat v1 leaderboard.",
      "The task is intentionally small. That makes it easier to inspect details that matter in real use: whether the main flow works, whether required behavior survives implementation, whether the interface feels stable, whether repetitive keyboard use is comfortable, and whether the repository remains understandable after the agent finishes.",
    ],
    readingHeading: "How To Read The Results",
    readingIntro: "The formal status comes first:",
    statusDescriptions: {
      comparable:
        "the implementation clears the contract well enough for qualitative comparison.",
      "contract-failing":
        "the application can be inspected, but at least one required part of the submission or product behavior is missing or incorrect.",
      unrunnable: "the implemented behavior cannot be meaningfully exercised.",
    },
    evidenceText:
      "A failed status is not a quality score. Failure types remain visible because they have different practical weight. Missing workflow documentation in an otherwise strong application is not the same problem as a quiz that cannot progress past its first question. Source LoC and automated test evidence are repository evidence: they help show the shape of an implementation, but they do not prove code quality or test coverage. When comparative scores are published in machine-readable exports, they apply only to current runs.",
    spotlightHeading: "Current Read Of The Batch",
    spotlightIntro:
      "These notes are my read of the table, not a universal ranking. For my workflow, the important question is whether a model can build a small web product and still respect a tight specification: implement every required behavior, preserve required evidence, and avoid inventing scope outside the contract.",
    spotlights: [
      {
        id: "contract-clearing-models",
        heading: "Models That Clear The Contract",
        paragraphs: [
          "In my tests, the current contract-clearing set is Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2, and Kimi K2.7. They are the right starting set for qualitative comparison because their remaining notes are product-quality observations rather than formal contract blockers.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
        ],
      },
      {
        id: "strongest-current-references",
        heading: "Strongest Current References",
        paragraphs: [
          "From the user side, my strongest current references are GPT 5.5 High, Kimi K2.7, and Owl Alpha. GPT 5.5 High has the best direct product feel in this batch despite missing automated-runner evidence, Kimi K2.7 is the cleanest documented current run, and Owl Alpha, later disclosed as LongCat-2.0, is an unusually strong result. A final human preference still matters because the benchmark deliberately keeps design taste and interaction feel inspectable rather than hiding them behind one score.",
        ],
        runIds: ["gpt-5-5-high-v2", "kimi-k2-7-v2", "owl-alpha-v2"],
      },
      {
        id: "positive-surprises",
        heading: "Positive Surprises",
        paragraphs: [
          "The less obvious names are part of the signal. At the time of these runs, DeepSeek V4 Flash and MiniMax M3 looked attractive for cost-sensitive work, but I count cost as more than token price: verbose output, loops, repeated corrections, and debugging time all matter. DeepSeek V4 Flash works well enough that its failure is mainly an attribution-footer issue on the setup screen. MiniMax M3 does not formally clear the contract because of Polish setup labels, but its zero-dependency implementation, passing tests, and observed interaction behavior are stronger than the status alone suggests.",
        ],
        runIds: ["owl-alpha-v2", "deepseek-v4-flash-v2", "minimax-m3-v2"],
      },
      {
        id: "gemini-31-vs-35",
        heading: "Gemini 3.1 Pro vs Gemini 3.5 Flash",
        paragraphs: [
          "The Gemini split is useful: Gemini 3.1 Pro High is less visually ambitious, but it follows the behavioral contract more carefully and is easier to trust in the reviewed product loop. Gemini 3.5 Flash High makes stronger design choices, yet the current run has repeated-submit behavior and attribution-localization misses that make it weaker as a spec-following implementation.",
        ],
        runIds: ["gemini-3-1-pro-high-v2", "gemini-3-5-flash-high-v2"],
      },
      {
        id: "qwen-date-evidence",
        heading: "Qwen's 2025 Date Is A Small Evidence Failure",
        paragraphs: [
          "Qwen3.7 Max produced a generally solid runnable app, but the footer and documentation say 2025 while the archived run evidence is from 2026. It is a small-looking detail with a real review cost: public artifacts need stable, believable provenance.",
        ],
        runIds: ["qwen-3-7-max-v2"],
      },
      {
        id: "polish-footer-declension",
        heading: "Polish Footer Declension Is A Useful Localization Detail",
        paragraphs: [
          'A search through the archived demos found the declined form "Piotra Kacały" in several Polish attribution footers, including GPT 5.5 High, Owl Alpha, Kimi K2.7, DeepSeek V4 Pro, and Big Pickle. That does not override formal failures, but it is a positive signal for Polish users because the footer reads like localized copy rather than a pasted English requirement.',
        ],
        runIds: [
          "gpt-5-5-high-v2",
          "owl-alpha-v2",
          "kimi-k2-7-v2",
          "deepseek-v4-pro-v2",
          "big-pickle-v2",
        ],
      },
    ],
    resultsHeading: "Results",
    resultsIntro:
      "The results are grouped by benchmark version. The short functional read is deliberately compact; selected cases below explain the distinctions that matter most. Screenshots and archived demos remain available so the applications can be inspected directly.",
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "Current Batch",
        intro: "The current runs use the revised review procedure.",
      },
      {
        benchmarkVersion: "v1",
        heading: "v1 Snapshot",
        intro:
          "The original 15 v1 runs remain preserved as a historical snapshot.",
      },
    ],
    tableLabels: {
      model: "Model",
      status: "Status",
      failureTypes: "Failure types",
      sourceLoc: "Source LoC",
      testCount: "Automated test evidence",
      functionalRead: "Functional read",
      evidenceDetails: "Repository evidence",
      details: "Details",
    },
    detailLabels: {
      id: "ID",
      benchmarkVersion: "Benchmark version",
      comparativeScore: "Comparative score",
      runDate: "Run date",
      stack: "Stack",
      markdownDetails: "Markdown details",
      screenshot: "Screenshot",
      demo: "Demo",
    },
    statusLabels: {
      comparable: "Comparable",
      "contract-failing": "Contract-failing",
      unrunnable: "Unrunnable",
    },
    failureTypeLabels: {
      "core behavior": "core behavior",
      "submission documentation": "submission documentation",
      attribution: "attribution",
      localization: "localization",
      "test workflow": "test workflow",
      "unrunnable output": "unrunnable output",
    },
    versionLabels: {
      v1: "v1",
      v2: "v2",
    },
    noneLabel: "none",
    detailsLabel: "Run details",
    demoLabel: "Open archived demo",
    metadataLabels: {
      benchmark: "Benchmark",
      runs: "runs",
      updated: "Updated",
      methodology: "Methodology",
      machineReadable: "Machine-readable data",
    },
    methodologyLabel: "Methodology",
    methodologyHref: phoneticBenchmarkMethodologyPath,
    resourceLinks: [
      {
        label: "JSON",
        href: phoneticBenchmarkResultsJsonPath,
      },
      {
        label: "CSV",
        href: phoneticBenchmarkResultsCsvPath,
      },
      {
        label: "Markdown",
        href: "/phonetic-benchmark/index.md",
      },
    ],
    runs: englishRuns,
    findingsHeading: "What The Runs Show",
    findings: [
      {
        heading:
          "The Current Batch Separates Contract-Clearing Runs From Inspectable Failures",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2, and Kimi K2.7 are the useful comparables in this batch. They clear the revised contract while still preserving visible review notes around active-run choices, Polish localization quality, interaction polish, and missing automated-test evidence.",
          "The remaining sixteen runs are not one kind of failure. Several are inspectable applications with narrow formal misses, while Big Pickle, Qwen3.7 Max, and gpt-oss-120b expose harder product behavior gaps. That distinction matters more than a flat pass/fail count.",
        ],
      },
      {
        heading: "Useful Results Are Not Limited To One Model Tier",
        paragraphs: [
          "Several models produced convincing small applications from the same docs-first package. The useful outputs are not limited to the most prominent or most expensive models. That makes experimentation with less obvious, cheaper, or open models a reasonable part of my zero-code workflow.",
          "For purchasing decisions, I care about total workflow cost rather than token price alone. A cheap model can become expensive if it generates unnecessary output, loops, misses instructions, or forces repeated debugging; a premium model is only worth keeping if it reduces that total cost.",
        ],
      },
      {
        heading:
          "Formal Compliance And Product Quality Are Different Questions",
        paragraphs: [
          "The current batch leaves six comparable submissions and sixteen contract-failing submissions, with no unrunnable output in this batch. The pattern has shifted from v1: most current failures are applications that can be inspected, not outputs that crash before the benchmark can be exercised.",
          "The v1 snapshot still shows why the split needs context. DeepSeek V4 Pro is functionally strong but fails because it does not document its install, run, and test commands. Nemotron 3 Super also fails, but for a much more important reason: its quiz cannot move past the first symbol.",
          "The contract matters because disciplined delivery matters. The failure type matters because not every miss has the same practical cost.",
        ],
      },
      {
        heading: "Obvious UX Needs Still Require Product Judgment",
        paragraphs: [
          "Keyboard focus remains the clearest repeated example, but the current batch adds more interaction-loop details: rapid repeated submits, hint state during language changes, scoring after repeated hints, and suggestion-option stability. The gaps are small in code and obvious in use.",
          "This is one reason to inspect the actual application rather than treating a generated repository as finished when it builds.",
        ],
      },
      {
        heading: "Public Rankings Do Not Fully Predict Workflow Fit",
        paragraphs: [
          "The current Gemini and Sonnet runs are useful cautions against reading general model rankings as product-workflow recommendations. Both Gemini current outputs are runnable and have controlled-runner evidence, but still fail the contract. Sonnet 4.6 Thinking has strong automated-test evidence and working core flows, yet fails on visible model identity and attribution localization.",
          "GLM-5.2 is a good example of why I run a localized benchmark instead of trusting broad coding scores alone. It performs well in public coding benchmarks and clears this contract, but in my scenario the suggestion buttons reshuffle after wrong answers and hints. That is a small implementation detail with real interaction cost in a repetitive training app.",
          "This is not a universal model ranking. Each result is one archived run against one benchmark version of a small product brief.",
        ],
      },
      {
        heading: "Localization Became A Contract-Level Signal",
        paragraphs: [
          "A repeated miss in the current batch is not translation of the main UI, but the required attribution footer staying English after the interface switches to Polish. GPT 5.4 High clears the contract while still showing a softer version of the same theme: the Polish UI is understandable, but many diacritics are simplified away.",
          "That makes localization a product-quality signal, not a cosmetic layer to check after the main flow works.",
        ],
      },
      {
        heading: "Technical Stack Insights: Vite vs. Plain JavaScript",
        paragraphs: [
          "Most models default to Vite and TypeScript (e.g., Sonnet, Gemini 3.1 Pro, Opus), reflecting current frontend industry standards. However, the cleanest and often most resilient applications (like Kimi K2.7, Owl Alpha v2, or GPT 5.5 High v2) were built in vanilla JavaScript, with zero build steps or external dependencies.",
          "For small products, this is a key lesson: zero-dependency means zero vulnerability to 'dependency rot'. Applications written directly using native browser DOM APIs will run unmodified 10 years from now, whereas those reliant on specific, older bundler setups may fail to build without maintenance in the future.",
        ],
      },
      {
        heading: "Screenshots And Demos Are Part Of The Evidence",
        paragraphs: [
          "Every model made different visual decisions. Some interfaces feel more polished than others, but much of that judgment is easier to inspect than to compress into a score. The archived demos are included so the reader can click through the applications and form a direct opinion.",
        ],
      },
    ],
    caseNotesHeading: "Selected Case Notes",
    caseNotes: [
      {
        id: "first-v2-batch",
        heading:
          "Current Batch: Six Comparables And Fourteen Contract Failures",
        paragraphs: [
          "In my review, Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2, and Kimi K2.7 are the useful comparables in this batch. My strongest user-facing reads are GPT 5.5 High, Kimi K2.7, and Owl Alpha. GLM-5.2 is still strong with one visible suggestion-ordering issue; DeepSeek V4 Pro clears the contract but has weaker interaction polish.",
          "I paid attention to the failure type, not just the status. DeepSeek V4 Flash, MiMo V2.5 Free, MiMo V2.5 Pro, MiniMax M3, and Qwen3.7 Max are all inspectable, but fail on attribution, localization, repeated-submit locking, or date evidence. Opus, Gemini 3.5, Sonnet, and Gemini 3.1 are runnable and test-backed but still miss required attribution, identity, or active-run behavior. Gemma 4 26B is blocked by dependency and test-command failures. Laguna M.1 Free has a passing runner but fails scoring and footer localization. North Mini Code Free blocks answer submission after a hint and has disconnected test evidence. Big Pickle and gpt-oss-120b show harder product failures in core behavior.",
        ],
        runIds: [
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
          "big-pickle-v2",
          "gpt-oss-120b-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
          "mimo-v2-5-pro-v2",
          "minimax-m3-v2",
          "qwen-3-7-max-v2",
        ],
      },
      {
        id: "reference-baselines",
        heading: "Current Comparables And Historical v1 Baselines",
        paragraphs: [
          "For my workflow, the current contract-clearing references are useful in different ways: GPT 5.5 High is the strongest direct user-side reference but lacks automated runner evidence, Kimi K2.7 is the cleanest documented current run, Owl Alpha is conservative and no-build, GPT 5.4 High has strong interaction behavior with localization polish issues, DeepSeek V4 Pro is solid but rougher in interaction polish, and GLM-5.2 is strong with suggestion-ordering friction.",
          "The earlier v1 baselines remain useful as historical references: GPT 5.5 High and Claude Sonnet 4.6 Thinking were strong in the original snapshot. Sonnet's run in the current batch is not a contract-clearing baseline because visible model identity and attribution localization fail, despite strong tests.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
          "gpt-5-5-high",
          "sonnet-4-6-thinking",
          "sonnet-4-6-thinking-v2",
        ],
      },
      {
        id: "deepseek-narrow-failure",
        heading: "DeepSeek V4 Pro Shows Why Versioned Runs Matter",
        paragraphs: [
          "The v1 DeepSeek V4 Pro run is a useful example of why failure types should remain visible. The app is functionally strong and its DECISIONS.md makes restrictive product choices reviewable, but the repository still fails the strict submission contract because it does not document install, run, and test commands.",
          "The DeepSeek V4 Pro run in the current batch clears the revised contract with passing runner evidence and correct core scoring behavior. It is still visibly weaker than the strongest comparables in the current batch because suggestion options reshuffle after feedback or hint reveal, and keyboard focus is lost after progression.",
        ],
        runIds: ["deepseek-v4-pro", "deepseek-v4-pro-v2"],
      },
      {
        id: "gpt-5-4-product-judgment",
        heading: "Product Judgment Beyond The Checklist: GPT 5.4 High",
        paragraphs: [
          "GPT 5.4 High clears the contract but loses input focus between questions. The app works, yet the keyboard-first training loop becomes irritating in repeated use. This is a product-quality issue, not a named contract failure, and it is exactly the kind of detail a manual review should catch.",
        ],
        runIds: ["gpt-5-4-high"],
      },
      {
        id: "gemini-hint-failure",
        heading: "Gemini Improved In v2 Without Clearing The Contract",
        paragraphs: [
          "The v1 Gemini 3.1 Pro High run has a hard required-behavior failure: the keyboard hint does not reveal the answer. In v2, the Gemini outputs are more usable and include controlled-runner evidence, but they still do not clear the contract.",
          "Gemini 3.5 Flash High v2 misses attribution localization and can skip symbols on rapid repeated keyboard submit. Gemini 3.1 Pro High v2 hides a revealed hint after an active language switch and also misses attribution localization.",
        ],
        runIds: [
          "gemini-3-1-pro-high",
          "gemini-3-5-flash-high-v2",
          "gemini-3-1-pro-high-v2",
        ],
      },
      {
        id: "blocked-and-unrunnable",
        heading: "A Blocked Flow And An Unrunnable Output",
        paragraphs: [
          "Nemotron 3 Super renders an interface, but its quiz cannot progress past the first correct answer. The v1 gpt-oss-120b output is more basic still: it crashes before its benchmark behavior can be meaningfully inspected.",
          "The v2 gpt-oss-120b output no longer crashes in the same way, but it only loads alphabet data for inspection and does not implement the required quiz flow. A visible shell is still not enough to call a generated product usable.",
        ],
        runIds: ["nemotron-3-super", "gpt-oss-120b", "gpt-oss-120b-v2"],
      },
    ],
    artifactHeading: "Archived Demos",
    artifactIntro:
      "Each demo is a static snapshot preserved for this report. These are benchmark submissions, not maintained products. The archive is intentionally complete: even weak outputs are useful evidence when comparing model behavior.",
    galleryText:
      "The screenshot gallery groups interfaces by benchmark version for direct visual comparison.",
    galleryHref: "/phonetic-benchmark/gallery/",
    galleryLabel: "Open screenshot gallery",
    closingHeading: "Closing",
    closingText:
      "The benchmark does not identify one universal winner. It shows a practical way to evaluate models for small zero-code product work: verify the contract, inspect the interaction loop, review the repository evidence, and click through the actual output. Model choice becomes easier when the comparison stays concrete.",
  },
  pl: {
    lang: "pl",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Jakościowy przegląd archiwalnych aplikacji webowych zbudowanych na podstawie specyfikacji benchmarku Phonetic Alphabet Trainer.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "Jakościowy przegląd wyników pracy agentów AI dla benchmarku Phonetic Alphabet Trainer, z wersjonowanymi wynikami, screenshotami i statycznymi demo.",
        type: "website",
        locale: "pl_PL",
        siteName: "Piotr Kacała",
        url: url("/pl/phonetic-benchmark/"),
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-pl.png",
          width: 1200,
          height: 630,
          alt: "Phonetic Benchmark Report — Piotr Kacała",
        },
      },
    },
    markdownPath: "/pl/phonetic-benchmark/index.md",
    homeHref: "/pl/",
    homeLabel: "Wróć do strony głównej",
    languageSwitcher: {
      ariaLabel: "Przełącznik języka",
      currentLabel: "PL",
      currentLanguage: "pl",
      alternateLabel: "EN",
      alternateHref: "/phonetic-benchmark/",
      alternateLanguage: "en",
    },
    eyebrow: "Benchmark pracy agentów AI",
    title: "Phonetic Benchmark Report",
    summary:
      "Jakościowy przegląd 37 archiwalnych aplikacji webowych zbudowanych z tego samego briefu Phonetic Alphabet Trainer. W aktualnym batchu kontrakt spełniają Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2 i Kimi K2.7; pozostałe 16 outputów z aktualnej serii to sprawdzalne błędy. Oryginalny snapshot v1 zostaje zachowany jako historyczne porównanie.",
    currentSummaryKicker: "Aktualny wynik",
    currentSummaryHeading: "Dlaczego ten benchmark powstał?",
    currentSummaryText:
      "Ten raport to zapis moich testów automatyzacji dostarczania kodu w workflow zero-code. Zamiast polegać na ogólnych rankingach, sprawdzam, jak modele radzą sobie z precyzyjną dokumentacją, ograniczeniami QA, lokalizacją i materiałem z repozytorium. Pokazuję tu realne, powtarzalne wyniki z mojego codziennego workflow i patrzę nie tylko na cenę za tokeny, ale też na koszt poprawek, zapętleń, nadmiarowych tokenów i debugowania.",
    currentSummaryComparableLabel: "Porównywalne runy",
    currentSummaryResultsLabel: "Przeczytaj aktualne wyniki",
    currentSummaryGalleryLabel: "Porównaj screenshoty",
    benchmarkHeading: "Czym Jest Ten Benchmark",
    benchmarkParagraphs: [
      "Każdy model dostał pakiet dokumentacji, stałe dane benchmarku i bezpośrednie polecenie implementacji aplikacji webowej. Każdą próbę sprawdzam według kontraktu właściwego dla swojej wersji benchmarku i zachowuję jako archiwalne demo.",
      "Wyniki v1 są oryginalnym snapshotem 15 prób. Aktualne wyniki używają zmienionej procedury przeglądu, która standaryzuje dowody z runnerów testowych i dokładniej śledzi jakość lokalizacji, i należy je czytać jako aktualny batch, a nie jako dopisanie do płaskiego leaderboardu v1.",
      "Zadanie jest celowo niewielkie. Dzięki temu łatwiej sprawdzić detale ważne w rzeczywistym użyciu: czy główna ścieżka działa, czy wymagane zachowania przetrwały implementację, czy interfejs jest stabilny, czy powtarzalna obsługa z klawiatury pozostaje wygodna i czy repozytorium nadal jest zrozumiałe po zakończeniu pracy agenta.",
    ],
    readingHeading: "Jak Czytać Wyniki",
    readingIntro: "Najpierw pokazuję status formalny:",
    statusDescriptions: {
      comparable:
        "implementacja spełnia kontrakt na tyle, żeby porównywać jej jakość i decyzje.",
      "contract-failing":
        "aplikację da się sprawdzić, ale brakuje przynajmniej jednego wymaganego elementu dostarczenia projektu albo zachowanie produktu jest niepoprawne.",
      unrunnable: "nie da się sensownie przejść zaimplementowanego zachowania.",
    },
    evidenceText:
      "Negatywny status nie jest oceną jakości. Typ problemu pozostaje widoczny, bo poszczególne błędy mają różną wagę praktyczną. Brak dokumentacji workflow w dobrej aplikacji nie jest tym samym problemem co quiz, który nie przechodzi dalej niż pierwsze pytanie. Liczba linii kodu źródłowego i liczba statycznie policzonych testów automatycznych są materiałem z repozytorium: pokazują kształt implementacji, ale same nie dowodzą jakości kodu ani pokrycia testami. Jeśli wynik porównawczy (comparative score) pojawia się w eksportach machine-readable, dotyczy wyłącznie aktualnych prób.",
    spotlightHeading: "Aktualny Odczyt Batcha",
    spotlightIntro:
      "Te notatki są moim odczytem tabeli, nie uniwersalnym rankingiem. Dla mojego workflow najważniejsze jest to, czy model potrafi zbudować mały produkt webowy i jednocześnie pilnować ścisłej specyfikacji: zrealizować wszystkie wymagane zachowania, zachować wymagane dowody i nie wychodzić poza ustalony zakres.",
    spotlights: [
      {
        id: "contract-clearing-models",
        heading: "Modele Spełniające Kontrakt",
        paragraphs: [
          "W moich testach aktualny zestaw spełniający kontrakt to Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2 i Kimi K2.7. To właściwy punkt startowy do porównania jakościowego, bo pozostałe uwagi przy tych runach są obserwacjami jakości produktu, a nie formalnymi blokadami kontraktu.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
        ],
      },
      {
        id: "strongest-current-references",
        heading: "Najmocniejsze Aktualne Referencje",
        paragraphs: [
          "Od strony użytkownika moje najmocniejsze aktualne referencje to GPT 5.5 High, Kimi K2.7 i Owl Alpha. GPT 5.5 High ma najlepsze bezpośrednie odczucie produktu w tej serii mimo braku dowodu z automatycznego runnera, Kimi K2.7 jest najczystszym udokumentowanym runem aktualnej serii, a Owl Alpha, później ujawniony jako LongCat-2.0, to wyjątkowo mocny wynik. Ostateczna preferencja człowieka nadal ma znaczenie, bo benchmark celowo zostawia design i odczucie interakcji do bezpośredniej inspekcji zamiast chować je za jedną liczbą.",
        ],
        runIds: ["gpt-5-5-high-v2", "kimi-k2-7-v2", "owl-alpha-v2"],
      },
      {
        id: "positive-surprises",
        heading: "Pozytywne Niespodzianki",
        paragraphs: [
          "Mniej oczywiste nazwy są częścią sygnału. W czasie tych testów DeepSeek V4 Flash i MiniMax M3 wyglądały atrakcyjnie przy pracy wrażliwej na koszt, ale koszt liczę szerzej niż cena za tokeny: znaczenie mają też rozwlekły output, zapętlenia, powtórne poprawki i czas debugowania. DeepSeek V4 Flash działa na tyle dobrze, że jego błąd dotyczy głównie stopki atrybucji na ekranie setupu. MiniMax M3 formalnie nie przechodzi przez polskie etykiety setupu, ale jego zero-dependency implementacja, przechodzące testy i sprawdzone zachowanie interakcji są mocniejsze, niż sugeruje sam status.",
        ],
        runIds: ["owl-alpha-v2", "deepseek-v4-flash-v2", "minimax-m3-v2"],
      },
      {
        id: "gemini-31-vs-35",
        heading: "Gemini 3.1 Pro vs Gemini 3.5 Flash",
        paragraphs: [
          "Podział Gemini jest użyteczny: Gemini 3.1 Pro High jest mniej ambitny wizualnie, ale dokładniej pilnuje kontraktu zachowania i łatwiej mu zaufać w sprawdzonej pętli produktu. Gemini 3.5 Flash High podejmuje mocniejsze decyzje projektowe, ale aktualny run ma problem z szybkim powtórnym submitowaniem i lokalizacją atrybucji, więc jest słabszy jako implementacja według specyfikacji.",
        ],
        runIds: ["gemini-3-1-pro-high-v2", "gemini-3-5-flash-high-v2"],
      },
      {
        id: "qwen-date-evidence",
        heading: "Data 2025 W Qwenie To Mały Błąd Evidence",
        paragraphs: [
          "Qwen3.7 Max przygotował ogólnie solidną działającą aplikację, ale stopka i dokumentacja wskazują 2025 rok, podczas gdy zarchiwizowany run pochodzi z 2026 roku. To pozornie drobny detal z realnym kosztem w przeglądzie: publiczne artefakty powinny mieć stabilne i wiarygodne pochodzenie.",
        ],
        runIds: ["qwen-3-7-max-v2"],
      },
      {
        id: "polish-footer-declension",
        heading: "Odmiana Nazwiska W Stopce To Dobry Sygnał Lokalizacji",
        paragraphs: [
          'Przeszukanie archiwalnych demo znalazło formę "Piotra Kacały" w kilku polskich stopkach atrybucji, m.in. w GPT 5.5 High, Owl Alpha, Kimi K2.7, DeepSeek V4 Pro i Big Pickle. To nie kasuje formalnych błędów, ale dla polskich użytkowników jest pozytywnym sygnałem: stopka brzmi jak zlokalizowany tekst, a nie wklejony angielski wymóg.',
        ],
        runIds: [
          "gpt-5-5-high-v2",
          "owl-alpha-v2",
          "kimi-k2-7-v2",
          "deepseek-v4-pro-v2",
          "big-pickle-v2",
        ],
      },
    ],
    resultsHeading: "Wyniki",
    resultsIntro:
      "Wyniki są pogrupowane według wersji benchmarku. Krótki opis funkcjonalny jest celowo zwięzły; wybrane przypadki poniżej wyjaśniają najważniejsze różnice. Screenshoty i archiwalne demo pozostają dostępne, żeby aplikacje można było sprawdzić bezpośrednio.",
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "Aktualna seria",
        intro:
          "Próby z tej serii używają zmienionej procedury przeglądu. To aktualny batch benchmarku.",
      },
      {
        benchmarkVersion: "v1",
        heading: "Snapshot v1",
        intro:
          "Oryginalne 15 prób v1 pozostaje zachowane jako historyczny snapshot.",
      },
    ],
    tableLabels: {
      model: "Model",
      status: "Status",
      failureTypes: "Typy problemów",
      sourceLoc: "Linie kodu źródłowego",
      testCount: "Dowody testów automatycznych",
      functionalRead: "Odczyt funkcjonalny",
      evidenceDetails: "Materiał z repozytorium",
      details: "Szczegóły",
    },
    detailLabels: {
      id: "ID",
      benchmarkVersion: "Wersja benchmarku",
      comparativeScore: "Wynik porównawczy",
      runDate: "Data próby",
      stack: "Stack",
      markdownDetails: "Szczegóły markdown",
      screenshot: "Zrzut ekranu",
      demo: "Demo",
    },
    statusLabels: {
      comparable: "Porównywalna",
      "contract-failing": "Niespełniająca kontraktu",
      unrunnable: "Niedziałająca",
    },
    failureTypeLabels: {
      "core behavior": "główne zachowanie",
      "submission documentation": "dokumentacja workflow",
      attribution: "atrybucja",
      localization: "lokalizacja",
      "test workflow": "workflow testów",
      "unrunnable output": "niedziałający wynik",
    },
    versionLabels: {
      v1: "v1",
      v2: "v2",
    },
    noneLabel: "brak",
    detailsLabel: "Szczegóły próby (EN)",
    demoLabel: "Otwórz archiwalne demo",
    metadataLabels: {
      benchmark: "Benchmark",
      runs: "prób",
      updated: "Aktualizacja",
      methodology: "Metodologia",
      machineReadable: "Dane machine-readable",
    },
    methodologyLabel: "Metodologia (EN)",
    methodologyHref: phoneticBenchmarkMethodologyPath,
    resourceLinks: [
      {
        label: "JSON (EN)",
        href: phoneticBenchmarkResultsJsonPath,
      },
      {
        label: "CSV (EN)",
        href: phoneticBenchmarkResultsCsvPath,
      },
      {
        label: "Markdown",
        href: "/pl/phonetic-benchmark/index.md",
      },
    ],
    runs: polishRuns,
    findingsHeading: "Co Pokazują Próby",
    findings: [
      {
        heading:
          "Aktualna seria oddziela wyniki spełniające kontrakt od sprawdzalnych błędów",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2 i Kimi K2.7 są użytecznymi porównywalnymi wynikami w tej serii. Przechodzą zmieniony kontrakt, ale wiążą się z uwagami w przeglądzie dotyczącymi decyzji w aktywnej próbie, jakości polskiej lokalizacji, dopracowania interakcji i braku dowodu z automatycznych testów.",
          "Pozostałe szesnaście wyników z aktualnej serii nie tworzy jednego typu porażki. Część to sprawdzalne aplikacje z wąskimi błędami formalnymi, a Big Pickle, Qwen3.7 Max i gpt-oss-120b pokazują twardsze braki w zachowaniu produktu. To rozróżnienie jest ważniejsze niż płaski wynik pass/fail.",
        ],
      },
      {
        heading: "Użyteczne Wyniki Nie Są Ograniczone Do Jednej Półki Modeli",
        paragraphs: [
          "Kilka modeli przygotowało przekonujące małe aplikacje na podstawie tego samego pakietu dokumentacji. Użyteczne wyniki nie są ograniczone do najbardziej rozpoznawalnych ani najdroższych modeli. Eksperymentowanie z mniej oczywistymi, tańszymi lub otwartymi modelami ma sens także w moim workflow zero-code.",
          "Przy decyzjach zakupowych patrzę na całkowity koszt workflow, nie tylko na cenę za tokeny. Tani model może stać się drogi, jeśli generuje niepotrzebnie dużo tekstu, zapętla się, gubi instrukcje albo wymusza wielokrotne debugowanie; drogi model ma sens tylko wtedy, gdy realnie zmniejsza ten całkowity koszt.",
        ],
      },
      {
        heading: "Zgodność Formalna I Jakość Produktu To Dwa Różne Pytania",
        paragraphs: [
          "Aktualna seria ma obecnie sześć wyników porównywalnych i szesnaście wyników niespełniających kontraktu, bez niedziałającego outputu w tej serii. Wzorzec przesunął się względem v1: większość błędów w aktualnej serii dotyczy aplikacji, które da się sprawdzić, a nie outputów crashujących przed przejściem benchmarku.",
          "Snapshot v1 nadal pokazuje, dlaczego ten podział wymaga kontekstu. DeepSeek V4 Pro jest funkcjonalnie mocny, ale nie dokumentuje komend instalacji, uruchomienia i testów. Nemotron 3 Super również nie spełnia kontraktu, ale z dużo ważniejszego powodu: quiz nie przechodzi dalej niż pierwszy symbol.",
          "Kontrakt jest ważny, bo uporządkowane dostarczenie projektu ma znaczenie. Typ problemu jest ważny, bo nie każdy błąd ma ten sam koszt praktyczny.",
        ],
      },
      {
        heading: "Oczywiste Potrzeby UX Nadal Wymagają Oceny Produktowej",
        paragraphs: [
          "Zarządzanie fokusem przy obsłudze z klawiatury nadal jest najlepszym powtarzającym się przykładem, ale aktualny batch dodaje więcej detali pętli interakcji: szybkie powtórne submitowanie, stan podpowiedzi po zmianie języka, scoring po wielokrotnym użyciu hintu i stabilność opcji w trybie sugestii. Różnice są niewielkie w kodzie i oczywiste podczas używania aplikacji.",
          "To jeden z powodów, dla których samo zbudowanie repozytorium nie powinno kończyć przeglądu wygenerowanego produktu.",
        ],
      },
      {
        heading:
          "Publiczne Rankingi Nie Przewidują W Pełni Dopasowania Do Workflow",
        paragraphs: [
          "Aktualne próby Gemini i Sonnet są dobrym ostrzeżeniem przed traktowaniem ogólnych rankingów modeli jako rekomendacji dla konkretnego workflow produktowego. Oba aktualne wyniki Gemini są uruchamialne i mają controlled-runner evidence, ale nadal nie spełniają kontraktu. Sonnet 4.6 Thinking ma mocne evidence z testów automatycznych i działające główne flow, a mimo to odpada na widocznej tożsamości modelu i lokalizacji atrybucji.",
          "GLM-5.2 to dobry przykład, dlaczego wolę lokalny benchmark od samych ogólnych wyników kodowania. Model dobrze wypada w publicznych benchmarkach i spełnia ten kontrakt, ale w moim scenariuszu przyciski sugestii przetasowują się po błędnych odpowiedziach i po użyciu hintu. To drobny detal implementacyjny z realnym kosztem interakcji w powtarzalnym ćwiczeniu.",
          "To nie jest uniwersalny ranking modeli. Każdy wynik jest jedną archiwalną próbą dla jednej wersji benchmarku i jednego niewielkiego briefu produktowego.",
        ],
      },
      {
        heading: "Lokalizacja Stała Się Sygnałem Kontraktowym",
        paragraphs: [
          "Powtarzający się błąd w aktualnym batchu nie dotyczy tłumaczenia głównego UI, tylko wymaganej stopki atrybucji, która zostaje po angielsku po przełączeniu interfejsu na polski. GPT 5.4 High spełnia kontrakt, ale pokazuje łagodniejszą wersję tego samego tematu: polski UI jest zrozumiały, lecz wiele znaków diakrytycznych uproszczono do ASCII.",
          "To sprawia, że lokalizacja jest sygnałem jakości produktu, a nie kosmetyczną warstwą do odhaczenia po działającym flow.",
        ],
      },
      {
        heading: "Wnioski Technologiczne: Vite kontra Plain JavaScript",
        paragraphs: [
          "Większość modeli automatycznie sięga po Vite i TypeScript (np. Sonnet, Gemini 3.1 Pro, Opus), co odzwierciedla standardy współczesnego frontendu. Jednak najczystsze i często najbardziej niezawodne aplikacje (jak Kimi K2.7, Owl Alpha v2 czy GPT 5.5 High v2) powstały w czystym JavaScripcie, bez żadnego procesu budowania i zewnętrznych zależności.",
          "Dla małych produktów to ważna lekcja: brak zależności (zero-dependency) oznacza odporność na starzenie się kodu. Aplikacje napisane bezpośrednio w DOM API przeglądarki będą działać bez zmian za 10 lat, podczas gdy te oparte na starych wersjach bundlerów mogą wymagać konserwacji przy próbie uruchomienia w przyszłości.",
        ],
      },
      {
        heading: "Screenshoty I Demo Są Częścią Materiału",
        paragraphs: [
          "Każdy model podjął inne decyzje wizualne. Niektóre interfejsy wyglądają lepiej od innych, ale dużą część tej oceny łatwiej sprawdzić niż zamknąć w jednej liczbie. Archiwalne demo pozwalają przeklikać aplikacje i wyrobić sobie własne zdanie.",
        ],
      },
    ],
    caseNotesHeading: "Wybrane Przypadki",
    caseNotes: [
      {
        id: "first-v2-batch",
        heading:
          "Aktualna seria: Sześć Wyników Porównywalnych I Czternaście Contract Failure",
        paragraphs: [
          "W moim przeglądzie Owl Alpha, GPT 5.4 High, GPT 5.5 High, DeepSeek V4 Pro, GLM-5.2 i Kimi K2.7 są użytecznymi porównywalnymi wynikami w aktualnym batchu. Moje najmocniejsze odczyty od strony użytkownika to GPT 5.5 High, Kimi K2.7 i Owl Alpha. GLM-5.2 nadal jest mocny, z jednym widocznym problemem kolejności sugestii; DeepSeek V4 Pro przechodzi kontrakt, ale ma słabsze dopracowanie interakcji.",
          "Zwróciłem uwagę na typ błędu, nie tylko na sam status. DeepSeek V4 Flash, MiMo V2.5 Free, MiMo V2.5 Pro, MiniMax M3 i Qwen3.7 Max są sprawdzalne, ale failują na atrybucji, lokalizacji, blokowaniu powtórnych submitów albo dowodzie daty. Opus, Gemini 3.5, Sonnet i Gemini 3.1 są uruchamialne i mają evidence testowe, ale nadal mijają wymagania atrybucji, tożsamości albo zachowania aktywnej próby. Gemma 4 26B blokuje się na dependency i failującej komendzie testowej. Laguna M.1 Free ma przechodzący runner, ale failuje scoring i lokalizację stopki. North Mini Code Free blokuje możliwość zatwierdzenia odpowiedzi po użyciu hintu i ma rozłączone evidence testowe. Big Pickle i gpt-oss-120b mają twardsze błędy w głównym zachowaniu produktu.",
        ],
        runIds: [
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
          "big-pickle-v2",
          "gpt-oss-120b-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
          "mimo-v2-5-pro-v2",
          "minimax-m3-v2",
          "qwen-3-7-max-v2",
        ],
      },
      {
        id: "reference-baselines",
        heading: "Aktualne Wyniki Porównywalne I Historyczne Baseline'y v1",
        paragraphs: [
          "Dla mojego workflow aktualne referencje spełniające kontrakt są użyteczne na różne sposoby: GPT 5.5 High jest najmocniejszą bezpośrednią referencją od strony użytkownika, ale nie ma dowodu z automatycznego runnera, Kimi K2.7 jest najczystszym udokumentowanym runem aktualnej serii, Owl Alpha jest konserwatywna i bez buildu, GPT 5.4 High ma mocne zachowanie interakcji, ale boryka się z problemami jakości lokalizacji, DeepSeek V4 Pro jest solidny, ale mniej dopracowany interakcyjnie, a GLM-5.2 jest mocny z tarciem w kolejności sugestii.",
          "Wcześniejsze baseline'y v1 pozostają użyteczne jako historyczne punkty odniesienia: GPT 5.5 High i Claude Sonnet 4.6 Thinking były mocne w oryginalnym snapshotcie. Run Sonnet v2 nie jest baseline'em spełniającym kontrakt, bo failuje widoczna tożsamość modelu i lokalizacja atrybucji, mimo mocnych testów.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "deepseek-v4-pro-v2",
          "glm-5-2-v2",
          "kimi-k2-7-v2",
          "gpt-5-5-high",
          "sonnet-4-6-thinking",
          "sonnet-4-6-thinking-v2",
        ],
      },
      {
        id: "deepseek-narrow-failure",
        heading: "DeepSeek V4 Pro Pokazuje Znaczenie Wersjonowanych Prób",
        paragraphs: [
          "Run v1 DeepSeek V4 Pro dobrze pokazuje, dlaczego warto zachować widoczne typy problemów. Aplikacja jest funkcjonalnie mocna, a DECISIONS.md pozwala ocenić restrykcyjne decyzje produktowe, ale repozytorium nadal nie spełnia rygorystycznego kontraktu dostarczenia projektu, bo nie dokumentuje komend instalacji, uruchomienia i testów.",
          "Run DeepSeek V4 Pro z aktualnej serii przechodzi zmieniony kontrakt, ma passing runner evidence i poprawne główne zachowanie scoringu. Nadal jest widocznie słabszy od najlepszych aktualnych prób, bo opcje sugestii przetasowują się po feedbacku lub podpowiedzi, a fokus klawiatury ginie po przejściu dalej.",
        ],
        runIds: ["deepseek-v4-pro", "deepseek-v4-pro-v2"],
      },
      {
        id: "gpt-5-4-product-judgment",
        heading: "Ocena Produktowa Poza Checklistą: GPT 5.4 High",
        paragraphs: [
          "GPT 5.4 High spełnia kontrakt, ale traci fokus pola odpowiedzi między pytaniami. Aplikacja działa, jednak powtarzalne ćwiczenie oparte na klawiaturze staje się irytujące. To problem jakości produktu, a nie nazwany błąd kontraktu. Właśnie takie detale powinien wyłapywać ręczny przegląd.",
        ],
        runIds: ["gpt-5-4-high"],
      },
      {
        id: "gemini-hint-failure",
        heading:
          "Gemini Poprawia Się w Aktualnej Serii, Ale Nie Spełnia Kontraktu",
        paragraphs: [
          "Run v1 Gemini 3.1 Pro High ma twardy błąd wymaganego zachowania: podpowiedź klawiaturowa nie ujawnia odpowiedzi. W aktualnym batchu wyniki Gemini są bardziej używalne i mają controlled-runner evidence, ale nadal nie spełniają kontraktu.",
          "Gemini 3.5 Flash High nie lokalizuje atrybucji i może pomijać symbole przy szybkim powtórnym submitowaniu z klawiatury. Gemini 3.1 Pro High ukrywa ujawnioną podpowiedź po zmianie języka w aktywnej próbie i również nie lokalizuje atrybucji.",
        ],
        runIds: [
          "gemini-3-1-pro-high",
          "gemini-3-5-flash-high-v2",
          "gemini-3-1-pro-high-v2",
        ],
      },
      {
        id: "blocked-and-unrunnable",
        heading: "Zablokowana Ścieżka I Niedziałający Wynik",
        paragraphs: [
          "Nemotron 3 Super renderuje interfejs, ale quiz nie przechodzi dalej po pierwszej poprawnej odpowiedzi. Output v1 gpt-oss-120b jest jeszcze słabszym przypadkiem: crashuje, zanim da się sensownie sprawdzić zachowanie benchmarku.",
          "Output v2 gpt-oss-120b nie crashuje w ten sam sposób, ale tylko ładuje dane alfabetów do inspekcji i nie implementuje wymaganego flow quizu. Widoczny shell nadal nie wystarcza, żeby uznać wygenerowany produkt za używalny.",
        ],
        runIds: ["nemotron-3-super", "gpt-oss-120b", "gpt-oss-120b-v2"],
      },
    ],
    artifactHeading: "Archiwalne Demo",
    artifactIntro:
      "Każde demo jest statycznym snapshotem zachowanym dla tego raportu. To wynik benchmarku, a nie utrzymywany produkt. Archiwum jest celowo kompletne: także słabe wyniki są użytecznym materiałem przy porównywaniu zachowania modeli.",
    galleryText:
      "Galeria screenshotów grupuje interfejsy według wersji benchmarku, żeby można było bezpośrednio porównać decyzje wizualne.",
    galleryHref: "/pl/phonetic-benchmark/gallery/",
    galleryLabel: "Otwórz galerię screenshotów",
    closingHeading: "Zakończenie",
    closingText:
      "Benchmark nie wskazuje jednego uniwersalnego zwycięzcy. Pokazuje praktyczny sposób oceny modeli do małych projektów zero-code: sprawdzić kontrakt, przejść główną pętlę interakcji, przejrzeć materiał w repozytorium i przeklikać faktyczny wynik. Wybór modelu staje się prostszy, gdy porównanie pozostaje konkretne.",
  },
} as const satisfies Record<BenchmarkReportLang, BenchmarkReportCopy>;

export const phoneticBenchmarkGalleries = {
  en: {
    lang: "en",
    metadata: {
      title: "Phonetic Benchmark Screenshot Gallery — Piotr Kacała",
      description:
        "Versioned screenshot gallery of archived web applications built from the Phonetic Alphabet Trainer benchmark specification.",
      openGraph: {
        title: "Phonetic Benchmark Screenshot Gallery",
        description:
          "Archived Phonetic Benchmark interfaces grouped by benchmark version for direct visual comparison.",
        type: "website",
        locale: "en_US",
        siteName: "Piotr Kacała",
        url: url("/phonetic-benchmark/gallery/"),
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-en.png",
          width: 1200,
          height: 630,
          alt: "Phonetic Benchmark Screenshot Gallery — Piotr Kacała",
        },
      },
    },
    homeHref: "/",
    homeLabel: "Back to homepage",
    reportHref: "/phonetic-benchmark/",
    reportLabel: "Back to Phonetic Benchmark report",
    languageSwitcher: {
      ariaLabel: "Language switcher",
      currentLabel: "EN",
      currentLanguage: "en",
      alternateLabel: "PL",
      alternateHref: "/pl/phonetic-benchmark/gallery/",
      alternateLanguage: "pl",
    },
    eyebrow: "Phonetic Benchmark screenshot archive",
    title: "Phonetic Benchmark Screenshot Gallery",
    introParagraphs: [
      "These screenshots show how different models interpreted the same product brief. The differences in layout, color, density, and polish are part of the benchmark material.",
      "The gallery keeps every run visible by benchmark version for direct visual comparison. It is not a ranking and does not identify a winner. The status shown with each interface is the formal report status, not a visual score.",
    ],
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "v2 Batch",
        intro: "Current benchmark batch, shown before the original snapshot.",
      },
      {
        benchmarkVersion: "v1",
        heading: "v1 Snapshot",
        intro: "Original 15-run snapshot preserved for historical comparison.",
      },
    ],
    detailLabels: {
      status: "Status",
      sourceLoc: "Source LoC",
      testCount: "Automated test evidence",
    },
    statusLabels: phoneticBenchmarkReports.en.statusLabels,
    versionLabels: phoneticBenchmarkReports.en.versionLabels,
    demoLabel: "Open archived demo",
    runs: englishRuns,
  },
  pl: {
    lang: "pl",
    metadata: {
      title: "Galeria Screenshotów Phonetic Benchmark — Piotr Kacała",
      description:
        "Wersjonowana galeria screenshotów archiwalnych aplikacji webowych zbudowanych na podstawie specyfikacji benchmarku Phonetic Alphabet Trainer.",
      openGraph: {
        title: "Galeria Screenshotów Phonetic Benchmark",
        description:
          "Archiwalne interfejsy Phonetic Benchmark pogrupowane według wersji benchmarku do bezpośredniego porównania wizualnego.",
        type: "website",
        locale: "pl_PL",
        siteName: "Piotr Kacała",
        url: url("/pl/phonetic-benchmark/gallery/"),
        image: {
          url: "https://piotrkacala.pl/og/piotr-kacala-pl.png",
          width: 1200,
          height: 630,
          alt: "Galeria Screenshotów Phonetic Benchmark — Piotr Kacała",
        },
      },
    },
    homeHref: "/pl/",
    homeLabel: "Wróć do strony głównej",
    reportHref: "/pl/phonetic-benchmark/",
    reportLabel: "Wróć do raportu Phonetic Benchmark",
    languageSwitcher: {
      ariaLabel: "Przełącznik języka",
      currentLabel: "PL",
      currentLanguage: "pl",
      alternateLabel: "EN",
      alternateHref: "/phonetic-benchmark/gallery/",
      alternateLanguage: "en",
    },
    eyebrow: "Archiwum screenshotów Phonetic Benchmark",
    title: "Galeria Screenshotów Phonetic Benchmark",
    introParagraphs: [
      "Te screenshoty pokazują, jak różne modele zinterpretowały ten sam brief produktowy. Różnice w layoucie, kolorach, gęstości i poziomie dopracowania są częścią materiału benchmarkowego.",
      "Galeria pokazuje każdą próbę według wersji benchmarku, żeby ułatwić bezpośrednie porównanie wizualne. To nie jest ranking i nie wskazuje zwycięzcy. Status przy interfejsie jest formalnym statusem z raportu, a nie oceną warstwy wizualnej.",
    ],
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "Aktualna seria",
        intro:
          "Aktualny batch benchmarku, pokazany przed oryginalnym snapshotem.",
      },
      {
        benchmarkVersion: "v1",
        heading: "Snapshot v1",
        intro:
          "Oryginalny snapshot 15 prób zachowany do porównania historycznego.",
      },
    ],
    detailLabels: {
      status: "Status",
      sourceLoc: "Linie kodu źródłowego",
      testCount: "Dowody testów automatycznych",
    },
    statusLabels: phoneticBenchmarkReports.pl.statusLabels,
    versionLabels: phoneticBenchmarkReports.pl.versionLabels,
    demoLabel: "Otwórz archiwalne demo",
    runs: polishRuns,
  },
} as const satisfies Record<BenchmarkReportLang, BenchmarkGalleryCopy>;

export function getBenchmarkVersionedRuns(
  runs: readonly BenchmarkRunCopy[],
): readonly BenchmarkRunCopy[] {
  return phoneticBenchmarkReports.en.resultGroups.flatMap((group) =>
    getBenchmarkRunGroupRuns(runs, group.benchmarkVersion),
  );
}

export function getPhoneticBenchmarkMarkdownUrl(
  lang: BenchmarkReportLang,
): string {
  return url(phoneticBenchmarkReports[lang].markdownPath);
}

export const phoneticBenchmarkInterpretationLimitations = [
  "Each result is one archived run for one model label and one benchmark version of a small browser-app task.",
  "The v1 run records did not consistently capture provider, gateway, canonical API model ID, editor or agent interface, or inference effort.",
  "Missing inference-effort metadata must not be interpreted as a known provider default.",
  "The report compares observed outputs under the workflows used for these runs, not isolated model performance under controlled inference parameters.",
  "The report is a qualitative product review, not a universal model ranking.",
] as const;

export const phoneticBenchmarkMethodology = {
  metadata: {
    title: "Phonetic Benchmark Methodology — Piotr Kacała",
    description:
      "Public methodology for the versioned Phonetic Benchmark AI-agent web application review.",
    openGraph: {
      title: "Phonetic Benchmark Methodology",
      description:
        "Scope, review rules, limitations, and repository-evidence definitions for the versioned Phonetic Benchmark report.",
      type: "website",
      locale: "en_US",
      siteName: "Piotr Kacała",
      url: url(phoneticBenchmarkMethodologyPath),
      image: {
        url: "https://piotrkacala.pl/og/piotr-kacala-en.png",
        width: 1200,
        height: 630,
        alt: "Phonetic Benchmark Methodology — Piotr Kacała",
      },
    },
  },
  markdownPath: phoneticBenchmarkMethodologyMarkdownPath,
  reportHref: "/phonetic-benchmark/",
  reportLabel: "Back to Phonetic Benchmark report",
  eyebrow: "Phonetic Benchmark methodology",
  title: "Methodology",
  summary:
    "This page documents how the public versioned report is assembled and how its fields should be interpreted. It is intentionally narrower than a controlled model evaluation.",
  sourcePackageLabel: "Open the public benchmark package",
  sourcePackageUrl: phoneticBenchmarkPublicPackageUrl,
  sections: [
    {
      heading: "Purpose and Intended Use",
      paragraphs: [
        "The Phonetic Benchmark is a small web-application implementation benchmark. It uses a two-layer review model: first verify whether an implementation can be meaningfully compared, then review what it reveals about product judgment, requirement preservation, UX, testing, and delivery quality.",
        "This is not a numeric leaderboard. Each result is one archived run for one model label and one benchmark version of a small product brief, so no run-details page should be read as a general review of a model.",
      ],
    },
    {
      heading: "Benchmark Task and Package",
      paragraphs: [
        "Each model received a docs-first package, fixed benchmark data, and a direct instruction to implement a small Phonetic Alphabet Trainer web application. The resulting repositories were reviewed against the product contract for their benchmark version.",
        "Archived demos are preserved static snapshots of the reviewed outputs, not maintained products.",
        "The report compares observed outputs from the agent workflows used for these runs. It does not claim to isolate model quality under controlled inference parameters.",
      ],
    },
    {
      heading: "Run Status",
      items: [
        "`comparable`: the implementation clears the contract well enough for qualitative comparison.",
        "`contract-failing`: the application can be inspected, but at least one required submission or product behavior is missing or incorrect.",
        "`unrunnable`: the implemented behavior cannot be meaningfully exercised.",
      ],
    },
    {
      heading: "Failure Types",
      items: [
        "`core behavior`: a required product behavior is missing or incorrect.",
        "`submission documentation`: required install, run, or test workflow documentation is incomplete.",
        "`attribution`: required visible attribution details are missing or incorrect.",
        "`test workflow`: the documented automated test workflow does not complete successfully.",
        "`unrunnable output`: the generated application cannot be meaningfully exercised.",
      ],
    },
    {
      heading: "Contract v1",
      paragraphs: [
        "The benchmark contract keeps the implementation freedom broad while requiring the core learning flow and delivery details to remain inspectable.",
      ],
      items: [
        "A browser-based phonetic-alphabet learning application with a Node.js project workflow and `package.json`.",
        "Documented install and run commands, plus documented test commands when automated tests are included.",
        "Visible attribution to Piotr Kacała, `piotrkacala.pl`, the implementing model name and version, and a fixed implementation date.",
        "Polish and NATO phonetic alphabets, plus Polish and English interface languages.",
        "Exactly two exercise modes: keyboard and four-option suggestion, separated within a run.",
        "One full selected alphabet per randomized run, with progression only after a correct answer.",
        "Fixed suggestion-mode option sets from benchmark data, randomized button order, hint reveal without auto-completion, and deterministic final scoring.",
        "A final result screen with score, alphabet, and mode.",
      ],
    },
    {
      heading: "Contract v2",
      paragraphs: [
        "The v2 procedure keeps the same small product task and evidence-first review shape, but treats the revised contract as a separate benchmark version.",
      ],
      items: [
        "Do not merge v2 outputs into the v1 leaderboard or infer v1 comparative scores.",
        "Record v2 run facts without private workflow metrics.",
        "Keep run-level benchmark version visible in HTML, markdown, JSON, CSV, and structured data.",
        "Publish v2 comparative score only for v2 runs when available.",
      ],
    },
    {
      heading: "Run Procedure",
      items: [
        "Give each model the same docs-first package, fixed benchmark data, and direct implementation instruction.",
        "Preserve the resulting repository as an archived static demo snapshot.",
        "Record the run date, model label, formal status, failure types, stack summary, source LoC, static automated test count, screenshot, and compact functional read.",
      ],
    },
    {
      heading: "Manual Review Procedure",
      items: [
        "Check documented install and run workflow, package scripts, and required visible attribution.",
        "Inspect both UI languages, setup flow, and full-alphabet run progression where practical.",
        "Check randomized symbol order and keyboard-mode trimming, case insensitivity, and diacritic significance.",
        "Check suggestion mode for exactly four buttons, fixed repository option data, randomized display order, and strict separation from keyboard mode.",
        "Check hint reveal without auto-completion, deterministic scoring, and the final result screen.",
        "Use focused source inspection and automated checks for combinatorial cases that are expensive to click through manually.",
        "Review open product areas such as reset behavior and active-run language switching for coherence without silently turning them into contract failures.",
      ],
    },
    {
      heading: "Source LoC Counting Rule",
      paragraphs: [
        "Source LoC describes the shape of a submission. It is approximate repository evidence, not a quality score.",
      ],
      items: [
        "Count implementation source, tests, configuration files, and authored HTML and CSS files.",
        "Exclude generated build output such as `dist`, dependency directories such as `node_modules`, lockfiles, benchmark documentation copied from the starter package, and benchmark data copied from the starter package.",
      ],
    },
    {
      heading: "Static Automated Test Counting Rule",
      paragraphs: [
        "Static automated test counts describe the shape of a submission. They do not prove test coverage, assertion quality, executed test count, passing test count, or successful test execution.",
      ],
      items: [
        "Static automated tests count direct authored `it(...)` and `test(...)` declarations in JavaScript and TypeScript files.",
        "The static test count excludes `dist`, `node_modules`, generated code, dependency code, `describe(...)`, placeholder scripts, inferred loop or table expansions, and variants such as `test.skip`, `test.todo`, and `test.each`.",
        "Successful execution of a documented test command is recorded separately from the static test count.",
      ],
    },
    {
      heading: "Interpretation Limits",
      items: phoneticBenchmarkInterpretationLimitations,
    },
    {
      heading: "v2 Run Manifest",
      paragraphs: [
        "The v2 revision should keep run metadata explicit before implementation starts.",
      ],
      items: [
        "Benchmark version and run ID.",
        "Display label and canonical model ID.",
        "Provider or gateway.",
        "Editor or agent interface.",
        "Requested effort and effective effort when exposed, with explicit `unknown` otherwise.",
        "Run date and baseline commit.",
      ],
    },
    {
      heading: "Version History",
      items: [
        "`v1`: one archived run per model for the same small browser-app task, with qualitative manual review and repository-evidence fields.",
        "`v2`: revised review procedure with explicit run-level versioning, private workflow metrics excluded, and optional v2-only comparative score.",
      ],
    },
  ],
} as const satisfies BenchmarkMethodologyCopy;

export interface PhoneticBenchmarkResultsData {
  schemaVersion: "1";
  benchmark: {
    name: "Phonetic Benchmark";
    coveredBenchmarkVersions: readonly BenchmarkVersion[];
    currentBenchmarkVersion: BenchmarkVersion;
    publishedDate: string;
    updatedDate: string;
    coveredThroughDate: string;
    reportUrl: string;
    methodologyUrl: string;
    publicBenchmarkPackageUrl: string;
    interpretationLimitations: readonly string[];
  };
  runs: readonly (BenchmarkRunCopy & {
    interpretationLimitations: readonly string[];
  })[];
}

export function getPhoneticBenchmarkResultsData(): PhoneticBenchmarkResultsData {
  return {
    schemaVersion: phoneticBenchmarkMetadata.schemaVersion,
    benchmark: {
      name: "Phonetic Benchmark",
      coveredBenchmarkVersions:
        phoneticBenchmarkMetadata.coveredBenchmarkVersions,
      currentBenchmarkVersion:
        phoneticBenchmarkMetadata.currentBenchmarkVersion,
      publishedDate: phoneticBenchmarkMetadata.publishedDate,
      updatedDate: phoneticBenchmarkMetadata.updatedDate,
      coveredThroughDate: phoneticBenchmarkMetadata.coveredThroughDate,
      reportUrl: url("/phonetic-benchmark/"),
      methodologyUrl: url(phoneticBenchmarkMethodologyPath),
      publicBenchmarkPackageUrl: phoneticBenchmarkPublicPackageUrl,
      interpretationLimitations: phoneticBenchmarkInterpretationLimitations,
    },
    runs: getBenchmarkVersionedRuns(phoneticBenchmarkRuns).map((run) => ({
      ...run,
      interpretationLimitations: phoneticBenchmarkInterpretationLimitations,
    })),
  };
}

export function getPhoneticBenchmarkResultsJsonUrl(): string {
  return url(phoneticBenchmarkResultsJsonPath);
}

export function getPhoneticBenchmarkResultsCsvUrl(): string {
  return url(phoneticBenchmarkResultsCsvPath);
}

export function getPhoneticBenchmarkMethodologyMarkdownUrl(): string {
  return url(phoneticBenchmarkMethodologyMarkdownPath);
}

export function getPhoneticBenchmarkRun(
  runId: BenchmarkRunId,
): BenchmarkRunCopy {
  const run = phoneticBenchmarkRuns.find((candidate) => candidate.id === runId);

  if (!run) {
    throw new Error(`Missing benchmark run: ${runId}`);
  }

  return run;
}

export type JsonLdSchema = Record<string, unknown>;

function getDatasetSchema(): JsonLdSchema {
  const resultsJsonUrl = getPhoneticBenchmarkResultsJsonUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${resultsJsonUrl}#dataset`,
    name: "Phonetic Benchmark versioned results",
    description:
      "Qualitative review data for archived AI-agent web applications built from the Phonetic Alphabet Trainer benchmark specification.",
    url: resultsJsonUrl,
    version: phoneticBenchmarkMetadata.coveredBenchmarkVersions.join(", "),
    datePublished: phoneticBenchmarkMetadata.publishedDate,
    dateModified: phoneticBenchmarkMetadata.updatedDate,
    temporalCoverage: `${getEarliestRunDate()}/${phoneticBenchmarkMetadata.coveredThroughDate}`,
    creator: {
      "@type": "Person",
      name: siteProfile.name,
      url: siteProfile.siteUrl,
    },
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: resultsJsonUrl,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: getPhoneticBenchmarkResultsCsvUrl(),
      },
    ],
  };
}

export function getPhoneticBenchmarkReportSchemas(
  report: BenchmarkReportCopy,
): readonly JsonLdSchema[] {
  const datasetSchema = getDatasetSchema();

  return [
    datasetSchema,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: report.title,
      description: report.metadata.description,
      url: report.metadata.openGraph.url,
      inLanguage: report.lang,
      datePublished: phoneticBenchmarkMetadata.publishedDate,
      dateModified: phoneticBenchmarkMetadata.updatedDate,
      author: {
        "@type": "Person",
        name: siteProfile.name,
        url: siteProfile.siteUrl,
      },
      mainEntity: {
        "@id": datasetSchema["@id"],
      },
    },
  ];
}

export function getPhoneticBenchmarkMethodologySchemas(): readonly JsonLdSchema[] {
  const datasetSchema = getDatasetSchema();

  return [
    datasetSchema,
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: phoneticBenchmarkMethodology.title,
      description: phoneticBenchmarkMethodology.metadata.description,
      url: phoneticBenchmarkMethodology.metadata.openGraph.url,
      inLanguage: "en",
      datePublished: phoneticBenchmarkMetadata.publishedDate,
      dateModified: phoneticBenchmarkMetadata.updatedDate,
      isPartOf: {
        "@type": "Article",
        url: url("/phonetic-benchmark/"),
        name: "Phonetic Benchmark Report",
      },
      mainEntity: {
        "@id": datasetSchema["@id"],
      },
      author: {
        "@type": "Person",
        name: siteProfile.name,
        url: siteProfile.siteUrl,
      },
    },
  ];
}

export function getPhoneticBenchmarkRunSchemas(
  run: BenchmarkRunCopy,
): readonly JsonLdSchema[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${run.model} — Phonetic Benchmark ${run.benchmarkVersion} run details`,
      description: run.functionalRead,
      url: run.detailsUrl,
      inLanguage: "en",
      datePublished: run.runDate,
      dateModified: phoneticBenchmarkMetadata.updatedDate,
      isPartOf: {
        "@type": "Article",
        url: url("/phonetic-benchmark/"),
        name: "Phonetic Benchmark Report",
      },
      about: {
        "@type": "Thing",
        identifier: run.id,
        name: `${run.model} Phonetic Benchmark ${run.benchmarkVersion} run`,
      },
      author: {
        "@type": "Person",
        name: siteProfile.name,
        url: siteProfile.siteUrl,
      },
      associatedMedia: {
        "@type": "ImageObject",
        contentUrl: run.screenshotUrl,
      },
    },
  ];
}
