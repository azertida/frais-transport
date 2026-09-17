/* Service worker — Frais de transport
   Stratégie : la page est servie depuis le réseau quand il est là (pour recevoir
   les mises à jour), depuis le cache sinon. Les icônes viennent du cache d'abord.
   Après chaque modification de l'appli, incrémente VERSION. */

const VERSION = "v1";
const CACHE = "frais-transport-" + VERSION;

const FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FICHIERS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method !== "GET") return;

  // Navigation : réseau d'abord, cache en secours
  if(req.mode === "navigate"){
    e.respondWith(
      fetch(req)
        .then(rep=>{
          const copie = rep.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copie));
          return rep;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Le reste : cache d'abord
  e.respondWith(
    caches.match(req).then(rep => rep || fetch(req).then(r=>{
      if(r && r.status === 200 && r.type === "basic"){
        const copie = r.clone();
        caches.open(CACHE).then(c => c.put(req, copie));
      }
      return r;
    }).catch(()=>rep))
  );
});
