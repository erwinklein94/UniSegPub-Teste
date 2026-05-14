# Correção — PCDF na aba Remuneração Tabelada

Data: 2026-05-14
Instituição: PCDF — Polícia Civil do Distrito Federal
Aba: remuneração.html

## Problema encontrado

O card estático da PCDF e a constante `CARGOS_PCDF` já estavam no projeto com os valores de remuneração. Porém, a tabela detalhada dinâmica estava exibindo a estrutura genérica da Polícia Civil criada em `CARGOS_ESTRUTURA_GENERICAS`, com 14 cargos e valores `Dados em breve`.

A causa era a precedência usada no carregamento da tabela:

```js
CARGOS_ESTRUTURA_GENERICAS[instNorm] || map[instNorm] || CARGOS_PM
```

Como `header-estados.js` cria uma estrutura genérica para `pcdf`, essa estrutura entrava antes da constante real `CARGOS_PCDF`.

## Correção aplicada

A precedência foi invertida para priorizar sempre a tabela real cadastrada em `map`:

```js
map[instNorm] || CARGOS_ESTRUTURA_GENERICAS[instNorm] || CARGOS_PM
```

Também foi aplicada a mesma lógica no seletor global de cargos:

```js
map[inst] || CARGOS_ESTRUTURA_GENERICAS[inst] || CARGOS_PM
```

## Arquivos alterados

- `js/services/remuneracao.js`
- `js/ui/navegacao-ui.js`
- `remuneracao.html` — atualização de cache dos scripts

## Validação

Validação local executada com Node:

- `node --check js/services/remuneracao.js`
- `node --check js/ui/navegacao-ui.js`
- `node --check js/data/parametros-cargos.js`
- `node --check js/pages/remuneracao-tabelada.js`

Resultado da simulação de renderização de `gerarRemuneracaoTabelada('pcdf')`:

- Linhas retornadas: 28
- Primeira linha: Delegado de Polícia PCDF — Classe Especial
- Menor remuneração: R$ 13.794,41
- Maior remuneração: R$ 38.872,66

## Fontes usadas para os valores PCDF

- SEEC/DF — Polícia Civil do Distrito Federal — tabela de escalonamento vertical, vigência janeiro/2026, atualizada em 11/03/2026.
- Anexos da Lei nº 15.395/2026 — atualização dos anexos da Lei nº 11.361/2006.
- A tabela da SEEC/DF informa que a carreira é remunerada exclusivamente por subsídio, fixado em parcela única, conforme Lei nº 11.361/2006.
- Auxílio-uniforme anual de R$ 3.000,00 e auxílio-alimentação suplementar não foram somados ao subsídio.
