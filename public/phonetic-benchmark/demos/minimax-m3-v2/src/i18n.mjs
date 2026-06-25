// Polish and English translations for every user-visible string.
//
// Convention: all keys are dot-separated lower-case paths, all values are
// plain strings. The `pick(tree, path)` helper resolves a dotted path or
// returns the key itself (the latter makes missing translations obvious in
// the UI rather than silently rendering the empty string).

export const STRINGS = {
  pl: {
    "app.title": "Test fonetyczny",
    "app.subtitle": "Ćwicz alfabet fonetyczny — wprowadzaj słowa kodowe dla wyświetlanych symboli.",
    "language.label": "Język interfejsu",
    "language.pl": "Polski",
    "language.en": "Angielski",
    "alphabet.label": "Alfabet",
    "alphabet.polish": "Polski alfabet fonetyczny",
    "alphabet.nato": "Alfabet fonetyczny NATO",
    "mode.label": "Tryb ćwiczenia",
    "mode.keyboard": "Tryb klawiatury",
    "mode.keyboard.description": "Wpisywanie słowa kodowego z klawiatury.",
    "mode.suggestion": "Tryb podpowiedzi",
    "mode.suggestion.description": "Wybór jednej z czterech opcji.",
    "actions.start": "Rozpocznij",
    "actions.submit": "Zatwierdź",
    "actions.hint": "Podpowiedź",
    "actions.restart": "Uruchom ponownie",
    "actions.quit": "Wróć do wyboru",
    "actions.runAgain": "Powtórz alfabet",
    "actions.backToSetup": "Wróć do wyboru",
    "run.progress": "Pytanie {current} z {total}",
    "run.symbolPrompt": "Podaj słowo kodowe dla symbolu",
    "run.placeholder": "Wpisz słowo kodowe…",
    "run.wrong": "Niepoprawna odpowiedź. Spróbuj ponownie.",
    "run.hintVisible": "Podpowiedź",
    "run.hintOnceUsed": "To pytanie użyło podpowiedzi i nie będzie liczone jako czyste.",
    "result.title": "Wynik końcowy",
    "result.percent": "{percent}%",
    "result.summary": "Ukończono {total} pytań, {clean} czystych, {hinted} z podpowiedzią.",
    "result.alphabet": "Alfabet: {alphabet}",
    "result.mode.keyboard": "Tryb: klawiatura",
    "result.mode.suggestion": "Tryb: podpowiedzi",
    "footer.attribution": "Phonetic Benchmark autorstwa Piotr Kacała (piotrkacala.pl). Opracowane przez {model} w dniu {date}.",
    "error.pickAll": "Wybierz alfabet i tryb, aby rozpocząć.",
    "mode.locked": "Tryb został ustalony przy starcie. Wróć do wyboru, aby go zmienić."
  },
  en: {
    "app.title": "Phonetic Benchmark",
    "app.subtitle": "Practice the phonetic alphabet — type or pick the codeword for each symbol.",
    "language.label": "Interface language",
    "language.pl": "Polish",
    "language.en": "English",
    "alphabet.label": "Alphabet",
    "alphabet.polish": "Polish phonetic alphabet",
    "alphabet.nato": "NATO phonetic alphabet",
    "mode.label": "Exercise mode",
    "mode.keyboard": "Keyboard mode",
    "mode.keyboard.description": "Type the codeword for each symbol.",
    "mode.suggestion": "Suggestion mode",
    "mode.suggestion.description": "Pick one of four options for each symbol.",
    "actions.start": "Start",
    "actions.submit": "Submit",
    "actions.hint": "Hint",
    "actions.restart": "Restart run",
    "actions.quit": "Back to setup",
    "actions.runAgain": "Run again",
    "actions.backToSetup": "Back to setup",
    "run.progress": "Question {current} of {total}",
    "run.symbolPrompt": "Codeword for symbol",
    "run.placeholder": "Type the codeword…",
    "run.wrong": "Wrong answer. Try again.",
    "run.hintVisible": "Hint",
    "run.hintOnceUsed": "A hint was used for this question. It will not count as clean.",
    "result.title": "Final result",
    "result.percent": "{percent}%",
    "result.summary": "Completed {total} questions — {clean} clean, {hinted} with hint.",
    "result.alphabet": "Alphabet: {alphabet}",
    "result.mode.keyboard": "Mode: keyboard",
    "result.mode.suggestion": "Mode: suggestion",
    "footer.attribution": "Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by {model} on {date}.",
    "error.pickAll": "Pick an alphabet and a mode to start.",
    "mode.locked": "Mode is locked for this run. Return to setup to change it."
  }
};

export const DEFAULT_LANGUAGE = "en";

export function pick(tree, path) {
  if (tree && typeof tree === "object" && path in tree) {
    const value = tree[path];
    if (typeof value === "string") return value;
  }
  return path;
}

export function translate(language, path, vars = {}) {
  const template = pick(STRINGS[language] || STRINGS[DEFAULT_LANGUAGE], path);
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function availableLanguages() {
  return Object.keys(STRINGS);
}
