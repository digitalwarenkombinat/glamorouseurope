if(!self.define){let n,o={};const d=(e,l)=>(e=new URL(e+".js",l).href,o[e]||new Promise(i=>{if("document"in self){const r=document.createElement("script");r.src=e,r.onload=i,document.head.appendChild(r)}else n=e,importScripts(e),i()}).then(()=>{let i=o[e];if(!i)throw new Error(`Module ${e} didn\u2019t register its module`);return i}));self.define=(e,l)=>{const i=n||("document"in self?document.currentScript.src:"")||location.href;if(o[i])return;let r={};const s=t=>d(t,i),c={module:{uri:i},exports:r,require:s};o[i]=Promise.all(e.map(t=>c[t]||s(t))).then(t=>(l(...t),r))}}define(["./workbox-3e911b1d"],function(n){"use strict";self.skipWaiting(),n.clientsClaim(),n.precacheAndRoute([{url:"index-fU5Lufi0.js",revision:null},{url:"index-hDcvfMRV.css",revision:null},{url:"index.html",revision:null},{url:"pwa-64x64.png",revision:"5b92749999a938c2f00c73135ef89c6b"},{url:"pwa-192x192.png",revision:"5d2322dbd5722c6f6809b5b5d46429f2"},{url:"pwa-512x512.png",revision:"921f5fadb70da56f69bb4539140fd572"},{url:"maskable-icon-512x512.png",revision:"084b31041f64392a2d2beb089908caa8"},{url:"manifest.webmanifest",revision:"4a167b547c64347d26602cc33d7243f2"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("index.html")))});
