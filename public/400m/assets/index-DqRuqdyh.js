(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const ne=6371e3;function F(e){return e*Math.PI/180}function Oe(e){if(e.length===0)return[];const t=F(e[0].lat),n=F(e[0].lon),a=Math.cos(t);return e.map(s=>{const r=F(s.lat),o=F(s.lon);return{...s,x:ne*a*(o-n),y:ne*(r-t),isDuplicate:!1,isSpeedOutlier:!1,isOutlier:!1}})}function N(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}const Ne=.5,Ge=10,Re=80,Xe=.35,ae=12,Fe=2.5,He=1.5;function Be(e){const t=[...e].sort((a,s)=>a-s),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function se(e,t){return`${e},${t}`}function We(e,t){const n=t,a=new Map;for(const s of e){const r=Math.floor(s.x/n),o=Math.floor(s.y/n),i=se(r,o),c=a.get(i);c?c.push(s):a.set(i,[s])}return e.map(s=>{const r=Math.floor(s.x/n),o=Math.floor(s.y/n);let i=0;for(let c=-1;c<=1;c+=1)for(let d=-1;d<=1;d+=1){const l=a.get(se(r+c,o+d));if(l)for(const u of l)N(s,u)<=t&&(i+=1)}return i})}function Q(e,t){return!e||!t?null:(t.getTime()-e.getTime())/1e3}function W(e,t){if(e.segmentIndex!==t.segmentIndex)return null;const n=Q(e.time,t.time);return n===null||n<=0?null:N(e,t)/n}function Ue(e){const t=e.slice(1).flatMap((o,i)=>{const c=W(e[i],o);return c===null?[]:[c]});if(t.length===0)return new Set;const n=Be(t),a=Math.max(ae,n*Fe),s=Math.max(ae,n*He),r=new Set;for(let o=1;o<e.length-1;o+=1){const i=e[o-1],c=e[o],d=e[o+1];if(i.segmentIndex!==c.segmentIndex||c.segmentIndex!==d.segmentIndex)continue;const l=W(i,c),u=W(c,d),m=Q(i.time,d.time);if(l===null||u===null||m===null||m<=0)continue;const f=N(i,d)/m;l>a&&u>a&&f<=s&&r.add(c.pointIndex)}return r}function Ke(e){let t=0,n=0,a=0,s=null;const r=e.map((p,_)=>{if(_===0)return p.time&&(s=p.time),{...p};const w=e[_-1],g=p.segmentIndex===w.segmentIndex,T=g?N(w,p):0,C=g?Q(w.time,p.time):null,S=g&&T<=Ne,A=C!==null&&C>Ge;let v=!1;p.time&&s&&p.time.getTime()<=s.getTime()&&(v=!0),S&&(t+=1),A&&(a+=1),v&&(n+=1);const h=S||v;return!h&&p.time&&(s=p.time),{...p,isDuplicate:S,isSpeedOutlier:!1,isOutlier:h}}),o=r.filter(p=>!p.isOutlier),i=Ue(o),c=r.map(p=>i.has(p.pointIndex)?{...p,isSpeedOutlier:!0,isOutlier:!0}:p),d=c.filter(p=>!p.isOutlier),l=we(d),u=new Set(l.map(p=>p.pointIndex));let m=0;const f=c.map(p=>p.isOutlier?p:l.length>=8&&!u.has(p.pointIndex)?(m+=1,{...p,isOutlier:!0}):p);return{points:f,summary:{duplicateCount:t,speedOutlierCount:i.size,timestampOutlierCount:n,densityOutlierCount:m,totalOutlierCount:f.filter(p=>p.isOutlier).length,longGapCount:a,usablePointCount:f.filter(p=>!p.isOutlier).length}}}function Ye(e){return e.filter(t=>!t.isOutlier)}function we(e){if(e.length===0)return[];const t=We(e,Re),n=Math.max(...t);if(n===0)return e;const a=Xe*n;return e.filter((s,r)=>t[r]>=a)}class P extends Error{code;constructor(t,n){super(n??t),this.name="AnalysisError",this.code=t}}function Ve(e){return e instanceof P?e:new P("unknown_analysis_error")}function re(e,t){return Array.from(e.querySelectorAll("*")).filter(n=>n.localName.toLowerCase()===t)}function ie(e,t){return Array.from(e.children).find(a=>a.localName.toLowerCase()===t)?.textContent?.trim()??null}function Je(e){if(e===null||e==="")return null;const t=Number(e);return Number.isFinite(t)?t:null}function Qe(e){if(e===null||e==="")return null;const t=new Date(e);return Number.isNaN(t.getTime())?null:t}function Ze(e){const t=new DOMParser().parseFromString(e,"application/xml");if(t.querySelector("parsererror"))throw new P("invalid_gpx_xml");const a=re(t,"trkseg"),s=a.length>0?a:[t.documentElement],r=[];if(s.forEach((o,i)=>{re(o,"trkpt").forEach(d=>{const l=d.getAttribute("lat")?.trim(),u=d.getAttribute("lon")?.trim();if(!l||!u)return;const m=Number(l),f=Number(u);!Number.isFinite(m)||!Number.isFinite(f)||Math.abs(m)>90||Math.abs(f)>180||r.push({lat:m,lon:f,ele:Je(ie(d,"ele")),time:Qe(ie(d,"time")),segmentIndex:i,pointIndex:r.length})})}),r.length===0)throw new P("no_track_points");return r}const be={1:400,2:407.038,3:414.704,4:422.37,5:430.034,6:437.7,7:445.366,8:453.032};function et(e){return Number.isInteger(e)&&e>=1&&e<=8}function xe(e){if(!et(e))throw new P("invalid_lane");return be[e]}const tt=.15;function oe(e){const t=[...e].sort((a,s)=>a-s),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function Z(e){if(e.length===0)return[];const t=[e[0]];for(let n=1;n<e.length;n+=1){let a=e[n]-e[n-1];for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;t.push(t[n-1]+a)}return t}function U(e,t,n,a,s){let r=t[n],o=e[n],i=n;for(let c=n+1;c<=a;c+=1){const d=e[c];(s>0?d>o:d<o)&&(r+=Math.abs(d-o),o=d,i=c),t[c]=r}return{travel:r,extreme:o,extremeIndex:i}}function nt(e,t=tt){if(e.length===0)return{progress:[],initialDirection:1,directionChanges:0};const n=Array.from({length:e.length},()=>0);let a=0,s=1,r=e[0],o=0,i=0,c=0;for(let d=1;d<e.length;d+=1){const l=e[d];if(a===0){if(Math.abs(l-e[0])<t)continue;a=l>e[0]?1:-1,s=a;const f=U(e,n,0,d,a);i=f.travel,r=f.extreme,o=f.extremeIndex;continue}if(a>0?l>r:l<r){i+=Math.abs(l-r),r=l,o=d,n[d]=i;continue}if(Math.abs(l-r)<t){n[d]=i;continue}a=a===1?-1:1,c+=1;const m=U(e,n,o,d,a);i=m.travel,r=m.extreme,o=m.extremeIndex}return a===0&&(s=e[e.length-1]-e[0]>=0?1:-1,U(e,n,0,e.length-1,s)),{progress:n,initialDirection:s,directionChanges:c}}function at(e){return e.length===0?[]:e.map(t=>t/(2*Math.PI))}function st(e){if(e.length<8)throw new P("not_enough_points");const t=we(e),n=t.length>=8?t:e,a=oe(n.map(m=>m.x)),s=oe(n.map(m=>m.y)),r=e.map(m=>Math.atan2(m.y-s,m.x-a)),o=Z(r),i=nt(o),c=at(i.progress),d=c[c.length-1],l=i.progress[i.progress.length-1],u=i.initialDirection>=0?"ccw":"cw";if(!Number.isFinite(d)||d<=0)throw new P("unable_to_estimate_laps");return{total_laps:d,direction:u,center_x:a,center_y:s,angle_delta_rad:l,directionChanges:i.directionChanges,progress_samples:c}}const k=1e-9,rt=10,it=10,ot=.1,le=.15;function lt(e){const t=new Map;for(const n of e){const a=t.get(n.lap_index)??[];a.push(n),t.set(n.lap_index,a)}return[...t.entries()].sort(([n],[a])=>n-a).flatMap(([,n])=>{const a=[...n].sort((s,r)=>s.half_index-r.half_index);return a.length!==2||a[0].half_index!==1||a[1].half_index!==2||a.some(s=>!s.chart_eligible)?[]:a.map(s=>({lap_index:s.lap_index,half_index:s.half_index,duration_s:s.duration_s}))})}function ce(e){const t=[...e].sort((a,s)=>a-s),n=Math.floor(t.length/2);return t.length%2===1?t[n]:(t[n-1]+t[n])/2}function ct(e){const t=[...e].sort((n,a)=>n-a);return t[Math.max(0,Math.ceil(t.length*.9)-1)]}function dt(e){if(e.some(t=>t.time===null))return"missing_timestamps";for(let t=1;t<e.length;t+=1){const n=e[t-1].time,a=e[t].time;if(!n||!a||a.getTime()<=n.getTime())return"non_monotonic_timestamps"}return null}function O(e,t){const n=Math.max(0,Math.min(e.length-1,Math.floor(t))),a=Math.max(0,Math.min(e.length-1,Math.ceil(t))),s=t-n;return e[n]+s*(e[a]-e[n])}function de(e,t){return{x:O(e.map(n=>n.x),t),y:O(e.map(n=>n.y),t)}}function ue(e,t,n){if(n<=k){const a=e[0]?.time;return a?{position:0,time_ms:a.getTime()}:null}for(let a=1;a<t.length;a+=1){const s=t[a-1],r=t[a];if(s>n+k||r+k<n)continue;const o=e[a-1].time,i=e[a].time;if(!o||!i)return null;const c=r-s,d=c<=k?0:Math.max(0,Math.min(1,(n-s)/c));return{position:a-1+d,time_ms:o.getTime()+d*(i.getTime()-o.getTime())}}return null}function ut(e,t){const n=Z(e.map(i=>Math.atan2(i.y-t.center_y,i.x-t.center_x))),a=[];let s=0,r=n[0],o=0;for(let i=1;i<n.length;i+=1){const c=n[i];if(s===0){if(Math.abs(c-n[0])<le)continue;s=c>n[0]?1:-1}if(s>0?c>r:c<r){r=c,o=i;continue}Math.abs(c-r)<le||(a.push(t.progress_samples[o]),s=s===1?-1:1,r=c,o=i)}return a}function pt(e,t,n){return e.some(a=>a>t+k&&a<n-k)}function mt(e){return e.some((t,n)=>n>0&&t-e[n-1]>ot)}function ht(e,t,n){const a=Math.max(1,Math.floor(t)+1),s=Math.min(e.length-1,Math.ceil(n));for(let r=a;r<=s;r+=1){const o=r;if(o>t+k&&o<n-k&&e[r-1].segmentIndex!==e[r].segmentIndex)return!0}return!1}function ft(e,t,n){const a=[],s=[],r=ut(e,t);for(const o of n){const i=o.lap_index-1,c=o.lap_index,d=ue(e,t.progress_samples,i),l=ue(e,t.progress_samples,c);if(!d||!l)return null;if(pt(r,i,c)||ht(e,d.position,l.position)){s.push(o.lap_index);continue}a.push({lapIndex:o.lap_index,start:d,end:l})}return{eligible:a,omitted:s}}function gt(e,t){const n=[];for(const r of t){const o=[];o.push(de(e,r.start.position));const i=Math.floor(r.start.position)+1,c=Math.ceil(r.end.position)-1;for(let u=i;u<=c;u+=1)o.push({x:e[u].x,y:e[u].y});if(o.push(de(e,r.end.position)),o.length<8)continue;const d=o.map(u=>u.x),l=o.map(u=>u.y);n.push({x:(Math.min(...d)+Math.max(...d))/2,y:(Math.min(...l)+Math.max(...l))/2})}if(n.length===0)return null;const a=ce(n.map(r=>r.x)),s=ce(n.map(r=>r.y));return{x:a,y:s,p90SpreadM:ct(n.map(r=>Math.hypot(r.x-a,r.y-s)))}}function yt(e,t){const n=e[t].time;if(!n)throw new Error("Half-lap timing requires complete timestamps.");return{position:t,time_ms:n.getTime()}}function _t(e,t,n){return{position:e.position+n*(t.position-e.position),time_ms:e.time_ms+n*(t.time_ms-e.time_ms)}}function wt(e,t,n){const a=O(t,n.start.position),s=O(t,n.end.position),r=s>=a?1:-1;if(r*(s-a)<1.5*Math.PI)return null;const i=[n.start],c=Math.floor(n.start.position)+1,d=Math.ceil(n.end.position)-1;for(let m=c;m<=d;m+=1)i.push(yt(e,m));i.push(n.end);let l=i[0],u=0;for(let m=1;m<i.length;m+=1){const f=i[m],p=O(t,f.position),_=r*(p-a);if(_+k>=Math.PI){const w=_-u;if(w<=k)return f;const g=Math.max(0,Math.min(1,(Math.PI-u)/w));return _t(l,f,g)}l=f,u=_}return null}function pe(e,t,n){const a=Math.max(1,Math.floor(t)+1),s=Math.min(e.length-1,Math.ceil(n));for(let r=a;r<=s;r+=1){const o=e[r-1].time,i=e[r].time;if(!o||!i||(i.getTime()-o.getTime())/1e3>rt)return!0}return!1}function bt(e,t,n){const a=dt(e);if(a)return{splits:[],suppression_reason:a,reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(n.length===0)return{splits:[],suppression_reason:"less_than_one_full_lap",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(mt(t.progress_samples))return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:n.map(l=>l.lap_index)};const s=ft(e,t,n);if(!s)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:[]};if(s.eligible.length===0)return{splits:[],suppression_reason:"no_eligible_completed_laps",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:s.omitted};const r=gt(e,s.eligible);if(!r)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:null,reference_center_y:null,reference_center_p90_spread_m:null,omitted_lap_indexes:s.omitted};if(r.p90SpreadM>it)return{splits:[],suppression_reason:"unstable_half_lap_geometry",reference_center_x:r.x,reference_center_y:r.y,reference_center_p90_spread_m:r.p90SpreadM,omitted_lap_indexes:n.map(l=>l.lap_index)};const o=Z(e.map(l=>Math.atan2(l.y-r.y,l.x-r.x))),i=e[0].time?.getTime()??0,c=[],d=[...s.omitted];for(const l of s.eligible){const u=wt(e,o,l);if(!u||u.time_ms<=l.start.time_ms||u.time_ms>=l.end.time_ms){d.push(l.lapIndex);continue}c.push({lap_index:l.lapIndex,half_index:1,duration_s:(u.time_ms-l.start.time_ms)/1e3,cumulative_time_s:(u.time_ms-i)/1e3,chart_eligible:!pe(e,l.start.position,u.position),start_boundary:l.start,end_boundary:u},{lap_index:l.lapIndex,half_index:2,duration_s:(l.end.time_ms-u.time_ms)/1e3,cumulative_time_s:(l.end.time_ms-i)/1e3,chart_eligible:!pe(e,u.position,l.end.position),start_boundary:u,end_boundary:l.end})}return{splits:c,suppression_reason:c.length===0?"unstable_half_lap_geometry":null,reference_center_x:r.x,reference_center_y:r.y,reference_center_p90_spread_m:r.p90SpreadM,omitted_lap_indexes:d.sort((l,u)=>l-u)}}const Y=1e-9,K=5e3;function xt(e){for(let t=1;t<e.length;t+=1){const n=e[t-1].time,a=e[t].time;if(!n||!a||a.getTime()<=n.getTime())return!1}return!0}function ze(e){return e.some(t=>t.time===null)?{startTimeMs:0,suppression_reason:"missing_timestamps"}:xt(e)?{startTimeMs:e[0].time?.getTime()??0,suppression_reason:null}:{startTimeMs:0,suppression_reason:"non_monotonic_timestamps"}}function ke(e,t,n){const a=[];let s=0;for(let r=1;r<e.length&&s<n.length;r+=1){const o=t[r-1],i=t[r],c=e[r-1].time,d=e[r].time;if(!(c===null||d===null||i<o||d.getTime()<=c.getTime()))for(;s<n.length&&i+Y>=n[s];){const l=n[s],u=i-o,m=u<=Y?0:(l-o)/u,f=c.getTime()+m*(d.getTime()-c.getTime());a.push(f),s+=1}}return a.length===n.length?a:null}function zt(e,t){const n=Math.floor(t[t.length-1]+Y);if(n<1)return{lap_splits:[],suppression_reason:"less_than_one_full_lap"};const a=ze(e);if(a.suppression_reason)return{lap_splits:[],suppression_reason:a.suppression_reason};const s=Array.from({length:n},(o,i)=>i+1),r=ke(e,t,s);return r===null?{lap_splits:[],suppression_reason:"non_monotonic_timestamps"}:{lap_splits:r.map((o,i)=>{const c=i===0?a.startTimeMs:r[i-1];return{lap_index:i+1,duration_s:(o-c)/1e3,cumulative_time_s:(o-a.startTimeMs)/1e3}}),suppression_reason:null}}function kt(e,t,n){const a=ze(e);if(a.suppression_reason)return[];const s=t[t.length-1]*n,r=Math.floor(s/K);if(r<1)return[];const o=Array.from({length:r},(c,d)=>(d+1)*K/n),i=ke(e,t,o);return i===null?[]:i.map((c,d)=>({distance_m:(d+1)*K,cumulative_time_s:(c-a.startTimeMs)/1e3}))}const me=1e-9;function Tt(e){return e.every(t=>t.time!==null)}function Pt(e){let t=0,n=0;for(let a=1;a<e.length;a+=1){const s=e[a-1],r=e[a];s.segmentIndex===r.segmentIndex&&(t+=N(s,r),n+=1)}return n>0?t:null}function Lt(e){if(e.length<2||e.some(a=>a.time===null))return null;const t=e[0].time,n=e[e.length-1].time;return!t||!n||n.getTime()<=t.getTime()?null:(n.getTime()-t.getTime())/1e3}function Mt(e){const t=[],n=e.totalPoints>0?e.totalOutlierCount/e.totalPoints:0;return Tt(e.parsedPoints)||t.push("missing_timestamps"),e.duplicateCount>0&&t.push("duplicate_points"),e.speedOutlierCount>0&&t.push("gps_jumps"),e.longGapCount>0&&t.push("long_gaps"),e.usablePointCount<50&&t.push("few_usable_points"),n>.05&&t.push("high_outlier_rate"),e.directionChanges>Math.max(10,e.totalPoints*.03)&&t.push("noisy_direction_changes"),e.totalLaps<1&&t.push("less_than_one_lap"),t}function Et(e,t){const n=xe(t),a=Ze(e),s=Oe(a),{points:r,summary:o}=Ke(s),i=Ye(r);if(i.length<8)throw new P("not_enough_points");const c=st(i),d=c.total_laps*n,l=Math.floor(c.total_laps+me),u=Math.max(0,c.total_laps-l),m=Pt(r),f=zt(i,c.progress_samples),p=bt(i,c,f.lap_splits),_=lt(p.splits),w=kt(i,c.progress_samples,n);return{corrected_distance_m:d,total_laps:c.total_laps,full_laps:l,estimated_partial_lap:u<me?0:u,total_time_s:Lt(i),raw_distance_m:m,delta_m:m===null?null:m-d,warnings:Mt({parsedPoints:a,usablePointCount:o.usablePointCount,totalPoints:r.length,duplicateCount:o.duplicateCount,speedOutlierCount:o.speedOutlierCount,totalOutlierCount:o.totalOutlierCount,longGapCount:o.longGapCount,directionChanges:c.directionChanges,totalLaps:c.total_laps}),lap_splits:f.lap_splits,split_suppression_reason:f.suppression_reason,half_lap_splits:_,half_lap_suppression_reason:_.length>0?null:p.suppression_reason??"weak_half_lap_timing",distance_markers:w,trace_points:r.map(g=>({x:g.x,y:g.y,segmentIndex:g.segmentIndex,isOutlier:g.isOutlier}))}}const H=18,V=96,he=12,Te=82,Ct=8;function J(e,t){return e/(t/1e3)}function fe(e,t,n){return n-t<=0?(H+V)/2:H+(e-t)/(n-t)*(V-H)}function St(e,t,n=[]){if(e.length===0||!Number.isFinite(t)||t<=0)return null;const a=e.map(h=>J(h.duration_s,t));if(a.some(h=>!Number.isFinite(h)||h<0))return null;const s=n.filter(h=>Number.isFinite(h.duration_s)&&h.duration_s>0),r=s.map(h=>J(h.duration_s,t/2)),o=[...a,...r],i=Math.min(...o),c=Math.max(...o),d=c-i,l=d>0?Math.max(10,d*.12):30,u=Math.max(0,i-l),m=c+l,f=Math.max(m-u,1),p=h=>he+(h-u)/f*(Te-he),_=[...e.map(h=>h.lap_index),...s.map(h=>h.lap_index+(h.half_index===1?-.25:.25))],w=Math.min(..._),g=Math.max(..._),T=e.map((h,x)=>({lapIndex:h.lap_index,paceSecondsPerKm:a[x],xPercent:fe(h.lap_index,w,g),yPercent:p(a[x])})),C=s.map((h,x)=>({lapIndex:h.lap_index,halfIndex:h.half_index,paceSecondsPerKm:r[x],xPercent:fe(h.lap_index+(h.half_index===1?-.25:.25),w,g),yPercent:p(r[x])})),S=[u,u+f/2,m].map(h=>({paceSecondsPerKm:h,yPercent:p(h)})),A=Math.max(1,Math.ceil((e.length-1)/(Ct-1))),v=T.filter((h,x)=>x===0||x===T.length-1||x%A===0).map(h=>({lapIndex:h.lapIndex,xPercent:h.xPercent}));return{points:T,halfLapPoints:C,yTicks:S,xLabels:v}}const E={leftPercent:H,rightPercent:V,bottomPercent:Te},vt=.15,$t=1e-9;function It(e,t,n=vt){const a=Math.round(e);return a<1||Math.abs(e-a)-n>$t?null:{rounded_laps:a,corrected_distance_m:a*t}}const j={pl:{languageLabel:"Język",languageGroupLabel:"Wybór języka",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Oszacuj dystans z okrążeń, a nie z surowej długości śladu GPS.",heroIntro:"Wgraj plik GPX, wybierz tor i policz skorygowany dystans lokalnie w przeglądarce.",fileLabel:"Plik GPX",laneLabel:"Tor",laneOptionLabel:(e,t)=>`Tor ${e} (${t})`,analyzeButton:"Analizuj GPX",loadingMessage:"Analizuję GPX lokalnie...",missingFileError:"Wybierz plik GPX przed uruchomieniem analizy.",resultEyebrow:"Skorygowany dystans",resultTotalLaps:"Łącznie z estymacją",resultFullLaps:"Pełne okrążenia",resultEstimatedPartialLap:"Szacowana część ostatniego okrążenia",resultTotalTime:"Czas całkowity",resultRawDistance:"Surowy dystans GPX",resultDelta:"Różnica",unavailable:"Niedostępne",warningsTitle:"Ostrzeżenia",roundedEyebrow:"Interpretacja dla pełnych okrążeń",roundedCopy:"Dla biegu zaplanowanego jako same pełne okrążenia najbliższy wynik to:",roundedLapsLabel:"Zaokrąglona liczba okrążeń",roundedDistanceLabel:"Skorygowany dystans po zaokrągleniu",errorTitle:"Analiza nie powiodła się",splitTitle:"Czasy okrążeń",splitIntro:"Przybliżone splity wynikające z przecięć pełnych okrążeń w modelu postępu po bieżni.",splitUnavailableTitle:"Czasy okrążeń są niedostępne",splitTableLap:"Okrążenie",splitTableDuration:"Czas",splitTableCumulative:"Narastająco",splitTablePace:"Tempo",paceChartTitle:"Tempo na ukończonych okrążeniach",paceChartIntro:"Pełne punkty pokazują tempo ukończonych okrążeń. Puste punkty pokazują szacowane tempo ich połówek względem początku nagrania. Pół okrążenia to połowa długości wybranego toru, nie zawsze 200 m.",paceChartXAxis:"Okrążenie",paceChartYAxis:"Tempo (min/km)",paceChartExactValues:"Dokładne wartości w tabeli poniżej dotyczą tylko pełnych okrążeń. Punkty półokrążeń są wyłącznie estymacją wizualną.",paceChartLegendLap:"Pełne okrążenie",paceChartLegendHalf:"Szacowane półokrążenie",paceChartHalfPointTitle:(e,t)=>`Szacowane półokrążenie: okrążenie ${e}, połowa ${t}.`,markerTitle:"Międzyczasy dystansowe",markerIntro:"Czasy przecięć kolejnych progów 5 km wyznaczone z tego samego modelu progresu po okrążeniach.",markerTableDistance:"Dystans",markerTableTime:"Czas",traceTitle:"Ślad w lokalnych współrzędnych",traceIntro:"Wykres pokazuje zarejestrowaną geometrię po projekcji do lokalnego układu metrycznego. Nie jest to wygenerowana ani geodezyjnie skorygowana trasa.",traceLegendRaw:"Pełny zarejestrowany ślad, w tym punkty odrzucone",traceLegendUsable:"Punkty użyte do analizy okrążeń",footerAuthorLabel:"Autor",faqEyebrow:"Metodologia i prywatność",faqTitle:"Często zadawane pytania (FAQ)",faqIntro:"Metoda jest najmocniejsza dla ukończonych okrążeń. Estymacja częściowego okrążenia i słabe ślady wymagają ostrożniejszej interpretacji.",faqItems:[{question:"Dlaczego dystans z mojego zegarka GPS jest niedokładny na bieżni lekkoatletycznej?",answer:"Dryf i szum GPS na ciasnych, wielokrotnie powtarzanych łukach często zniekształcają surową długość śladu. 400m traktuje ten dystans tylko jako wartość diagnostyczną i szacuje postęp wokół owalu, ale nie gwarantuje poprawienia każdego nagrania."},{question:"Jak liczony jest skorygowany dystans i która część wyniku jest estymacją?",answer:"Aplikacja zawsze oblicza skorygowany dystans jako oszacowane total_laps pomnożone przez tabelaryczną długość toru wybranego przez użytkownika. Ukończone okrążenia mają silniejsze podstawy topologiczne niż pozycja wewnątrz okrążenia. Część po ostatnim pełnym okrążeniu jest estymacją kątową, więc dokładność mnożenia nie usuwa niepewności tej estymacji."},{question:"Co pokazują kontrolowane testy dokładności?",answer:"W syntetycznych, kontrolowanych śladach 10 okrążeń czyste przypadki dla torów 1 i 6 miały praktycznie zerowy błąd liczby okrążeń i dystansu. Dla toru 8 z deterministycznym szumem współrzędnych 3 m błąd wyniósł 0,00928 okrążenia, czyli 4,202 m. Osobny zaszumiony fixture odtworzył wszystkie 20 referencyjnych granic półokrążeń w limicie 10 m. Są to wyniki syntetycznych przypadków testowych, a nie gwarancja dla wszystkich urządzeń i nagrań."},{question:"Co pokazują testy na prawdziwych plikach GPX?",answer:"Trzy prawdziwe nagrania z toru 6 od jednego biegacza służą jako testy regresji. Liczba okrążeń i czasy przecięć zostały zweryfikowane ręcznie, a wyniki analizy są z nimi zgodne."},{question:"Czy zmiana kierunku jest obsługiwana i dlaczego nie ma międzyczasów 200 m lub 100 m?",answer:"Celowe zmiany kierunku po ukończonych okrążeniach są obsługiwane, a przebyty postęp w obu kierunkach jest dodawany zamiast wzajemnie się znosić. Produkt nie pokazuje dokładnych międzyczasów 200 m, 100 m ani czasów prostych. Może pokazać na wykresie szacowane tempo dwóch połówek ukończonego okrążenia; na torach zewnętrznych taka połowa jest dłuższa niż 200 m."},{question:"Kiedy dystans lub timing wymagają większej ostrożności?",answer:"Brakujące lub błędne znaczniki czasu wyłączają pomiary czasu. Długie przerwy pozostają w czasie całkowitym i czasach okrążeń, ale osłabiają ich interpretację. Szum, mała liczba punktów, częściowe okrążenie, dominujący gęsty klaster poza bieżnią albo nieciągłe segmenty mogą pogorszyć wynik. Markery 5 km korzystają z estymacji pozycji wewnątrz okrążenia i na torach zewnętrznych mają znane ograniczenie."},{question:"Jak wyznacza się długość każdego toru na standardowym stadionie?",answer:"Tabela stosuje konwencję pomiarową World Athletics dla standardowej bieżni 400 m: tor 1 ma 400,000 m, a tory zewnętrzne są dłuższe zgodnie z ich oficjalną linią pomiarową. Na przykład tor 6 ma 437,700 m, a nie potocznie zaokrąglone 438 m. Wybrany przez użytkownika tor pozostaje wiążący."},{question:"Czy mój plik GPX jest gdzieś przesyłany?",answer:"Nie. Plik GPX jest parsowany i analizowany w przeglądarce; współrzędne, czasy i wyniki analizy nie są wysyłane do backendu aplikacji. Samo otwarcie strony internetowej wymaga pobrania jej plików z hosta."}]},en:{languageLabel:"Language",languageGroupLabel:"Language selection",heroBrand:"400m",heroSubtitle:"GPX Track Laps",heroTitle:"Estimate track distance from lap progress, not raw GPS trace length.",heroIntro:"Upload a GPX file, choose a lane, and compute the corrected distance locally in the browser.",fileLabel:"GPX file",laneLabel:"Lane",laneOptionLabel:(e,t)=>`Lane ${e} (${t})`,analyzeButton:"Analyze GPX",loadingMessage:"Analyzing GPX locally...",missingFileError:"Choose a GPX file before starting the analysis.",resultEyebrow:"Corrected distance",resultTotalLaps:"Total including estimate",resultFullLaps:"Completed laps",resultEstimatedPartialLap:"Estimated final partial lap",resultTotalTime:"Total time",resultRawDistance:"Raw GPX distance",resultDelta:"Delta",unavailable:"Unavailable",warningsTitle:"Warnings",roundedEyebrow:"Full-laps interpretation",roundedCopy:"If the run was planned as full laps only, the nearest interpretation is:",roundedLapsLabel:"Rounded lap count",roundedDistanceLabel:"Rounded corrected distance",errorTitle:"Analysis failed",splitTitle:"Lap times",splitIntro:"Approximate splits derived from full-lap crossings in the lap-progress model.",splitUnavailableTitle:"Lap times are unavailable",splitTableLap:"Lap",splitTableDuration:"Time",splitTableCumulative:"Cumulative",splitTablePace:"Pace",paceChartTitle:"Pace by completed lap",paceChartIntro:"Filled points show completed-lap pace. Hollow points show estimated pace for each half relative to the recording start. A half lap is half the selected lane length, not always 200 m.",paceChartXAxis:"Lap",paceChartYAxis:"Pace (min/km)",paceChartExactValues:"Exact values in the table below apply only to completed laps. Half-lap points are a visual estimate only.",paceChartLegendLap:"Completed lap",paceChartLegendHalf:"Estimated half lap",paceChartHalfPointTitle:(e,t)=>`Estimated half lap: lap ${e}, half ${t}.`,markerTitle:"Distance split times",markerIntro:"Times for each 5 km threshold derived from the same lap-progress model.",markerTableDistance:"Distance",markerTableTime:"Time",traceTitle:"Trace in local coordinates",traceIntro:"The plot shows recorded geometry projected into a local metric plane. It is not a generated or survey-corrected route.",traceLegendRaw:"Full recorded trace, including rejected points",traceLegendUsable:"Points used for lap analysis",footerAuthorLabel:"Author",faqEyebrow:"Methodology and privacy",faqTitle:"Frequently Asked Questions (FAQ)",faqIntro:"The method is strongest for completed laps. Partial-lap estimates and weak traces need more cautious interpretation.",faqItems:[{question:"Why is my GPS watch distance inaccurate on a running track?",answer:"GPS drift and signal noise on tight repeated curves often distort raw trace length. 400m treats that distance as a diagnostic value and estimates progress around the oval, but it does not guarantee that every recording will be corrected."},{question:"How is corrected distance calculated, and which part is estimated?",answer:"The app always calculates corrected distance as estimated total_laps multiplied by the tabulated length of the lane selected by the user. Completed laps have stronger topological support than within-lap position. Progress after the last completed lap is an angular estimate, so exact multiplication does not remove uncertainty from that estimate."},{question:"What do controlled accuracy tests show?",answer:"In controlled synthetic 10-lap traces, clean lane 1 and lane 6 cases had effectively zero lap-count and distance error. For lane 8 with deterministic 3 m coordinate noise, the error was 0.00928 lap, equivalent to 4.202 m. A separate noisy fixture recovered all 20 reference half-lap boundaries inside the 10 m gate. These are synthetic fixture results, not a guarantee for every device or recording."},{question:"What do tests with real GPX files show?",answer:"Three real lane-6 recordings from one runner are used as regression tests. Their lap counts and crossing times were verified manually, and the analysis results agree with them."},{question:"Are direction changes supported, and why are there no 200 m or 100 m splits?",answer:"Intentional direction changes after completed laps are supported, and traveled progress in both directions is added instead of cancelling out. The product omits exact 200 m, 100 m, and straight-only timing. It may show estimated pace for two halves of an eligible completed lap; in outer lanes each half is longer than 200 m."},{question:"When should distance or timing be interpreted more cautiously?",answer:"Missing or invalid timestamps disable timing. Long gaps remain in total time and lap splits but weaken their interpretation. Noise, few points, a partial lap, a dominant dense off-track cluster, or discontinuous segments can weaken the result. The 5 km markers use estimated within-lap position and have a known outer-lane limitation."},{question:"How is each lane length determined on a standard track?",answer:"The table follows the World Athletics measurement convention for a standard 400 m track: lane 1 is 400.000 m, while outer lanes are longer according to their official measurement lines. For example, lane 6 is 437.700 m rather than the informal rounded value of 438 m. The lane selected by the user remains authoritative."},{question:"Is my GPX file uploaded to a server?",answer:"No. The GPX file is parsed and analyzed in the browser; coordinates, timestamps, and analysis results are not sent to an application backend. Opening the website itself still downloads its files from the host."}]}},jt={pl:{missing_timestamps:"Brakuje części lub wszystkich znaczników czasu GPX; wykrywanie skoków na podstawie prędkości może być ograniczone.",duplicate_points:"W śladzie wykryto i pominięto zduplikowane punkty.",gps_jumps:"W śladzie wykryto i pominięto skoki GPS.",long_gaps:"Wykryto długie przerwy w nagraniu.",few_usable_points:"Ślad ma mało użytecznych punktów, więc oszacowanie okrążeń może być słabe.",high_outlier_rate:"Ponad 5% punktów zostało oznaczonych jako odstające.",noisy_direction_changes:"Kierunek ruchu jest zaszumiony; sprawdź, czy GPX nie zawiera fragmentów poza stadionem.",less_than_one_lap:"Wykryto mniej niż jedno okrążenie; skorygowany dystans może być trudny do interpretacji."},en:{missing_timestamps:"Some or all GPX timestamps are missing, so speed-based GPS jump detection may be limited.",duplicate_points:"Duplicate points were detected and ignored in the trace.",gps_jumps:"GPS jumps were detected and ignored in the trace.",long_gaps:"Long recording gaps were detected.",few_usable_points:"The trace has few usable points, so lap estimation may be weak.",high_outlier_rate:"More than 5% of points were marked as outliers.",noisy_direction_changes:"Direction changes are noisy; check whether the GPX file contains sections outside the track.",less_than_one_lap:"Less than one lap was detected, so the corrected distance may be hard to interpret."}},At={pl:{invalid_lane:"Tor musi być liczbą od 1 do 8.",invalid_gpx_xml:"Wybrany plik nie jest poprawnym XML.",no_track_points:"Nie znaleziono poprawnych punktów śladu GPX.",not_enough_points:"Plik GPX nie zawiera wystarczającej liczby użytecznych punktów do oszacowania okrążeń.",unable_to_estimate_laps:"Nie udało się wyliczyć postępu po okrążeniach z tego śladu GPX.",file_read_failed:"Nie udało się odczytać wybranego pliku GPX.",unknown_analysis_error:"Nieznany błąd analizy."},en:{invalid_lane:"Lane must be a number from 1 to 8.",invalid_gpx_xml:"The selected file is not valid XML.",no_track_points:"No valid GPX track points were found.",not_enough_points:"The GPX file does not contain enough usable points to estimate laps.",unable_to_estimate_laps:"Lap progress could not be derived from this GPX trace.",file_read_failed:"The selected GPX file could not be read.",unknown_analysis_error:"Unknown analysis error."}},qt={pl:{missing_timestamps:"Plik GPX nie zawiera pełnych znaczników czasu dla użytecznych punktów.",non_monotonic_timestamps:"Znaczniki czasu nie są ściśle rosnące, więc splity byłyby niewiarygodne.",less_than_one_full_lap:"Do pokazania splitów potrzebne jest co najmniej jedno pełne okrążenie."},en:{missing_timestamps:"The GPX file does not contain complete timestamps for the usable points.",non_monotonic_timestamps:"Timestamps are not strictly increasing, so splits would be unreliable.",less_than_one_full_lap:"At least one full lap is required before split times can be shown."}};function G(e){return e==="pl"?"pl-PL":"en-US"}function Dt(e,t){return jt[t][e]}function Ot(e,t){return At[t][e]}function Nt(e,t){return qt[t][e]}function Gt(){return typeof navigator>"u"?"en":[navigator.language,...navigator.languages].filter(t=>typeof t=="string").map(t=>t.toLowerCase()).some(t=>t==="pl"||t.startsWith("pl-"))?"pl":"en"}function B(e,t){return`${Math.round(e).toLocaleString(G(t))} m`}function Rt(e,t){return`${e>0?"+":""}${Math.round(e).toLocaleString(G(t))} m`}function Xt(e,t){return`${e.toLocaleString(G(t),{minimumFractionDigits:3,maximumFractionDigits:3})} m`}function ge(e,t){return e.toLocaleString(G(t),{minimumFractionDigits:2,maximumFractionDigits:2})}function I(e){const t=Math.max(0,Math.round(e)),n=Math.floor(t/3600),a=Math.floor(t%3600/60),s=t%60;return n>0?`${n}:${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${a}:${String(s).padStart(2,"0")}`}function Pe(e){return`${I(e)}/km`}function Ft(e,t){return e%1e3===0?`${(e/1e3).toLocaleString(G(t))} km`:B(e,t)}function ye(e,t=e,n=640,a=280,s=18){if(e.length===0)return"";const r=t.map(p=>p.x),o=t.map(p=>p.y),i=Math.min(...r),c=Math.max(...r),d=Math.min(...o),l=Math.max(...o),u=Math.max(c-i,1),m=Math.max(l-d,1),f=Math.min((n-s*2)/u,(a-s*2)/m);return e.map((p,_)=>{const w=s+(p.x-i)*f,g=a-s-(p.y-d)*f;return`${_===0||p.segmentIndex!==e[_-1].segmentIndex?"M":"L"}${w.toFixed(1)} ${g.toFixed(1)}`}).join(" ")}function Ht(e,t,n){const a=St(e.lap_splits,t,e.half_lap_splits);if(!a)return"";const s=j[n],r=a.yTicks.map(l=>`<g>
        <line
          class="pace-chart-grid-line"
          x1="${E.leftPercent}%"
          x2="${E.rightPercent}%"
          y1="${l.yPercent}%"
          y2="${l.yPercent}%"
        />
        <text
          class="pace-chart-tick"
          x="${E.leftPercent-2}%"
          y="${l.yPercent}%"
          text-anchor="end"
          dominant-baseline="middle"
        >${I(l.paceSecondsPerKm)}</text>
      </g>`).join(""),o=a.xLabels.map(l=>`<text
        class="pace-chart-tick"
        x="${l.xPercent}%"
        y="89%"
        text-anchor="middle"
      >${l.lapIndex}</text>`).join(""),i=a.points.map(l=>`<circle
        class="pace-chart-point"
        cx="${l.xPercent}%"
        cy="${l.yPercent}%"
        r="5"
      ><title>${s.splitTableLap} ${l.lapIndex}: ${Pe(l.paceSecondsPerKm)}</title></circle>`).join(""),c=a.halfLapPoints.map(l=>`<circle
        class="pace-chart-half-point"
        data-testid="pace-chart-half-point"
        cx="${l.xPercent}%"
        cy="${l.yPercent}%"
        r="4"
      ><title>${s.paceChartHalfPointTitle(l.lapIndex,l.halfIndex)}</title></circle>`).join(""),d=a.halfLapPoints.length===0?"":`<ul class="pace-chart-legend" aria-label="${s.paceChartTitle}">
          <li><span class="pace-chart-legend-point pace-chart-legend-point-lap" aria-hidden="true"></span>${s.paceChartLegendLap}</li>
          <li><span class="pace-chart-legend-point pace-chart-legend-point-half" aria-hidden="true"></span>${s.paceChartLegendHalf}</li>
        </ul>`;return`<section class="panel pace-chart-panel" data-testid="pace-chart-panel">
      <h2 id="pace-chart-title">${s.paceChartTitle}</h2>
      <p id="pace-chart-description" class="support-copy">${s.paceChartIntro}</p>
      ${d}
      <svg
        data-testid="pace-chart"
        class="pace-chart"
        width="100%"
        height="280"
        role="img"
        aria-labelledby="pace-chart-title pace-chart-description"
      >
        <text class="pace-chart-axis-title" x="${E.leftPercent}%" y="7%">
          ${s.paceChartYAxis}
        </text>
        ${r}
        <line
          class="pace-chart-axis"
          x1="${E.leftPercent}%"
          x2="${E.rightPercent}%"
          y1="${E.bottomPercent}%"
          y2="${E.bottomPercent}%"
        />
        ${o}
        ${i}
        ${c}
        <text class="pace-chart-axis-title" x="57%" y="98%" text-anchor="middle">
          ${s.paceChartXAxis}
        </text>
      </svg>
      <p class="visually-hidden">${s.paceChartExactValues}</p>
    </section>`}function Bt(e,t,n="pl"){const a=j[n],s=e.raw_distance_m===null?a.unavailable:B(e.raw_distance_m,n),r=e.delta_m===null?a.unavailable:Rt(e.delta_m,n),o=e.total_time_s===null?a.unavailable:I(e.total_time_s),i=It(e.total_laps,t),c=e.warnings.length>0?`<section class="panel warning-panel" aria-label="${a.warningsTitle}">
          <h2>${a.warningsTitle}</h2>
          <ul>${e.warnings.map(g=>`<li>${Dt(g,n)}</li>`).join("")}</ul>
        </section>`:"",d=i===null?"":`<section class="secondary-result" data-testid="rounded-interpretation">
          <p class="secondary-eyebrow">${a.roundedEyebrow}</p>
          <p class="secondary-copy">${a.roundedCopy}</p>
          <dl class="secondary-grid">
            <div>
              <dt>${a.roundedLapsLabel}</dt>
              <dd data-testid="rounded-laps">${i.rounded_laps}</dd>
            </div>
            <div>
              <dt>${a.roundedDistanceLabel}</dt>
              <dd data-testid="rounded-distance">${B(i.corrected_distance_m,n)}</dd>
            </div>
          </dl>
        </section>`,l=Ht(e,t,n),u=e.lap_splits.length>0?`<section class="panel splits-panel" data-testid="lap-splits">
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
              ${e.lap_splits.map(g=>`<tr>
                    <td>${g.lap_index}</td>
                    <td>${I(g.duration_s)}</td>
                    <td>${I(g.cumulative_time_s)}</td>
                    <td>${Pe(J(g.duration_s,t))}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:`<section class="panel muted-panel splits-panel" data-testid="lap-splits-unavailable">
          <h2>${a.splitUnavailableTitle}</h2>
          <p>${Nt(e.split_suppression_reason??"less_than_one_full_lap",n)}</p>
        </section>`,m=e.distance_markers.length>0?`<section class="panel splits-panel" data-testid="distance-markers">
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
              ${e.distance_markers.map(g=>`<tr>
                    <td>${Ft(g.distance_m,n)}</td>
                    <td>${I(g.cumulative_time_s)}</td>
                  </tr>`).join("")}
            </tbody>
          </table>
        </section>`:"",f=ye(e.trace_points),p=e.trace_points.filter(g=>!g.isOutlier),_=ye(p,e.trace_points),w=`<section class="panel trace-panel" data-testid="trace-plot-panel">
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
        <path d="${f}" data-testid="trace-path-raw" class="trace-path-raw" />
        <path d="${_}" data-testid="trace-path" class="trace-path-usable" />
      </svg>
    </section>`;return`
    <section class="result-card" data-testid="result-summary" aria-live="polite">
      <p class="eyebrow">${a.resultEyebrow}</p>
      <strong data-testid="corrected-distance">${B(e.corrected_distance_m,n)}</strong>
      <dl>
        <div>
          <dt>${a.resultFullLaps}</dt>
          <dd data-testid="full-laps">${e.full_laps}</dd>
        </div>
        <div>
          <dt>${a.resultEstimatedPartialLap}</dt>
          <dd data-testid="estimated-partial-lap">${ge(e.estimated_partial_lap,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalLaps}</dt>
          <dd data-testid="total-laps">${ge(e.total_laps,n)}</dd>
        </div>
        <div>
          <dt>${a.resultTotalTime}</dt>
          <dd data-testid="total-time">${o}</dd>
        </div>
        <div>
          <dt>${a.resultRawDistance}</dt>
          <dd data-testid="raw-distance">${s}</dd>
        </div>
        <div>
          <dt>${a.resultDelta}</dt>
          <dd data-testid="delta">${r}</dd>
        </div>
      </dl>
      ${d}
    </section>
    ${l}
    ${u}
    ${m}
    ${w}
    ${c}
  `}function Wt(e,t){const n=e==="missing_file"?j[t].missingFileError:Ot(e,t);return`<section class="panel error-panel" role="alert"><h2>${j[t].errorTitle}</h2><p>${n}</p></section>`}function Ut(e){return typeof e.text=="function"?e.text():new Promise((t,n)=>{const a=new FileReader;a.addEventListener("load",()=>t(String(a.result??""))),a.addEventListener("error",()=>n(new P("file_read_failed"))),a.readAsText(e)})}function Kt(e){const t=e.querySelector("[data-testid='result-summary']");if(!t)return;const n=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;t.scrollIntoView?.({behavior:n?"auto":"smooth",block:"start"})}function Yt(){return`
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
  `}function Vt(){return{status:"idle"}}function Jt(e){e.innerHTML=Yt();const t=e.querySelector("[data-testid='language-label']"),n=e.querySelector("[data-testid='language-group']"),a=e.querySelector("[data-testid='hero-eyebrow']"),s=e.querySelector("[data-testid='hero-subtitle']"),r=e.querySelector("[data-testid='hero-title']"),o=e.querySelector("[data-testid='hero-intro']"),i=e.querySelector("[data-testid='file-label']"),c=e.querySelector("[data-testid='lane-label']"),d=e.querySelector("[data-testid='analyze-button']"),l=e.querySelector("[data-testid='analysis-form']"),u=e.querySelector("[data-testid='state']"),m=e.querySelector("[data-testid='footer-author-label']"),f=e.querySelector("[data-testid='file-input']"),p=e.querySelector("[data-testid='lane-select']"),_=e.querySelectorAll("[data-language]"),w=e.querySelector("[data-testid='faq-eyebrow']"),g=e.querySelector("[data-testid='faq-title']"),T=e.querySelector("[data-testid='faq-intro']"),C=e.querySelector("[data-testid='faq-items']");if(!t||!n||!a||!s||!r||!o||!i||!c||!d||!l||!u||!m||!f||!p||_.length===0||!w||!g||!T||!C)throw new Error("Application root is missing required UI elements.");const S=t,A=n,v=a,h=s,x=r,Le=o,Me=i,Ee=c,Ce=d,Se=l,q=u,ve=m,$e=f,R=p,ee=Array.from(_),Ie=w,je=g,Ae=T,qe=C;let L=Gt(),z=Vt();function te(){const y=j[L],$=R.value||"1";document.documentElement.lang=L,S.textContent=y.languageLabel,A.setAttribute("aria-label",y.languageGroupLabel),v.textContent=y.heroBrand,h.textContent=y.heroSubtitle,x.textContent=y.heroTitle,Le.textContent=y.heroIntro,Me.textContent=y.fileLabel,Ee.textContent=y.laneLabel,Ce.textContent=y.analyzeButton,ve.textContent=y.footerAuthorLabel,Ie.textContent=y.faqEyebrow,je.textContent=y.faqTitle,Ae.textContent=y.faqIntro,qe.innerHTML=y.faqItems.map((b,M)=>`<article class="faq-item">
            <p class="faq-index">${String(M+1).padStart(2,"0")}</p>
            <h3>${b.question}</h3>
            <p>${b.answer}</p>
          </article>`).join(""),R.innerHTML=Object.entries(be).map(([b,M])=>`<option value="${b}">${y.laneOptionLabel(Number(b),Xt(M,L))}</option>`).join(""),R.value=$,ee.forEach(b=>{const X=b.dataset.language===L;b.setAttribute("aria-pressed",String(X)),b.classList.toggle("is-active",X)})}function D(){if(z.status==="idle"){q.innerHTML="";return}if(z.status==="loading"){q.innerHTML=`<section class="panel muted-panel" aria-live="polite">${j[L].loadingMessage}</section>`;return}if(z.status==="error"){q.innerHTML=Wt(z.code,L);return}q.innerHTML=Bt(z.result,z.laneLengthM,L)}function De(y){L=y,te(),D()}te(),D(),ee.forEach(y=>{y.addEventListener("click",()=>{const $=y.dataset.language;De($)})}),Se.addEventListener("submit",async y=>{y.preventDefault(),z={status:"loading"},D();const $=$e.files?.[0],b=Number(R.value);if(!$){z={status:"error",code:"missing_file"},D();return}try{const M=await Ut($);z={status:"success",result:Et(M,b),laneLengthM:Number(xe(b))}}catch(M){z={status:"error",code:Ve(M).code}}D(),z.status==="success"&&Kt(q)})}const _e=document.querySelector("#app");_e&&Jt(_e);
