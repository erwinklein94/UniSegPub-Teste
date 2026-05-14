/* ============================================================
   UniSegPub — Produtos laterais contextuais por instituição
   Mostra cards da aba Produtos nas laterais das páginas de conteúdo.
   Quando há instituição selecionada/pesquisada, prioriza produtos
   relacionados àquela instituição em qualquer aba do portal.
   ============================================================ */
(function () {
  'use strict';

  const PAGINAS_COM_VITRINE_LATERAL = new Set([
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

  const CATEGORIAS_PRODUTOS = [
    'produtosFisicos',
    'livrosEbooks',
    'cursosGerais',
    'cursosPmesp',
    'cursosPcsp'
  ];

  const SELETORES_INSTITUICAO_PRIORITARIOS = [
    '#concursos_instituicao',
    '#remu-filtro-instituicao',
    '#direitos-filtro-instituicao',
    '#poderes-filtro-instituicao',
    '#brasoes-filtro-instituicao',
    '#acoes-filtro-instituicao',
    '#associacoes-filtro-instituicao',
    '#guia_instituicao',
    '#noticias_instituicao',
    '#comparador-instituicao',
    '[data-consulta-instituicao]',
    '#instituicao',
    '#instituicao_header',
    '#instituicao_home'
  ];

  const UFS_VALIDAS = new Set([
    'ac', 'al', 'am', 'ap', 'ba', 'ce', 'df', 'es', 'go', 'ma', 'mg', 'ms', 'mt',
    'pa', 'pb', 'pe', 'pi', 'pr', 'rj', 'rn', 'ro', 'rr', 'rs', 'sc', 'se', 'sp', 'to', 'br', 'mun'
  ]);

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

  const cacheClassificacao = new WeakMap();
  const cacheTermosInstituicao = new Map();
  let shellAtual = null;
  let ultimoContextoRenderizado = '';
  let timerAtualizacao = null;

  function normalizarTexto(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[()[\]{}.,;:|/\\_+\-–—]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function textoCurto(texto, limite) {
    const normalizado = String(texto || '').replace(/\s+/g, ' ').trim();
    if (normalizado.length <= limite) return normalizado;
    return `${normalizado.slice(0, limite - 1).trim()}…`;
  }

  function unico(lista) {
    return Array.from(new Set((lista || []).map(item => String(item || '').trim()).filter(Boolean)));
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
    if (Array.isArray(valor)) return valor.map(item => String(item || '').toLowerCase()).filter(Boolean);
    return String(valor).split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
  }

  function getInstituicoesCatalogo() {
    const validas = typeof INSTITUICOES_VALIDAS !== 'undefined' && Array.isArray(INSTITUICOES_VALIDAS)
      ? INSTITUICOES_VALIDAS
      : [];
    const info = typeof HEADER_INSTITUICOES_INFO !== 'undefined' && HEADER_INSTITUICOES_INFO
      ? Object.keys(HEADER_INSTITUICOES_INFO)
      : [];
    return unico(validas.concat(info)).filter(inst => inst && inst !== 'portal');
  }

  function ehInstituicaoValida(inst) {
    const valor = String(inst || '').toLowerCase().trim();
    if (!valor || valor === 'portal') return false;
    if (typeof INSTITUICOES_VALIDAS !== 'undefined' && Array.isArray(INSTITUICOES_VALIDAS) && INSTITUICOES_VALIDAS.includes(valor)) return true;
    return !!(typeof HEADER_INSTITUICOES_INFO !== 'undefined' && HEADER_INSTITUICOES_INFO && HEADER_INSTITUICOES_INFO[valor]);
  }

  function getInfoInstituicao(inst) {
    const valor = String(inst || '').toLowerCase().trim();
    return (typeof HEADER_INSTITUICOES_INFO !== 'undefined' && HEADER_INSTITUICOES_INFO && HEADER_INSTITUICOES_INFO[valor]) || {};
  }

  function getUfInstituicao(inst) {
    const valor = String(inst || '').toLowerCase().trim();
    if (!valor) return '';
    if (valor === 'pf' || valor === 'prf') return 'br';
    if (valor === 'gm') return 'mun';
    if (typeof getEstadoDaInstituicao === 'function') {
      const uf = String(getEstadoDaInstituicao(valor) || '').toLowerCase();
      if (UFS_VALIDAS.has(uf)) return uf;
    }
    const ufFinal = valor.slice(-2);
    return UFS_VALIDAS.has(ufFinal) ? ufFinal : '';
  }

  function getPrefixosRamo(inst) {
    const valor = String(inst || '').toLowerCase().trim();
    if (valor === 'pf') return ['pf'];
    if (valor === 'prf') return ['prf'];
    if (valor === 'gm') return ['gm'];
    if (valor.startsWith('pc') || valor === 'pcerj') return ['pc'];
    if (valor.startsWith('pp')) return ['pp'];
    if (valor.startsWith('bm')) return ['bm', 'cbm'];
    if (valor.startsWith('pm') || valor === 'pmerj') return ['pm'];
    return [];
  }

  function getTermosInstituicao(inst) {
    const codigo = String(inst || '').toLowerCase().trim();
    if (cacheTermosInstituicao.has(codigo)) return cacheTermosInstituicao.get(codigo);

    const info = getInfoInstituicao(codigo);
    const titulo = info.titulo || codigo.toUpperCase();
    const desc = info.desc || '';
    const uf = getUfInstituicao(codigo);
    const termos = [codigo, titulo, desc, `${titulo} ${desc}`];

    getPrefixosRamo(codigo).forEach(prefixo => {
      if (uf && uf !== 'br' && uf !== 'mun') {
        termos.push(`${prefixo}${uf}`, `${prefixo} ${uf}`, `${prefixo}-${uf}`);
      }
    });

    if (codigo === 'pmesp') termos.push('pm sp', 'pm-sp', 'policia militar sp', 'policia militar de sao paulo', 'policia militar do estado de sao paulo');
    if (codigo === 'bmsp') termos.push('cbpm esp', 'cbpmesp', 'cbm sp', 'bombeiro sp', 'bombeiros sp', 'corpo de bombeiros sp');
    if (codigo === 'pmerj') termos.push('pm rj', 'pm-rj', 'pmrj', 'policia militar rj', 'policia militar do rio de janeiro');
    if (codigo === 'bmrj') termos.push('cbmerj', 'cbm rj', 'cbm-rj', 'bombeiro rj', 'bombeiros rj', 'corpo de bombeiros rj');
    if (codigo === 'pcerj') termos.push('pc rj', 'pc-rj', 'policia civil rj', 'policia civil do rio de janeiro');
    if (codigo === 'pcdf') termos.push('pc df', 'pc-df', 'policia civil df', 'policia civil do distrito federal');
    if (codigo === 'ppdf') termos.push('pp df', 'pp-df', 'policia penal df', 'policia penal do distrito federal');
    if (codigo === 'pf') termos.push('policia federal', 'departamento de policia federal');
    if (codigo === 'prf') termos.push('policia rodoviaria federal');

    const termosNormalizados = unico(termos.map(normalizarTexto)).filter(termo => termo.length >= 2);
    cacheTermosInstituicao.set(codigo, termosNormalizados);
    return termosNormalizados;
  }

  function normalizarFiltroProdutoExplicito(produto) {
    const filtro = produto?.filtro || produto?.filter || null;
    const dataAttrs = produto?.dataAttrs || {};
    const dataInst = dataAttrs['data-inst'] || dataAttrs['data-instituicao'] || dataAttrs['data-instituicoes'];
    const dataUf = dataAttrs['data-uf'] || dataAttrs['data-ufs'];

    if (!filtro && !dataInst && !dataUf) return null;

    const geral = filtro?.geral === true || filtro?.escopo === 'geral' || filtro?.scope === 'general';
    const instituicoes = normalizarListaFiltro(filtro?.instituicoes || filtro?.insts || filtro?.inst || dataInst);
    const ufs = normalizarListaFiltro(filtro?.ufs || filtro?.uf || dataUf);

    return {
      geral: geral || (!instituicoes.length && !ufs.length),
      instituicoes,
      ufs
    };
  }

  function getTextoProduto(produto) {
    const dataAttrs = produto?.dataAttrs || {};
    const imagemAttrs = produto?.imagem?.dataAttrs || {};
    const partes = [
      produto?.titulo,
      produto?.descricao,
      Array.isArray(produto?.meta) ? produto.meta.join(' ') : '',
      Array.isArray(produto?.badges) ? produto.badges.join(' ') : '',
      produto?.imagem?.alt,
      produto?.imagem?.src,
      dataAttrs['data-img-base'],
      imagemAttrs['data-img-base']
    ];
    return normalizarTexto(partes.filter(Boolean).join(' '));
  }

  function classificarProduto(produto) {
    if (!produto || typeof produto !== 'object') return { geral: true, instituicoes: [], ufs: [] };
    if (cacheClassificacao.has(produto)) return cacheClassificacao.get(produto);

    const filtroExplicito = normalizarFiltroProdutoExplicito(produto);
    if (filtroExplicito) {
      cacheClassificacao.set(produto, filtroExplicito);
      return filtroExplicito;
    }

    const texto = getTextoProduto(produto);
    const instituicoes = new Set();
    const ufs = new Set();

    getInstituicoesCatalogo().forEach(inst => {
      if (!getTermosInstituicao(inst).some(termo => termoExiste(texto, termo))) return;
      instituicoes.add(inst);
      const uf = getUfInstituicao(inst);
      if (uf) ufs.add(uf);
    });

    const resultado = {
      geral: instituicoes.size === 0 && ufs.size === 0,
      instituicoes: Array.from(instituicoes),
      ufs: Array.from(ufs)
    };
    cacheClassificacao.set(produto, resultado);
    return resultado;
  }

  function produtoTemImagem(produto) {
    return !!(produto && produto.imagem && produto.imagem.src);
  }

  function coletarProdutos() {
    const base = window.UNISEGPUB_PRODUTOS || {};
    const produtos = CATEGORIAS_PRODUTOS
      .map(categoria => base[categoria])
      .filter(Array.isArray)
      .flat()
      .filter(function (produto) {
        return produto && produto.titulo && produto.href && produtoTemImagem(produto);
      });

    return produtos.length ? deduplicarProdutos(produtos) : PRODUTOS_FALLBACK;
  }

  function deduplicarProdutos(produtos) {
    const vistos = new Set();
    return (produtos || []).filter(produto => {
      const chave = `${produto.href || ''}|${normalizarTexto(produto.titulo || '')}`;
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    });
  }

  function produtoCombinaComInstituicao(produto, inst) {
    const codigo = String(inst || '').toLowerCase().trim();
    if (!codigo || codigo === 'portal') return false;

    const filtroProduto = classificarProduto(produto);
    const instituicoesProduto = filtroProduto.instituicoes || [];
    if (instituicoesProduto.includes(codigo)) return true;

    const ufsProduto = filtroProduto.ufs || [];
    const ufSelecionada = getUfInstituicao(codigo);
    return !!(ufSelecionada && ufSelecionada !== 'br' && ufSelecionada !== 'mun' && ufsProduto.includes(ufSelecionada) && !filtroProduto.geral);
  }

  function produtoGeral(produto) {
    return classificarProduto(produto).geral === true;
  }

  function getSiglaInstituicaoLateral(inst) {
    const info = getInfoInstituicao(inst);
    return info.titulo || String(inst || '').toUpperCase();
  }

  function valorSelectVisivel(select) {
    if (!select || select.disabled) return '';
    const valor = String(select.value || '').toLowerCase().trim();
    if (!ehInstituicaoValida(valor)) return '';
    const estilo = window.getComputedStyle ? window.getComputedStyle(select) : null;
    if (estilo && (estilo.display === 'none' || estilo.visibility === 'hidden')) {
      return valor;
    }
    return valor;
  }

  function getInstituicaoContexto() {
    const bodyInst = document.body?.dataset?.inst;
    if (ehInstituicaoValida(bodyInst)) return String(bodyInst).toLowerCase().trim();

    for (const seletor of SELETORES_INSTITUICAO_PRIORITARIOS) {
      const select = document.querySelector(seletor);
      const valor = valorSelectVisivel(select);
      if (valor) return valor;
    }

    const selects = Array.from(document.querySelectorAll('select'))
      .filter(select => /instituicao|instituição/i.test(select.id || select.name || select.getAttribute('aria-label') || ''));
    for (const select of selects) {
      const valor = valorSelectVisivel(select);
      if (valor) return valor;
    }

    return '';
  }

  function selecionarProdutosParaContexto(produtos, inst) {
    const todos = deduplicarProdutos(produtos && produtos.length ? produtos : PRODUTOS_FALLBACK);
    const codigo = String(inst || '').toLowerCase().trim();

    if (!codigo || !ehInstituicaoValida(codigo)) {
      return {
        produtos: todos,
        temRelacionados: false,
        titulo: 'Produtos'
      };
    }

    const relacionados = todos.filter(produto => produtoCombinaComInstituicao(produto, codigo));
    const gerais = todos.filter(produto => produtoGeral(produto));
    const outros = todos.filter(produto => !relacionados.includes(produto) && !gerais.includes(produto));
    const combinados = deduplicarProdutos(relacionados.concat(gerais, outros, PRODUTOS_FALLBACK));

    return {
      produtos: combinados,
      temRelacionados: relacionados.length > 0,
      titulo: relacionados.length > 0 ? `Produtos para ${getSiglaInstituicaoLateral(codigo)}` : 'Produtos'
    };
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

  function criarCardProduto(produto, destaqueInstitucional) {
    const card = document.createElement('article');
    card.className = 'usp-affiliate-card';
    if (destaqueInstitucional) card.classList.add('usp-affiliate-card--contextual');

    const imagemWrap = document.createElement('a');
    imagemWrap.className = 'usp-affiliate-card__media';
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

    const titulo = document.createElement('h3');
    titulo.textContent = textoCurto(produto.titulo, 58);
    card.appendChild(titulo);

    const aviso = document.createElement('small');
    aviso.className = 'usp-affiliate-card__note';
    aviso.textContent = destaqueInstitucional ? 'Produto relacionado à instituição.' : 'Produto de programa de afiliado.';
    card.appendChild(aviso);

    card.appendChild(criarLink('usp-affiliate-card__store', produto.href, produto.cta || 'Ver na loja', true));
    card.appendChild(criarLink('usp-affiliate-card__more', 'produtos.html', 'Ver mais produtos', false));

    return card;
  }

  function criarRail(lado) {
    const rail = document.createElement('aside');
    rail.className = `usp-affiliate-rail usp-affiliate-rail--${lado}`;
    rail.setAttribute('aria-label', lado === 'left' ? 'Produtos sugeridos à esquerda' : 'Produtos sugeridos à direita');

    const inner = document.createElement('div');
    inner.className = 'usp-affiliate-rail__inner';

    const titulo = document.createElement('div');
    titulo.className = 'usp-affiliate-rail__title';
    titulo.textContent = 'Produtos';
    inner.appendChild(titulo);

    const cards = document.createElement('div');
    cards.className = 'usp-affiliate-rail__cards';
    inner.appendChild(cards);

    rail.appendChild(inner);
    return rail;
  }

  function ajustarLarguraCentral(shell, pagina) {
    const maximo = LARGURA_CENTRAL_POR_PAGINA[pagina] || 1120;
    const larguraDisponivel = Math.max(0, window.innerWidth - 28);
    shell.style.setProperty('--usp-affiliate-main-width', `${Math.min(maximo, larguraDisponivel)}px`);
  }

  function atualizarRail(rail, produtos, titulo, inst) {
    if (!rail) return;
    const tituloEl = rail.querySelector('.usp-affiliate-rail__title');
    const cardsEl = rail.querySelector('.usp-affiliate-rail__cards');
    if (tituloEl) tituloEl.textContent = titulo;
    if (!cardsEl) return;

    cardsEl.replaceChildren(...produtos.map(produto => criarCardProduto(produto, !!inst && produtoCombinaComInstituicao(produto, inst))));
  }

  function renderizarProdutosLaterais(force = false) {
    if (!shellAtual) return;
    const inst = getInstituicaoContexto();
    const produtos = coletarProdutos();
    const contexto = selecionarProdutosParaContexto(produtos, inst);
    const selecionados = deduplicarProdutos(contexto.produtos.concat(PRODUTOS_FALLBACK)).slice(0, 4);
    const chave = `${inst || 'portal'}|${selecionados.map(produto => produto.href).join('|')}`;

    if (!force && chave === ultimoContextoRenderizado) return;
    ultimoContextoRenderizado = chave;

    const esquerda = [selecionados[0], selecionados[2]].filter(Boolean);
    const direita = [selecionados[1], selecionados[3]].filter(Boolean);
    const titulo = contexto.titulo || 'Produtos';

    atualizarRail(shellAtual.querySelector('.usp-affiliate-rail--left'), esquerda, titulo, contexto.temRelacionados ? inst : '');
    atualizarRail(shellAtual.querySelector('.usp-affiliate-rail--right'), direita, titulo, contexto.temRelacionados ? inst : '');
    shellAtual.dataset.affiliateInstitution = inst || 'portal';
    shellAtual.dataset.affiliateContextual = contexto.temRelacionados ? 'true' : 'false';
  }

  function agendarAtualizacaoLaterais() {
    window.clearTimeout(timerAtualizacao);
    timerAtualizacao = window.setTimeout(function () {
      renderizarProdutosLaterais(true);
    }, 80);
  }

  function observarMudancasInstituicao() {
    document.addEventListener('change', function (event) {
      const alvo = event.target;
      if (!alvo || alvo.tagName !== 'SELECT') return;
      const texto = `${alvo.id || ''} ${alvo.name || ''} ${alvo.getAttribute('aria-label') || ''}`;
      if (/instituicao|instituição|comparador/i.test(texto)) agendarAtualizacaoLaterais();
    });

    document.addEventListener('click', function (event) {
      const alvo = event.target;
      if (!alvo || !alvo.closest) return;
      if (alvo.closest('[data-estado], [data-inst], .state-flag, .comparador-check-option')) agendarAtualizacaoLaterais();
    });

    if (document.body && typeof MutationObserver === 'function') {
      const observer = new MutationObserver(function (mutations) {
        if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'data-inst')) {
          agendarAtualizacaoLaterais();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['data-inst'] });
    }
  }

  function iniciarProdutosLaterais() {
    const pagina = document.body && document.body.dataset ? document.body.dataset.page : '';
    if (!PAGINAS_COM_VITRINE_LATERAL.has(pagina)) return;
    if (pagina === 'produtos') return;

    const existente = document.querySelector('.usp-affiliate-side-shell');
    if (existente) {
      shellAtual = existente;
      renderizarProdutosLaterais(true);
      return;
    }

    const main = document.querySelector('main.page-section.active[role="main"]') || document.querySelector('main.page-section.active') || document.querySelector('main');
    if (!main || !main.parentNode) return;

    const shell = document.createElement('div');
    shell.className = 'usp-affiliate-side-shell';
    shell.setAttribute('data-affiliate-products', 'true');

    main.parentNode.insertBefore(shell, main);
    shell.appendChild(criarRail('left'));
    shell.appendChild(main);
    shell.appendChild(criarRail('right'));
    shellAtual = shell;

    ajustarLarguraCentral(shell, pagina);
    window.addEventListener('resize', function () {
      ajustarLarguraCentral(shell, pagina);
    }, { passive: true });

    observarMudancasInstituicao();
    renderizarProdutosLaterais(true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarProdutosLaterais, { once: true });
  } else {
    iniciarProdutosLaterais();
  }
})();
