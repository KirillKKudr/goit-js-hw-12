import{a as L,i as m,S as $}from"./assets/vendor-Qob_5Ba8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const S="46859410-d5a1b7b8d3c8579cf11d58e8b",v="https://pixabay.com/api/";async function E(t,o=1,i=15){const s=`${v}?key=${S}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${i}`;try{const e=await L.get(s);return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Error fetching images:",e),e}}const y=()=>{m.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"})},q=()=>{m.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})},H=(t,o)=>{const i=t.map(({webformatURL:s,largeImageURL:e,tags:r,likes:n,views:p,comments:b,downloads:w})=>`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${s}" alt="${r}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${n}</p>
          <p><b>Views:</b> ${p}</p>
          <p><b>Comments:</b> ${b}</p>
          <p><b>Downloads:</b> ${w}</p>
        </div>
      </li>
    `).join("");o.insertAdjacentHTML("beforeend",i)},P=document.querySelector(".search-form"),g=document.querySelector(".gallery-list"),a=document.querySelector(".load-more"),d=15;let l=1,c="",u=0,O=new $(".gallery-list a");a.style.display="none";const M=()=>{const t=document.querySelector(".loader");t&&t.classList.add("show")},f=()=>{const t=document.querySelector(".loader");t&&t.classList.remove("show")};P.addEventListener("submit",async t=>{if(t.preventDefault(),g.innerHTML="",a.style.display="none",c=t.currentTarget.elements.search.value.trim(),l=1,c===""){y();return}await h()});a.addEventListener("click",async()=>{l+=1,await h()});async function h(){M();try{const{hits:t,totalHits:o}=await E(c,l,d);f(),l===1&&(u=o),t.length===0?(y(),a.style.display="none"):(H(t,g),O.refresh(),R(),l*d>=u?(a.style.display="none",q()):a.style.display="block")}catch(t){f(),console.error("Error processing images:",t),iziToast.error({title:"Error",message:"Failed to load images"})}}function R(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
