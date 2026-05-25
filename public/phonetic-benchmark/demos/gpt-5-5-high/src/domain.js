export const ALPHABET_KEYS = ["polish", "nato"];
export const MODE_KEYS = ["keyboard", "suggestion"];

export function normalizeAnswer(value, locale = "pl-PL") {
  return String(value).trim().toLocaleUpperCase(locale);
}

export function isCorrectAnswer(value, codeword) {
  return normalizeAnswer(value) === normalizeAnswer(codeword);
}

export function calculateScorePercent(totalQuestions, hintedQuestions) {
  if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
    throw new Error("totalQuestions must be a positive integer");
  }

  if (!Number.isInteger(hintedQuestions) || hintedQuestions < 0 || hintedQuestions > totalQuestions) {
    throw new Error("hintedQuestions must be an integer from 0 to totalQuestions");
  }

  return Math.round(((totalQuestions - hintedQuestions) / totalQuestions) * 100);
}

export function shuffle(items, rng = Math.random) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function createRun({ alphabetKey, mode, alphabets, multipleChoiceOptions, rng = Math.random }) {
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

  const orderedEntries = shuffle(alphabet, rng);
  const questions = orderedEntries.map((entry) => {
    const question = {
      symbol: entry.symbol,
      codeword: entry.codeword,
      hinted: false
    };

    if (mode === "suggestion") {
      const fixedOptions = multipleChoiceOptions?.[alphabetKey]?.[entry.symbol];
      if (!Array.isArray(fixedOptions) || fixedOptions.length !== 4) {
        throw new Error(`Missing fixed suggestion options for ${alphabetKey}.${entry.symbol}`);
      }

      if (!fixedOptions.includes(entry.codeword)) {
        throw new Error(`Suggestion options for ${alphabetKey}.${entry.symbol} do not include ${entry.codeword}`);
      }

      question.options = shuffle(fixedOptions, rng);
    }

    return question;
  });

  return {
    alphabetKey,
    mode,
    currentIndex: 0,
    questions
  };
}

export function getCurrentQuestion(run) {
  return run.questions[run.currentIndex] ?? null;
}

export function isRunComplete(run) {
  return run.currentIndex >= run.questions.length;
}

export function markHintUsed(run) {
  const question = getCurrentQuestion(run);
  if (question) {
    question.hinted = true;
  }
}

export function submitAnswer(run, answer) {
  const question = getCurrentQuestion(run);
  if (!question) {
    return { accepted: false, complete: true };
  }

  if (!isCorrectAnswer(answer, question.codeword)) {
    return { accepted: false, complete: false };
  }

  run.currentIndex += 1;

  return {
    accepted: true,
    complete: isRunComplete(run)
  };
}

export function summarizeRun(run) {
  const totalQuestions = run.questions.length;
  const hintedQuestions = run.questions.filter((question) => question.hinted).length;

  return {
    totalQuestions,
    hintedQuestions,
    cleanQuestions: totalQuestions - hintedQuestions,
    scorePercent: calculateScorePercent(totalQuestions, hintedQuestions)
  };
}
