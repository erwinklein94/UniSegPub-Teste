/* Funções pequenas carregadas cedo para evitar erro em imagens com fallback. */
(function () {
  const EXTENSOES = ['png', 'jpg', 'jpeg', 'webp'];

  function normalizarBase(caminho) {
    return String(caminho || '').trim().replace(/\.(png|jpe?g|webp|gif|svg)$/i, '');
  }

  function obterBasesImagem(img) {
    const baseOriginal = img?.dataset?.imgBase || img?.getAttribute('src') || '';
    const aliases = String(img?.dataset?.imgAliases || '')
      .split(',')
      .map(normalizarBase)
      .filter(Boolean);

    const bases = [normalizarBase(baseOriginal), ...aliases].filter(Boolean);
    return [...new Set(bases)];
  }

  function tentarProximaImagem(img) {
    if (!img) return false;

    const bases = obterBasesImagem(img);
    const tentativaAtual = Number(img.dataset.tentativa || 0);
    const totalTentativas = bases.length * EXTENSOES.length;

    if (tentativaAtual < totalTentativas) {
      const baseIndex = Math.floor(tentativaAtual / EXTENSOES.length);
      const extensaoIndex = tentativaAtual % EXTENSOES.length;
      img.dataset.tentativa = String(tentativaAtual + 1);
      img.src = `${bases[baseIndex]}.${EXTENSOES[extensaoIndex]}`;
      return true;
    }

    return false;
  }

  function trocarImagemComFallback(img) {
    if (!img) return;

    if (tentarProximaImagem(img)) return;

    img.style.display = 'none';

    const produto = img.closest('.produto-imagem, .taf-produto-card, .sidebar-product');
    if (produto) {
      produto.classList.add('img-indisponivel');
    }
  }

  function trocarImagemCabecalhoInstituicao(img) {
    if (!img) return;

    if (tentarProximaImagem(img)) return;

    const fallbackSrc = img.dataset.fallbackSrc || '';
    const fallbackAlt = img.dataset.fallbackAlt || 'Bandeira do estado da instituição';
    const jaAplicouFallback = img.dataset.fallbackAplicado === 'true';

    if (fallbackSrc && !jaAplicouFallback) {
      img.dataset.fallbackAplicado = 'true';
      img.alt = fallbackAlt;
      img.src = fallbackSrc;

      const moldura = img.closest('.current-flag-frame');
      if (moldura) {
        moldura.classList.remove('institution-logo-frame', 'brand-logo-frame');
        moldura.classList.add('state-flag-fallback-frame');
      }
      return;
    }

    img.style.display = 'none';
  }

  window.carregarImagemProduto = trocarImagemComFallback;
  window.carregarImagemComFallback = trocarImagemComFallback;
  window.carregarImagemHeaderInstituicao = trocarImagemCabecalhoInstituicao;
})();
