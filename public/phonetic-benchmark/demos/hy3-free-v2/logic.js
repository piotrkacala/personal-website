// Core, framework-free logic for the Phonetic Benchmark v2 application.
//
// This module is intentionally free of any DOM or framework dependency so it can
// be unit-tested directly with `node --test` and reused by the browser UI.
//
// Data loading is environment-aware:
// - In Node (tests, build), benchmark data is read from disk with `node:fs`.
// - In the browser, the same data is fetched over HTTP from /benchmark-data.
// The benchmark contract requires these files to be the single source of truth;
// the application must not generate option sets at runtime.

// Populated by initData(). Live bindings so importers see the loaded values.
export let ALPHABETS = null;
export let OPTIONS = null;

let dataReady = null;

export async function initData() {
  if (dataReady) return dataReady;
  dataReady = (async () => {
    const isBrowser =
      typeof window !== "undefined" && typeof window.fetch === "function";
    if (isBrowser) {
      const base = "./benchmark-data/";
      const [a, o] = await Promise.all([
        window.fetch(base + "alphabets.json").then((r) => r.json()),
        window
          .fetch(base + "multiple-choice-options.json")
          .then((r) => r.json()),
      ]);
      ALPHABETS = a;
      OPTIONS = o;
    } else {
      // Dynamic import keeps `node:fs`, `node:path`, and `node:url` out of the
      // browser module graph.
      const { readFileSync } = await import("node:fs");
      const { dirname, join } = await import("node:path");
      const { fileURLToPath } = await import("node:url");
      const here = dirname(fileURLToPath(import.meta.url));
      ALPHABETS = JSON.parse(
        readFileSync(
          join(here, "..", "benchmark-data", "alphabets.json"),
          "utf8",
        ),
      );
      OPTIONS = JSON.parse(
        readFileSync(
          join(here, "..", "benchmark-data", "multiple-choice-options.json"),
          "utf8",
        ),
      );
    }
    return { ALPHABETS, OPTIONS };
  })();
  return dataReady;
}

export const SUPPORTED_ALPHABETS = ["polish", "nato"];
export const SUPPORTED_LANGUAGES = ["pl", "en"];
export const MODES = ["keyboard", "suggestion"];

// Fisher-Yates shuffle. Accepts an optional RNG so tests can be deterministic
// without depending on one fixed order. Defaults to Math.random.
export function shuffle(array, rng = Math.random) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Normalize a keyboard answer for comparison:
// - trim leading/trailing whitespace
// - case-insensitive
// - diacritics remain significant (we do NOT strip or fold them)
export function normalizeKeyboardAnswer(raw) {
  return String(raw).trim();
}

export function isKeyboardAnswerCorrect(raw, expectedCodeword) {
  const given = normalizeKeyboardAnswer(raw).toUpperCase();
  const expected = String(expectedCodeword).toUpperCase();
  return given === expected;
}

// Build the four suggestion options for a symbol from the fixed benchmark data.
// Returns an array of exactly four codeword strings, already shuffled.
export function buildSuggestionOptions(alphabetKey, symbol, rng = Math.random) {
  if (!OPTIONS) throw new Error("benchmark data not initialized");
  const set = OPTIONS[alphabetKey] && OPTIONS[alphabetKey][symbol];
  if (!Array.isArray(set) || set.length !== 4) {
    throw new Error(
      `Missing or invalid fixed suggestion options for ${alphabetKey}/${symbol}`,
    );
  }
  return shuffle(set, rng);
}

// Build a full run plan: the full selected alphabet, each symbol once, in
// randomized order. Returns an array of { symbol, codeword } objects.
export function buildRunPlan(alphabetKey, rng = Math.random) {
  if (!ALPHABETS) throw new Error("benchmark data not initialized");
  const list = ALPHABETS[alphabetKey];
  if (!Array.isArray(list)) {
    throw new Error(`Unknown alphabet: ${alphabetKey}`);
  }
  return shuffle(list, rng);
}

// Compute the final score using the benchmark's deterministic hint-based rule.
// score_percent = round((clean_questions / total_questions) * 100)
export function computeScore(totalQuestions, hintedQuestions) {
  if (totalQuestions <= 0) return 0;
  const clean = totalQuestions - hintedQuestions;
  return Math.round((clean / totalQuestions) * 100);
}
