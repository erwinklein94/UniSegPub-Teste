/* Concursos — filtro e paginação visual sobre conteúdo já escrito no HTML. */
(function () {
  const CARDS_POR_PAGINA = 4;

  function qs(selector, root) { return (root || document).querySelector(selector); }
  function qsa(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }
  function normalizar(valor) { return String(valor || '').trim().toLowerCase(); }

  function cards() {
    return qsa('[data-concurso-card][data-inst]');
  }

  function esconderDetalhe() {
    const detalhe = qs('#consulta-concurso-detalhado');
    if (detalhe) detalhe.hidden = true;
  }

  function mostrarDetalhe() {
    const detalhe = qs('#consulta-concurso-detalhado');
    if (detalhe) detalhe.hidden = false;
  }

  function textoSeguro(valor) {
    const texto = String(valor == null ? '' : valor);
    if (typeof escapeHtml === 'function') return escapeHtml(texto);
    return texto.replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function urlValida(valor) {
    return /^https?:\/\//i.test(String(valor || '').trim());
  }


  const CATEGORIAS_PRODUTOS_CONCURSOS = [
    'cursosGerais',
    'cursosPmesp',
    'cursosPcsp',
    'livrosEbooks',
    'produtosFisicos'
  ];

  const TERMOS_PRODUTOS_POR_INSTITUICAO = {
    pcdf: ['pcdf', 'pc df', 'policia civil do distrito federal', 'polícia civil do distrito federal']
  };

  function normalizarTextoProduto(valor) {
    return String(valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[()[\]{}.,;:|/\\_+\-–—]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function textoProduto(produto) {
    return normalizarTextoProduto([
      produto?.titulo,
      produto?.descricao,
      produto?.imagem?.alt,
      Array.isArray(produto?.badges) ? produto.badges.join(' ') : '',
      Array.isArray(produto?.meta) ? produto.meta.join(' ') : ''
    ].filter(Boolean).join(' '));
  }

  function listaFiltroProduto(valor) {
    if (!valor) return [];
    if (Array.isArray(valor)) return valor.map(item => normalizar(item)).filter(Boolean);
    return String(valor).split(',').map(item => normalizar(item)).filter(Boolean);
  }

  function getFiltroProdutoExplicito(produto) {
    const filtro = produto?.filtro || produto?.filter || null;
    if (!filtro) return [];
    return listaFiltroProduto(filtro.instituicoes || filtro.insts || filtro.inst);
  }

  function termoProdutoExiste(texto, termo) {
    const termoNormalizado = normalizarTextoProduto(termo);
    if (!termoNormalizado) return false;
    if (/^[a-z0-9]{2,8}$/.test(termoNormalizado)) {
      return new RegExp(`(^|\\s)${termoNormalizado}(\\s|$)`).test(texto);
    }
    return texto.includes(termoNormalizado);
  }

  function getTermosProdutoInstituicao(inst) {
    const codigo = normalizar(inst);
    const termos = new Set(TERMOS_PRODUTOS_POR_INSTITUICAO[codigo] || []);
    if (codigo) termos.add(codigo);

    const info = typeof HEADER_INSTITUICOES_INFO !== 'undefined' ? HEADER_INSTITUICOES_INFO[codigo] : null;
    if (info?.titulo) termos.add(info.titulo);
    if (info?.desc) termos.add(info.desc);

    return Array.from(termos).filter(Boolean);
  }

  function produtoRelacionadoAInstituicao(produto, inst) {
    const codigo = normalizar(inst);
    if (!codigo || !produto) return false;

    const filtroExplicito = getFiltroProdutoExplicito(produto);
    if (filtroExplicito.includes(codigo)) return true;

    const texto = textoProduto(produto);
    return getTermosProdutoInstituicao(codigo).some(termo => termoProdutoExiste(texto, termo));
  }

  function coletarProdutosConcursos(inst) {
    const base = window.UNISEGPUB_PRODUTOS || {};
    const vistos = new Set();
    const produtos = [];

    CATEGORIAS_PRODUTOS_CONCURSOS.forEach(categoria => {
      const lista = base[categoria];
      if (!Array.isArray(lista)) return;
      lista.forEach(produto => {
        if (!produtoRelacionadoAInstituicao(produto, inst)) return;
        if (!produto?.titulo || !produto?.href) return;
        const chave = `${produto.href}::${produto.titulo}`;
        if (vistos.has(chave)) return;
        vistos.add(chave);
        produtos.push(produto);
      });
    });

    return produtos;
  }

  function produtoCardConcursosHtml(produto) {
    const imagem = produto?.imagem || {};
    const badges = Array.isArray(produto?.badges) ? produto.badges.filter(Boolean) : [];
    const meta = Array.isArray(produto?.meta) ? produto.meta.filter(Boolean).slice(0, 3) : [];
    const rel = produto.rel || 'sponsored noopener noreferrer';
    const target = produto.target || '_blank';
    const src = imagem.src || '';
    const alt = imagem.alt || produto.titulo || 'Produto relacionado ao concurso';
    const dataImgBase = imagem?.dataAttrs?.['data-img-base'] || '';
    const dataImgBaseAttr = dataImgBase ? ` data-img-base="${textoSeguro(dataImgBase)}"` : '';

    return `
      <a class="produto-card concursos-produtos-card" href="${textoSeguro(produto.href)}" target="${textoSeguro(target)}" rel="${textoSeguro(rel)}" aria-label="${textoSeguro(produto.ariaLabel || `Ver produto: ${produto.titulo}`)}">
        <div class="produto-imagem concursos-produtos-card__media" aria-hidden="true">
          ${src ? `<img src="${textoSeguro(src)}" alt="${textoSeguro(alt)}" loading="lazy" decoding="async"${dataImgBaseAttr}>` : ''}
        </div>
        <div class="concursos-produtos-card__conteudo">
          <span class="concursos-produtos-card__selo">Produto relacionado</span>
          ${badges.length ? `<div class="concursos-produtos-card__badges">${badges.slice(0, 3).map(badge => `<span>${textoSeguro(badge)}</span>`).join('')}</div>` : ''}
          <strong>${textoSeguro(produto.titulo)}</strong>
          <p>${textoSeguro(produto.descricao || 'Material relacionado à instituição selecionada.')}</p>
          ${meta.length ? `<div class="concursos-produtos-card__meta">${meta.map(item => `<span>${textoSeguro(item)}</span>`).join('')}</div>` : ''}
          <span class="concursos-produtos-card__cta">${textoSeguro(produto.cta || 'Ver na loja')}</span>
        </div>
      </a>
    `;
  }

  function labelInstituicaoConcursos(inst) {
    const codigo = normalizar(inst);
    const select = qs('#concursos_instituicao');
    const option = Array.from(select?.options || []).find(item => item.value === codigo);
    if (option?.textContent) return option.textContent.trim();
    const info = typeof HEADER_INSTITUICOES_INFO !== 'undefined' ? HEADER_INSTITUICOES_INFO[codigo] : null;
    return info?.titulo || codigo.toUpperCase();
  }

  function renderizarProdutosRelacionados(inst) {
    const bloco = qs('#concursos-produtos-relacionados');
    const grade = qs('#concursos-produtos-grid');
    const status = qs('#concursos-produtos-status');
    if (!bloco || !grade) return;

    const codigo = normalizar(inst);
    if (!codigo) {
      bloco.hidden = true;
      grade.innerHTML = '';
      if (status) status.textContent = '';
      return;
    }

    const produtos = coletarProdutosConcursos(codigo);
    if (!produtos.length) {
      bloco.hidden = true;
      grade.innerHTML = '';
      if (status) status.textContent = '';
      return;
    }

    const label = labelInstituicaoConcursos(codigo);
    bloco.hidden = false;
    if (status) {
      status.textContent = `${produtos.length} produto(s) cadastrado(s) para ${label}.`;
    }
    grade.innerHTML = produtos.slice(0, 6).map(produtoCardConcursosHtml).join('');
  }

  window.renderizarProdutosConcursosRelacionados = renderizarProdutosRelacionados;

  function concursoFallbackHtml(inst) {
    if (typeof CONCURSOS === 'undefined' || !CONCURSOS[inst]) return '';
    const c = CONCURSOS[inst];
    const link = urlValida(c.site)
      ? `<a href="${textoSeguro(c.site)}" target="_blank" rel="noopener noreferrer" class="concurso-link">🔗 Site oficial da instituição</a>`
      : '<span class="direito-desc">Fonte oficial em breve</span>';

    return `
      <div class="direito-item acao">
        <span class="direito-nome">${textoSeguro(c.edital || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Salário inicial:</strong> ${textoSeguro(c.salario || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Vagas:</strong> ${textoSeguro(c.vagas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Cotas:</strong> ${textoSeguro(c.cotas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Idade exigida:</strong> ${textoSeguro(c.idade || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Escolaridade:</strong> ${textoSeguro(c.escolaridade || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Banca:</strong> ${textoSeguro(c.banca || 'Dados em breve')} · <strong>Inscritos no último:</strong> ${textoSeguro(c.inscritos || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Disciplinas:</strong> ${textoSeguro(c.materias || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Etapas do certame:</strong> ${textoSeguro(c.etapas || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Curso de Formação:</strong> ${textoSeguro(c.cfsd || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Estágio Probatório:</strong> ${textoSeguro(c.estagio || 'Dados em breve')}</span>
        <span class="direito-desc"><strong>Validade do edital:</strong> ${textoSeguro(c.validade || 'Dados em breve')}</span>
        <span class="direito-desc" style="margin-top:8px;"><strong>Próximo Edital:</strong> ${textoSeguro(c.previsao || 'Dados em breve')}</span>
        ${link}
      </div>
    `;
  }

  function atualizarOpcoesInstituicao(seletorEsfera, seletorInstituicao) {
    const esfera = normalizar(seletorEsfera?.value);
    Array.from(seletorInstituicao?.options || []).forEach(option => {
      if (!option.value) {
        option.hidden = false;
        return;
      }
      option.hidden = Boolean(esfera) && option.dataset.esfera !== esfera;
    });

    const atual = seletorInstituicao?.selectedOptions?.[0];
    if (atual && atual.hidden) seletorInstituicao.value = '';
  }

  function cardsFiltrados(seletorEsfera, seletorInstituicao) {
    const esfera = normalizar(seletorEsfera?.value);
    const inst = normalizar(seletorInstituicao?.value);
    return cards().filter(card => {
      if (esfera && card.dataset.esfera !== esfera) return false;
      if (inst && card.dataset.inst !== inst) return false;
      return true;
    });
  }

  function renderizarPaginacao(paginacao, paginaAtual, totalPaginas) {
    if (!paginacao) return;
    if (totalPaginas <= 1) {
      paginacao.hidden = true;
      paginacao.innerHTML = '';
      return;
    }

    paginacao.hidden = false;
    const botoes = [];
    botoes.push(`<button type="button" data-concursos-page="prev" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>`);
    for (let i = 1; i <= totalPaginas; i += 1) {
      botoes.push(`<button type="button" data-concursos-page="${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`);
    }
    botoes.push(`<button type="button" data-concursos-page="next" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>`);
    paginacao.innerHTML = botoes.join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const seletorEsfera = qs('#concursos_esfera');
    const seletorInstituicao = qs('#concursos_instituicao');
    const paginacao = qs('#concursos-paginacao');
    const contador = qs('#concursos-contador-cards');
    const btnLimpar = qs('[data-concursos-limpar]');
    const listaDetalhe = qs('#lista-concursos');
    let paginaAtual = 1;

    if (!seletorEsfera || !seletorInstituicao || !paginacao) return;

    function renderizar() {
      atualizarOpcoesInstituicao(seletorEsfera, seletorInstituicao);
      const filtrados = cardsFiltrados(seletorEsfera, seletorInstituicao);
      const totalPaginas = Math.max(1, Math.ceil(filtrados.length / CARDS_POR_PAGINA));
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      if (paginaAtual < 1) paginaAtual = 1;

      const inicio = (paginaAtual - 1) * CARDS_POR_PAGINA;
      const fim = inicio + CARDS_POR_PAGINA;
      const visiveis = new Set(filtrados.slice(inicio, fim));

      cards().forEach(card => {
        card.hidden = !visiveis.has(card);
      });

      if (contador) {
        const texto = seletorInstituicao.value ? 'instituição selecionada' : 'instituições encontradas';
        contador.textContent = `${filtrados.length} ${texto}`;
      }

      renderizarPaginacao(paginacao, paginaAtual, totalPaginas);
    }

    function selecionarInstituicao(inst, rolar) {
      if (!inst) {
        esconderDetalhe();
        if (listaDetalhe) listaDetalhe.innerHTML = '';
        renderizarProdutosRelacionados('');
        return;
      }

      mostrarDetalhe();

      try {
        if (typeof mudarInstituicao === 'function') {
          mudarInstituicao(inst);
        }
      } catch (erro) {
        console.warn('Falha ao atualizar cabeçalho institucional do concurso:', erro);
      }

      try {
        if (typeof carregarConcursos === 'function') carregarConcursos();
      } catch (erro) {
        console.warn('Falha ao carregar dados completos do concurso:', erro);
      }

      if (listaDetalhe && !listaDetalhe.textContent.trim()) {
        listaDetalhe.innerHTML = concursoFallbackHtml(inst);
      }

      renderizarProdutosRelacionados(inst);

      if (rolar) {
        const destino = qs('#consulta-concurso-detalhado');
        if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    seletorEsfera.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
      if (!seletorInstituicao.value) selecionarInstituicao('', false);
    });

    seletorInstituicao.addEventListener('change', () => {
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(seletorInstituicao.value, !!seletorInstituicao.value);
    });

    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        seletorEsfera.value = '';
        seletorInstituicao.value = '';
        paginaAtual = 1;
        renderizar();
        selecionarInstituicao('', false);
        if (typeof aplicarHeaderInicialPortal === 'function') aplicarHeaderInicialPortal();
      });
    }

    paginacao.addEventListener('click', event => {
      const botao = event.target.closest('[data-concursos-page]');
      if (!botao || botao.disabled) return;
      const destino = botao.dataset.concursosPage;
      const totalPaginas = Math.max(1, Math.ceil(cardsFiltrados(seletorEsfera, seletorInstituicao).length / CARDS_POR_PAGINA));

      if (destino === 'prev') paginaAtual -= 1;
      else if (destino === 'next') paginaAtual += 1;
      else paginaAtual = Number(destino) || 1;

      if (paginaAtual < 1) paginaAtual = 1;
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      renderizar();
      const lista = qs('#concursos-conteudo-lista');
      if (lista) lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });


    document.addEventListener('change', event => {
      const alvo = event.target;
      if (!alvo || !alvo.matches || !alvo.matches('#instituicao, #instituicao_header')) return;
      const inst = normalizar(alvo.value);
      if (!inst) return;

      const valorCss = (window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(inst) : String(inst).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
      const card = qs(`[data-concurso-card][data-inst="${valorCss}"]`);
      if (!card) return;

      seletorEsfera.value = card.dataset.esfera || '';
      seletorInstituicao.value = inst;
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(inst, true);
    });

    document.addEventListener('click', event => {
      const botao = event.target.closest('[data-concurso-load]');
      if (!botao) return;
      const inst = botao.dataset.concursoLoad;
      if (!inst) return;
      event.preventDefault();

      const valorCss = (window.CSS && typeof window.CSS.escape === 'function') ? window.CSS.escape(inst) : String(inst).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
      const card = qs(`[data-concurso-card][data-inst="${valorCss}"]`);
      if (card) seletorEsfera.value = card.dataset.esfera || '';
      seletorInstituicao.value = inst;
      paginaAtual = 1;
      renderizar();
      selecionarInstituicao(inst, true);
    });

    esconderDetalhe();
    renderizar();
  });
})();
