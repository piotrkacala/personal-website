(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const J=6371e3;function G(e){return e*Math.PI/180}function Se(e){if(e.length===0)return[];const t=G(e[0].lat),n=G(e[0].lon),a=Math.cos(t);return e.map(s=>{const o=G(s.lat),l=G(s.lon);return{...s,x:J*a*(l-n),y:J*(o-t),isDuplicate:!1,isSpeedOutlier:!1,isOutlier:!1}})}function I(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}const ve=.5,$e=10,Ee=80,Me=.35,Q=12,Ie=2.5,Ae=1.5;function qe(e){const t=[...e].sort((a,s)=>a-s),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function Z(e,t){return`${e},${t}`}function De(e,t){const n=t,a=new Map;for(const s of e){const o=Math.floor(s.x/n),l=Math.floor(s.y/n),r=Z(o,l),i=a.get(r);i?i.push(s):a.set(r,[s])}return e.map(s=>{const o=Math.floor(s.x/n),l=Math.floor(s.y/n);let r=0;for(let i=-1;i<=1;i+=1)for(let c=-1;c<=1;c+=1){const u=a.get(Z(o+i,l+c));if(u)for(const h of u)I(s,h)<=t&&(r+=1)}return r})}function K(e,t){return!e||!t?null:(t.getTime()-e.getTime())/1e3}function F(e,t){if(e.segmentIndex!==t.segmentIndex)return null;const n=K(e.time,t.time);return n===null||n<=0?null:I(e,t)/n}function Oe(e){const t=e.slice(1).flatMap((l,r)=>{const i=F(e[r],l);return i===null?[]:[i]});if(t.length===0)return new Set;const n=qe(t),a=Math.max(Q,n*Ie),s=Math.max(Q,n*Ae),o=new Set;for(let l=1;l<e.length-1;l+=1){const r=e[l-1],i=e[l],c=e[l+1];if(r.segmentIndex!==i.segmentIndex||i.segmentIndex!==c.segmentIndex)continue;const u=F(r,i),h=F(i,c),p=K(r.time,c.time);if(u===null||h===null||p===null||p<=0)continue;const g=I(r,c)/p;u>a&&h>a&&g<=s&&o.add(i.pointIndex)}return o}function Ge(e){let t=0,n=0,a=0,s=null;const o=e.map((d,m)=>{if(m===0)return d.time&&(s=d.time),{...d};const w=e[m-1],f=d.segmentIndex===w.segmentIndex,C=f?I(w,d):0,S=f?K(w.time,d.time):null,v=f&&C<=ve,X=S!==null&&S>$e;let $=!1;d.time&&s&&d.time.getTime()<=s.getTime()&&($=!0),v&&(t+=1),X&&(a+=1),$&&(n+=1);const q=v||$;return!q&&d.time&&(s=d.time),{...d,isDuplicate:v,isSpeedOutlier:!1,isOutlier:q}}),l=o.filter(d=>!d.isOutlier),r=Oe(l),i=o.map(d=>r.has(d.pointIndex)?{...d,isSpeedOutlier:!0,isOutlier:!0}:d),c=i.filter(d=>!d.isOutlier),u=le(c),h=new Set(u.map(d=>d.pointIndex));let p=0;const g=i.map(d=>d.isOutlier?d:u.length>=8&&!h.has(d.pointIndex)?(p+=1,{...d,isOutlier:!0}):d);return{points:g,summary:{duplicateCount:t,speedOutlierCount:r.size,timestampOutlierCount:n,densityOutlierCount:p,totalOutlierCount:g.filter(d=>d.isOutlier).length,longGapCount:a,usablePointCount:g.filter(d=>!d.isOutlier).length}}}function Ne(e){return e.filter(t=>!t.isOutlier)}function le(e){if(e.length===0)return[];const t=De(e,Ee),n=Math.max(...t);if(n===0)return e;const a=Me*n;return e.filter((s,o)=>t[o]>=a)}class z extends Error{code;constructor(t,n){super(n??t),this.name="AnalysisError",this.code=t}}function Re(e){return e instanceof z?e:new z("unknown_analysis_error")}function ee(e,t){return Array.from(e.querySelectorAll("*")).filter(n=>n.localName.toLowerCase()===t)}function te(e,t){return Array.from(e.children).find(a=>a.localName.toLowerCase()===t)?.textContent?.trim()??null}function Xe(e){if(e===null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Fe(e){if(e===null||e==="")return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function We(e){const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))throw new z("invalid_gpx_xml");const a=ee(t,"trkseg"),s=a.length>0?a:[t.documentElement],o=[];if(s.forEach((l,r)=>{ee(l,"trkpt").forEach(c=>{const u=c.getAttribute("lat")?.trim(),h=c.getAttribute("lon")?.trim();if(!u||!h)return;const p=Number(u),g=Number(h);!Number.isFinite(p)||!Number.isFinite(g)||Math.abs(p)>90||Math.abs(g)>180||o.push({lat:p,lon:g,ele:Xe(te(c,"ele")),time:Fe(te(c,"time")),segmentIndex:r,pointIndex:o.length})})}),o.length===0)throw new z("no_track_points");return o}const ce={1:400,2:407.038,3:414.704,4:422.37,5:430.034,6:437.7,7:445.366,8:453.032};function Be(e){return Number.isInteger(e)&&e>=1&&e<=8}function de(e){if(!Be(e))throw new z("invalid_lane");return ce[e]}const He=.15;function ae(e){const t=[...e].sort((a,s)=>a-s),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function Ue(e){if(e.length===0)return[];const t=[e[0]];for(let n=1;n<e.length;n+=1){let a=e[n]-e[n-1];for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;t.push(t[n-1]+a)}return t}function W(e,t,n,a,s){let o=t[n],l=e[n],r=n;for(let i=n+1;i<=a;i+=1){const c=e[i];(s>0?c>l:c<l)&&(o+=Math.abs(c-l),l=c,r=i),t[i]=o}return{travel:o,extreme:l,extremeIndex:r}}function Ke(e,t=He){if(e.length===0)return{progress:[],initialDirection:1,directionChanges:0};const n=Array.from({length:e.length},()=>0);let a=0,s=1,o=e[0],l=0,r=0,i=0;for(let c=1;c<e.length;c+=1){const u=e[c];if(a===0){if(Math.abs(u-e[0])<t)continue;a=u>e[0]?1:-1,s=a;const g=W(e,n,0,c,a);r=g.travel,o=g.extreme,l=g.extremeIndex;continue}if(a>0?u>o:u<o){r+=Math.abs(u-o),o=u,l=c,n[c]=r;continue}if(Math.abs(u-o)<t){n[c]=r;continue}a=a===1?-1:1,i+=1;const p=W(e,n,l,c,a);r=p.travel,o=p.extreme,l=p.extremeIndex}return a===0&&(s=e[e.length-1]-e[0]>=0?1:-1,W(e,n,0,e.length-1,s)),{progress:n,initialDirection:s,directionChanges:i}}function Ye(e){return e.length===0?[]:e.map(t=>t/(2*Math.PI))}function Ve(e){if(e.length<8)throw new z("not_enough_points");const t=le(e),n=t.length>=8?t:e,a=ae(n.map(p=>p.x)),s=ae(n.map(p=>p.y)),o=e.map(p=>Math.atan2(p.y-s,p.x-a)),l=Ue(o),r=Ke(l),i=Ye(r.progress),c=i[i.length-1],u=r.progress[r.progress.length-1],h=r.initialDirection>=0?"ccw":"cw";if(!Number.isFinite(c)||c<=0)throw new z("unable_to_estimate_laps");return{total_laps:c,direction:h,center_x:a,center_y:s,angle_delta_rad:u,directionChanges:r.directionChanges,progress_samples:i}}const H=1e-9,B=5e3;function Je(e){for(let t=1;t<e.length;t+=1){const n=e[t-1].time,a=e[t].time;if(!n||!a||a.getTime()<=n.getTime())return!1}return!0}function ue(e){return e.some(t=>t.time===null)?{startTimeMs:0,suppression_reason:"missing_timestamps"}:Je(e)?{startTimeMs:e[0].time?.getTime()??0,suppression_reason:null}:{startTimeMs:0,suppression_reason:"non_monotonic_timestamps"}}function pe(e,t,n){const a=[];let s=0;for(let o=1;o<e.length&&s<n.length;o+=1){const l=t[o-1],r=t[o],i=e[o-1].time,c=e[o].time;if(!(i===null||c===null||r<l||c.getTime()<=i.getTime()))for(;s<n.length&&r+H>=n[s];){const u=n[s],h=r-l,p=h<=H?0:(u-l)/h,g=i.getTime()+p*(c.getTime()-i.getTime());a.push(g),s+=1}}return a.length===n.length?a:null}function Qe(e,t){const n=Math.floor(t[t.length-1]+H);if(n<1)return{lap_splits:[],suppression_reason:"less_than_one_full_lap"};const a=ue(e);if(a.suppression_reason)return{lap_splits:[],suppression_reason:a.suppression_reason};const s=Array.from({length:n},(l,r)=>r+1),o=pe(e,t,s);return o===null?{lap_splits:[],suppression_reason:"non_monotonic_timestamps"}:{lap_splits:o.map((l,r)=>{const i=r===0?a.startTimeMs:o[r-1];return{lap_index:r+1,duration_s:(l-i)/1e3,cumulative_time_s:(l-a.startTimeMs)/1e3}}),suppression_reason:null}}function Ze(e,t,n){const a=ue(e);if(a.suppression_reason)return[];const s=t[t.length-1]*n,o=Math.floor(s/B);if(o<1)return[];const l=Array.from({length:o},(i,c)=>(c+1)*B/n),r=pe(e,t,l);return r===null?[]:r.map((i,c)=>({distance_m:(c+1)*B,cumulative_time_s:(i-a.startTimeMs)/1e3}))}const ne=1e-9;function et(e){return e.every(t=>t.time!==null)}function tt(e){let t=0,n=0;for(let a=1;a<e.length;a+=1){const s=e[a-1],o=e[a];s.segmentIndex===o.segmentIndex&&(t+=I(s,o),n+=1)}return n>0?t:null}function at(e){if(e.length<2||e.some(a=>a.time===null))return null;const t=e[0].time,n=e[e.length-1].time;return!t||!n||n.getTime()<=t.getTime()?null:(n.getTime()-t.getTime())/1e3}function nt(e){const t=[],n=e.totalPoints>0?e.totalOutlierCount/e.totalPoints:0;return et(e.parsedPoints)||t.push("missing_timestamps"),e.duplicateCount>0&&t.push("duplicate_points"),e.speedOutlierCount>0&&t.push("gps_jumps"),e.longGapCount>0&&t.push("long_gaps"),e.usablePointCount<50&&t.push("few_usable_points"),n>.05&&t.push("high_outlier_rate"),e.directionChanges>Math.max(10,e.totalPoints*.03)&&t.push("noisy_direction_changes"),e.totalLaps<1&&t.push("less_than_one_lap"),t}function st(e,t){const n=de(t),a=We(e),s=Se(a),{points:o,summary:l}=Ge(s),r=Ne(o);if(r.length<8)throw new z("not_enough_points");const i=Ve(r),c=i.total_laps*n,u=Math.floor(i.total_laps+ne),h=Math.max(0,i.total_laps-u),p=tt(o),g=Qe(r,i.progress_samples),d=Ze(r,i.progress_samples,n);return{corrected_distance_m:c,total_laps:i.total_laps,full_laps:u,estimated_partial_lap:h<ne?0:h,total_time_s:at(r),raw_distance_m:p,delta_m:p===null?null:p-c,warnings:nt({parsedPoints:a,usablePointCount:l.usablePointCount,totalPoints:o.length,duplicateCount:l.duplicateCount,speedOutlierCount:l.speedOutlierCount,totalOutlierCount:l.totalOutlierCount,longGapCount:l.longGapCount,directionChanges:i.directionChanges,totalLaps:i.total_laps}),lap_splits:g.lap_splits,split_suppression_reason:g.suppression_reason,distance_markers:d,trace_points:o.map(m=>({x:m.x,y:m.y,segmentIndex:m.segmentIndex,isOutlier:m.isOutlier}))}}const N=18,U=96,se=12,me=82,ot=8;function he(e,t){return e/(t/1e3)}function it(e,t){return t<=1?(N+U)/2:N+e/(t-1)*(U-N)}function rt(e,t){if(e.length===0||!Number.isFinite(t)||t<=0)return null;const n=e.map(m=>he(m.duration_s,t));if(n.some(m=>!Number.isFinite(m)||m<0))return null;const a=Math.min(...n),s=Math.max(...n),o=s-a,l=o>0?Math.max(10,o*.12):30,r=Math.max(0,a-l),i=s+l,c=Math.max(i-r,1),u=m=>se+(m-r)/c*(me-se),h=e.map((m,w)=>({lapIndex:m.lap_index,paceSecondsPerKm:n[w],xPercent:it(w,e.length),yPercent:u(n[w])})),p=[r,r+c/2,i].map(m=>({paceSecondsPerKm:m,yPercent:u(m)})),g=Math.max(1,Math.ceil((e.length-1)/(ot-1))),d=h.filter((m,w)=>w===0||w===h.length-1||w%g===0).map(m=>({lapIndex:m.lapIndex,xPercent:m.xPercent}));return{points:h,yTicks:p,xLabels:d}}const x={leftPercent:N,rightPercent:U,bottomPercent:me},lt=.15,ct=1e-9;function dt(e,t,n=lt){const a=Math.round(e);return a<1||Math.abs(e-a)-n>ct?null:{rounded_laps:a,corrected_distance_m:a*t}}const j={pl:{languageLabel:"Język",languageGroupLabel:"Wybór języka",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Oszacuj dystans z okrążeń, a nie z surowej długości śladu GPS.",heroIntro:"Wgraj plik GPX, wybierz tor i policz skorygowany dystans lokalnie w przeglądarce.",fileLabel:"Plik GPX",laneLabel:"Tor",laneOptionLabel:(e,t)=>`Tor ${e} (${t})`,analyzeButton:"Analizuj GPX",loadingMessage:"Analizuję GPX lokalnie...",missingFileError:"Wybierz plik GPX przed uruchomieniem analizy.",resultEyebrow:"Skorygowany dystans",resultTotalLaps:"Łącznie z estymacją",resultFullLaps:"Pełne okrążenia",resultEstimatedPartialLap:"Szacowana część ostatniego okrążenia",resultTotalTime:"Czas całkowity",resultRawDistance:"Surowy dystans GPX",resultDelta:"Różnica",unavailable:"Niedostępne",warningsTitle:"Ostrzeżenia",roundedEyebrow:"Interpretacja dla pełnych okrążeń",roundedCopy:"Dla biegu zaplanowanego jako same pełne okrążenia najbliższy wynik to:",roundedLapsLabel:"Zaokrąglona liczba okrążeń",roundedDistanceLabel:"Skorygowany dystans po zaokrągleniu",errorTitle:"Analiza nie powiodła się",splitTitle:"Czasy okrążeń",splitIntro:"Przybliżone splity wynikające z przecięć pełnych okrążeń w modelu postępu po bieżni.",splitUnavailableTitle:"Czasy okrążeń są niedostępne",splitTableLap:"Okrążenie",splitTableDuration:"Czas",splitTableCumulative:"Narastająco",splitTablePace:"Tempo",paceChartTitle:"Tempo na ukończonych okrążeniach",paceChartIntro:"Każdy niepołączony punkt oznacza tempo jednego ukończonego okrążenia. Wykres nie pokazuje progresu wewnątrz okrążenia.",paceChartXAxis:"Okrążenie",paceChartYAxis:"Tempo (min/km)",paceChartExactValues:"Dokładne wartości znajdują się w tabeli czasów okrążeń poniżej.",markerTitle:"Międzyczasy dystansowe",markerIntro:"Czasy przecięć kolejnych progów 5 km wyznaczone z tego samego modelu progresu po okrążeniach.",markerTableDistance:"Dystans",markerTableTime:"Czas",traceTitle:"Ślad w lokalnych współrzędnych",traceIntro:"Wykres pokazuje zarejestrowaną geometrię po projekcji do lokalnego układu metrycznego. Nie jest to wygenerowana ani geodezyjnie skorygowana trasa.",traceLegendRaw:"Pełny zarejestrowany ślad, w tym punkty odrzucone",traceLegendUsable:"Punkty użyte do analizy okrążeń",footerAuthorLabel:"Autor",faqEyebrow:"Metodologia i prywatność",faqTitle:"Często zadawane pytania (FAQ)",faqIntro:"Metoda jest najmocniejsza dla ukończonych okrążeń. Estymacja częściowego okrążenia i słabe ślady wymagają ostrożniejszej interpretacji.",faqItems:[{question:"Dlaczego dystans z mojego zegarka GPS jest niedokładny na bieżni lekkoatletycznej?",answer:"Dryf i szum GPS na ciasnych, wielokrotnie powtarzanych łukach często zniekształcają surową długość śladu. 400m traktuje ten dystans tylko jako wartość diagnostyczną i szacuje postęp wokół owalu, ale nie gwarantuje poprawienia każdego nagrania."},{question:"Jak liczony jest skorygowany dystans i która część wyniku jest estymacją?",answer:"Aplikacja zawsze oblicza skorygowany dystans jako oszacowane total_laps pomnożone przez tabelaryczną długość toru wybranego przez użytkownika. Ukończone okrążenia mają silniejsze podstawy topologiczne niż pozycja wewnątrz okrążenia. Część po ostatnim pełnym okrążeniu jest estymacją kątową, więc dokładność mnożenia nie usuwa niepewności tej estymacji."},{question:"Co pokazują kontrolowane testy dokładności?",answer:"W syntetycznych, kontrolowanych śladach 10 okrążeń czyste przypadki dla torów 1 i 6 miały praktycznie zerowy błąd liczby okrążeń i dystansu. Dla toru 8 z deterministycznym szumem współrzędnych 3 m błąd wyniósł 0,00928 okrążenia, czyli 4,202 m. Zaszumiony ślad ze zmianą kierunku po 6 + 4 okrążeniach został odtworzony jako około 10 okrążeń. Są to wyniki konkretnych przypadków testowych, a nie gwarancja dla wszystkich urządzeń i nagrań."},{question:"Co pokazują testy na prawdziwych plikach GPX?",answer:"Trzy prawdziwe nagrania z toru 6 od jednego biegacza służą jako testy regresji. Liczba okrążeń i czasy przecięć zostały zweryfikowane ręcznie, a wyniki analizy są z nimi zgodne."},{question:"Czy zmiana kierunku jest obsługiwana i dlaczego nie ma międzyczasów 200 m lub 100 m?",answer:"Celowe zmiany kierunku po ukończonych okrążeniach są obsługiwane, a przebyty postęp w obu kierunkach jest dodawany zamiast wzajemnie się znosić. Pozycja wewnątrz okrążenia, szczególnie na torach zewnętrznych, ma słabsze podstawy niż topologia pełnej pętli. Dlatego produkt świadomie nie pokazuje międzyczasów 200 m, 100 m ani czasów prostych."},{question:"Kiedy dystans lub timing wymagają większej ostrożności?",answer:"Brakujące lub błędne znaczniki czasu wyłączają pomiary czasu. Długie przerwy pozostają w czasie całkowitym i czasach okrążeń, ale osłabiają ich interpretację. Szum, mała liczba punktów, częściowe okrążenie, dominujący gęsty klaster poza bieżnią albo nieciągłe segmenty mogą pogorszyć wynik. Markery 5 km korzystają z estymacji pozycji wewnątrz okrążenia i na torach zewnętrznych mają znane ograniczenie."},{question:"Jak wyznacza się długość każdego toru na standardowym stadionie?",answer:"Tabela stosuje konwencję pomiarową World Athletics dla standardowej bieżni 400 m: tor 1 ma 400,000 m, a tory zewnętrzne są dłuższe zgodnie z ich oficjalną linią pomiarową. Na przykład tor 6 ma 437,700 m, a nie potocznie zaokrąglone 438 m. Wybrany przez użytkownika tor pozostaje wiążący."},{question:"Czy mój plik GPX jest gdzieś przesyłany?",answer:"Nie. Plik GPX jest parsowany i analizowany w przeglądarce; współrzędne, czasy i wyniki analizy nie są wysyłane do backendu aplikacji. Samo otwarcie strony internetowej wymaga pobrania jej plików z hosta."}]},en:{languageLabel:"Language",languageGroupLabel:"Language selection",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Estimate track distance from lap progress, not raw GPS trace length.",heroIntro:"Upload a GPX file, choose a lane, and compute the corrected distance locally in the browser.",fileLabel:"GPX file",laneLabel:"Lane",laneOptionLabel:(e,t)=>`Lane ${e} (${t})`,analyzeButton:"Analyze GPX",loadingMessage:"Analyzing GPX locally...",missingFileError:"Choose a GPX file before starting the analysis.",resultEyebrow:"Corrected distance",resultTotalLaps:"Total including estimate",resultFullLaps:"Completed laps",resultEstimatedPartialLap:"Estimated final partial lap",resultTotalTime:"Total time",resultRawDistance:"Raw GPX distance",resultDelta:"Delta",unavailable:"Unavailable",warningsTitle:"Warnings",roundedEyebrow:"Full-laps interpretation",roundedCopy:"If the run was planned as full laps only, the nearest interpretation is:",roundedLapsLabel:"Rounded lap count",roundedDistanceLabel:"Rounded corrected distance",errorTitle:"Analysis failed",splitTitle:"Lap times",splitIntro:"Approximate splits derived from full-lap crossings in the lap-progress model.",splitUnavailableTitle:"Lap times are unavailable",splitTableLap:"Lap",splitTableDuration:"Time",splitTableCumulative:"Cumulative",splitTablePace:"Pace",paceChartTitle:"Pace by completed lap",paceChartIntro:"Each unconnected point represents the pace of one completed lap. The chart does not show within-lap progress.",paceChartXAxis:"Lap",paceChartYAxis:"Pace (min/km)",paceChartExactValues:"Exact values are available in the lap-time table below.",markerTitle:"Distance split times",markerIntro:"Times for each 5 km threshold derived from the same lap-progress model.",markerTableDistance:"Distance",markerTableTime:"Time",traceTitle:"Trace in local coordinates",traceIntro:"The plot shows recorded geometry projected into a local metric plane. It is not a generated or survey-corrected route.",traceLegendRaw:"Full recorded trace, including rejected points",traceLegendUsable:"Points used for lap analysis",footerAuthorLabel:"Author",faqEyebrow:"Methodology and privacy",faqTitle:"Frequently Asked Questions (FAQ)",faqIntro:"The method is strongest for completed laps. Partial-lap estimates and weak traces need more cautious interpretation.",faqItems:[{question:"Why is my GPS watch distance inaccurate on a running track?",answer:"GPS drift and signal noise on tight repeated curves often distort raw trace length. 400m treats that distance as a diagnostic value and estimates progress around the oval, but it does not guarantee that every recording will be corrected."},{question:"How is corrected distance calculated, and which part is estimated?",answer:"The app always calculates corrected distance as estimated total_laps multiplied by the tabulated length of the lane selected by the user. Completed laps have stronger topological support than within-lap position. Progress after the last completed lap is an angular estimate, so exact multiplication does not remove uncertainty from that estimate."},{question:"What do controlled accuracy tests show?",answer:"In controlled synthetic 10-lap traces, clean lane 1 and lane 6 cases had effectively zero lap-count and distance error. For lane 8 with deterministic 3 m coordinate noise, the error was 0.00928 lap, equivalent to 4.202 m. A noisy trace reversing direction after 6 + 4 laps was recovered as approximately 10 laps. These are results from specific fixtures, not a guarantee for every device or recording."},{question:"What do tests with real GPX files show?",answer:"Three real lane-6 recordings from one runner are used as regression tests. Their lap counts and crossing times were verified manually, and the analysis results agree with them."},{question:"Are direction changes supported, and why are there no 200 m or 100 m splits?",answer:"Intentional direction changes after completed laps are supported, and traveled progress in both directions is added instead of cancelling out. Within-lap position, especially in outer lanes, has weaker support than full-loop topology. The product therefore deliberately omits 200 m, 100 m, and straight-only timing."},{question:"When should distance or timing be interpreted more cautiously?",answer:"Missing or invalid timestamps disable timing. Long gaps remain in total time and lap splits but weaken their interpretation. Noise, few points, a partial lap, a dominant dense off-track cluster, or discontinuous segments can weaken the result. The 5 km markers use estimated within-lap position and have a known outer-lane limitation."},{question:"How is each lane length determined on a standard track?",answer:"The table follows the World Athletics measurement convention for a standard 400 m track: lane 1 is 400.000 m, while outer lanes are longer according to their official measurement lines. For example, lane 6 is 437.700 m rather than the informal rounded value of 438 m. The lane selected by the user remains authoritative."},{question:"Is my GPX file uploaded to a server?",answer:"No. The GPX file is parsed and analyzed in the browser; coordinates, timestamps, and analysis results are not sent to an application backend. Opening the website itself still downloads its files from the host."}]}},ut={pl:{missing_timestamps:"Brakuje części lub wszystkich znaczników czasu GPX; wykrywanie skoków na podstawie prędkości może być ograniczone.",duplicate_points:"W śladzie wykryto i pominięto zduplikowane punkty.",gps_jumps:"W śladzie wykryto i pominięto skoki GPS.",long_gaps:"Wykryto długie przerwy w nagraniu.",few_usable_points:"Ślad ma mało użytecznych punktów, więc oszacowanie okrążeń może być słabe.",high_outlier_rate:"Ponad 5% punktów zostało oznaczonych jako odstające.",noisy_direction_changes:"Kierunek ruchu jest zaszumiony; sprawdź, czy GPX nie zawiera fragmentów poza stadionem.",less_than_one_lap:"Wykryto mniej niż jedno okrążenie; skorygowany dystans może być trudny do interpretacji."},en:{missing_timestamps:"Some or all GPX timestamps are missing, so speed-based GPS jump detection may be limited.",duplicate_points:"Duplicate points were detected and ignored in the trace.",gps_jumps:"GPS jumps were detected and ignored in the trace.",long_gaps:"Long recording gaps were detected.",few_usable_points:"The trace has few usable points, so lap estimation may be weak.",high_outlier_rate:"More than 5% of points were marked as outliers.",noisy_direction_changes:"Direction changes are noisy; check whether the GPX file contains sections outside the track.",less_than_one_lap:"Less than one lap was detected, so the corrected distance may be hard to interpret."}},pt={pl:{invalid_lane:"Tor musi być liczbą od 1 do 8.",invalid_gpx_xml:"Wybrany plik nie jest poprawnym XML.",no_track_points:"Nie znaleziono poprawnych punktów śladu GPX.",not_enough_points:"Plik GPX nie zawiera wystarczającej liczby użytecznych punktów do oszacowania okrążeń.",unable_to_estimate_laps:"Nie udało się wyliczyć postępu po okrążeniach z tego śladu GPX.",file_read_failed:"Nie udało się odczytać wybranego pliku GPX.",unknown_analysis_error:"Nieznany błąd analizy."},en:{invalid_lane:"Lane must be a number from 1 to 8.",invalid_gpx_xml:"The selected file is not valid XML.",no_track_points:"No valid GPX track points were found.",not_enough_points:"The GPX file does not contain enough usable points to estimate laps.",unable_to_estimate_laps:"Lap progress could not be derived from this GPX trace.",file_read_failed:"The selected GPX file could not be read.",unknown_analysis_error:"Unknown analysis error."}},mt={pl:{missing_timestamps:"Plik GPX nie zawiera pełnych znaczników czasu dla użytecznych punktów.",non_monotonic_timestamps:"Znaczniki czasu nie są ściśle rosnące, więc splity byłyby niewiarygodne.",less_than_one_full_lap:"Do pokazania splitów potrzebne jest co najmniej jedno pełne okrążenie."},en:{missing_timestamps:"The GPX file does not contain complete timestamps for the usable points.",non_monotonic_timestamps:"Timestamps are not strictly increasing, so splits would be unreliable.",less_than_one_full_lap:"At least one full lap is required before split times can be shown."}};function A(e){return e==="pl"?"pl-PL":"en-US"}function ht(e,t){return ut[t][e]}function gt(e,t){return pt[t][e]}function yt(e,t){return mt[t][e]}function ft(){return typeof navigator>"u"?"en":[navigator.language,...navigator.languages].filter(t=>typeof t=="string").map(t=>t.toLowerCase()).some(t=>t==="pl"||t.startsWith("pl-"))?"pl":"en"}function R(e,t){return`${Math.round(e).toLocaleString(A(t))} m`}function wt(e,t){return`${e>0?"+":""}${Math.round(e).toLocaleString(A(t))} m`}function bt(e,t){return`${e.toLocaleString(A(t),{minimumFractionDigits:3,maximumFractionDigits:3})} m`}function oe(e,t){return e.toLocaleString(A(t),{minimumFractionDigits:2,maximumFractionDigits:2})}function L(e){const t=Math.max(0,Math.round(e)),n=Math.floor(t/3600),a=Math.floor(t%3600/60),s=t%60;return n>0?`${n}:${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${a}:${String(s).padStart(2,"0")}`}function ge(e){return`${L(e)}/km`}function _t(e,t){return e%1e3===0?`${(e/1e3).toLocaleString(A(t))} km`:R(e,t)}function ie(e,t=e,n=640,a=280,s=18){if(e.length===0)return"";const o=t.map(d=>d.x),l=t.map(d=>d.y),r=Math.min(...o),i=Math.max(...o),c=Math.min(...l),u=Math.max(...l),h=Math.max(i-r,1),p=Math.max(u-c,1),g=Math.min((n-s*2)/h,(a-s*2)/p);return e.map((d,m)=>{const w=s+(d.x-r)*g,f=a-s-(d.y-c)*g;return`${m===0||d.segmentIndex!==e[m-1].segmentIndex?"M":"L"}${w.toFixed(1)} ${f.toFixed(1)}`}).join(" ")}function zt(e,t,n){const a=rt(e.lap_splits,t);if(!a)return"";const s=j[n],o=a.yTicks.map(i=>`<g>
        <line
          class="pace-chart-grid-line"
          x1="${x.leftPercent}%"
          x2="${x.rightPercent}%"
          y1="${i.yPercent}%"
          y2="${i.yPercent}%"
        />
        <text
          class="pace-chart-tick"
          x="${x.leftPercent-2}%"
          y="${i.yPercent}%"
          text-anchor="end"
          dominant-baseline="middle"
        >${L(i.paceSecondsPerKm)}</text>
      </g>`).join(""),l=a.xLabels.map(i=>`<text
        class="pace-chart-tick"
        x="${i.xPercent}%"
        y="89%"
        text-anchor="middle"
      >${i.lapIndex}</text>`).join(""),r=a.points.map(i=>`<circle
        class="pace-chart-point"
        cx="${i.xPercent}%"
        cy="${i.yPercent}%"
        r="5"
      ><title>${s.splitTableLap} ${i.lapIndex}: ${ge(i.paceSecondsPerKm)}</title></circle>`).join("");return`<section class="panel pace-chart-panel" data-testid="pace-chart-panel">
      <h2 id="pace-chart-title">${s.paceChartTitle}</h2>
      <p id="pace-chart-description" class="support-copy">${s.paceChartIntro}</p>
      <svg
        data-testid="pace-chart"
        class="pace-chart"
        width="100%"
        height="280"
        role="img"
        aria-labelledby="pace-chart-title pace-chart-description"
      >
        <text class="pace-chart-axis-title" x="${x.leftPercent}%" y="7%">
          ${s.paceChartYAxis}
        </text>
        ${o}
        <line
          class="pace-chart-axis"
          x1="${x.leftPercent}%"
          x2="${x.rightPercent}%"
          y1="${x.bottomPercent}%"
          y2="${x.bottomPercent}%"
        />
        ${l}
        ${r}
        <text class="pace-chart-axis-title" x="57%" y="98%" text-anchor="middle">
          ${s.paceChartXAxis}
        </text>
      </svg>
      <p class="visually-hidden">${s.paceChartExactValues}</p>
    </section>`}function kt(e,t,n="pl"){const a=j[n],s=e.raw_distance_m===null?a.unavailable:R(e.raw_distance_m,n),o=e.delta_m===null?a.unavailable:wt(e.delta_m,n),l=e.total_time_s===null?a.unavailable:L(e.total_time_s),r=dt(e.total_laps,t),i=e.warnings.length>0?`<section class="panel warning-panel" aria-label="${a.warningsTitle}">
          <h2>${a.warningsTitle}</h2>
          <ul>${e.warnings.map(f=>`<li>${ht(f,n)}</li>`).join("")}</ul>
        </section>`:"",c=r===null?"":`<section class="secondary-result" data-testid="rounded-interpretation">
          <p class="secondary-eyebrow">${a.roundedEyebrow}</p>
          <p class="secondary-copy">${a.roundedCopy}</p>
          <dl class="secondary-grid">
            <div>
              <dt>${a.roundedLapsLabel}</dt>
              <dd data-testid="rounded-laps">${r.rounded_laps}</dd>
            </div>
            <div>
              <dt>${a.roundedDistanceLabel}</dt>
              <dd data-testid="rounded-distance">${R(r.corrected_distance_m,n)}</dd>
            </div>
          </dl>
        </section>`,u=zt(e,t,n),h=e.lap_splits.length>0?`<section class="panel splits-panel" data-testid="lap-splits">
          <h2>${a.splitTitle}</h2>
          <p class="support-copy">${a.splitIntro}</p>
          <table>
            <thead>
              <tr>
                <th>${a.splitTableLap}</th>
                <th>${a.splitTableDuration}</th>
                <th>${a.splitTableCumulative}</th>
                <th>${a.splitTablePace}</th>
              </tr>
            </thead>
            <tbody>
              ${e.lap_splits.map(f=>`<tr>
                    <td>${f.lap_index}</td>
                    <td>${L(f.duration_s)}</td>
                    <td>${L(f.cumulative_time_s)}</td>
                    <td>${ge(he(f.duration_s,t))}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:`<section class="panel muted-panel splits-panel" data-testid="lap-splits-unavailable">
          <h2>${a.splitUnavailableTitle}</h2>
          <p>${yt(e.split_suppression_reason??"less_than_one_full_lap",n)}</p>
        </section>`,p=e.distance_markers.length>0?`<section class="panel splits-panel" data-testid="distance-markers">
          <h2>${a.markerTitle}</h2>
          <p class="support-copy">${a.markerIntro}</p>
          <table>
            <thead>
              <tr>
                <th>${a.markerTableDistance}</th>
                <th>${a.markerTableTime}</th>
              </tr>
            </thead>
            <tbody>
              ${e.distance_markers.map(f=>`<tr>
                    <td>${_t(f.distance_m,n)}</td>
                    <td>${L(f.cumulative_time_s)}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:"",g=ie(e.trace_points),d=e.trace_points.filter(f=>!f.isOutlier),m=ie(d,e.trace_points),w=`<section class="panel trace-panel" data-testid="trace-plot-panel">
      <h2 id="trace-title">${a.traceTitle}</h2>
      <p id="trace-description" class="support-copy">${a.traceIntro}</p>
      <ul class="trace-legend" aria-label="${a.traceTitle}">
        <li><span class="trace-legend-line trace-legend-line-raw" aria-hidden="true"></span>${a.traceLegendRaw}</li>
        <li><span class="trace-legend-line trace-legend-line-usable" aria-hidden="true"></span>${a.traceLegendUsable}</li>
      </ul>
      <svg
        data-testid="trace-plot"
        class="trace-plot"
        viewBox="0 0 640 280"
        role="img"
        aria-labelledby="trace-title trace-description"
      >
        <path d="${g}" data-testid="trace-path-raw" class="trace-path-raw" />
        <path d="${m}" data-testid="trace-path" class="trace-path-usable" />
      </svg>
    </section>`;return`
    <section class="result-card" data-testid="result-summary" aria-live="polite">
      <p class="eyebrow">${a.resultEyebrow}</p>
      <strong data-testid="corrected-distance">${R(e.corrected_distance_m,n)}</strong>
      <dl>
        <div>
          <dt>${a.resultFullLaps}</dt>
          <dd data-testid="full-laps">${e.full_laps}</dd>
        </div>
        <div>
          <dt>${a.resultEstimatedPartialLap}</dt>
          <dd data-testid="estimated-partial-lap">${oe(e.estimated_partial_lap,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalLaps}</dt>
          <dd data-testid="total-laps">${oe(e.total_laps,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalTime}</dt>
          <dd data-testid="total-time">${l}</dd>
        </div>
        <div>
          <dt>${a.resultRawDistance}</dt>
          <dd data-testid="raw-distance">${s}</dd>
        </div>
        <div>
          <dt>${a.resultDelta}</dt>
          <dd data-testid="delta">${o}</dd>
        </div>
      </dl>
      ${c}
    </section>
    ${u}
    ${h}
    ${p}
    ${w}
    ${i}
  `}function Tt(e,t){const n=e==="missing_file"?j[t].missingFileError:gt(e,t);return`<section class="panel error-panel" role="alert"><h2>${j[t].errorTitle}</h2><p>${n}</p></section>`}function xt(e){return typeof e.text=="function"?e.text():new Promise((t,n)=>{const a=new FileReader;a.addEventListener("load",()=>t(String(a.result??""))),a.addEventListener("error",()=>n(new z("file_read_failed"))),a.readAsText(e)})}function Pt(e){const t=e.querySelector("[data-testid='result-summary']");if(!t)return;const n=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;t.scrollIntoView?.({behavior:n?"auto":"smooth",block:"start"})}function Lt(){return`
    <section class="toolbar">
      <div class="language-switch">
        <span class="switch-label" data-testid="language-label"></span>
        <div class="switch-buttons" data-testid="language-group" role="group" aria-label="">
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
  `}function jt(){return{status:"idle"}}function Ct(e){e.innerHTML=Lt();const t=e.querySelector("[data-testid='language-label']"),n=e.querySelector("[data-testid='language-group']"),a=e.querySelector("[data-testid='hero-eyebrow']"),s=e.querySelector("[data-testid='hero-subtitle']"),o=e.querySelector("[data-testid='hero-title']"),l=e.querySelector("[data-testid='hero-intro']"),r=e.querySelector("[data-testid='file-label']"),i=e.querySelector("[data-testid='lane-label']"),c=e.querySelector("[data-testid='analyze-button']"),u=e.querySelector("[data-testid='analysis-form']"),h=e.querySelector("[data-testid='state']"),p=e.querySelector("[data-testid='footer-author-label']"),g=e.querySelector("[data-testid='file-input']"),d=e.querySelector("[data-testid='lane-select']"),m=e.querySelectorAll("[data-language]"),w=e.querySelector("[data-testid='faq-eyebrow']"),f=e.querySelector("[data-testid='faq-title']"),C=e.querySelector("[data-testid='faq-intro']"),S=e.querySelector("[data-testid='faq-items']");if(!t||!n||!a||!s||!o||!l||!r||!i||!c||!u||!h||!p||!g||!d||m.length===0||!w||!f||!C||!S)throw new Error("Application root is missing required UI elements.");const v=t,X=n,$=a,q=s,ye=o,fe=l,we=r,be=i,_e=c,ze=u,E=h,ke=p,Te=g,D=d,Y=Array.from(m),xe=w,Pe=f,Le=C,je=S;let k=ft(),_=jt();function V(){const y=j[k],P=D.value||"1";document.documentElement.lang=k,v.textContent=y.languageLabel,X.setAttribute("aria-label",y.languageGroupLabel),$.textContent=y.heroBrand,q.textContent=y.heroSubtitle,ye.textContent=y.heroTitle,fe.textContent=y.heroIntro,we.textContent=y.fileLabel,be.textContent=y.laneLabel,_e.textContent=y.analyzeButton,ke.textContent=y.footerAuthorLabel,xe.textContent=y.faqEyebrow,Pe.textContent=y.faqTitle,Le.textContent=y.faqIntro,je.innerHTML=y.faqItems.map((b,T)=>`<article class="faq-item">
            <p class="faq-index">${String(T+1).padStart(2,"0")}</p>
            <h3>${b.question}</h3>
            <p>${b.answer}</p>
          </article>`).join(""),D.innerHTML=Object.entries(ce).map(([b,T])=>`<option value="${b}">${y.laneOptionLabel(Number(b),bt(T,k))}</option>`).join(""),D.value=P,Y.forEach(b=>{const O=b.dataset.language===k;b.setAttribute("aria-pressed",String(O)),b.classList.toggle("is-active",O)})}function M(){if(_.status==="idle"){E.innerHTML="";return}if(_.status==="loading"){E.innerHTML=`<section class="panel muted-panel" aria-live="polite">${j[k].loadingMessage}</section>`;return}if(_.status==="error"){E.innerHTML=Tt(_.code,k);return}E.innerHTML=kt(_.result,_.laneLengthM,k)}function Ce(y){k=y,V(),M()}V(),M(),Y.forEach(y=>{y.addEventListener("click",()=>{const P=y.dataset.language;Ce(P)})}),ze.addEventListener("submit",async y=>{y.preventDefault(),_={status:"loading"},M();const P=Te.files?.[0],b=Number(D.value);if(!P){_={status:"error",code:"missing_file"},M();return}try{const T=await xt(P);_={status:"success",result:st(T,b),laneLengthM:Number(de(b))}}catch(T){_={status:"error",code:Re(T).code}}M(),_.status==="success"&&Pt(E)})}const re=document.querySelector("#app");re&&Ct(re);
