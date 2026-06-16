export const translations = {
  en: {
    pageTitle: "Phonetic Benchmark",
    eyebrow: "Phonetic Benchmark v2",
    title: "Train symbol-to-codeword recall.",
    intro:
      "Practice the Polish and NATO phonetic alphabets in two separate modes. Complete the whole alphabet in random order, use hints only when needed, and finish with a deterministic score.",
    interfaceLanguageLabel: "Interface language",
    languageLocked:
      "Language switching is disabled during an active run. Finish, restart, or return to setup first.",
    setupTitle: "Build your run",
    setupCopy:
      "Pick the UI language, one alphabet, and one input mode. Each run uses every symbol exactly once and only advances after the correct answer.",
    alphabetLabel: "Phonetic alphabet",
    modeLabel: "Exercise mode",
    startRun: "Start full run",
    alphabets: {
      polish: "Polish phonetic alphabet",
      nato: "NATO phonetic alphabet"
    },
    modes: {
      keyboard: "Keyboard mode",
      suggestion: "Suggestion mode"
    },
    modeDescriptions: {
      keyboard: "Type the codeword manually. Whitespace is ignored, matching is case-insensitive, and diacritics still matter.",
      suggestion: "Choose from exactly four fixed options per symbol. Option content comes from benchmark data; only the button order changes."
    },
    sideTitle: "Run contract",
    sideCopy:
      "Hint usage reduces the final percentage for that question, but wrong attempts on their own do not. Suggestion and keyboard answers stay separate for the whole run.",
    sideBullets: [
      "Full selected alphabet, one symbol per turn",
      "Randomized symbol order in every run",
      "Visible hint that never auto-completes",
      "Final score based only on hinted questions"
    ],
    progressLabel: "Progress",
    progressText: (current, total) => `Question ${current} of ${total}`,
    activeRunTitle: "Current prompt",
    activeRunCopy: "Produce the matching codeword before you move on.",
    prompt: "Symbol in focus",
    keyboardPlaceholder: "Enter the matching codeword",
    submit: "Submit answer",
    hint: "Reveal hint",
    hintUsed: "Hint already visible",
    hintTitle: "Hint",
    hintCopy: "The correct codeword stays visible until you answer this symbol correctly.",
    wrongKeyboard: "That answer is not correct yet. Keep the same symbol and try again.",
    wrongSuggestion: "That option is incorrect. The run stays on the current symbol.",
    restartRun: "Restart this run",
    backToSetup: "Leave run",
    runSummaryTitle: "Selected setup",
    resultTitle: "Run complete",
    resultCopy: "You finished the full exercise run.",
    resultScoreLabel: "Final score",
    resultCleanLabel: "Clean questions",
    resultHintedLabel: "Hinted questions",
    replay: "Play again",
    loading: "Loading benchmark data...",
    loadError:
      "The application could not load benchmark data. Check that the local server is serving both public files and benchmark-data.",
    footer: ({ benchmarkAuthor, benchmarkSite, modelName, implementationDate }) =>
      `Phonetic Benchmark by ${benchmarkAuthor} (${benchmarkSite}). Developed by ${modelName} on ${implementationDate}.`
  },
  pl: {
    pageTitle: "Benchmark alfabetu fonetycznego",
    eyebrow: "Phonetic Benchmark v2",
    title: "Trenuj skojarzenie symbol -> haslo.",
    intro:
      "Cwicz polski i natowski alfabet fonetyczny w dwoch osobnych trybach. Przejdz przez caly alfabet w losowej kolejnosci, korzystaj z podpowiedzi tylko wtedy, gdy trzeba, i zakoncz bieg deterministycznym wynikiem.",
    interfaceLanguageLabel: "Jezyk interfejsu",
    languageLocked:
      "Zmiana jezyka jest zablokowana podczas aktywnej sesji. Najpierw zakoncz bieg, uruchom go od nowa albo wroc do ustawien.",
    setupTitle: "Skonfiguruj bieg",
    setupCopy:
      "Wybierz jezyk interfejsu, alfabet i tryb odpowiedzi. Kazdy bieg wykorzystuje wszystkie symbole dokladnie raz i przechodzi dalej dopiero po poprawnej odpowiedzi.",
    alphabetLabel: "Alfabet fonetyczny",
    modeLabel: "Tryb cwiczenia",
    startRun: "Rozpocznij pelny bieg",
    alphabets: {
      polish: "Polski alfabet fonetyczny",
      nato: "Alfabet NATO"
    },
    modes: {
      keyboard: "Tryb klawiatury",
      suggestion: "Tryb podpowiedzi"
    },
    modeDescriptions: {
      keyboard: "Wpisz haslo recznie. Biale znaki na poczatku i koncu sa ignorowane, wielkosc liter nie ma znaczenia, ale znaki diakrytyczne nadal sa istotne.",
      suggestion: "Wybierz jedna z dokladnie czterech stalych opcji dla kazdego symbolu. Tresc opcji pochodzi z danych benchmarku; zmienia sie tylko kolejnosc przyciskow."
    },
    sideTitle: "Kontrakt sesji",
    sideCopy:
      "Uzycie podpowiedzi obniza koncowy procent dla tego pytania, ale same bledne proby go nie zmieniaja. Tryb wyboru i tryb klawiatury pozostaja rozdzielone przez caly bieg.",
    sideBullets: [
      "Pelny wybrany alfabet, jeden symbol na ture",
      "Losowa kolejnosc symboli w kazdym biegu",
      "Widoczna podpowiedz, ktora nigdy nie konczy pytania automatycznie",
      "Wynik koncowy zalezy tylko od liczby pytań z podpowiedzia"
    ],
    progressLabel: "Postep",
    progressText: (current, total) => `Pytanie ${current} z ${total}`,
    activeRunTitle: "Biezacy symbol",
    activeRunCopy: "Podaj pasujace haslo zanim przejdziesz dalej.",
    prompt: "Symbol do rozwiazania",
    keyboardPlaceholder: "Wpisz pasujace haslo",
    submit: "Zatwierdz odpowiedz",
    hint: "Pokaz podpowiedz",
    hintUsed: "Podpowiedz jest juz widoczna",
    hintTitle: "Podpowiedz",
    hintCopy: "Poprawne haslo pozostaje widoczne, dopoki nie odpowiesz poprawnie dla tego symbolu.",
    wrongKeyboard: "To jeszcze nie jest poprawna odpowiedz. Symbol zostaje ten sam, sprobuj ponownie.",
    wrongSuggestion: "Ta opcja jest bledna. Sesja pozostaje na biezacym symbolu.",
    restartRun: "Uruchom bieg od nowa",
    backToSetup: "Wroc do ustawien",
    runSummaryTitle: "Wybrane ustawienia",
    resultTitle: "Bieg zakonczony",
    resultCopy: "Ukonczyles caly przebieg cwiczenia.",
    resultScoreLabel: "Wynik koncowy",
    resultCleanLabel: "Pytania bez podpowiedzi",
    resultHintedLabel: "Pytania z podpowiedzia",
    replay: "Powtorz bieg",
    loading: "Ladowanie danych benchmarku...",
    loadError:
      "Aplikacja nie mogla zaladowac danych benchmarku. Sprawdz, czy lokalny serwer udostepnia pliki publiczne oraz katalog benchmark-data.",
    footer: ({ benchmarkAuthor, benchmarkSite, modelName, implementationDate }) =>
      `Phonetic Benchmark autorstwa ${benchmarkAuthor} (${benchmarkSite}). Wykonanie: ${modelName}, data implementacji ${implementationDate}.`
  }
};
