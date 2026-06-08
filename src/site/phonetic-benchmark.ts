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
    runDate: "2026-06-03",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior"],
    sourceLoc: 1101,
    testCount: 21,
    stack: "Vanilla JavaScript, Vite 6, Vitest",
  },
  {
    id: "deepseek-v4-flash-v2",
    executionOrder: 2,
    model: "DeepSeek V4 Flash",
    runDate: "2026-06-03",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 834,
    testCount: 0,
    stack: "Vanilla JavaScript, Vite 6",
    comparativeScore: 67,
  },
  {
    id: "mimo-v2-5-v2",
    executionOrder: 3,
    model: "MiMo 2.5",
    runDate: "2026-06-03",
    benchmarkVersion: "v2",
    status: "comparable",
    failureTypes: [],
    sourceLoc: 671,
    testCount: 0,
    testEvidence:
      "0 framework-style static cases; custom runner reported 381 passed, 0 failed",
    stack: "Vanilla JavaScript, Express, custom Node test runner",
    comparativeScore: 80,
  },
  {
    id: "nemotron-3-super-v2",
    executionOrder: 4,
    model: "Nemotron 3 Super",
    runDate: "2026-06-03",
    benchmarkVersion: "v2",
    status: "contract-failing",
    failureTypes: ["core behavior", "attribution", "test workflow"],
    sourceLoc: 692,
    testCount: 0,
    stack: "Vanilla JavaScript, http-server",
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
  updatedDate: "2026-06-08",
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
      "The application starts and language selection works.",
      "Includes a visible automated-test footprint.",
    ],
    observedWeaknesses: [
      "Hint behavior breaks after one hinted question.",
      "The submission fails the core v2 hint contract.",
      "The reviewed UX execution is weak.",
    ],
  },
  "deepseek-v4-flash-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "The application works in the reviewed flow.",
      "The overall execution is good.",
    ],
    observedWeaknesses: [
      "Suggestion buttons reshuffle during hint or feedback re-renders.",
    ],
  },
  "mimo-v2-5-v2": {
    observedStrengths: [
      "Clears the v2 contract.",
      "The application works in the reviewed flow.",
      "Includes a sensible delayed reset decision.",
    ],
    observedWeaknesses: [
      "Feedback and hint messages cause visible content jumps.",
      "The custom test runner is not counted by the current static declaration rule.",
    ],
  },
  "nemotron-3-super-v2": {
    observedStrengths: ["The application starts and can be inspected."],
    observedWeaknesses: [
      "Attribution is only visible at the end.",
      "Setup language switching does not update visible copy.",
      "Hint behavior breaks.",
      "Score formatting is wrong.",
      "Restart is broken.",
      "The documented test command fails.",
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
      "Stealth-model v2 run with weak UX execution. The app starts and language selection works, but hint becomes unavailable after one hinted question, so the submission fails the core hint contract.",
    "deepseek-v4-flash-v2":
      "Good v2 run. The app works and clears the formal contract, with a minor visual issue where suggestion buttons reshuffle during hint or feedback re-renders.",
    "mimo-v2-5-v2":
      "Good v2 run. The app works and clears the formal contract. It includes a sensible delayed reset decision, but feedback and hint messages cause visible content jumps.",
    "nemotron-3-super-v2":
      "Weak v2 run. The app starts, but the review found multiple hard failures: attribution is only visible at the end, setup language switching does not update visible copy, hint behavior breaks, score formatting is wrong, restart is broken, and the documented test command fails.",
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
      "Run v2 ze stealth modelu i słabym wykonaniem UX. Aplikacja startuje, a wybór języka działa, ale hint staje się niedostępny po jednym użyciu, więc wynik nie przechodzi core kontraktu hintów.",
    "deepseek-v4-flash-v2":
      "Dobry run v2. Aplikacja działa i przechodzi formalny kontrakt, z drobnym problemem wizualnym: przyciski sugestii zmieniają kolejność przy re-renderze hintu lub feedbacku.",
    "mimo-v2-5-v2":
      "Dobry run v2. Aplikacja działa i przechodzi formalny kontrakt. Ma sensowną decyzję o opóźnionym pokazaniu resetu, ale komunikaty feedbacku i hintu powodują widoczne skoki contentu.",
    "nemotron-3-super-v2":
      "Słaby run v2. Aplikacja startuje, ale review znalazł kilka twardych błędów: attribution jest widoczne tylko na końcu, zmiana języka na setupie nie aktualizuje widocznego tekstu, hint się psuje, score ma zły format, restart nie działa, a udokumentowana komenda testowa failuje.",
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
        heading: "The First v2 Batch Separates Good Execution From Hard Breaks",
        paragraphs: [
          "DeepSeek V4 Flash and MiMo 2.5 are the first useful v2 comparables. Both work and clear the formal contract, while still showing small UX issues that matter in repeated use.",
          "Big Pickle and Nemotron 3 Super are weaker v2 outputs. They start, but hard product failures keep them out of the comparable set.",
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
          "The v1 snapshot leaves six comparable submissions, eight contract-failing submissions, and one unrunnable output. That split needs context. DeepSeek V4 Pro is functionally strong but fails because it does not document its install, run, and test commands. Nemotron 3 Super also fails, but for a much more important reason: its quiz cannot move past the first symbol.",
          "The contract matters because disciplined delivery matters. The failure type matters because not every miss has the same practical cost.",
        ],
      },
      {
        heading: "Obvious UX Needs Still Require Product Judgment",
        paragraphs: [
          "Keyboard focus is the clearest repeated example. The specification did not explicitly prescribe autofocus behavior. Some models still preserved a comfortable keyboard-first loop, while others forced extra clicks or tab navigation between questions. The gap is small in code and obvious in use.",
          "This is one reason to inspect the actual application rather than treating a generated repository as finished when it builds.",
        ],
      },
      {
        heading: "Public Rankings Do Not Fully Predict Workflow Fit",
        paragraphs: [
          "The Gemini runs are a useful caution against reading general model rankings as product-workflow recommendations. Gemini 3.1 Pro High misses required hint behavior. Gemini 3.5 Flash High is functionally usable, but it has visible layout instability and incomplete workflow documentation. In this specific task, some less prominent models produced more convincing results.",
          "This is not a universal model ranking. Each model currently has one run against one small product brief.",
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
        heading: "First v2 Batch: Two Comparables And Two Core Failures",
        paragraphs: [
          "DeepSeek V4 Flash and MiMo 2.5 are good first v2 comparables. Both clear the revised contract, while preserving visible UX issues for inspection: DeepSeek reshuffles suggestions during re-renders, and MiMo has content jumps around feedback and hint messages.",
          "Big Pickle and Nemotron 3 Super show why the versioned status still matters. Both can be inspected, but each breaks required core behavior.",
        ],
        runIds: [
          "deepseek-v4-flash-v2",
          "mimo-v2-5-v2",
          "big-pickle-v2",
          "nemotron-3-super-v2",
        ],
      },
      {
        id: "reference-baselines",
        heading:
          "Two Reference Baselines: GPT 5.5 High And Claude Sonnet 4.6 Thinking",
        paragraphs: [
          "GPT 5.5 High and Claude Sonnet 4.6 Thinking are the two strongest contract-clearing reference outputs in this set. GPT 5.5 High is a compact plain JavaScript application with no significant reviewed-flow objections. Sonnet also clears the contract and includes a larger automated test footprint; its only noted UX issue is a small suggestion-mode reshuffle after revealing a hint.",
          "These are parallel baselines, not a first and second place ranking.",
        ],
        runIds: ["gpt-5-5-high", "sonnet-4-6-thinking"],
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
        heading:
          "Named Behavior Failure Versus UX Friction: Gemini 3.1 Pro High",
        paragraphs: [
          "Gemini 3.1 Pro High has a more fundamental problem: the required keyboard hint does not reveal the answer. Unlike a focus miss or a layout jump, this is not a matter of polish. It is a broken required behavior.",
        ],
        runIds: ["gemini-3-1-pro-high"],
      },
      {
        id: "blocked-and-unrunnable",
        heading: "A Blocked Flow And An Unrunnable Output",
        paragraphs: [
          "Nemotron 3 Super renders an interface, but its quiz cannot progress past the first correct answer. gpt-oss-120b is more basic still: the output crashes before its benchmark behavior can be meaningfully inspected. A visible shell is not enough to call a generated product usable.",
        ],
        runIds: ["nemotron-3-super", "gpt-oss-120b"],
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
          "Pierwszy Batch v2 Oddziela Dobre Wykonanie Od Twardych Błędów",
        paragraphs: [
          "DeepSeek V4 Flash i MiMo 2.5 to pierwsze użyteczne porównywalne wyniki v2. Obie aplikacje działają i przechodzą formalny kontrakt, ale nadal pokazują drobne problemy UX istotne przy powtarzalnym użyciu.",
          "Big Pickle i Nemotron 3 Super są słabszymi wynikami v2. Startują, ale twarde błędy produktowe wykluczają je ze zbioru porównywalnego.",
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
          "Snapshot v1 zostawia sześć prób porównywalnych, osiem niespełniających kontraktu i jeden niedziałający wynik. Ten podział wymaga kontekstu. DeepSeek V4 Pro jest funkcjonalnie mocny, ale nie dokumentuje komend instalacji, uruchomienia i testów. Nemotron 3 Super również nie spełnia kontraktu, ale z dużo ważniejszego powodu: quiz nie przechodzi dalej niż pierwszy symbol.",
          "Kontrakt jest ważny, bo uporządkowane dostarczenie projektu ma znaczenie. Typ problemu jest ważny, bo nie każdy błąd ma ten sam koszt praktyczny.",
        ],
      },
      {
        heading: "Oczywiste Potrzeby UX Nadal Wymagają Oceny Produktowej",
        paragraphs: [
          "Najlepszym powtarzającym się przykładem jest fokus klawiatury. Specyfikacja nie opisywała wprost zachowania autofocus. Część modeli zachowała wygodną pętlę obsługi z klawiatury, a inne wymuszały dodatkowe kliknięcia albo nawigację tabulatorem między pytaniami. Różnica jest niewielka w kodzie i oczywista podczas używania aplikacji.",
          "To jeden z powodów, dla których samo zbudowanie repozytorium nie powinno kończyć przeglądu wygenerowanego produktu.",
        ],
      },
      {
        heading:
          "Publiczne Rankingi Nie Przewidują W Pełni Dopasowania Do Workflow",
        paragraphs: [
          "Próby Gemini są dobrym ostrzeżeniem przed traktowaniem ogólnych rankingów modeli jako rekomendacji dla konkretnego workflow produktowego. Gemini 3.1 Pro High nie realizuje wymaganego zachowania podpowiedzi. Gemini 3.5 Flash High jest funkcjonalnie używalny, ale ma widoczne skoki layoutu i niekompletną dokumentację workflow. W tym konkretnym zadaniu mniej eksponowane modele przygotowały bardziej przekonujące wyniki.",
          "To nie jest uniwersalny ranking modeli. Każdy model ma obecnie jedną próbę na jednym niewielkim briefie produktowym.",
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
          "Pierwszy Batch v2: Dwa Wyniki Porównywalne I Dwa Core Failure",
        paragraphs: [
          "DeepSeek V4 Flash i MiMo 2.5 to dobre pierwsze wyniki porównywalne v2. Oba przechodzą zmieniony kontrakt, a jednocześnie zostawiają widoczne problemy UX do sprawdzenia: DeepSeek przetasowuje sugestie podczas re-renderów, a MiMo ma skoki contentu wokół feedbacku i hintów.",
          "Big Pickle i Nemotron 3 Super pokazują, dlaczego status wersjonowany nadal ma znaczenie. Oba wyniki da się sprawdzić, ale każdy łamie wymagane główne zachowanie.",
        ],
        runIds: [
          "deepseek-v4-flash-v2",
          "mimo-v2-5-v2",
          "big-pickle-v2",
          "nemotron-3-super-v2",
        ],
      },
      {
        id: "reference-baselines",
        heading:
          "Dwa Baseline'y Referencyjne: GPT 5.5 High I Claude Sonnet 4.6 Thinking",
        paragraphs: [
          "GPT 5.5 High i Claude Sonnet 4.6 Thinking to dwa najmocniejsze wyniki referencyjne, które spełniają kontrakt. GPT 5.5 High jest zwartą aplikacją w plain JavaScript bez istotnych zastrzeżeń w sprawdzonej ścieżce. Sonnet również spełnia kontrakt i ma większy zestaw testów automatycznych; jedyny zanotowany problem UX to drobne przetasowanie przycisków po ujawnieniu podpowiedzi.",
          "To równoległe baseline'y, a nie pierwsze i drugie miejsce rankingu.",
        ],
        runIds: ["gpt-5-5-high", "sonnet-4-6-thinking"],
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
        heading: "Zepsute Wymaganie A Problem UX: Gemini 3.1 Pro High",
        paragraphs: [
          "Gemini 3.1 Pro High ma bardziej podstawowy problem: wymagana podpowiedź klawiaturowa nie ujawnia odpowiedzi. W przeciwieństwie do utraty fokusu albo skoku layoutu nie jest to kwestia dopracowania. To zepsute wymagane zachowanie.",
        ],
        runIds: ["gemini-3-1-pro-high"],
      },
      {
        id: "blocked-and-unrunnable",
        heading: "Zablokowana Ścieżka I Niedziałający Wynik",
        paragraphs: [
          "Nemotron 3 Super renderuje interfejs, ale quiz nie przechodzi dalej po pierwszej poprawnej odpowiedzi. gpt-oss-120b jest jeszcze słabszym przypadkiem: wynik crashuje, zanim da się sensownie sprawdzić zachowanie benchmarku. Widoczny shell aplikacji nie wystarcza, żeby uznać wygenerowany produkt za używalny.",
        ],
        runIds: ["nemotron-3-super", "gpt-oss-120b"],
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
  "Each model currently has one run against one small browser-app task.",
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
        "This is not a numeric leaderboard. Each model currently has one run against one small product brief, so no run-details page should be read as a general review of a model.",
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
