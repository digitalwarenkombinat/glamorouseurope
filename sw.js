if(!self.define){let r,o={};const d=(e,l)=>(e=new URL(e+".js",l).href,o[e]||new Promise(n=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=n,document.head.appendChild(i)}else r=e,importScripts(e),n()}).then(()=>{let n=o[e];if(!n)throw new Error(`Module ${e} didn\u2019t register its module`);return n}));self.define=(e,l)=>{const n=r||("document"in self?document.currentScript.src:"")||location.href;if(o[n])return;let i={};const s=t=>d(t,n),c={module:{uri:n},exports:i,require:s};o[n]=Promise.all(e.map(t=>c[t]||s(t))).then(t=>(l(...t),i))}}define(["./workbox-3e911b1d"],function(r){"use strict";self.skipWaiting(),r.clientsClaim(),r.precacheAndRoute([{url:"index-PEMZHIUN.js",revision:null},{url:"index-QRKmB5Jh.css",revision:null},{url:"index.html",revision:null},{url:"pwa-64x64.png",revision:"5b92749999a938c2f00c73135ef89c6b"},{url:"pwa-192x192.png",revision:"5d2322dbd5722c6f6809b5b5d46429f2"},{url:"pwa-512x512.png",revision:"921f5fadb70da56f69bb4539140fd572"},{url:"maskable-icon-512x512.png",revision:"084b31041f64392a2d2beb089908caa8"},{url:"manifest.webmanifest",revision:"4a167b547c64347d26602cc33d7243f2"}],{}),r.cleanupOutdatedCaches(),r.registerRoute(new r.NavigationRoute(r.createHandlerBoundToURL("index.html")))});
