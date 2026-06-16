(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function l(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=l(o);fetch(o.href,r)}})();const N={en:{"app.title":"Phonetic Trainer","app.subtitle":"Master phonetic alphabets through practice","setup.language":"Interface Language","setup.alphabet":"Phonetic Alphabet","setup.mode":"Exercise Mode","setup.start":"Start Training","setup.lang.en":"English","setup.lang.pl":"Polski","setup.alphabet.polish":"Polish","setup.alphabet.nato":"NATO","setup.mode.keyboard":"Keyboard","setup.mode.suggestion":"Multiple Choice","setup.mode.keyboard.desc":"Type the codeword for each symbol","setup.mode.suggestion.desc":"Choose the correct codeword from four options","exercise.progress":"Progress","exercise.symbol.label":"What is the codeword for:","exercise.input.placeholder":"Type codeword...","exercise.submit":"Submit","exercise.hint":"Show Hint","exercise.hint.label":"Answer:","exercise.quit":"Quit","exercise.quit.confirm":"Are you sure you want to quit? Your progress will be lost.","exercise.wrong":"Incorrect, try again","exercise.correct":"Correct!","result.title":"Training Complete!","result.score":"Your Score","result.alphabet":"Alphabet","result.mode":"Mode","result.total":"Total Questions","result.hinted":"Hints Used","result.clean":"Answered Without Hints","result.restart":"Train Again","result.setup":"Back to Setup","result.mode.keyboard":"Keyboard","result.mode.suggestion":"Multiple Choice","result.alphabet.polish":"Polish","result.alphabet.nato":"NATO","footer.attribution":"Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by Claude Opus 4.6 on 2026-06-12."},pl:{"app.title":"Trener Fonetyczny","app.subtitle":"Opanuj alfabet fonetyczny poprzez ćwiczenia","setup.language":"Język interfejsu","setup.alphabet":"Alfabet fonetyczny","setup.mode":"Tryb ćwiczeń","setup.start":"Rozpocznij trening","setup.lang.en":"English","setup.lang.pl":"Polski","setup.alphabet.polish":"Polski","setup.alphabet.nato":"NATO","setup.mode.keyboard":"Klawiatura","setup.mode.suggestion":"Wybór z listy","setup.mode.keyboard.desc":"Wpisz hasło dla każdego symbolu","setup.mode.suggestion.desc":"Wybierz poprawne hasło spośród czterech opcji","exercise.progress":"Postęp","exercise.symbol.label":"Jakie jest hasło dla:","exercise.input.placeholder":"Wpisz hasło...","exercise.submit":"Sprawdź","exercise.hint":"Pokaż podpowiedź","exercise.hint.label":"Odpowiedź:","exercise.quit":"Zakończ","exercise.quit.confirm":"Czy na pewno chcesz zakończyć? Twój postęp zostanie utracony.","exercise.wrong":"Niepoprawnie, spróbuj ponownie","exercise.correct":"Poprawnie!","result.title":"Trening zakończony!","result.score":"Twój wynik","result.alphabet":"Alfabet","result.mode":"Tryb","result.total":"Łączna liczba pytań","result.hinted":"Użyte podpowiedzi","result.clean":"Odpowiedzi bez podpowiedzi","result.restart":"Trenuj ponownie","result.setup":"Powrót do ustawień","result.mode.keyboard":"Klawiatura","result.mode.suggestion":"Wybór z listy","result.alphabet.polish":"Polski","result.alphabet.nato":"NATO","footer.attribution":"Phonetic Benchmark — Piotr Kacała (piotrkacala.pl). Opracowane przez Claude Opus 4.6, 2026-06-12."}};let R="en";function K(e){N[e]&&(R=e)}function $(){return R}function s(e){const t=N[R];return(t==null?void 0:t[e])??e}const U=[{symbol:"A",codeword:"ADAM"},{symbol:"Ą",codeword:"KĄT"},{symbol:"B",codeword:"BARBARA"},{symbol:"C",codeword:"CELINA"},{symbol:"Ć",codeword:"ĆMA"},{symbol:"D",codeword:"DOROTA"},{symbol:"E",codeword:"EDWARD"},{symbol:"Ę",codeword:"JĘK"},{symbol:"F",codeword:"FILIP"},{symbol:"G",codeword:"GUSTAW"},{symbol:"H",codeword:"HENRYK"},{symbol:"I",codeword:"IGNACY"},{symbol:"J",codeword:"JÓZEF"},{symbol:"K",codeword:"KAROL"},{symbol:"L",codeword:"LUDWIK"},{symbol:"Ł",codeword:"ŁUKASZ"},{symbol:"M",codeword:"MARIAN"},{symbol:"N",codeword:"NIKODEM"},{symbol:"Ń",codeword:"KOŃ"},{symbol:"O",codeword:"OLGA"},{symbol:"P",codeword:"PAWEŁ"},{symbol:"Q",codeword:"QUANTUM"},{symbol:"R",codeword:"ROMAN"},{symbol:"S",codeword:"STEFAN"},{symbol:"Ś",codeword:"ŚWIATOWID"},{symbol:"T",codeword:"TADEUSZ"},{symbol:"U",codeword:"URSZULA"},{symbol:"V",codeword:"VIOLETTA"},{symbol:"W",codeword:"WALENTY"},{symbol:"X",codeword:"XAWERY"},{symbol:"Y",codeword:"YPSYLON"},{symbol:"Z",codeword:"ZYGMUNT"},{symbol:"Ż",codeword:"ŻABA"},{symbol:"Ź",codeword:"ŹREBAK"}],D=[{symbol:"A",codeword:"ALFA"},{symbol:"B",codeword:"BRAVO"},{symbol:"C",codeword:"CHARLIE"},{symbol:"D",codeword:"DELTA"},{symbol:"E",codeword:"ECHO"},{symbol:"F",codeword:"FOXTROT"},{symbol:"G",codeword:"GOLF"},{symbol:"H",codeword:"HOTEL"},{symbol:"I",codeword:"INDIA"},{symbol:"J",codeword:"JULIETT"},{symbol:"K",codeword:"KILO"},{symbol:"L",codeword:"LIMA"},{symbol:"M",codeword:"MIKE"},{symbol:"N",codeword:"NOVEMBER"},{symbol:"O",codeword:"OSCAR"},{symbol:"P",codeword:"PAPA"},{symbol:"Q",codeword:"QUEBEC"},{symbol:"R",codeword:"ROMEO"},{symbol:"S",codeword:"SIERRA"},{symbol:"T",codeword:"TANGO"},{symbol:"U",codeword:"UNIFORM"},{symbol:"V",codeword:"VICTOR"},{symbol:"W",codeword:"WHISKEY"},{symbol:"X",codeword:"XRAY"},{symbol:"Y",codeword:"YANKEE"},{symbol:"Z",codeword:"ZULU"}],P={polish:U,nato:D};function S(e){const t=[...e];for(let l=t.length-1;l>0;l--){const n=Math.floor(Math.random()*(l+1));[t[l],t[n]]=[t[n],t[l]]}return t}function x(e,t){if(!e||!t)return!1;const l=e.trim().toLowerCase(),n=t.trim().toLowerCase();return l.length===0?!1:l===n}function G(e,t){if(e===0)return 100;const l=e-t;return Math.round(l/e*100)}function M(e,t){const l=P[e];if(!l)throw new Error(`Unknown alphabet: ${e}`);const n=S(l),o=new Set;let r=0,d=!1;return{getAlphabetKey(){return e},getMode(){return t},getCurrentSymbol(){return n[r]},answer(i){const m=n[r],c=x(i,m.codeword);return c&&(r++,d=!1),c},useHint(){o.add(r),d=!0},isHintShown(){return d},isComplete(){return r>=n.length},getScore(){return G(n.length,o.size)},getProgress(){return{current:Math.min(r+1,n.length),total:n.length}},getHintedCount(){return o.size},getTotalCount(){return n.length},getAllSymbols(){return n.map(i=>i.symbol)}}}function k(e,{onStart:t,isRunActive:l=!1}){let n="nato",o="keyboard";function r(){const d=$();e.innerHTML=`
      <div class="app-container">
        <div class="card">
          <h1 class="title">${s("app.title")}</h1>
          <p class="subtitle">${s("app.subtitle")}</p>

          <div class="form-group">
            <div class="section-label">${s("setup.language")}</div>
            <div class="option-grid ${l?"lang-locked":""}" id="lang-options">
              <button class="option-btn ${d==="en"?"selected":""}"
                      data-lang="en" id="btn-lang-en" ${l?"disabled":""}>
                ${s("setup.lang.en")}
              </button>
              <button class="option-btn ${d==="pl"?"selected":""}"
                      data-lang="pl" id="btn-lang-pl" ${l?"disabled":""}>
                ${s("setup.lang.pl")}
              </button>
            </div>
          </div>

          <div class="form-group">
            <div class="section-label">${s("setup.alphabet")}</div>
            <div class="option-grid">
              <button class="option-btn ${n==="nato"?"selected":""}"
                      data-alphabet="nato" id="btn-alphabet-nato">
                ${s("setup.alphabet.nato")}
              </button>
              <button class="option-btn ${n==="polish"?"selected":""}"
                      data-alphabet="polish" id="btn-alphabet-polish">
                ${s("setup.alphabet.polish")}
              </button>
            </div>
          </div>

          <div class="form-group">
            <div class="section-label">${s("setup.mode")}</div>
            <div class="option-grid">
              <button class="option-btn ${o==="keyboard"?"selected":""}"
                      data-mode="keyboard" id="btn-mode-keyboard">
                ${s("setup.mode.keyboard")}
                <span class="option-desc">${s("setup.mode.keyboard.desc")}</span>
              </button>
              <button class="option-btn ${o==="suggestion"?"selected":""}"
                      data-mode="suggestion" id="btn-mode-suggestion">
                ${s("setup.mode.suggestion")}
                <span class="option-desc">${s("setup.mode.suggestion.desc")}</span>
              </button>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-start">${s("setup.start")}</button>
        </div>
      </div>
    `,e.querySelectorAll("[data-lang]").forEach(i=>{i.addEventListener("click",()=>{l||(K(i.dataset.lang),r())})}),e.querySelectorAll("[data-alphabet]").forEach(i=>{i.addEventListener("click",()=>{n=i.dataset.alphabet,r()})}),e.querySelectorAll("[data-mode]").forEach(i=>{i.addEventListener("click",()=>{o=i.dataset.mode,r()})}),e.querySelector("#btn-start").addEventListener("click",()=>{t({alphabetKey:n,mode:o})})}r()}const W={A:["ADAM","AGENDA","AKTOR","ATLAS"],Ą:["KĄT","MĄKA","PĄK","WĄŻ"],B:["BARBARA","BALON","BILET","BUTELKA"],C:["CELINA","CYTRYNA","CUKIER","CYRKIEL"],Ć:["ĆMA","ĆMIEL","ĆWICZENIE","ĆWIKŁA"],D:["DOROTA","DRZEWO","DROGA","DYWAN"],E:["EDWARD","EKRAN","ETYKA","EUROPA"],Ę:["JĘK","MIĘSO","PIĘĆ","TĘCZA"],F:["FILIP","FARBA","FOKUS","FOTEL"],G:["GUSTAW","GAZETA","GITARA","GŁOS"],H:["HENRYK","HERBATA","HISTORIA","HOTEL"],I:["IGNACY","IGLICA","IGŁA","ILUZJA"],J:["JÓZEF","JABŁKO","JĘZYK","JUTRO"],K:["KAROL","KAJAK","KLASA","KOTLET"],L:["LUDWIK","LAMPA","LASER","LISTEK"],Ł:["ŁUKASZ","ŁAŃCUCH","ŁODYGA","ŁOPATA"],M:["MARIAN","MAPA","MŁOTEK","MONETA"],N:["NIKODEM","NARTY","NOGA","NUTA"],Ń:["KOŃ","DZWOŃ","JAŹŃ","SŁOŃ"],O:["OLGA","OBIAD","OGRÓD","OKNO"],P:["PAWEŁ","PAPIER","PODUSZKA","POMIDOR"],Q:["QUANTUM","QUAD","QUASAR","QUOTA"],R:["ROMAN","RABAT","RADIO","ROWER"],S:["STEFAN","SAMOLOT","SERWETKA","SYRENA"],Ś:["ŚWIATOWID","ŚLAD","ŚNIEG","ŚWIT"],T:["TADEUSZ","TELEFON","TORBA","TRASA"],U:["URSZULA","UBRANIE","UKŁAD","ULICA"],V:["VIOLETTA","VECTRA","VENTYL","VIDEO"],W:["WALENTY","WALIZKA","WARSZTAT","WIDOK"],X:["XAWERY","XENON","XEROX","XYLOFON"],Y:["YPSYLON","YACHT","YETI","YUPPIE"],Z:["ZYGMUNT","ZAMEK","ZEGAR","ZUPA"],Ż:["ŻABA","ŻAGIEL","ŻOŁNIERZ","ŻURAW"],Ź:["ŹREBAK","ŹDŹBŁO","ŹRENICA","ŹRÓDŁO"]},Y={A:["ALFA","AMBER","ARROW","ATLAS"],B:["BRAVO","BAKER","BASIC","BLOOM"],C:["CHARLIE","CABLE","CANYON","CIRCLE"],D:["DELTA","DESERT","DINNER","DRAGON"],E:["ECHO","EAGLE","EMBER","ENGINE"],F:["FOXTROT","FALCON","FOREST","FUTURE"],G:["GOLF","GADGET","GALAXY","GARDEN"],H:["HOTEL","HAMMER","HARBOR","HORIZON"],I:["INDIA","ICEBERG","ICON","IMPULSE"],J:["JULIETT","JACKET","JASPER","JUNGLE"],K:["KILO","KAYAK","KINGDOM","KITTEN"],L:["LIMA","LANTERN","LASER","LEGEND"],M:["MIKE","MARKET","METEOR","MODULE"],N:["NOVEMBER","NATURE","NEBULA","NICKEL"],O:["OSCAR","OMEGA","ORANGE","ORBIT"],P:["PAPA","PANTHER","PLANET","POCKET"],Q:["QUEBEC","QUARTZ","QUICKSAND","QUILL"],R:["ROMEO","RANGER","RIVER","ROCKET"],S:["SIERRA","SHADOW","SIGNAL","SUNSET"],T:["TANGO","TARGET","TEMPLE","THUNDER"],U:["UNIFORM","UMBRA","UPLINK","URBAN"],V:["VICTOR","VAPOR","VECTOR","VIOLET"],W:["WHISKEY","WARDEN","WILLOW","WINDOW"],X:["XRAY","XENON","XYLEM","XYSTUS"],Y:["YANKEE","YELLOW","YOGURT","YONDER"],Z:["ZULU","ZENITH","ZEPHYR","ZODIAC"]},B={polish:W,nato:Y};function H(e,t){const l=B[e];if(!l||!l[t])throw new Error(`No options found for ${e}/${t}`);return S(l[t])}function z(e,{game:t,onComplete:l,onQuit:n}){let o=null,r=null,d=null,i=-1;function m(){const p=t.getProgress();if(t.getMode()==="suggestion"&&!t.isComplete()){const a=p.current;if(a!==i){const u=t.getCurrentSymbol();d=H(t.getAlphabetKey(),u.symbol),i=a}}}function c(){if(t.isComplete()){l();return}m();const p=t.getCurrentSymbol(),a=t.getProgress(),u=(a.current-1)/a.total*100,y=t.getMode(),b=t.isHintShown();let A="";y==="keyboard"?A=`
        <div class="answer-section">
          ${b?`
            <div class="hint-display">
              <div class="hint-label">${s("exercise.hint.label")}</div>
              <div class="hint-value">${p.codeword}</div>
            </div>
          `:""}
          <form id="keyboard-form" class="keyboard-input-row">
            <input type="text" class="text-input" id="answer-input"
                   placeholder="${s("exercise.input.placeholder")}"
                   autocomplete="off" autocapitalize="off" spellcheck="false" />
            <button type="submit" class="btn btn-primary" id="btn-submit"
                    style="width: auto; padding: var(--space-md) var(--space-lg);">${s("exercise.submit")}</button>
          </form>
        </div>
      `:A=`
        <div class="answer-section">
          ${b?`
            <div class="hint-display">
              <div class="hint-label">${s("exercise.hint.label")}</div>
              <div class="hint-value">${p.codeword}</div>
            </div>
          `:""}
          <div class="suggestion-grid">
            ${d.map((v,g)=>`
              <button class="suggestion-btn ${r===`sug-${g}`?"wrong":""}"
                      data-option="${Z(v)}" id="sug-${g}">${I(v)}</button>
            `).join("")}
          </div>
        </div>
      `,e.innerHTML=`
      <div class="app-container">
        <div class="card">
          <div class="exercise-header">
            <span class="progress-text">${s("exercise.progress")}: ${a.current} / ${a.total}</span>
            <button class="btn btn-ghost" id="btn-quit">${s("exercise.quit")}</button>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${u}%"></div>
          </div>

          <div class="symbol-display">
            <div class="symbol-prompt">${s("exercise.symbol.label")}</div>
            <div class="symbol-character">${I(p.symbol)}</div>
          </div>

          ${A}

          ${o?`
            <div class="feedback feedback-${o.type}">
              ${o.text}
            </div>
          `:""}

          <div class="actions-row">
            ${b?"":`<button class="btn btn-hint" id="btn-hint">${s("exercise.hint")}</button>`}
          </div>
        </div>
      </div>
    `,h(p,y)}function h(p,a){const u=e.querySelector("#btn-quit");u&&u.addEventListener("click",()=>{confirm(s("exercise.quit.confirm"))&&n()});const y=e.querySelector("#btn-hint");if(y&&y.addEventListener("click",()=>{t.useHint(),o=null,r=null,c()}),a==="keyboard"){const b=e.querySelector("#keyboard-form"),A=e.querySelector("#answer-input");A&&A.focus(),b&&b.addEventListener("submit",v=>{v.preventDefault();const g=A.value;t.answer(g)?(o={type:"correct",text:s("exercise.correct")},r=null,O("correct"),setTimeout(()=>{o=null,c()},500)):(o={type:"wrong",text:s("exercise.wrong")},c())})}else e.querySelectorAll(".suggestion-btn").forEach(b=>{b.addEventListener("click",()=>{const A=b.dataset.option;t.answer(A)?(o=null,r=null,setTimeout(()=>{c()},300)):(o={type:"wrong",text:s("exercise.wrong")},r=b.id,c())})})}function O(p){const a=e.querySelector(".feedback");a&&a.remove();const u=document.createElement("div");u.className=`feedback feedback-${p}`,u.textContent=s("exercise.correct");const y=e.querySelector(".answer-section");y&&y.after(u)}c()}function I(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Z(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function F(e,{game:t,onRestart:l,onSetup:n}){const o=t.getScore(),r=t.getTotalCount(),d=t.getHintedCount(),i=r-d,m=t.getAlphabetKey(),c=t.getMode(),h=78,O=2*Math.PI*h,p=O-o/100*O;e.innerHTML=`
    <div class="app-container">
      <div class="card result-container">
        <h1 class="title">${s("result.title")}</h1>

        <div class="result-score-ring">
          <svg viewBox="0 0 180 180">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#818cf8" />
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="90" cy="90" r="${h}" />
            <circle class="ring-fill" cx="90" cy="90" r="${h}"
                    stroke-dasharray="${O}"
                    stroke-dashoffset="${O}"
                    id="score-ring" />
          </svg>
          <div class="result-score-value" id="score-display">0%</div>
        </div>

        <div class="result-details">
          <div class="result-detail-item">
            <div class="result-detail-label">${s("result.alphabet")}</div>
            <div class="result-detail-value">${s(`result.alphabet.${m}`)}</div>
          </div>
          <div class="result-detail-item">
            <div class="result-detail-label">${s("result.mode")}</div>
            <div class="result-detail-value">${s(`result.mode.${c}`)}</div>
          </div>
          <div class="result-detail-item">
            <div class="result-detail-label">${s("result.total")}</div>
            <div class="result-detail-value">${r}</div>
          </div>
          <div class="result-detail-item">
            <div class="result-detail-label">${s("result.hinted")}</div>
            <div class="result-detail-value">${d}</div>
          </div>
          <div class="result-detail-item">
            <div class="result-detail-label">${s("result.clean")}</div>
            <div class="result-detail-value">${i}</div>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn btn-primary" id="btn-restart">${s("result.restart")}</button>
          <button class="btn btn-secondary" id="btn-setup">${s("result.setup")}</button>
        </div>
      </div>
    </div>
  `,requestAnimationFrame(()=>{const a=e.querySelector("#score-ring"),u=e.querySelector("#score-display");a&&setTimeout(()=>{a.style.strokeDashoffset=p},100),u&&q(u,0,o,1e3)}),e.querySelector("#btn-restart").addEventListener("click",()=>{l()}),e.querySelector("#btn-setup").addEventListener("click",()=>{n()})}function q(e,t,l,n){const o=performance.now();function r(d){const i=d-o,m=Math.min(i/n,1),c=1-Math.pow(1-m,3),h=Math.round(t+(l-t)*c);e.textContent=`${h}%`,m<1&&requestAnimationFrame(r)}requestAnimationFrame(r)}const E=document.querySelector("#app");let f=null,T=null;function L(){const e=document.createElement("footer");return e.className="footer",e.id="app-footer",e.textContent=s("footer.attribution"),e}function w(){f=null;const e=document.createElement("div");e.style.flex="1",E.innerHTML="",E.appendChild(e),E.appendChild(L()),k(e,{onStart:({alphabetKey:t,mode:l})=>{T={alphabetKey:t,mode:l},f=M(t,l),C()},isRunActive:!1})}function C(){const e=document.createElement("div");e.style.flex="1",E.innerHTML="",E.appendChild(e),E.appendChild(L()),z(e,{game:f,onComplete:()=>{J()},onQuit:()=>{f=null,w()}})}function J(){const e=document.createElement("div");e.style.flex="1",E.innerHTML="",E.appendChild(e),E.appendChild(L()),F(e,{game:f,onRestart:()=>{T?(f=M(T.alphabetKey,T.mode),C()):w()},onSetup:()=>{f=null,w()}})}w();
