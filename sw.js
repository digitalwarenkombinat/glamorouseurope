if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const f=e=>n(e,o),t={module:{uri:o},exports:d,require:f};i[o]=Promise.all(r.map((e=>t[e]||f(e)))).then((e=>(s(...e),d)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index-44ebca66.css",revision:null},{url:"index.html",revision:"1e14e0b44398b5875f1c47df04a4c394"},{url:"registerSW.js",revision:"d8e9f5c73f343cddaf0a37fade87de29"},{url:"pwa-64x64.png",revision:"5b92749999a938c2f00c73135ef89c6b"},{url:"pwa-192x192.png",revision:"5d2322dbd5722c6f6809b5b5d46429f2"},{url:"pwa-512x512.png",revision:"921f5fadb70da56f69bb4539140fd572"},{url:"maskable-icon-512x512.png",revision:"084b31041f64392a2d2beb089908caa8"},{url:"manifest.webmanifest",revision:"ca5e0d5dafaaf66b328a43e2cb73aad7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
