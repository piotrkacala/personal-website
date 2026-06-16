const I18N = {
  pl: {
    title: 'Fonetyczny Trening',
    languageLabel: 'Język interfejsu',
    alphabetLabel: 'Alfabet fonetyczny',
    modeLabel: 'Tryb ćwiczenia',
    polishAlphabet: 'Polski',
    natoAlphabet: 'NATO',
    keyboardMode: 'Klawiatura',
    suggestionMode: 'Podpowiedzi',
    startBtn: 'Rozpocznij',
    submitBtn: 'Sprawdź',
    hintBtn: 'Pokaż podpowiedź',
    progress: (current, total) => `Pytanie ${current} z ${total}`,
    feedbackCorrect: 'Poprawnie!',
    feedbackWrong: 'Spróbuj ponownie',
    resultTitle: 'Koniec ćwiczenia',
    resultScore: (pct) => `${pct}%`,
    resultClean: (clean, total) => `Czystych: ${clean} / ${total}`,
    resultAlphabet: (name) => `Alfabet: ${name}`,
    resultMode: (mode) => `Tryb: ${mode}`,
    restartBtn: 'Ćwicz ponownie',
    placeholder: 'Wpisz słowo kodowe...',
    alphabetNames: {
      polish: 'Polski',
      nato: 'NATO'
    },
    modeNames: {
      keyboard: 'Klawiatura',
      suggestion: 'Podpowiedzi'
    }
  },
  en: {
    title: 'Phonetic Training',
    languageLabel: 'Interface language',
    alphabetLabel: 'Phonetic alphabet',
    modeLabel: 'Exercise mode',
    polishAlphabet: 'Polish',
    natoAlphabet: 'NATO',
    keyboardMode: 'Keyboard',
    suggestionMode: 'Suggestions',
    startBtn: 'Start',
    submitBtn: 'Check',
    hintBtn: 'Show hint',
    progress: (current, total) => `Question ${current} of ${total}`,
    feedbackCorrect: 'Correct!',
    feedbackWrong: 'Try again',
    resultTitle: 'Exercise complete',
    resultScore: (pct) => `${pct}%`,
    resultClean: (clean, total) => `Clean: ${clean} / ${total}`,
    resultAlphabet: (name) => `Alphabet: ${name}`,
    resultMode: (mode) => `Mode: ${mode}`,
    restartBtn: 'Practice again',
    placeholder: 'Type the codeword...',
    alphabetNames: {
      polish: 'Polish',
      nato: 'NATO'
    },
    modeNames: {
      keyboard: 'Keyboard',
      suggestion: 'Suggestions'
    }
  }
};
