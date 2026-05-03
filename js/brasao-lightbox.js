/*
  Ampliação dos brasões.
  - Mantém a imagem do brasão grande no cabeçalho clicável.
  - Também permite ampliar o brasão exibido na página "Brasões e história".
  - Fecha pelo botão, clique fora da imagem ou tecla ESC.
*/
(function () {
  'use strict';

  const HEADER_BRASAO_SELECTOR = '#header-active-flag';
  const PAGE_BRASAO_SELECTOR = '.brasoes-imagem';
  const BRASAO_CLICK_SELECTOR = `${HEADER_BRASAO_SELECTOR}, ${PAGE_BRASAO_SELECTOR}`;
  const LIGHTBOX_ID = 'brasao-lightbox';

  let ultimoFocoAntesDoLightbox = null;
  let observerCabecalho = null;

  function isElement(node) {
    return node && node.nodeType === 1;
  }

  function closest(target, selector) {
    return isElement(target) && typeof target.closest === 'function'
      ? target.closest(selector)
      : null;
  }

  function getImagemCabecalho() {
    return document.querySelector(HEADER_BRASAO_SELECTOR);
  }

  function tornarImagemClicavel(img, label) {
    if (!img) return;
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', label || 'Ampliar imagem do brasão');
    img.setAttribute('title', 'Clique para ampliar o brasão');
    img.classList.add('brasao-lightbox-trigger');
  }

  function prepararImagemCabecalho() {
    const img = getImagemCabecalho();
    if (!img) return;

    const moldura = img.closest('.current-flag-frame');
    if (moldura) {
      // O brasão agora é interativo, então não deve ficar escondido da acessibilidade.
      moldura.removeAttribute('aria-hidden');
      moldura.classList.add('brasao-header-clickable');
    }

    tornarImagemClicavel(img, 'Ampliar imagem do brasão no cabeçalho');
  }

  function prepararImagensPaginaBrasoes(root = document) {
    root.querySelectorAll(PAGE_BRASAO_SELECTOR).forEach(img => {
      tornarImagemClicavel(img, 'Ampliar brasão da instituição selecionada');
      const wrap = img.closest('.brasoes-imagem-wrap');
      if (wrap) wrap.classList.add('brasao-header-clickable');
    });
  }

  function prepararTodasImagens() {
    prepararImagemCabecalho();
    prepararImagensPaginaBrasoes();
  }

  function garantirLightbox() {
    let lightbox = document.getElementById(LIGHTBOX_ID);
    if (lightbox) return lightbox;

    lightbox = document.createElement('div');
    lightbox.id = LIGHTBOX_ID;
    lightbox.className = 'brasao-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Imagem ampliada do brasão');

    lightbox.innerHTML = [
      '<div class="brasao-lightbox__backdrop" data-brasao-fechar="true"></div>',
      '<div class="brasao-lightbox__content" role="document">',
      '  <button type="button" class="brasao-lightbox__close" data-brasao-fechar="true" aria-label="Fechar imagem ampliada">×</button>',
      '  <img class="brasao-lightbox__img" alt="Imagem ampliada do brasão">',
      '  <p class="brasao-lightbox__caption">Clique fora da imagem, use ESC ou o botão × para fechar.</p>',
      '</div>'
    ].join('');

    document.body.appendChild(lightbox);
    return lightbox;
  }

  function abrirLightbox(imgOrigem) {
    if (!imgOrigem || !(imgOrigem.currentSrc || imgOrigem.src)) return;

    const lightbox = garantirLightbox();
    const imgAmpliada = lightbox.querySelector('.brasao-lightbox__img');
    const botaoFechar = lightbox.querySelector('.brasao-lightbox__close');

    imgAmpliada.src = imgOrigem.currentSrc || imgOrigem.src;
    imgAmpliada.alt = imgOrigem.alt || 'Imagem ampliada do brasão';

    ultimoFocoAntesDoLightbox = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('brasao-lightbox-open');

    if (botaoFechar) botaoFechar.focus({ preventScroll: true });
  }

  function fecharLightbox() {
    const lightbox = document.getElementById(LIGHTBOX_ID);
    if (!lightbox || !lightbox.classList.contains('is-open')) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('brasao-lightbox-open');

    if (ultimoFocoAntesDoLightbox && typeof ultimoFocoAntesDoLightbox.focus === 'function') {
      ultimoFocoAntesDoLightbox.focus({ preventScroll: true });
    }
  }

  function instalarObservadores() {
    const imgCabecalho = getImagemCabecalho();
    if (imgCabecalho && !observerCabecalho) {
      observerCabecalho = new MutationObserver(prepararImagemCabecalho);
      observerCabecalho.observe(imgCabecalho, { attributes: true, attributeFilter: ['src', 'alt', 'class'] });
    }

    const observerConteudo = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (!isElement(node)) return;
          if (node.matches && node.matches(PAGE_BRASAO_SELECTOR)) {
            prepararImagensPaginaBrasoes(node.parentElement || document);
          } else if (node.querySelector && node.querySelector(PAGE_BRASAO_SELECTOR)) {
            prepararImagensPaginaBrasoes(node);
          }
        });
      }
    });
    observerConteudo.observe(document.body, { childList: true, subtree: true });
  }

  function iniciar() {
    prepararTodasImagens();
    garantirLightbox();
    instalarObservadores();

    document.addEventListener('click', function (event) {
      const imgClicada = closest(event.target, BRASAO_CLICK_SELECTOR);
      if (imgClicada) {
        event.preventDefault();
        event.stopPropagation();
        abrirLightbox(imgClicada);
        return;
      }

      if (closest(event.target, '[data-brasao-fechar="true"]')) {
        event.preventDefault();
        event.stopPropagation();
        fecharLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      const imgClicada = closest(event.target, BRASAO_CLICK_SELECTOR);
      if (imgClicada && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        abrirLightbox(imgClicada);
        return;
      }

      if (event.key === 'Escape') fecharLightbox();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  } else {
    iniciar();
  }
}());
