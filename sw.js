// Service worker simples: guarda uma cópia da página (cache) pra ela abrir
// mesmo sem internet, e sempre tenta buscar a versão mais nova quando há
// conexão (os dados em si continuam vindo do localStorage/Supabase, isso
// aqui só garante que a PÁGINA em si abre offline).
const CACHE_NAME='rdo-master-energy-v1';
const ARQUIVOS=['./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(nomes=>Promise.all(nomes.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  // Tenta buscar da internet primeiro (pra sempre pegar a versão mais nova);
  // se não conseguir (sem internet), usa a cópia salva localmente.
  e.respondWith(
    fetch(e.request).then(resp=>{
      const copia=resp.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(e.request,copia));
      return resp;
    }).catch(()=>caches.match(e.request))
  );
});
