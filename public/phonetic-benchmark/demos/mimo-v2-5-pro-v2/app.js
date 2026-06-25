(function () {
  'use strict';

  // --- Constants ---
  const MODEL_NAME = 'MiMo-V2.5-Pro';
  const IMPLEMENTATION_DATE = '2026-06-23';

  // --- i18n ---
  const translations = {
    en: {
      title: 'Phonetic Alphabet Trainer',
      selectLanguage: 'Interface Language',
      selectAlphabet: 'Phonetic Alphabet',
      selectMode: 'Exercise Mode',
      polish: 'Polish',
      nato: 'NATO',
      keyboard: 'Keyboard',
      suggestion: 'Multiple Choice',
      startExercise: 'Start Exercise',
      typeAnswer: 'Type the codeword for:',
      hint: 'Hint',
      submit: 'Submit',
      next: 'Next',
      wrongAnswer: 'Wrong answer. Try again.',
      finalScore: 'Final Score',
      runComplete: 'Exercise Complete!',
      alphabetLabel: 'Alphabet',
      modeLabel: 'Mode',
      hintedLabel: 'Hinted',
      cleanLabel: 'Clean',
      totalLabel: 'Total',
      playAgain: 'Play Again',
      backToSetup: 'Back to Setup',
      questionProgress: 'Question',
      of: 'of',
      hintText: 'Hint: The answer is',
      resetConfirm: 'Are you sure you want to reset? Your current progress will be lost.',
      reset: 'Reset',
      footerAttribution: 'Phonetic Benchmark by Piotr Ka\u0107a\u0142a (piotrkacala.pl). Developed by',
      on: 'on',
    },
    pl: {
      title: 'Trener Alfabetu Fonetycznego',
      selectLanguage: 'J\u0119zyk interfejsu',
      selectAlphabet: 'Alfabet fonetyczny',
      selectMode: 'Tryb \u0107wiczenia',
      polish: 'Polski',
      nato: 'NATO',
      keyboard: 'Klawiatura',
      suggestion: 'Wielokrotny wyb\u00f3r',
      startExercise: 'Rozpocznij \u0107wiczenie',
      typeAnswer: 'Wpisz wywo\u0142anie dla:',
      hint: 'Podpowied\u017a',
      submit: 'Zatwierd\u017a',
      next: 'Dalej',
      wrongAnswer: 'B\u0142\u0119dna odpowied\u017a. Spr\u00f3buj ponownie.',
      finalScore: 'Wynik ko\u0144cowy',
      runComplete: '\u0106wiczenie zako\u0144czone!',
      alphabetLabel: 'Alfabet',
      modeLabel: 'Tryb',
      hintedLabel: 'Z podpowiedzi\u0105',
      cleanLabel: 'Bez podpowiedzi',
      totalLabel: 'Razem',
      playAgain: 'Zagraj ponownie',
      backToSetup: 'Powr\u00f3t do ustawie\u0144',
      questionProgress: 'Pytanie',
      of: 'z',
      hintText: 'Podpowied\u017a: Odpowied\u017a to',
      resetConfirm: 'Czy na pewno chcesz zresetowa\u0107? Tw\u00f3j obecny post\u0119p zostanie utracony.',
      reset: 'Resetuj',
      footerAttribution: 'Phonetic Benchmark autorstwa Piotra Ka\u0107a\u0142y (piotrkacala.pl). Stworzony przez',
      on: 'dnia',
    },
  };

  function getTranslator(language) {
    const strings = translations[language] || translations.en;
    return function (key) {
      return strings[key] || key;
    };
  }

  // --- State ---
  let lang = 'en';
  let alphabetKey = 'polish';
  let mode = 'keyboard';
  let gameState = null;
  let alphabetsData = null;
  let optionsData = null;
  let t = getTranslator(lang);

  // --- Shuffle ---
  function shuffleArray(arr) {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      var tmp = result[i];
      result[i] = result[j];
      result[j] = tmp;
    }
    return result;
  }

  // --- Game State ---
  function createGameState(ak, m) {
    var alphabet = alphabetsData[ak];
    var symbols = shuffleArray(alphabet);
    return {
      alphabetKey: ak,
      mode: m,
      symbols: symbols,
      currentIndex: 0,
      totalQuestions: symbols.length,
      hintedQuestions: {},
      completed: false,
    };
  }

  function getCurrentSymbol() {
    if (gameState.completed || gameState.currentIndex >= gameState.symbols.length) {
      return null;
    }
    return gameState.symbols[gameState.currentIndex];
  }

  function getHintedCount() {
    var count = 0;
    for (var k in gameState.hintedQuestions) {
      if (gameState.hintedQuestions.hasOwnProperty(k)) {
        count++;
      }
    }
    return count;
  }

  function calculateScore() {
    var hinted = getHintedCount();
    var clean = gameState.totalQuestions - hinted;
    return Math.round((clean / gameState.totalQuestions) * 100);
  }

  function markHintUsed() {
    if (!gameState.completed) {
      gameState.hintedQuestions[gameState.currentIndex] = true;
    }
  }

  function advanceToNext() {
    gameState.currentIndex++;
    if (gameState.currentIndex >= gameState.symbols.length) {
      gameState.completed = true;
    }
  }

  function checkAnswer(userInput, correctCodeword) {
    var normalized = userInput.trim();
    return normalized.localeCompare(correctCodeword, undefined, { sensitivity: 'accent' }) === 0;
  }

  function getSuggestionOptions(ak, symbol) {
    var opts = optionsData[ak][symbol];
    return shuffleArray(opts.slice());
  }

  // --- DOM References ---
  var $ = function (id) { return document.getElementById(id); };

  // --- Screen Management ---
  function showScreen(name) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    $(name + '-screen').classList.add('active');
  }

  // --- UI Update ---
  function updateSetupTexts() {
    t = getTranslator(lang);
    document.documentElement.lang = lang;
    $('app-title').textContent = t('title');
    $('language-label').textContent = t('selectLanguage');
    $('alphabet-label').textContent = t('selectAlphabet');
    $('mode-label').textContent = t('selectMode');
    $('opt-polish').textContent = t('polish');
    $('opt-nato').textContent = t('nato');
    $('opt-keyboard').textContent = t('keyboard');
    $('opt-suggestion').textContent = t('suggestion');
    $('start-btn').textContent = t('startExercise');
    updateFooter();
  }

  function updateFooter() {
    var footer = $('attribution-footer');
    footer.textContent = t('footerAttribution') + ' ' + MODEL_NAME + ' ' + t('on') + ' ' + IMPLEMENTATION_DATE + '.';
  }

  function updateExerciseTexts() {
    t = getTranslator(lang);
    $('reset-btn').textContent = t('reset');
    $('type-answer-label').textContent = t('typeAnswer');
    $('hint-btn').textContent = t('hint');
    $('hint-btn-suggestion').textContent = t('hint');
    $('submit-btn').textContent = t('submit');
    updateFooter();
  }

  function updateResultTexts() {
    t = getTranslator(lang);
    $('result-title').textContent = t('runComplete');
    $('alphabet-result-label').textContent = t('alphabetLabel');
    $('mode-result-label').textContent = t('modeLabel');
    $('total-result-label').textContent = t('totalLabel');
    $('clean-result-label').textContent = t('cleanLabel');
    $('hinted-result-label').textContent = t('hintedLabel');
    $('play-again-btn').textContent = t('playAgain');
    updateFooter();
  }

  // --- Exercise Rendering ---
  function renderProgress() {
    $('progress-text').textContent =
      t('questionProgress') + ' ' + (gameState.currentIndex + 1) + ' ' + t('of') + ' ' + gameState.totalQuestions;
  }

  function renderSymbol() {
    var sym = getCurrentSymbol();
    $('current-symbol').textContent = sym ? sym.symbol : '';
  }

  function resetHintAndFeedback() {
    $('hint-display').classList.add('hidden');
    $('feedback').classList.add('hidden');
    $('feedback').className = 'feedback hidden';
  }

  function showKeyboardMode() {
    $('keyboard-area').classList.remove('hidden');
    $('suggestion-area').classList.add('hidden');
    $('answer-input').value = '';
    $('answer-input').focus();
  }

  function showSuggestionMode() {
    $('keyboard-area').classList.add('hidden');
    $('suggestion-area').classList.remove('hidden');
    renderSuggestionButtons();
  }

  function renderSuggestionButtons() {
    var sym = getCurrentSymbol();
    if (!sym) return;
    var options = getSuggestionOptions(gameState.alphabetKey, sym.symbol);
    var container = $('suggestion-buttons');
    container.innerHTML = '';
    for (var i = 0; i < options.length; i++) {
      var btn = document.createElement('button');
      btn.className = 'btn secondary';
      btn.textContent = options[i];
      btn.setAttribute('data-value', options[i]);
      btn.addEventListener('click', handleSuggestionClick);
      container.appendChild(btn);
    }
  }

  function startExercise() {
    gameState = createGameState(alphabetKey, mode);
    showScreen('exercise');
    updateExerciseTexts();
    renderProgress();
    renderSymbol();
    resetHintAndFeedback();
    if (mode === 'keyboard') {
      showKeyboardMode();
    } else {
      showSuggestionMode();
    }
  }

  function handleCorrectAnswer() {
    advanceToNext();
    if (gameState.completed) {
      showResult();
    } else {
      renderProgress();
      renderSymbol();
      resetHintAndFeedback();
      if (mode === 'keyboard') {
        $('answer-input').value = '';
        $('answer-input').focus();
      } else {
        renderSuggestionButtons();
      }
    }
  }

  function handleWrongAnswer() {
    var fb = $('feedback');
    fb.textContent = t('wrongAnswer');
    fb.className = 'feedback error';
    fb.classList.remove('hidden');
  }

  function handleSubmit() {
    var sym = getCurrentSymbol();
    if (!sym) return;
    var input = $('answer-input').value;
    if (checkAnswer(input, sym.codeword)) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  }

  function handleSuggestionClick(e) {
    var sym = getCurrentSymbol();
    if (!sym) return;
    var selected = e.target.getAttribute('data-value');
    if (checkAnswer(selected, sym.codeword)) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  }

  function handleHint() {
    var sym = getCurrentSymbol();
    if (!sym) return;
    markHintUsed();
    var display = $('hint-display');
    display.textContent = t('hintText') + ' ' + sym.codeword;
    display.classList.remove('hidden');
  }

  function handleReset() {
    if (confirm(t('resetConfirm'))) {
      showScreen('setup');
      gameState = null;
    }
  }

  function showResult() {
    showScreen('result');
    updateResultTexts();
    var score = calculateScore();
    $('score-value').textContent = score;
    $('alphabet-result-value').textContent = t(gameState.alphabetKey);
    $('mode-result-value').textContent = t(gameState.mode);
    $('total-result-value').textContent = gameState.totalQuestions;
    $('clean-result-value').textContent = gameState.totalQuestions - getHintedCount();
    $('hinted-result-value').textContent = getHintedCount();
  }

  // --- Data Loading ---
  async function loadData() {
    var [alphRes, optRes] = await Promise.all([
      fetch('./benchmark-data/alphabets.json'),
      fetch('./benchmark-data/multiple-choice-options.json'),
    ]);
    alphabetsData = await alphRes.json();
    optionsData = await optRes.json();
  }

  // --- Event Binding ---
  function bindEvents() {
    $('language-select').addEventListener('change', function (e) {
      lang = e.target.value;
      updateSetupTexts();
    });

    $('alphabet-select').addEventListener('change', function (e) {
      alphabetKey = e.target.value;
    });

    $('mode-select').addEventListener('change', function (e) {
      mode = e.target.value;
    });

    $('start-btn').addEventListener('click', function () {
      startExercise();
    });

    $('submit-btn').addEventListener('click', function () {
      handleSubmit();
    });

    $('answer-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    });

    $('hint-btn').addEventListener('click', function () {
      handleHint();
    });

    $('hint-btn-suggestion').addEventListener('click', function () {
      handleHint();
    });

    $('reset-btn').addEventListener('click', function () {
      handleReset();
    });

    $('play-again-btn').addEventListener('click', function () {
      gameState = null;
      showScreen('setup');
    });
  }

  // --- Init ---
  async function init() {
    await loadData();
    updateSetupTexts();
    bindEvents();
    showScreen('setup');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
