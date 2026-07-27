# RDO Diário de Obra PRO — Master Energy

Aplicativo de Relatório Diário de Obra (RDO) em uma única página HTML, sem necessidade de servidor. Todos os dados ficam salvos no navegador (localStorage) do aparelho que abrir a página.

## Como colocar no GitHub

1. Crie um repositório novo no GitHub (pode ser público ou privado).
2. Suba o arquivo `index.html` deste pacote para a raiz do repositório.
   - Pelo site do GitHub: botão **"Add file" → "Upload files"**, arraste o `index.html`, e clique em **"Commit changes"**.
3. (Opcional, recomendado) Ative o **GitHub Pages** para ter um link público que abre a página direto, sem baixar nada:
   - No repositório, vá em **Settings → Pages**.
   - Em **"Branch"**, selecione `main` (ou `master`) e a pasta `/ (root)`.
   - Clique em **Save**.
   - Depois de 1–2 minutos, o link vai ficar disponível em algo como:
     `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Por que isso resolve o problema de abrir no celular

Abrindo pelo link do GitHub Pages, o celular sempre abre direto no navegador — sem depender do gerenciador de arquivos, sem risco de abrir como texto/código, do jeito que estava acontecendo antes com o arquivo baixado manualmente.

## Importante sobre os dados salvos

Os dados (RDOs preenchidos) ficam salvos **no navegador de cada aparelho**, não no GitHub. Ou seja:
- O GitHub aqui serve só para hospedar o *código* da página (é só um link fixo pra abrir).
- Se você abrir o link em outro celular ou limpar os dados do navegador, os RDOs salvos anteriormente não aparecem lá — cada aparelho tem seu próprio armazenamento local.
- Use o botão de **Backup** dentro do app regularmente para exportar seus RDOs (evita perda de dados).

Se no futuro quiser dados compartilhados entre aparelhos/usuários com backup em nuvem, é necessário integrar um banco de dados real (ex: Supabase) — isso é um passo separado, ainda não incluído aqui.
