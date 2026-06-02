(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function k(e){const t=[...e];for(let n=t.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[t[n],t[a]]=[t[a],t[n]]}return t}let f=null,g=null;async function x(){if(f)return f;const e=await fetch("./data/alphabets.json");if(!e.ok)throw new Error("Failed to load alphabets.json");return f=await e.json(),f}async function H(){if(g)return g;const e=await fetch("./data/multiple-choice-options.json");if(!e.ok)throw new Error("Failed to load multiple-choice-options.json");return g=await e.json(),g}function O(e,t,n){return e[t][n]??[]}const y={en:{appTitle:"Phonetic Trainer",appSubtitle:"Practice phonetic alphabets",labelLanguage:"Interface Language",labelAlphabet:"Phonetic Alphabet",labelMode:"Exercise Mode",alphabetPolish:"Polish",alphabetNato:"NATO",modeKeyboard:"Keyboard",modeSuggestion:"Suggestion",btnStart:"Start",languageDisabledTip:"Language cannot be changed during an active run",progress:(e,t)=>`${e} / ${t}`,btnHint:"Hint",btnSubmit:"Submit",hintLabel:"Answer:",inputPlaceholder:"Type the codeword…",wrongAnswer:"Incorrect — try again",btnRestart:"Restart",resultTitle:"Run Complete!",resultAlphabet:"Alphabet",resultMode:"Mode",resultScore:"Score",resultTotal:"Questions",resultHinted:"Hinted",resultClean:"Clean",btnPlayAgain:"Play Again"},pl:{appTitle:"Trener Fonetyczny",appSubtitle:"Ćwicz alfabety fonetyczne",labelLanguage:"Język interfejsu",labelAlphabet:"Alfabet fonetyczny",labelMode:"Tryb ćwiczeń",alphabetPolish:"Polski",alphabetNato:"NATO",modeKeyboard:"Klawiatura",modeSuggestion:"Podpowiedzi",btnStart:"Start",languageDisabledTip:"Nie można zmienić języka podczas aktywnego ćwiczenia",progress:(e,t)=>`${e} / ${t}`,btnHint:"Podpowiedź",btnSubmit:"Zatwierdź",hintLabel:"Odpowiedź:",inputPlaceholder:"Wpisz hasło wywoławcze…",wrongAnswer:"Niepoprawnie — spróbuj ponownie",btnRestart:"Restart",resultTitle:"Ćwiczenie ukończone!",resultAlphabet:"Alfabet",resultMode:"Tryb",resultScore:"Wynik",resultTotal:"Pytania",resultHinted:"Z podpowiedzią",resultClean:"Bez podpowiedzi",btnPlayAgain:"Zagraj ponownie"}};let w="en";function L(){return w}function j(e){y[e]&&(w=e,document.dispatchEvent(new CustomEvent("localechange",{detail:{lang:e}})))}function s(e,...t){const n=y[w][e]??y.en[e]??e;return typeof n=="function"?n(...t):n}const o={locale:"en",alphabet:null,mode:null,runActive:!1,symbols:[],currentIndex:0,hintedSet:new Set,done:!1,alphabets:null,options:null};let $=null;function N(e){$=e}function S(){$&&$()}function u(){return o}function R(e){o.locale=e}function I(e,t,n){const{shuffle:a}=window.__app;o.alphabet=e,o.mode=t,o.symbols=a(n[e]),o.currentIndex=0,o.hintedSet=new Set,o.runActive=!0,o.done=!1,S()}function C(){o.hintedSet.add(o.currentIndex)}function P(){o.currentIndex+=1,o.currentIndex>=o.symbols.length&&(o.done=!0,o.runActive=!1),S()}function E(){o.runActive=!1,o.done=!1,o.symbols=[],o.currentIndex=0,o.hintedSet=new Set,o.alphabet=null,o.mode=null,S()}function _(e,t){o.alphabets=e,o.options=t}function F(e){const t=u(),n=t.runActive;e.innerHTML=`
    <div class="screen setup-screen">
      <header class="app-header">
        <h1 class="app-title">${s("appTitle")}</h1>
        <p class="app-subtitle">${s("appSubtitle")}</p>
      </header>

      <main class="setup-form">

        <div class="field-group">
          <label class="field-label" for="lang-select">${s("labelLanguage")}</label>
          <div class="segmented-control" role="group" aria-label="${s("labelLanguage")}">
            <button id="lang-en" class="seg-btn${L()==="en"?" active":""}"
              data-lang="en"
              ${n?'disabled title="'+s("languageDisabledTip")+'"':""}>
              English
            </button>
            <button id="lang-pl" class="seg-btn${L()==="pl"?" active":""}"
              data-lang="pl"
              ${n?'disabled title="'+s("languageDisabledTip")+'"':""}>
              Polski
            </button>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">${s("labelAlphabet")}</label>
          <div class="segmented-control" role="group" aria-label="${s("labelAlphabet")}">
            <button id="alpha-polish" class="seg-btn${t.alphabet==="polish"?" active":""}"
              data-alpha="polish">
              ${s("alphabetPolish")}
            </button>
            <button id="alpha-nato" class="seg-btn${t.alphabet==="nato"?" active":""}"
              data-alpha="nato">
              ${s("alphabetNato")}
            </button>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">${s("labelMode")}</label>
          <div class="segmented-control" role="group" aria-label="${s("labelMode")}">
            <button id="mode-keyboard" class="seg-btn${t.mode==="keyboard"?" active":""}"
              data-mode="keyboard">
              ${s("modeKeyboard")}
            </button>
            <button id="mode-suggestion" class="seg-btn${t.mode==="suggestion"?" active":""}"
              data-mode="suggestion">
              ${s("modeSuggestion")}
            </button>
          </div>
        </div>

        <button id="btn-start" class="btn-primary"
          ${!t.alphabet||!t.mode?"disabled":""}>
          ${s("btnStart")}
        </button>

      </main>
    </div>
  `,e.querySelectorAll(".seg-btn[data-lang]").forEach(a=>{a.addEventListener("click",()=>{n||j(a.dataset.lang)})}),e.querySelectorAll(".seg-btn[data-alpha]").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".seg-btn[data-alpha]").forEach(l=>l.classList.remove("active")),a.classList.add("active"),u().alphabet=a.dataset.alpha,A(e)})}),e.querySelectorAll(".seg-btn[data-mode]").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".seg-btn[data-mode]").forEach(l=>l.classList.remove("active")),a.classList.add("active"),u().mode=a.dataset.mode,A(e)})}),e.querySelector("#btn-start").addEventListener("click",()=>{const a=u();!a.alphabet||!a.mode||I(a.alphabet,a.mode,a.alphabets)})}function A(e){const t=u(),n=e.querySelector("#btn-start");n&&(n.disabled=!t.alphabet||!t.mode)}function K(e,t){const n=e.trim().toLowerCase(),a=t.toLowerCase();return n===a}function D(e){const t=u(),{symbols:n,currentIndex:a,hintedSet:l,mode:i,alphabet:r,options:d}=t,h=n[a],b=n.length,p=a+1,c=l.has(a);i==="keyboard"?B(e,h,p,b,c):W(e,h,p,b,c,r,d)}function B(e,t,n,a,l,i){e.innerHTML=`
    <div class="screen exercise-screen">
      <div class="exercise-header">
        <button id="btn-restart" class="btn-ghost">${s("btnRestart")}</button>
        <span class="progress-indicator">${s("progress",n,a)}</span>
        <button id="btn-hint" class="btn-hint${l?" used":""}">
          ${s("btnHint")}
        </button>
      </div>

      ${l?`<div class="hint-reveal">
        <span class="hint-label">${s("hintLabel")}</span>
        <span class="hint-value">${t.codeword}</span>
      </div>`:'<div class="hint-reveal hidden"></div>'}

      <div class="symbol-display">
        <span class="symbol-letter">${t.symbol}</span>
      </div>

      <div id="feedback" class="feedback" aria-live="polite"></div>

      <form id="keyboard-form" class="keyboard-form" autocomplete="off">
        <input
          id="answer-input"
          class="answer-input"
          type="text"
          placeholder="${s("inputPlaceholder")}"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          aria-label="${t.symbol}"
        />
        <button id="btn-submit" type="submit" class="btn-primary">${s("btnSubmit")}</button>
      </form>
    </div>
  `,T(e),z(e,l);const r=e.querySelector("#keyboard-form"),d=e.querySelector("#answer-input"),h=e.querySelector("#feedback");d.focus(),r.addEventListener("submit",b=>{b.preventDefault();const p=d.value;K(p,t.codeword)?P():M(h,d)})}function W(e,t,n,a,l,i,r){const d=O(r,i,t.symbol),b=k(d).map((c,q)=>`
    <button class="option-btn" id="opt-${q}" data-value="${c}">${c}</button>
  `).join("");e.innerHTML=`
    <div class="screen exercise-screen">
      <div class="exercise-header">
        <button id="btn-restart" class="btn-ghost">${s("btnRestart")}</button>
        <span class="progress-indicator">${s("progress",n,a)}</span>
        <button id="btn-hint" class="btn-hint${l?" used":""}">
          ${s("btnHint")}
        </button>
      </div>

      ${l?`<div class="hint-reveal">
        <span class="hint-label">${s("hintLabel")}</span>
        <span class="hint-value">${t.codeword}</span>
      </div>`:'<div class="hint-reveal hidden"></div>'}

      <div class="symbol-display">
        <span class="symbol-letter">${t.symbol}</span>
      </div>

      <div id="feedback" class="feedback" aria-live="polite"></div>

      <div class="options-grid" role="group" aria-label="Answer options">
        ${b}
      </div>
    </div>
  `,T(e),z(e,l);const p=e.querySelector("#feedback");e.querySelectorAll(".option-btn").forEach(c=>{c.addEventListener("click",()=>{c.dataset.value===t.codeword?P():M(p,c)})})}function T(e){e.querySelector("#btn-restart").addEventListener("click",()=>{E()})}function z(e,t,n){const a=e.querySelector("#btn-hint");if(t){a.disabled=!0;return}a.addEventListener("click",()=>{C();const{renderApp:l}=window.__app;l()})}function M(e,t){e.textContent=s("wrongAnswer"),t.classList.remove("shake"),t.offsetWidth,t.classList.add("shake"),setTimeout(()=>e.textContent="",1800)}function Z(e,t){if(e===0)return 0;const n=e-t;return Math.round(n/e*100)}function J(e){const t=u(),n=t.symbols.length,a=t.hintedSet.size,l=n-a,i=Z(n,a),r=t.alphabet==="polish"?s("alphabetPolish"):s("alphabetNato"),d=t.mode==="keyboard"?s("modeKeyboard"):s("modeSuggestion");e.innerHTML=`
    <div class="screen result-screen">
      <div class="result-card">
        <h2 class="result-title">${s("resultTitle")}</h2>

        <div class="score-display">
          <span class="score-number">${i}%</span>
        </div>

        <dl class="result-meta">
          <dt>${s("resultAlphabet")}</dt>
          <dd>${r}</dd>

          <dt>${s("resultMode")}</dt>
          <dd>${d}</dd>

          <dt>${s("resultTotal")}</dt>
          <dd>${n}</dd>

          <dt>${s("resultClean")}</dt>
          <dd>${l}</dd>

          <dt>${s("resultHinted")}</dt>
          <dd>${a}</dd>
        </dl>

        <button id="btn-play-again" class="btn-primary">
          ${s("btnPlayAgain")}
        </button>
      </div>
    </div>
  `,e.querySelector("#btn-play-again").addEventListener("click",()=>{E()})}window.__app={shuffle:k,renderApp:v};const m=document.getElementById("app");function v(){const e=u();e.done?J(m):e.runActive?D(m):F(m)}document.addEventListener("localechange",({detail:e})=>{R(e.lang),v()});async function G(){try{const[e,t]=await Promise.all([x(),H()]);_(e,t),N(v),v()}catch(e){m.innerHTML=`<div class="error-screen">
      <p>Failed to load benchmark data. Make sure the dev server is running from the <code>app/</code> directory.</p>
      <pre>${e.message}</pre>
    </div>`}}G();
