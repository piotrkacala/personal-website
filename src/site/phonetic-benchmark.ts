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
  gpt54: url("/phonetic-benchmark/demos/gpt-5-4-high/"),
  gpt55: url("/phonetic-benchmark/demos/gpt-5-5-high/"),
  gemini35: url("/phonetic-benchmark/demos/gemini-3-5-flash-high/"),
} as const;

const screenshotPaths = {
  gpt54: "/phonetic-benchmark/screenshots/gpt-5-4-high-quiz.png",
  gpt55: "/phonetic-benchmark/screenshots/gpt-5-5-high-quiz.png",
  gemini35: "/phonetic-benchmark/screenshots/gemini-3-5-flash-high-quiz.png",
} as const;

export const phoneticBenchmarkReports = {
  en: {
    lang: "en",
    metadata: {
      title: "Phonetic Benchmark Report — Piotr Kacała",
      description:
        "Static qualitative benchmark report reviewing archived Phonetic Alphabet Trainer outputs from GPT 5.4 High, GPT 5.5 High, and Gemini 3.5 Flash High.",
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
      "A static qualitative report reviewing three archived outputs for the same Phonetic Alphabet Trainer specification. The point is not a numeric leaderboard. The useful signal is whether the output is usable, where it breaks, and what that says about AI-assisted product work.",
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
    ],
    currentBestHeading: "Best Current Read",
    currentBestText:
      "With only three runs, this is still a provisional read rather than a stable best-model section. For now, GPT 5.5 High is the only archived output with no open objections from the manual review pass. As the list grows, this section should summarize which models look strongest for product-quality agent work without replacing the chronological run log.",
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
        "Statyczny raport jakościowy o archiwalnych wersjach Phonetic Alphabet Trainer przygotowanych przez GPT 5.4 High, GPT 5.5 High i Gemini 3.5 Flash High.",
      openGraph: {
        title: "Phonetic Benchmark Report",
        description:
          "Jakościowy przegląd trzech wersji przygotowanych przez modele AI na podstawie tej samej specyfikacji Phonetic Alphabet Trainer, z archiwalnymi demo.",
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
      "Statyczny raport jakościowy o trzech archiwalnych wersjach przygotowanych na podstawie tej samej specyfikacji Phonetic Alphabet Trainer. To nie jest ranking punktowy. Ważne jest to, czy dana wersja da się wygodnie używać, gdzie się psuje i co mówi o pracy produktowej z AI.",
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
    ],
    currentBestHeading: "Najlepszy odczyt na teraz",
    currentBestText:
      "Przy trzech próbach to nadal tymczasowy odczyt, a nie stabilna sekcja najlepszych modeli. Na teraz GPT 5.5 High jest jedyną archiwalną wersją bez otwartych zastrzeżeń po ręcznym sprawdzeniu. Gdy lista urośnie, ta sekcja powinna krótko podsumowywać, które modele wyglądają najmocniej w pracy agentowej nad jakością produktu, bez zastępowania chronologicznego zapisu prób.",
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
