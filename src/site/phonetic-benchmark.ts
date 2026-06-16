import type { SiteMetadata } from "../i18n/schema.ts";
import { siteProfile } from "./profile.ts";

export type BenchmarkReportLang = "en" | "pl";
export type BenchmarkVersion = "v1" | "v2";
export type BenchmarkStatus = "comparable" | "contract-failing" | "unrunnable";
export type BenchmarkFailureType =
  | "core behavior"
  | "submission documentation"
  | "attribution"
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
  observations: BenchmarkRunObservations;
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
  benchmarkHeading: string;
  benchmarkParagraphs: readonly string[];
  readingHeading: string;
  readingIntro: string;
  statusDescriptions: Readonly<Record<BenchmarkStatus, string>>;
  evidenceText: string;
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
    details: string;
  };
  detailLabels: {
    runDate: string;
    stack: string;
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
  updatedDate: "2026-06-15",
  coveredThroughDate: getLatestRunDate(),
} as const satisfies BenchmarkMetadata;

const runObservations = {
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
} as const satisfies Record<BenchmarkRunId, BenchmarkRunObservations>;

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
      "Functionally usable with 35 static automated test cases, but formally non-compliant. The repetitive exercise loop also contains several avoidable interaction frictions.",
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
      "Vite and plain JavaScript v2 submission with clear docs and passing tests, but formally contract-failing. Rapid repeated keyboard submits or suggestion clicks can skip a symbol, and the documented active-run language switching is not actually available in the UI.",
    "deepseek-v4-flash-v2":
      "Working v2 run with clear docs and passing tests, but formally contract-failing because the required attribution is not visible on the initial setup screen.",
    "mimo-v2-5-free-v2":
      "Clear v2 submission with passing runner evidence and useful docs, but formally contract-failing. The footer attribution does not localize to Polish, and rapid repeated keyboard submits can skip a symbol.",
    "gemma-4-26b-v2":
      "Vite and TypeScript v2 submission with a runnable static artifact, but formally contract-failing. Dependency policy blocks the runner, the package test command fails, and keyboard plus suggestion interactions feel unfinished.",
    "laguna-m-1-v2":
      "Compact no-build v2 submission with passing runner evidence and clear docs, but formally contract-failing. Repeated hint clicks on one question lower the final score too much, and the attribution footer does not localize to Polish.",
    "north-mini-code-free-v2":
      "Server-backed v2 submission with a runnable UI and passing verification script, but formally contract-failing. Attribution is generic and runtime-dated, hint use blocks answer submission, and the package test command does not run the submitted Jest-style tests.",
    "owl-alpha-v2":
      "Strong no-build v2 run with clear docs, passing controlled-runner evidence, and good observed behavior. It makes a restrictive but coherent decision to lock language and omit reset during an active run.",
    "opus-4-6-thinking-v2":
      "Runnable v2 submission with strong tests and correct core flows, but formally contract-failing because the required attribution footer does not switch to Polish when the UI language changes. The repeated full-card fade on setup and quiz re-renders is also distracting.",
    "gemini-3-5-flash-high-v2":
      "Runnable v2 submission with clear docs and passing controlled-runner evidence, but formally contract-failing. The attribution footer does not localize to Polish, and rapid repeated keyboard submits can skip symbols.",
    "sonnet-4-6-thinking-v2":
      "Runnable v2 submission with strong automated-test evidence, but formally contract-failing. The visible footer and submission docs identify the implementation as Sonnet 4.5 rather than the recorded Sonnet 4.6 Thinking run, and the attribution footer does not localize to Polish.",
    "gemini-3-1-pro-high-v2":
      "Runnable v2 submission with clear docs and passing controlled-runner evidence, but formally contract-failing. The attribution footer does not localize to Polish, and an active language switch hides a revealed hint before the question is completed.",
    "gpt-5-4-high-v2":
      "Strong comparable v2 run with clear setup copy, passing controlled-runner evidence, and good keyboard plus suggestion-mode behavior. The main weakness is Polish localization quality: the UI is translated, but many Polish diacritics are simplified away.",
    "gpt-5-5-high-v2":
      "Strong plain JavaScript v2 run. The archived artifact implements the required exercise modes, hint reveal, final scoring, and localized attribution, but it does not include automated test runner evidence.",
    "gpt-oss-120b-v2":
      "Thin static v2 output. It loads alphabet data for inspection, but it does not implement the required quiz flow, exercise modes, hint behavior, scoring, or full attribution.",
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
      "Funkcjonalnie używalna, z 35 statycznie znalezionymi przypadkami testowymi, ale formalnie niezgodna. Pętla ćwiczenia zawiera też kilka zbędnych tarć.",
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
      "Run v2 w Vite i plain JavaScript z czytelną dokumentacją oraz przechodzącymi testami, ale formalnie contract-failing. Szybkie powtórzenie Entera lub kliknięcia poprawnej opcji może pominąć symbol, a udokumentowane przełączanie języka w aktywnej próbie nie jest dostępne w UI.",
    "deepseek-v4-flash-v2":
      "Działający run v2 z czytelną dokumentacją i przechodzącymi testami, ale formalnie contract-failing, bo wymagana atrybucja nie jest widoczna na początkowym ekranie setupu.",
    "mimo-v2-5-free-v2":
      "Czytelny run v2 z przechodzącym runnerem i użyteczną dokumentacją, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a szybkie powtórne zatwierdzenie odpowiedzi z klawiatury może pominąć symbol.",
    "gemma-4-26b-v2":
      "Run v2 w Vite i TypeScript z działającym statycznym artefaktem, ale formalnie contract-failing. Dependency policy blokuje runner, komenda testowa failuje, a interakcje klawiatury i sugestii są niedopracowane.",
    "laguna-m-1-v2":
      "Zwarty run v2 bez buildu, z przechodzącym runnerem i czytelną dokumentacją, ale formalnie contract-failing. Powtórne kliknięcia hintu na jednym pytaniu zaniżają wynik, a stopka atrybucji nie przełącza się na polski.",
    "north-mini-code-free-v2":
      "Server-backed run v2 z działającym UI i przechodzącym skryptem weryfikacji, ale formalnie contract-failing. Atrybucja jest generyczna i runtime-dated, użycie hintu blokuje odpowiedź, a komenda testowa nie uruchamia dostarczonych testów w stylu Jest.",
    "owl-alpha-v2":
      "Mocny run v2 bez buildu, z czytelną dokumentacją, przechodzącym controlled runnerem i dobrym zachowaniem w sprawdzonym flow. Restrykcyjnie, ale spójnie blokuje zmianę języka i reset podczas aktywnej próby.",
    "opus-4-6-thinking-v2":
      "Działający run v2 z mocnymi testami i poprawnymi głównymi flow, ale formalnie contract-failing, bo wymagana stopka z atrybucją nie przełącza się na polski po zmianie języka UI. Powtarzany fade całej karty na setupie i w quizie też przeszkadza.",
    "gemini-3-5-flash-high-v2":
      "Działający run v2 z czytelną dokumentacją i przechodzącym controlled runnerem, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a szybkie powtórne zatwierdzenie odpowiedzi klawiaturą może pominąć symbole.",
    "sonnet-4-6-thinking-v2":
      "Działający run v2 z mocnym evidence testowym, ale formalnie contract-failing. Widoczna stopka i dokumentacja submission wskazują Sonnet 4.5 zamiast zapisanego runu Sonnet 4.6 Thinking, a stopka atrybucji nie przełącza się na polski.",
    "gemini-3-1-pro-high-v2":
      "Działający run v2 z czytelną dokumentacją i przechodzącym controlled runnerem, ale formalnie contract-failing. Stopka z atrybucją nie przełącza się na polski, a zmiana języka w aktywnej próbie ukrywa ujawnioną podpowiedź przed ukończeniem pytania.",
    "gpt-5-4-high-v2":
      "Mocny porównywalny run v2 z czytelnym setupem, przechodzącym controlled runnerem oraz dobrym zachowaniem trybu klawiatury i sugestii. Główna słabość to jakość polskiej lokalizacji: UI jest przetłumaczony, ale wiele polskich znaków diakrytycznych uproszczono do ASCII.",
    "gpt-5-5-high-v2":
      "Mocny run v2 w plain JavaScript. Zarchiwizowany artefakt implementuje wymagane tryby ćwiczenia, hint, finalny wynik i lokalizowaną atrybucję, ale nie zawiera dowodu z automatycznego runnera testów.",
    "gpt-oss-120b-v2":
      "Cienki statyczny output v2. Ładuje dane alfabetów do inspekcji, ale nie implementuje wymaganego flow quizu, trybów ćwiczenia, hintów, scoringu ani pełnej atrybucji.",
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
      "A qualitative review of archived web applications built from the Phonetic Alphabet Trainer benchmark specification. The v2 batch is the current benchmark series; the original v1 results remain preserved as a 15-run snapshot. This is not a leaderboard. The useful signal is whether an output works, where it fails, and what it reveals about building small products with AI agents.",
    benchmarkHeading: "What This Benchmark Is",
    benchmarkParagraphs: [
      "Each model received a docs-first package, fixed benchmark data, and a direct instruction to implement the web app. Runs are reviewed against the contract for their benchmark version and preserved as archived demos.",
      "The v1 results are the original 15-run snapshot. The v2 results use the revised review procedure and should be read as the current batch, not appended to a flat v1 leaderboard.",
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
      "A failed status is not a quality score. Failure types remain visible because they have different practical weight. Missing workflow documentation in an otherwise strong application is not the same problem as a quiz that cannot progress past its first question. Source LoC and automated test evidence are repository evidence: they help show the shape of an implementation, but they do not prove code quality or test coverage. When v2 comparative scores are published in machine-readable exports, they apply only to v2 runs.",
    resultsHeading: "Results",
    resultsIntro:
      "The results are grouped by benchmark version. The short functional read is deliberately compact; selected cases below explain the distinctions that matter most. Screenshots and archived demos remain available so the applications can be inspected directly.",
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "v2 Batch",
        intro:
          "The first v2 runs use the revised review procedure. They are the current benchmark batch.",
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
      details: "Details",
    },
    detailLabels: {
      runDate: "Run date",
      stack: "Stack",
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
          "The v2 Batch Separates Contract-Clearing Runs From Inspectable Failures",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High, and GPT 5.5 High are the useful v2 comparables in this batch. They clear the revised contract while still preserving visible review notes around active-run choices, Polish localization quality, and missing automated-test evidence.",
          "The remaining eleven v2 runs are not one kind of failure. Several are inspectable applications with narrow formal misses, while Big Pickle and gpt-oss-120b expose harder product behavior gaps. That distinction matters more than a flat pass/fail count.",
        ],
      },
      {
        heading: "Useful Results Are Not Limited To One Model Tier",
        paragraphs: [
          "Several models produced convincing small applications from the same docs-first package. The useful outputs are not limited to the most prominent or most expensive models. That makes experimentation with less obvious, cheaper, or open models a reasonable part of a zero-code workflow.",
        ],
      },
      {
        heading:
          "Formal Compliance And Product Quality Are Different Questions",
        paragraphs: [
          "The v2 batch currently leaves three comparable submissions and eleven contract-failing submissions, with no unrunnable v2 output. The pattern has shifted from v1: most v2 failures are applications that can be inspected, not outputs that crash before the benchmark can be exercised.",
          "The v1 snapshot still shows why the split needs context. DeepSeek V4 Pro is functionally strong but fails because it does not document its install, run, and test commands. Nemotron 3 Super also fails, but for a much more important reason: its quiz cannot move past the first symbol.",
          "The contract matters because disciplined delivery matters. The failure type matters because not every miss has the same practical cost.",
        ],
      },
      {
        heading: "Obvious UX Needs Still Require Product Judgment",
        paragraphs: [
          "Keyboard focus remains the clearest repeated example, but v2 adds more interaction-loop details: rapid repeated submits, hint state during language changes, scoring after repeated hints, and suggestion-option stability. The gaps are small in code and obvious in use.",
          "This is one reason to inspect the actual application rather than treating a generated repository as finished when it builds.",
        ],
      },
      {
        heading: "Public Rankings Do Not Fully Predict Workflow Fit",
        paragraphs: [
          "The Gemini and Sonnet v2 runs are useful cautions against reading general model rankings as product-workflow recommendations. Both Gemini v2 outputs are runnable and have controlled-runner evidence, but still fail the contract. Sonnet 4.6 Thinking has strong automated-test evidence and working core flows, yet fails on visible model identity and attribution localization.",
          "This is not a universal model ranking. Each result is one archived run against one benchmark version of a small product brief.",
        ],
      },
      {
        heading: "Localization Became A Contract-Level Signal",
        paragraphs: [
          "A repeated v2 miss is not translation of the main UI, but the required attribution footer staying English after the interface switches to Polish. GPT 5.4 High clears the contract while still showing a softer version of the same theme: the Polish UI is understandable, but many diacritics are simplified away.",
          "That makes localization a product-quality signal, not a cosmetic layer to check after the main flow works.",
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
          "First v2 Batch: Three Comparables And Eleven Contract Failures",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High, and GPT 5.5 High are the useful v2 comparables in this batch. DeepSeek V4 Flash is functionally okay but formally contract-failing because attribution is missing on initial load; MiMo V2.5 Free has clear docs and a passing runner, but fails attribution localization and keyboard answer locking.",
          "The other v2 failures widen the pattern. Opus, Gemini 3.5, Sonnet, and Gemini 3.1 are runnable and test-backed but still miss required attribution, identity, or active-run behavior. Gemma 4 26B is blocked by dependency and test-command failures. Laguna M.1 Free has a passing runner but fails scoring and footer localization. North Mini Code Free blocks answer submission after a hint and has disconnected test evidence. Big Pickle and gpt-oss-120b show harder product failures in core behavior.",
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
        ],
      },
      {
        id: "reference-baselines",
        heading: "Current v2 Comparables And Historical v1 Baselines",
        paragraphs: [
          "The current contract-clearing v2 references are Owl Alpha, GPT 5.4 High, and GPT 5.5 High. They are useful in different ways: Owl Alpha is conservative and no-build, GPT 5.4 High has strong interaction behavior with localization polish issues, and GPT 5.5 High is compact plain JavaScript but lacks automated runner evidence.",
          "The earlier v1 baselines remain useful as historical references: GPT 5.5 High and Claude Sonnet 4.6 Thinking were strong in the original snapshot. Sonnet's v2 run is not a contract-clearing baseline because visible model identity and attribution localization fail, despite strong tests.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "gpt-5-5-high",
          "sonnet-4-6-thinking",
          "sonnet-4-6-thinking-v2",
        ],
      },
      {
        id: "deepseek-narrow-failure",
        heading: "A Narrow Formal Failure: DeepSeek V4 Pro",
        paragraphs: [
          "DeepSeek V4 Pro is a useful example of why failure types should remain visible. The app is functionally strong and its DECISIONS.md makes restrictive product choices reviewable: restart and language switching are intentionally limited during an active run. The repository still fails the strict submission contract because it does not document install, run, and test commands.",
        ],
        runIds: ["deepseek-v4-pro"],
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
      "Jakościowy przegląd archiwalnych aplikacji webowych zbudowanych na podstawie specyfikacji benchmarku Phonetic Alphabet Trainer. Batch v2 jest aktualną serią benchmarku; oryginalne wyniki v1 pozostają zachowane jako snapshot 15 prób. To nie jest ranking. Liczy się to, czy wynik działa, gdzie się psuje i co mówi o budowaniu małych produktów z agentami AI.",
    benchmarkHeading: "Czym Jest Ten Benchmark",
    benchmarkParagraphs: [
      "Każdy model dostał pakiet dokumentacji, stałe dane benchmarku i bezpośrednie polecenie implementacji aplikacji webowej. Próby są sprawdzane według kontraktu właściwego dla swojej wersji benchmarku i zachowane jako archiwalne demo.",
      "Wyniki v1 są oryginalnym snapshotem 15 prób. Wyniki v2 używają zmienionej procedury przeglądu i należy je czytać jako aktualny batch, a nie jako dopisanie do płaskiego leaderboardu v1.",
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
      "Negatywny status nie jest oceną jakości. Typ problemu pozostaje widoczny, bo poszczególne błędy mają różną wagę praktyczną. Brak dokumentacji workflow w dobrej aplikacji nie jest tym samym problemem co quiz, który nie przechodzi dalej niż pierwsze pytanie. Liczba linii kodu źródłowego i liczba statycznie policzonych testów automatycznych są materiałem z repozytorium: pokazują kształt implementacji, ale same nie dowodzą jakości kodu ani pokrycia testami. Jeśli v2 comparative score pojawia się w eksportach machine-readable, dotyczy wyłącznie prób v2.",
    resultsHeading: "Wyniki",
    resultsIntro:
      "Wyniki są pogrupowane według wersji benchmarku. Krótki opis funkcjonalny jest celowo zwięzły; wybrane przypadki poniżej wyjaśniają najważniejsze różnice. Screenshoty i archiwalne demo pozostają dostępne, żeby aplikacje można było sprawdzić bezpośrednio.",
    resultGroups: [
      {
        benchmarkVersion: "v2",
        heading: "Batch v2",
        intro:
          "Pierwsze próby v2 używają zmienionej procedury przeglądu. To aktualny batch benchmarku.",
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
      details: "Szczegóły",
    },
    detailLabels: {
      runDate: "Data próby",
      stack: "Stack",
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
          "Batch v2 Oddziela Wyniki Spełniające Kontrakt Od Sprawdzalnych Błędów",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High i GPT 5.5 High są użytecznymi porównywalnymi wynikami v2 w tym batchu. Przechodzą zmieniony kontrakt, ale zostawiają widoczne notatki review wokół decyzji w aktywnej próbie, jakości polskiej lokalizacji i braku dowodu z automatycznych testów.",
          "Pozostałe jedenaście wyników v2 nie tworzy jednego typu porażki. Część to sprawdzalne aplikacje z wąskimi błędami formalnymi, a Big Pickle i gpt-oss-120b pokazują twardsze braki w zachowaniu produktu. To rozróżnienie jest ważniejsze niż płaski wynik pass/fail.",
        ],
      },
      {
        heading: "Użyteczne Wyniki Nie Są Ograniczone Do Jednej Półki Modeli",
        paragraphs: [
          "Kilka modeli przygotowało przekonujące małe aplikacje na podstawie tego samego pakietu dokumentacji. Użyteczne wyniki nie są ograniczone do najbardziej rozpoznawalnych ani najdroższych modeli. Eksperymentowanie z mniej oczywistymi, tańszymi lub otwartymi modelami ma sens także w workflow zero-code.",
        ],
      },
      {
        heading: "Zgodność Formalna I Jakość Produktu To Dwa Różne Pytania",
        paragraphs: [
          "Batch v2 ma obecnie trzy wyniki porównywalne i jedenaście wyników niespełniających kontraktu, bez niedziałającego outputu v2. Wzorzec przesunął się względem v1: większość błędów v2 dotyczy aplikacji, które da się sprawdzić, a nie outputów crashujących przed przejściem benchmarku.",
          "Snapshot v1 nadal pokazuje, dlaczego ten podział wymaga kontekstu. DeepSeek V4 Pro jest funkcjonalnie mocny, ale nie dokumentuje komend instalacji, uruchomienia i testów. Nemotron 3 Super również nie spełnia kontraktu, ale z dużo ważniejszego powodu: quiz nie przechodzi dalej niż pierwszy symbol.",
          "Kontrakt jest ważny, bo uporządkowane dostarczenie projektu ma znaczenie. Typ problemu jest ważny, bo nie każdy błąd ma ten sam koszt praktyczny.",
        ],
      },
      {
        heading: "Oczywiste Potrzeby UX Nadal Wymagają Oceny Produktowej",
        paragraphs: [
          "Fokus klawiatury nadal jest najlepszym powtarzającym się przykładem, ale v2 dodaje więcej detali pętli interakcji: szybkie powtórne submitowanie, stan podpowiedzi po zmianie języka, scoring po wielokrotnym użyciu hintu i stabilność opcji w trybie sugestii. Różnice są niewielkie w kodzie i oczywiste podczas używania aplikacji.",
          "To jeden z powodów, dla których samo zbudowanie repozytorium nie powinno kończyć przeglądu wygenerowanego produktu.",
        ],
      },
      {
        heading:
          "Publiczne Rankingi Nie Przewidują W Pełni Dopasowania Do Workflow",
        paragraphs: [
          "Próby Gemini i Sonnet v2 są dobrym ostrzeżeniem przed traktowaniem ogólnych rankingów modeli jako rekomendacji dla konkretnego workflow produktowego. Oba wyniki Gemini v2 są uruchamialne i mają controlled-runner evidence, ale nadal nie spełniają kontraktu. Sonnet 4.6 Thinking ma mocne evidence z testów automatycznych i działające główne flow, a mimo to odpada na widocznej tożsamości modelu i lokalizacji atrybucji.",
          "To nie jest uniwersalny ranking modeli. Każdy wynik jest jedną archiwalną próbą dla jednej wersji benchmarku i jednego niewielkiego briefu produktowego.",
        ],
      },
      {
        heading: "Lokalizacja Stała Się Sygnałem Kontraktowym",
        paragraphs: [
          "Powtarzający się błąd v2 nie dotyczy tłumaczenia głównego UI, tylko wymaganej stopki atrybucji, która zostaje po angielsku po przełączeniu interfejsu na polski. GPT 5.4 High spełnia kontrakt, ale pokazuje łagodniejszą wersję tego samego tematu: polski UI jest zrozumiały, lecz wiele znaków diakrytycznych uproszczono do ASCII.",
          "To sprawia, że lokalizacja jest sygnałem jakości produktu, a nie kosmetyczną warstwą do odhaczenia po działającym flow.",
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
          "Pierwszy Batch v2: Trzy Wyniki Porównywalne I Jedenaście Contract Failure",
        paragraphs: [
          "Owl Alpha, GPT 5.4 High i GPT 5.5 High są użytecznymi porównywalnymi wynikami v2 w tym batchu. DeepSeek V4 Flash jest funkcjonalnie ok, ale formalnie contract-failing, bo atrybucja znika przy pierwszym załadowaniu; MiMo V2.5 Free ma czytelne docs i przechodzący runner, ale nie przełącza stopki na polski i nie blokuje powtórnego zatwierdzenia z klawiatury.",
          "Pozostałe błędy v2 poszerzają wzorzec. Opus, Gemini 3.5, Sonnet i Gemini 3.1 są uruchamialne i mają evidence testowe, ale nadal mijają wymagania atrybucji, tożsamości albo zachowania aktywnej próby. Gemma 4 26B blokuje się na dependency i failującej komendzie testowej. Laguna M.1 Free ma przechodzący runner, ale failuje scoring i lokalizację stopki. North Mini Code Free blokuje odpowiedź po użyciu hintu i ma rozłączone evidence testowe. Big Pickle i gpt-oss-120b mają twardsze błędy w głównym zachowaniu produktu.",
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
        ],
      },
      {
        id: "reference-baselines",
        heading: "Aktualne Wyniki Porównywalne v2 I Historyczne Baseline'y v1",
        paragraphs: [
          "Aktualne referencje v2 spełniające kontrakt to Owl Alpha, GPT 5.4 High i GPT 5.5 High. Każda jest użyteczna inaczej: Owl Alpha jest konserwatywna i bez buildu, GPT 5.4 High ma mocne zachowanie interakcji z problemami jakości lokalizacji, a GPT 5.5 High jest zwartą aplikacją w plain JavaScript bez dowodu z automatycznego runnera.",
          "Wcześniejsze baseline'y v1 pozostają użyteczne jako historyczne punkty odniesienia: GPT 5.5 High i Claude Sonnet 4.6 Thinking były mocne w oryginalnym snapshotcie. Run Sonnet v2 nie jest baseline'em spełniającym kontrakt, bo failuje widoczna tożsamość modelu i lokalizacja atrybucji, mimo mocnych testów.",
        ],
        runIds: [
          "owl-alpha-v2",
          "gpt-5-4-high-v2",
          "gpt-5-5-high-v2",
          "gpt-5-5-high",
          "sonnet-4-6-thinking",
          "sonnet-4-6-thinking-v2",
        ],
      },
      {
        id: "deepseek-narrow-failure",
        heading: "Wąski Błąd Formalny: DeepSeek V4 Pro",
        paragraphs: [
          "DeepSeek V4 Pro dobrze pokazuje, dlaczego warto zachować widoczne typy problemów. Aplikacja jest funkcjonalnie mocna, a DECISIONS.md pozwala ocenić restrykcyjne decyzje produktowe: restart i zmiana języka są celowo ograniczone podczas aktywnej próby. Repozytorium nadal nie spełnia rygorystycznego kontraktu dostarczenia projektu, bo nie dokumentuje komend instalacji, uruchomienia i testów.",
        ],
        runIds: ["deepseek-v4-pro"],
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
        heading: "Gemini Poprawia Się W v2, Ale Nie Spełnia Kontraktu",
        paragraphs: [
          "Run v1 Gemini 3.1 Pro High ma twardy błąd wymaganego zachowania: podpowiedź klawiaturowa nie ujawnia odpowiedzi. W v2 wyniki Gemini są bardziej używalne i mają controlled-runner evidence, ale nadal nie spełniają kontraktu.",
          "Gemini 3.5 Flash High v2 nie lokalizuje atrybucji i może pomijać symbole przy szybkim powtórnym submitowaniu z klawiatury. Gemini 3.1 Pro High v2 ukrywa ujawnioną podpowiedź po zmianie języka w aktywnej próbie i również nie lokalizuje atrybucji.",
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
        heading: "Batch v2",
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
