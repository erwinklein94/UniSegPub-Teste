/* Funções pequenas carregadas cedo para evitar erro em imagens com fallback. */
(function () {
  const EXTENSOES = ['png', 'jpg', 'jpeg', 'webp'];

  function trocarImagemComFallback(img) {
    if (!img) return;

    const baseOriginal = img.dataset.imgBase || img.getAttribute('src') || '';
    const base = baseOriginal.replace(/\.(png|jpe?g|webp|gif|svg)$/i, '');
    const tentativaAtual = Number(img.dataset.tentativa || 0);

    if (base && tentativaAtual < EXTENSOES.length) {
      img.dataset.tentativa = String(tentativaAtual + 1);
      img.src = `${base}.${EXTENSOES[tentativaAtual]}`;
      return;
    }

    img.style.display = 'none';

    const produto = img.closest('.produto-imagem, .taf-produto-card, .sidebar-product');
    if (produto) {
      produto.classList.add('img-indisponivel');
    }
  }

  window.carregarImagemProduto = trocarImagemComFallback;
  window.carregarImagemComFallback = trocarImagemComFallback;
})();
