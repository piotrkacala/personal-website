export const IMPLEMENTATION = {
  model: "GPT-5.5 (Codex)",
  date: "2026-06-15",
  benchmarkVersion: "v2"
};

export const ALPHABET_KEYS = ["polish", "nato"];
export const MODE_KEYS = ["keyboard", "suggestion"];

export function normalizeAnswer(value) {
  return String(value).trim().toLocaleUpperCase("pl-PL");
}

export function isCorrectAnswer(answer, codeword) {
  return normalizeAnswer(answer) === normalizeAnswer(codeword);
}

export function scorePercent(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    throw new Error("totalQuestions must be a positive integer");
  }

  if (
    !Number.isInteger(hintedQuestions) ||
    hintedQuestions < 0 ||
    hintedQuestions > totalQuestions
  ) {
    throw new Error("hintedQuestions must be an integer between 0 and totalQuestions");
  }

  return Math.round(((totalQuestions - hintedQuestions) / totalQuestions) * 100);
}

export function shuffle(items, rng = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function createRun({ alphabetKey, mode, alphabets, optionSets, rng = Math.random }) {
  if (!ALPHABET_KEYS.includes(alphabetKey)) {
    throw new Error(`Unsupported alphabet: ${alphabetKey}`);
  }

  if (!MODE_KEYS.includes(mode)) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  const alphabet = alphabets[alphabetKey];
  if (!Array.isArray(alphabet) || alphabet.length === 0) {
    throw new Error(`Missing alphabet data for ${alphabetKey}`);
  }

  const shuffledSymbols = shuffle(alphabet, rng);
  const questions = shuffledSymbols.map((entry) => {
    const question = {
      symbol: entry.symbol,
      codeword: entry.codeword,
      hinted: false
    };

    if (mode === "suggestion") {
      const fixedOptions = optionSets?.[alphabetKey]?.[entry.symbol];
      validateOptionSet(entry, fixedOptions);
      question.options = shuffle(fixedOptions, rng);
    }

    return question;
  });

  return {
    alphabetKey,
    mode,
    currentIndex: 0,
    questions,
    completed: false
  };
}

export function validateOptionSet(entry, options) {
  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(`Expected exactly four options for ${entry.symbol}`);
  }

  const uniqueOptions = new Set(options);
  if (uniqueOptions.size !== 4) {
    throw new Error(`Options must be unique for ${entry.symbol}`);
  }

  if (!uniqueOptions.has(entry.codeword)) {
    throw new Error(`Options must include the correct codeword for ${entry.symbol}`);
  }

  return true;
}

export function markHint(run) {
  const question = getCurrentQuestion(run);
  question.hinted = true;
  return question;
}

export function submitAnswer(run, answer) {
  const question = getCurrentQuestion(run);
  if (!isCorrectAnswer(answer, question.codeword)) {
    return { correct: false, completed: false };
  }

  const isLastQuestion = run.currentIndex === run.questions.length - 1;
  if (isLastQuestion) {
    run.completed = true;
  } else {
    run.currentIndex += 1;
  }

  return { correct: true, completed: run.completed };
}

export function getCurrentQuestion(run) {
  if (!run || run.completed || !Array.isArray(run.questions)) {
    throw new Error("Run is not active");
  }

  return run.questions[run.currentIndex];
}

export function getRunStats(run) {
  const totalQuestions = run.questions.length;
  const hintedQuestions = run.questions.filter((question) => question.hinted).length;
  return {
    totalQuestions,
    hintedQuestions,
    cleanQuestions: totalQuestions - hintedQuestions,
    scorePercent: scorePercent(totalQuestions, hintedQuestions)
  };
}
