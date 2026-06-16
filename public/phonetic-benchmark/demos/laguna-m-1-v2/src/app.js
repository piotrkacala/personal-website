const translations = {
  en: {
    setup: {
      title: 'Phonetic Training',
      interfaceLanguage: 'Interface Language:',
      alphabet: 'Phonetic Alphabet:',
      mode: 'Exercise Mode:',
      keyboardMode: 'Keyboard',
      suggestionMode: 'Suggestion',
      start: 'Start',
      nato: 'NATO',
      polish: 'Polish'
    },
    exercise: {
      typeAnswer: 'Type answer...',
      submit: 'Submit',
      hint: 'Hint',
      restart: 'Restart',
      progress: 'Question {current} of {total}'
    },
    result: {
      title: 'Results',
      score: 'Score: {score}%',
      alphabet: 'Alphabet: {alphabet}',
      mode: 'Mode: {mode}',
      playAgain: 'Play Again'
    },
    attribution: 'Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by poolside/laguna-m.1:free on 2026-06-11.'
  },
  pl: {
    setup: {
      title: 'Trening Fonetyczny',
      interfaceLanguage: 'Język interfejsu:',
      alphabet: 'Alfabet fonetyczny:',
      mode: 'Tryb ćwiczenia:',
      keyboardMode: 'Klawiatura',
      suggestionMode: 'Propozycje',
      start: 'Rozpocznij',
      nato: 'NATO',
      polish: 'Polski'
    },
    exercise: {
      typeAnswer: 'Wpisz odpowiedź...',
      submit: 'Zatwierdź',
      hint: 'Podpowiedź',
      restart: 'Restartuj',
      progress: 'Pytanie {current} z {total}'
    },
    result: {
      title: 'Wyniki',
      score: 'Wynik: {score}%',
      alphabet: 'Alfabet: {alphabet}',
      mode: 'Tryb: {mode}',
      playAgain: 'Zagraj ponownie'
    },
    attribution: 'Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by poolside/laguna-m.1:free on 2026-06-11.'
  }
};

const alphabetNames = {
  en: { nato: 'NATO', polish: 'Polish' },
  pl: { nato: 'NATO', polish: 'Polski' }
};

const modeNames = {
  en: { keyboard: 'Keyboard', suggestion: 'Suggestion' },
  pl: { keyboard: 'Klawiatura', suggestion: 'Propozycje' }
};

let state = {
  interfaceLang: 'en',
  alphabet: 'nato',
  mode: 'keyboard',
  symbols: [],
  choices: [],
  currentIndex: 0,
  hintedCount: 0,
  runActive: false
};

let alphabets = { polish: [], nato: [] };
let suggestionOptions = { polish: {}, nato: {} };

function t(key, params = {}) {
  let str = key.split('.').reduce((obj, k) => obj?.[k], translations[state.interfaceLang]);
  if (!str) return key;
  Object.entries(params).forEach(([k, v]) => {
    str = str.replace(`{${k}}`, v);
  });
  return str;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function normalize(text) {
  return text.trim().toUpperCase();
}

function answersMatch(input, correct) {
  return normalize(input) === normalize(correct);
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

function renderSetupScreen() {
  showScreen('setup-screen');
  translateUI();
}

function renderExerciseScreen() {
  showScreen('exercise-screen');

  const currentSymbol = state.symbols[state.currentIndex];
  document.getElementById('current-symbol').textContent = currentSymbol.symbol;
  document.getElementById('progress').textContent = t('exercise.progress', {
    current: state.currentIndex + 1,
    total: state.symbols.length
  });
  document.getElementById('hint-display').textContent = '';
  document.getElementById('hint-display').classList.remove('visible');

  if (state.mode === 'keyboard') {
    document.getElementById('keyboard-input').classList.remove('hidden');
    document.getElementById('suggestion-input').classList.add('hidden');
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
  } else {
    document.getElementById('keyboard-input').classList.add('hidden');
    document.getElementById('suggestion-input').classList.remove('hidden');
    renderSuggestionButtons(currentSymbol.symbol);
  }
}

function renderSuggestionButtons(symbol) {
  const container = document.getElementById('suggestion-buttons');
  container.innerHTML = '';
  const opts = suggestionOptions[state.alphabet][symbol] || [];
  const options = shuffle([...opts]);
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = option;
    btn.dataset.value = option;
    btn.addEventListener('click', () => handleSuggestionClick(option, symbol));
    container.appendChild(btn);
  });
}

function handleSuggestionClick(selected, symbol) {
  const correct = suggestionOptions[state.alphabet][symbol]?.[0];
  if (answersMatch(selected, correct)) {
    advance();
  }
}

function showHint() {
  const currentSymbol = state.symbols[state.currentIndex];
  document.getElementById('hint-display').textContent = currentSymbol.codeword;
  document.getElementById('hint-display').classList.add('visible');
  state.hintedCount++;
}

function checkAnswer() {
  const input = document.getElementById('answer-input').value;
  const currentSymbol = state.symbols[state.currentIndex];
  const correct = currentSymbol.codeword;

  if (answersMatch(input, correct)) {
    document.getElementById('answer-input').value = '';
    advance();
  }
}

function advance() {
  state.currentIndex++;
  if (state.currentIndex >= state.symbols.length) {
    endRun();
  } else {
    renderExerciseScreen();
  }
}

function endRun() {
  showScreen('result-screen');

  const total = state.symbols.length;
  const clean = total - state.hintedCount;
  const score = Math.round((clean / total) * 100);

  document.getElementById('final-score').textContent = t('result.score', { score });
  document.getElementById('result-summary').innerHTML = `
    ${t('result.alphabet', { alphabet: alphabetNames[state.interfaceLang][state.alphabet] })}<br>
    ${t('result.mode', { mode: modeNames[state.interfaceLang][state.mode] })}
  `;
}

function startRun() {
  state.symbols = shuffle([...alphabets[state.alphabet]]);
  state.currentIndex = 0;
  state.hintedCount = 0;
  state.runActive = true;
  renderExerciseScreen();
}

function restart() {
  state.runActive = false;
  renderSetupScreen();
}

function translateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
}

async function loadData() {
  const [alphabetsRes, optionsRes] = await Promise.all([
    fetch('./benchmark-data/alphabets.json'),
    fetch('./benchmark-data/multiple-choice-options.json')
  ]);
  alphabets = await alphabetsRes.json();
  suggestionOptions = await optionsRes.json();
}

function init() {
  document.getElementById('interface-language').addEventListener('change', e => {
    state.interfaceLang = e.target.value;
    translateUI();
  });

  document.getElementById('alphabet').addEventListener('change', e => {
    state.alphabet = e.target.value;
  });

  document.getElementById('mode').addEventListener('change', e => {
    state.mode = e.target.value;
  });

  document.getElementById('start-btn').addEventListener('click', startRun);
  document.getElementById('submit-btn').addEventListener('click', checkAnswer);
  document.getElementById('hint-btn').addEventListener('click', showHint);
  document.getElementById('restart-btn').addEventListener('click', restart);
  document.getElementById('play-again-btn').addEventListener('click', restart);

  document.getElementById('answer-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });

  loadData().then(() => {
    renderSetupScreen();
  });
}

document.addEventListener('DOMContentLoaded', init);