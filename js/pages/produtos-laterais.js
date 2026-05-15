/* ============================================================
   UniSegPub — Produtos contextuais por instituição
   Desktop: vitrine lateral com todos os produtos relacionados.
   Mobile: um produto por vez entre cards de conteúdo.
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_INST_KEY = 'unisegpub_instituicao_pesquisada_v1';
  const EVENTO_INSTITUICAO = 'unisegpub:instituicao-alterada';
  const DESKTOP_BREAKPOINT = 1360;
  const MOBILE_INTERVALO_CARDS = 2;

  const PAGINAS_COM_VITRINE_CONTEXTUAL = new Set([
    'principal',
    'noticias',
    'guia',
    'remuneracao',
    'direitos',
    'poderes',
    'baselegal',
    'concursos',
    'comparar',
    'brasoes',
    'acoes',
    'associacoes',
    'parceiros'
  ]);

  const LARGURA_CENTRAL_POR_PAGINA = {
    principal: 1120,
    noticias: 1120,
    guia: 1120,
    poderes: 1120,
    baselegal: 1120,
    comparar: 1120,
    brasoes: 1120,
    parceiros: 800,
    remuneracao: 920,
    direitos: 800,
    concursos: 800,
    acoes: 800,
    associacoes: 800
  };

  const INSTITUICOES_FEDERAIS = new Set(['pf', 'prf']);
  const UFS_VALIDAS = new Set([
    'ac', 'al', 'am', 'ap', 'ba', 'ce', 'df', 'es', 'go', 'ma', 'mg', 'ms', 'mt',
    'pa', 'pb', 'pe', 'pi', 'pr', 'rj', 'rn', 'ro', 'rr', 'rs', 'sc', 'se', 'sp', 'to'
  ]);

  const REGRAS_CLASSIFICACAO_PRODUTOS = [
    { instituicoes: ['pf'], ufs: ['br'], termos: ['policia federal', 'pf', 'agente pf', 'delegado pf', 'escrivao pf', 'papiloscopista pf', 'perito pf'] },
    { instituicoes: ['prf'], ufs: ['br'], termos: ['policia rodoviaria federal', 'prf'] },
    { instituicoes: ['pmesp'], ufs: ['sp'], termos: ['pmesp', 'pm sp', 'pm paulista', 'policia militar sp', 'policia militar de sao paulo', 'padrao policia militar sp'] },
    { instituicoes: ['bmsp'], ufs: ['sp'], termos: ['cbpmesp', 'bombeiros sp', 'bombeiro sp', 'corpo de bombeiros da pmesp'] },
    { instituicoes: ['pcsp'], ufs: ['sp'], termos: ['pcsp', 'pc sp', 'policia civil de sao paulo', 'policia civil sp'] },
    { instituicoes: ['ppsp'], ufs: ['sp'], termos: ['ppsp', 'ppesp', 'policia penal de sao paulo', 'policia penal sp'] },
    { instituicoes: ['pmerj'], ufs: ['rj'], termos: ['pmerj', 'pm rj', 'pmrj', 'policia militar do rio de janeiro', 'policia militar do estado do rio de janeiro'] },
    { instituicoes: ['bmrj'], ufs: ['rj'], termos: ['cbmerj', 'cbm rj', 'bombeiro rj', 'bombeiros rj', 'corpo de bombeiros militar do rio de janeiro', 'corpo de bombeiros militar do estado do rio de janeiro'] },
    { instituicoes: ['pcerj'], ufs: ['rj'], termos: ['pcerj', 'pc rj', 'policia civil do rio de janeiro', 'policia civil rj'] },
    { instituicoes: ['pprj'], ufs: ['rj'], termos: ['pprj', 'policia penal do rio de janeiro', 'policia penal rj'] },
    { instituicoes: ['pmmg'], ufs: ['mg'], termos: ['pmmg', 'pm mg', 'policia militar de minas gerais'] },
    { instituicoes: ['bmmg'], ufs: ['mg'], termos: ['cbmmg', 'bombeiro mg', 'bombeiros mg', 'corpo de bombeiros militar de minas gerais'] },
    { instituicoes: ['pcmg'], ufs: ['mg'], termos: ['pcmg', 'pc mg', 'policia civil de minas gerais', 'investigador pcmg'] },
    { instituicoes: ['ppmg'], ufs: ['mg'], termos: ['ppmg', 'policia penal de minas gerais', 'policia penal mg'] },
    { instituicoes: ['pcdf'], ufs: ['df'], termos: ['pcdf', 'pc df', 'policia civil do distrito federal'] },
    { instituicoes: ['ppdf'], ufs: ['df'], termos: ['ppdf', 'policia penal do distrito federal', 'policia penal df'] },
    { instituicoes: ['pcal'], ufs: ['al'], termos: ['pcal', 'pc al', 'policia civil de alagoas'] },
    { instituicoes: ['pmto'], ufs: ['to'], termos: ['pmto', 'policia militar de tocantins', 'policia militar do tocantins', 'tocantins'] }
  ];

  const PRODUTOS_FALLBACK = [
    {
      titulo: 'Mochila Militar Tática Impermeável 50 L',
      href: 'https://s.shopee.com.br/901i8h9IK5',
      imagem: { src: 'img/SHOPEE/mochilaimpermeavel50l.webp', alt: 'Mochila Militar Tática Impermeável 50 L' }
    },
    {
      titulo: 'Mochila Coban Tática Militar 24 L',
      href: 'https://s.shopee.com.br/8V5RQXr16n',
      imagem: { src: 'img/SHOPEE/mochilacoban.webp', alt: 'Mochila Coban Tática Militar 24 L' }
    },
    {
      titulo: 'Barra fixa para porta',
      href: 'https://s.shopee.com.br/9fHIyi0uae',
      imagem: { src: 'img/SHOPEE/barrafixa02.webp', alt: 'Barra fixa para porta' }
    },
    {
      titulo: 'Bota Acero Couro Colt Padrão Polícia Militar SP',
      href: 'https://s.shopee.com.br/1qYSZj5bki',
      imagem: { src: 'img/SHOPEE/botaacero.webp', alt: 'Bota Acero Couro Colt Padrão Polícia Militar SP' }
    }
  ];

  let resizeInstalado = false;
  let observer = null;
  let refreshTimer = 0;
  let renderizacaoInterna = false;

  function normalizarTexto(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[()\[\]{}.,;:|/\\_+\-–—]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function textoCurto(texto, limite) {
    const normalizado = String(texto || '').replace(/\s+/g, ' ').trim();
    if (normalizado.length <= limite) return normalizado;
    return `${normalizado.slice(0, limite - 1).trim()}…`;
  }

  function getPaginaAtual() {
    return document.body && document.body.dataset ? document.body.dataset.page || '' : '';
  }

  function getStorageInst() {
    try {
      return window.localStorage ? String(window.localStorage.getItem(STORAGE_INST_KEY) || '').trim().toLowerCase() : '';
    } catch (e) {
      return '';
    }
  }


  function salvarInstituicaoPesquisada(inst) {
    const valor = String(inst || '').trim().toLowerCase();
    if (!valor) return;

    try {
      if (window.localStorage) window.localStorage.setItem(STORAGE_INST_KEY, valor);
    } catch (e) { /* silencioso */ }

    try {
      window.dispatchEvent(new CustomEvent(EVENTO_INSTITUICAO, { detail: { instituicao: valor } }));
    } catch (e) { /* silencioso */ }
  }


  function limparInstituicaoPesquisada() {
    try {
      if (window.localStorage) window.localStorage.removeItem(STORAGE_INST_KEY);
    } catch (e) { /* silencioso */ }

    try {
      window.dispatchEvent(new CustomEvent(EVENTO_INSTITUICAO, { detail: { instituicao: '' } }));
    } catch (e) { /* silencioso */ }
  }

  function getInstituicaoAtual() {
    const bodyInst = String(document.body?.dataset?.inst || '').trim().toLowerCase();
    if (bodyInst && bodyInst !== 'portal') return bodyInst;
    return getStorageInst();
  }

  function getUfInstituicao(inst) {
    const valor = String(inst || '').toLowerCase().trim();
    if (!valor) return '';
    if (INSTITUICOES_FEDERAIS.has(valor)) return 'br';
    if (valor === 'gm' || valor === 'guarda_municipal') return 'municipal';
    const uf = valor.slice(-2);
    return UFS_VALIDAS.has(uf) ? uf : '';
  }

  function criarLink(classe, href, texto, externo) {
    const link = document.createElement('a');
    link.className = classe;
    link.href = href;
    link.textContent = texto;
    if (externo) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    return link;
  }

  function getTextoProduto(produto) {
    const partes = [
      produto?.titulo,
      produto?.descricao,
      Array.isArray(produto?.meta) ? produto.meta.join(' ') : '',
      Array.isArray(produto?.badges) ? produto.badges.join(' ') : '',
      produto?.imagem?.alt
    ];
    return normalizarTexto(partes.filter(Boolean).join(' '));
  }

  function termoExiste(texto, termo) {
    const termoNormalizado = normalizarTexto(termo);
    if (!termoNormalizado) return false;
    if (/^[a-z]{2,7}$/.test(termoNormalizado)) {
      return new RegExp(`(^|\\s)${termoNormalizado}(\\s|$)`).test(texto);
    }
    return texto.includes(termoNormalizado);
  }

  function normalizarListaFiltro(valor) {
    if (!valor) return [];
    if (Array.isArray(valor)) return valor.map(item => String(item || '').toLowerCase().trim()).filter(Boolean);
    return String(valor).split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
  }

  function normalizarFiltroProdutoExplicito(produto) {
    const filtro = produto?.filtro || produto?.filter || null;
    if (!filtro) return null;

    const geral = filtro.geral === true || filtro.escopo === 'geral' || filtro.scope === 'general';
    const instituicoes = normalizarListaFiltro(filtro.instituicoes || filtro.insts || filtro.inst);
    const ufs = normalizarListaFiltro(filtro.ufs || filtro.uf);

    return {
      geral: geral || (!instituicoes.length && !ufs.length),
      instituicoes,
      ufs
    };
  }

  function classificarProduto(produto) {
    const filtroExplicito = normalizarFiltroProdutoExplicito(produto);
    if (filtroExplicito) return filtroExplicito;

    const texto = getTextoProduto(produto);
    const instituicoes = new Set();
    const ufs = new Set();

    REGRAS_CLASSIFICACAO_PRODUTOS.forEach(regra => {
      if (!regra.termos.some(termo => termoExiste(texto, termo))) return;
      (regra.instituicoes || []).forEach(inst => instituicoes.add(inst));
      (regra.ufs || []).forEach(uf => ufs.add(uf));
    });

    return {
      geral: instituicoes.size === 0 && ufs.size === 0,
      instituicoes: Array.from(instituicoes),
      ufs: Array.from(ufs)
    };
  }

  function pontuarProduto(produto, instSelecionada) {
    const inst = String(instSelecionada || '').toLowerCase().trim();
    const filtroProduto = classificarProduto(produto);
    if (!inst) return 20;

    const instituicoesProduto = filtroProduto.instituicoes || [];
    const ufsProduto = filtroProduto.ufs || [];
    if (instituicoesProduto.includes(inst)) return 100;

    const ufSelecionada = getUfInstituicao(inst);
    if (ufSelecionada && ufSelecionada !== 'br' && ufsProduto.includes(ufSelecionada)) return 70;
    if (filtroProduto.geral) return 35;
    return 0;
  }

  function produtoCombinaComInstituicao(produto, instSelecionada) {
    return pontuarProduto(produto, instSelecionada) > 0;
  }

  function deduplicarProdutos(produtos) {
    const vistos = new Set();
    return produtos.filter(produto => {
      if (!produto || !produto.titulo || !produto.href || !produto.imagem || !produto.imagem.src) return false;
      const chave = `${produto.href}::${normalizarTexto(produto.titulo)}`;
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    });
  }

  function coletarProdutos() {
    const base = window.UNISEGPUB_PRODUTOS || {};
    const grupos = [
      base.produtosFisicos,
      base.cursosGerais,
      base.cursosPmesp,
      base.cursosPcsp,
      base.livrosEbooks
    ];

    const produtos = deduplicarProdutos(grupos.filter(Array.isArray).flat());
    return produtos.length ? produtos : PRODUTOS_FALLBACK;
  }

  function coletarProdutosContextuais() {
    const inst = getInstituicaoAtual();
    const produtos = coletarProdutos();
    const filtrados = produtos
      .map((produto, index) => ({ produto, index, score: pontuarProduto(produto, inst) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(item => item.produto);

    return filtrados.length ? filtrados : produtos;
  }

  function getLabelInstituicao(inst) {
    const info = window.HEADER_INSTITUICOES_INFO?.[inst] || (typeof HEADER_INSTITUICOES_INFO !== 'undefined' ? HEADER_INSTITUICOES_INFO[inst] : null);
    if (info?.titulo) return info.titulo;
    if (inst === 'gm') return 'GM';
    return String(inst || '').toUpperCase();
  }

  function criarCardProduto(produto, variante) {
    const card = document.createElement('article');
    card.className = variante === 'mobile' ? 'usp-mobile-product-card' : 'usp-affiliate-card';

    const imagemWrap = document.createElement('a');
    imagemWrap.className = variante === 'mobile' ? 'usp-mobile-product-card__media' : 'usp-affiliate-card__media';
    imagemWrap.href = produto.href;
    imagemWrap.target = '_blank';
    imagemWrap.rel = 'noopener noreferrer';
    imagemWrap.setAttribute('aria-label', `Ver na loja ${produto.titulo || 'produto'}`);

    const imagem = document.createElement('img');
    imagem.src = produto.imagem && produto.imagem.src ? produto.imagem.src : '';
    imagem.alt = produto.imagem && produto.imagem.alt ? produto.imagem.alt : produto.titulo || 'Produto';
    imagem.loading = 'lazy';
    imagem.decoding = 'async';
    imagem.addEventListener('error', function () {
      imagemWrap.classList.add('is-missing-image');
      imagem.remove();
    }, { once: true });
    imagemWrap.appendChild(imagem);
    card.appendChild(imagemWrap);

    const corpo = document.createElement('div');
    corpo.className = variante === 'mobile' ? 'usp-mobile-product-card__body' : 'usp-affiliate-card__body';

    if (variante === 'mobile') {
      const label = document.createElement('span');
      label.className = 'usp-mobile-product-card__label';
      label.textContent = 'Produto relacionado';
      corpo.appendChild(label);
    }

    const titulo = document.createElement('h3');
    titulo.textContent = textoCurto(produto.titulo, variante === 'mobile' ? 86 : 58);
    corpo.appendChild(titulo);

    const aviso = document.createElement('small');
    aviso.className = variante === 'mobile' ? 'usp-mobile-product-card__note' : 'usp-affiliate-card__note';
    aviso.textContent = 'Produto de programa de afiliado.';
    corpo.appendChild(aviso);

    const acoes = document.createElement('div');
    acoes.className = variante === 'mobile' ? 'usp-mobile-product-card__actions' : 'usp-affiliate-card__actions';
    acoes.appendChild(criarLink(variante === 'mobile' ? 'usp-mobile-product-card__store' : 'usp-affiliate-card__store', produto.href, 'Ver na loja', true));
    acoes.appendChild(criarLink(variante === 'mobile' ? 'usp-mobile-product-card__more' : 'usp-affiliate-card__more', 'produtos.html', 'Ver mais produtos', false));
    corpo.appendChild(acoes);

    card.appendChild(corpo);
    return card;
  }

  function criarRail(lado, produtos) {
    const inst = getInstituicaoAtual();
    const rail = document.createElement('aside');
    rail.className = `usp-affiliate-rail usp-affiliate-rail--${lado}`;
    rail.setAttribute('aria-label', lado === 'left' ? 'Produtos relacionados à esquerda' : 'Produtos relacionados à direita');

    const inner = document.createElement('div');
    inner.className = 'usp-affiliate-rail__inner';

    const titulo = document.createElement('div');
    titulo.className = 'usp-affiliate-rail__title';
    titulo.textContent = inst ? `Produtos ${getLabelInstituicao(inst)}` : 'Produtos';
    inner.appendChild(titulo);

    produtos.forEach(function (produto) {
      inner.appendChild(criarCardProduto(produto, 'desktop'));
    });

    rail.appendChild(inner);
    return rail;
  }

  function ajustarLarguraCentral(shell, pagina) {
    const maximo = LARGURA_CENTRAL_POR_PAGINA[pagina] || 1120;
    const larguraDisponivel = Math.max(0, window.innerWidth - 28);
    shell.style.setProperty('--usp-affiliate-main-width', `${Math.min(maximo, larguraDisponivel)}px`);
  }

  function getMainAtual() {
    return document.querySelector('main.page-section.active[role="main"]') || document.querySelector('main.page-section.active') || document.querySelector('main');
  }

  function garantirShellDesktop(main, pagina) {
    let shell = document.querySelector('.usp-affiliate-side-shell');
    if (shell) return shell;
    if (!main || !main.parentNode) return null;

    shell = document.createElement('div');
    shell.className = 'usp-affiliate-side-shell';
    shell.setAttribute('data-affiliate-products', 'true');

    main.parentNode.insertBefore(shell, main);
    shell.appendChild(main);
    ajustarLarguraCentral(shell, pagina);
    return shell;
  }

  function renderizarDesktop() {
    const pagina = getPaginaAtual();
    if (!PAGINAS_COM_VITRINE_CONTEXTUAL.has(pagina) || pagina === 'produtos') return;

    const main = getMainAtual();
    const shell = garantirShellDesktop(main, pagina);
    if (!shell) return;

    shell.querySelectorAll('.usp-affiliate-rail').forEach(rail => rail.remove());

    const produtos = coletarProdutosContextuais();
    if (!produtos.length) return;

    const esquerda = [];
    const direita = [];
    produtos.forEach((produto, index) => {
      (index % 2 === 0 ? esquerda : direita).push(produto);
    });

    if (esquerda.length) shell.insertBefore(criarRail('left', esquerda), main);
    if (direita.length) shell.appendChild(criarRail('right', direita));

    ajustarLarguraCentral(shell, pagina);
    if (!resizeInstalado) {
      resizeInstalado = true;
      window.addEventListener('resize', scheduleRefresh, { passive: true });
    }
  }

  function elementoVisivel(el) {
    if (!el || el.hidden || el.closest('[hidden]')) return false;
    const style = window.getComputedStyle ? window.getComputedStyle(el) : null;
    return !style || (style.display !== 'none' && style.visibility !== 'hidden');
  }

  function selecionarCardsMobile(main, pagina) {
    const seletoresPorPagina = {
      principal: '.principal-card',
      noticias: '[data-noticia-card]',
      guia: '[data-guia-artigo]',
      remuneracao: '[data-remu-card]',
      direitos: '[data-direitos-card]',
      poderes: '[data-poderes-card]',
      brasoes: '[data-brasoes-card]',
      concursos: '[data-concurso-card]',
      acoes: '[data-acoes-card]',
      associacoes: '[data-associacoes-card]',
      comparar: '.comparador-cards > *',
      baselegal: '.base-legal-resultados-card > *, .base-legal-busca-card',
      parceiros: 'form[data-form="contato"], .card > section, .card > div'
    };

    const seletor = seletoresPorPagina[pagina] || 'article.card, section.card, .principal-card';
    let cards = Array.from(main.querySelectorAll(seletor)).filter(el => !el.matches('.usp-mobile-product-slot, .usp-mobile-product-slot *'));

    if (cards.length < 2) {
      cards = Array.from(main.querySelectorAll('article.card, section.card, .principal-card, .card'))
        .filter(el => !el.matches('.header-institution-card, .consulta-instituicao-card, .usp-mobile-product-slot, .usp-mobile-product-slot *'));
    }

    return cards.filter(elementoVisivel);
  }

  function removerSlotsMobile() {
    document.querySelectorAll('.usp-mobile-product-slot').forEach(slot => slot.remove());
  }

  function renderizarMobile() {
    const pagina = getPaginaAtual();
    if (!PAGINAS_COM_VITRINE_CONTEXTUAL.has(pagina) || pagina === 'produtos') {
      removerSlotsMobile();
      return;
    }

    const main = getMainAtual();
    if (!main) return;

    removerSlotsMobile();

    const cards = selecionarCardsMobile(main, pagina);
    const produtos = coletarProdutosContextuais();
    if (cards.length < 2 || !produtos.length) return;

    let produtoIndex = 0;
    cards.forEach((card, index) => {
      const deveInserir = (index + 1) % MOBILE_INTERVALO_CARDS === 0 && index < cards.length - 1;
      if (!deveInserir) return;

      const produto = produtos[produtoIndex % produtos.length];
      produtoIndex += 1;

      const slot = document.createElement('aside');
      slot.className = 'usp-mobile-product-slot';
      slot.setAttribute('aria-label', 'Produto relacionado à instituição pesquisada');
      slot.appendChild(criarCardProduto(produto, 'mobile'));
      card.insertAdjacentElement('afterend', slot);
    });
  }

  function refreshProdutosContextuais() {
    const pagina = getPaginaAtual();
    if (!PAGINAS_COM_VITRINE_CONTEXTUAL.has(pagina)) return;

    renderizacaoInterna = true;
    try {
      renderizarDesktop();
      renderizarMobile();
    } finally {
      window.setTimeout(() => {
        renderizacaoInterna = false;
      }, 0);
    }
  }

  function scheduleRefresh() {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(refreshProdutosContextuais, 80);
  }

  function observarMudancasConteudo() {
    const main = getMainAtual();
    if (!main || observer) return;

    observer = new MutationObserver(mutations => {
      if (renderizacaoInterna) return;

      const mudouConteudo = mutations.some(mutation => {
        const alvo = mutation.target;
        if (alvo && alvo.closest && alvo.closest('.usp-affiliate-side-shell, .usp-mobile-product-slot, .usp-affiliate-rail')) return false;
        return mutation.type === 'childList' || mutation.attributeName === 'hidden' || mutation.attributeName === 'style' || mutation.attributeName === 'class';
      });
      if (mudouConteudo) scheduleRefresh();
    });

    observer.observe(main, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden', 'style', 'class']
    });
  }

  function iniciarProdutosContextuais() {
    const pagina = getPaginaAtual();
    if (!PAGINAS_COM_VITRINE_CONTEXTUAL.has(pagina) || pagina === 'produtos') return;

    refreshProdutosContextuais();
    observarMudancasConteudo();

    window.addEventListener(EVENTO_INSTITUICAO, scheduleRefresh);
    window.addEventListener('storage', event => {
      if (!event || event.key === STORAGE_INST_KEY) scheduleRefresh();
    });

    document.addEventListener('change', event => {
      const alvo = event.target;
      if (!(alvo instanceof HTMLSelectElement)) return;
      if (alvo.matches('[data-consulta-instituicao], #instituicao, #instituicao_header, #instituicao_home, #guia_instituicao, #noticias_instituicao, #produtos_instituicao')) {
        if (alvo.value) salvarInstituicaoPesquisada(alvo.value);
        scheduleRefresh();
      }
    });

    document.addEventListener('click', event => {
      const alvo = event.target;
      if (alvo && alvo.closest && alvo.closest('[data-guia-limpar], [data-noticias-limpar], [data-concursos-limpar], [data-action="comparador-limpar"]')) {
        limparInstituicaoPesquisada();
        scheduleRefresh();
      }
    });
  }

  window.UNISEGPUB_PRODUTOS_CONTEXTUAIS = Object.assign({}, window.UNISEGPUB_PRODUTOS_CONTEXTUAIS || {}, {
    storageKey: STORAGE_INST_KEY,
    eventName: EVENTO_INSTITUICAO,
    refresh: scheduleRefresh,
    classificarProduto,
    produtoCombinaComInstituicao
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarProdutosContextuais, { once: true });
  } else {
    iniciarProdutosContextuais();
  }
})();
