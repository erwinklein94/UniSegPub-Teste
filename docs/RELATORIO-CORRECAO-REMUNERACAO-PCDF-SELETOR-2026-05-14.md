# Correção — PCDF na aba Remuneração

Data: 2026-05-14

## Problema identificado

A PCDF já estava cadastrada nos dados de remuneração e já havia um card editorial na página `remuneracao.html`, mas a instituição não havia sido inserida no seletor específico da aba **Remuneração** (`#remu-filtro-instituicao`).

Com isso, o usuário não conseguia localizar a PCDF pelo filtro/caixa de seleção da própria aba, dando a impressão correta de que a alteração não existia na tela.

Também havia risco de cache porque os scripts principais de remuneração ainda estavam referenciados com versões antigas na query string.

## Correções aplicadas

- Inserida a opção `PCDF — Polícia Civil do Distrito Federal` no seletor `#remu-filtro-instituicao`, dentro do grupo `Distrito Federal (DF)`.
- Mantido o card `#remu-card-pcdf` com os dados já cadastrados.
- Confirmada a tabela detalhada da PCDF em `js/data/parametros-cargos.js` com 28 linhas.
- Confirmado o serviço `js/services/remuneracao.js` com `pcdf: CARGOS_PCDF`.
- Atualizado o contador inicial da página para `57 instituições com remuneração cadastrada`.
- Adicionada sincronização da aba Remuneração com os seletores globais `#instituicao`, `#instituicao_header` e `#instituicao_home`.
- Atualizadas as versões/cache busting dos scripts de remuneração em `remuneracao.html` para `20260514pcdffix1`.

## Validações realizadas

- `node --check js/pages/remuneracao-tabelada.js`
- `node --check js/services/remuneracao.js`
- `node --check js/data/parametros-cargos.js`
- `node --check js/data/portal-config.js`
- Teste lógico em Node confirmando `gerarRemuneracaoTabelada('pcdf')` com 28 linhas.

## Resultado esperado

Ao selecionar ou pesquisar PCDF na aba **Remuneração**, o site deve exibir:

- card editorial da PCDF;
- tabela detalhada da PCDF;
- menor bruto listado: R$ 13.794,41;
- maior bruto listado: R$ 38.872,66;
- fonte SEEC/DF e Lei nº 15.395/2026.
