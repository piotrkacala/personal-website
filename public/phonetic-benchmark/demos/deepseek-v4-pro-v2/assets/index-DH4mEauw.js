(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const T=[{symbol:"A",codeword:"ADAM"},{symbol:"Ą",codeword:"KĄT"},{symbol:"B",codeword:"BARBARA"},{symbol:"C",codeword:"CELINA"},{symbol:"Ć",codeword:"ĆMA"},{symbol:"D",codeword:"DOROTA"},{symbol:"E",codeword:"EDWARD"},{symbol:"Ę",codeword:"JĘK"},{symbol:"F",codeword:"FILIP"},{symbol:"G",codeword:"GUSTAW"},{symbol:"H",codeword:"HENRYK"},{symbol:"I",codeword:"IGNACY"},{symbol:"J",codeword:"JÓZEF"},{symbol:"K",codeword:"KAROL"},{symbol:"L",codeword:"LUDWIK"},{symbol:"Ł",codeword:"ŁUKASZ"},{symbol:"M",codeword:"MARIAN"},{symbol:"N",codeword:"NIKODEM"},{symbol:"Ń",codeword:"KOŃ"},{symbol:"O",codeword:"OLGA"},{symbol:"P",codeword:"PAWEŁ"},{symbol:"Q",codeword:"QUANTUM"},{symbol:"R",codeword:"ROMAN"},{symbol:"S",codeword:"STEFAN"},{symbol:"Ś",codeword:"ŚWIATOWID"},{symbol:"T",codeword:"TADEUSZ"},{symbol:"U",codeword:"URSZULA"},{symbol:"V",codeword:"VIOLETTA"},{symbol:"W",codeword:"WALENTY"},{symbol:"X",codeword:"XAWERY"},{symbol:"Y",codeword:"YPSYLON"},{symbol:"Z",codeword:"ZYGMUNT"},{symbol:"Ż",codeword:"ŻABA"},{symbol:"Ź",codeword:"ŹREBAK"}],R=[{symbol:"A",codeword:"ALFA"},{symbol:"B",codeword:"BRAVO"},{symbol:"C",codeword:"CHARLIE"},{symbol:"D",codeword:"DELTA"},{symbol:"E",codeword:"ECHO"},{symbol:"F",codeword:"FOXTROT"},{symbol:"G",codeword:"GOLF"},{symbol:"H",codeword:"HOTEL"},{symbol:"I",codeword:"INDIA"},{symbol:"J",codeword:"JULIETT"},{symbol:"K",codeword:"KILO"},{symbol:"L",codeword:"LIMA"},{symbol:"M",codeword:"MIKE"},{symbol:"N",codeword:"NOVEMBER"},{symbol:"O",codeword:"OSCAR"},{symbol:"P",codeword:"PAPA"},{symbol:"Q",codeword:"QUEBEC"},{symbol:"R",codeword:"ROMEO"},{symbol:"S",codeword:"SIERRA"},{symbol:"T",codeword:"TANGO"},{symbol:"U",codeword:"UNIFORM"},{symbol:"V",codeword:"VICTOR"},{symbol:"W",codeword:"WHISKEY"},{symbol:"X",codeword:"XRAY"},{symbol:"Y",codeword:"YANKEE"},{symbol:"Z",codeword:"ZULU"}],g={polish:T,nato:R},I={A:["ADAM","AGENDA","AKTOR","ATLAS"],Ą:["KĄT","MĄKA","PĄK","WĄŻ"],B:["BARBARA","BALON","BILET","BUTELKA"],C:["CELINA","CYTRYNA","CUKIER","CYRKIEL"],Ć:["ĆMA","ĆMIEL","ĆWICZENIE","ĆWIKŁA"],D:["DOROTA","DRZEWO","DROGA","DYWAN"],E:["EDWARD","EKRAN","ETYKA","EUROPA"],Ę:["JĘK","MIĘSO","PIĘĆ","TĘCZA"],F:["FILIP","FARBA","FOKUS","FOTEL"],G:["GUSTAW","GAZETA","GITARA","GŁOS"],H:["HENRYK","HERBATA","HISTORIA","HOTEL"],I:["IGNACY","IGLICA","IGŁA","ILUZJA"],J:["JÓZEF","JABŁKO","JĘZYK","JUTRO"],K:["KAROL","KAJAK","KLASA","KOTLET"],L:["LUDWIK","LAMPA","LASER","LISTEK"],Ł:["ŁUKASZ","ŁAŃCUCH","ŁODYGA","ŁOPATA"],M:["MARIAN","MAPA","MŁOTEK","MONETA"],N:["NIKODEM","NARTY","NOGA","NUTA"],Ń:["KOŃ","DZWOŃ","JAŹŃ","SŁOŃ"],O:["OLGA","OBIAD","OGRÓD","OKNO"],P:["PAWEŁ","PAPIER","PODUSZKA","POMIDOR"],Q:["QUANTUM","QUAD","QUASAR","QUOTA"],R:["ROMAN","RABAT","RADIO","ROWER"],S:["STEFAN","SAMOLOT","SERWETKA","SYRENA"],Ś:["ŚWIATOWID","ŚLAD","ŚNIEG","ŚWIT"],T:["TADEUSZ","TELEFON","TORBA","TRASA"],U:["URSZULA","UBRANIE","UKŁAD","ULICA"],V:["VIOLETTA","VECTRA","VENTYL","VIDEO"],W:["WALENTY","WALIZKA","WARSZTAT","WIDOK"],X:["XAWERY","XENON","XEROX","XYLOFON"],Y:["YPSYLON","YACHT","YETI","YUPPIE"],Z:["ZYGMUNT","ZAMEK","ZEGAR","ZUPA"],Ż:["ŻABA","ŻAGIEL","ŻOŁNIERZ","ŻURAW"],Ź:["ŹREBAK","ŹDŹBŁO","ŹRENICA","ŹRÓDŁO"]},L={A:["ALFA","AMBER","ARROW","ATLAS"],B:["BRAVO","BAKER","BASIC","BLOOM"],C:["CHARLIE","CABLE","CANYON","CIRCLE"],D:["DELTA","DESERT","DINNER","DRAGON"],E:["ECHO","EAGLE","EMBER","ENGINE"],F:["FOXTROT","FALCON","FOREST","FUTURE"],G:["GOLF","GADGET","GALAXY","GARDEN"],H:["HOTEL","HAMMER","HARBOR","HORIZON"],I:["INDIA","ICEBERG","ICON","IMPULSE"],J:["JULIETT","JACKET","JASPER","JUNGLE"],K:["KILO","KAYAK","KINGDOM","KITTEN"],L:["LIMA","LANTERN","LASER","LEGEND"],M:["MIKE","MARKET","METEOR","MODULE"],N:["NOVEMBER","NATURE","NEBULA","NICKEL"],O:["OSCAR","OMEGA","ORANGE","ORBIT"],P:["PAPA","PANTHER","PLANET","POCKET"],Q:["QUEBEC","QUARTZ","QUICKSAND","QUILL"],R:["ROMEO","RANGER","RIVER","ROCKET"],S:["SIERRA","SHADOW","SIGNAL","SUNSET"],T:["TANGO","TARGET","TEMPLE","THUNDER"],U:["UNIFORM","UMBRA","UPLINK","URBAN"],V:["VICTOR","VAPOR","VECTOR","VIOLET"],W:["WHISKEY","WARDEN","WILLOW","WINDOW"],X:["XRAY","XENON","XYLEM","XYSTUS"],Y:["YANKEE","YELLOW","YOGURT","YONDER"],Z:["ZULU","ZENITH","ZEPHYR","ZODIAC"]},h={polish:I,nato:L};function f(e){return g[e]||[]}function N(e,o){var t;return((t=h[e])==null?void 0:t[o])||[]}function p(e){const o=[...e];for(let t=o.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[o[t],o[n]]=[o[n],o[t]]}return o}function w(e,o){const t=e-o;return Math.round(t/e*100)}const S="2026-06-23",K="DeepSeek-V4-Pro";function B(){return{lang:"en",alphabet:null,mode:null,screen:"setup",runOrder:[],currentIndex:-1,hinted:new Set,hintVisible:!1,feedback:null,runFinished:!1}}function M(e,o,t,n){e.lang=o,e.alphabet=t,e.mode=n,e.screen="exercise";const r=f(t);e.runOrder=p(r),e.currentIndex=0,e.hinted=new Set,e.hintVisible=!1,e.feedback=null,e.runFinished=!1}function u(e){return e.currentIndex<0||e.currentIndex>=e.runOrder.length?null:e.runOrder[e.currentIndex]}function D(e){const o=u(e);if(!o)return[];const t=N(e.alphabet,o.symbol);return p(t)}function y(e){u(e)&&(e.hinted.add(e.currentIndex),e.hintVisible=!0)}function m(e){e.currentIndex++,e.hintVisible=!1,e.feedback=null,e.currentIndex>=e.runOrder.length&&(e.runFinished=!0,e.screen="result")}function U(e){return w(e.runOrder.length,e.hinted.size)}function v(){return K}function P(){return S}function C(e){return{current:e.currentIndex,total:e.runOrder.length}}const E={en:{appTitle:"Phonetic Alphabet Trainer",setupHeading:"Setup",chooseLanguage:"Interface language:",chooseAlphabet:"Phonetic alphabet:",chooseMode:"Exercise mode:",modeKeyboard:"Keyboard",modeSuggestion:"Suggestion",startButton:"Start",alphabetPolish:"Polish",alphabetNato:"NATO",hintButton:"Show Hint",hintLabel:"Hint:",submitButton:"Submit",nextButton:"Next",restartButton:"Restart",tryAgainButton:"Try Again",resultHeading:"Run Complete",resultScore:"Your score:",resultAlphabet:"Alphabet:",resultMode:"Mode:",progress:"Question",correct:"Correct!",incorrect:"Incorrect, try again.",footerAttribution:"Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by {model} on {date}.",switchLangDisabled:"Language switching is disabled during an active run.",modeKeyboardDesc:"Type the codeword for each symbol",modeSuggestionDesc:"Choose the correct codeword from 4 options"},pl:{appTitle:"Trener Alfabetu Fonetycznego",setupHeading:"Ustawienia",chooseLanguage:"Język interfejsu:",chooseAlphabet:"Alfabet fonetyczny:",chooseMode:"Tryb ćwiczenia:",modeKeyboard:"Klawiatura",modeSuggestion:"Sugestie",startButton:"Rozpocznij",alphabetPolish:"Polski",alphabetNato:"NATO",hintButton:"Pokaż podpowiedź",hintLabel:"Podpowiedź:",submitButton:"Zatwierdź",nextButton:"Dalej",restartButton:"Zacznij od nowa",tryAgainButton:"Spróbuj ponownie",resultHeading:"Ukończono",resultScore:"Twój wynik:",resultAlphabet:"Alfabet:",resultMode:"Tryb:",progress:"Pytanie",correct:"Poprawnie!",incorrect:"Niepoprawnie, spróbuj ponownie.",footerAttribution:"Phonetic Benchmark autorstwa Piotra Kacały (piotrkacala.pl). Stworzone przez {model} dnia {date}.",switchLangDisabled:"Zmiana języka jest zablokowana podczas aktywnego ćwiczenia.",modeKeyboardDesc:"Wpisz słowo kodowe dla każdego symbolu",modeSuggestionDesc:"Wybierz poprawne słowo kodowe spośród 4 opcji"}};function O(e,o){var t;return((t=E[e])==null?void 0:t[o])||E.en[o]||o}function a(e,o,t={}){let n=O(e,o);for(const[r,s]of Object.entries(t))n=n.replace(`{${r}}`,s);return n}function Y(e,o){return e==="pl"?o==="polish"?"Polski":"NATO":o==="polish"?"Polish":"NATO"}function G(e,o){return O(e,o==="keyboard"?"modeKeyboard":"modeSuggestion")}function W(e){return e.trim().toUpperCase()}function $(e,o){return W(e)===o.toUpperCase()}function c(e,o){e.innerHTML="";const t=document.createElement("div");t.className="container",o.screen==="setup"?k(t,o):o.screen==="exercise"?H(t,o):o.screen==="result"&&J(t,o),e.appendChild(t),z(e,o)}function k(e,o){const t=(d,l)=>a(o.lang,d,l);e.innerHTML=`
    <h1>${t("appTitle")}</h1>
    <div class="setup-card">
      <h2>${t("setupHeading")}</h2>

      <div class="setup-group">
        <label for="lang-select">${t("chooseLanguage")}</label>
        <select id="lang-select">
          <option value="en" ${o.lang==="en"?"selected":""}>English</option>
          <option value="pl" ${o.lang==="pl"?"selected":""}>Polski</option>
        </select>
      </div>

      <div class="setup-group">
        <label for="alphabet-select">${t("chooseAlphabet")}</label>
        <select id="alphabet-select">
          <option value="polish">${t("alphabetPolish")}</option>
          <option value="nato">${t("alphabetNato")}</option>
        </select>
      </div>

      <div class="setup-group">
        <label for="mode-select">${t("chooseMode")}</label>
        <select id="mode-select">
          <option value="keyboard">${t("modeKeyboard")}</option>
          <option value="suggestion">${t("modeSuggestion")}</option>
        </select>
        <p class="mode-desc" id="mode-desc"></p>
      </div>

      <button id="start-btn" class="btn btn-primary">${t("startButton")}</button>
    </div>
  `;const n=e.querySelector("#mode-select"),r=e.querySelector("#mode-desc");function s(){const d=n.value;r.textContent=t(d==="keyboard"?"modeKeyboardDesc":"modeSuggestionDesc")}s(),n.addEventListener("change",s),e.querySelector("#lang-select").addEventListener("change",d=>{o.lang=d.target.value,c(document.getElementById("app"),o)}),e.querySelector("#start-btn").addEventListener("click",()=>{const d=e.querySelector("#lang-select").value,l=e.querySelector("#alphabet-select").value,i=e.querySelector("#mode-select").value;M(o,d,l,i),c(document.getElementById("app"),o)})}function H(e,o){const t=(d,l)=>a(o.lang,d,l),n=u(o);if(!n)return;const r=C(o),s=o.mode==="keyboard";e.innerHTML=`
    <div class="exercise-header">
      <h1>${t("appTitle")}</h1>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${r.current/r.total*100}%"></div>
      </div>
      <p class="progress-text">${t("progress")} ${r.current+1} / ${r.total}</p>
    </div>

    <div class="question-card">
      <div class="symbol-display">${n.symbol}</div>

      ${o.hintVisible?`<div class="hint-display">${t("hintLabel")} ${n.codeword}</div>`:""}

      ${o.feedback?`<div class="feedback ${o.feedback.type}">${t(o.feedback.key)}</div>`:""}

      ${s?Z(t):F(t,o)}

      <div class="actions">
        <button id="hint-btn" class="btn btn-secondary" ${o.hintVisible?"disabled":""}>${t("hintButton")}</button>
        <button id="restart-btn" class="btn btn-secondary">${t("restartButton")}</button>
      </div>
    </div>
  `,s?V(e,o):x(e,o)}function Z(e){return`
    <div class="keyboard-input">
      <input type="text" id="answer-input" class="text-input" placeholder="..." autocomplete="off" autofocus>
      <button id="submit-btn" class="btn btn-primary">${e("submitButton")}</button>
    </div>
  `}function F(e,o){return`
    <div class="suggestion-options">
      ${D(o).map(n=>`
        <button class="btn btn-option" data-answer="${n}">${n}</button>
      `).join("")}
    </div>
  `}function V(e,o){const t=e.querySelector("#answer-input"),n=e.querySelector("#submit-btn"),r=e.querySelector("#hint-btn"),s=e.querySelector("#restart-btn"),d=document.getElementById("app");function l(){const i=t.value,A=u(o);A&&($(i,A.codeword)?(m(o),c(d,o)):(o.feedback={type:"error",key:"incorrect"},c(d,o),setTimeout(()=>{const b=document.getElementById("answer-input");b&&b.focus()},50)))}n.addEventListener("click",l),t.addEventListener("keydown",i=>{i.key==="Enter"&&l()}),r.addEventListener("click",()=>{y(o),c(d,o)}),s.addEventListener("click",()=>{o.screen="setup",c(d,o)})}function x(e,o){const t=e.querySelector("#hint-btn"),n=e.querySelector("#restart-btn"),r=e.querySelectorAll(".btn-option"),s=document.getElementById("app"),d=u(o);r.forEach(l=>{l.addEventListener("click",()=>{l.dataset.answer===d.codeword?(m(o),c(s,o)):(o.feedback={type:"error",key:"incorrect"},c(s,o))})}),t.addEventListener("click",()=>{y(o),c(s,o)}),n.addEventListener("click",()=>{o.screen="setup",c(s,o)})}function J(e,o){const t=(r,s)=>a(o.lang,r,s),n=U(o);e.innerHTML=`
    <h1>${t("appTitle")}</h1>
    <div class="result-card">
      <h2>${t("resultHeading")}</h2>
      <div class="score-display">${n}%</div>
      <div class="result-details">
        <p><strong>${t("resultAlphabet")}</strong> ${Y(o.lang,o.alphabet)}</p>
        <p><strong>${t("resultMode")}</strong> ${G(o.lang,o.mode)}</p>
        <p><strong>${t("resultScore")}</strong> ${n}%</p>
      </div>
      <button id="try-again-btn" class="btn btn-primary">${t("tryAgainButton")}</button>
    </div>
  `,e.querySelector("#try-again-btn").addEventListener("click",()=>{o.screen="setup",c(document.getElementById("app"),o)})}function z(e,o){const t=e.querySelector(".footer");t&&t.remove();const n=document.createElement("footer");n.className="footer",n.textContent=a(o.lang,"footerAttribution",{model:v(),date:P()}),e.appendChild(n)}const q=document.getElementById("app"),X=B();c(q,X);
