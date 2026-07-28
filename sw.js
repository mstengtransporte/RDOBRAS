// Service worker simples: guarda uma cópia da página (cache) pra ela abrir
// mesmo sem internet, e sempre tenta buscar a versão mais nova quando há
// conexão (os dados em si continuam vindo do localStorage/Supabase, isso
// aqui só garante que a PÁGINA em si abre offline).
const CACHE_NAME='rdo-master-energy-v2';
const ARQUIVOS=[
  './index.html','./manifest.json','./icon-192.png','./icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js'
];

self.addEventListener('install',e=>{
  // addAll() falha por completo se UM arquivo só der erro (ex: CDN fora do ar
  // naquele instante) — cacheando um por um, um problema isolado não derruba
  // o cache inteiro, e a página/ícones (os mais essenciais) quase sempre entram.
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>
      Promise.all(ARQUIVOS.map(url=>
        cache.add(url).catch(err=>console.log('SW: não conseguiu cachear',url,err))
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(nomes=>Promise.all(nomes.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  const url=e.request.url;
  const ehArquivoDoApp=ARQUIVOS.some(a=>url.endsWith(a.replace('./','')));

  if(ehArquivoDoApp){
    // Arquivos do próprio app (página, ícones, bibliotecas): abre INSTANTÂNEO usando
    // a cópia salva (evita ficar esperando a rede sem internet, que foi o que fez o
    // app "parar no logo" antes) — e por baixo dos panos já busca a versão mais nova
    // pra da próxima vez já estar atualizada.
    e.respondWith(
      caches.match(e.request).then(cached=>{
        const buscaEAtualiza=fetch(e.request).then(resp=>{
          caches.open(CACHE_NAME).then(cache=>cache.put(e.request,resp.clone()));
          return resp;
        }).catch(()=>cached);
        return cached||buscaEAtualiza;
      })
    );
    return;
  }

  // Qualquer outra requisição (ex: chamadas ao Supabase) passa direto pela rede,
  // sem interferência do cache — são dados que precisam estar sempre atualizados.
});
