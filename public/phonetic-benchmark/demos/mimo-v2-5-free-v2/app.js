(function () {
  'use strict';

  const ATTRIBUTION_DATE = '2026-06-10';
  const MODEL_NAME = 'MiMo-V2.5-Free';

  let alphabetsData = null;
  let optionsData = null;

  let state = {
    lang: null,
    alphabet: null,
    mode: null,
    questions: [],
    currentIndex: 0,
    hintedCount: 0,
    hintRevealed: false
  };

  async function loadData() {
    const [alphaRes, optsRes] = await Promise.all([
      fetch('./benchmark-data/alphabets.json'),
      fetch('./benchmark-data/multiple-choice-options.json')
    ]);
    alphabetsData = await alphaRes.json();
    optionsData = await optsRes.json();
  }

  function t(key) {
    const lang = state.lang || 'en';
    return I18N[lang][key];
  }

  function setAttr(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function renderSetup() {
    setAttr('app-title', t('title'));
    setAttr('label-language', t('languageLabel'));
    setAttr('label-alphabet', t('alphabetLabel'));
    setAttr('label-mode', t('modeLabel'));

    document.querySelector('[data-alphabet="polish"]').textContent = t('polishAlphabet');
    document.querySelector('[data-alphabet="nato"]').textContent = t('natoAlphabet');
    document.querySelector('[data-mode="keyboard"]').textContent = t('keyboardMode');
    document.querySelector('[data-mode="suggestion"]').textContent = t('suggestionMode');
    setAttr('start-btn', t('startBtn'));

    showScreen('setup-screen');
  }

  function renderExercise() {
    const q = state.questions[state.currentIndex];
    const total = state.questions.length;
    const current = state.currentIndex + 1;

    const pct = ((state.currentIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    setAttr('progress-text', t('progress')(current, total));

    document.getElementById('symbol-display').textContent = q.symbol;

    const kbArea = document.getElementById('keyboard-input-area');
    const sgArea = document.getElementById('suggestion-area');

    if (state.mode === 'keyboard') {
      kbArea.style.display = '';
      sgArea.style.display = 'none';
      const input = document.getElementById('answer-input');
      input.value = '';
      input.disabled = false;
      input.focus();
      setAttr('submit-answer', t('submitBtn'));
    } else {
      kbArea.style.display = 'none';
      sgArea.style.display = '';
      renderSuggestions(q);
    }

    document.getElementById('hint-area').style.display = '';
    document.getElementById('hint-btn').textContent = t('hintBtn');
    document.getElementById('hint-text').style.display = 'none';
    document.getElementById('hint-text').textContent = '';
    state.hintRevealed = false;

    setAttr('feedback', '');
    document.getElementById('feedback').className = 'feedback';

    showScreen('exercise-screen');
  }

  function renderSuggestions(q) {
    const grid = document.getElementById('suggestion-buttons');
    grid.innerHTML = '';

    const opts = optionsData[state.alphabet][q.symbol];
    const shuffled = shuffle(opts);

    shuffled.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleSuggestionClick(btn, opt, q));
      grid.appendChild(btn);
    });
  }

  function handleSuggestionClick(btn, chosen, q) {
    if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

    if (normalizeMatch(chosen, q.codeword)) {
      btn.classList.add('correct');
      document.querySelectorAll('.suggestion-btn').forEach(b => b.style.pointerEvents = 'none');
      setAttr('feedback', t('feedbackCorrect'));
      document.getElementById('feedback').className = 'feedback correct';
      setTimeout(() => advanceQuestion(), 600);
    } else {
      btn.classList.add('wrong');
      setAttr('feedback', t('feedbackWrong'));
      document.getElementById('feedback').className = 'feedback wrong';
    }
  }

  function handleKeyboardSubmit() {
    const input = document.getElementById('answer-input');
    const q = state.questions[state.currentIndex];

    if (normalizeMatch(input.value, q.codeword)) {
      setAttr('feedback', t('feedbackCorrect'));
      document.getElementById('feedback').className = 'feedback correct';
      input.disabled = true;
      setTimeout(() => advanceQuestion(), 600);
    } else {
      setAttr('feedback', t('feedbackWrong'));
      document.getElementById('feedback').className = 'feedback wrong';
    }
  }

  function handleHint() {
    if (state.hintRevealed) return;
    state.hintRevealed = true;
    state.hintedCount++;

    const q = state.questions[state.currentIndex];
    const hintText = document.getElementById('hint-text');
    hintText.textContent = q.codeword;
    hintText.style.display = '';
  }

  function advanceQuestion() {
    state.currentIndex++;
    if (state.currentIndex >= state.questions.length) {
      showResult();
    } else {
      renderExercise();
    }
  }

  function showResult() {
    const total = state.questions.length;
    const score = computeScore(total, state.hintedCount);

    const content = document.getElementById('result-content');
    content.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'result-label';
    title.textContent = t('resultTitle');
    content.appendChild(title);

    const scoreEl = document.createElement('div');
    scoreEl.className = 'result-score';
    scoreEl.textContent = t('resultScore')(score);
    content.appendChild(scoreEl);

    const clean = document.createElement('div');
    clean.className = 'result-detail';
    clean.textContent = t('resultClean')(total - state.hintedCount, total);
    content.appendChild(clean);

    const alphaDetail = document.createElement('div');
    alphaDetail.className = 'result-detail';
    alphaDetail.textContent = t('resultAlphabet')(t('alphabetNames')[state.alphabet]);
    content.appendChild(alphaDetail);

    const modeDetail = document.createElement('div');
    modeDetail.className = 'result-detail';
    modeDetail.textContent = t('resultMode')(t('modeNames')[state.mode]);
    content.appendChild(modeDetail);

    document.getElementById('progress-fill').style.width = '100%';
    setAttr('restart-btn', t('restartBtn'));

    showScreen('result-screen');
  }

  function startRun() {
    const symbols = alphabetsData[state.alphabet];
    state.questions = shuffle(symbols);
    state.currentIndex = 0;
    state.hintedCount = 0;
    state.hintRevealed = false;
    renderExercise();
  }

  function initSetupListeners() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-lang]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.lang = btn.dataset.lang;
        renderSetup();
        updateStartBtn();
      });
    });

    document.querySelectorAll('[data-alphabet]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-alphabet]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.alphabet = btn.dataset.alphabet;
        updateStartBtn();
      });
    });

    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.mode = btn.dataset.mode;
        updateStartBtn();
      });
    });

    document.getElementById('start-btn').addEventListener('click', startRun);

    document.getElementById('submit-answer').addEventListener('click', handleKeyboardSubmit);
    document.getElementById('answer-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') handleKeyboardSubmit();
    });

    document.getElementById('hint-btn').addEventListener('click', handleHint);
    document.getElementById('restart-btn').addEventListener('click', () => {
      state.currentIndex = 0;
      state.hintedCount = 0;
      renderSetup();
    });
  }

  function updateStartBtn() {
    const btn = document.getElementById('start-btn');
    btn.disabled = !(state.lang && state.alphabet && state.mode);
  }

  function renderAttribution() {
    const el = document.getElementById('attribution');
    el.textContent = `Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by ${MODEL_NAME} on ${ATTRIBUTION_DATE}.`;
  }

  async function init() {
    await loadData();
    initSetupListeners();
    renderAttribution();
    renderSetup();
  }

  init();
})();
