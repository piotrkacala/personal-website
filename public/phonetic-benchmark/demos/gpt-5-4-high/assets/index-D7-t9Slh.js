(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&a(t)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const m={en:{submissionTag:"v1 benchmark submission",appTitle:"Phonetic benchmark trainer",appIntro:"Practice one full phonetic alphabet run with either keyboard answers or fixed four-option suggestions.",setupTitle:"Set up your run",languageLabel:"Interface language",languageHint:"Language can be changed before starting a run. Active runs must be restarted to switch language or mode.",alphabetLabel:"Phonetic alphabet",modeLabel:"Exercise mode",startRun:"Start run",progress:(e,o)=>`Question ${e} of ${o}`,questionCount:(e,o)=>`${e}/${o} completed`,questionMode:"Answer mode",hintButton:"Show hint",hintPenalty:"Using a hint makes this question non-clean for the final score.",hintPrefix:"Hint",submitAnswer:"Submit answer",keyboardPlaceholder:"Type the matching codeword",wrongKeyboard:"That codeword is not correct yet.",wrongSuggestion:"That option is incorrect. Try again.",leaveRun:"Leave run",leaveRunConfirm:"Leave this run and discard current progress?",resultTitle:"Run complete",resultSummary:e=>`Final score: ${e}%`,resultContext:"You completed the full run. Hinted questions count against the score; wrong attempts alone do not.",hintsUsedLabel:"Hints used",restartSame:"Play again with the same setup",backToSetup:"Back to setup",modeExplanation:"You must finish the current run before switching answer modes.",attribution:(e,o)=>`Phonetic Benchmark by Piotr Kacała (piotrkacala.pl). Developed by ${e} on ${o}.`,languageNames:{en:"English",pl:"Polish"},alphabetNames:{polish:"Polish phonetic alphabet",nato:"NATO phonetic alphabet"},modeNames:{keyboard:"Keyboard",suggestion:"Suggestions"}},pl:{submissionTag:"implementacja benchmarku v1",appTitle:"Trenażer benchmarku fonetycznego",appIntro:"Przećwicz pełny przebieg alfabetu fonetycznego, używając odpowiedzi z klawiatury albo stałych czterech podpowiedzi.",setupTitle:"Ustaw przebieg",languageLabel:"Język interfejsu",languageHint:"Język można zmienić przed rozpoczęciem przebiegu. Aktywny przebieg trzeba zrestartować, aby zmienić język lub tryb.",alphabetLabel:"Alfabet fonetyczny",modeLabel:"Tryb ćwiczenia",startRun:"Rozpocznij",progress:(e,o)=>`Pytanie ${e} z ${o}`,questionCount:(e,o)=>`Ukończono ${e}/${o}`,questionMode:"Tryb odpowiedzi",hintButton:"Pokaż podpowiedź",hintPenalty:"Użycie podpowiedzi oznacza, że to pytanie nie będzie czyste w wyniku końcowym.",hintPrefix:"Podpowiedź",submitAnswer:"Sprawdź odpowiedź",keyboardPlaceholder:"Wpisz pasujące słowo kodowe",wrongKeyboard:"To jeszcze nie jest poprawne słowo kodowe.",wrongSuggestion:"Ta opcja jest błędna. Spróbuj ponownie.",leaveRun:"Opuść przebieg",leaveRunConfirm:"Opuścić ten przebieg i usunąć bieżący postęp?",resultTitle:"Przebieg ukończony",resultSummary:e=>`Wynik końcowy: ${e}%`,resultContext:"Ukończono pełny przebieg. Pytania z użyciem podpowiedzi obniżają wynik, same błędne próby nie.",hintsUsedLabel:"Użyte podpowiedzi",restartSame:"Zagraj ponownie z tym samym ustawieniem",backToSetup:"Wróć do ustawień",modeExplanation:"Aby zmienić tryb odpowiedzi, trzeba najpierw zakończyć albo porzucić bieżący przebieg.",attribution:(e,o)=>`Phonetic Benchmark autorstwa Piotra Kacały (piotrkacala.pl). Opracowane przez ${e} dnia ${o}.`,languageNames:{en:"Angielski",pl:"Polski"},alphabetNames:{polish:"Polski alfabet fonetyczny",nato:"Alfabet fonetyczny NATO"},modeNames:{keyboard:"Klawiatura",suggestion:"Podpowiedzi"}}},k=[{symbol:"A",codeword:"ADAM"},{symbol:"Ą",codeword:"KĄT"},{symbol:"B",codeword:"BARBARA"},{symbol:"C",codeword:"CELINA"},{symbol:"Ć",codeword:"ĆMA"},{symbol:"D",codeword:"DOROTA"},{symbol:"E",codeword:"EDWARD"},{symbol:"Ę",codeword:"JĘK"},{symbol:"F",codeword:"FILIP"},{symbol:"G",codeword:"GUSTAW"},{symbol:"H",codeword:"HENRYK"},{symbol:"I",codeword:"IGNACY"},{symbol:"J",codeword:"JÓZEF"},{symbol:"K",codeword:"KAROL"},{symbol:"L",codeword:"LUDWIK"},{symbol:"Ł",codeword:"ŁUKASZ"},{symbol:"M",codeword:"MARIAN"},{symbol:"N",codeword:"NIKODEM"},{symbol:"Ń",codeword:"KOŃ"},{symbol:"O",codeword:"OLGA"},{symbol:"P",codeword:"PAWEŁ"},{symbol:"Q",codeword:"QUANTUM"},{symbol:"R",codeword:"ROMAN"},{symbol:"S",codeword:"STEFAN"},{symbol:"Ś",codeword:"ŚWIATOWID"},{symbol:"T",codeword:"TADEUSZ"},{symbol:"U",codeword:"URSZULA"},{symbol:"V",codeword:"VIOLETTA"},{symbol:"W",codeword:"WALENTY"},{symbol:"X",codeword:"XAWERY"},{symbol:"Y",codeword:"YPSYLON"},{symbol:"Z",codeword:"ZYGMUNT"},{symbol:"Ż",codeword:"ŻABA"},{symbol:"Ź",codeword:"ŹREBAK"}],$=[{symbol:"A",codeword:"ALFA"},{symbol:"B",codeword:"BRAVO"},{symbol:"C",codeword:"CHARLIE"},{symbol:"D",codeword:"DELTA"},{symbol:"E",codeword:"ECHO"},{symbol:"F",codeword:"FOXTROT"},{symbol:"G",codeword:"GOLF"},{symbol:"H",codeword:"HOTEL"},{symbol:"I",codeword:"INDIA"},{symbol:"J",codeword:"JULIETT"},{symbol:"K",codeword:"KILO"},{symbol:"L",codeword:"LIMA"},{symbol:"M",codeword:"MIKE"},{symbol:"N",codeword:"NOVEMBER"},{symbol:"O",codeword:"OSCAR"},{symbol:"P",codeword:"PAPA"},{symbol:"Q",codeword:"QUEBEC"},{symbol:"R",codeword:"ROMEO"},{symbol:"S",codeword:"SIERRA"},{symbol:"T",codeword:"TANGO"},{symbol:"U",codeword:"UNIFORM"},{symbol:"V",codeword:"VICTOR"},{symbol:"W",codeword:"WHISKEY"},{symbol:"X",codeword:"XRAY"},{symbol:"Y",codeword:"YANKEE"},{symbol:"Z",codeword:"ZULU"}],M={polish:k,nato:$},D={A:["ADAM","AGENDA","AKTOR","ATLAS"],Ą:["KĄT","MĄKA","PĄK","WĄŻ"],B:["BARBARA","BALON","BILET","BUTELKA"],C:["CELINA","CYTRYNA","CUKIER","CYRKIEL"],Ć:["ĆMA","ĆMIEL","ĆWICZENIE","ĆWIKŁA"],D:["DOROTA","DRZEWO","DROGA","DYWAN"],E:["EDWARD","EKRAN","ETYKA","EUROPA"],Ę:["JĘK","MIĘSO","PIĘĆ","TĘCZA"],F:["FILIP","FARBA","FOKUS","FOTEL"],G:["GUSTAW","GAZETA","GITARA","GŁOS"],H:["HENRYK","HERBATA","HISTORIA","HOTEL"],I:["IGNACY","IGLICA","IGŁA","ILUZJA"],J:["JÓZEF","JABŁKO","JĘZYK","JUTRO"],K:["KAROL","KAJAK","KLASA","KOTLET"],L:["LUDWIK","LAMPA","LASER","LISTEK"],Ł:["ŁUKASZ","ŁAŃCUCH","ŁODYGA","ŁOPATA"],M:["MARIAN","MAPA","MŁOTEK","MONETA"],N:["NIKODEM","NARTY","NOGA","NUTA"],Ń:["KOŃ","DZWOŃ","JAŹŃ","SŁOŃ"],O:["OLGA","OBIAD","OGRÓD","OKNO"],P:["PAWEŁ","PAPIER","PODUSZKA","POMIDOR"],Q:["QUANTUM","QUAD","QUASAR","QUOTA"],R:["ROMAN","RABAT","RADIO","ROWER"],S:["STEFAN","SAMOLOT","SERWETKA","SYRENA"],Ś:["ŚWIATOWID","ŚLAD","ŚNIEG","ŚWIT"],T:["TADEUSZ","TELEFON","TORBA","TRASA"],U:["URSZULA","UBRANIE","UKŁAD","ULICA"],V:["VIOLETTA","VECTRA","VENTYL","VIDEO"],W:["WALENTY","WALIZKA","WARSZTAT","WIDOK"],X:["XAWERY","XENON","XEROX","XYLOFON"],Y:["YPSYLON","YACHT","YETI","YUPPIE"],Z:["ZYGMUNT","ZAMEK","ZEGAR","ZUPA"],Ż:["ŻABA","ŻAGIEL","ŻOŁNIERZ","ŻURAW"],Ź:["ŹREBAK","ŹDŹBŁO","ŹRENICA","ŹRÓDŁO"]},v={A:["ALFA","AMBER","ARROW","ATLAS"],B:["BRAVO","BAKER","BASIC","BLOOM"],C:["CHARLIE","CABLE","CANYON","CIRCLE"],D:["DELTA","DESERT","DINNER","DRAGON"],E:["ECHO","EAGLE","EMBER","ENGINE"],F:["FOXTROT","FALCON","FOREST","FUTURE"],G:["GOLF","GADGET","GALAXY","GARDEN"],H:["HOTEL","HAMMER","HARBOR","HORIZON"],I:["INDIA","ICEBERG","ICON","IMPULSE"],J:["JULIETT","JACKET","JASPER","JUNGLE"],K:["KILO","KAYAK","KINGDOM","KITTEN"],L:["LIMA","LANTERN","LASER","LEGEND"],M:["MIKE","MARKET","METEOR","MODULE"],N:["NOVEMBER","NATURE","NEBULA","NICKEL"],O:["OSCAR","OMEGA","ORANGE","ORBIT"],P:["PAPA","PANTHER","PLANET","POCKET"],Q:["QUEBEC","QUARTZ","QUICKSAND","QUILL"],R:["ROMEO","RANGER","RIVER","ROCKET"],S:["SIERRA","SHADOW","SIGNAL","SUNSET"],T:["TANGO","TARGET","TEMPLE","THUNDER"],U:["UNIFORM","UMBRA","UPLINK","URBAN"],V:["VICTOR","VAPOR","VECTOR","VIOLET"],W:["WHISKEY","WARDEN","WILLOW","WINDOW"],X:["XRAY","XENON","XYLEM","XYSTUS"],Y:["YANKEE","YELLOW","YOGURT","YONDER"],Z:["ZULU","ZENITH","ZEPHYR","ZODIAC"]},z={polish:D,nato:v},C={alphabets:M,suggestions:z};function R(e,o){const r=[...e];for(let a=r.length-1;a>0;a-=1){const s=Math.floor(o()*(a+1));[r[a],r[s]]=[r[s],r[a]]}return r}function O(e){return e.trim().toLocaleUpperCase("pl-PL")}function B(e,o){return O(e)===O(o)}function Y(e,o){if(e<=0)return 0;const r=e-o;return Math.round(r/e*100)}function G(e,o,r,a){return R(e.alphabets[o],a).map(s=>({...s,options:r==="suggestion"?W(e,o,s,a):null}))}function W(e,o,r,a){const s=e.suggestions[o][r.symbol];if(!s||s.length!==4)throw new Error(`Expected exactly four suggestion options for ${o}:${r.symbol}.`);if(!s.includes(r.codeword))throw new Error(`Suggestion set for ${o}:${r.symbol} must include ${r.codeword}.`);return R(s,a)}const H="Codex (GPT-5.4 High)",Z="2026-05-25";function F(e,o={}){const r=o.data??C,a=o.rng??Math.random,s=o.modelName??H,i=o.implementationDate??Z;let t={screen:"setup",language:"en",alphabet:"polish",mode:"keyboard"};function c(){const l=m[t.language],b=t.screen==="setup"?q(t,l):t.screen==="run"?x(t,l):Q(t,l);e.innerHTML=`
      <main class="shell">
        <section class="hero">
          <p class="eyebrow">${n(l.submissionTag)}</p>
          <h1>${n(l.appTitle)}</h1>
          <p class="intro">${n(l.appIntro)}</p>
        </section>
        ${b}
        <footer class="footer">${n(l.attribution(s,i))}</footer>
      </main>
    `,A()}function A(){const l=e.querySelector("#setup-language"),b=e.querySelector("#setup-alphabet"),p=e.querySelector("#setup-mode"),L=e.querySelector("#start-run"),f=e.querySelector("#leave-run"),I=e.querySelector("#show-hint"),N=e.querySelector("#keyboard-form"),S=e.querySelector("#keyboard-answer"),U=e.querySelectorAll("[data-option]"),K=e.querySelector("#restart-same"),P=e.querySelector("#back-to-setup");l?.addEventListener("change",d=>{if(t.screen!=="setup")return;const u=d.currentTarget;t={...t,language:u.value},c()}),b?.addEventListener("change",d=>{if(t.screen!=="setup")return;const u=d.currentTarget;t={...t,alphabet:u.value}}),p?.addEventListener("change",d=>{if(t.screen!=="setup")return;const u=d.currentTarget;t={...t,mode:u.value}}),L?.addEventListener("click",()=>{t.screen==="setup"&&h(t.language,t.alphabet,t.mode)}),f?.addEventListener("click",()=>{if(t.screen!=="run")return;const d=m[t.language];window.confirm(d.leaveRunConfirm)&&(t={screen:"setup",language:t.language,alphabet:t.alphabet,mode:t.mode},c())}),I?.addEventListener("click",()=>{if(t.screen!=="run")return;const d=E(t);t={...t,hintVisible:!0,hintedSymbols:t.hintedSymbols.includes(d.symbol)?t.hintedSymbols:[...t.hintedSymbols,d.symbol]},c()}),N?.addEventListener("submit",d=>{if(d.preventDefault(),t.screen!=="run"||t.mode!=="keyboard")return;const u=S?.value??"",g=E(t);if(B(u,g.codeword)){w({...t,keyboardAnswer:u,feedback:null});return}t={...t,keyboardAnswer:u,feedback:m[t.language].wrongKeyboard},c()}),U.forEach(d=>{d.addEventListener("click",()=>{if(t.screen!=="run"||t.mode!=="suggestion")return;const u=d.dataset.option;if(!u)return;const g=E(t);if(u===g.codeword){w({...t,feedback:null});return}t={...t,feedback:m[t.language].wrongSuggestion},c()})}),K?.addEventListener("click",()=>{t.screen==="result"&&h(t.language,t.alphabet,t.mode)}),P?.addEventListener("click",()=>{t.screen==="result"&&(t={screen:"setup",language:t.language,alphabet:t.alphabet,mode:t.mode},c())})}function h(l,b,p){t={screen:"run",language:l,alphabet:b,mode:p,questions:G(r,b,p,a),currentIndex:0,hintedSymbols:[],hintVisible:!1,keyboardAnswer:"",feedback:null},c()}function w(l){const b=l.currentIndex+1;if(b>=l.questions.length){t={screen:"result",language:l.language,alphabet:l.alphabet,mode:l.mode,totalQuestions:l.questions.length,hintedQuestions:l.hintedSymbols.length,scorePercent:Y(l.questions.length,l.hintedSymbols.length)},c();return}t={...l,currentIndex:b,hintVisible:!1,keyboardAnswer:"",feedback:null},c()}c()}function q(e,o){const r=y(o.languageNames,e.language),a=y(o.alphabetNames,e.alphabet),s=y(o.modeNames,e.mode);return`
    <section class="panel">
      <div class="panel-header">
        <h2>${n(o.setupTitle)}</h2>
        <p class="muted">${n(o.modeExplanation)}</p>
      </div>
      <div class="grid">
        <label class="field">
          <span>${n(o.languageLabel)}</span>
          <select id="setup-language">${r}</select>
        </label>
        <label class="field">
          <span>${n(o.alphabetLabel)}</span>
          <select id="setup-alphabet">${a}</select>
        </label>
        <label class="field">
          <span>${n(o.modeLabel)}</span>
          <select id="setup-mode">${s}</select>
        </label>
      </div>
      <p class="note">${n(o.languageHint)}</p>
      <button id="start-run" class="primary">${n(o.startRun)}</button>
    </section>
  `}function x(e,o){const r=E(e),a=e.questions.length,s=e.currentIndex+1,i=e.hintVisible?`
      <div class="hint-card">
        <span class="pill">${n(o.hintPrefix)}</span>
        <strong>${n(r.codeword)}</strong>
      </div>
    `:"",t=e.feedback?`<p class="feedback" role="status">${n(e.feedback)}</p>`:"",c=e.mode==="keyboard"?`
        <form id="keyboard-form" class="answer-stack">
          <input
            id="keyboard-answer"
            name="answer"
            type="text"
            value="${n(e.keyboardAnswer)}"
            autocomplete="off"
            placeholder="${n(o.keyboardPlaceholder)}"
          />
          <button class="primary" type="submit">${n(o.submitAnswer)}</button>
        </form>
      `:`
        <div class="options-grid">
          ${r.options?.map(A=>`
                <button class="option" type="button" data-option="${n(A)}">
                  ${n(A)}
                </button>
              `).join("")??""}
        </div>
      `;return`
    <section class="panel">
      <div class="run-header">
        <div>
          <p class="eyebrow">${n(o.progress(s,a))}</p>
          <h2>${n(r.symbol)}</h2>
        </div>
        <button id="leave-run" class="ghost" type="button">${n(o.leaveRun)}</button>
      </div>
      <div class="run-meta">
        <span>${n(o.questionCount(e.currentIndex,a))}</span>
        <span>${n(o.alphabetNames[e.alphabet])}</span>
        <span>${n(o.modeNames[e.mode])}</span>
      </div>
      <div class="hint-row">
        <button id="show-hint" class="secondary" type="button">${n(o.hintButton)}</button>
        <p class="muted">${n(o.hintPenalty)}</p>
      </div>
      ${i}
      ${c}
      ${t}
    </section>
  `}function Q(e,o){return`
    <section class="panel">
      <div class="panel-header">
        <h2>${n(o.resultTitle)}</h2>
        <p class="score">${n(o.resultSummary(e.scorePercent))}</p>
      </div>
      <div class="summary-grid">
        <div class="summary-card">
          <span class="label">${n(o.alphabetLabel)}</span>
          <strong>${n(o.alphabetNames[e.alphabet])}</strong>
        </div>
        <div class="summary-card">
          <span class="label">${n(o.modeLabel)}</span>
          <strong>${n(o.modeNames[e.mode])}</strong>
        </div>
        <div class="summary-card">
          <span class="label">${n(o.hintsUsedLabel)}</span>
          <strong>${e.hintedQuestions}/${e.totalQuestions}</strong>
        </div>
      </div>
      <p class="note">${n(o.resultContext)}</p>
      <div class="actions">
        <button id="restart-same" class="primary" type="button">${n(o.restartSame)}</button>
        <button id="back-to-setup" class="secondary" type="button">${n(o.backToSetup)}</button>
      </div>
    </section>
  `}function y(e,o){return Object.entries(e).map(([r,a])=>`<option value="${n(r)}"${r===o?" selected":""}>${n(a)}</option>`).join("")}function E(e){return e.questions[e.currentIndex]}function n(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const T=document.querySelector("#app");if(!T)throw new Error("Missing #app root element.");F(T);
