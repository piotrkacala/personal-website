let alphabets = null;
let multipleChoiceOptions = null;

let state = {
  language: 'en',
  alphabet: 'polish',
  mode: 'keyboard',
  symbols: [],
  currentIndex: 0,
  hinted: [],
  currentHintShown: false,
  isRunning: false,
  finished: false,
};

const ALPHABET_NAMES = { polish: 'polishAlphabet', nato: 'natoAlphabet' };
const MODE_NAMES = { keyboard: 'keyboard', suggestion: 'suggestion' };

async function loadData() {
  const [alphResp, mcResp] = await Promise.all([
    fetch('./benchmark-data/alphabets.json'),
    fetch('./benchmark-data/multiple-choice-options.json'),
  ]);
  alphabets = await alphResp.json();
  multipleChoiceOptions = await mcResp.json();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function render() {
  if (state.finished) {
    renderResult();
  } else if (state.isRunning) {
    renderExercise();
  } else {
    renderSetup();
  }
}

function renderSetup() {
  const root = document.getElementById('app');
  root.innerHTML = `
    <div class="setup">
      <h1>Phonetic Benchmark</h1>

      <div class="field">
        <label>${t(state.language, 'chooseLanguage')}</label>
        <select id="langSelect">
          <option value="pl" ${state.language === 'pl' ? 'selected' : ''}>Polski</option>
          <option value="en" ${state.language === 'en' ? 'selected' : ''}>English</option>
        </select>
      </div>

      <div class="field">
        <label>${t(state.language, 'chooseAlphabet')}</label>
        <select id="alphabetSelect">
          <option value="polish" ${state.alphabet === 'polish' ? 'selected' : ''}>${t(state.language, 'polishAlphabet')}</option>
          <option value="nato" ${state.alphabet === 'nato' ? 'selected' : ''}>${t(state.language, 'natoAlphabet')}</option>
        </select>
      </div>

      <div class="field">
        <label>${t(state.language, 'chooseMode')}</label>
        <select id="modeSelect">
          <option value="keyboard" ${state.mode === 'keyboard' ? 'selected' : ''}>${t(state.language, 'keyboard')} – ${t(state.language, 'keyboardDesc')}</option>
          <option value="suggestion" ${state.mode === 'suggestion' ? 'selected' : ''}>${t(state.language, 'suggestion')} – ${t(state.language, 'suggestionDesc')}</option>
        </select>
      </div>

      <button id="startBtn" class="btn btn-primary">${t(state.language, 'start')}</button>
    </div>
  `;

  document.getElementById('langSelect').addEventListener('change', (e) => {
    if (state.isRunning || state.finished) {
      e.preventDefault();
      return;
    }
    state.language = e.target.value;
    render();
  });

  document.getElementById('alphabetSelect').addEventListener('change', (e) => {
    state.alphabet = e.target.value;
  });

  document.getElementById('modeSelect').addEventListener('change', (e) => {
    state.mode = e.target.value;
  });

  document.getElementById('startBtn').addEventListener('click', startRun);
}

function startRun() {
  const alphabetData = alphabets[state.alphabet];
  state.symbols = shuffle(alphabetData);
  state.currentIndex = 0;
  state.hinted = new Array(state.symbols.length).fill(false);
  state.currentHintShown = false;
  state.isRunning = true;
  state.finished = false;
  render();
}

function renderExercise() {
  if (state.currentIndex >= state.symbols.length) {
    finishRun();
    return;
  }

  const symbol = state.symbols[state.currentIndex];
  const root = document.getElementById('app');
  const alphabetName = t(state.language, ALPHABET_NAMES[state.alphabet]);
  const modeName = t(state.language, MODE_NAMES[state.mode]);

  let hintHtml = '';
  if (state.currentHintShown) {
    hintHtml = `<div class="hint-reveal">${t(state.language, 'hintRevealed', { codeword: symbol.codeword })}</div>`;
  }

  let answerHtml = '';
  if (state.mode === 'keyboard') {
    answerHtml = `
      <div class="keyboard-area">
        <input type="text" id="answerInput" autofocus autocomplete="off" autocapitalize="off" spellcheck="false">
        <button id="submitBtn" class="btn btn-primary">OK</button>
      </div>
      <div id="feedback" class="feedback"></div>
    `;
  } else {
    const options = multipleChoiceOptions[state.alphabet][symbol.symbol];
    const shuffledOptions = shuffle(options);
    answerHtml = `
      <div class="suggestion-area">
        ${shuffledOptions.map((opt, i) =>
          `<button class="btn btn-option" data-option="${opt}">${opt}</button>`
        ).join('')}
      </div>
      <div id="feedback" class="feedback"></div>
    `;
  }

  root.innerHTML = `
    <div class="exercise">
      <div class="run-header">
        <span class="run-info">${alphabetName} · ${modeName}</span>
        <button id="resetBtn" class="btn btn-sm btn-reset">${t(state.language, 'resetLabel')}</button>
      </div>
      <div class="progress">${t(state.language, 'progress', { current: state.currentIndex + 1, total: state.symbols.length })}</div>
      <div class="symbol-display">${symbol.symbol}</div>
      ${hintHtml}
      ${answerHtml}
      <button id="hintBtn" class="btn btn-hint">${t(state.language, 'hint')}</button>
    </div>
  `;

  if (state.mode === 'keyboard') {
    const input = document.getElementById('answerInput');
    const submitBtn = document.getElementById('submitBtn');
    const submitHandler = () => handleKeyboardSubmit(symbol.codeword);
    submitBtn.addEventListener('click', submitHandler);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitHandler();
    });
    setTimeout(() => input.focus(), 0);
  } else {
    document.querySelectorAll('.btn-option').forEach(btn => {
      btn.addEventListener('click', () => handleSuggestionSubmit(symbol.codeword, btn.dataset.option));
    });
  }

  document.getElementById('hintBtn').addEventListener('click', () => showHint(symbol.codeword));
  document.getElementById('resetBtn').addEventListener('click', confirmReset);
}

function handleKeyboardSubmit(codeword) {
  const input = document.getElementById('answerInput');
  const feedback = document.getElementById('feedback');
  const answer = input.value.trim();

  if (answer.toLowerCase() === codeword.toLowerCase()) {
    feedback.className = 'feedback correct';
    feedback.textContent = t(state.language, 'correct');
    advance();
  } else {
    feedback.className = 'feedback wrong';
    feedback.textContent = t(state.language, 'wrong');
    input.value = '';
    input.focus();
  }
}

function handleSuggestionSubmit(codeword, selected) {
  if (selected === codeword) {
    document.getElementById('feedback').className = 'feedback correct';
    document.getElementById('feedback').textContent = t(state.language, 'correct');
    advance();
  } else {
    document.getElementById('feedback').className = 'feedback wrong';
    document.getElementById('feedback').textContent = t(state.language, 'wrong');
  }
}

function showHint(codeword) {
  state.currentHintShown = true;
  state.hinted[state.currentIndex] = true;
  render();
  if (state.mode === 'keyboard') {
    setTimeout(() => {
      const input = document.getElementById('answerInput');
      if (input) input.focus();
    }, 0);
  }
}

function advance() {
  state.currentIndex++;
  state.currentHintShown = false;
  render();
}

function finishRun() {
  state.isRunning = false;
  state.finished = true;
  render();
}

function renderResult() {
  const total = state.symbols.length;
  const hintedCount = state.hinted.filter(h => h).length;
  const cleanCount = total - hintedCount;
  const scorePct = Math.round((cleanCount / total) * 100);
  const alphabetName = t(state.language, ALPHABET_NAMES[state.alphabet]);
  const modeName = t(state.language, MODE_NAMES[state.mode]);

  const root = document.getElementById('app');
  root.innerHTML = `
    <div class="result">
      <h1>${t(state.language, 'runComplete')}</h1>
      <div class="score-big">${t(state.language, 'scorePercent', { score: scorePct })}</div>
      <div class="score-detail">
        <div>${t(state.language, 'cleanQuestions', { count: cleanCount, total })}</div>
        <div>${t(state.language, 'hintedQuestions', { count: hintedCount })}</div>
      </div>
      <div class="run-info">${t(state.language, 'runInfo', { alphabet: alphabetName, mode: modeName })}</div>
      <button id="backBtn" class="btn btn-primary">${t(state.language, 'backToSetup')}</button>
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', goToSetup);
}

function goToSetup() {
  state.isRunning = false;
  state.finished = false;
  state.currentHintShown = false;
  state.symbols = [];
  state.currentIndex = 0;
  state.hinted = [];
  render();
}

function confirmReset() {
  if (confirm(t(state.language, 'resetConfirm'))) {
    goToSetup();
  }
}

async function init() {
  await loadData();
  state.language = 'en';
  render();
  setupLanguageWatcher();
}

function setupLanguageWatcher() {
  const appEl = document.getElementById('app');
  const observer = new MutationObserver(() => {
    const footer = document.getElementById('attribution-footer');
    if (footer) {
      footer.textContent = t(state.language, 'footer');
    }
  });
  observer.observe(appEl, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', init);
