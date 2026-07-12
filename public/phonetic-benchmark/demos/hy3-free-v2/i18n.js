// Internationalization strings for the Phonetic Benchmark v2 application.
//
// The benchmark requires every user-visible string to be available in both
// Polish and English. Keys are language-neutral; the UI looks them up by key.

export const STRINGS = {
  pl: {
    appTitle: "Trener Alfabetu Fonetycznego",
    appSubtitle: "Ćwicz alfabet fonetyczny: polski i NATO",
    setupHeading: "Ustawienia ćwiczenia",
    languageLabel: "Język interfejsu",
    alphabetLabel: "Alfabet",
    modeLabel: "Tryb ćwiczenia",
    polishAlphabet: "Polski alfabet fonetyczny",
    natoAlphabet: "Alfabet fonetyczny NATO",
    keyboardMode: "Tryb klawiaturowy",
    suggestionMode: "Tryb z podpowiedziami",
    keyboardModeDesc: "Wpisz pasujące słowo kodowe.",
    suggestionModeDesc: "Kliknij właściwe słowo z czterech propozycji.",
    startButton: "Rozpocznij ćwiczenie",
    hintButton: "Podpowiedź",
    submitButton: "Zatwierdź",
    nextLabel: "Postęp",
    questionLabel: "Podaj słowo kodowe dla symbolu:",
    wrongAnswer: "Niepoprawnie. Spróbuj ponownie.",
    hintRevealed: "Podpowiedź: poprawne słowo to",
    hintUsed: "Użyto podpowiedzi",
    scoreLabel: "Wynik",
    resultHeading: "Ćwiczenie zakończone",
    resultScore: "Twój wynik",
    resultAlphabet: "Alfabet",
    resultMode: "Tryb",
    resultClean: "Pytania bez podpowiedzi",
    resultHinted: "Pytania z podpowiedzią",
    restartButton: "Rozpocznij ponownie",
    setupButton: "Zmień ustawienia",
    attribution:
      "Phonetic Benchmark autorstwa Piotr Kacała (piotrkacala.pl). Opracowane przez {model} w dniu {date}.",
    languageName: "Polski",
    modeKeyboard: "klawiaturowy",
    modeSuggestion: "z podpowiedziami",
    langPolish: "Polski",
    langEnglish: "Angielski",
    switchLanguageNote:
      "Język interfejsu można zmienić tylko na ekranie ustawień. Podczas trwania ćwiczenia pozostaje stały."
  },
  en: {
    appTitle: "Phonetic Alphabet Trainer",
    appSubtitle: "Practice the phonetic alphabet: Polish and NATO",
    setupHeading: "Exercise setup",
    languageLabel: "Interface language",
    alphabetLabel: "Alphabet",
    modeLabel: "Exercise mode",
    polishAlphabet: "Polish phonetic alphabet",
    natoAlphabet: "NATO phonetic alphabet",
    keyboardMode: "Keyboard mode",
    suggestionMode: "Suggestion mode",
    keyboardModeDesc: "Type the matching codeword.",
    suggestionModeDesc: "Click the correct word from four suggestions.",
    startButton: "Start exercise",
    hintButton: "Hint",
    submitButton: "Submit",
    nextLabel: "Progress",
    questionLabel: "Enter the codeword for symbol:",
    wrongAnswer: "Incorrect. Try again.",
    hintRevealed: "Hint: the correct word is",
    hintUsed: "Hint used",
    scoreLabel: "Score",
    resultHeading: "Exercise complete",
    resultScore: "Your score",
    resultAlphabet: "Alphabet",
    resultMode: "Mode",
    resultClean: "Clean questions",
    resultHinted: "Hinted questions",
    restartButton: "Start again",
    setupButton: "Change setup",
    attribution:
      "Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by {model} on {date}.",
    languageName: "English",
    modeKeyboard: "keyboard",
    modeSuggestion: "suggestion",
    langPolish: "Polish",
    langEnglish: "English",
    switchLanguageNote:
      "Interface language can only be changed on the setup screen. It stays fixed during an active run."
  }
};

export function translate(lang, key, vars = {}) {
  const table = STRINGS[lang] || STRINGS.en;
  let value = table[key] != null ? table[key] : key;
  for (const [name, val] of Object.entries(vars)) {
    value = value.replace(new RegExp(`\\{${name}\\}`, "g"), String(val));
  }
  return value;
}
