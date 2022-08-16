import{j as p,r as f,A as m,R as g,a as v}from"./vendor.5bbd1840.js";const x=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};x();const w="_container_c2uxa_1";var h={container:w,"distance-container":"_distance-container_c2uxa_6","compass-container":"_compass-container_c2uxa_22"};const t=p.exports.jsx,u=p.exports.jsxs,y=()=>{const[i,r]=f.exports.useState(0),[s,l]=f.exports.useState(0),e=(o,a,d)=>o+d*1e3<a;f.exports.useEffect(()=>{m.addModuleDataListener(n)},[]);const n=async o=>{const a=o.streams;if(Object.keys(a).length===0)throw new Error("No streams.");Object.keys(a).forEach((d,N)=>{const c=L(a,d);if(typeof c!="string"&&c!==void 0){if(a[d].data[0].name==="home.angle"){if(e(c[0],o.time,10)){r(0);return}r(c[1]*-1)}if(a[d].data[0].name==="home.distance"){if(e(c[0],o.time,10)){r(0);return}l(c[1])}}})};return u("div",{className:h.container,children:[t("div",{style:{transform:`rotate(${i}deg)`,transition:"200ms"},className:h["compass-container"],children:s===0?u("svg",{width:"24",height:"25",viewBox:"0 0 24 25",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("rect",{x:"9.76575",y:"9.89075",width:"4.46853",height:"4.46853",rx:"2.23427",fill:"white"}),t("circle",{cx:"12",cy:"12.125",r:"6.43592",stroke:"white",strokeWidth:"2"}),t("path",{d:"M12 4.79382V2.14062",stroke:"white"}),t("path",{d:"M12 22.1094V19.0024",stroke:"white"}),t("path",{d:"M18.9628 12.125L22 12.125",stroke:"white"}),t("path",{d:"M2.03126 12.125L4.68445 12.125",stroke:"white"})]}):u("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{transform:`scale(${1+s/10})`,transition:"100ms"},children:[t("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13 4V20H11V4H13Z",fill:"white"}),t("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L18.7071 9.29289L17.2929 10.7071L12 5.41421L6.70712 10.7071L5.29291 9.29289L11.2929 3.29289Z",fill:"white"})]})}),t("div",{className:h["distance-container"],children:t("span",{children:`${s.toFixed(2)}M`})})]})},L=(i,r)=>{if(i[r]===void 0)return"No stream.";if(i[r].loading)return;if(i[r].tooMuchData)return"Too much data.";if(i[r].data.length===0)return"No data.";const s=i[r].data[0].points.at(-1);return s||"No datapoints."},M=()=>t("div",{className:"App",children:t(y,{})});g.render(t(v.StrictMode,{children:t(M,{})}),document.getElementById("root"));
