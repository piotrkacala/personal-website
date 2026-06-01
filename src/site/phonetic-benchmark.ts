import type { SiteMetadata } from "../i18n/schema.ts";
import { siteProfile } from "./profile.ts";

export type BenchmarkReportLang = "en" | "pl";

export interface BenchmarkRunCopy {
  id: string;
  executionOrder: number;
  model: string;
  effort: string;
  promptCount: string;
  elapsed: string;
  sourceLoc: string;
  stack: string;
  notesDiscipline: string;
  gitUse: string;
  primaryFinding: string;
  verdict: string;
  screenshotPath: `/${string}`;
  screenshotAlt: string;
  screenshotCaption: string;
  demoUrl: string;
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
  title: string;
  eyebrow: string;
  summary: string;
  protocolHeading: string;
  protocol: readonly string[];
  resultsHeading: string;
  resultsIntro: string;
  tableLabels: {
    executionOrder: string;
    model: string;
    effort: string;
    promptCount: string;
    elapsed: string;
    sourceLoc: string;
    stack: string;
    verdict: string;
  };
  unspecifiedEffortLabel: string;
  markdownRunLabels: {
    executionOrder: string;
    primaryFinding: string;
    notesDiscipline: string;
    gitUse: string;
    screenshot: string;
    demo: string;
  };
  runs: readonly BenchmarkRunCopy[];
  currentBestHeading: string;
  currentBestText: string;
  findingsHeading: string;
  findingsIntro: string;
  findingLabels: {
    notes: string;
    git: string;
  };
  artifactHeading: string;
  artifactIntro: string;
  demoLabel: string;
  closingHeading: string;
  closingText: string;
}

const siteUrl = siteProfile.siteUrl;

function url(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

const demoUrls = {
  gpt54: url("/phonetic-benchmark/demos/gpt-5-4-high/index.html"),
  gpt55: url("/phonetic-benchmark/demos/gpt-5-5-high/index.html"),
  gemini35: url("/phonetic-benchmark/demos/gemini-3-5-flash-high/index.html"),
  gemini31: url("/phonetic-benchmark/demos/gemini-3-1-pro-high/index.html"),
  sonnet46: url("/phonetic-benchmark/demos/sonnet-4-6-thinking/index.html"),
  owlAlpha: url("/phonetic-benchmark/demos/owl-alpha/index.html"),
  gemma426b: url("/phonetic-benchmark/demos/gemma-4-26b/index.html"),
  nemotron3Super: url("/phonetic-benchmark/demos/nemotron-3-super/index.html"),
  lagunaM1: url("/phonetic-benchmark/demos/laguna-m-1/index.html"),
  deepseekV4Pro: url("/phonetic-benchmark/demos/deepseek-v4-pro/index.html"),
  gptOss120b: url("/phonetic-benchmark/demos/gpt-oss-120b/index.html"),
} as const;

const screenshotPaths = {
  gpt54: "/phonetic-benchmark/screenshots/gpt-5-4-high-quiz.png",
  gpt55: "/phonetic-benchmark/screenshots/gpt-5-5-high-quiz.png",
  gemini35: "/phonetic-benchmark/screenshots/gemini-3-5-flash-high-quiz.png",
  gemini31: "/phonetic-benchmark/screenshots/gemini-3-1-pro-high-quiz.png",
  sonnet46: "/phonetic-benchmark/screenshots/sonnet-4-6-thinking-quiz.png",
  owlAlpha: "/phonetic-benchmark/screenshots/owl-alpha-quiz.png",
  gemma426b: "/phonetic-benchmark/screenshots/gemma-4-26b-quiz.png",
  nemotron3Super: "/phonetic-benchmark/screenshots/nemotron-3-super-quiz.png",
  lagunaM1: "/phonetic-benchmark/screenshots/laguna-m-1-quiz.png",
  deepseekV4Pro: "/phonetic-benchmark/screenshots/deepseek-v4-pro-quiz.png",
  gptOss120b: "/phonetic-benchmark/screenshots/gpt-oss-120b-quiz.png",
} as const;

export const phoneticBenchmarkReports = {
  en: {
    lang: "en",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Static qualitative benchmark report reviewing archived Phonetic Alphabet Trainer outputs from eleven AI model runs.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "A qualitative review of AI model outputs for the same Phonetic Alphabet Trainer specification, with archived static demos.",
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
      "A static qualitative report reviewing eleven archived outputs for the same Phonetic Alphabet Trainer specification. The point is not a numeric leaderboard. The useful signal is whether the output is usable, where it breaks, and what that says about AI-assisted product work.",
    protocolHeading: "Benchmark Protocol",
    protocol: [
      "Each model receives the same project specification and one implementation prompt.",
      "The target is a working project that matches the specification and can be walked through manually on the intended user path.",
      "The archived demos are preserved as static outputs, so the comparison stays inspectable after the run.",
      "Quantitative fields support the report, but the conclusion is qualitative: product fit, UX behavior, testing discipline, and implementation tradeoffs.",
    ],
    resultsHeading: "Run Review Matrix",
    resultsIntro:
      "Runs are listed from oldest to newest by execution order. The order is part of the source data so the report can keep a stable chronology as new model runs are added.",
    tableLabels: {
      executionOrder: "Run",
      model: "Model",
      effort: "Effort",
      promptCount: "Prompts",
      elapsed: "Elapsed",
      sourceLoc: "Source LoC",
      stack: "Stack",
      verdict: "Review note",
    },
    unspecifiedEffortLabel: "Not specified",
    markdownRunLabels: {
      executionOrder: "Execution order",
      primaryFinding: "Primary finding",
      notesDiscipline: "Notes discipline",
      gitUse: "Git use",
      screenshot: "Screenshot",
      demo: "Demo",
    },
    runs: [
      {
        id: "gpt-5-4-high",
        executionOrder: 1,
        model: "GPT 5.4",
        effort: "High",
        promptCount: "1",
        elapsed: "9 minutes",
        sourceLoc: "1,261",
        stack: "Vite, TypeScript, browser DOM APIs, Vitest",
        notesDiscipline: "Left implementation notes.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "Keyboard answer mode did not preserve focus, which is a major issue for the core quiz flow.",
        verdict: "Usable first pass with a core interaction issue to inspect.",
        screenshotPath: screenshotPaths.gpt54,
        screenshotAlt:
          "Archived quiz state from the GPT 5.4 High Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for GPT 5.4 High.",
        demoUrl: demoUrls.gpt54,
      },
      {
        id: "gpt-5-5-high",
        executionOrder: 2,
        model: "GPT 5.5",
        effort: "High",
        promptCount: "1",
        elapsed: "15 minutes",
        sourceLoc: "1,117",
        stack:
          "Plain JavaScript, browser DOM APIs, custom Node static server, node:test",
        notesDiscipline: "Left implementation notes.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding: "No open objections from the manual review pass.",
        verdict: "Reviewed without open objections on the intended flow.",
        screenshotPath: screenshotPaths.gpt55,
        screenshotAlt:
          "Archived quiz state from the GPT 5.5 High Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for GPT 5.5 High.",
        demoUrl: demoUrls.gpt55,
      },
      {
        id: "gemini-3-5-flash-high",
        executionOrder: 3,
        model: "Gemini 3.5 Flash",
        effort: "High",
        promptCount: "1",
        elapsed: "2 minutes",
        sourceLoc: "1,913",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "Quiz content jumps when feedback notifications appear.",
        verdict: "Fast output with a visible interface stability issue.",
        screenshotPath: screenshotPaths.gemini35,
        screenshotAlt:
          "Archived quiz state from the Gemini 3.5 Flash High Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Gemini 3.5 Flash High.",
        demoUrl: demoUrls.gemini35,
      },
      {
        id: "gemini-3-1-pro-high",
        executionOrder: 4,
        model: "Gemini 3.1 Pro",
        effort: "High",
        promptCount: "1",
        elapsed: "4 minutes",
        sourceLoc: "857",
        stack: "Vite, TypeScript, browser DOM APIs",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The hint action only refreshed the interface instead of revealing the current answer.",
        verdict:
          "Contract-failing run because required hint behavior is broken.",
        screenshotPath: screenshotPaths.gemini31,
        screenshotAlt:
          "Archived quiz state from the Gemini 3.1 Pro High Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Gemini 3.1 Pro High.",
        demoUrl: demoUrls.gemini31,
      },
      {
        id: "sonnet-4-6-thinking",
        executionOrder: 5,
        model: "Claude Sonnet 4.6",
        effort: "Thinking",
        promptCount: "1",
        elapsed: "7 minutes",
        sourceLoc: "1,235",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "Left implementation notes in app/README.md.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "No open manual-review issues were reported for the intended flow.",
        verdict: "Fast comparable run with tests and no open objections.",
        screenshotPath: screenshotPaths.sonnet46,
        screenshotAlt:
          "Archived quiz state from the Claude Sonnet 4.6 Thinking Phonetic Alphabet Trainer output.",
        screenshotCaption:
          "Archived quiz state for Claude Sonnet 4.6 Thinking.",
        demoUrl: demoUrls.sonnet46,
      },
      {
        id: "owl-alpha",
        executionOrder: 6,
        model: "Owl Alpha",
        effort: "",
        promptCount: "2",
        elapsed: "20 minutes",
        sourceLoc: "1,137",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The run started by challenging the benchmark scope, and the exercise loop adds friction: no keyboard advance after correct answers, no reset path, and focus loss after wrong keyboard answers.",
        verdict:
          "Comparable run with strong tests but several workflow and interaction issues.",
        screenshotPath: screenshotPaths.owlAlpha,
        screenshotAlt:
          "Archived quiz state from the Owl Alpha Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Owl Alpha.",
        demoUrl: demoUrls.owlAlpha,
      },
      {
        id: "gemma-4-26b",
        executionOrder: 7,
        model: "Gemma 4 26B",
        effort: "",
        promptCount: "4",
        elapsed: "35 minutes",
        sourceLoc: "635",
        stack: "Vite, vanilla JavaScript, browser DOM APIs",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "Output-limit recovery failed during the run, and the final app still loses input focus between questions in keyboard mode.",
        verdict:
          "Comparable final app with workflow fragility and a keyboard UX issue.",
        screenshotPath: screenshotPaths.gemma426b,
        screenshotAlt:
          "Archived quiz state from the Gemma 4 26B Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Gemma 4 26B.",
        demoUrl: demoUrls.gemma426b,
      },
      {
        id: "nemotron-3-super",
        executionOrder: 8,
        model: "Nemotron 3 Super",
        effort: "",
        promptCount: "1",
        elapsed: "35 minutes",
        sourceLoc: "612",
        stack: "Plain JavaScript, browser DOM APIs, http-server",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The quiz cannot progress past the first symbol because the Next button does not work after a correct answer, and suggestion mode still shows the keyboard input.",
        verdict: "Contract-failing run because the core quiz flow is blocked.",
        screenshotPath: screenshotPaths.nemotron3Super,
        screenshotAlt:
          "Archived quiz state from the Nemotron 3 Super Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Nemotron 3 Super.",
        demoUrl: demoUrls.nemotron3Super,
      },
      {
        id: "laguna-m-1",
        executionOrder: 9,
        model: "Laguna M.1",
        effort: "",
        promptCount: "1",
        elapsed: "30 minutes",
        sourceLoc: "885",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The app is comparable, but reset requires a page refresh and focus is not moved to the next answer control after advancing.",
        verdict: "Comparable run with reset and keyboard-focus friction.",
        screenshotPath: screenshotPaths.lagunaM1,
        screenshotAlt:
          "Archived quiz state from the Laguna M.1 Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for Laguna M.1.",
        demoUrl: demoUrls.lagunaM1,
      },
      {
        id: "deepseek-v4-pro",
        executionOrder: 10,
        model: "DeepSeek V4 Pro",
        effort: "",
        promptCount: "1",
        elapsed: "10 minutes",
        sourceLoc: "1,601",
        stack:
          "Plain JavaScript, browser DOM APIs, custom Node static/API server, node:test",
        notesDiscipline: "Left substantive decisions in app/DECISIONS.md.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The app restricts restart and language switching during active runs, but documents those choices and does not break the benchmark contract.",
        verdict: "Fast comparable run with explicit decision documentation.",
        screenshotPath: screenshotPaths.deepseekV4Pro,
        screenshotAlt:
          "Archived quiz state from the DeepSeek V4 Pro Phonetic Alphabet Trainer output.",
        screenshotCaption: "Archived quiz state for DeepSeek V4 Pro.",
        demoUrl: demoUrls.deepseekV4Pro,
      },
      {
        id: "gpt-oss-120b",
        executionOrder: 11,
        model: "gpt-oss-120b",
        effort: "",
        promptCount: "2",
        elapsed: "5 minutes",
        sourceLoc: "110",
        stack: "Express, plain JavaScript, minimal static page",
        notesDiscipline: "No implementation notes found.",
        gitUse: "No model-authored git workflow observed.",
        primaryFinding:
          "The model asked for confirmation before building the web app example, then produced an app that does not work.",
        verdict: "Unrunnable result.",
        screenshotPath: screenshotPaths.gptOss120b,
        screenshotAlt:
          "Archived output from the gpt-oss-120b Phonetic Alphabet Trainer run.",
        screenshotCaption: "Archived output for gpt-oss-120b.",
        demoUrl: demoUrls.gptOss120b,
      },
    ],
    currentBestHeading: "Best Current Read",
    currentBestText:
      "With eleven runs, this is still a provisional read rather than a stable best-model section. GPT 5.5 High and Claude Sonnet 4.6 Thinking are the archived outputs with no open objections from the manual review pass. GPT 5.5 High remains the strongest reference candidate because it delivered that result as a simple static page with a small source footprint.",
    findingsHeading: "Qualitative Findings",
    findingsIntro:
      "The benchmark is useful because the failures are concrete. A missing focus behavior changes whether the quiz is comfortable to use. A layout jump changes whether the interface feels stable. A slower build can still be the better product artifact if it preserves the intended flow. The review notes below are shown newest first, while execution order remains the stable run identifier. Screenshots and demo links sit with each run as archived evidence, not live benchmark infrastructure.",
    findingLabels: {
      notes: "Notes",
      git: "Git",
    },
    artifactHeading: "Archived Demos",
    artifactIntro:
      "Each demo is the static output archived for this report. They are not live benchmark infrastructure.",
    demoLabel: "Open archived demo",
    closingHeading: "Why This Belongs Here",
    closingText:
      "The report documents the same judgment this site is built around: AI can produce code quickly, but the durable advantage is knowing what to inspect, what counts as a product failure, and when an output is actually worth shipping.",
  },
  pl: {
    lang: "pl",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Statyczny raport jakościowy o archiwalnych wersjach Phonetic Alphabet Trainer przygotowanych w jedenastu próbach modeli AI.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "Jakościowy przegląd jedenastu wersji przygotowanych przez modele AI na podstawie tej samej specyfikacji Phonetic Alphabet Trainer, z archiwalnymi demo.",
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
      "Statyczny raport jakościowy o jedenastu archiwalnych wersjach przygotowanych na podstawie tej samej specyfikacji Phonetic Alphabet Trainer. To nie jest ranking punktowy. Ważne jest to, czy dana wersja da się wygodnie używać, gdzie się psuje i co mówi o pracy produktowej z AI.",
    protocolHeading: "Protokół benchmarku",
    protocol: [
      "Każdy model dostaje tę samą specyfikację projektu i jedno polecenie zbudowania aplikacji.",
      "Celem jest działający projekt zgodny ze specyfikacją, który da się ręcznie przejść w zakładanym scenariuszu użytkownika.",
      "Każde demo zostaje zachowane jako statyczna wersja, żeby porównanie dało się sprawdzić także po zakończeniu próby.",
      "Liczby są pomocnicze. Wniosek pozostaje jakościowy: dopasowanie do produktu, zachowanie interfejsu, dyscyplina testów i decyzje implementacyjne.",
    ],
    resultsHeading: "Tabela przeglądu prób",
    resultsIntro:
      "Próby są pokazane od najstarszej do najnowszej według kolejności wykonania. Ten porządek jest częścią danych źródłowych, żeby raport zachował stabilną chronologię po dodaniu kolejnych modeli.",
    tableLabels: {
      executionOrder: "Próba",
      model: "Model",
      effort: "Tryb",
      promptCount: "Prompty",
      elapsed: "Czas",
      sourceLoc: "Linie kodu",
      stack: "Technologie",
      verdict: "Notatka z przeglądu",
    },
    unspecifiedEffortLabel: "Nie podano",
    markdownRunLabels: {
      executionOrder: "Kolejność wykonania",
      primaryFinding: "Główny wniosek",
      notesDiscipline: "Dyscyplina notatek",
      gitUse: "Użycie git",
      screenshot: "Zrzut ekranu",
      demo: "Demo",
    },
    runs: [
      {
        id: "gpt-5-4-high",
        executionOrder: 1,
        model: "GPT 5.4",
        effort: "High",
        promptCount: "1",
        elapsed: "9 minut",
        sourceLoc: "1,261",
        stack: "Vite, TypeScript, browser DOM APIs, Vitest",
        notesDiscipline: "Zostawił notatki z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Tryb odpowiedzi z klawiatury nie utrzymywał aktywnego pola, co jest poważnym problemem w głównej ścieżce quizu.",
        verdict:
          "Używalna pierwsza wersja z problemem w głównej interakcji do sprawdzenia.",
        screenshotPath: screenshotPaths.gpt54,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez GPT 5.4 High.",
        screenshotCaption: "Archiwalny stan quizu dla GPT 5.4 High.",
        demoUrl: demoUrls.gpt54,
      },
      {
        id: "gpt-5-5-high",
        executionOrder: 2,
        model: "GPT 5.5",
        effort: "High",
        promptCount: "1",
        elapsed: "15 minut",
        sourceLoc: "1,117",
        stack:
          "Plain JavaScript, browser DOM APIs, custom Node static server, node:test",
        notesDiscipline: "Zostawił notatki z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding: "Brak otwartych zastrzeżeń po ręcznym sprawdzeniu.",
        verdict:
          "Po sprawdzeniu bez otwartych zastrzeżeń w zakładanej ścieżce.",
        screenshotPath: screenshotPaths.gpt55,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez GPT 5.5 High.",
        screenshotCaption: "Archiwalny stan quizu dla GPT 5.5 High.",
        demoUrl: demoUrls.gpt55,
      },
      {
        id: "gemini-3-5-flash-high",
        executionOrder: 3,
        model: "Gemini 3.5 Flash",
        effort: "High",
        promptCount: "1",
        elapsed: "2 minuty",
        sourceLoc: "1,913",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Treść quizu przesuwa się, gdy pojawiają się komunikaty po odpowiedzi.",
        verdict: "Szybka wersja z widocznym problemem stabilności interfejsu.",
        screenshotPath: screenshotPaths.gemini35,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Gemini 3.5 Flash High.",
        screenshotCaption: "Archiwalny stan quizu dla Gemini 3.5 Flash High.",
        demoUrl: demoUrls.gemini35,
      },
      {
        id: "gemini-3-1-pro-high",
        executionOrder: 4,
        model: "Gemini 3.1 Pro",
        effort: "High",
        promptCount: "1",
        elapsed: "4 minuty",
        sourceLoc: "857",
        stack: "Vite, TypeScript, browser DOM APIs",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Akcja podpowiedzi tylko odświeżała interfejs zamiast ujawniać bieżącą odpowiedź.",
        verdict:
          "Próba niespełniająca kontraktu, bo wymagane zachowanie podpowiedzi jest zepsute.",
        screenshotPath: screenshotPaths.gemini31,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Gemini 3.1 Pro High.",
        screenshotCaption: "Archiwalny stan quizu dla Gemini 3.1 Pro High.",
        demoUrl: demoUrls.gemini31,
      },
      {
        id: "sonnet-4-6-thinking",
        executionOrder: 5,
        model: "Claude Sonnet 4.6",
        effort: "Thinking",
        promptCount: "1",
        elapsed: "7 minut",
        sourceLoc: "1,235",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "Zostawił notatki z implementacji w app/README.md.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Nie zgłoszono ręcznie znalezionych problemów w zakładanej ścieżce.",
        verdict:
          "Szybka porównywalna próba z testami i bez otwartych zastrzeżeń.",
        screenshotPath: screenshotPaths.sonnet46,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Claude Sonnet 4.6 Thinking.",
        screenshotCaption:
          "Archiwalny stan quizu dla Claude Sonnet 4.6 Thinking.",
        demoUrl: demoUrls.sonnet46,
      },
      {
        id: "owl-alpha",
        executionOrder: 6,
        model: "Owl Alpha",
        effort: "",
        promptCount: "2",
        elapsed: "20 minut",
        sourceLoc: "1,137",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Próba zaczęła się od zakwestionowania zakresu benchmarku, a pętla ćwiczenia ma tarcie: brak przejścia klawiaturą po poprawnej odpowiedzi, brak resetu i utrata fokusu po błędnej odpowiedzi z klawiatury.",
        verdict:
          "Porównywalna próba z mocnymi testami, ale kilkoma problemami przebiegu i interakcji.",
        screenshotPath: screenshotPaths.owlAlpha,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Owl Alpha.",
        screenshotCaption: "Archiwalny stan quizu dla Owl Alpha.",
        demoUrl: demoUrls.owlAlpha,
      },
      {
        id: "gemma-4-26b",
        executionOrder: 7,
        model: "Gemma 4 26B",
        effort: "",
        promptCount: "4",
        elapsed: "35 minut",
        sourceLoc: "635",
        stack: "Vite, vanilla JavaScript, browser DOM APIs",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Odzyskanie pracy po limicie odpowiedzi się nie udało, a finalna aplikacja nadal traci fokus pola odpowiedzi między pytaniami w trybie klawiatury.",
        verdict:
          "Porównywalna finalna aplikacja z kruchością przebiegu i problemem keyboard UX.",
        screenshotPath: screenshotPaths.gemma426b,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Gemma 4 26B.",
        screenshotCaption: "Archiwalny stan quizu dla Gemma 4 26B.",
        demoUrl: demoUrls.gemma426b,
      },
      {
        id: "nemotron-3-super",
        executionOrder: 8,
        model: "Nemotron 3 Super",
        effort: "",
        promptCount: "1",
        elapsed: "35 minut",
        sourceLoc: "612",
        stack: "Plain JavaScript, browser DOM APIs, http-server",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Quiz nie przechodzi za pierwszą literę, bo przycisk Next po poprawnej odpowiedzi nie działa, a tryb podpowiedzi nadal pokazuje pole odpowiedzi z klawiatury.",
        verdict:
          "Próba niespełniająca kontraktu, bo główna pętla quizu jest zablokowana.",
        screenshotPath: screenshotPaths.nemotron3Super,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Nemotron 3 Super.",
        screenshotCaption: "Archiwalny stan quizu dla Nemotron 3 Super.",
        demoUrl: demoUrls.nemotron3Super,
      },
      {
        id: "laguna-m-1",
        executionOrder: 9,
        model: "Laguna M.1",
        effort: "",
        promptCount: "1",
        elapsed: "30 minut",
        sourceLoc: "885",
        stack: "Vite, vanilla JavaScript, browser DOM APIs, Vitest",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Aplikacja jest porównywalna, ale reset wymaga odświeżenia strony, a fokus nie przechodzi na kolejną kontrolkę odpowiedzi po zmianie litery.",
        verdict: "Porównywalna próba z tarciem w resecie i obsłudze fokusu.",
        screenshotPath: screenshotPaths.lagunaM1,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez Laguna M.1.",
        screenshotCaption: "Archiwalny stan quizu dla Laguna M.1.",
        demoUrl: demoUrls.lagunaM1,
      },
      {
        id: "deepseek-v4-pro",
        executionOrder: 10,
        model: "DeepSeek V4 Pro",
        effort: "",
        promptCount: "1",
        elapsed: "10 minut",
        sourceLoc: "1,601",
        stack:
          "Plain JavaScript, browser DOM APIs, custom Node static/API server, node:test",
        notesDiscipline: "Zostawił rzeczowe decyzje w app/DECISIONS.md.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Aplikacja ogranicza restart i zmianę języka w trakcie aktywnej próby, ale dokumentuje te decyzje i nie łamie kontraktu benchmarku.",
        verdict: "Szybka porównywalna próba z jawną dokumentacją decyzji.",
        screenshotPath: screenshotPaths.deepseekV4Pro,
        screenshotAlt:
          "Archiwalny stan quizu Phonetic Alphabet Trainer przygotowanego przez DeepSeek V4 Pro.",
        screenshotCaption: "Archiwalny stan quizu dla DeepSeek V4 Pro.",
        demoUrl: demoUrls.deepseekV4Pro,
      },
      {
        id: "gpt-oss-120b",
        executionOrder: 11,
        model: "gpt-oss-120b",
        effort: "",
        promptCount: "2",
        elapsed: "5 minut",
        sourceLoc: "110",
        stack: "Express, plain JavaScript, minimal static page",
        notesDiscipline: "Nie znaleziono notatek z implementacji.",
        gitUse: "Nie widać, żeby model sam prowadził pracę w git.",
        primaryFinding:
          "Model poprosił o potwierdzenie przed zbudowaniem przykładowej web appki, a potem dostarczył aplikację, która nie działa.",
        verdict: "Wynik niedziałający.",
        screenshotPath: screenshotPaths.gptOss120b,
        screenshotAlt:
          "Archiwalny wynik próby Phonetic Alphabet Trainer przygotowanej przez gpt-oss-120b.",
        screenshotCaption: "Archiwalny wynik dla gpt-oss-120b.",
        demoUrl: demoUrls.gptOss120b,
      },
    ],
    currentBestHeading: "Najlepszy odczyt na teraz",
    currentBestText:
      "Przy jedenastu próbach to nadal tymczasowy odczyt, a nie stabilna sekcja najlepszych modeli. GPT 5.5 High i Claude Sonnet 4.6 Thinking to archiwalne wersje bez otwartych zastrzeżeń po ręcznym sprawdzeniu. GPT 5.5 High pozostaje najmocniejszym kandydatem referencyjnym, bo dowiózł taki wynik jako prostą statyczną stronę z niewielką liczbą linii kodu.",
    findingsHeading: "Wnioski jakościowe",
    findingsIntro:
      "Benchmark jest użyteczny dlatego, że problemy są konkretne. Utrata aktywnego pola zmienia komfort korzystania z quizu. Przesuwający się układ zmienia poczucie stabilności interfejsu. Wolniejsza wersja nadal może być lepszym materiałem produktowym, jeśli zachowuje zakładaną ścieżkę użytkownika. Poniższe notatki są pokazane od najnowszych, a kolejność wykonania pozostaje stałym identyfikatorem próby. Screenshoty i linki do demo są przy każdej próbie jako archiwalny materiał, a nie żywa infrastruktura benchmarku.",
    findingLabels: {
      notes: "Notatki",
      git: "Git",
    },
    artifactHeading: "Archiwalne demo",
    artifactIntro:
      "Każde demo to statyczna wersja zachowana dla tego raportu. To nie jest żywa infrastruktura benchmarku.",
    demoLabel: "Otwórz archiwalne demo",
    closingHeading: "Dlaczego to jest na tej stronie",
    closingText:
      "Raport dokumentuje ten sam typ oceny, na którym opiera się ta strona: AI potrafi szybko produkować kod, ale trwała przewaga leży w tym, żeby wiedzieć, co sprawdzać, co jest realnym problemem produktu i kiedy dana wersja naprawdę nadaje się do pokazania dalej.",
  },
} as const satisfies Record<BenchmarkReportLang, BenchmarkReportCopy>;

export function getPhoneticBenchmarkMarkdownUrl(
  lang: BenchmarkReportLang,
): string {
  return url(phoneticBenchmarkReports[lang].markdownPath);
}
