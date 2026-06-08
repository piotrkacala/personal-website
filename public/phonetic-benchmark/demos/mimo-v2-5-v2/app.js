(function () {
  'use strict';

  const ATTRIBUTION_TEXT = 'Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by opencode/mimo-v2.5-free on 2026-06-03.';

  let alphabets = null;
  let multipleChoice = null;

  let state = {
    lang: 'en',
    alphabet: 'nato',
    mode: 'keyboard',
    symbols: [],
    currentIndex: 0,
    hintedQuestions: new Set(),
    hintVisible: false,
    runActive: false
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function t(key, vars) {
    let str = I18N[state.lang][key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return str;
  }

  function showScreen(id) {
    $$('.screen').forEach((s) => s.classList.remove('active'));
    $(`#screen-${id}`).classList.add('active');
  }

  function updateUI() {
    $('#setup-title').textContent = t('setupTitle');
    $('#label-lang').textContent = t('labelLang');
    $('#label-alphabet').textContent = t('labelAlphabet');
    $('#label-mode').textContent = t('labelMode');
    $('#btn-mode-keyboard').textContent = t('modeKeyboard');
    $('#btn-mode-suggestion').textContent = t('modeSuggestion');
    $('#btn-start').textContent = t('startBtn');
    $('#btn-submit-answer').textContent = t('submitBtn');
    $('#btn-hint').textContent = t('hintBtn');
    $('#btn-restart').textContent = t('restartBtn');
    $('#btn-play-again').textContent = t('playAgain');
    $('#attribution').textContent = ATTRIBUTION_TEXT;

    $$('.option-btn[data-lang]').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.lang === state.lang);
    });
    $$('.option-btn[data-alphabet]').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.alphabet === state.alphabet);
    });
    $$('.option-btn[data-mode]').forEach((btn) => {
      btn.classList.toggle('selected', btn.dataset.mode === state.mode);
    });
  }

  function getAlphabetData() {
    return alphabets[state.alphabet];
  }

  function getOptions(symbol) {
    return multipleChoice[state.alphabet][symbol];
  }

  function startRun() {
    const data = getAlphabetData();
    state.symbols = shuffle(data);
    state.currentIndex = 0;
    state.hintedQuestions = new Set();
    state.hintVisible = false;
    state.runActive = true;
    showScreen('run');
    showQuestion();
  }

  function showQuestion() {
    const sym = state.symbols[state.currentIndex];
    const total = state.symbols.length;
    const current = state.currentIndex + 1;

    $('#progress-text').textContent = t('progress', { current, total });
    $('#progress-fill').style.width = `${(current / total) * 100}%`;
    $('#symbol-display').textContent = sym.symbol;

    state.hintVisible = false;
    $('#hint-area').classList.add('hidden');
    $('#feedback-area').classList.add('hidden');

    if (state.mode === 'keyboard') {
      $('#keyboard-input-area').classList.remove('hidden');
      $('#suggestion-input-area').classList.add('hidden');
      const input = $('#answer-input');
      input.value = '';
      input.focus();
    } else {
      $('#keyboard-input-area').classList.add('hidden');
      $('#suggestion-input-area').classList.remove('hidden');
      renderSuggestions(sym.symbol);
    }

    $('#btn-restart').style.display = state.currentIndex > 0 ? 'inline-block' : 'none';
  }

  function renderSuggestions(symbol) {
    const options = getOptions(symbol);
    const shuffled = shuffle(options);
    const container = $('#suggestion-buttons');
    container.innerHTML = '';
    shuffled.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'btn suggestion-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleSuggestionClick(opt, symbol));
      container.appendChild(btn);
    });
  }

  function handleSuggestionClick(selected, symbol) {
    if (!state.runActive) return;
    const correct = getAlphabetData().find((e) => e.symbol === symbol).codeword;
    if (selected === correct) {
      showFeedback(true);
      setTimeout(() => advance(), 600);
    } else {
      showFeedback(false, true);
    }
  }

  function handleSubmitKeyboard() {
    if (!state.runActive) return;
    const sym = state.symbols[state.currentIndex];
    const input = $('#answer-input');
    const answer = input.value.trim();
    const correct = getAlphabetData().find((e) => e.symbol === sym.symbol).codeword;
    if (answer.toLowerCase() === correct.toLowerCase()) {
      showFeedback(true);
      setTimeout(() => advance(), 600);
    } else {
      showFeedback(false, false);
      input.value = '';
      input.focus();
    }
  }

  function showFeedback(isCorrect, isSuggestion) {
    const area = $('#feedback-area');
    const text = $('#feedback-text');
    area.classList.remove('hidden', 'correct', 'wrong');
    if (isCorrect) {
      text.textContent = t('feedbackCorrect');
      area.classList.add('correct');
    } else {
      text.textContent = isSuggestion ? t('feedbackWrongSuggestion') : t('feedbackWrong');
      area.classList.add('wrong');
    }
  }

  function advance() {
    state.currentIndex++;
    if (state.currentIndex >= state.symbols.length) {
      finishRun();
    } else {
      showQuestion();
    }
  }

  function showHint() {
    if (!state.runActive || state.hintVisible) return;
    const sym = state.symbols[state.currentIndex];
    state.hintedQuestions.add(state.currentIndex);
    state.hintVisible = true;
    const codeword = getAlphabetData().find((e) => e.symbol === sym.symbol).codeword;
    const hintArea = $('#hint-area');
    const hintText = $('#hint-text');
    hintText.textContent = `${t('hintRevealed')} ${codeword}`;
    hintArea.classList.remove('hidden');
  }

  function finishRun() {
    state.runActive = false;
    const total = state.symbols.length;
    const hinted = state.hintedQuestions.size;
    const clean = total - hinted;
    const score = Math.round((clean / total) * 100);

    const alphabetLabel = state.alphabet === 'nato' ? 'NATO' : 'Polski';
    const modeLabel = state.mode === 'keyboard' ? t('modeKeyboard') : t('modeSuggestion');

    $('#result-title').textContent = t('resultTitle');
    $('#result-score').textContent = t('resultScore', { score });
    $('#result-details').innerHTML =
      t('resultDetails', { alphabet: alphabetLabel, mode: modeLabel }) +
      '<br>' +
      t('resultClean', { clean, total });

    showScreen('result');
  }

  function resetToSetup() {
    state.runActive = false;
    showScreen('setup');
    updateUI();
  }

  async function loadData() {
    const [alphaRes, mcRes] = await Promise.all([
      fetch('./benchmark-data/alphabets.json'),
      fetch('./benchmark-data/multiple-choice-options.json')
    ]);
    alphabets = await alphaRes.json();
    multipleChoice = await mcRes.json();
  }

  function initEventListeners() {
    $$('.option-btn[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.lang = btn.dataset.lang;
        updateUI();
      });
    });

    $$('.option-btn[data-alphabet]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.alphabet = btn.dataset.alphabet;
        updateUI();
      });
    });

    $$('.option-btn[data-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mode = btn.dataset.mode;
        updateUI();
      });
    });

    $('#btn-start').addEventListener('click', startRun);
    $('#btn-submit-answer').addEventListener('click', handleSubmitKeyboard);
    $('#answer-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmitKeyboard();
    });
    $('#btn-hint').addEventListener('click', showHint);
    $('#btn-restart').addEventListener('click', resetToSetup);
    $('#btn-play-again').addEventListener('click', resetToSetup);
  }

  async function init() {
    await loadData();
    initEventListeners();
    updateUI();
    showScreen('setup');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
