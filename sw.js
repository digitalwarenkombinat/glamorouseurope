if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(i[l])return;let o={};const t=e=>n(e,l),u={module:{uri:l},exports:o,require:t};i[l]=Promise.all(r.map((e=>u[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index-cR3RGNPa.js",revision:null},{url:"index-ub8gcAuR.css",revision:null},{url:"index-xzSvTXjR.js",revision:null},{url:"index.html",revision:null},{url:"registerSW.js",revision:null},{url:"pwa-64x64.png",revision:"5b92749999a938c2f00c73135ef89c6b"},{url:"pwa-192x192.png",revision:"5d2322dbd5722c6f6809b5b5d46429f2"},{url:"pwa-512x512.png",revision:"921f5fadb70da56f69bb4539140fd572"},{url:"maskable-icon-512x512.png",revision:"084b31041f64392a2d2beb089908caa8"},{url:"manifest.webmanifest",revision:"4a167b547c64347d26602cc33d7243f2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
