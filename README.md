# RDO Diário de Obra — Master Energy

Aplicativo web para preenchimento, controle e compartilhamento de RDOs
(Relatórios Diários de Obra) — montagem e manutenção industrial.

## O que é

Um único arquivo HTML autossuficiente (`index.html`), sem backend, sem
banco de dados externo. Os dados ficam salvos no navegador de cada
aparelho (`localStorage`) e o app funciona 100% offline depois do
primeiro carregamento.

## Funcionalidades

- Preenchimento de RDO com múltiplas Ordens de Serviço (OSE), controle
  de horas por funcionário, status de cada OSE (Em Andamento, Extra
  Escopo, Paralisado, Concluído, etc.)
- Numeração de RDO automática, sequencial e própria por obra
- Múltiplos RDOs no mesmo dia (obras/equipes diferentes)
- Exportação em PDF (compartilhável direto pelo WhatsApp), Excel e CSV
- Painéis consolidados: Extra Escopo, Andamento por Projeto, Horas por
  Projeto, Check de Integridade
- Busca organizada por obra e data, com opção de compartilhar/excluir
  cada RDO individualmente
- Backup e restauração completos (exportar/importar todos os RDOs)
- Totalmente responsivo (celular, tablet e computador)

## Como hospedar

Este repositório contém só um arquivo estático (`index.html`) — não
precisa de nenhuma etapa de build. Basta conectar este repositório a
uma plataforma de hospedagem estática (Vercel, Netlify, GitHub Pages)
e ela publica o site automaticamente.

## Tecnologias

HTML, CSS e JavaScript puros — sem framework, sem dependência de
build. Duas bibliotecas externas carregadas via CDN, só usadas nos
botões de exportação:

- [jsPDF](https://github.com/parallax/jsPDF) — geração de PDF
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) — geração de Excel

## Uso

Basta abrir a página publicada em qualquer navegador (celular ou
computador). Nenhum login, nenhuma instalação necessária.
