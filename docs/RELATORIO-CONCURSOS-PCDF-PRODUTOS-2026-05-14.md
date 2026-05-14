# Relatório — Produtos PCDF na aba Concursos

**Data:** 14/05/2026  
**Escopo:** exibir produtos já cadastrados para a PCDF dentro da página `concursos.html` quando o usuário filtrar ou selecionar a instituição PCDF.

## Objetivo atendido

Quando o usuário selecionar **PCDF — Polícia Civil do Distrito Federal** na aba **Concursos**, o site passa a exibir uma seção de produtos relacionados à instituição selecionada, além dos dados do concurso e dos produtos genéricos de preparação/TAF já existentes.

## Produtos PCDF identificados no cadastro existente

Foram encontrados 3 produtos já cadastrados em `js/data/produtos-data.js`:

1. **PC DF (Polícia Civil do Distrito Federal) - Analista de Apoio às Atividades Policiais - Agente Administrativo**
2. **PC DF (Polícia Civil do Distrito Federal) - Agente Policial de Custódia**
3. **Delegado - Polícia Civil do Distrito Federal**

As imagens correspondentes foram conferidas em:

- `img/HOTMART/agenteadmpcdf.webp`
- `img/HOTMART/agentepolicialdecustodiapcdf.webp`
- `img/HOTMART/delegadopcdf.webp`

## Arquivos alterados

### `concursos.html`

- Adicionada a seção:
  - `#concursos-produtos-relacionados`
  - `#concursos-produtos-status`
  - `#concursos-produtos-grid`
- Atualizadas as versões de cache dos scripts/CSS modificados.

### `js/pages/concursos-conteudo-estatico.js`

- Criada a lógica de coleta de produtos institucionais para concursos.
- Criada regra específica para PCDF com os termos:
  - `pcdf`
  - `pc df`
  - `policia civil do distrito federal`
  - `polícia civil do distrito federal`
- A renderização considera título, descrição, imagem, badges e metadados dos produtos.
- A seção é exibida somente quando houver produto relacionado à instituição selecionada.
- A seleção pelo filtro interno de concursos e pela caixa geral de instituição do site passam a sincronizar a exibição.

### `js/pages/concursos-comparador.js`

- O carregamento detalhado do concurso agora chama a renderização dos produtos relacionados, permitindo funcionamento também quando a instituição é selecionada pelo seletor geral do site.

### `css/pages/concursos-conteudo-estatico.css`

- Adicionados estilos para a nova vitrine institucional dentro da aba Concursos.
- Layout responsivo:
  - 3 colunas em telas amplas;
  - 2 colunas em tablets;
  - 1 coluna no mobile.

## Validações executadas

- `node --check js/pages/concursos-conteudo-estatico.js`
- `node --check js/pages/concursos-comparador.js`
- Conferência estática dos produtos PCDF no cadastro existente: 3 produtos encontrados.

## Observação

A implementação não duplica produtos nem cria novos produtos. Ela apenas reaproveita os produtos PCDF já cadastrados na vitrine geral e os apresenta de forma contextual na aba **Concursos** quando a instituição PCDF for pesquisada/selecionada.
