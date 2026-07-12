// Browser UI controller for the Phonetic Benchmark v2 application.
//
// This module is intentionally framework-free (no React/Vue/etc.). It renders
// plain DOM nodes and keeps all benchmark-critical logic in src/logic.js so the
// behavior can be unit-tested without a browser.

import {
  ALPHABETS,
  OPTIONS,
  SUPPORTED_ALPHABETS,
  SUPPORTED_LANGUAGES,
  MODES,
  initData,
  shuffle,
  isKeyboardAnswerCorrect,
  buildSuggestionOptions,
  buildRunPlan,
  computeScore,
} from "./logic.js";
import { translate } from "./i18n.js";

// Fixed attribution values required by the benchmark. The implementation date
// is fixed for this run and must NOT be generated dynamically.
const MODEL_NAME = "Hy3 (free)";
const IMPLEMENTATION_DATE = "2026-07-07";

// Open-question decisions (see README.md / IMPLEMENTATION_REPORT.md):
// 1. Reset behavior: a run cannot be reset mid-run. After completion the result
//    screen offers "Start again" (same setup) and "Change setup".
// 2. Interface-language switching: only allowed on the setup screen; it is
//    locked during an active run to keep the run coherent.
export async function createApp(root, opts = {}) {
  await initData();
  const t = (key, vars) => translate(state.lang, key, vars);

  const state = {
    lang:
      opts.lang && SUPPORTED_LANGUAGES.includes(opts.lang) ? opts.lang : "en",
    alphabet: "nato",
    mode: "keyboard",
    phase: "setup", // setup | run | result
    plan: [],
    index: 0,
    hintedQuestions: 0,
    currentHintUsed: false,
    currentOptions: [],
    wrongFlash: false,
  };

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") {
        node.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (v != null) {
        node.setAttribute(k, v);
      }
    }
    for (const child of [].concat(children)) {
      if (child == null) continue;
      node.appendChild(
        typeof child === "string" ? document.createTextNode(child) : child,
      );
    }
    return node;
  }

  function clear() {
    while (root.firstChild) root.removeChild(root.firstChild);
  }

  function render() {
    clear();
    if (state.phase === "setup") renderSetup();
    else if (state.phase === "run") renderRun();
    else renderResult();
    renderFooter();
  }

  function renderFooter() {
    const line = t("attribution", {
      model: MODEL_NAME,
      date: IMPLEMENTATION_DATE,
    });
    root.appendChild(el("footer", { class: "attribution" }, [line]));
  }

  function renderSetup() {
    const card = el("section", { class: "card" }, [
      el("h1", { text: t("appTitle") }),
      el("p", { class: "subtitle", text: t("appSubtitle") }),
      el("h2", { text: t("setupHeading") }),
    ]);

    // Language selector
    const langGroup = el("div", { class: "field" }, [
      el("label", { text: t("languageLabel") }),
    ]);
    const langRow = el("div", { class: "options" });
    for (const code of SUPPORTED_LANGUAGES) {
      const selected = state.lang === code;
      langRow.appendChild(
        el(
          "button",
          {
            class: "option" + (selected ? " selected" : ""),
            type: "button",
            onClick: () => {
              state.lang = code;
              render();
            },
          },
          [code === "pl" ? t("langPolish") : t("langEnglish")],
        ),
      );
    }
    langGroup.appendChild(langRow);
    card.appendChild(langGroup);

    // Alphabet selector
    const alphaGroup = el("div", { class: "field" }, [
      el("label", { text: t("alphabetLabel") }),
    ]);
    const alphaRow = el("div", { class: "options" });
    for (const key of SUPPORTED_ALPHABETS) {
      const selected = state.alphabet === key;
      alphaRow.appendChild(
        el(
          "button",
          {
            class: "option" + (selected ? " selected" : ""),
            type: "button",
            onClick: () => {
              state.alphabet = key;
              render();
            },
          },
          [key === "polish" ? t("polishAlphabet") : t("natoAlphabet")],
        ),
      );
    }
    alphaGroup.appendChild(alphaRow);
    card.appendChild(alphaGroup);

    // Mode selector
    const modeGroup = el("div", { class: "field" }, [
      el("label", { text: t("modeLabel") }),
    ]);
    const modeRow = el("div", { class: "options" });
    const modeButtons = [
      {
        key: "keyboard",
        title: t("keyboardMode"),
        desc: t("keyboardModeDesc"),
      },
      {
        key: "suggestion",
        title: t("suggestionMode"),
        desc: t("suggestionModeDesc"),
      },
    ];
    for (const m of modeButtons) {
      const selected = state.mode === m.key;
      modeRow.appendChild(
        el(
          "button",
          {
            class: "option mode" + (selected ? " selected" : ""),
            type: "button",
            onClick: () => {
              state.mode = m.key;
              render();
            },
          },
          [el("strong", { text: m.title }), el("span", { text: m.desc })],
        ),
      );
    }
    modeGroup.appendChild(modeRow);
    card.appendChild(modeGroup);

    card.appendChild(
      el("button", { class: "primary", type: "button", onClick: startRun }, [
        t("startButton"),
      ]),
    );

    root.appendChild(card);
  }

  function startRun() {
    state.plan = buildRunPlan(state.alphabet);
    state.index = 0;
    state.hintedQuestions = 0;
    state.phase = "run";
    prepareQuestion();
    render();
  }

  function prepareQuestion() {
    state.currentHintUsed = false;
    state.wrongFlash = false;
    if (state.mode === "suggestion") {
      const sym = state.plan[state.index].symbol;
      state.currentOptions = buildSuggestionOptions(state.alphabet, sym);
    } else {
      state.currentOptions = [];
    }
  }

  function renderRun() {
    const current = state.plan[state.index];
    const total = state.plan.length;
    const card = el("section", { class: "card run" });

    // Progress header
    card.appendChild(
      el("div", { class: "progress" }, [
        el("span", {
          text: `${t("nextLabel")}: ${state.index + 1} / ${total}`,
        }),
        el("span", {
          text: `${state.alphabet === "polish" ? t("polishAlphabet") : t("natoAlphabet")} · ${
            state.mode === "keyboard" ? t("modeKeyboard") : t("modeSuggestion")
          }`,
        }),
      ]),
    );

    card.appendChild(
      el("p", {
        class: "question",
        text: `${t("questionLabel")} ${current.symbol}`,
      }),
    );

    // Hint area
    const hintArea = el("div", { class: "hint-area" });
    if (state.currentHintUsed) {
      hintArea.appendChild(
        el("p", {
          class: "hint",
          text: `${t("hintRevealed")} ${current.codeword}`,
        }),
      );
    }
    card.appendChild(hintArea);

    // Answer area depends on mode
    if (state.mode === "keyboard") {
      const input = el("input", {
        class: "answer-input",
        type: "text",
        "aria-label": t("questionLabel"),
        autocomplete: "off",
      });
      const form = el(
        "form",
        {
          class: "answer-form",
          onSubmit: (e) => {
            e.preventDefault();
            submitKeyboard(input.value);
          },
        },
        [
          input,
          el("button", { class: "primary", type: "submit" }, [
            t("submitButton"),
          ]),
        ],
      );
      card.appendChild(form);
      setTimeout(() => input.focus(), 0);
    } else {
      const optsRow = el("div", { class: "options suggestion" });
      for (const opt of state.currentOptions) {
        optsRow.appendChild(
          el(
            "button",
            {
              class: "option suggestion-btn",
              type: "button",
              onClick: () => submitSuggestion(opt),
            },
            [opt],
          ),
        );
      }
      card.appendChild(optsRow);
    }

    // Wrong-answer feedback
    if (state.wrongFlash) {
      card.appendChild(el("p", { class: "wrong", text: t("wrongAnswer") }));
    }

    // Hint button
    card.appendChild(
      el(
        "button",
        {
          class: "hint-btn",
          type: "button",
          onClick: useHint,
          disabled: state.currentHintUsed ? "true" : null,
        },
        [state.currentHintUsed ? t("hintUsed") : t("hintButton")],
      ),
    );

    root.appendChild(card);
  }

  function useHint() {
    if (state.currentHintUsed) return;
    state.currentHintUsed = true;
    state.hintedQuestions += 1;
    render();
  }

  function submitKeyboard(raw) {
    const current = state.plan[state.index];
    if (isKeyboardAnswerCorrect(raw, current.codeword)) {
      advance();
    } else {
      state.wrongFlash = true;
      render();
    }
  }

  function submitSuggestion(choice) {
    const current = state.plan[state.index];
    if (choice === current.codeword) {
      advance();
    } else {
      state.wrongFlash = true;
      render();
    }
  }

  function advance() {
    state.index += 1;
    if (state.index >= state.plan.length) {
      state.phase = "result";
      render();
    } else {
      prepareQuestion();
      render();
    }
  }

  function renderResult() {
    const total = state.plan.length;
    const score = computeScore(total, state.hintedQuestions);
    const card = el("section", { class: "card result" }, [
      el("h2", { text: t("resultHeading") }),
      el("p", { class: "score", text: `${t("resultScore")}: ${score}%` }),
      el("ul", { class: "result-meta" }, [
        el("li", {
          text: `${t("resultAlphabet")}: ${
            state.alphabet === "polish"
              ? t("polishAlphabet")
              : t("natoAlphabet")
          }`,
        }),
        el("li", {
          text: `${t("resultMode")}: ${
            state.mode === "keyboard" ? t("modeKeyboard") : t("modeSuggestion")
          }`,
        }),
        el("li", {
          text: `${t("resultClean")}: ${total - state.hintedQuestions} / ${total}`,
        }),
        el("li", {
          text: `${t("resultHinted")}: ${state.hintedQuestions} / ${total}`,
        }),
      ]),
      el("div", { class: "result-actions" }, [
        el("button", { class: "primary", type: "button", onClick: startRun }, [
          t("restartButton"),
        ]),
        el(
          "button",
          { class: "secondary", type: "button", onClick: backToSetup },
          [t("setupButton")],
        ),
      ]),
    ]);
    root.appendChild(card);
  }

  function backToSetup() {
    state.phase = "setup";
    render();
  }

  render();
  return {
    getState: () => state,
    MODEL_NAME,
    IMPLEMENTATION_DATE,
  };
}

// Browser bootstrap: start the app when loaded as a module in the page.
if (typeof document !== "undefined" && document.getElementById("app")) {
  createApp(document.getElementById("app"));
}
