if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),f={module:{uri:o},exports:t,require:c};i[o]=Promise.all(s.map((e=>f[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-884fa05c.css",revision:null},{url:"assets/index-c9ce9232.js",revision:null},{url:"index.html",revision:"97be2536eab20df2b81d14aa232d8fc8"},{url:"registerSW.js",revision:"d8e9f5c73f343cddaf0a37fade87de29"},{url:"favicon.ico",revision:"37f48541ed3fcd732314305d30759265"},{url:"pwa-192x192.png",revision:"c7251451305a5543eb14c65321e99888"},{url:"pwa-512x512.png",revision:"a4eeabe09f60583c37368763e2e2f473"},{url:"manifest.webmanifest",revision:"5c55cc1b03ba1261f0843d2a2f44fd2a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
