# Relatório de pesquisa — Remuneração PCDF — 2026-05-14

## A) Identificação da instituição

- **Nome oficial completo:** Polícia Civil do Distrito Federal
- **Sigla pública:** PCDF
- **Sigla interna usada no site:** `pcdf`
- **Constante criada:** `CARGOS_PCDF`
- **Esfera no filtro do portal:** estadual/distrital (`data-esfera="estadual"`)
- **Ramo:** Polícia Civil
- **UF:** DF
- **Regime remuneratório:** subsídio bruto mensal, em parcela única
- **Mês/ano da tabela aplicada:** janeiro/2026
- **Data da pesquisa:** 2026-05-14

## B) Fontes oficiais e normativas consultadas

1. SEEC/DF — Polícia Civil do Distrito Federal — Tabela de Escalonamento Vertical — vigência janeiro/2026  
   URL: https://www.economia.df.gov.br/documents/d/seec/policia-civil-pdf

2. Câmara dos Deputados — Lei nº 15.395/2026 — Anexo III e Anexo IV, com atualização dos anexos da Lei nº 11.361/2006  
   URL: https://www2.camara.leg.br/legin/fed/lei/2026/lei-15395-27-abril-2026-799000-anexo-pl.pdf

3. SINJ/DF — Lei nº 7.072/2022 — auxílio-alimentação suplementar dos policiais civis do DF  
   URL: https://www.sinj.df.gov.br/sinj/Norma/d5793bf6d66e466cb64c459a2553adac/Lei_7072_21_02_2022.html

4. SINJ/DF — Lei nº 7.073/2022 — auxílio-uniforme da Polícia Civil do DF  
   URL: https://www.sinj.df.gov.br/sinj/Norma/d16976c9289945d3b0d2a4390b759baf/Lei_7073_21_02_2022.html

## C) Regras de interpretação usadas

- Foram cadastrados apenas valores brutos mensais de subsídio.
- Benefícios indenizatórios não foram somados ao `padrao`, para evitar superestimar a remuneração mensal fixa.
- A tabela SEEC/DF foi usada como fonte principal para nomenclatura operacional exibida no portal: Papiloscopista Policial, Escrivão de Polícia, Agente de Polícia e Agente Policial de Custódia.
- A Lei nº 15.395/2026 foi usada como fonte normativa para os valores de Delegado, Perito Criminal, Perito Médico-Legista e quadro da carreira de Polícia Civil do DF.

## D) Tabela normalizada para o site

| Cargo | Classe | Subsídio bruto mensal |
|---|---:|---:|
| Delegado de Polícia | Especial | R$ 38.872,66 |
| Delegado de Polícia | Primeira | R$ 32.382,34 |
| Delegado de Polícia | Segunda | R$ 27.703,52 |
| Delegado de Polícia | Terceira | R$ 26.690,15 |
| Perito Criminal | Especial | R$ 38.872,66 |
| Perito Criminal | Primeira | R$ 32.382,34 |
| Perito Criminal | Segunda | R$ 27.703,52 |
| Perito Criminal | Terceira | R$ 26.690,15 |
| Perito Médico-Legista | Especial | R$ 38.872,66 |
| Perito Médico-Legista | Primeira | R$ 32.382,34 |
| Perito Médico-Legista | Segunda | R$ 27.703,52 |
| Perito Médico-Legista | Terceira | R$ 26.690,15 |
| Papiloscopista Policial | Especial | R$ 23.440,38 |
| Papiloscopista Policial | Primeira | R$ 17.523,06 |
| Papiloscopista Policial | Segunda | R$ 14.593,70 |
| Papiloscopista Policial | Terceira | R$ 13.794,41 |
| Escrivão de Polícia | Especial | R$ 23.440,38 |
| Escrivão de Polícia | Primeira | R$ 17.523,06 |
| Escrivão de Polícia | Segunda | R$ 14.593,70 |
| Escrivão de Polícia | Terceira | R$ 13.794,41 |
| Agente de Polícia | Especial | R$ 23.440,38 |
| Agente de Polícia | Primeira | R$ 17.523,06 |
| Agente de Polícia | Segunda | R$ 14.593,70 |
| Agente de Polícia | Terceira | R$ 13.794,41 |
| Agente Policial de Custódia | Especial | R$ 23.440,38 |
| Agente Policial de Custódia | Primeira | R$ 17.523,06 |
| Agente Policial de Custódia | Segunda | R$ 14.593,70 |
| Agente Policial de Custódia | Terceira | R$ 13.794,41 |

## E) Resumo para o card da aba Remuneração Tabelada

- **Linhas cadastradas:** 28
- **Menor bruto listado:** R$ 13.794,41
- **Maior bruto listado:** R$ 38.872,66
- **Fonte literal usada no rodapé do card:** SEEC/DF — Polícia Civil do Distrito Federal — tabela de escalonamento vertical — janeiro/2026; Lei nº 15.395/2026
- **Link principal:** https://www.economia.df.gov.br/documents/d/seec/policia-civil-pdf

## F) Arquivos alterados

- `js/data/portal-config.js` — adicionada a sigla interna `pcdf` em `INSTITUICOES_VALIDAS`.
- `js/data/parametros-cargos.js` — criada a constante `CARGOS_PCDF` com 28 linhas remuneratórias.
- `js/services/remuneracao.js` — adicionada a fonte oficial `pcdf`, o mapa `pcdf: CARGOS_PCDF` e o cálculo por subsídio.
- `js/ui/navegacao-ui.js` — adicionada a tabela `CARGOS_PCDF` ao seletor de cargos.
- `remuneracao.html` — criado o card `remu-card-pcdf` na aba Remuneração Tabelada.
