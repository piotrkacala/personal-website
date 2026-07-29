(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const le=6371e3;function W(e){return e*Math.PI/180}function Ne(e){if(e.length===0)return[];const t=W(e[0].lat),n=W(e[0].lon),s=Math.cos(t);return e.map(a=>{const r=W(a.lat),o=W(a.lon);return{...a,x:le*s*(o-n),y:le*(r-t),isDuplicate:!1,isSpeedOutlier:!1,isOutlier:!1}})}function G(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}const Re=.5,Ge=10,Xe=80,Fe=.35,ce=12,He=2.5,Be=1.5;function We(e){const t=[...e].sort((s,a)=>s-a),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function de(e,t){return`${e},${t}`}function Ue(e,t){const n=t,s=new Map;for(const a of e){const r=Math.floor(a.x/n),o=Math.floor(a.y/n),i=de(r,o),l=s.get(i);l?l.push(a):s.set(i,[a])}return e.map(a=>{const r=Math.floor(a.x/n),o=Math.floor(a.y/n);let i=0;for(let l=-1;l<=1;l+=1)for(let c=-1;c<=1;c+=1){const d=s.get(de(r+l,o+c));if(d)for(const u of d)G(a,u)<=t&&(i+=1)}return i})}function se(e,t){return!e||!t?null:(t.getTime()-e.getTime())/1e3}function J(e,t){if(e.segmentIndex!==t.segmentIndex)return null;const n=se(e.time,t.time);return n===null||n<=0?null:G(e,t)/n}function Ke(e){const t=e.slice(1).flatMap((o,i)=>{const l=J(e[i],o);return l===null?[]:[l]});if(t.length===0)return new Set;const n=We(t),s=Math.max(ce,n*He),a=Math.max(ce,n*Be),r=new Set;for(let o=1;o<e.length-1;o+=1){const i=e[o-1],l=e[o],c=e[o+1];if(i.segmentIndex!==l.segmentIndex||l.segmentIndex!==c.segmentIndex)continue;const d=J(i,l),u=J(l,c),h=se(i.time,c.time);if(d===null||u===null||h===null||h<=0)continue;const p=G(i,c)/h;d>s&&u>s&&p<=a&&r.add(l.pointIndex)}return r}function Ye(e){let t=0,n=0,s=0,a=null;const r=e.map((m,_)=>{if(_===0)return m.time&&(a=m.time),{...m};const b=e[_-1],w=m.segmentIndex===b.segmentIndex,y=w?G(b,m):0,I=w?se(b.time,m.time):null,S=w&&y<=Re,N=I!==null&&I>Ge;let L=!1;m.time&&a&&m.time.getTime()<=a.getTime()&&(L=!0),S&&(t+=1),N&&(s+=1),L&&(n+=1);const j=S||L;return!j&&m.time&&(a=m.time),{...m,isDuplicate:S,isSpeedOutlier:!1,isOutlier:j}}),o=r.filter(m=>!m.isOutlier),i=Ke(o),l=r.map(m=>i.has(m.pointIndex)?{...m,isSpeedOutlier:!0,isOutlier:!0}:m),c=l.filter(m=>!m.isOutlier),d=Pe(c),u=new Set(d.map(m=>m.pointIndex));let h=0;const p=l.map(m=>m.isOutlier?m:d.length>=8&&!u.has(m.pointIndex)?(h+=1,{...m,isOutlier:!0}):m);return{points:p,summary:{duplicateCount:t,speedOutlierCount:i.size,timestampOutlierCount:n,densityOutlierCount:h,totalOutlierCount:p.filter(m=>m.isOutlier).length,longGapCount:s,usablePointCount:p.filter(m=>!m.isOutlier).length}}}function Ve(e){return e.filter(t=>!t.isOutlier)}function Pe(e){if(e.length===0)return[];const t=Ue(e,Xe),n=Math.max(...t);if(n===0)return e;const s=Fe*n;return e.filter((a,r)=>t[r]>=s)}class E extends Error{code;constructor(t,n){super(n??t),this.name="AnalysisError",this.code=t}}function Je(e){return e instanceof E?e:new E("unknown_analysis_error")}function ue(e,t){return Array.from(e.querySelectorAll("*")).filter(n=>n.localName.toLowerCase()===t)}function pe(e,t){return Array.from(e.children).find(s=>s.localName.toLowerCase()===t)?.textContent?.trim()??null}function Qe(e){if(e===null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Ze(e){if(e===null||e==="")return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function et(e){const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))throw new E("invalid_gpx_xml");const s=ue(t,"trkseg"),a=s.length>0?s:[t.documentElement],r=[];if(a.forEach((o,i)=>{ue(o,"trkpt").forEach(c=>{const d=c.getAttribute("lat")?.trim(),u=c.getAttribute("lon")?.trim();if(!d||!u)return;const h=Number(d),p=Number(u);!Number.isFinite(h)||!Number.isFinite(p)||Math.abs(h)>90||Math.abs(p)>180||r.push({lat:h,lon:p,ele:Qe(pe(c,"ele")),time:Ze(pe(c,"time")),segmentIndex:i,pointIndex:r.length})})}),r.length===0)throw new E("no_track_points");return r}const Le={1:400,2:407.038,3:414.704,4:422.37,5:430.034,6:437.7,7:445.366,8:453.032};function tt(e){return Number.isInteger(e)&&e>=1&&e<=8}function Me(e){if(!tt(e))throw new E("invalid_lane");return Le[e]}const nt=.15;function me(e){const t=[...e].sort((s,a)=>s-a),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function re(e){if(e.length===0)return[];const t=[e[0]];for(let n=1;n<e.length;n+=1){let s=e[n]-e[n-1];for(;s>Math.PI;)s-=2*Math.PI;for(;s<-Math.PI;)s+=2*Math.PI;t.push(t[n-1]+s)}return t}function Q(e,t,n,s,a){let r=t[n],o=e[n],i=n;for(let l=n+1;l<=s;l+=1){const c=e[l];(a>0?c>o:c<o)&&(r+=Math.abs(c-o),o=c,i=l),t[l]=r}return{travel:r,extreme:o,extremeIndex:i}}function at(e,t=nt){if(e.length===0)return{progress:[],initialDirection:1,directionChanges:0};const n=Array.from({length:e.length},()=>0);let s=0,a=1,r=e[0],o=0,i=0,l=0;for(let c=1;c<e.length;c+=1){const d=e[c];if(s===0){if(Math.abs(d-e[0])<t)continue;s=d>e[0]?1:-1,a=s;const p=Q(e,n,0,c,s);i=p.travel,r=p.extreme,o=p.extremeIndex;continue}if(s>0?d>r:d<r){i+=Math.abs(d-r),r=d,o=c,n[c]=i;continue}if(Math.abs(d-r)<t){n[c]=i;continue}s=s===1?-1:1,l+=1;const h=Q(e,n,o,c,s);i=h.travel,r=h.extreme,o=h.extremeIndex}return s===0&&(a=e[e.length-1]-e[0]>=0?1:-1,Q(e,n,0,e.length-1,a)),{progress:n,initialDirection:a,directionChanges:l}}function st(e){return e.length===0?[]:e.map(t=>t/(2*Math.PI))}function rt(e){if(e.length<8)throw new E("not_enough_points");const t=Pe(e),n=t.length>=8?t:e,s=me(n.map(h=>h.x)),a=me(n.map(h=>h.y)),r=e.map(h=>Math.atan2(h.y-a,h.x-s)),o=re(r),i=at(o),l=st(i.progress),c=l[l.length-1],d=i.progress[i.progress.length-1],u=i.initialDirection>=0?"ccw":"cw";if(!Number.isFinite(c)||c<=0)throw new E("unable_to_estimate_laps");return{total_laps:c,direction:u,center_x:s,center_y:a,angle_delta_rad:d,directionChanges:i.directionChanges,progress_samples:l}}const P=1e-9,it=10,ot=10,lt=.1,he=.15;function ct(e){const t=new Map;for(const n of e){const s=t.get(n.lap_index)??[];s.push(n),t.set(n.lap_index,s)}return[...t.entries()].sort(([n],[s])=>n-s).flatMap(([,n])=>{const s=[...n].sort((a,r)=>a.half_index-r.half_index);return s.length!==2||s[0].half_index!==1||s[1].half_index!==2||s.some(a=>!a.chart_eligible)?[]:s.map(a=>({lap_index:a.lap_index,half_index:a.half_index,duration_s:a.duration_s}))})}function fe(e){const t=[...e].sort((s,a)=>s-a),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function dt(e){const t=[...e].sort((n,s)=>n-s);return t[Math.max(0,Math.ceil(t.length*.9)-1)]}function ut(e){if(e.some(t=>t.time===null))return"missing_timestamps";for(let t=1;t<e.length;t+=1){const n=e[t-1].time,s=e[t].time;if(!n||!s||s.getTime()<=n.getTime())return"non_monotonic_timestamps"}return null}function R(e,t){const n=Math.max(0,Math.min(e.length-1,Math.floor(t))),s=Math.max(0,Math.min(e.length-1,Math.ceil(t))),a=t-n;return e[n]+a*(e[s]-e[n])}function ge(e,t){return{x:R(e.map(n=>n.x),t),y:R(e.map(n=>n.y),t)}}function ye(e,t,n){if(n<=P){const s=e[0]?.time;return s?{position:0,time_ms:s.getTime()}:null}for(let s=1;s<t.length;s+=1){const a=t[s-1],r=t[s];if(a>n+P||r+P<n)continue;const o=e[s-1].time,i=e[s].time;if(!o||!i)return null;const l=r-a,c=l<=P?0:Math.max(0,Math.min(1,(n-a)/l));return{position:s-1+c,time_ms:o.getTime()+c*(i.getTime()-o.getTime())}}return null}function pt(e,t){const n=re(e.map(i=>Math.atan2(i.y-t.center_y,i.x-t.center_x))),s=[];let a=0,r=n[0],o=0;for(let i=1;i<n.length;i+=1){const l=n[i];if(a===0){if(Math.abs(l-n[0])<he)continue;a=l>n[0]?1:-1}if(a>0?l>r:l<r){r=l,o=i;continue}Math.abs(l-r)<he||(s.push(t.progress_samples[o]),a=a===1?-1:1,r=l,o=i)}return s}function mt(e,t,n){return e.some(s=>s>t+P&&s<n-P)}function ht(e){return e.some((t,n)=>n>0&&t-e[n-1]>lt)}function ft(e,t,n){const s=Math.max(1,Math.floor(t)+1),a=Math.min(e.length-1,Math.ceil(n));for(let r=s;r<=a;r+=1){const o=r;if(o>t+P&&o<n-P&&e[r-1].segmentIndex!==e[r].segmentIndex)return!0}return!1}function gt(e,t,n){const s=[],a=[],r=pt(e,t);for(const o of n){const i=o.lap_index-1,l=o.lap_index,c=ye(e,t.progress_samples,i),d=ye(e,t.progress_samples,l);if(!c||!d)return null;if(mt(r,i,l)||ft(e,c.position,d.position)){a.push(o.lap_index);continue}s.push({lapIndex:o.lap_index,start:c,end:d})}return{eligible:s,omitted:a}}function yt(e,t){const n=[];for(const r of t){const o=[];o.push(ge(e,r.start.position));const i=Math.floor(r.start.position)+1,l=Math.ceil(r.end.position)-1;for(let u=i;u<=l;u+=1)o.push({x:e[u].x,y:e[u].y});if(o.push(ge(e,r.end.position)),o.length<8)continue;const c=o.map(u=>u.x),d=o.map(u=>u.y);n.push({x:(Math.min(...c)+Math.max(...c))/2,y:(Math.min(...d)+Math.max(...d))/2})}if(n.length===0)return null;const s=fe(n.map(r=>r.x)),a=fe(n.map(r=>r.y));return{x:s,y:a,p90SpreadM:dt(n.map(r=>Math.hypot(r.x-s,r.y-a)))}}function _t(e,t){const n=e[t].time;if(!n)throw new Error("Half-lap timing requires complete timestamps.");return{position:t,time_ms:n.getTime()}}function wt(e,t,n){return{position:e.position+n*(t.position-e.position),time_ms:e.time_ms+n*(t.time_ms-e.time_ms)}}function bt(e,t,n){const s=R(t,n.start.position),a=R(t,n.end.position),r=a>=s?1:-1;if(r*(a-s)<1.5*Math.PI)return null;const i=[n.start],l=Math.floor(n.start.position)+1,c=Math.ceil(n.end.position)-1;for(let h=l;h<=c;h+=1)i.push(_t(e,h));i.push(n.end);let d=i[0],u=0;for(let h=1;h<i.length;h+=1){const p=i[h],m=R(t,p.position),_=r*(m-s);if(_+P>=Math.PI){const b=_-u;if(b<=P)return p;const w=Math.max(0,Math.min(1,(Math.PI-u)/b));return wt(d,p,w)}d=p,u=_}return null}function _e(e,t,n){const s=Math.max(1,Math.floor(t)+1),a=Math.min(e.length-1,Math.ceil(n));for(let r=s;r<=a;r+=1){const o=e[r-1].time,i=e[r].time;if(!o||!i||(i.getTime()-o.getTime())/1e3>it)return!0}return!1}function xt(e,t,n){const s=ut(e);if(s)return{splits:[],suppression_reason:s,reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(n.length===0)return{splits:[],suppression_reason:"less_than_one_full_lap",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(ht(t.progress_samples))return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:n.map(d=>d.lap_index)};const a=gt(e,t,n);if(!a)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(a.eligible.length===0)return{splits:[],suppression_reason:"no_eligible_completed_laps",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:a.omitted};const r=yt(e,a.eligible);if(!r)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:a.omitted};if(r.p90SpreadM>ot)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:r.x,reference_center_y:r.y,reference_center_p90_spread_m:r.p90SpreadM,omitted_lap_indexes:n.map(d=>d.lap_index)};const o=re(e.map(d=>Math.atan2(d.y-r.y,d.x-r.x))),i=e[0].time?.getTime()??0,l=[],c=[...a.omitted];for(const d of a.eligible){const u=bt(e,o,d);if(!u||u.time_ms<=d.start.time_ms||u.time_ms>=d.end.time_ms){c.push(d.lapIndex);continue}l.push({lap_index:d.lapIndex,half_index:1,duration_s:(u.time_ms-d.start.time_ms)/1e3,cumulative_time_s:(u.time_ms-i)/1e3,chart_eligible:!_e(e,d.start.position,u.position),start_boundary:d.start,end_boundary:u},{lap_index:d.lapIndex,half_index:2,duration_s:(d.end.time_ms-u.time_ms)/1e3,cumulative_time_s:(d.end.time_ms-i)/1e3,chart_eligible:!_e(e,u.position,d.end.position),start_boundary:u,end_boundary:d.end})}return{splits:l,suppression_reason:l.length===0?"unstable_half_lap_geometry":null,reference_center_x:r.x,reference_center_y:r.y,reference_center_p90_spread_m:r.p90SpreadM,omitted_lap_indexes:c.sort((d,u)=>d-u)}}const ee=1e-9,Z=5e3;function zt(e){for(let t=1;t<e.length;t+=1){const n=e[t-1].time,s=e[t].time;if(!n||!s||s.getTime()<=n.getTime())return!1}return!0}function Ee(e){return e.some(t=>t.time===null)?{startTimeMs:0,suppression_reason:"missing_timestamps"}:zt(e)?{startTimeMs:e[0].time?.getTime()??0,suppression_reason:null}:{startTimeMs:0,suppression_reason:"non_monotonic_timestamps"}}function Se(e,t,n){const s=[];let a=0;for(let r=1;r<e.length&&a<n.length;r+=1){const o=t[r-1],i=t[r],l=e[r-1].time,c=e[r].time;if(!(l===null||c===null||i<o||c.getTime()<=l.getTime()))for(;a<n.length&&i+ee>=n[a];){const d=n[a],u=i-o,h=u<=ee?0:(d-o)/u,p=l.getTime()+h*(c.getTime()-l.getTime());s.push(p),a+=1}}return s.length===n.length?s:null}function kt(e,t){const n=Math.floor(t[t.length-1]+ee);if(n<1)return{lap_splits:[],suppression_reason:"less_than_one_full_lap"};const s=Ee(e);if(s.suppression_reason)return{lap_splits:[],suppression_reason:s.suppression_reason};const a=Array.from({length:n},(o,i)=>i+1),r=Se(e,t,a);return r===null?{lap_splits:[],suppression_reason:"non_monotonic_timestamps"}:{lap_splits:r.map((o,i)=>{const l=i===0?s.startTimeMs:r[i-1];return{lap_index:i+1,duration_s:(o-l)/1e3,cumulative_time_s:(o-s.startTimeMs)/1e3}}),suppression_reason:null}}function Tt(e,t,n){const s=Ee(e);if(s.suppression_reason)return[];const a=t[t.length-1]*n,r=Math.floor(a/Z);if(r<1)return[];const o=Array.from({length:r},(l,c)=>(c+1)*Z/n),i=Se(e,t,o);return i===null?[]:i.map((l,c)=>({distance_m:(c+1)*Z,cumulative_time_s:(l-s.startTimeMs)/1e3}))}const we=1e-9;function Pt(e){return e.every(t=>t.time!==null)}function Lt(e){let t=0,n=0;for(let s=1;s<e.length;s+=1){const a=e[s-1],r=e[s];a.segmentIndex===r.segmentIndex&&(t+=G(a,r),n+=1)}return n>0?t:null}function Mt(e){if(e.length<2||e.some(s=>s.time===null))return null;const t=e[0].time,n=e[e.length-1].time;return!t||!n||n.getTime()<=t.getTime()?null:(n.getTime()-t.getTime())/1e3}function Et(e){const t=[],n=e.totalPoints>0?e.totalOutlierCount/e.totalPoints:0;return Pt(e.parsedPoints)||t.push("missing_timestamps"),e.duplicateCount>0&&t.push("duplicate_points"),e.speedOutlierCount>0&&t.push("gps_jumps"),e.longGapCount>0&&t.push("long_gaps"),e.usablePointCount<50&&t.push("few_usable_points"),n>.05&&t.push("high_outlier_rate"),e.directionChanges>Math.max(10,e.totalPoints*.03)&&t.push("noisy_direction_changes"),e.totalLaps<1&&t.push("less_than_one_lap"),t}function St(e,t){const n=Me(t),s=et(e),a=Ne(s),{points:r,summary:o}=Ye(a),i=Ve(r);if(i.length<8)throw new E("not_enough_points");const l=rt(i),c=l.total_laps*n,d=Math.floor(l.total_laps+we),u=Math.max(0,l.total_laps-d),h=Lt(r),p=kt(i,l.progress_samples),m=xt(i,l,p.lap_splits),_=ct(m.splits),b=Tt(i,l.progress_samples,n);return{corrected_distance_m:c,total_laps:l.total_laps,full_laps:d,estimated_partial_lap:u<we?0:u,total_time_s:Mt(i),raw_distance_m:h,delta_m:h===null?null:h-c,warnings:Et({parsedPoints:s,usablePointCount:o.usablePointCount,totalPoints:r.length,duplicateCount:o.duplicateCount,speedOutlierCount:o.speedOutlierCount,totalOutlierCount:o.totalOutlierCount,longGapCount:o.longGapCount,directionChanges:l.directionChanges,totalLaps:l.total_laps}),lap_splits:p.lap_splits,split_suppression_reason:p.suppression_reason,half_lap_splits:_,half_lap_suppression_reason:_.length>0?null:m.suppression_reason??"weak_half_lap_timing",distance_markers:b,trace_points:r.map(w=>({x:w.x,y:w.y,segmentIndex:w.segmentIndex,isOutlier:w.isOutlier}))}}const U=18,te=96,be=12,Ce=82,Ct=8,$t=8,vt=[15,30,60,120,300,600,900,1800,3600];function ne(e,t){return e/(t/1e3)}function xe(e,t,n){return n-t<=0?(U+te)/2:U+(e-t)/(n-t)*(te-U)}function It(e){const t=[...e].sort((s,a)=>s-a),n=Math.floor(t.length/2);return t.length%2===0?(t[n-1]+t[n])/2:t[n]}function jt(e){const t=e/4;return vt.find(n=>n>=t)??Math.ceil(t/3600)*3600}function At(e,t,n=[]){if(e.length===0||!Number.isFinite(t)||t<=0)return null;const s=e.map(f=>ne(f.duration_s,t));if(s.some(f=>!Number.isFinite(f)||f<0))return null;const a=n.filter(f=>Number.isFinite(f.duration_s)&&f.duration_s>0),r=a.map(f=>ne(f.duration_s,t/2)),o=[...s,...r],i=Math.min(...o),l=Math.max(...o),c=l-i,d=c>0?Math.max(10,c*.12):30,u=Math.max(0,i-d),h=l+d,p=Math.max(h-u,1),m=f=>be+(f-u)/p*(Ce-be),_=[...e.map(f=>f.lap_index),...a.map(f=>f.lap_index+(f.half_index===1?-.25:.25))],b=Math.min(..._),w=Math.max(..._),y=e.map((f,z)=>({lapIndex:f.lap_index,paceSecondsPerKm:s[z],xPercent:xe(f.lap_index,b,w),yPercent:m(s[z])})),I=a.map((f,z)=>({lapIndex:f.lap_index,halfIndex:f.half_index,paceSecondsPerKm:r[z],xPercent:xe(f.lap_index+(f.half_index===1?-.25:.25),b,w),yPercent:m(r[z])})),S=It(s),N=m(S),L=jt(c),j=Math.ceil(u/L)*L,F=[];for(let f=j;f<=h;f+=L)F.push({paceSecondsPerKm:f,yPercent:m(f)});const Y=Math.max(1,Math.ceil((e.length-1)/(Ct-1))),C=y.filter((f,z)=>z===0||z===y.length-1||z%Y===0).map(f=>({lapIndex:f.lapIndex,xPercent:f.xPercent}));return C.length>=2&&C.at(-1)?.lapIndex===y.at(-1)?.lapIndex&&(C.at(-1)?.xPercent??0)-(C.at(-2)?.xPercent??0)<$t&&C.splice(-2,1),{points:y,halfLapPoints:I,medianPaceSecondsPerKm:S,medianYPercent:N,yTicks:F,xLabels:C}}const T={leftPercent:U,rightPercent:te,bottomPercent:Ce},qt=.15,Dt=1e-9;function Ot(e,t,n=qt){const s=Math.round(e);return s<1||Math.abs(e-s)-n>Dt?null:{rounded_laps:s,corrected_distance_m:s*t}}const O={pl:{languageLabel:"Język",languageGroupLabel:"Wybór języka",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Oszacuj dystans z okrążeń, a nie z surowej długości śladu GPS.",heroIntro:"Wgraj plik GPX, wybierz tor i policz skorygowany dystans lokalnie w przeglądarce.",fileLabel:"Plik GPX",laneLabel:"Tor",laneOptionLabel:(e,t)=>`Tor ${e} (${t})`,analyzeButton:"Analizuj GPX",loadingMessage:"Analizuję GPX lokalnie...",missingFileError:"Wybierz plik GPX przed uruchomieniem analizy.",resultEyebrow:"Skorygowany dystans",resultTotalLaps:"Łącznie z estymacją",resultFullLaps:"Pełne okrążenia",resultEstimatedPartialLap:"Szacowana część ostatniego okrążenia",resultTotalTime:"Czas całkowity",resultRawDistance:"Surowy dystans GPX",resultDelta:"Różnica",unavailable:"Niedostępne",warningsTitle:"Ostrzeżenia",roundedEyebrow:"Interpretacja dla pełnych okrążeń",roundedCopy:"Dla biegu zaplanowanego jako same pełne okrążenia najbliższy wynik to:",roundedLapsLabel:"Zaokrąglona liczba okrążeń",roundedDistanceLabel:"Skorygowany dystans po zaokrągleniu",errorTitle:"Analiza nie powiodła się",splitTitle:"Czasy okrążeń",splitIntro:"Przybliżone splity wynikające z przecięć pełnych okrążeń w modelu postępu po bieżni.",splitUnavailableTitle:"Czasy okrążeń są niedostępne",splitTableLap:"Okrążenie",splitTableDuration:"Czas",splitTableCumulative:"Narastająco",splitTablePace:"Tempo",paceChartTitle:"Tempo na ukończonych okrążeniach",paceChartIntro:"Pełne punkty pokazują tempo ukończonych okrążeń. Puste punkty mogą pokazywać szacowane tempo ich połówek względem początku nagrania. Pół okrążenia to połowa długości wybranego toru, nie zawsze 200 m.",paceChartXAxis:"Okrążenie",paceChartYAxis:"Tempo (min/km)",paceChartExactValues:"Dokładne wartości w tabeli poniżej dotyczą tylko pełnych okrążeń. Punkty półokrążeń są wyłącznie estymacją wizualną.",paceChartLegendLap:"Pełne okrążenie",paceChartLegendHalf:"Szacowane półokrążenie",paceChartLegendMedian:e=>`Mediana pełnych okrążeń: ${e}`,paceChartHalfPointTitle:(e,t)=>`Szacowane półokrążenie: okrążenie ${e}, połowa ${t}.`,markerTitle:"Międzyczasy dystansowe",markerIntro:"Czasy przecięć kolejnych progów 5 km wyznaczone z tego samego modelu progresu po okrążeniach.",markerTableDistance:"Dystans",markerTableTime:"Czas",traceTitle:"Ślad w lokalnych współrzędnych",traceIntro:"Wykres pokazuje zarejestrowaną geometrię po projekcji do lokalnego układu metrycznego. Nie jest to wygenerowana ani geodezyjnie skorygowana trasa.",traceLegendRaw:"Pełny zarejestrowany ślad, w tym punkty odrzucone",traceLegendUsable:"Punkty użyte do analizy okrążeń",footerAuthorLabel:"Autor",faqEyebrow:"Metodologia i prywatność",faqTitle:"Często zadawane pytania (FAQ)",faqIntro:"Metoda jest najmocniejsza dla ukończonych okrążeń. Estymacja częściowego okrążenia i słabe ślady wymagają ostrożniejszej interpretacji.",faqItems:[{question:"Dlaczego dystans z mojego zegarka GPS jest niedokładny na bieżni lekkoatletycznej?",answer:"Dryf i szum GPS na ciasnych, wielokrotnie powtarzanych łukach często zniekształcają surową długość śladu. 400m traktuje ten dystans tylko jako wartość diagnostyczną i szacuje postęp wokół owalu, ale nie gwarantuje poprawienia każdego nagrania."},{question:"Jak liczony jest skorygowany dystans i która część wyniku jest estymacją?",answer:"Aplikacja zawsze oblicza skorygowany dystans jako oszacowane total_laps pomnożone przez tabelaryczną długość toru wybranego przez użytkownika. Ukończone okrążenia mają silniejsze podstawy topologiczne niż pozycja wewnątrz okrążenia. Część po ostatnim pełnym okrążeniu jest estymacją kątową, więc dokładność mnożenia nie usuwa niepewności tej estymacji."},{question:"Co pokazują kontrolowane testy dokładności?",answer:"W syntetycznych, kontrolowanych śladach 10 okrążeń czyste przypadki dla torów 1 i 6 miały praktycznie zerowy błąd liczby okrążeń i dystansu. Dla toru 8 z deterministycznym szumem współrzędnych 3 m błąd wyniósł 0,00928 okrążenia, czyli 4,202 m. Osobny zaszumiony fixture odtworzył wszystkie 20 referencyjnych granic półokrążeń w limicie 10 m. Są to wyniki syntetycznych przypadków testowych, a nie gwarancja dla wszystkich urządzeń i nagrań."},{question:"Co pokazują testy na prawdziwych plikach GPX?",answer:"Trzy prawdziwe nagrania z toru 6 od jednego biegacza służą jako testy regresji. Liczba okrążeń i czasy przecięć zostały zweryfikowane ręcznie, a wyniki analizy są z nimi zgodne."},{question:"Czy zmiana kierunku jest obsługiwana i dlaczego nie ma międzyczasów 200 m lub 100 m?",answer:"Celowe zmiany kierunku po ukończonych okrążeniach są obsługiwane, a przebyty postęp w obu kierunkach jest dodawany zamiast wzajemnie się znosić. Produkt nie pokazuje dokładnych międzyczasów 200 m, 100 m ani czasów prostych. Może pokazać na wykresie szacowane tempo dwóch połówek ukończonego okrążenia; na torach zewnętrznych taka połowa jest dłuższa niż 200 m."},{question:"Kiedy dystans lub timing wymagają większej ostrożności?",answer:"Brakujące lub błędne znaczniki czasu wyłączają pomiary czasu. Długie przerwy pozostają w czasie całkowitym i czasach okrążeń, ale osłabiają ich interpretację. Szum, mała liczba punktów, częściowe okrążenie, dominujący gęsty klaster poza bieżnią albo nieciągłe segmenty mogą pogorszyć wynik. Markery 5 km korzystają z estymacji pozycji wewnątrz okrążenia i na torach zewnętrznych mają znane ograniczenie."},{question:"Jak wyznacza się długość każdego toru na standardowym stadionie?",answer:"Tabela stosuje konwencję pomiarową World Athletics dla standardowej bieżni 400 m: tor 1 ma 400,000 m, a tory zewnętrzne są dłuższe zgodnie z ich oficjalną linią pomiarową. Na przykład tor 6 ma 437,700 m, a nie potocznie zaokrąglone 438 m. Wybrany przez użytkownika tor pozostaje wiążący."},{question:"Czy mój plik GPX jest gdzieś przesyłany?",answer:"Nie. Plik GPX jest parsowany i analizowany w przeglądarce; współrzędne, czasy i wyniki analizy nie są wysyłane do backendu aplikacji. Samo otwarcie strony internetowej wymaga pobrania jej plików z hosta."}]},en:{languageLabel:"Language",languageGroupLabel:"Language selection",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Estimate track distance from lap progress, not raw GPS trace length.",heroIntro:"Upload a GPX file, choose a lane, and compute the corrected distance locally in the browser.",fileLabel:"GPX file",laneLabel:"Lane",laneOptionLabel:(e,t)=>`Lane ${e} (${t})`,analyzeButton:"Analyze GPX",loadingMessage:"Analyzing GPX locally...",missingFileError:"Choose a GPX file before starting the analysis.",resultEyebrow:"Corrected distance",resultTotalLaps:"Total including estimate",resultFullLaps:"Completed laps",resultEstimatedPartialLap:"Estimated final partial lap",resultTotalTime:"Total time",resultRawDistance:"Raw GPX distance",resultDelta:"Delta",unavailable:"Unavailable",warningsTitle:"Warnings",roundedEyebrow:"Full-laps interpretation",roundedCopy:"If the run was planned as full laps only, the nearest interpretation is:",roundedLapsLabel:"Rounded lap count",roundedDistanceLabel:"Rounded corrected distance",errorTitle:"Analysis failed",splitTitle:"Lap times",splitIntro:"Approximate splits derived from full-lap crossings in the lap-progress model.",splitUnavailableTitle:"Lap times are unavailable",splitTableLap:"Lap",splitTableDuration:"Time",splitTableCumulative:"Cumulative",splitTablePace:"Pace",paceChartTitle:"Pace by completed lap",paceChartIntro:"Filled points show completed-lap pace. Hollow points can show estimated pace for each half relative to the recording start. A half lap is half the selected lane length, not always 200 m.",paceChartXAxis:"Lap",paceChartYAxis:"Pace (min/km)",paceChartExactValues:"Exact values in the table below apply only to completed laps. Half-lap points are a visual estimate only.",paceChartLegendLap:"Completed lap",paceChartLegendHalf:"Estimated half lap",paceChartLegendMedian:e=>`Completed-lap median: ${e}`,paceChartHalfPointTitle:(e,t)=>`Estimated half lap: lap ${e}, half ${t}.`,markerTitle:"Distance split times",markerIntro:"Times for each 5 km threshold derived from the same lap-progress model.",markerTableDistance:"Distance",markerTableTime:"Time",traceTitle:"Trace in local coordinates",traceIntro:"The plot shows recorded geometry projected into a local metric plane. It is not a generated or survey-corrected route.",traceLegendRaw:"Full recorded trace, including rejected points",traceLegendUsable:"Points used for lap analysis",footerAuthorLabel:"Author",faqEyebrow:"Methodology and privacy",faqTitle:"Frequently Asked Questions (FAQ)",faqIntro:"The method is strongest for completed laps. Partial-lap estimates and weak traces need more cautious interpretation.",faqItems:[{question:"Why is my GPS watch distance inaccurate on a running track?",answer:"GPS drift and signal noise on tight repeated curves often distort raw trace length. 400m treats that distance as a diagnostic value and estimates progress around the oval, but it does not guarantee that every recording will be corrected."},{question:"How is corrected distance calculated, and which part is estimated?",answer:"The app always calculates corrected distance as estimated total_laps multiplied by the tabulated length of the lane selected by the user. Completed laps have stronger topological support than within-lap position. Progress after the last completed lap is an angular estimate, so exact multiplication does not remove uncertainty from that estimate."},{question:"What do controlled accuracy tests show?",answer:"In controlled synthetic 10-lap traces, clean lane 1 and lane 6 cases had effectively zero lap-count and distance error. For lane 8 with deterministic 3 m coordinate noise, the error was 0.00928 lap, equivalent to 4.202 m. A separate noisy fixture recovered all 20 reference half-lap boundaries inside the 10 m gate. These are synthetic fixture results, not a guarantee for every device or recording."},{question:"What do tests with real GPX files show?",answer:"Three real lane-6 recordings from one runner are used as regression tests. Their lap counts and crossing times were verified manually, and the analysis results agree with them."},{question:"Are direction changes supported, and why are there no 200 m or 100 m splits?",answer:"Intentional direction changes after completed laps are supported, and traveled progress in both directions is added instead of cancelling out. The product omits exact 200 m, 100 m, and straight-only timing. It may show estimated pace for two halves of an eligible completed lap; in outer lanes each half is longer than 200 m."},{question:"When should distance or timing be interpreted more cautiously?",answer:"Missing or invalid timestamps disable timing. Long gaps remain in total time and lap splits but weaken their interpretation. Noise, few points, a partial lap, a dominant dense off-track cluster, or discontinuous segments can weaken the result. The 5 km markers use estimated within-lap position and have a known outer-lane limitation."},{question:"How is each lane length determined on a standard track?",answer:"The table follows the World Athletics measurement convention for a standard 400 m track: lane 1 is 400.000 m, while outer lanes are longer according to their official measurement lines. For example, lane 6 is 437.700 m rather than the informal rounded value of 438 m. The lane selected by the user remains authoritative."},{question:"Is my GPX file uploaded to a server?",answer:"No. The GPX file is parsed and analyzed in the browser; coordinates, timestamps, and analysis results are not sent to an application backend. Opening the website itself still downloads its files from the host."}]}},Nt={pl:{missing_timestamps:"Brakuje części lub wszystkich znaczników czasu GPX; wykrywanie skoków na podstawie prędkości może być ograniczone.",duplicate_points:"W śladzie wykryto i pominięto zduplikowane punkty.",gps_jumps:"W śladzie wykryto i pominięto skoki GPS.",long_gaps:"Wykryto długie przerwy w nagraniu.",few_usable_points:"Ślad ma mało użytecznych punktów, więc oszacowanie okrążeń może być słabe.",high_outlier_rate:"Ponad 5% punktów zostało oznaczonych jako odstające.",noisy_direction_changes:"Kierunek ruchu jest zaszumiony; sprawdź, czy GPX nie zawiera fragmentów poza stadionem.",less_than_one_lap:"Wykryto mniej niż jedno okrążenie; skorygowany dystans może być trudny do interpretacji."},en:{missing_timestamps:"Some or all GPX timestamps are missing, so speed-based GPS jump detection may be limited.",duplicate_points:"Duplicate points were detected and ignored in the trace.",gps_jumps:"GPS jumps were detected and ignored in the trace.",long_gaps:"Long recording gaps were detected.",few_usable_points:"The trace has few usable points, so lap estimation may be weak.",high_outlier_rate:"More than 5% of points were marked as outliers.",noisy_direction_changes:"Direction changes are noisy; check whether the GPX file contains sections outside the track.",less_than_one_lap:"Less than one lap was detected, so the corrected distance may be hard to interpret."}},Rt={pl:{invalid_lane:"Tor musi być liczbą od 1 do 8.",invalid_gpx_xml:"Wybrany plik nie jest poprawnym XML.",no_track_points:"Nie znaleziono poprawnych punktów śladu GPX.",not_enough_points:"Plik GPX nie zawiera wystarczającej liczby użytecznych punktów do oszacowania okrążeń.",unable_to_estimate_laps:"Nie udało się wyliczyć postępu po okrążeniach z tego śladu GPX.",file_read_failed:"Nie udało się odczytać wybranego pliku GPX.",unknown_analysis_error:"Nieznany błąd analizy."},en:{invalid_lane:"Lane must be a number from 1 to 8.",invalid_gpx_xml:"The selected file is not valid XML.",no_track_points:"No valid GPX track points were found.",not_enough_points:"The GPX file does not contain enough usable points to estimate laps.",unable_to_estimate_laps:"Lap progress could not be derived from this GPX trace.",file_read_failed:"The selected GPX file could not be read.",unknown_analysis_error:"Unknown analysis error."}},Gt={pl:{missing_timestamps:"Plik GPX nie zawiera pełnych znaczników czasu dla użytecznych punktów.",non_monotonic_timestamps:"Znaczniki czasu nie są ściśle rosnące, więc splity byłyby niewiarygodne.",less_than_one_full_lap:"Do pokazania splitów potrzebne jest co najmniej jedno pełne okrążenie."},en:{missing_timestamps:"The GPX file does not contain complete timestamps for the usable points.",non_monotonic_timestamps:"Timestamps are not strictly increasing, so splits would be unreliable.",less_than_one_full_lap:"At least one full lap is required before split times can be shown."}};function X(e){return e==="pl"?"pl-PL":"en-US"}function Xt(e,t){return Nt[t][e]}function Ft(e,t){return Rt[t][e]}function Ht(e,t){return Gt[t][e]}function Bt(){return typeof navigator>"u"?"en":[navigator.language,...navigator.languages].filter(t=>typeof t=="string").map(t=>t.toLowerCase()).some(t=>t==="pl"||t.startsWith("pl-"))?"pl":"en"}function K(e,t){return`${Math.round(e).toLocaleString(X(t))} m`}function Wt(e,t){return`${e>0?"+":""}${Math.round(e).toLocaleString(X(t))} m`}function Ut(e,t){return`${e.toLocaleString(X(t),{minimumFractionDigits:3,maximumFractionDigits:3})} m`}function ze(e,t){return e.toLocaleString(X(t),{minimumFractionDigits:2,maximumFractionDigits:2})}function D(e){const t=Math.max(0,Math.round(e)),n=Math.floor(t/3600),s=Math.floor(t%3600/60),a=t%60;return n>0?`${n}:${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`:`${s}:${String(a).padStart(2,"0")}`}function ae(e){return`${D(e)}/km`}function Kt(e,t){return e%1e3===0?`${(e/1e3).toLocaleString(X(t))} km`:K(e,t)}function ke(e,t=e,n=640,s=280,a=18){if(e.length===0)return"";const r=t.map(m=>m.x),o=t.map(m=>m.y),i=Math.min(...r),l=Math.max(...r),c=Math.min(...o),d=Math.max(...o),u=Math.max(l-i,1),h=Math.max(d-c,1),p=Math.min((n-a*2)/u,(s-a*2)/h);return e.map((m,_)=>{const b=a+(m.x-i)*p,w=s-a-(m.y-c)*p;return`${_===0||m.segmentIndex!==e[_-1].segmentIndex?"M":"L"}${b.toFixed(1)} ${w.toFixed(1)}`}).join(" ")}function Yt(e,t,n,s){const a=At(e.lap_splits,t,s?e.half_lap_splits:[]);if(!a)return"";const r=O[n],o=e.half_lap_splits.some(p=>Number.isFinite(p.duration_s)&&p.duration_s>0),i=a.yTicks.map(p=>`<g>
        <line
          class="pace-chart-grid-line"
          x1="${T.leftPercent}%"
          x2="${T.rightPercent}%"
          y1="${p.yPercent}%"
          y2="${p.yPercent}%"
        />
        <text
          class="pace-chart-tick"
          x="${T.leftPercent-2}%"
          y="${p.yPercent}%"
          text-anchor="end"
          dominant-baseline="middle"
        >${D(p.paceSecondsPerKm)}</text>
      </g>`).join(""),l=a.xLabels.map(p=>`<text
        class="pace-chart-tick"
        x="${p.xPercent}%"
        y="89%"
        text-anchor="middle"
      >${p.lapIndex}</text>`).join(""),c=a.points.map(p=>`<circle
        class="pace-chart-point"
        cx="${p.xPercent}%"
        cy="${p.yPercent}%"
        r="5"
      ><title>${r.splitTableLap} ${p.lapIndex}: ${ae(p.paceSecondsPerKm)}</title></circle>`).join(""),d=a.halfLapPoints.map(p=>`<circle
        class="pace-chart-half-point"
        data-testid="pace-chart-half-point"
        cx="${p.xPercent}%"
        cy="${p.yPercent}%"
        r="4"
      ><title>${r.paceChartHalfPointTitle(p.lapIndex,p.halfIndex)}</title></circle>`).join(""),u=o?`<li>
        <button
          type="button"
          class="pace-chart-legend-toggle"
          data-testid="half-lap-toggle"
          aria-controls="pace-chart-half-points"
          aria-pressed="${s}"
        >
          <span class="pace-chart-legend-point pace-chart-legend-point-half" aria-hidden="true"></span>
          <span>${r.paceChartLegendHalf}</span>
        </button>
      </li>`:"",h=`<ul class="pace-chart-legend" aria-label="${r.paceChartTitle}">
          <li><span class="pace-chart-legend-point pace-chart-legend-point-lap" aria-hidden="true"></span>${r.paceChartLegendLap}</li>
          ${u}
          <li>
            <span class="pace-chart-legend-median" aria-hidden="true"></span>
            ${r.paceChartLegendMedian(ae(a.medianPaceSecondsPerKm))}
          </li>
        </ul>`;return`<section class="panel pace-chart-panel" data-testid="pace-chart-panel">
      <h2 id="pace-chart-title">${r.paceChartTitle}</h2>
      <p id="pace-chart-description" class="support-copy">${r.paceChartIntro}</p>
      ${h}
      <svg
        data-testid="pace-chart"
        class="pace-chart"
        width="100%"
        height="280"
        role="img"
        aria-labelledby="pace-chart-title pace-chart-description"
      >
        <text class="pace-chart-axis-title" x="${T.leftPercent}%" y="7%">
          ${r.paceChartYAxis}
        </text>
        ${i}
        <line
          class="pace-chart-median-line"
          x1="${T.leftPercent}%"
          x2="${T.rightPercent}%"
          y1="${a.medianYPercent}%"
          y2="${a.medianYPercent}%"
        />
        <line
          class="pace-chart-axis"
          x1="${T.leftPercent}%"
          x2="${T.rightPercent}%"
          y1="${T.bottomPercent}%"
          y2="${T.bottomPercent}%"
        />
        ${l}
        ${c}
        <g id="pace-chart-half-points">${d}</g>
        <text class="pace-chart-axis-title" x="57%" y="98%" text-anchor="middle">
          ${r.paceChartXAxis}
        </text>
      </svg>
      <p class="visually-hidden">${r.paceChartExactValues}</p>
    </section>`}function Vt(e,t,n="pl",s=!0){const a=O[n],r=e.raw_distance_m===null?a.unavailable:K(e.raw_distance_m,n),o=e.delta_m===null?a.unavailable:Wt(e.delta_m,n),i=e.total_time_s===null?a.unavailable:D(e.total_time_s),l=Ot(e.total_laps,t),c=e.warnings.length>0?`<section class="panel warning-panel" aria-label="${a.warningsTitle}">
          <h2>${a.warningsTitle}</h2>
          <ul>${e.warnings.map(y=>`<li>${Xt(y,n)}</li>`).join("")}</ul>
        </section>`:"",d=l===null?"":`<section class="secondary-result" data-testid="rounded-interpretation">
          <p class="secondary-eyebrow">${a.roundedEyebrow}</p>
          <p class="secondary-copy">${a.roundedCopy}</p>
          <dl class="secondary-grid">
            <div>
              <dt>${a.roundedLapsLabel}</dt>
              <dd data-testid="rounded-laps">${l.rounded_laps}</dd>
            </div>
            <div>
              <dt>${a.roundedDistanceLabel}</dt>
              <dd data-testid="rounded-distance">${K(l.corrected_distance_m,n)}</dd>
            </div>
          </dl>
        </section>`,u=Yt(e,t,n,s),h=e.lap_splits.length>0?`<section class="panel splits-panel" data-testid="lap-splits">
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
              ${e.lap_splits.map(y=>`<tr>
                    <td>${y.lap_index}</td>
                    <td>${D(y.duration_s)}</td>
                    <td>${D(y.cumulative_time_s)}</td>
                    <td>${ae(ne(y.duration_s,t))}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:`<section class="panel muted-panel splits-panel" data-testid="lap-splits-unavailable">
          <h2>${a.splitUnavailableTitle}</h2>
          <p>${Ht(e.split_suppression_reason??"less_than_one_full_lap",n)}</p>
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
              ${e.distance_markers.map(y=>`<tr>
                    <td>${Kt(y.distance_m,n)}</td>
                    <td>${D(y.cumulative_time_s)}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:"",m=ke(e.trace_points),_=e.trace_points.filter(y=>!y.isOutlier),b=ke(_,e.trace_points),w=`<section class="panel trace-panel" data-testid="trace-plot-panel">
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
        <path d="${m}" data-testid="trace-path-raw" class="trace-path-raw" />
        <path d="${b}" data-testid="trace-path" class="trace-path-usable" />
      </svg>
    </section>`;return`
    <section class="result-card" data-testid="result-summary" aria-live="polite">
      <p class="eyebrow">${a.resultEyebrow}</p>
      <strong data-testid="corrected-distance">${K(e.corrected_distance_m,n)}</strong>
      <dl>
        <div>
          <dt>${a.resultFullLaps}</dt>
          <dd data-testid="full-laps">${e.full_laps}</dd>
        </div>
        <div>
          <dt>${a.resultEstimatedPartialLap}</dt>
          <dd data-testid="estimated-partial-lap">${ze(e.estimated_partial_lap,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalLaps}</dt>
          <dd data-testid="total-laps">${ze(e.total_laps,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalTime}</dt>
          <dd data-testid="total-time">${i}</dd>
        </div>
        <div>
          <dt>${a.resultRawDistance}</dt>
          <dd data-testid="raw-distance">${r}</dd>
        </div>
        <div>
          <dt>${a.resultDelta}</dt>
          <dd data-testid="delta">${o}</dd>
        </div>
      </dl>
      ${d}
    </section>
    ${u}
    ${h}
    ${p}
    ${w}
    ${c}
  `}function Jt(e,t){const n=e==="missing_file"?O[t].missingFileError:Ft(e,t);return`<section class="panel error-panel" role="alert"><h2>${O[t].errorTitle}</h2><p>${n}</p></section>`}function Qt(e){return typeof e.text=="function"?e.text():new Promise((t,n)=>{const s=new FileReader;s.addEventListener("load",()=>t(String(s.result??""))),s.addEventListener("error",()=>n(new E("file_read_failed"))),s.readAsText(e)})}function Zt(e){const t=e.querySelector("[data-testid='result-summary']");if(!t)return;const n=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;t.scrollIntoView?.({behavior:n?"auto":"smooth",block:"start"})}function en(){return`
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
  `}function tn(){return{status:"idle"}}function nn(e){e.innerHTML=en();const t=e.querySelector("[data-testid='language-label']"),n=e.querySelector("[data-testid='language-group']"),s=e.querySelector("[data-testid='hero-eyebrow']"),a=e.querySelector("[data-testid='hero-subtitle']"),r=e.querySelector("[data-testid='hero-title']"),o=e.querySelector("[data-testid='hero-intro']"),i=e.querySelector("[data-testid='file-label']"),l=e.querySelector("[data-testid='lane-label']"),c=e.querySelector("[data-testid='analyze-button']"),d=e.querySelector("[data-testid='analysis-form']"),u=e.querySelector("[data-testid='state']"),h=e.querySelector("[data-testid='footer-author-label']"),p=e.querySelector("[data-testid='file-input']"),m=e.querySelector("[data-testid='lane-select']"),_=e.querySelectorAll("[data-language]"),b=e.querySelector("[data-testid='faq-eyebrow']"),w=e.querySelector("[data-testid='faq-title']"),y=e.querySelector("[data-testid='faq-intro']"),I=e.querySelector("[data-testid='faq-items']");if(!t||!n||!s||!a||!r||!o||!i||!l||!c||!d||!u||!h||!p||!m||_.length===0||!b||!w||!y||!I)throw new Error("Application root is missing required UI elements.");const S=t,N=n,L=s,j=a,F=r,Y=o,C=i,f=l,z=c,$e=d,A=u,ve=h,Ie=p,H=m,ie=Array.from(_),je=b,Ae=w,qe=y,De=I;let $=Bt(),k=tn(),V=!0;function oe(){const g=O[$],M=H.value||"1";document.documentElement.lang=$,S.textContent=g.languageLabel,N.setAttribute("aria-label",g.languageGroupLabel),L.textContent=g.heroBrand,j.textContent=g.heroSubtitle,F.textContent=g.heroTitle,Y.textContent=g.heroIntro,C.textContent=g.fileLabel,f.textContent=g.laneLabel,z.textContent=g.analyzeButton,ve.textContent=g.footerAuthorLabel,je.textContent=g.faqEyebrow,Ae.textContent=g.faqTitle,qe.textContent=g.faqIntro,De.innerHTML=g.faqItems.map((x,v)=>`<article class="faq-item">
            <p class="faq-index">${String(v+1).padStart(2,"0")}</p>
            <h3>${x.question}</h3>
            <p>${x.answer}</p>
          </article>`).join(""),H.innerHTML=Object.entries(Le).map(([x,v])=>`<option value="${x}">${g.laneOptionLabel(Number(x),Ut(v,$))}</option>`).join(""),H.value=M,ie.forEach(x=>{const B=x.dataset.language===$;x.setAttribute("aria-pressed",String(B)),x.classList.toggle("is-active",B)})}function q(){if(k.status==="idle"){A.innerHTML="";return}if(k.status==="loading"){A.innerHTML=`<section class="panel muted-panel" aria-live="polite">${O[$].loadingMessage}</section>`;return}if(k.status==="error"){A.innerHTML=Jt(k.code,$);return}A.innerHTML=Vt(k.result,k.laneLengthM,$,V)}function Oe(g){$=g,oe(),q()}oe(),q(),ie.forEach(g=>{g.addEventListener("click",()=>{const M=g.dataset.language;Oe(M)})}),A.addEventListener("click",g=>{const M=g.target;!(M instanceof Element)||!M.closest("[data-testid='half-lap-toggle']")||(V=!V,q())}),$e.addEventListener("submit",async g=>{g.preventDefault(),k={status:"loading"},q();const M=Ie.files?.[0],x=Number(H.value);if(!M){k={status:"error",code:"missing_file"},q();return}try{const v=await Qt(M);k={status:"success",result:St(v,x),laneLengthM:Number(Me(x))}}catch(v){k={status:"error",code:Je(v).code}}q(),k.status==="success"&&Zt(A)})}const Te=document.querySelector("#app");Te&&nn(Te);
