(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const u=new Map,w=t=>(!u.has(t)&&u.set(t,new Map),u.get(t)),b=(t,e)=>{const o=w(t);for(const[n,s]of Object.entries(e))o.set(n,s)},y=(t,...e)=>{const o=u.get(t);if(!o)return null;const n=Object.fromEntries(o.entries());if(e.length===0)return n;let s=n;for(const a of e){if(s==null||typeof s!="object")return null;s=s[a]}return s??null},c={set:b,get:y},h=document.querySelector("table.compare"),m=t=>{const e=document.createElement("button");e.classList.add("close"),e.textContent="✕",t.append(e)};h.addEventListener("click",t=>{if(t.target.nodeName==="BUTTON"&&t.target.className==="close"){const o=t.target.parentElement.cellIndex;[...h.querySelectorAll(`tr > :nth-child(${o+1})`)].forEach(s=>s.remove())}});document.querySelector("table.compare");const $=()=>'<img class="loading" src="icons/spinner.svg" alt="Loading...">',d=async t=>{const e=localStorage.getItem(t);if(e)return JSON.parse(e);{const o=await fetch(t).then(n=>n.json());return localStorage.setItem(t,JSON.stringify(o)),o}},S=5,z=async t=>{const e=await d(`https://unpkg.com/${t}/package.json`),o=e.repository.url?e.repository.url.replace(/\.git$/ig,"").replace("git+",""):e.repository&&!e.repository.includes("github.com")?`https://github.com/${e.repository}`:e.repository&&e.repository.includes("github.com")?e.repository:e.bugs.replace("/issues","");c.set(t,{name:e.name,description:e.description,github:{url:o,author:o.split("/").slice(-2,-1).join("/"),repoName:o.split("/").slice(-1).join("/")},"package.json":{main:e.main??"",exports:(e==null?void 0:e.exports["."])??{},version:e.version,keywords:e.keywords,type:e.type??"commonjs",dependencies:e.dependencies??{},devDependencies:e.devDependencies??{}}})},x=async t=>{const{downloads:e}=await d(`https://api.npmjs.org/versions/${t}/last-week`),{downloads:o}=await d(`https://api.npmjs.org/downloads/point/last-week/${t}`),n=Object.entries(e).sort((r,i)=>i[1]-r[1]).slice(0,S).sort((r,i)=>i[0].localeCompare(r[0])),s=c.get(t,"package.json","version");n.map(r=>r[0]).includes(s)||(n.pop(),n.push([s,e[s]])),n.push(["total",o]),c.set(t,{npm:{downloadsCount:n}})},E=t=>{const{main:e,type:o,exports:n}=c.get(t,"package.json"),s=o==="module"||Object.keys(n).includes("import"),a=!s||e.endsWith(".mjs")||Object.keys(n).includes("require"),r=s&&a;c.set(t,{moduleType:{isESM:s,isCommonJS:a,isDual:r}})},k=async t=>{const e=c.get(t,"github"),o=`${e.author}/${e.repoName}`,n=await d(`https://api.github.com/repos/${o}`);c.set(t,{github:{...e,avatar:n.owner.avatar_url,stars:n.stargazers_count,forks:n.forks,issues:n.open_issues,homepage:n.homepage,topics:n.topics}})},C=async t=>{const e=c.get(t,"github"),o=`${e.author}/${e.repoName}`,n=await d(`https://api.github.com/repos/${o}/releases/latest`);c.set(t,{github:{...e,latestReleaseDate:n.published_at}})},L=async t=>{const e=await d(`https://edge.bundlejs.com/?q=${t}`);c.set(t,{bundlejs:{size:e.size.rawUncompressedSize,gzip:e.size.rawCompressedSize,depSize:(e==null?void 0:e.installSize.total)??"Unknown"}})},M=async t=>{await z(t),await k(t),await x(t),await C(t),await L(t),E(t)},j=t=>{const e=c.get(t,"github","avatar"),o=c.get(t,"description");return`<div class="column-2">
    <style>
      @scope {
        :scope {
          --size: 64px;

          padding: 0.5rem 0;
        }

        .avatar {
          width: var(--size);
          aspect-ratio: 1;
        }
        span {
          z-index: 5;
        }
      }
    </style>
    <img class="avatar" src="${e}&size=128" alt="${t}">
    <span>${o}</span>
  </div>`},I=t=>{const e=c.get(t,"package.json","version"),o=c.get(t,"github","latestReleaseDate").substring(0,10),n=c.get(t,"moduleType"),s=[];n.isESM&&s.push("esm"),n.isCommonJS&&s.push("cjs");const a=Object.keys(c.get(t,"package.json","dependencies"));return`<div>
    <style>
      @scope {
        .features {
          display: flex;
          flex-wrap: wrap;
          width: max-content;
          margin: 0.5rem auto 0;
          gap: 0.5rem;
        }
      }
    </style>
    <strong>${e}</strong>
    <small>${o}</small>
    <div class="features">
      ${s.map(r=>`<span class="badge ${r}">${r}</span>`).join("")}
      ${a.length===0?'<span class="badge err">0-dep</span>':""}
    </div>
  </div>`},l=t=>t>=1e6?`${Math.floor(t/1e6)}M`:t>=1e3?`${Math.floor(t/1e3)}K`:t.toString(),D=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
  viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
  <path fill="currentColor"
    d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z" />
</svg>
`,N=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
  viewBox="0 0 24 24"><!-- Icon from EOS Icons by SUSE UX/UI team - https://gitlab.com/SUSE-UIUX/eos-icons/-/blob/master/LICENSE -->
  <path fill="currentColor"
    d="M19 2a2.993 2.993 0 0 0-1 5.816V11H6V7.816a3 3 0 1 0-2 0V11a2 2 0 0 0 2 2h5v4.184a3 3 0 1 0 2 0V13h5a2 2 0 0 0 2-2V7.816A2.993 2.993 0 0 0 19 2M5 6a1 1 0 1 1 1-1a1 1 0 0 1-1 1m7 15a1 1 0 1 1 1-1a1 1 0 0 1-1 1m7-15a1 1 0 1 1 1-1a1 1 0 0 1-1 1" />
</svg>
`,O=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
  viewBox="0 0 16 16"><!-- Icon from Codicons by Microsoft Corporation - https://github.com/microsoft/vscode-codicons/blob/main/LICENSE -->
  <g fill="currentColor">
    <path d="M7.5 1a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 12a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11" />
    <circle cx="7.5" cy="7.5" r="1" />
  </g>
</svg>
`,H=t=>{const e=c.get(t,"github"),o=l(e.stars),n=l(e.forks),s=l(e.issues);return`
    <style>
      @scope {
        span {
          border: 1px solid #e7e7e7;
          color: #787878;
          font-weight: 350;
          padding: 0.5rem;
        }

        span svg {
          width: 32px;
          vertical-align: middle;
        }
      }
    </style>
    <div class="github-stats">
      <span>${D}${o}</span>
      <span>${N}${n}</span>
      <span>${O}${s}</span>
    </div>
  `},T=t=>{const e=c.get(t,"github","topics"),o=c.get(t,"package.json","keywords");return`<div>
    <style>
      @scope {
        :scope {
          --bgcolor: #134aaf;

          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          color: #fff;
          gap: 0.5rem;
          margin: auto 0.5rem;
        }
      }
    </style>
    ${(e.length===0?o:e).map(s=>`<span class="badge">${s}</span>`).join("")}
  </div>`},A=t=>{const{homepage:e,url:o}=c.get(t,"github");return`
    <div>
      <a href="${e}"><img src="/icons/link.svg" alt="Link"></a>
      <a href="${o}"><img src="/icons/github.svg" alt="GitHub"></a>
    </div>
  `},V=t=>{c.get(t,"package.json","version");const e=c.get(t,"npm","downloadsCount"),[,o]=e.pop(),n=Math.max(...e.map(([a,r])=>r??0)),s=([a,r])=>{const i=l(r??0),p=Math.floor((r??0)*100/n);return`<div class="column ${p===100?"highlight":""}">
      <span class="q">${i}</span>
      <div class="bar" style="--size: ${p}%"><div class="inner"></div></div>
      <span class="v">${a}</span>
    </div>`};return`
  <div class="npm-downloads">
    ${e.map(a=>s(a)).join("")}
  </div>`},q=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
  <path fill-rule="evenodd"
    d="M12 1C9.79 1 8 2.31 8 3.92c0 1.94.5 3.03 0 6.08c0-4.5-2.77-6.34-4-6.34c.05-.5-.48-.66-.48-.66s-.22.11-.3.34c-.27-.31-.56-.27-.56-.27l-.13.58S.7 4.29.68 6.87c.2.33 1.53.6 2.47.43c.89.05.67.79.47.99C2.78 9.13 2 8 1 8S0 9 1 9s1 1 3 1c-3.09 1.2 0 4 0 4H3c-1 0-1 1-1 1h6c3 0 5-1 5-3.47c0-.85-.43-1.79-1-2.53c-1.11-1.46.23-2.68 1-2c.77.68 3 1 3-2c0-2.21-1.79-4-4-4zM2.5 6c-.28 0-.5-.22-.5-.5s.22-.5.5-.5s.5.22.5.5s-.22.5-.5.5z"
    fill="currentColor" />
</svg>
`,_=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
  <path
    d="M17 14a5 5 0 0 0 2.71-.81L20 13a3.16 3.16 0 0 0 .45-.37l.21-.2a4.48 4.48 0 0 0 .48-.58l.06-.08a4.28 4.28 0 0 0 .41-.76a1.57 1.57 0 0 0 .09-.23a4.21 4.21 0 0 0 .2-.63l.06-.25A5.5 5.5 0 0 0 22 9V2l-3 3h-4l-3-3v7a5 5 0 0 0 5 5zm2-7a1 1 0 1 1-1 1a1 1 0 0 1 1-1zm-4 0a1 1 0 1 1-1 1a1 1 0 0 1 1-1z"
    fill="currentColor" />
  <path
    d="M11 22v-5H8v5H5V11.9a3.49 3.49 0 0 1-2.48-1.64A3.59 3.59 0 0 1 2 8.5A3.65 3.65 0 0 1 6 5a1.89 1.89 0 0 0 2-2a1 1 0 0 1 1-1a1 1 0 0 1 1 1a3.89 3.89 0 0 1-4 4C4.19 7 4 8.16 4 8.51S4.18 10 6 10h5.09A6 6 0 0 0 19 14.65V22h-3v-5h-2v5z"
    fill="currentColor" />
</svg>
`,U=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
  <path fill="currentColor"
    d="M374 74.47c-7.1.26-10.8 6.79-4.3 15.89l24-3.41c-6.5-9.11-14.1-12.69-19.7-12.48m-38 9.1c-3.5 0-6.6 1.01-9 2.73c-7.1 5.1-7.6 16.8 7.9 28c-8.9 15.9-29.8 45.8-60.2 43.2l32.1 9.8c-2.7 1.6-5.7 3.1-9.2 4.5C118.7 119.4 29.29 275.1 29.29 275.1c51.1 69.9 4.1 98.9 4.1 98.9l7.81 63h28.81l3.19-41s32.5-3 62.8-63.3c29 9.8 71 9.1 102.6 3.3l-4.1 7.1l-37.4 11.1c31.2 2.8 58.5-2.3 78.7-8.5c-3.4-15.1-4.5-31.5 3.5-52.8L307.2 437h25.9s-4.6-75 34.4-143.5c5-7.8 9.4-15.1 13.1-23.7l2 11.1l-10.5 23.2s39-15.7 29.2-96c23 3.9 45.6 1.7 66.6-4.6c5.3-1.7 9.5-5.8 11.2-11c5-15.6 9.5-32.5 10.4-47.3l-9.7.8c-.2-15.3-21.2-13.1-14.9.8l-10.5.5l-4.9-15.5s16.9-12.3 38.4-7.1c-.9-3.2-2.2-6-3.9-8.6c-13.8-20.8-54.3-27.8-122.4-15.6c-8-12.24-17.8-16.96-25.6-16.93m49.9 33.83c12.4 1.4 21.9 4.3 30.2 9.6h-15.9c-1.6 4.8-7.5 8.4-14.5 8.4s-12.9-3.6-14.5-8.4h-15.5c4.2-3 15.3-9.7 30.2-9.6m9.6 181.6c-15.2 30.3-34.5 33.8-34.5 33.8c-13.4 37.7-10.4 71.8 1.8 103.9H385c-3.8-44.7-3.2-78.4 10.5-137.7m-251.1 50.3L126.6 376l27.2 25.1l13.9 35.6h29.9l-20.1-81.8z" />
</svg>
`,B=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <path fill="currentColor" d="M28 10a4 4 0 0 0-4-4h-6v6a6 6 0 0 1-6 6h-2v2h2v6h4v-6h8v6h4V16h2v-4a2 2 0 0 0-2-2" />
  <path fill="currentColor"
    d="M12 4H8v2a6 6 0 0 0-6 6v6a2 2 0 0 0 2 2v2H2.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5H6a2 2 0 0 0 2-2v-8h4a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4M6 14H4v-2h2Z" />
</svg>
`,g=[{size:5e3,icon:q},{size:5e4,icon:_},{size:1e5,icon:U},{size:5e5,icon:B}],P=t=>{const{size:e,gzip:o,depSize:n}=c.get(t,"bundlejs"),s=g.findIndex(i=>e<i.size)??g.length,a=g[s].size,r=g[s].icon;return`
  <div>
  <style>
      @scope {
        :scope {
          display: flex;
          gap: 1rem;
          align-items: center;
          width: max-content;
          margin: auto;
        }

        svg {
          color: #999;
        }

        .bar {
          --gzip-size: ${o*100/a}%;
          --size: ${e*100/a}%;

          width: 200px;
          height: 25px;
          background: #ccc;
          display: flex;
          position: relative;

          & > div {
            position: absolute;
            left: 0;

            &::after {
              content: "";
              background: linear-gradient(to bottom, transparent 25%, #0005 70% 100%);
              display: block;
              position: absolute;
              inset: 0;
            }
          }

          & .gzip-bar { width: var(--gzip-size); height: 100%; background: green; z-index: 2; }
          & .size-bar { width: var(--size); height: 100%; background: gold; z-index: 1; }
        }
      }
    </style>
    <span title="< ${l(a)}">${r}</span>
    <div class="bar">
      <div class="gzip-bar" title="${l(o)}"></div>
      <div class="size-bar" title="${l(e)}"></div>
    </div>
  </div>
  `},v=document.querySelector("table.compare"),F="react",J=`
  <input class="search" type="search" placeholder="${F}" list="search-items">
  <datalist id="search-items"></datalist>
`;v.addEventListener("keyup",async t=>{const e=t.target.value,o=t.target.nodeName==="INPUT"&&t.target.getAttribute("type")==="search",n=t.key==="Enter";if(o&&n){f();const s=t.target.parentElement.cellIndex,a=v.querySelectorAll(`tr td:nth-of-type(${s})`);a.forEach(i=>i.setHTMLUnsafe($())),m(a[0]),await M(e);const r=[`<span>${e}</span>`,j(e),I(e),A(e),V(e),H(e),P(e),T(e)];a.forEach((i,p)=>i.setHTMLUnsafe(r[p])),m(a[0])}});const f=()=>{const t=[...document.querySelectorAll("table.compare > tr")],e=[];return t.forEach(o=>{const n=document.createElement("td");e.push(n),o.append(n)}),e[0].insertAdjacentHTML("beforeend",J),e[0].querySelector("input").focus(),e},R=document.querySelector("table.compare"),G=[{name:"Name",icon:null},{name:"Description",icon:"Description"},{name:"Features",icon:"Version"},{name:"Links",icon:"Links"},{name:"Downloads",icon:"Downloads"},{name:"Stats",icon:"Stats"},{name:"Sizes",icon:"Weight"},{name:"Topics",icon:"Hashtag"}],W=()=>{G.forEach(({name:t,icon:e})=>{const o=document.createElement("tr"),n=e?`<img src="/icons/${e.toLowerCase()}.svg" alt="${e}">`:"";o.setHTMLUnsafe(`
      <th>
        ${n}
        ${t}
      </th>
    `),R.append(o)})},Z=()=>{W(),f()};Z();document.body.addEventListener("click",()=>{window.Data=c});
