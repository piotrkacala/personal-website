(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const $={lang:"en",alphabetKey:"polish",mode:"keyboard",screen:"setup",queue:[],currentIndex:0,hintedCount:0,hintShown:!1,shuffledOptions:[],wrongInput:null,finalScore:0,totalQuestions:0,hintedQuestions:0};let g={...$};const y=new Set;function U(e){return y.add(e),()=>y.delete(e)}function u(){return{...g}}function d(e){g={...g,...e},y.forEach(o=>o(g))}const w={en:{appTitle:"Phonetic Trainer",appSubtitle:"Practice phonetic alphabets",labelLanguage:"Interface language",labelAlphabet:"Phonetic alphabet",labelMode:"Exercise mode",langEn:"English",langPl:"Polski",alphabetPolish:"Polish",alphabetNato:"NATO",modeKeyboard:"Keyboard",modeSuggestion:"Suggestion",modeKeyboardDesc:"Type the codeword using your keyboard",modeSuggestionDesc:"Choose the correct codeword from four options",btnStart:"Start exercise",btnSubmit:"Submit",btnHint:"Hint",btnHome:"Home",btnRestart:"Try again",btnNext:"Next",questionOf:(e,o)=>`${e} / ${o}`,hintLabel:"Hint:",inputPlaceholder:"Type the codeword…",feedbackWrong:"Incorrect. Try again.",resultTitle:"Run complete!",resultScore:"Your score",resultAlphabet:"Alphabet:",resultMode:"Mode:",resultHinted:e=>`Hints used: ${e}`,resultClean:e=>`Clean answers: ${e}`,attributionBenchmark:"Phonetic Benchmark by",attributionDeveloped:"Developed by",attributionOn:"on"},pl:{appTitle:"Trener Fonetyczny",appSubtitle:"Ćwicz alfabety fonetyczne",labelLanguage:"Język interfejsu",labelAlphabet:"Alfabet fonetyczny",labelMode:"Tryb ćwiczeń",langEn:"English",langPl:"Polski",alphabetPolish:"Polski",alphabetNato:"NATO",modeKeyboard:"Klawiatura",modeSuggestion:"Podpowiedzi",modeKeyboardDesc:"Wpisz słowo kodowe za pomocą klawiatury",modeSuggestionDesc:"Wybierz właściwe słowo kodowe spośród czterech opcji",btnStart:"Rozpocznij ćwiczenie",btnSubmit:"Zatwierdź",btnHint:"Podpowiedź",btnHome:"Strona główna",btnRestart:"Spróbuj ponownie",btnNext:"Dalej",questionOf:(e,o)=>`${e} / ${o}`,hintLabel:"Podpowiedź:",inputPlaceholder:"Wpisz słowo kodowe…",feedbackWrong:"Niepoprawnie. Spróbuj ponownie.",resultTitle:"Ćwiczenie zakończone!",resultScore:"Twój wynik",resultAlphabet:"Alfabet:",resultMode:"Tryb:",resultHinted:e=>`Użyte podpowiedzi: ${e}`,resultClean:e=>`Czyste odpowiedzi: ${e}`,attributionBenchmark:"Phonetic Benchmark autorstwa",attributionDeveloped:"Opracowany przez",attributionOn:"w dniu"}};function a(e,o,...t){var s,n;const r=((s=w[e])==null?void 0:s[o])??((n=w.en)==null?void 0:n[o]);return r===void 0?o:typeof r=="function"?r(...t):r}const D=[{symbol:"A",codeword:"ADAM"},{symbol:"Ą",codeword:"KĄT"},{symbol:"B",codeword:"BARBARA"},{symbol:"C",codeword:"CELINA"},{symbol:"Ć",codeword:"ĆMA"},{symbol:"D",codeword:"DOROTA"},{symbol:"E",codeword:"EDWARD"},{symbol:"Ę",codeword:"JĘK"},{symbol:"F",codeword:"FILIP"},{symbol:"G",codeword:"GUSTAW"},{symbol:"H",codeword:"HENRYK"},{symbol:"I",codeword:"IGNACY"},{symbol:"J",codeword:"JÓZEF"},{symbol:"K",codeword:"KAROL"},{symbol:"L",codeword:"LUDWIK"},{symbol:"Ł",codeword:"ŁUKASZ"},{symbol:"M",codeword:"MARIAN"},{symbol:"N",codeword:"NIKODEM"},{symbol:"Ń",codeword:"KOŃ"},{symbol:"O",codeword:"OLGA"},{symbol:"P",codeword:"PAWEŁ"},{symbol:"Q",codeword:"QUANTUM"},{symbol:"R",codeword:"ROMAN"},{symbol:"S",codeword:"STEFAN"},{symbol:"Ś",codeword:"ŚWIATOWID"},{symbol:"T",codeword:"TADEUSZ"},{symbol:"U",codeword:"URSZULA"},{symbol:"V",codeword:"VIOLETTA"},{symbol:"W",codeword:"WALENTY"},{symbol:"X",codeword:"XAWERY"},{symbol:"Y",codeword:"YPSYLON"},{symbol:"Z",codeword:"ZYGMUNT"},{symbol:"Ż",codeword:"ŻABA"},{symbol:"Ź",codeword:"ŹREBAK"}],M=[{symbol:"A",codeword:"ALFA"},{symbol:"B",codeword:"BRAVO"},{symbol:"C",codeword:"CHARLIE"},{symbol:"D",codeword:"DELTA"},{symbol:"E",codeword:"ECHO"},{symbol:"F",codeword:"FOXTROT"},{symbol:"G",codeword:"GOLF"},{symbol:"H",codeword:"HOTEL"},{symbol:"I",codeword:"INDIA"},{symbol:"J",codeword:"JULIETT"},{symbol:"K",codeword:"KILO"},{symbol:"L",codeword:"LIMA"},{symbol:"M",codeword:"MIKE"},{symbol:"N",codeword:"NOVEMBER"},{symbol:"O",codeword:"OSCAR"},{symbol:"P",codeword:"PAPA"},{symbol:"Q",codeword:"QUEBEC"},{symbol:"R",codeword:"ROMEO"},{symbol:"S",codeword:"SIERRA"},{symbol:"T",codeword:"TANGO"},{symbol:"U",codeword:"UNIFORM"},{symbol:"V",codeword:"VICTOR"},{symbol:"W",codeword:"WHISKEY"},{symbol:"X",codeword:"XRAY"},{symbol:"Y",codeword:"YANKEE"},{symbol:"Z",codeword:"ZULU"}],P={polish:D,nato:M},C={A:["ADAM","AGENDA","AKTOR","ATLAS"],Ą:["KĄT","MĄKA","PĄK","WĄŻ"],B:["BARBARA","BALON","BILET","BUTELKA"],C:["CELINA","CYTRYNA","CUKIER","CYRKIEL"],Ć:["ĆMA","ĆMIEL","ĆWICZENIE","ĆWIKŁA"],D:["DOROTA","DRZEWO","DROGA","DYWAN"],E:["EDWARD","EKRAN","ETYKA","EUROPA"],Ę:["JĘK","MIĘSO","PIĘĆ","TĘCZA"],F:["FILIP","FARBA","FOKUS","FOTEL"],G:["GUSTAW","GAZETA","GITARA","GŁOS"],H:["HENRYK","HERBATA","HISTORIA","HOTEL"],I:["IGNACY","IGLICA","IGŁA","ILUZJA"],J:["JÓZEF","JABŁKO","JĘZYK","JUTRO"],K:["KAROL","KAJAK","KLASA","KOTLET"],L:["LUDWIK","LAMPA","LASER","LISTEK"],Ł:["ŁUKASZ","ŁAŃCUCH","ŁODYGA","ŁOPATA"],M:["MARIAN","MAPA","MŁOTEK","MONETA"],N:["NIKODEM","NARTY","NOGA","NUTA"],Ń:["KOŃ","DZWOŃ","JAŹŃ","SŁOŃ"],O:["OLGA","OBIAD","OGRÓD","OKNO"],P:["PAWEŁ","PAPIER","PODUSZKA","POMIDOR"],Q:["QUANTUM","QUAD","QUASAR","QUOTA"],R:["ROMAN","RABAT","RADIO","ROWER"],S:["STEFAN","SAMOLOT","SERWETKA","SYRENA"],Ś:["ŚWIATOWID","ŚLAD","ŚNIEG","ŚWIT"],T:["TADEUSZ","TELEFON","TORBA","TRASA"],U:["URSZULA","UBRANIE","UKŁAD","ULICA"],V:["VIOLETTA","VECTRA","VENTYL","VIDEO"],W:["WALENTY","WALIZKA","WARSZTAT","WIDOK"],X:["XAWERY","XENON","XEROX","XYLOFON"],Y:["YPSYLON","YACHT","YETI","YUPPIE"],Z:["ZYGMUNT","ZAMEK","ZEGAR","ZUPA"],Ż:["ŻABA","ŻAGIEL","ŻOŁNIERZ","ŻURAW"],Ź:["ŹREBAK","ŹDŹBŁO","ŹRENICA","ŹRÓDŁO"]},H={A:["ALFA","AMBER","ARROW","ATLAS"],B:["BRAVO","BAKER","BASIC","BLOOM"],C:["CHARLIE","CABLE","CANYON","CIRCLE"],D:["DELTA","DESERT","DINNER","DRAGON"],E:["ECHO","EAGLE","EMBER","ENGINE"],F:["FOXTROT","FALCON","FOREST","FUTURE"],G:["GOLF","GADGET","GALAXY","GARDEN"],H:["HOTEL","HAMMER","HARBOR","HORIZON"],I:["INDIA","ICEBERG","ICON","IMPULSE"],J:["JULIETT","JACKET","JASPER","JUNGLE"],K:["KILO","KAYAK","KINGDOM","KITTEN"],L:["LIMA","LANTERN","LASER","LEGEND"],M:["MIKE","MARKET","METEOR","MODULE"],N:["NOVEMBER","NATURE","NEBULA","NICKEL"],O:["OSCAR","OMEGA","ORANGE","ORBIT"],P:["PAPA","PANTHER","PLANET","POCKET"],Q:["QUEBEC","QUARTZ","QUICKSAND","QUILL"],R:["ROMEO","RANGER","RIVER","ROCKET"],S:["SIERRA","SHADOW","SIGNAL","SUNSET"],T:["TANGO","TARGET","TEMPLE","THUNDER"],U:["UNIFORM","UMBRA","UPLINK","URBAN"],V:["VICTOR","VAPOR","VECTOR","VIOLET"],W:["WHISKEY","WARDEN","WILLOW","WINDOW"],X:["XRAY","XENON","XYLEM","XYSTUS"],Y:["YANKEE","YELLOW","YOGURT","YONDER"],Z:["ZULU","ZENITH","ZEPHYR","ZODIAC"]},k={polish:C,nato:H},x=P,B=k;function W(e){return x[e]}function R(e,o){return B[e][o]}function h(e){const o=[...e];for(let t=o.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[o[t],o[r]]=[o[r],o[t]]}return o}function T(e){return e.trim().toUpperCase()}function Y(e,o){return T(e)===T(o)}function G(e,o){if(e===0)return 0;const t=e-o;return Math.round(t/e*100)}function Z(e){const{screen:o}=u();o==="setup"&&d({lang:e})}function F(e){d({alphabetKey:e})}function z(e){d({mode:e})}function L(){const{alphabetKey:e,mode:o}=u(),t=W(e),r=h(t),s=o==="suggestion"?h(R(e,r[0].symbol)):[];d({screen:"exercise",queue:r,currentIndex:0,hintedCount:0,hintShown:!1,shuffledOptions:s,wrongInput:null})}function I(){d({screen:"setup",wrongInput:null,hintShown:!1})}function J(){L()}function q(){d({hintShown:!0,hintedCount:u().hintedCount+1})}function S(e,o,t,r,s){if(o>=r.length){const n=G(r.length,t);d({screen:"result",finalScore:n,totalQuestions:r.length,hintedQuestions:t,wrongInput:null})}else{const n=s==="suggestion"?h(R(e,r[o].symbol)):[];d({currentIndex:o,hintShown:!1,shuffledOptions:n,wrongInput:null})}}function Q(e){const{queue:o,currentIndex:t,hintedCount:r,alphabetKey:s,mode:n}=u(),l=o[t];Y(e,l.codeword)?S(s,t+1,r,o,n):d({wrongInput:e})}function V(e){const{queue:o,currentIndex:t,hintedCount:r,alphabetKey:s,mode:n}=u(),l=o[t];e===l.codeword?S(s,t+1,r,o,n):(d({wrongInput:e}),setTimeout(()=>d({wrongInput:null}),400))}function X(e,o){const{lang:t,alphabetKey:r,mode:s}=o;e.innerHTML=`
    <main class="page page-centered" id="setup-page" role="main">
      <div class="card">
        <div class="text-center mb-3">
          <div class="setup-logo" aria-hidden="true">🔤</div>
          <h1 class="setup-logo">${a(t,"appTitle")}</h1>
          <p class="setup-subtitle">${a(t,"appSubtitle")}</p>
        </div>

        <div class="form-group">
          <label class="form-label" id="lang-label">${a(t,"labelLanguage")}</label>
          <div class="segment-group" role="group" aria-labelledby="lang-label">
            <button
              id="lang-en-btn"
              class="segment-btn ${t==="en"?"active":""}"
              aria-pressed="${t==="en"}"
              data-lang="en"
            >${a(t,"langEn")}</button>
            <button
              id="lang-pl-btn"
              class="segment-btn ${t==="pl"?"active":""}"
              aria-pressed="${t==="pl"}"
              data-lang="pl"
            >${a(t,"langPl")}</button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" id="alphabet-label">${a(t,"labelAlphabet")}</label>
          <div class="segment-group" role="group" aria-labelledby="alphabet-label">
            <button
              id="alphabet-polish-btn"
              class="segment-btn ${r==="polish"?"active":""}"
              aria-pressed="${r==="polish"}"
              data-alphabet="polish"
            >${a(t,"alphabetPolish")}</button>
            <button
              id="alphabet-nato-btn"
              class="segment-btn ${r==="nato"?"active":""}"
              aria-pressed="${r==="nato"}"
              data-alphabet="nato"
            >${a(t,"alphabetNato")}</button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" id="mode-label">${a(t,"labelMode")}</label>
          <div class="segment-group" role="group" aria-labelledby="mode-label">
            <button
              id="mode-keyboard-btn"
              class="segment-btn ${s==="keyboard"?"active":""}"
              aria-pressed="${s==="keyboard"}"
              data-mode="keyboard"
            >${a(t,"modeKeyboard")}</button>
            <button
              id="mode-suggestion-btn"
              class="segment-btn ${s==="suggestion"?"active":""}"
              aria-pressed="${s==="suggestion"}"
              data-mode="suggestion"
            >${a(t,"modeSuggestion")}</button>
          </div>
          <p class="text-muted mt-1" style="font-size:0.82rem;" id="mode-desc">
            ${s==="keyboard"?a(t,"modeKeyboardDesc"):a(t,"modeSuggestionDesc")}
          </p>
        </div>

        <button id="start-btn" class="btn btn-primary btn-large btn-full mt-2">
          ${a(t,"btnStart")}
        </button>
      </div>
    </main>
  `,e.querySelectorAll("[data-lang]").forEach(n=>{n.addEventListener("click",()=>Z(n.dataset.lang))}),e.querySelectorAll("[data-alphabet]").forEach(n=>{n.addEventListener("click",()=>F(n.dataset.alphabet))}),e.querySelectorAll("[data-mode]").forEach(n=>{n.addEventListener("click",()=>z(n.dataset.mode))}),e.querySelector("#start-btn").addEventListener("click",L)}function j(e,o){const{lang:t,alphabetKey:r,mode:s,queue:n,currentIndex:l,hintShown:i,shuffledOptions:m,wrongInput:E}=o,c=n[l],b=n.length,f=l,O=Math.round(f/b*100),v=a(t,r==="polish"?"alphabetPolish":"alphabetNato"),K=a(t,s==="keyboard"?"modeKeyboard":"modeSuggestion");e.innerHTML=`
    <main class="page" id="exercise-page" role="main">

      <!-- Top header bar -->
      <div class="exercise-header">
        <div>
          <div class="exercise-meta">${v} · ${K}</div>
        </div>
        <div class="flex items-center gap-2">
          <span class="exercise-progress-label">
            ${a(t,"questionOf",l+1,b)}
          </span>
          <button id="home-btn" class="btn btn-secondary" style="padding:0.5rem 0.85rem;font-size:0.82rem;">
            ${a(t,"btnHome")}
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-wrap mb-3" style="max-width:520px;width:100%;" role="progressbar"
           aria-valuenow="${O}" aria-valuemin="0" aria-valuemax="100"
           aria-label="Progress: ${f} of ${b} completed">
        <div class="progress-bar" style="width:${O}%"></div>
      </div>

      <!-- Main question card -->
      <div class="card exercise-card">

        <!-- Symbol display -->
        <div class="symbol-display" aria-label="Symbol: ${c.symbol}" role="img">
          ${c.symbol}
        </div>

        <!-- Hint box (shown when hint was triggered) -->
        ${i?`
          <div class="hint-box mb-2" id="hint-box" aria-live="polite" role="status">
            <span aria-hidden="true">💡</span>
            <span>${a(t,"hintLabel")} <strong>${c.codeword}</strong></span>
          </div>
        `:""}

        <!-- Mode-specific input -->
        ${s==="keyboard"?_(t,E):te(m,c.codeword,E)}

        <!-- Hint button -->
        ${i?"":`
          <button id="hint-btn" class="btn btn-hint btn-full mt-2">
            ${a(t,"btnHint")}
          </button>
        `}

      </div>
    </main>
  `,e.querySelector("#home-btn").addEventListener("click",I),s==="keyboard"?ee(e):oe(e,c.codeword),i||e.querySelector("#hint-btn").addEventListener("click",q)}function _(e,o){return`
    <div class="flex flex-col gap-1">
      <input
        id="answer-input"
        type="text"
        class="input-field ${o!==null?"wrong":""}"
        placeholder="${a(e,"inputPlaceholder")}"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        aria-label="${a(e,"inputPlaceholder")}"
      />
      ${o!==null?`
        <div class="feedback feedback-wrong" role="alert" aria-live="polite">
          <span aria-hidden="true">✗</span> ${a(e,"feedbackWrong")}
        </div>
      `:'<div class="feedback"></div>'}
      <button id="submit-btn" class="btn btn-primary btn-full mt-1">
        ${a(e,"btnSubmit")}
      </button>
    </div>
  `}function ee(e,o){const t=e.querySelector("#answer-input"),r=e.querySelector("#submit-btn");if(t){t.focus();const n=t.value.length;t.setSelectionRange(n,n)}const s=()=>{const n=t?t.value:"";Q(n)};r==null||r.addEventListener("click",s),t==null||t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),s())})}function te(e,o,t,r){return`
    <div class="suggestion-grid" role="group" aria-label="Answer options">
      ${e.map((s,n)=>`
        <button
          id="suggestion-btn-${n}"
          class="suggestion-btn ${t===s?"wrong":""}"
          data-codeword="${s}"
          aria-label="${s}"
        >${s}</button>
      `).join("")}
    </div>
  `}function oe(e,o){e.querySelectorAll(".suggestion-btn").forEach(t=>{t.addEventListener("click",()=>{V(t.dataset.codeword)})})}function ne(e,o){const{lang:t,alphabetKey:r,mode:s,finalScore:n,totalQuestions:l,hintedQuestions:i}=o,m=l-i,E=a(t,r==="polish"?"alphabetPolish":"alphabetNato"),c=a(t,s==="keyboard"?"modeKeyboard":"modeSuggestion");let b="text-error";n>=80?b="text-success":n>=50&&(b="text-accent"),e.innerHTML=`
    <main class="page page-centered" id="result-page" role="main">
      <div class="card" style="max-width:420px;">
        <div class="text-center mb-3">
          <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">${a(t,"resultTitle")}</h1>
        </div>

        <!-- Score ring -->
        <div class="score-ring mb-3">
          <span class="score-pct ${b}" aria-label="${a(t,"resultScore")}: ${n}%">
            ${n}%
          </span>
        </div>

        <!-- Run context -->
        <div class="mb-3" style="background:var(--color-surface-2);border-radius:var(--radius-md);padding:1rem;">
          <div class="flex justify-between mb-1">
            <span class="text-muted">${a(t,"resultAlphabet")}</span>
            <strong>${E}</strong>
          </div>
          <div class="flex justify-between mb-1">
            <span class="text-muted">${a(t,"resultMode")}</span>
            <strong>${c}</strong>
          </div>
          <div class="flex justify-between mb-1">
            <span class="text-muted">${a(t,"resultClean",m)}</span>
            <strong>${m} / ${l}</strong>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">${a(t,"resultHinted",i)}</span>
            <strong>${i}</strong>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-1">
          <button id="restart-btn" class="btn btn-primary btn-large btn-full">
            ${a(t,"btnRestart")}
          </button>
          <button id="home-btn" class="btn btn-secondary btn-large btn-full">
            ${a(t,"btnHome")}
          </button>
        </div>
      </div>
    </main>
  `,e.querySelector("#restart-btn").addEventListener("click",J),e.querySelector("#home-btn").addEventListener("click",I)}const A={benchmarkAuthor:"Piotr Kacała",benchmarkUrl:"piotrkacala.pl",modelName:"Claude Sonnet 4.5 (claude-sonnet-4-5)",implementationDate:"2026-06-13"},p=document.getElementById("app");function se(){return`
    <footer id="attribution-footer">
      Phonetic Benchmark by
      <a href="https://${A.benchmarkUrl}" target="_blank" rel="noopener">
        ${A.benchmarkAuthor}
      </a>
      (${A.benchmarkUrl}).
      Developed by ${A.modelName} on ${A.implementationDate}.
    </footer>
  `}function N(e){const o=document.createElement("div");switch(o.id="screen-root",o.style.flex="1",o.style.display="flex",o.style.flexDirection="column",e.screen){case"setup":X(o,e);break;case"exercise":j(o,e);break;case"result":ne(o,e);break}const t=p.querySelector("#screen-root");t?p.replaceChild(o,t):p.appendChild(o),p.querySelector("#attribution-footer")||p.insertAdjacentHTML("beforeend",se())}U(N);N(u());
