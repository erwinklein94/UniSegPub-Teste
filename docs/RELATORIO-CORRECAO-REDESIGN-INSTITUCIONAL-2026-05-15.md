# Relatório — Correção do redesign institucional

Data: 2026-05-15

## Objetivo

Corrigir a aplicação visual do redesign institucional sem quebrar os contratos funcionais do site.

## Problemas corrigidos

1. **Tema claro/escuro**
   - A camada anterior forçava tema escuro em `:root` e em `body.app-soft-theme`.
   - A nova versão usa tokens separados para `html[data-theme="dark"]` e `html[data-theme="light"]`.

2. **Menu lateral**
   - A camada anterior misturava contratos `.active` e `.is-open` e estilava globalmente `.menu-btn span`, afetando o menu inferior mobile.
   - A nova versão mantém `.sidebar.active` e `.menu-overlay.active` como contrato principal, preservando compatibilidade com `.is-open` apenas como fallback.
   - O hamburger do cabeçalho agora é estilizado por `button.menu-btn:not(.app-bottom-item)`, sem afetar os spans do menu inferior.

3. **Bandeira dinâmica no cabeçalho**
   - A camada anterior reduzia demais a visibilidade da imagem definida por `--site-header-bg-image`.
   - A nova versão usa `--site-header-bg-image` diretamente em `.site-header::before`, com contraste diferente para tema escuro e claro.
   - A lógica JavaScript que troca a bandeira por estado/instituição foi preservada.

4. **Brasões no cabeçalho**
   - A imagem `#header-active-flag` continua visível e preservada.
   - A moldura foi ajustada visualmente sem alterar a lógica de troca de brasão.

## Arquivos alterados

- `css/redesign-institucional.css`
- HTMLs/templates com cache-busting atualizado de `v=20260515standalone1` para `v=20260516fix1`

## Validações executadas

- `python3 scripts/test-basic-behaviors.py`: 18/18 testes passaram.
- Teste manual automatizado via Chromium/CDP em DOM controlado confirmou:
  - funções principais disponíveis;
  - `toggleTheme()` alterna para tema claro;
  - `toggleMenu()` aplica `.active` na sidebar e overlay;
  - seleção do RJ ativa a bandeira correta no cabeçalho;
  - seleção de `pmerj` mantém fundo do RJ e troca o brasão para `img/MILITAR/pmerj.webp`.
