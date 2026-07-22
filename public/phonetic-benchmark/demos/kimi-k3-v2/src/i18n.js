// Interface strings for the two supported interface languages.
// The benchmark requires Polish and English only, with all user-visible
// strings available in both languages.

export const LANGUAGES = Object.freeze(['en', 'pl']);

export const DEFAULT_LANGUAGE = 'en';

export const translations = {
  en: {
    appTitle: 'Phonetic Alphabet Trainer',
    languageSwitcherLabel: 'Interface language',
    setupHeading: 'Set up your practice run',
    alphabetLabel: 'Alphabet',
    modeLabel: 'Exercise mode',
    alphabetPolish: 'Polish phonetic alphabet',
    alphabetNato: 'NATO phonetic alphabet',
    modeKeyboard: 'Keyboard',
    modeSuggestion: 'Suggestion',
    modeKeyboardDesc: 'Type the codeword for each symbol.',
    modeSuggestionDesc: 'Pick the correct codeword from four options.',
    startRun: 'Start run',
    progressText: 'Question {current} of {total}',
    symbolPrompt: 'Which codeword matches this symbol?',
    answerLabel: 'Your answer',
    answerPlaceholder: 'Type the codeword…',
    submit: 'Submit',
    correctFeedback: 'Correct!',
    wrongFeedback: 'Not quite — try again.',
    wrongOptionFeedback: 'That is not it — try another option.',
    hintButton: 'Show hint',
    hintUsedButton: 'Hint shown',
    hintLabel: 'Hint',
    restartRun: 'Restart run',
    exitRun: 'Exit to setup',
    confirmRestart: 'Restart this run? Your current progress will be lost.',
    confirmExit: 'Exit to setup? Your current run progress will be lost.',
    runComplete: 'Run complete!',
    finalScore: 'Your score: {score}%',
    resultSummary: 'Alphabet: {alphabet} · Mode: {mode}',
    resultBreakdown: 'Clean answers: {clean} of {total} (hint used on {hinted})',
    playAgain: 'Play again',
    changeSetup: 'Change setup',
    loadingError: 'Could not load the benchmark data. Please reload the page.',
  },
  pl: {
    appTitle: 'Trener alfabetu fonetycznego',
    languageSwitcherLabel: 'Język interfejsu',
    setupHeading: 'Skonfiguruj trening',
    alphabetLabel: 'Alfabet',
    modeLabel: 'Tryb ćwiczenia',
    alphabetPolish: 'Polski alfabet fonetyczny',
    alphabetNato: 'Alfabet fonetyczny NATO',
    modeKeyboard: 'Klawiatura',
    modeSuggestion: 'Wybór odpowiedzi',
    modeKeyboardDesc: 'Wpisz hasło dla każdego symbolu.',
    modeSuggestionDesc: 'Wybierz poprawne hasło spośród czterech opcji.',
    startRun: 'Rozpocznij',
    progressText: 'Pytanie {current} z {total}',
    symbolPrompt: 'Jakie hasło odpowiada temu symbolowi?',
    answerLabel: 'Twoja odpowiedź',
    answerPlaceholder: 'Wpisz hasło…',
    submit: 'Zatwierdź',
    correctFeedback: 'Poprawnie!',
    wrongFeedback: 'Nie do końca — spróbuj ponownie.',
    wrongOptionFeedback: 'To nie to — spróbuj innej opcji.',
    hintButton: 'Pokaż podpowiedź',
    hintUsedButton: 'Podpowiedź widoczna',
    hintLabel: 'Podpowiedź',
    restartRun: 'Uruchom ponownie',
    exitRun: 'Wróć do ustawień',
    confirmRestart: 'Uruchomić trening od nowa? Obecny postęp zostanie utracony.',
    confirmExit: 'Wrócić do ustawień? Postęp bieżącego treningu zostanie utracony.',
    runComplete: 'Trening zakończony!',
    finalScore: 'Twój wynik: {score}%',
    resultSummary: 'Alfabet: {alphabet} · Tryb: {mode}',
    resultBreakdown: 'Odpowiedzi bez podpowiedzi: {clean} z {total} (podpowiedź użyta przy {hinted})',
    playAgain: 'Zagraj ponownie',
    changeSetup: 'Zmień ustawienia',
    loadingError: 'Nie udało się wczytać danych benchmarku. Odśwież stronę.',
  },
};

export function translate(lang, key, params = {}) {
  const dictionary = translations[lang] || translations[DEFAULT_LANGUAGE];
  const template = dictionary[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    params[name] !== undefined ? String(params[name]) : `{${name}}`,
  );
}
