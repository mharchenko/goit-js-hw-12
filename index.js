import{a as v,S as H,i}from"./assets/vendor-BMSPLjta.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=e(t);fetch(t.href,n)}})();const P="46807099-cbb80e6feaa2f2d0498acb57e",$="https://pixabay.com/api/";let c=1,f="";async function h(o){f=o;const r=`${$}?key=${P}&q=${encodeURIComponent(f)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${c}`;try{const e=await v.get(r);return c++,{images:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error fetching images:",e),e}}function E(){c=1}function x(){return c}const y=document.querySelector(".gallery");let B=new H(".gallery a");function _(){y.innerHTML=""}function p(o){const r=o.map(({webformatURL:e,largeImageURL:a,tags:t,likes:n,views:s,comments:S,downloads:q})=>`
      <a href="${a}" class="gallery__item">
        <img class="gallery-link" src="${e}" alt="${t}" loading="lazy" />
        <div class="info">
          <p class="text-item"><b>Likes:</b> ${n}</p>
          <p class="text-item"><b>Views:</b> ${s}</p>
          <p class="text-item"><b>Comments:</b> ${S}</p>
          <p class="text-item"><b>Downloads:</b> ${q}</p>
        </div>
      </a>
    `).join("");y.insertAdjacentHTML("beforeend",r),B.refresh()}const I=document.querySelector("#search-form"),b=document.querySelector(".loader"),l=document.querySelector(".load-more");let u="",d=0,m=!0;function M(){b.classList.remove("hidden")}function g(){b.classList.add("hidden")}function L(){l.classList.remove("hidden")}function w(){l.classList.add("hidden")}async function O(){l.disabled=!0;try{const{images:o,totalHits:r}=await h(u);r!==void 0&&(d=r),p(o),x()*15>=d?(w(),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):L();const e=document.querySelector(".gallery .gallery__item");if(e){const a=e.getBoundingClientRect().height;window.scrollBy({left:0,top:a*2,behavior:"smooth"})}}catch{i.error({title:"Error",message:"Something went wrong. Please try again later!"})}finally{l.disabled=!1}}function T(){if(m){const o=document.querySelector(".gallery");if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),m=!1}}}I.addEventListener("submit",async o=>{o.preventDefault();const r=o.currentTarget.elements.query.value.trim();if(!r){i.error({title:"Error",message:"Please enter a search term!"});return}u=r,_(),E(),w(),M();try{const{images:e,totalHits:a}=await h(u);g(),a!==void 0&&(d=a),e.length===0?i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(p(e),e.length<d&&L(),T())}catch{g(),i.error({title:"Error",message:"Something went wrong. Please try again later!"})}});l.addEventListener("click",O);
//# sourceMappingURL=index.js.map