import type { SiteMetadata } from "../i18n/schema.ts";
import { siteProfile } from "./profile.ts";

export type BenchmarkReportLang = "en" | "pl";
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
  benchmarkVersion: "v1";
  status: BenchmarkStatus;
  failureTypes: readonly BenchmarkFailureType[];
  sourceLoc: number;
  testCount: number;
  stack: string;
}

export interface BenchmarkRunCopy extends BenchmarkRunData {
  functionalRead: string;
  screenshotPath: `/${string}`;
  screenshotAlt: string;
  screenshotCaption: string;
  demoUrl: string;
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
  tableLabels: {
    model: string;
    status: string;
    failureTypes: string;
    sourceLoc: string;
    testCount: string;
    functionalRead: string;
    demo: string;
  };
  detailLabels: {
    runDate: string;
    stack: string;
  };
  statusLabels: Readonly<Record<BenchmarkStatus, string>>;
  failureTypeLabels: Readonly<Record<BenchmarkFailureType, string>>;
  noneLabel: string;
  demoLabel: string;
  runs: readonly BenchmarkRunCopy[];
  findingsHeading: string;
  findings: readonly BenchmarkNarrativeSection[];
  caseNotesHeading: string;
  caseNotes: readonly BenchmarkCaseNote[];
  artifactHeading: string;
  artifactIntro: string;
  closingHeading: string;
  closingText: string;
}

const siteUrl = siteProfile.siteUrl;

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
] as const satisfies readonly BenchmarkRunData[];

type BenchmarkRunId = (typeof runData)[number]["id"];

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
  },
} as const satisfies Record<
  BenchmarkReportLang,
  Record<BenchmarkRunId, string>
>;

function getRuns(lang: BenchmarkReportLang): readonly BenchmarkRunCopy[] {
  return runData.map((run) => ({
    ...run,
    functionalRead: functionalReads[lang][run.id],
    screenshotPath:
      `/phonetic-benchmark/screenshots/${run.id}-quiz.png` as const,
    screenshotAlt:
      lang === "en"
        ? `Archived quiz state from the ${run.model} Phonetic Alphabet Trainer output.`
        : `Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez ${run.model}.`,
    screenshotCaption:
      lang === "en"
        ? `Archived quiz state for ${run.model}.`
        : `Archiwalny stan quizu dla ${run.model}.`,
    demoUrl: url(`/phonetic-benchmark/demos/${run.id}/index.html`),
  }));
}

const englishRuns = getRuns("en");
const polishRuns = getRuns("pl");

export const phoneticBenchmarkReports = {
  en: {
    lang: "en",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Qualitative review of 15 archived web applications built from the same Phonetic Alphabet Trainer specification.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "A qualitative review of 15 archived AI-agent outputs for the same Phonetic Alphabet Trainer specification, with screenshots and static demos.",
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
      "A qualitative review of 15 archived web applications built from the same Phonetic Alphabet Trainer specification. This is not a leaderboard. The useful signal is whether an output works, where it fails, and what it reveals about building small products with AI agents.",
    benchmarkHeading: "What This Benchmark Is",
    benchmarkParagraphs: [
      "Each model received the same docs-first package, fixed benchmark data, and a direct instruction to implement the web app. The resulting repositories were reviewed against the same v1 contract and preserved as archived demos.",
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
      "A failed status is not a quality score. Failure types remain visible because they have different practical weight. Missing workflow documentation in an otherwise strong application is not the same problem as a quiz that cannot progress past its first question. Source LoC and automated test counts are repository evidence: they help show the shape of an implementation, but they do not prove code quality or test coverage.",
    resultsHeading: "Results",
    resultsIntro:
      "The table keeps every run visible. The short functional read is deliberately compact; selected cases below explain the distinctions that matter most. Screenshots and archived demos remain available so the applications can be inspected directly.",
    tableLabels: {
      model: "Model",
      status: "Status",
      failureTypes: "Failure types",
      sourceLoc: "Source LoC",
      testCount: "Static automated tests",
      functionalRead: "Functional read",
      demo: "Demo",
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
    noneLabel: "none",
    demoLabel: "Open archived demo",
    runs: englishRuns,
    findingsHeading: "What The Runs Show",
    findings: [
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
          "The strict review leaves six comparable submissions, eight contract-failing submissions, and one unrunnable output. That split needs context. DeepSeek V4 Pro is functionally strong but fails because it does not document its install, run, and test commands. Nemotron 3 Super also fails, but for a much more important reason: its quiz cannot move past the first symbol.",
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
    closingHeading: "Closing",
    closingText:
      "The benchmark does not identify one universal winner. It shows a practical way to evaluate models for small zero-code product work: verify the contract, inspect the interaction loop, review the repository evidence, and click through the actual output. Model choice becomes easier when the comparison stays concrete.",
  },
  pl: {
    lang: "pl",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Jakościowy przegląd 15 archiwalnych aplikacji webowych zbudowanych na podstawie tej samej specyfikacji Phonetic Alphabet Trainer.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "Jakościowy przegląd 15 archiwalnych wyników pracy agentów AI dla tej samej specyfikacji Phonetic Alphabet Trainer, ze screenshotami i statycznymi demo.",
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
      "Jakościowy przegląd 15 archiwalnych aplikacji webowych zbudowanych na podstawie tej samej specyfikacji Phonetic Alphabet Trainer. To nie jest ranking. Liczy się to, czy wynik działa, gdzie się psuje i co mówi o budowaniu małych produktów z agentami AI.",
    benchmarkHeading: "Czym Jest Ten Benchmark",
    benchmarkParagraphs: [
      "Każdy model dostał ten sam pakiet dokumentacji, stałe dane benchmarku i bezpośrednie polecenie implementacji aplikacji webowej. Powstałe repozytoria zostały sprawdzone według tego samego kontraktu v1 i zachowane jako archiwalne demo.",
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
      "Negatywny status nie jest oceną jakości. Typ problemu pozostaje widoczny, bo poszczególne błędy mają różną wagę praktyczną. Brak dokumentacji workflow w dobrej aplikacji nie jest tym samym problemem co quiz, który nie przechodzi dalej niż pierwsze pytanie. Liczba linii kodu źródłowego i liczba statycznie policzonych testów automatycznych są materiałem z repozytorium: pokazują kształt implementacji, ale same nie dowodzą jakości kodu ani pokrycia testami.",
    resultsHeading: "Wyniki",
    resultsIntro:
      "Tabela pokazuje wszystkie próby. Krótki opis funkcjonalny jest celowo zwięzły; wybrane przypadki poniżej wyjaśniają najważniejsze różnice. Screenshoty i archiwalne demo pozostają dostępne, żeby aplikacje można było sprawdzić bezpośrednio.",
    tableLabels: {
      model: "Model",
      status: "Status",
      failureTypes: "Typy problemów",
      sourceLoc: "Linie kodu źródłowego",
      testCount: "Statycznie policzone testy automatyczne",
      functionalRead: "Odczyt funkcjonalny",
      demo: "Demo",
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
    noneLabel: "brak",
    demoLabel: "Otwórz archiwalne demo",
    runs: polishRuns,
    findingsHeading: "Co Pokazują Próby",
    findings: [
      {
        heading: "Użyteczne Wyniki Nie Są Ograniczone Do Jednej Półki Modeli",
        paragraphs: [
          "Kilka modeli przygotowało przekonujące małe aplikacje na podstawie tego samego pakietu dokumentacji. Użyteczne wyniki nie są ograniczone do najbardziej rozpoznawalnych ani najdroższych modeli. Eksperymentowanie z mniej oczywistymi, tańszymi lub otwartymi modelami ma sens także w workflow zero-code.",
        ],
      },
      {
        heading: "Zgodność Formalna I Jakość Produktu To Dwa Różne Pytania",
        paragraphs: [
          "Rygorystyczny przegląd zostawia sześć prób porównywalnych, osiem niespełniających kontraktu i jeden niedziałający wynik. Ten podział wymaga kontekstu. DeepSeek V4 Pro jest funkcjonalnie mocny, ale nie dokumentuje komend instalacji, uruchomienia i testów. Nemotron 3 Super również nie spełnia kontraktu, ale z dużo ważniejszego powodu: quiz nie przechodzi dalej niż pierwszy symbol.",
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
    closingHeading: "Zakończenie",
    closingText:
      "Benchmark nie wskazuje jednego uniwersalnego zwycięzcy. Pokazuje praktyczny sposób oceny modeli do małych projektów zero-code: sprawdzić kontrakt, przejść główną pętlę interakcji, przejrzeć materiał w repozytorium i przeklikać faktyczny wynik. Wybór modelu staje się prostszy, gdy porównanie pozostaje konkretne.",
  },
} as const satisfies Record<BenchmarkReportLang, BenchmarkReportCopy>;

export function getPhoneticBenchmarkMarkdownUrl(
  lang: BenchmarkReportLang,
): string {
  return url(phoneticBenchmarkReports[lang].markdownPath);
}
