# Relatório — Redesign Neo Dashboard 2026

Data: 2026-05-15

## Objetivo

Alterar completamente a aparência visual do site para uma experiência mais próxima das referências enviadas: interface monocromática, cartões arredondados, estética de app, painel lateral no desktop e navegação inferior no celular.

## Arquivos alterados

- Criado `css/neo-dashboard-2026.css` como camada final de design.
- Adicionado o stylesheet `neo-dashboard-2026.css?v=20260515neo1` nas páginas HTML que já carregavam `app-soft-mobile.css`.
- Atualizados também os partials de `head` para manter o novo CSS em futuras gerações por template.

## Principais mudanças visuais

- Paleta monocromática clara/escura com preto, branco e cinzas suaves.
- Cards com cantos grandes, sombra suave e efeito glass/neumórfico.
- Layout desktop com menu lateral fixo em formato de dashboard.
- Mobile com leitura em cards, botões em pílula e navegação inferior preta no estilo app.
- Header mais editorial, com tipografia grande, menos aparência institucional pesada e mais visual de produto digital.
- Imagens e ícones tratados em escala de cinza para aproximar da estética das referências.
- Inputs, tabelas, filtros, cards de produtos, anúncios e rodapé redesenhados por CSS sem alterar dados ou lógica JavaScript.

## Observações técnicas

- A alteração foi feita como camada CSS final para reduzir risco sobre dados, scripts e marcações existentes.
- O CSS antigo permanece disponível; o novo arquivo sobrescreve a aparência por estar carregado por último.
- Os testes básicos existentes indicaram falhas pré-existentes/não relacionadas ao redesign: divergência entre alguns templates e HTML público atual, ausência de `instituicao_header` em `produtos.html` e nome de arquivo com caractere arriscado em imagem antiga. As referências locais e sintaxe JavaScript passaram.
