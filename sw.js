// Cache name is replaced per build (see vite.config.ts) so each release gets a fresh cache.
const C='mahj-d4-mvs1ccy1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon.svg'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Pages: network first (so a new release shows on reload), cache as offline fallback. Hashed assets: cache first.
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
const put=res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;};
if(r.mode==='navigate'){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r).then(h=>h||caches.match('./index.html'))));return;}
e.respondWith(caches.match(r).then(h=>h||fetch(r).then(put)));});
