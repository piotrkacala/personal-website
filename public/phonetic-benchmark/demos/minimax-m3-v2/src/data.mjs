// Loads the canonical benchmark data files. The path is resolved relative to
// the project root so the same source of truth is used in Node tests and in
// the browser build (the in-browser copy is fetched by app.js and then
// validated through the same shape checks here).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "benchmark-data");

export const SUPPORTED_ALPHABETS = ["polish", "nato"];
export const SUPPORTED_LANGUAGES = ["pl", "en"];
export const SUPPORTED_MODES = ["keyboard", "suggestion"];

function loadJson(name) {
  const path = join(dataDir, name);
  const text = readFileSync(path, "utf8");
  return JSON.parse(text);
}

export function loadAlphabets() {
  return loadJson("alphabets.json");
}

export function loadMultipleChoiceOptions() {
  return loadJson("multiple-choice-options.json");
}

export function assertShape(alphabets, options) {
  for (const key of SUPPORTED_ALPHABETS) {
    const list = alphabets[key];
    if (!Array.isArray(list) || list.length === 0) {
      throw new Error(`alphabets: missing or empty list for ${key}`);
    }
    for (const entry of list) {
      if (typeof entry.symbol !== "string" || typeof entry.codeword !== "string") {
        throw new Error(`alphabets: entry missing symbol/codeword in ${key}`);
      }
    }
    const set = new Set(alphabets[key].map((e) => e.symbol));
    for (const symbol of set) {
      const opts = options?.[key]?.[symbol];
      if (!Array.isArray(opts) || opts.length !== 4) {
        throw new Error(`options: expected 4 options for ${key}/${symbol}`);
      }
      const correct = alphabets[key].find((e) => e.symbol === symbol).codeword;
      if (!opts.includes(correct)) {
        throw new Error(`options: ${key}/${symbol} missing correct codeword`);
      }
    }
  }
}

export function buildIndex(alphabets) {
  const idx = {};
  for (const key of SUPPORTED_ALPHABETS) {
    idx[key] = new Map(alphabets[key].map((e) => [e.symbol, e.codeword]));
  }
  return idx;
}
