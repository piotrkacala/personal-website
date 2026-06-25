// Browser entry point. Wires the pure game logic to the DOM and the
// benchmark data files. The data files are fetched from the canonical
// /benchmark-data/ paths so the same JSON the Node tests use is also
// what the browser consumes.

import {
  initialState,
  startRun,
  submitKeyboard,
  submitSuggestion,
  useHint,
  clearWrong,
  restartRun,
  runAgain,
  backToSetup,
  quitToSetup,
  setLanguage,
  setSetupAlphabet,
  setSetupMode,
  buildOptionsFor,
  currentQuestion,
  finalScore,
  STATUS,
  MODE
} from "./src/game.mjs";

import { STRINGS, DEFAULT_LANGUAGE, translate, pick } from "./src/i18n.mjs";

const IMPLEMENTATION_MODEL = "MiniMax-M3";
const IMPLEMENTATION_DATE = "2026-06-23";

const screen = document.getElementById("screen");
const attributionEl = document.getElementById("attribution");
const languageButtons = Array.from(document.querySelectorAll("[data-lang]"));

let alphabets = null;
let options = null;
let state = initialState({ language: DEFAULT_LANGUAGE });

function entriesFor(alphabetKey) {
  if (!alphabets) throw new Error("data not loaded");
  return alphabets[alphabetKey];
}

function currentQuestionWithOptions() {
  const q = currentQuestion(state);
  if (!q) return null;
  if (state.mode === MODE.SUGGESTION) {
    const four = buildOptionsFor(q.symbol, options, state.alphabet, Math.random);
    return { question: q, options: four };
  }
  return { question: q, options: null };
}

function applyI18n() {
  document.documentElement.lang = state.language === "pl" ? "pl" : "en";
  for (const el of document.querySelectorAll("[data-i18n]")) {
    const key = el.getAttribute("data-i18n");
    el.textContent = translate(state.language, key);
  }
  for (const btn of languageButtons) {
    btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === state.language ? "true" : "false");
  }
  attributionEl.textContent = translate(state.language, "footer.attribution", {
    model: IMPLEMENTATION_MODEL,
    date: IMPLEMENTATION_DATE
  });
}

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "on") {
      for (const [ev, fn] of Object.entries(v)) node.addEventListener(ev, fn);
    } else if (k === "attrs") {
      for (const [ak, av] of Object.entries(v)) node.setAttribute(ak, av);
    } else if (k === "dataset") {
      for (const [dk, dv] of Object.entries(v)) node.dataset[dk] = dv;
    } else {
      node[k] = v;
    }
  }
  for (const child of children) {
    if (child == null) continue;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

function renderSetup() {
  const card = el("section", { class: "card" }, [
    el("h2", { text: translate(state.language, "app.title") }),
    el("p", { class: "lede", text: translate(state.language, "app.subtitle") }),

    languageField(),

    el("div", { class: "field" }, [
      el("span", { class: "field-label", text: translate(state.language, "alphabet.label") }),
      el("div", { class: "choices" }, [
        alphabetChoice("polish"),
        alphabetChoice("nato")
      ])
    ]),

    el("div", { class: "field" }, [
      el("span", { class: "field-label", text: translate(state.language, "mode.label") }),
      el("div", { class: "choices" }, [
        modeChoice("keyboard"),
        modeChoice("suggestion")
      ])
    ]),

    el("div", { class: "row" }, [
      el("button", {
        class: "btn",
        attrs: { type: "button", id: "start-btn" },
        on: { click: onStart },
        text: translate(state.language, "actions.start")
      })
    ]),
    el("p", {
      class: "error-text",
      attrs: { id: "setup-error", hidden: "true" },
      text: translate(state.language, "error.pickAll")
    })
  ]);
  screen.replaceChildren(card);
}

function languageField() {
  return el("div", { class: "field" }, [
    el("span", { class: "field-label", text: translate(state.language, "language.label") }),
    el("div", { class: "choices" }, [
      el("button", {
        class: "choice",
        attrs: { type: "button", "data-alphabet": "polish-lang" },
        on: { click: () => onLanguageClick("pl") }
      }, [
        el("strong", { text: "Polski" }),
        el("small", { text: "PL" })
      ]),
      el("button", {
        class: "choice",
        attrs: { type: "button", "data-alphabet": "nato-lang" },
        on: { click: () => onLanguageClick("en") }
      }, [
        el("strong", { text: "English" }),
        el("small", { text: "EN" })
      ])
    ])
  ]);
}

function alphabetChoice(key) {
  const pressed = state.alphabet === key ? "true" : "false";
  return el("button", {
    class: "choice",
    attrs: { type: "button", "aria-pressed": pressed },
    on: { click: () => onAlphabetClick(key) }
  }, [
    el("strong", { text: translate(state.language, `alphabet.${key}`) }),
    el("small", { text: `${(alphabets?.[key] || []).length} symbols` })
  ]);
}

function modeChoice(key) {
  const pressed = state.mode === key ? "true" : "false";
  return el("button", {
    class: "choice",
    attrs: { type: "button", "aria-pressed": pressed },
    on: { click: () => onModeClick(key) }
  }, [
    el("strong", { text: translate(state.language, `mode.${key}`) }),
    el("small", { text: translate(state.language, `mode.${key}.description`) })
  ]);
}

function renderRunning() {
  const q = currentQuestionWithOptions();
  if (!q) {
    renderSetup();
    return;
  }

  const card = el("section", { class: "card" }, [
    el("p", { class: "progress", text: translate(state.language, "run.progress", {
      current: state.currentIndex + 1,
      total: state.queue.length
    }) }),

    el("div", { class: "symbol-card" }, [
      el("div", { class: "symbol", text: q.question.symbol }),
      el("div", { class: "prompt", text: translate(state.language, "run.symbolPrompt") })
    ]),

    state.mode === MODE.KEYBOARD
      ? renderKeyboardQuestion(q)
      : renderSuggestionQuestion(q),

    el("p", { class: "feedback" + (state.lastWrong ? " bad" : ""), text: state.lastWrong
      ? translate(state.language, "run.wrong")
      : "" }),

    el("div", { class: "row", attrs: { id: "bottom-row" } }, [
      el("button", {
        class: "btn ghost",
        attrs: { type: "button" },
        on: { click: onRestart },
        text: translate(state.language, "actions.restart")
      }),
      el("button", {
        class: "btn secondary",
        attrs: { type: "button" },
        on: { click: onQuit },
        text: translate(state.language, "actions.quit")
      })
    ])
  ]);
  screen.replaceChildren(card);

  const input = card.querySelector(".text-input");
  if (input) input.focus();
}

function renderKeyboardQuestion(q) {
  const hintUsedForCurrent = state.hintedSet.includes(state.currentIndex);
  const children = [
    el("div", { class: "input-row" }, [
      el("input", {
        class: "text-input",
        attrs: {
          type: "text",
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": translate(state.language, "run.symbolPrompt"),
          placeholder: translate(state.language, "run.placeholder")
        },
        on: {
          input: (e) => {
            state = clearWrong(state);
            const feedback = screen.querySelector(".feedback");
            if (feedback) feedback.textContent = "";
          },
          keydown: (e) => {
            if (e.key === "Enter") onSubmitKeyboard();
          }
        }
      }),
      el("button", {
        class: "btn",
        attrs: { type: "button" },
        on: { click: onSubmitKeyboard },
        text: translate(state.language, "actions.submit")
      })
    ])
  ];

  if (state.hintVisible) {
    children.push(
      el("div", { class: "hint-box" }, [
        el("strong", { text: `${translate(state.language, "run.hintVisible")}: ${q.question.codeword}` })
      ])
    );
  }

  children.push(
    el("div", { class: "hint-action" }, [
      el("button", {
        class: "btn secondary",
        attrs: { type: "button" },
        on: { click: onHint },
        text: translate(state.language, "actions.hint")
      }),
      hintUsedForCurrent
        ? el("span", { class: "hint-used-tag", text: "•" })
        : document.createTextNode("")
    ])
  );

  return el("div", {}, children);
}

function renderSuggestionQuestion(q) {
  const hintUsedForCurrent = state.hintedSet.includes(state.currentIndex);
  const children = [
    el("div", { class: "options-grid" },
      q.options.map((codeword) =>
        el("button", {
          class: "option",
          attrs: { type: "button" },
          on: { click: () => onSubmitSuggestion(codeword) },
          text: codeword
        })
      )
    )
  ];

  if (state.hintVisible) {
    children.push(
      el("div", { class: "hint-box" }, [
        el("strong", { text: `${translate(state.language, "run.hintVisible")}: ${q.question.codeword}` })
      ])
    );
  }

  children.push(
    el("div", { class: "hint-action" }, [
      el("button", {
        class: "btn secondary",
        attrs: { type: "button" },
        on: { click: onHint },
        text: translate(state.language, "actions.hint")
      }),
      hintUsedForCurrent
        ? el("span", { class: "hint-used-tag", text: "•" })
        : document.createTextNode("")
    ])
  );

  return el("div", {}, children);
}

function renderResult() {
  const score = finalScore(state);
  const card = el("section", { class: "card result" }, [
    el("h2", { text: translate(state.language, "result.title") }),
    el("div", { class: "percent", text: translate(state.language, "result.percent", { percent: score.percent }) }),
    el("div", { class: "meta", text: translate(state.language, "result.summary", {
      total: score.total,
      clean: score.clean,
      hinted: score.hinted
    }) }),
    el("p", { text: translate(state.language, "result.alphabet", {
      alphabet: translate(state.language, `alphabet.${state.alphabet}`)
    }) }),
    el("p", { text: translate(state.language, `result.mode.${state.mode}`) }),
    el("div", { class: "row" }, [
      el("button", {
        class: "btn",
        attrs: { type: "button" },
        on: { click: onRunAgain },
        text: translate(state.language, "actions.runAgain")
      }),
      el("button", {
        class: "btn secondary",
        attrs: { type: "button" },
        on: { click: onBackToSetup },
        text: translate(state.language, "actions.backToSetup")
      })
    ])
  ]);
  screen.replaceChildren(card);
}

function render() {
  applyI18n();
  if (state.status === STATUS.SETUP) renderSetup();
  else if (state.status === STATUS.RUNNING) renderRunning();
  else renderResult();
}

// ---- Event handlers -------------------------------------------------------

function onLanguageClick(lang) {
  state = setLanguage(state, lang);
  render();
}

function onAlphabetClick(alphabet) {
  state = setSetupAlphabet(state, alphabet);
  render();
}

function onModeClick(mode) {
  state = setSetupMode(state, mode);
  render();
}

function onStart() {
  const errorEl = screen.querySelector("#setup-error");
  if (!state.alphabet || !state.mode) {
    if (errorEl) {
      errorEl.removeAttribute("hidden");
      errorEl.textContent = translate(state.language, "error.pickAll");
    }
    return;
  }
  state = startRun(state, {
    alphabet: state.alphabet,
    mode: state.mode,
    entries: entriesFor(state.alphabet),
    rng: Math.random
  });
  render();
}

function onSubmitKeyboard() {
  const input = screen.querySelector(".text-input");
  if (!input) return;
  const result = submitKeyboard(state, input.value);
  state = result.state;
  if (result.accepted) {
    render();
  } else {
    const feedback = screen.querySelector(".feedback");
    if (feedback) {
      feedback.classList.add("bad");
      feedback.textContent = translate(state.language, "run.wrong");
    }
  }
}

function onSubmitSuggestion(codeword) {
  const result = submitSuggestion(state, codeword);
  state = result.state;
  if (result.accepted) render();
  else {
    const feedback = screen.querySelector(".feedback");
    if (feedback) {
      feedback.classList.add("bad");
      feedback.textContent = translate(state.language, "run.wrong");
    }
  }
}

function onHint() {
  const result = useHint(state);
  state = result.state;
  render();
}

function onRestart() {
  if (!state.alphabet) return;
  state = restartRun(state, { entries: entriesFor(state.alphabet), rng: Math.random });
  render();
}

function onQuit() {
  state = quitToSetup(state);
  render();
}

function onRunAgain() {
  if (!state.alphabet) return;
  state = runAgain(state, { entries: entriesFor(state.alphabet), rng: Math.random });
  render();
}

function onBackToSetup() {
  state = backToSetup(state);
  render();
}

// Header language toggle is always available.
for (const btn of languageButtons) {
  btn.addEventListener("click", () => onLanguageClick(btn.getAttribute("data-lang")));
}

// ---- Bootstrap ------------------------------------------------------------

async function loadData() {
  const [a, o] = await Promise.all([
    fetch("./benchmark-data/alphabets.json").then((r) => r.json()),
    fetch("./benchmark-data/multiple-choice-options.json").then((r) => r.json())
  ]);
  alphabets = a;
  options = o;
}

loadData()
  .then(() => {
    state = setLanguage(state, DEFAULT_LANGUAGE);
    render();
  })
  .catch((err) => {
    screen.replaceChildren(
      el("section", { class: "card" }, [
        el("h2", { text: "Failed to load benchmark data" }),
        el("p", { class: "lede", text: err.message })
      ])
    );
  });
