if(!self.define){let i,e={};const s=(s,t)=>(s=new URL(s+".js",t).href,e[s]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=s,i.onload=e,document.head.appendChild(i)}else i=s,importScripts(s),e()})).then((()=>{let i=e[s];if(!i)throw new Error(`Module ${s} didn’t register its module`);return i})));self.define=(t,n)=>{const a=i||("document"in self?document.currentScript.src:"")||location.href;if(e[a])return;let c={};const o=i=>s(i,a),r={module:{uri:a},exports:c,require:o};e[a]=Promise.all(t.map((i=>r[i]||o(i)))).then((i=>(n(...i),c)))}}define(["./workbox-9b4d2a02"],(function(i){"use strict";importScripts(),self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"19c3a4528d9f5aed28636a4c019e2b35"},{url:"/_next/static/chunks/1101.9fb474cd28a5a4bb.js",revision:"9fb474cd28a5a4bb"},{url:"/_next/static/chunks/1313-e85cafd242ad5e89.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/1450-35465333e9509f77.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/1749-0441ae3864b9bb91.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/2304-0c02d233da9539b6.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/2439.437f4b90be71116f.js",revision:"437f4b90be71116f"},{url:"/_next/static/chunks/2899-d8ef60ad9feb6720.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/2909.49802ce973540930.js",revision:"49802ce973540930"},{url:"/_next/static/chunks/292-c400c5d80d54474e.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/2980.d4f0414784a12ccf.js",revision:"d4f0414784a12ccf"},{url:"/_next/static/chunks/3044-cc7cf7bebf92e688.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3051-3c1d5ca8726acb60.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3127-6c3888aab680a729.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3194-31cba61647a60690.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3657-b1040f3e5a25a1a6.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3741-9388037bd1265b5a.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3764-7598750b6ce4482a.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3868-f66cd1c6158ddc94.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3902-6208cf92be596954.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/3960-2318a6041dcd941a.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/4389-f89cb0c3f7c14ca8.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/4678-36e63fc705e2e4e5.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/4938-1f1f48ea24789bef.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/5020-bdbe2774acd0037c.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/5545.63302f53fd579e6f.js",revision:"63302f53fd579e6f"},{url:"/_next/static/chunks/5572-5514f1ce3d28c78a.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/5826-5f463bfd3f8b3459.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6005-7023dc8ea84a443e.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/602dbae6-db9d653c1a62913b.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6039-f8ba4e5d670b28ba.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6151-d28c80d741cf3241.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6244-c90bd4f84aa508ee.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/654-06be3157e70a8d61.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6691-db1cb6be4fc64f75.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6737-154313748df8413b.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/6901-81199c9c9b606e97.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/7401-f185df628c1c19ce.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/7550-e320863b53d00297.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/7650.f28a15da7f16bed9.js",revision:"f28a15da7f16bed9"},{url:"/_next/static/chunks/7666-23d2f4af525b50ba.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/7827-5c0953048afcb667.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/8128-479893d720a5422b.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/8599-8f9920264bcc47b9.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/8939-7a9a65d85fbaa17c.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/8b30ef62-53aed13ca228fba5.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9012-c3702ede61fb5777.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9029-67045add18cf3af6.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9081-83d31a0251fda0c1.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9163-e3206f2d33e17c62.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9500-7acaed0d6e7bc1d5.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9969-3d6969880d216083.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/9980-f23e7ff6524d53ca.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/article/%5B...slug%5D/page-3ca8c28d9d3c98b0.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/attributions/page-55ef494778b3234a.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/articles/loading-77f4201246856b81.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/articles/page-087f1d61be860b9f.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/chapters/loading-0ee7845f41c21aed.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/chapters/page-2933177581359b23.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/layout-502dafe23762253c.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/browse/page-ea26dba7d3d226ee.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/%5BarticleId%5D/page-28cc9b42dc140c87.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/edit/page-67f375fd7c1983b5.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/error-c1923bd54df5a92f.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/layout-6309b1fd1cb016fd.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/chapter/%5BchapterId%5D/page-5ce60344f07f42f0.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/edit-article/%5BarticleId%5D/page-aa2158b08937cd86.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/layout-5b946ee7d5a5dc57.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/new/loading-90fc6ba5aa895d3c.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/new/page-d3c007ffe6769a2e.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/page-ec198506efb7e69d.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/privacy/page-0e6ca0213583d308.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/error-5a44c68fee28e8ff.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/page-faa784929dcc1fc3.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/profile/%5Busername%5D/private/page-87d6996e3fe9c7fb.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/random/loading-f3f02cd8d7716491.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/random/page-4ee95ed03a42ecb6.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(app)/terms/page-1592c15b3dc09639.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(authentication)/layout-f7d037db4a081f58.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(authentication)/login/page-5d0354b16325e1fb.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/(authentication)/register/page-43aafc40a7cc0bcb.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/_not-found-67b6f5c8cad04d52.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/error-858096474653dc94.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/app/layout-9a301489c28737cb.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/e6b75fd3-3a1a894d3ada9fa2.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/fd9d1056-31838fff4373994f.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/main-39fe1f4fed21b348.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/main-app-1cc3242a32fd4b34.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-5158f03cca84ccfd.js",revision:"oNymVOpoW4Ck8jOiS0iCM"},{url:"/_next/static/css/338fb1607f8402e7.css",revision:"338fb1607f8402e7"},{url:"/_next/static/css/5dca946160d93e6d.css",revision:"5dca946160d93e6d"},{url:"/_next/static/css/bc636276b55e8a69.css",revision:"bc636276b55e8a69"},{url:"/_next/static/css/d88babb6cc1fe3bd.css",revision:"d88babb6cc1fe3bd"},{url:"/_next/static/media/logo-utf-sm-inverted.6bf52b4e.png",revision:"60b867d86458501d93d6b42855f7a3a7"},{url:"/_next/static/media/logo-utf-sm.0704de23.png",revision:"bd8522d6cb548044d3445baffedced92"},{url:"/_next/static/media/utf-bg.c24164be.jpg",revision:"017a8a240f44866980b426df847d59ff"},{url:"/_next/static/media/vecteezy_new-file-empty-state-single-isolated-icon-with-flat-style_11537831.f2550479.svg",revision:"8f7568b02228a6cc3fc04ce2176f0764"},{url:"/_next/static/oNymVOpoW4Ck8jOiS0iCM/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/oNymVOpoW4Ck8jOiS0iCM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/google9365f4fd3245c688.html",revision:"9b6da80ea580c24d1cf362a5eb8f8c70"},{url:"/icon-192x192.png",revision:"91e7778bd8569ebede555ca01b778dc9"},{url:"/icon-256x256.png",revision:"2241ea378612ecec7db96e436ef76db6"},{url:"/icon-384x384.png",revision:"96d8d48f7dc8bcd5509f321213dc5996"},{url:"/icon-512x512.png",revision:"22b14f5539d9330017957ef09cc01e12"},{url:"/loaderio-26a619f17d42d0c2cf8fdac721627b3d.txt",revision:"370521bd6baad68f246769efee25abe5"},{url:"/manifest.json",revision:"04b2a97a9d28c61889da8e736afbcdb2"}],{ignoreURLParametersMatching:[]}),i.cleanupOutdatedCaches(),i.registerRoute("/",new i.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:i,response:e,event:s,state:t})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),i.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new i.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new i.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),i.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new i.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new i.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),i.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new i.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new i.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),i.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new i.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new i.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\/_next\/image\?url=.+$/i,new i.StaleWhileRevalidate({cacheName:"next-image",plugins:[new i.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\.(?:mp3|wav|ogg)$/i,new i.CacheFirst({cacheName:"static-audio-assets",plugins:[new i.RangeRequestsPlugin,new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\.(?:mp4)$/i,new i.CacheFirst({cacheName:"static-video-assets",plugins:[new i.RangeRequestsPlugin,new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\.(?:js)$/i,new i.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\.(?:css|less)$/i,new i.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new i.StaleWhileRevalidate({cacheName:"next-data",plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute(/\.(?:json|xml|csv)$/i,new i.NetworkFirst({cacheName:"static-data-assets",plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute((({url:i})=>{if(!(self.origin===i.origin))return!1;const e=i.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new i.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new i.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),i.registerRoute((({url:i})=>{if(!(self.origin===i.origin))return!1;return!i.pathname.startsWith("/api/")}),new i.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),i.registerRoute((({url:i})=>!(self.origin===i.origin)),new i.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new i.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
