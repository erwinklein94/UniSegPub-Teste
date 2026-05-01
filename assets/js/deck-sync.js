/* Sincroniza a vitrine em formato de apresentação com a instituição ativa do cabeçalho. */
(function () {
  function atualizarDeckVisual() {
    const headerLogo = document.getElementById('header-active-flag');
    const headerSigla = document.getElementById('header-active-sigla');
    const headerNome = document.getElementById('header-active-name');
    const deckLogo = document.getElementById('deck-active-logo');
    const deckSigla = document.getElementById('deck-active-sigla');
    const deckNome = document.getElementById('deck-active-name');

    if (deckLogo && headerLogo) {
      const novoSrc = headerLogo.currentSrc || headerLogo.src || 'assets/img/logoleao.jpeg';
      if (deckLogo.src !== novoSrc) deckLogo.src = novoSrc;
      deckLogo.alt = headerLogo.alt || 'Instituição selecionada no Universo Segurança Pública';
    }

    if (deckSigla && headerSigla) deckSigla.textContent = headerSigla.textContent || 'UNIVERSO';
    if (deckNome && headerNome) deckNome.textContent = headerNome.textContent || 'Segurança Pública';
  }

  function observarCabecalho() {
    const alvos = [
      document.getElementById('header-active-flag'),
      document.getElementById('header-active-sigla'),
      document.getElementById('header-active-name')
    ].filter(Boolean);

    if (!alvos.length || !('MutationObserver' in window)) return;

    const obs = new MutationObserver(() => requestAnimationFrame(atualizarDeckVisual));
    alvos.forEach(el => obs.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['src', 'alt']
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    atualizarDeckVisual();
    observarCabecalho();
    setTimeout(atualizarDeckVisual, 80);
    setTimeout(atualizarDeckVisual, 360);
  });
})();
