# Revisão — Comparador e zoom na aba Brasões e história

## Alterações aplicadas

- Removida a nova caixa dupla de seleção da aba **Comparar Carreiras**.
- Removidas também as funções e eventos JavaScript ligados a essa caixa rápida.
- Mantida a lógica anterior do comparador por lista de marcação/checkboxes.
- Restaurada a seleção rápida de **estado atual** na lógica inicial do comparador quando nenhuma instituição estiver marcada.
- Mantidas as correções de tamanho e responsividade já feitas para desktop e mobile no comparador.
- Na aba **Brasões e história**, o brasão grande agora é clicável.
- O clique, Enter ou Espaço abrem o mesmo lightbox/ampliação usado no brasão do cabeçalho.
- O lightbox fecha por ESC, clique fora da imagem ou botão de fechar.
- Adicionados atributos de acessibilidade ao brasão da aba informativa.

## Arquivos alterados

- `index.html`
- `js/brasao-lightbox.js`
- `js/ui/header-estados.js`
- `js/chunks/06-header-estados.js`
- `js/pages/concursos-comparador.js`
- `js/chunks/08-concursos-comparador.js`
- `js/ui/event-bindings.js`
- `js/chunks/10-event-bindings.js`
- `js/dist/app.bundle.js`
- `css/override-logoleao.css`

## Validação

O JavaScript foi validado com `node --check` após a atualização do bundle.
