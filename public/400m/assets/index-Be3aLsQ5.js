(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const R=6371e3;function C(e){return e*Math.PI/180}function he(e){if(e.length===0)return[];const t=C(e[0].lat),a=C(e[0].lon),n=Math.cos(t);return e.map(s=>{const o=C(s.lat),i=C(s.lon);return{...s,x:R*n*(i-a),y:R*(o-t),isDuplicate:!1,isSpeedOutlier:!1,isOutlier:!1}})}function O(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}const fe=.5,ge=8,ye=10,be=80,we=.35;function F(e,t){return`${e},${t}`}function _e(e,t){const a=t,n=new Map;for(const s of e){const o=Math.floor(s.x/a),i=Math.floor(s.y/a),c=F(o,i),d=n.get(c);d?d.push(s):n.set(c,[s])}return e.map(s=>{const o=Math.floor(s.x/a),i=Math.floor(s.y/a);let c=0;for(let d=-1;d<=1;d+=1)for(let l=-1;l<=1;l+=1){const r=n.get(F(o+d,i+l));if(r)for(const p of r)O(s,p)<=t&&(c+=1)}return c})}function ze(e,t){return!e||!t?null:(t.getTime()-e.getTime())/1e3}function ke(e){let t=0,a=0,n=0,s=null;const o=e.map((r,p)=>{if(p===0)return r.time&&(s=r.time),{...r};const y=e[p-1],h=r.segmentIndex===y.segmentIndex,f=h?O(y,r):0,u=h?ze(y.time,r.time):null,_=h&&f<=fe,g=u!==null&&u>ye,b=u!==null&&u>0&&f/u>ge;let P=!1;r.time&&s&&r.time.getTime()<=s.getTime()&&(P=!0),_&&(t+=1),b&&(a+=1),g&&(n+=1);const E=_||b||P;return!E&&r.time&&(s=r.time),{...r,isDuplicate:_,isSpeedOutlier:b,isOutlier:E}}),i=o.filter(r=>!r.isOutlier),c=K(i),d=new Set(c.map(r=>r.pointIndex)),l=o.map(r=>r.isOutlier?r:c.length>=8&&!d.has(r.pointIndex)?{...r,isOutlier:!0}:r);return{points:l,summary:{duplicateCount:t,speedOutlierCount:a,longGapCount:n,usablePointCount:l.filter(r=>!r.isOutlier).length}}}function Te(e){return e.filter(t=>!t.isOutlier)}function K(e){if(e.length===0)return[];const t=_e(e,be),a=Math.max(...t);if(a===0)return e;const n=we*a;return e.filter((s,o)=>t[o]>=n)}class T extends Error{code;constructor(t,a){super(a??t),this.name="AnalysisError",this.code=t}}function Le(e){return e instanceof T?e:new T("unknown_analysis_error")}function W(e,t){return Array.from(e.querySelectorAll("*")).filter(a=>a.localName.toLowerCase()===t)}function B(e,t){return Array.from(e.children).find(n=>n.localName.toLowerCase()===t)?.textContent?.trim()??null}function Pe(e){if(e===null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function xe(e){if(e===null||e==="")return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Se(e){const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))throw new T("invalid_gpx_xml");const n=W(t,"trkseg"),s=n.length>0?n:[t.documentElement],o=[];if(s.forEach((i,c)=>{W(i,"trkpt").forEach(l=>{const r=Number(l.getAttribute("lat")),p=Number(l.getAttribute("lon"));!Number.isFinite(r)||!Number.isFinite(p)||Math.abs(r)>90||Math.abs(p)>180||o.push({lat:r,lon:p,ele:Pe(B(l,"ele")),time:xe(B(l,"time")),segmentIndex:c,pointIndex:o.length})})}),o.length===0)throw new T("no_track_points");return o}const J={1:400,2:407.038,3:414.704,4:422.37,5:430.034,6:437.7,7:445.366,8:453.032};function Me(e){return Number.isInteger(e)&&e>=1&&e<=8}function Q(e){if(!Me(e))throw new T("invalid_lane");return J[e]}function H(e){const t=[...e].sort((n,s)=>n-s),a=Math.floor(t.length/2);return t.length%2===1?t[a]:(t[a-1]+t[a])/2}function je(e){if(e.length===0)return[];const t=[e[0]];for(let a=1;a<e.length;a+=1){let n=e[a]-e[a-1];for(;n>Math.PI;)n-=2*Math.PI;for(;n<-Math.PI;)n+=2*Math.PI;t.push(t[a-1]+n)}return t}function ve(e,t){if(e.length===0)return[];const a=[e[0]];let n=e[0];for(let s=1;s<e.length;s++){const o=e[s];t===1?o>n||n-o>.15?(n=o,a.push(o)):a.push(n):o<n||o-n>.15?(n=o,a.push(o)):a.push(n)}return a}function Ee(e){if(e.length<8)throw new T("not_enough_points");const t=K(e),a=t.length>=8?t:e,n=H(a.map(g=>g.x)),s=H(a.map(g=>g.y)),o=e.map(g=>Math.atan2(g.y-s,g.x-n)),i=je(o),d=i[i.length-1]-i[0]>=0?1:-1,l=ve(i,d),r=l[l.length-1]-l[0],p=Math.abs(r)/(2*Math.PI),y=r>=0?"ccw":"cw",h=l.map(g=>Math.abs((g-l[0])/(2*Math.PI)));let f=d,u=0,_=0;for(let g=0;g<l.length-1;g++){const b=l[g+1]-l[g];if(Math.abs(b)<.001)continue;const P=Math.sign(b);P===-f?(u+=Math.abs(b),u>=.1&&(_++,f=-f,u=0)):P===f&&(u=Math.max(0,u-Math.abs(b)))}if(!Number.isFinite(p)||p<=0)throw new T("unable_to_estimate_laps");return{total_laps:p,direction:y,center_x:n,center_y:s,angle_delta_rad:r,directionChanges:_,progress_samples:h}}const G=1e-9,A=5e3;function $e(e){for(let t=1;t<e.length;t+=1){const a=e[t-1].time,n=e[t].time;if(!a||!n||n.getTime()<=a.getTime())return!1}return!0}function Z(e){return e.some(t=>t.time===null)?{startTimeMs:0,suppression_reason:"missing_timestamps"}:$e(e)?{startTimeMs:e[0].time?.getTime()??0,suppression_reason:null}:{startTimeMs:0,suppression_reason:"non_monotonic_timestamps"}}function V(e,t,a){const n=[];let s=0;for(let o=1;o<e.length&&s<a.length;o+=1){const i=t[o-1],c=t[o],d=e[o-1].time,l=e[o].time;if(!(d===null||l===null||c<i||l.getTime()<=d.getTime()))for(;s<a.length&&c+G>=a[s];){const r=a[s],p=c-i,y=p<=G?0:(r-i)/p,h=d.getTime()+y*(l.getTime()-d.getTime());n.push(h),s+=1}}return n.length===a.length?n:null}function qe(e,t){const a=Math.floor(t[t.length-1]+G);if(a<1)return{lap_splits:[],suppression_reason:"less_than_one_full_lap"};const n=Z(e);if(n.suppression_reason)return{lap_splits:[],suppression_reason:n.suppression_reason};const s=Array.from({length:a},(i,c)=>c+1),o=V(e,t,s);return o===null?{lap_splits:[],suppression_reason:"non_monotonic_timestamps"}:{lap_splits:o.map((i,c)=>{const d=c===0?n.startTimeMs:o[c-1];return{lap_index:c+1,duration_s:(i-d)/1e3,cumulative_time_s:(i-n.startTimeMs)/1e3}}),suppression_reason:null}}function Ce(e,t,a){const n=Z(e);if(n.suppression_reason)return[];const s=t[t.length-1]*a,o=Math.floor(s/A);if(o<1)return[];const i=Array.from({length:o},(d,l)=>(l+1)*A/a),c=V(e,t,i);return c===null?[]:c.map((d,l)=>({distance_m:(l+1)*A,cumulative_time_s:(d-n.startTimeMs)/1e3}))}function Ie(e){return e.every(t=>t.time!==null)}function De(e){let t=0,a=0;for(let n=1;n<e.length;n+=1){const s=e[n-1],o=e[n];s.segmentIndex===o.segmentIndex&&(t+=O(s,o),a+=1)}return a>0?t:null}function Ae(e){const t=[],a=e.duplicateCount+e.speedOutlierCount,n=e.totalPoints>0?a/e.totalPoints:0;return Ie(e.parsedPoints)||t.push("missing_timestamps"),e.duplicateCount>0&&t.push("duplicate_points"),e.speedOutlierCount>0&&t.push("gps_jumps"),e.longGapCount>0&&t.push("long_gaps"),e.usablePointCount<50&&t.push("few_usable_points"),n>.05&&t.push("high_outlier_rate"),e.directionChanges>Math.max(10,e.totalPoints*.03)&&t.push("noisy_direction_changes"),e.totalLaps<1&&t.push("less_than_one_lap"),t}function Ge(e,t){const a=Q(t),n=Se(e),s=he(n),{points:o,summary:i}=ke(s),c=Te(o);if(c.length<8)throw new T("not_enough_points");const d=Ee(c),l=d.total_laps*a,r=De(o),p=qe(c,d.progress_samples),y=Ce(c,d.progress_samples,a);return{corrected_distance_m:l,total_laps:d.total_laps,raw_distance_m:r,delta_m:r===null?null:r-l,warnings:Ae({parsedPoints:n,usablePointCount:i.usablePointCount,totalPoints:o.length,duplicateCount:i.duplicateCount,speedOutlierCount:i.speedOutlierCount,longGapCount:i.longGapCount,directionChanges:d.directionChanges,totalLaps:d.total_laps}),lap_splits:p.lap_splits,split_suppression_reason:p.suppression_reason,distance_markers:y,trace_points:o.map(h=>({x:h.x,y:h.y,segmentIndex:h.segmentIndex,isOutlier:h.isOutlier}))}}const Oe=.15,Ne=1e-9;function Xe(e,t,a=Oe){const n=Math.round(e);return Math.abs(e-n)-a>Ne?null:{rounded_laps:n,corrected_distance_m:n*t}}const j={pl:{languageLabel:"Język",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Oszacuj dystans z okrążeń, a nie z surowej długości śladu GPS.",heroIntro:"Wgraj plik GPX, wybierz tor i policz skorygowany dystans lokalnie w przeglądarce.",fileLabel:"Plik GPX",laneLabel:"Tor",laneOptionLabel:(e,t)=>`Tor ${e} (${t})`,analyzeButton:"Analizuj GPX",loadingMessage:"Analizuję GPX lokalnie...",missingFileError:"Wybierz plik GPX przed uruchomieniem analizy.",resultEyebrow:"Skorygowany dystans",resultTotalLaps:"Liczba okrążeń",resultRawDistance:"Surowy dystans GPX",resultDelta:"Różnica",unavailable:"Niedostępne",warningsTitle:"Ostrzeżenia",roundedEyebrow:"Interpretacja dla pełnych okrążeń",roundedCopy:"Dla biegu zaplanowanego jako same pełne okrążenia najbliższy wynik to:",roundedLapsLabel:"Zaokrąglona liczba okrążeń",roundedDistanceLabel:"Skorygowany dystans po zaokrągleniu",errorTitle:"Analiza nie powiodła się",splitTitle:"Czasy okrążeń",splitIntro:"Przybliżone splity wynikające z przecięć pełnych okrążeń w modelu postępu po bieżni.",splitUnavailableTitle:"Czasy okrążeń są niedostępne",splitTableLap:"Okrążenie",splitTableDuration:"Czas",splitTableCumulative:"Narastająco",splitTablePace:"Tempo",markerTitle:"Międzyczasy dystansowe",markerIntro:"Czasy przecięć kolejnych progów 5 km wyznaczone z tego samego modelu progresu po okrążeniach.",markerTableDistance:"Dystans",markerTableTime:"Czas",traceTitle:"Ślad w lokalnych współrzędnych",traceIntro:"Wykres pokazuje zarejestrowaną geometrię śladu po projekcji do lokalnego układu metrycznego.",footerAuthorLabel:"Autor",faqEyebrow:"Metodologia i prywatność",faqTitle:"Często zadawane pytania (FAQ)",faqIntro:"Krótko: dystans liczymy z progresu po okrążeniach i oficjalnej długości toru, a sam plik GPX jest analizowany lokalnie w przeglądarce.",faqItems:[{question:"Dlaczego dystans z mojego zegarka GPS jest niedokładny na bieżni lekkoatletycznej?",answer:"Zegarki GPS doświadczają dryfu i szumu sygnału podczas ciągłego biegania po ciasnych łukach bieżni lekkoatletycznej, co zazwyczaj zawyża zarejestrowany dystans. To narzędzie rozwiązuje ten problem, licząc dystans ściśle z liczby ukończonych okrążeń i oficjalnej długości wybranego toru."},{question:"Jak wyznacza się długość każdego toru na standardowym stadionie?",answer:"Dystanse są obliczane zgodnie z oficjalną konwencją pomiarową World Athletics dla certyfikowanej bieżni 400 m. Tor 1 ma dokładnie 400,00 m, mierzone wzdłuż linii pomiarowej położonej 0,30 m od krawężnika. Tory zewnętrzne mierzy się wzdłuż linii oddalonej o 0,20 m od ich linii wewnętrznej. Dla standardowej szerokości toru 1,22 m daje to geometrycznie dokładne odległości, np. 407,04 m dla toru 2 i 437,70 m dla toru 6."},{question:"Dlaczego tor 6 ma długość 437,70 m, a nie 438 m?",answer:"Wartość 438 m jest często używana potocznie lub w zaokrągleniach. Jednak precyzyjne wyliczenie geometryczne z oficjalnej konwencji pomiarowej World Athletics dla standardowej szerokości toru 1,22 m daje dla toru 6 dokładnie 437,70 m na okrążenie. Ta różnica wydaje się mała, ale zapobiega narastaniu błędu przy większej liczbie okrążeń."},{question:"Czy mój plik GPX jest gdzieś przesyłany?",answer:"Nie. Aplikacja działa w 100% lokalnie. Twój plik GPX jest parsowany i analizowany bezpośrednio w przeglądarce. Żadne współrzędne, czasy ani telemetria z analizy nie są wysyłane do backendu tej aplikacji."}]},en:{languageLabel:"Language",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Estimate track distance from lap progress, not raw GPS trace length.",heroIntro:"Upload a GPX file, choose a lane, and compute the corrected distance locally in the browser.",fileLabel:"GPX file",laneLabel:"Lane",laneOptionLabel:(e,t)=>`Lane ${e} (${t})`,analyzeButton:"Analyze GPX",loadingMessage:"Analyzing GPX locally...",missingFileError:"Choose a GPX file before starting the analysis.",resultEyebrow:"Corrected distance",resultTotalLaps:"Total laps",resultRawDistance:"Raw GPX distance",resultDelta:"Delta",unavailable:"Unavailable",warningsTitle:"Warnings",roundedEyebrow:"Full-laps interpretation",roundedCopy:"If the run was planned as full laps only, the nearest interpretation is:",roundedLapsLabel:"Rounded lap count",roundedDistanceLabel:"Rounded corrected distance",errorTitle:"Analysis failed",splitTitle:"Lap times",splitIntro:"Approximate splits derived from full-lap crossings in the lap-progress model.",splitUnavailableTitle:"Lap times are unavailable",splitTableLap:"Lap",splitTableDuration:"Time",splitTableCumulative:"Cumulative",splitTablePace:"Pace",markerTitle:"Distance split times",markerIntro:"Times for each 5 km threshold derived from the same lap-progress model.",markerTableDistance:"Distance",markerTableTime:"Time",traceTitle:"Trace in local coordinates",traceIntro:"The plot shows the recorded trace geometry projected into a local metric plane.",footerAuthorLabel:"Author",faqEyebrow:"Methodology and privacy",faqTitle:"Frequently Asked Questions (FAQ)",faqIntro:"In short: distance comes from lap progress plus official lane length, and the GPX file is analyzed locally in the browser.",faqItems:[{question:"Why is my GPS watch distance inaccurate on a running track?",answer:"GPS watches experience drift and signal jitter when running repeated tight curves on an athletics track, which typically inflates the recorded distance. This tool fixes that by calculating distance strictly from the number of completed laps and your selected lane's official length."},{question:"How is each lane length determined on a standard track?",answer:"Distances follow the official World Athletics measurement convention for a certified 400 m track. Lane 1 is exactly 400.00 m, measured along a line 0.30 m from the inside kerb. Outer lanes are measured along a line 0.20 m from their inner lane lines. For standard 1.22 m lane widths, that geometry yields precise lengths such as 407.04 m for lane 2 and 437.70 m for lane 6."},{question:"Why is lane 6 measured as 437.70 m instead of 438 m?",answer:"Rounded values like 438 m are common informally. However, the precise geometric calculation based on the official World Athletics measurement convention for standard 1.22 m lane widths yields exactly 437.70 m per lap for lane 6. That difference is small per lap, but it compounds over longer sessions."},{question:"Is my GPX file uploaded to a server?",answer:"No. The application runs entirely client-side. Your GPX file is parsed and analyzed directly in the browser. No coordinates, timestamps, or analysis telemetry are sent to this app's backend."}]}},Re={pl:{missing_timestamps:"Brakuje części lub wszystkich znaczników czasu GPX; wykrywanie skoków na podstawie prędkości może być ograniczone.",duplicate_points:"W śladzie wykryto i pominięto zduplikowane punkty.",gps_jumps:"W śladzie wykryto i pominięto skoki GPS.",long_gaps:"Wykryto długie przerwy w nagraniu.",few_usable_points:"Ślad ma mało użytecznych punktów, więc oszacowanie okrążeń może być słabe.",high_outlier_rate:"Ponad 5% punktów zostało oznaczonych jako odstające.",noisy_direction_changes:"Kierunek ruchu jest zaszumiony; sprawdź, czy GPX nie zawiera fragmentów poza stadionem.",less_than_one_lap:"Wykryto mniej niż jedno okrążenie; skorygowany dystans może być trudny do interpretacji."},en:{missing_timestamps:"Some or all GPX timestamps are missing, so speed-based GPS jump detection may be limited.",duplicate_points:"Duplicate points were detected and ignored in the trace.",gps_jumps:"GPS jumps were detected and ignored in the trace.",long_gaps:"Long recording gaps were detected.",few_usable_points:"The trace has few usable points, so lap estimation may be weak.",high_outlier_rate:"More than 5% of points were marked as outliers.",noisy_direction_changes:"Direction changes are noisy; check whether the GPX file contains sections outside the track.",less_than_one_lap:"Less than one lap was detected, so the corrected distance may be hard to interpret."}},Fe={pl:{invalid_lane:"Tor musi być liczbą od 1 do 8.",invalid_gpx_xml:"Wybrany plik nie jest poprawnym XML.",no_track_points:"Nie znaleziono poprawnych punktów śladu GPX.",not_enough_points:"Plik GPX nie zawiera wystarczającej liczby użytecznych punktów do oszacowania okrążeń.",unable_to_estimate_laps:"Nie udało się wyliczyć postępu po okrążeniach z tego śladu GPX.",file_read_failed:"Nie udało się odczytać wybranego pliku GPX.",unknown_analysis_error:"Nieznany błąd analizy."},en:{invalid_lane:"Lane must be a number from 1 to 8.",invalid_gpx_xml:"The selected file is not valid XML.",no_track_points:"No valid GPX track points were found.",not_enough_points:"The GPX file does not contain enough usable points to estimate laps.",unable_to_estimate_laps:"Lap progress could not be derived from this GPX trace.",file_read_failed:"The selected GPX file could not be read.",unknown_analysis_error:"Unknown analysis error."}},We={pl:{missing_timestamps:"Plik GPX nie zawiera pełnych znaczników czasu dla użytecznych punktów.",non_monotonic_timestamps:"Znaczniki czasu nie są ściśle rosnące, więc splity byłyby niewiarygodne.",less_than_one_full_lap:"Do pokazania splitów potrzebne jest co najmniej jedno pełne okrążenie."},en:{missing_timestamps:"The GPX file does not contain complete timestamps for the usable points.",non_monotonic_timestamps:"Timestamps are not strictly increasing, so splits would be unreliable.",less_than_one_full_lap:"At least one full lap is required before split times can be shown."}};function v(e){return e==="pl"?"pl-PL":"en-US"}function Be(e,t){return Re[t][e]}function He(e,t){return Fe[t][e]}function Ue(e,t){return We[t][e]}function Ye(){return typeof navigator>"u"?"en":[navigator.language,...navigator.languages].filter(t=>typeof t=="string").map(t=>t.toLowerCase()).some(t=>t==="pl"||t.startsWith("pl-"))?"pl":"en"}function I(e,t){return`${Math.round(e).toLocaleString(v(t))} m`}function Ke(e,t){return`${e>0?"+":""}${Math.round(e).toLocaleString(v(t))} m`}function Je(e,t){return`${e.toLocaleString(v(t),{minimumFractionDigits:3,maximumFractionDigits:3})} m`}function Qe(e,t){return e.toLocaleString(v(t),{minimumFractionDigits:2,maximumFractionDigits:2})}function D(e){const t=Math.max(0,Math.round(e)),a=Math.floor(t/3600),n=Math.floor(t%3600/60),s=t%60;return a>0?`${a}:${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${n}:${String(s).padStart(2,"0")}`}function Ze(e){return`${D(e)}/km`}function Ve(e,t){return e%1e3===0?`${(e/1e3).toLocaleString(v(t))} km`:I(e,t)}function U(e,t=e,a=640,n=280,s=18){if(e.length===0)return"";const o=t.map(f=>f.x),i=t.map(f=>f.y),c=Math.min(...o),d=Math.max(...o),l=Math.min(...i),r=Math.max(...i),p=Math.max(d-c,1),y=Math.max(r-l,1),h=Math.min((a-s*2)/p,(n-s*2)/y);return e.map((f,u)=>{const _=s+(f.x-c)*h,g=n-s-(f.y-l)*h;return`${u===0||f.segmentIndex!==e[u-1].segmentIndex?"M":"L"}${_.toFixed(1)} ${g.toFixed(1)}`}).join(" ")}function et(e,t,a="pl"){const n=j[a],s=e.raw_distance_m===null?n.unavailable:I(e.raw_distance_m,a),o=e.delta_m===null?n.unavailable:Ke(e.delta_m,a),i=Xe(e.total_laps,t),c=e.warnings.length>0?`<section class="panel warning-panel" aria-label="${n.warningsTitle}">
          <h2>${n.warningsTitle}</h2>
          <ul>${e.warnings.map(u=>`<li>${Be(u,a)}</li>`).join("")}</ul>
        </section>`:"",d=i===null?"":`<section class="secondary-result" data-testid="rounded-interpretation">
          <p class="secondary-eyebrow">${n.roundedEyebrow}</p>
          <p class="secondary-copy">${n.roundedCopy}</p>
          <dl class="secondary-grid">
            <div>
              <dt>${n.roundedLapsLabel}</dt>
              <dd data-testid="rounded-laps">${i.rounded_laps}</dd>
            </div>
            <div>
              <dt>${n.roundedDistanceLabel}</dt>
              <dd data-testid="rounded-distance">${I(i.corrected_distance_m,a)}</dd>
            </div>
          </dl>
        </section>`,l=e.lap_splits.length>0?`<section class="panel splits-panel" data-testid="lap-splits">
          <h2>${n.splitTitle}</h2>
          <p class="support-copy">${n.splitIntro}</p>
          <table>
            <thead>
              <tr>
                <th>${n.splitTableLap}</th>
                <th>${n.splitTableDuration}</th>
                <th>${n.splitTableCumulative}</th>
                <th>${n.splitTablePace}</th>
              </tr>
            </thead>
            <tbody>
              ${e.lap_splits.map(u=>`<tr>
                    <td>${u.lap_index}</td>
                    <td>${D(u.duration_s)}</td>
                    <td>${D(u.cumulative_time_s)}</td>
                    <td>${Ze(u.duration_s/(t/1e3))}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:`<section class="panel muted-panel splits-panel" data-testid="lap-splits-unavailable">
          <h2>${n.splitUnavailableTitle}</h2>
          <p>${Ue(e.split_suppression_reason??"less_than_one_full_lap",a)}</p>
        </section>`,r=e.distance_markers.length>0?`<section class="panel splits-panel" data-testid="distance-markers">
          <h2>${n.markerTitle}</h2>
          <p class="support-copy">${n.markerIntro}</p>
          <table>
            <thead>
              <tr>
                <th>${n.markerTableDistance}</th>
                <th>${n.markerTableTime}</th>
              </tr>
            </thead>
            <tbody>
              ${e.distance_markers.map(u=>`<tr>
                    <td>${Ve(u.distance_m,a)}</td>
                    <td>${D(u.cumulative_time_s)}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:"",p=U(e.trace_points),y=e.trace_points.filter(u=>!u.isOutlier),h=U(y,e.trace_points),f=`<section class="panel trace-panel" data-testid="trace-plot-panel">
      <h2>${n.traceTitle}</h2>
      <p class="support-copy">${n.traceIntro}</p>
      <svg
        data-testid="trace-plot"
        class="trace-plot"
        viewBox="0 0 640 280"
        role="img"
        aria-label="${n.traceTitle}"
      >
        <path d="${p}" data-testid="trace-path-raw" class="trace-path-raw" />
        <path d="${h}" data-testid="trace-path" class="trace-path-usable" />
      </svg>
    </section>`;return`
    <section class="result-card" aria-live="polite">
      <p class="eyebrow">${n.resultEyebrow}</p>
      <strong data-testid="corrected-distance">${I(e.corrected_distance_m,a)}</strong>
      <dl>
        <div>
          <dt>${n.resultTotalLaps}</dt>
          <dd data-testid="total-laps">${Qe(e.total_laps,a)}</dd>
        </div>
        <div>
          <dt>${n.resultRawDistance}</dt>
          <dd data-testid="raw-distance">${s}</dd>
        </div>
        <div>
          <dt>${n.resultDelta}</dt>
          <dd data-testid="delta">${o}</dd>
        </div>
      </dl>
      ${d}
    </section>
    ${l}
    ${r}
    ${f}
    ${c}
  `}function tt(e,t){return`<section class="panel error-panel" role="alert"><h2>${j[t].errorTitle}</h2><p>${e}</p></section>`}function nt(e){return typeof e.text=="function"?e.text():new Promise((t,a)=>{const n=new FileReader;n.addEventListener("load",()=>t(String(n.result??""))),n.addEventListener("error",()=>a(new T("file_read_failed"))),n.readAsText(e)})}function at(){return`
    <section class="toolbar">
      <div class="language-switch">
        <span class="switch-label" data-testid="language-label"></span>
        <div class="switch-buttons" role="group" aria-label="Language switch">
          <button data-testid="language-pl" type="button" class="switch-button" data-language="pl">PL</button>
          <button data-testid="language-en" type="button" class="switch-button" data-language="en">EN</button>
        </div>
      </div>
    </section>

    <section class="hero">
      <p class="eyebrow" data-testid="hero-eyebrow"></p>
      <p class="hero-subtitle" data-testid="hero-subtitle"></p>
      <h1 data-testid="hero-title"></h1>
      <p class="intro" data-testid="hero-intro"></p>
    </section>

    <form class="panel form-panel" data-testid="analysis-form">
      <label>
        <span data-testid="file-label"></span>
        <input data-testid="file-input" name="file" type="file" accept=".gpx,application/gpx+xml,application/xml,text/xml" required />
      </label>

      <label>
        <span data-testid="lane-label"></span>
        <select data-testid="lane-select" name="lane" required></select>
      </label>

      <button data-testid="analyze-button" type="submit"></button>
    </form>

    <section class="state" data-testid="state"></section>

    <section class="panel faq-panel" data-testid="faq-panel">
      <div class="faq-header">
        <p class="eyebrow faq-eyebrow" data-testid="faq-eyebrow"></p>
        <h2 data-testid="faq-title"></h2>
        <p class="faq-intro" data-testid="faq-intro"></p>
      </div>
      <div class="faq-grid" data-testid="faq-items"></div>
    </section>

    <footer class="app-footer">
      <p class="footer-text">
        <a
          href="https://piotrkacala.pl"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-author-link"
        >
          <span data-testid="footer-author-label"></span>: <strong>Piotr Kacała</strong>
        </a>
      </p>
    </footer>
  `}function st(){return{status:"idle"}}function ot(e){e.innerHTML=at();const t=e.querySelector("[data-testid='language-label']"),a=e.querySelector("[data-testid='hero-eyebrow']"),n=e.querySelector("[data-testid='hero-subtitle']"),s=e.querySelector("[data-testid='hero-title']"),o=e.querySelector("[data-testid='hero-intro']"),i=e.querySelector("[data-testid='file-label']"),c=e.querySelector("[data-testid='lane-label']"),d=e.querySelector("[data-testid='analyze-button']"),l=e.querySelector("[data-testid='analysis-form']"),r=e.querySelector("[data-testid='state']"),p=e.querySelector("[data-testid='footer-author-label']"),y=e.querySelector("[data-testid='file-input']"),h=e.querySelector("[data-testid='lane-select']"),f=e.querySelectorAll("[data-language]"),u=e.querySelector("[data-testid='faq-eyebrow']"),_=e.querySelector("[data-testid='faq-title']"),g=e.querySelector("[data-testid='faq-intro']"),b=e.querySelector("[data-testid='faq-items']");if(!t||!a||!n||!s||!o||!i||!c||!d||!l||!r||!p||!y||!h||f.length===0||!u||!_||!g||!b)throw new Error("Application root is missing required UI elements.");const P=t,E=a,ee=n,te=s,ne=o,ae=i,se=c,oe=d,re=l,$=r,ie=p,le=y,q=h,N=Array.from(f),ce=u,de=_,ue=g,pe=b;let z=Ye(),k=st();function X(){const m=j[z],x=q.value||"1";document.documentElement.lang=z,P.textContent=m.languageLabel,E.textContent=m.heroBrand,ee.textContent=m.heroSubtitle,te.textContent=m.heroTitle,ne.textContent=m.heroIntro,ae.textContent=m.fileLabel,se.textContent=m.laneLabel,oe.textContent=m.analyzeButton,ie.textContent=m.footerAuthorLabel,ce.textContent=m.faqEyebrow,de.textContent=m.faqTitle,ue.textContent=m.faqIntro,pe.innerHTML=m.faqItems.map((w,L)=>`<article class="faq-item">
            <p class="faq-index">${String(L+1).padStart(2,"0")}</p>
            <h3>${w.question}</h3>
            <p>${w.answer}</p>
          </article>`).join(""),q.innerHTML=Object.entries(J).map(([w,L])=>`<option value="${w}">${m.laneOptionLabel(Number(w),Je(L,z))}</option>`).join(""),q.value=x,N.forEach(w=>{const M=w.dataset.language===z;w.setAttribute("aria-pressed",String(M)),w.classList.toggle("is-active",M)})}function S(){if(k.status==="idle"){$.innerHTML="";return}if(k.status==="loading"){$.innerHTML=`<section class="panel muted-panel" aria-live="polite">${j[z].loadingMessage}</section>`;return}if(k.status==="error"){$.innerHTML=tt(k.message,z);return}$.innerHTML=et(k.result,k.laneLengthM,z)}function me(m){z=m,X(),S()}X(),S(),N.forEach(m=>{m.addEventListener("click",()=>{const x=m.dataset.language;me(x)})}),re.addEventListener("submit",async m=>{m.preventDefault(),k={status:"loading"},S();const x=le.files?.[0],w=Number(q.value);if(!x){k={status:"error",message:j[z].missingFileError},S();return}try{const L=await nt(x);k={status:"success",result:Ge(L,w),laneLengthM:Number(Q(w))}}catch(L){const M=Le(L);k={status:"error",message:He(M.code,z)}}S()})}const Y=document.querySelector("#app");Y&&ot(Y);
