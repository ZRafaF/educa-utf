if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7175760bb4ebb65bdee02a59fe36c435"},{url:"/_next/static/_ggR4oMDkLyh_9d3rfj-0/_buildManifest.js",revision:"f73e8c19daa8474d229371b8da40f744"},{url:"/_next/static/_ggR4oMDkLyh_9d3rfj-0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1038-43afb9316954ea79.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/1232-e0b6e975a9a34aae.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/1272-b6fb63c357efbd55.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/1358-38b84aa944bf7fcd.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/176-fa2e3c9178295af2.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/2161-3bc7a8e43e9b1770.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/2218-eea4ba7029dc18a2.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/2430-149db5bec60de44a.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/251-5faaeaa08e1db6af.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/3213-96dac80f285190f3.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/3869-48a8a6f0ce272d2b.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/4320-80b49c5cf703a7e8.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/5218-f575e1f70fb73486.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/5457-d8153b2e513feed6.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/558-b67637ba138a1d60.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/5743-7536265fe2d8166f.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/596-524d899ea52c3898.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6003-0f0e7f21c9267aa3.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6009-60b0416a017ec7ec.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6029.9a16bf1ed72ac23e.js",revision:"9a16bf1ed72ac23e"},{url:"/_next/static/chunks/654-dc15400f6ef1d42c.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6597-cd1bda112c172d93.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6685-0dc10d29ff733985.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/6696-023a5c96a5e754b3.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/7327-4741cdfda5ac1d49.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/7445-361db9657cad80f1.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/7681-dde2d010cac321ec.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8276-480f71688923f7f7.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8643-4f55b9e66c503061.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8716-4969b48221d70cf1.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8785-5cb4a93e9331e1fc.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8874-f448cbf96e420059.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8940-d104b6ede93d3af7.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/8b30ef62-53aed13ca228fba5.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/9101-55968950bc329445.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/9140-e9ed52831d7ed855.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/9163-e3206f2d33e17c62.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/967.e1c936b938e6d210.js",revision:"e1c936b938e6d210"},{url:"/_next/static/chunks/9683-75238faba25b33c0.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/9686-b045cdd331b418b1.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/9891-b0268680721efc6d.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/article/%5B...slug%5D/page-7468445dc9a6333f.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/browse/articles/page-6e63bd3bf5ac004b.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/browse/chapters/page-878bd3ae91cfbe83.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/browse/layout-0b72faf23ee43e37.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/browse/page-74c456c580155dca.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/%5BarticleId%5D/page-932f730f865b3cbd.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/error-634c51ddb254d155.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/layout-019bc69ad1a4d6b2.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/page-51a5698996f01b40.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/edit/%5BarticleId%5D/page-756c9db88e896e0c.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/layout-467d22b17269d2e1.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/new-article/loading-c3ff414701618554.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/new-article/page-6c772027744e3afa.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/new-chapter/page-8758d3fef0bb60b4.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/page-95216492d1308b04.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/privacy/page-8e244598596fcb9b.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/error-1c8f01f342c0899f.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/page-e110ab9b3cbc2793.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/private/page-fe76372f34519095.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/random/loading-7b906fb43c49954f.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/random/page-ba47432766330438.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(app)/terms/page-40649b08b407237f.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(authentication)/layout-a0b418a26664e1f5.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(authentication)/login/page-7d5b897444be2855.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/(authentication)/register/page-a2611c97b64769e7.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/error-50c7cdf7024f7799.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/app/layout-b2b55f868b842d75.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/e6b75fd3-75ff2f962a9b8f62.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/fd9d1056-7dbb9725ac0ec4d7.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/main-400b066503c253db.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/main-app-1586656564d869fd.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/pages/_app-8af45f6c5c3cbc8e.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/pages/_error-6aec2ce618e2a362.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-88743c0ecb897fe8.js",revision:"_ggR4oMDkLyh_9d3rfj-0"},{url:"/_next/static/css/338fb1607f8402e7.css",revision:"338fb1607f8402e7"},{url:"/_next/static/css/5dca946160d93e6d.css",revision:"5dca946160d93e6d"},{url:"/_next/static/css/bc636276b55e8a69.css",revision:"bc636276b55e8a69"},{url:"/_next/static/css/d88babb6cc1fe3bd.css",revision:"d88babb6cc1fe3bd"},{url:"/_next/static/media/contemplative-reptile.8e5e4017.jpg",revision:"34dfeed20d644ba572bd2d8d31bc8d77"},{url:"/_next/static/media/logo-utf-sm-inverted.6bf52b4e.png",revision:"60b867d86458501d93d6b42855f7a3a7"},{url:"/_next/static/media/logo-utf-sm.0704de23.png",revision:"bd8522d6cb548044d3445baffedced92"},{url:"/_next/static/media/utf-bg.c24164be.jpg",revision:"017a8a240f44866980b426df847d59ff"},{url:"/google9365f4fd3245c688.html",revision:"9b6da80ea580c24d1cf362a5eb8f8c70"},{url:"/icon-192x192.png",revision:"91e7778bd8569ebede555ca01b778dc9"},{url:"/icon-256x256.png",revision:"2241ea378612ecec7db96e436ef76db6"},{url:"/icon-384x384.png",revision:"96d8d48f7dc8bcd5509f321213dc5996"},{url:"/icon-512x512.png",revision:"22b14f5539d9330017957ef09cc01e12"},{url:"/loaderio-26a619f17d42d0c2cf8fdac721627b3d.txt",revision:"370521bd6baad68f246769efee25abe5"},{url:"/manifest.json",revision:"04b2a97a9d28c61889da8e736afbcdb2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
