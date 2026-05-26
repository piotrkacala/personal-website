(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))l(d);new MutationObserver(d=>{for(const n of d)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(d){const n={};return d.integrity&&(n.integrity=d.integrity),d.referrerPolicy&&(n.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?n.credentials="include":d.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(d){if(d.ep)return;d.ep=!0;const n=r(d);fetch(d.href,n)}})();const e={language:"en",alphabet:"polish",mode:"keyboard",isActiveRun:!1,isRunFinished:!1,runSymbols:[],currentQuestionIndex:0,hintedQuestions:new Set},p=new Set,w=t=>(p.add(t),()=>p.delete(t)),A=()=>{p.forEach(t=>t())},f=t=>{e.language=t,A()},v=t=>{e.alphabet=t,A()},S=t=>{e.mode=t,A()},K=t=>{e.isActiveRun=!0,e.isRunFinished=!1,e.runSymbols=t,e.currentQuestionIndex=0,e.hintedQuestions=new Set,A()},L=()=>{e.runSymbols[e.currentQuestionIndex]&&(e.hintedQuestions.add(e.runSymbols[e.currentQuestionIndex].symbol),A())},h=()=>{e.currentQuestionIndex<e.runSymbols.length-1?e.currentQuestionIndex++:(e.isActiveRun=!1,e.isRunFinished=!0),A()},R=()=>{e.isActiveRun=!1,e.isRunFinished=!1,e.runSymbols=[],e.currentQuestionIndex=0,e.hintedQuestions=new Set,A()},U=[{symbol:"A",codeword:"ADAM"},{symbol:"Ą",codeword:"KĄT"},{symbol:"B",codeword:"BARBARA"},{symbol:"C",codeword:"CELINA"},{symbol:"Ć",codeword:"ĆMA"},{symbol:"D",codeword:"DOROTA"},{symbol:"E",codeword:"EDWARD"},{symbol:"Ę",codeword:"JĘK"},{symbol:"F",codeword:"FILIP"},{symbol:"G",codeword:"GUSTAW"},{symbol:"H",codeword:"HENRYK"},{symbol:"I",codeword:"IGNACY"},{symbol:"J",codeword:"JÓZEF"},{symbol:"K",codeword:"KAROL"},{symbol:"L",codeword:"LUDWIK"},{symbol:"Ł",codeword:"ŁUKASZ"},{symbol:"M",codeword:"MARIAN"},{symbol:"N",codeword:"NIKODEM"},{symbol:"Ń",codeword:"KOŃ"},{symbol:"O",codeword:"OLGA"},{symbol:"P",codeword:"PAWEŁ"},{symbol:"Q",codeword:"QUANTUM"},{symbol:"R",codeword:"ROMAN"},{symbol:"S",codeword:"STEFAN"},{symbol:"Ś",codeword:"ŚWIATOWID"},{symbol:"T",codeword:"TADEUSZ"},{symbol:"U",codeword:"URSZULA"},{symbol:"V",codeword:"VIOLETTA"},{symbol:"W",codeword:"WALENTY"},{symbol:"X",codeword:"XAWERY"},{symbol:"Y",codeword:"YPSYLON"},{symbol:"Z",codeword:"ZYGMUNT"},{symbol:"Ż",codeword:"ŻABA"},{symbol:"Ź",codeword:"ŹREBAK"}],M=[{symbol:"A",codeword:"ALFA"},{symbol:"B",codeword:"BRAVO"},{symbol:"C",codeword:"CHARLIE"},{symbol:"D",codeword:"DELTA"},{symbol:"E",codeword:"ECHO"},{symbol:"F",codeword:"FOXTROT"},{symbol:"G",codeword:"GOLF"},{symbol:"H",codeword:"HOTEL"},{symbol:"I",codeword:"INDIA"},{symbol:"J",codeword:"JULIETT"},{symbol:"K",codeword:"KILO"},{symbol:"L",codeword:"LIMA"},{symbol:"M",codeword:"MIKE"},{symbol:"N",codeword:"NOVEMBER"},{symbol:"O",codeword:"OSCAR"},{symbol:"P",codeword:"PAPA"},{symbol:"Q",codeword:"QUEBEC"},{symbol:"R",codeword:"ROMEO"},{symbol:"S",codeword:"SIERRA"},{symbol:"T",codeword:"TANGO"},{symbol:"U",codeword:"UNIFORM"},{symbol:"V",codeword:"VICTOR"},{symbol:"W",codeword:"WHISKEY"},{symbol:"X",codeword:"XRAY"},{symbol:"Y",codeword:"YANKEE"},{symbol:"Z",codeword:"ZULU"}],B={polish:U,nato:M},C={A:["ADAM","AGENDA","AKTOR","ATLAS"],Ą:["KĄT","MĄKA","PĄK","WĄŻ"],B:["BARBARA","BALON","BILET","BUTELKA"],C:["CELINA","CYTRYNA","CUKIER","CYRKIEL"],Ć:["ĆMA","ĆMIEL","ĆWICZENIE","ĆWIKŁA"],D:["DOROTA","DRZEWO","DROGA","DYWAN"],E:["EDWARD","EKRAN","ETYKA","EUROPA"],Ę:["JĘK","MIĘSO","PIĘĆ","TĘCZA"],F:["FILIP","FARBA","FOKUS","FOTEL"],G:["GUSTAW","GAZETA","GITARA","GŁOS"],H:["HENRYK","HERBATA","HISTORIA","HOTEL"],I:["IGNACY","IGLICA","IGŁA","ILUZJA"],J:["JÓZEF","JABŁKO","JĘZYK","JUTRO"],K:["KAROL","KAJAK","KLASA","KOTLET"],L:["LUDWIK","LAMPA","LASER","LISTEK"],Ł:["ŁUKASZ","ŁAŃCUCH","ŁODYGA","ŁOPATA"],M:["MARIAN","MAPA","MŁOTEK","MONETA"],N:["NIKODEM","NARTY","NOGA","NUTA"],Ń:["KOŃ","DZWOŃ","JAŹŃ","SŁOŃ"],O:["OLGA","OBIAD","OGRÓD","OKNO"],P:["PAWEŁ","PAPIER","PODUSZKA","POMIDOR"],Q:["QUANTUM","QUAD","QUASAR","QUOTA"],R:["ROMAN","RABAT","RADIO","ROWER"],S:["STEFAN","SAMOLOT","SERWETKA","SYRENA"],Ś:["ŚWIATOWID","ŚLAD","ŚNIEG","ŚWIT"],T:["TADEUSZ","TELEFON","TORBA","TRASA"],U:["URSZULA","UBRANIE","UKŁAD","ULICA"],V:["VIOLETTA","VECTRA","VENTYL","VIDEO"],W:["WALENTY","WALIZKA","WARSZTAT","WIDOK"],X:["XAWERY","XENON","XEROX","XYLOFON"],Y:["YPSYLON","YACHT","YETI","YUPPIE"],Z:["ZYGMUNT","ZAMEK","ZEGAR","ZUPA"],Ż:["ŻABA","ŻAGIEL","ŻOŁNIERZ","ŻURAW"],Ź:["ŹREBAK","ŹDŹBŁO","ŹRENICA","ŹRÓDŁO"]},D={A:["ALFA","AMBER","ARROW","ATLAS"],B:["BRAVO","BAKER","BASIC","BLOOM"],C:["CHARLIE","CABLE","CANYON","CIRCLE"],D:["DELTA","DESERT","DINNER","DRAGON"],E:["ECHO","EAGLE","EMBER","ENGINE"],F:["FOXTROT","FALCON","FOREST","FUTURE"],G:["GOLF","GADGET","GALAXY","GARDEN"],H:["HOTEL","HAMMER","HARBOR","HORIZON"],I:["INDIA","ICEBERG","ICON","IMPULSE"],J:["JULIETT","JACKET","JASPER","JUNGLE"],K:["KILO","KAYAK","KINGDOM","KITTEN"],L:["LIMA","LANTERN","LASER","LEGEND"],M:["MIKE","MARKET","METEOR","MODULE"],N:["NOVEMBER","NATURE","NEBULA","NICKEL"],O:["OSCAR","OMEGA","ORANGE","ORBIT"],P:["PAPA","PANTHER","PLANET","POCKET"],Q:["QUEBEC","QUARTZ","QUICKSAND","QUILL"],R:["ROMEO","RANGER","RIVER","ROCKET"],S:["SIERRA","SHADOW","SIGNAL","SUNSET"],T:["TANGO","TARGET","TEMPLE","THUNDER"],U:["UNIFORM","UMBRA","UPLINK","URBAN"],V:["VICTOR","VAPOR","VECTOR","VIOLET"],W:["WHISKEY","WARDEN","WILLOW","WINDOW"],X:["XRAY","XENON","XYLEM","XYSTUS"],Y:["YANKEE","YELLOW","YOGURT","YONDER"],Z:["ZULU","ZENITH","ZEPHYR","ZODIAC"]},P={polish:C,nato:D},G=t=>B[t],Y=t=>P[t];function I(t){const o=[...t];for(let r=o.length-1;r>0;r--){const l=Math.floor(Math.random()*(r+1));[o[r],o[l]]=[o[l],o[r]]}return o}const W={en:{appTitle:"Phonetic Benchmark",setupTitle:"Start Training",languageLabel:"Interface Language",alphabetLabel:"Phonetic Alphabet",modeLabel:"Exercise Mode",modeKeyboard:"Keyboard",modeSuggestion:"Multiple Choice",alphabetPolish:"Polish",alphabetNato:"NATO",startBtn:"Start Run",restartBtn:"Restart",hintBtn:"Hint",questionLabel:"Symbol:",answerPlaceholder:"Type codeword...",submitBtn:"Submit",correctMsg:"Correct!",wrongMsg:"Incorrect, try again.",finishTitle:"Run Complete",scoreLabel:"Final Score:",modeUsedLabel:"Mode:",alphabetUsedLabel:"Alphabet:",questionCounter:"Question:"},pl:{appTitle:"Benchmark Fonetyczny",setupTitle:"Rozpocznij Trening",languageLabel:"Język interfejsu",alphabetLabel:"Alfabet fonetyczny",modeLabel:"Tryb ćwiczeń",modeKeyboard:"Klawiatura",modeSuggestion:"Wielokrotnego wyboru",alphabetPolish:"Polski",alphabetNato:"NATO",startBtn:"Rozpocznij",restartBtn:"Od nowa",hintBtn:"Podpowiedź",questionLabel:"Symbol:",answerPlaceholder:"Wpisz hasło...",submitBtn:"Zatwierdź",correctMsg:"Dobrze!",wrongMsg:"Źle, spróbuj ponownie.",finishTitle:"Koniec",scoreLabel:"Wynik końcowy:",modeUsedLabel:"Tryb:",alphabetUsedLabel:"Alfabet:",questionCounter:"Pytanie:"}},s=t=>W[e.language][t],$=t=>{var o,r,l,d;t.innerHTML=`
    <div class="glass-panel">
      <h1 class="title">${s("setupTitle")}</h1>
      
      <div class="form-group">
        <label for="lang-select">${s("languageLabel")}</label>
        <select id="lang-select">
          <option value="en" ${e.language==="en"?"selected":""}>English</option>
          <option value="pl" ${e.language==="pl"?"selected":""}>Polski</option>
        </select>
      </div>

      <div class="form-group">
        <label for="alpha-select">${s("alphabetLabel")}</label>
        <select id="alpha-select">
          <option value="polish" ${e.alphabet==="polish"?"selected":""}>${s("alphabetPolish")}</option>
          <option value="nato" ${e.alphabet==="nato"?"selected":""}>${s("alphabetNato")}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="mode-select">${s("modeLabel")}</label>
        <select id="mode-select">
          <option value="keyboard" ${e.mode==="keyboard"?"selected":""}>${s("modeKeyboard")}</option>
          <option value="suggestion" ${e.mode==="suggestion"?"selected":""}>${s("modeSuggestion")}</option>
        </select>
      </div>

      <button id="start-btn" class="btn btn-primary">${s("startBtn")}</button>
    </div>
  `,(o=document.getElementById("lang-select"))==null||o.addEventListener("change",n=>{f(n.target.value)}),(r=document.getElementById("alpha-select"))==null||r.addEventListener("change",n=>{v(n.target.value)}),(l=document.getElementById("mode-select"))==null||l.addEventListener("change",n=>{S(n.target.value)}),(d=document.getElementById("start-btn"))==null||d.addEventListener("click",()=>{const n=G(e.alphabet),a=I(n);K(a)})},Z=t=>{var b;const o=e.runSymbols[e.currentQuestionIndex],r=`${e.currentQuestionIndex+1} / ${e.runSymbols.length}`;t.innerHTML=`
    <div class="header-row">
      <div class="progress">${s("questionCounter")} ${r}</div>
      <button id="restart-btn" class="btn-hint">${s("restartBtn")}</button>
    </div>
    
    <div class="glass-panel question-container">
      <div class="symbol-display">${o.symbol}</div>
      
      <div class="form-group" style="width: 100%; max-width: 300px; margin-top: 1rem;">
        <input type="text" id="answer-input" placeholder="${s("answerPlaceholder")}" autocomplete="off" />
      </div>
      
      <div style="display: flex; gap: 1rem; width: 100%; max-width: 300px;">
        <button id="submit-btn" class="btn btn-primary">${s("submitBtn")}</button>
      </div>
      
      <button id="hint-btn" class="btn-hint" style="margin-top: 1rem;">${s("hintBtn")}</button>
      
      <div id="hint-area" class="hint-display hidden"></div>
      <div id="feedback-area" class="feedback"></div>
    </div>
  `,(b=document.getElementById("restart-btn"))==null||b.addEventListener("click",R);const l=document.getElementById("answer-input"),d=document.getElementById("submit-btn"),n=document.getElementById("hint-btn"),a=document.getElementById("hint-area"),i=document.getElementById("feedback-area");setTimeout(()=>l==null?void 0:l.focus(),0);const E=()=>{const c=l.value.trim().toLowerCase(),m=o.codeword.trim().toLowerCase();c===m?h():i&&(i.textContent=s("wrongMsg"),i.className="feedback incorrect")};d==null||d.addEventListener("click",E),l==null||l.addEventListener("keydown",c=>{c.key==="Enter"&&E()}),n==null||n.addEventListener("click",()=>{L(),a&&(a.textContent=o.codeword,a.classList.remove("hidden"))})},F=t=>{var O;const o=e.runSymbols[e.currentQuestionIndex],r=`${e.currentQuestionIndex+1} / ${e.runSymbols.length}`,a=(Y(e.alphabet)[o.symbol]||[]).filter(u=>u.toUpperCase()!==o.codeword.toUpperCase()).slice(0,3),i=[o.codeword,...a],E=I(i);t.innerHTML=`
    <div class="header-row">
      <div class="progress">${s("questionCounter")} ${r}</div>
      <button id="restart-btn" class="btn-hint">${s("restartBtn")}</button>
    </div>
    
    <div class="glass-panel question-container">
      <div class="symbol-display">${o.symbol}</div>
      
      <div class="options-grid" id="options-container">
        ${E.map(u=>`
          <button class="option-btn" data-value="${u}">${u}</button>
        `).join("")}
      </div>
      
      <button id="hint-btn" class="btn-hint" style="margin-top: 1.5rem;">${s("hintBtn")}</button>
      
      <div id="hint-area" class="hint-display hidden"></div>
      <div id="feedback-area" class="feedback"></div>
    </div>
  `,(O=document.getElementById("restart-btn"))==null||O.addEventListener("click",R);const b=document.getElementById("hint-btn"),c=document.getElementById("hint-area"),m=document.getElementById("feedback-area");document.querySelectorAll(".option-btn").forEach(u=>{u.addEventListener("click",T=>{const g=T.target.getAttribute("data-value")||"",N=o.codeword;g.toUpperCase()===N.toUpperCase()?h():m&&(m.textContent=s("wrongMsg"),m.className="feedback incorrect")})}),b==null||b.addEventListener("click",()=>{L(),c&&(c.textContent=o.codeword,c.classList.remove("hidden"))})},H=t=>{var i;const o=e.runSymbols.length,r=e.hintedQuestions.size,l=o-r,d=Math.round(l/o*100),n=e.mode==="keyboard"?s("modeKeyboard"):s("modeSuggestion"),a=e.alphabet==="polish"?s("alphabetPolish"):s("alphabetNato");t.innerHTML=`
    <div class="glass-panel">
      <h1 class="title">${s("finishTitle")}</h1>
      
      <div class="score-display">
        ${d}%
      </div>
      
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-label">${s("alphabetUsedLabel")}</div>
          <div class="stat-value">${a}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">${s("modeUsedLabel")}</div>
          <div class="stat-value">${n}</div>
        </div>
      </div>
      
      <button id="restart-btn" class="btn btn-primary">${s("restartBtn")}</button>
    </div>
  `,(i=document.getElementById("restart-btn"))==null||i.addEventListener("click",R)},k=t=>{const o=new Date().toISOString().split("T")[0];t.innerHTML=`
    <footer class="app-footer">
      Phonetic Benchmark by <a href="https://piotrkacala.pl" target="_blank" rel="noopener noreferrer">Piotr Kacała</a>.<br/>
      Developed by Gemini 3.1 Pro (High) on ${o}.
    </footer>
  `},y=document.getElementById("app");if(y){const t=document.createElement("div");t.id="content",t.style.width="100%",t.style.display="flex",t.style.flexDirection="column",t.style.flex="1",y.appendChild(t);const o=document.createElement("div");o.id="footer",y.appendChild(o);const r=()=>{e.isRunFinished?H(t):e.isActiveRun?e.mode==="keyboard"?Z(t):F(t):$(t)};r(),k(o),w(r)}
