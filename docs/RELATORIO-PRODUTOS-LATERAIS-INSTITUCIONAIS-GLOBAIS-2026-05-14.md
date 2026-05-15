# Relatório — Produtos laterais institucionais globais

Data: 2026-05-14

## Objetivo

Aplicar, em todas as abas com vitrine lateral de produtos, a lógica de exibir produtos relacionados à instituição pesquisada/selecionada pelo usuário.

## Comportamento implementado

- A vitrine lateral deixa de ser apenas fixa/genérica.
- Ao selecionar ou pesquisar uma instituição, o script passa a identificar o contexto institucional ativo.
- Se houver produtos relacionados à instituição, eles são priorizados nas laterais.
- Se não houver produto relacionado, a vitrine continua exibindo produtos gerais para não deixar os espaços vazios.
- A lógica funciona para todas as instituições cadastradas em `INSTITUICOES_VALIDAS` e `HEADER_INSTITUICOES_INFO`, sem precisar criar regra manual para cada nova corporação.

## Pontos de captura da instituição

O script observa:

- `body[data-inst]`;
- seletor geral `#instituicao`;
- seletor do topo `#instituicao_header`;
- seletor da home `#instituicao_home`;
- seletor de instituição do comparador de carreiras.

## Critérios de associação produto ↔ instituição

A classificação considera:

- filtro explícito do produto, quando existir (`filtro`, `filter`, `data-inst`, `data-instituicao`, `data-uf` etc.);
- sigla da instituição;
- título institucional cadastrado;
- nome por extenso;
- variações comuns como `PC DF`, `PM RJ`, `CBM RJ`, `PC-SP`, `PRF`, `PF` etc.;
- texto do título, descrição, imagem, badges e metadados do produto.

## Arquivos alterados

- `js/pages/produtos-laterais.js`
- `js/pages/produtos-render.js`
- `css/app-soft-mobile.css`
- páginas HTML com atualização de cache busting para `produtos-laterais.js`, `produtos-render.js` e `app-soft-mobile.css`

## Validação

Executado:

```bash
find js -name '*.js' -print0 | xargs -0 -n1 node --check
```

Resultado: sem erros de sintaxe.
