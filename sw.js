if(!self.define){let n,l={};const d=(e,s)=>(e=new URL(e+".js",s).href,l[e]||new Promise(i=>{if("document"in self){const r=document.createElement("script");r.src=e,r.onload=i,document.head.appendChild(r)}else n=e,importScripts(e),i()}).then(()=>{let i=l[e];if(!i)throw new Error(`Module ${e} didn\u2019t register its module`);return i}));self.define=(e,s)=>{const i=n||("document"in self?document.currentScript.src:"")||location.href;if(l[i])return;let r={};const o=t=>d(t,i),c={module:{uri:i},exports:r,require:o};l[i]=Promise.all(e.map(t=>c[t]||o(t))).then(t=>(s(...t),r))}}define(["./workbox-3e911b1d"],function(n){"use strict";self.skipWaiting(),n.clientsClaim(),n.precacheAndRoute([{url:"index-_QMEegZy.css",revision:null},{url:"index-MRzlPgmJ.js",revision:null},{url:"index.html",revision:null},{url:"registerSW.js",revision:null},{url:"pwa-64x64.png",revision:"5b92749999a938c2f00c73135ef89c6b"},{url:"pwa-192x192.png",revision:"5d2322dbd5722c6f6809b5b5d46429f2"},{url:"pwa-512x512.png",revision:"921f5fadb70da56f69bb4539140fd572"},{url:"maskable-icon-512x512.png",revision:"084b31041f64392a2d2beb089908caa8"},{url:"manifest.webmanifest",revision:"4a167b547c64347d26602cc33d7243f2"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("index.html")))});
