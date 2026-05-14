# Concursos PCDF — Pesquisa e implementação no site

Data da revisão: 14/05/2026  
Instituição: PCDF — Polícia Civil do Distrito Federal  
Aba impactada: Concursos

## BLOCO A — HTML editorial inserido

```html
<article class="card concursos-conteudo-card" data-concurso-card data-inst="pcdf" data-esfera="estadual">
  <div class="concursos-card-topo">
    <div>
      <span class="concursos-card-kicker">Distrito Federal • PCDF · Polícia Civil</span>
      <h2>PCDF: concursos, requisitos e etapas</h2>
      <p>O guia de concursos da Polícia Civil do Distrito Federal separa o edital aberto de Delegado 2026 dos pedidos oficiais em planejamento, evitando misturar certames e marcando como “Dados em breve” tudo que ainda não tem fonte pública suficiente.</p>
    </div>
    <span class="concursos-card-sigla" aria-hidden="true">PCDF</span>
  </div>

  <div class="concursos-card-indicadores" aria-label="Resumo do concurso da PCDF">
    <div><span>Destaque atual</span><strong>Delegado de Polícia PCDF 2026 — Edital nº 1/2026, retificado pelos Editais nº 3 e nº 4/2026, com inscrições de 07/05/2026 a 25/05/2026.</strong></div>
    <div><span>Vagas</span><strong>Delegado: 50 imediatas + 100 cadastro de reserva = 150. Agente de Custódia e área pericial: contratação de banca prevista no PACC, vagas oficiais em Dados em breve.</strong></div>
    <div><span>Banca</span><strong>Cebraspe no concurso de Delegado. Demais certames planejados: banca em Dados em breve até contratação/publicação oficial.</strong></div>
    <div><span>Escolaridade</span><strong>Delegado: bacharelado em Direito, três anos de atividade jurídica ou policial e CNH B ou superior. Demais cargos: conferir edital futuro.</strong></div>
  </div>

  <div class="concursos-certames-grade" aria-label="Certames PCDF por cargo">
    <section class="concursos-subcard concursos-subcard--destaque">
      <span class="concursos-subcard-tag">Aberto · Último edital em destaque</span>
      <h3>Delegado de Polícia — PCDF 2026</h3>
      <p><strong>Edital:</strong> Edital nº 1/2026, de 03/02/2026, retificado pelos Editais nº 3 e nº 4/2026.</p>
      <p><strong>Vagas:</strong> 50 imediatas + 100 CR. Distribuição retificada: 25 AC, 10 PcD, 10 PP e 5 HIPO nas vagas imediatas; 50 AC, 20 PcD, 20 PP e 10 HIPO no cadastro reserva.</p>
      <p><strong>Remuneração:</strong> R$ 26.690,15, jornada de 40 horas semanais e dedicação exclusiva.</p>
      <p><strong>Inscrições:</strong> 07/05/2026 a 25/05/2026; taxa de R$ 310,00; pagamento até 27/05/2026.</p>
      <p><strong>Etapas:</strong> provas objetiva e discursivas, prova oral, identificação biométrica, avaliação médica, TAF, avaliação psicológica, sindicância/investigação social, Curso de Formação Profissional e títulos.</p>
      <p><strong>Previsão:</strong> provas objetiva e discursivas em 05/07/2026; prova oral entre 08 e 11/10/2026; etapas físicas/toxicológicas em abril/2027; convocações para CFP em 2027 e nomeações escalonadas em 2028/2029.</p>
    </section>

    <section class="concursos-subcard concursos-subcard--pedido">
      <span class="concursos-subcard-tag">Pedido / planejamento oficial</span>
      <h3>Agente Policial de Custódia</h3>
      <p><strong>Situação:</strong> o PACC/DODF registrou contratação de instituição para realização do concurso.</p>
      <p><strong>Documento:</strong> DODF nº 8/2026, item 84, e DODF nº 66/2026, item 84.</p>
      <p><strong>Vagas, banca, taxa e cronograma:</strong> Dados em breve até publicação oficial de edital ou contratação da banca.</p>
    </section>

    <section class="concursos-subcard concursos-subcard--pedido">
      <span class="concursos-subcard-tag">Pedido / planejamento oficial</span>
      <h3>Perito Criminal, Perito Médico-Legista e Papiloscopista Policial</h3>
      <p><strong>Situação:</strong> o PACC/DODF registrou contratação de instituição para realização do concurso da área pericial.</p>
      <p><strong>Documento:</strong> DODF nº 8/2026, item 85, e DODF nº 66/2026, item 85.</p>
      <p><strong>Vagas, banca, taxa e cronograma:</strong> Dados em breve até publicação oficial de edital específico.</p>
    </section>
  </div>

  <div class="concursos-card-corpo">
    <p><strong>Histórico recente:</strong> a PCDF mantém páginas oficiais com atos de Agente de Polícia e Escrivão de Polícia publicados em 2025. Esses certames aparecem como histórico/acompanhamento, não como novo edital aberto.</p>
    <p><strong>Orientação ao candidato:</strong> para PCDF, trate cada cargo como certame próprio. O edital aberto de Delegado tem dados completos; os demais pedidos devem ser acompanhados no DODF, PCDF e página da banca quando houver contratação.</p>
  </div>

  <div class="concursos-card-rodape">
    <p><strong>Conferência:</strong> datas, cotas, locais, requisitos, disciplinas e fases podem mudar por retificação. Consulte sempre Cebraspe, PCDF e DODF antes de tomar decisão de inscrição.</p>
    <div class="concursos-card-links">
      <a href="https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO" target="_blank" rel="noopener noreferrer">Abrir Cebraspe PCDF Delegado</a>
      <a href="https://www.pcdf.df.gov.br/concursos-publicos" target="_blank" rel="noopener noreferrer">Abrir concursos PCDF</a>
      <button type="button" data-concurso-load="pcdf">Consultar dados completos</button>
    </div>
  </div>
</article>
```

## BLOCO B — Objeto JavaScript inserido em `CONCURSOS["pcdf"]`

```js
  "pcdf": {
    "edital": "PCDF — Delegado de Polícia 2026, Edital nº 1/2026, retificado pelos Editais nº 3 e nº 4/2026; concurso aberto e organizado pelo Cebraspe.",
    "salario": "Delegado de Polícia: subsídio inicial de R$ 26.690,15, jornada de 40 horas semanais e dedicação exclusiva. Demais cargos com pedidos/planejamento sem edital publicado: Dados em breve.",
    "vagas": "Delegado: 50 vagas imediatas + 100 em cadastro de reserva, total de 150 oportunidades. Distribuição retificada: imediatas 25 AC, 10 PcD, 10 PP e 5 HIPO; cadastro reserva 50 AC, 20 PcD, 20 PP e 10 HIPO. Agente Policial de Custódia e cargos periciais constam em planejamento de contratação de banca, com vagas oficiais ainda em Dados em breve.",
    "cotas": "Delegado: reserva para PcD, PP e hipossuficientes conforme retificação do edital. Percentuais e procedimentos devem ser conferidos no edital, nas retificações e nos atos do Cebraspe.",
    "idade": "Delegado: idade mínima de 18 anos na posse, CNH categoria B ou superior, bacharelado em Direito e três anos de atividade jurídica ou policial. Para os demais cargos sem edital vigente: Dados em breve.",
    "escolaridade": "Delegado: diploma de bacharel em Direito e comprovação de três anos de atividade jurídica ou policial. Agente Policial de Custódia, Perito Criminal, Perito Médico-Legista e Papiloscopista Policial: requisitos serão consolidados após edital específico.",
    "materias": "Delegado: disciplinas jurídicas e institucionais do edital Cebraspe, incluindo Direito Administrativo, Constitucional, Penal, Processual Penal, Civil, Processual Civil, Empresarial, Tributário, Ambiental, Criminologia, Medicina Legal, Direitos Humanos e legislação especial, além de provas discursivas e prova oral. Demais cargos: Dados em breve até publicação de edital.",
    "banca": "Cebraspe para o concurso de Delegado PCDF 2026. Para Agente Policial de Custódia e área pericial, os atos do PACC/DODF registram contratação de instituição para realização dos concursos; banca ainda em Dados em breve.",
    "inscritos": "Delegado: inscrições de 07/05/2026 a 25/05/2026; taxa de R$ 310,00; pagamento até 27/05/2026. Total de inscritos: Dados em breve.",
    "etapas": "Delegado: provas objetivas e discursivas, prova oral, identificação biométrica, avaliação médica, prova de capacidade física, avaliação psicológica, sindicância de vida pregressa e investigação social, curso de formação profissional e avaliação de títulos, conforme edital/retificações.",
    "cfsd": "Delegado: Curso de Formação Profissional, de responsabilidade do Cebraspe, com caráter eliminatório. Para demais cargos PCDF ainda sem edital publicado: Dados em breve.",
    "estagio": "Posse, exercício e estágio probatório seguem a legislação aplicável à PCDF, edital, atos de nomeação e normas internas. Regras específicas por cargo: Dados em breve quando o edital respectivo for publicado.",
    "validade": "Dados em breve no resumo consolidado; conferir edital, retificações e homologação do resultado final para prazo definitivo de validade/prorrogação.",
    "previsao": "Em 14/05/2026, o destaque oficial é Delegado PCDF 2026, com inscrições abertas até 25/05/2026, provas objetiva e discursivas previstas para 05/07/2026 e nomeações escalonadas no cronograma 2028/2029. Há planejamento oficial de contratação de banca para Agente Policial de Custódia e área pericial no PACC/DODF, sem edital publicado nesta revisão.",
    "site": "https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO",
    "ultimo": {
      "cargo": "Delegado de Polícia",
      "situacao": "Aberto — inscrições de 07/05/2026 a 25/05/2026",
      "edital": "Edital nº 1/2026, de 03/02/2026, retificado pelos Editais nº 3 e nº 4/2026",
      "salario": "R$ 26.690,15",
      "vagas": "50 imediatas + 100 cadastro de reserva = 150",
      "cotas": "AC, PcD, PP e HIPO, com distribuição retificada no Edital nº 3/2026",
      "idade": "18 anos na posse; CNH B ou superior; demais requisitos do edital",
      "escolaridade": "Bacharelado em Direito e três anos de atividade jurídica ou policial",
      "materias": [
        "Direito Administrativo",
        "Direito Constitucional",
        "Direito Penal",
        "Direito Processual Penal",
        "Direito Civil",
        "Direito Processual Civil",
        "Direito Empresarial",
        "Direito Tributário",
        "Direito Ambiental",
        "Criminologia",
        "Medicina Legal",
        "Direitos Humanos",
        "Legislação especial"
      ],
      "banca": "Cebraspe",
      "inscritos": {
        "periodo": "07/05/2026 a 25/05/2026",
        "taxa": "R$ 310,00",
        "pagamento": "até 27/05/2026",
        "total": "Dados em breve"
      },
      "etapas": [
        "Provas objetivas",
        "Provas discursivas",
        "Prova oral",
        "Identificação biométrica",
        "Avaliação médica",
        "Prova de capacidade física",
        "Avaliação psicológica",
        "Sindicância de vida pregressa e investigação social",
        "Curso de formação profissional",
        "Avaliação de títulos"
      ],
      "cfsd": "Curso de Formação Profissional, eliminatório, de responsabilidade do Cebraspe",
      "estagio": "Dados em breve",
      "validade": "Dados em breve — confirmar na homologação e atos posteriores",
      "previsao": "Locais de prova em 22/06/2026; provas objetiva e discursivas em 05/07/2026; prova oral entre 08 e 11/10/2026; TAF/toxicológico entre 09 e 13/04/2027; convocação para CFP em 17/09/2027; nomeações mínimas escalonadas em 2028 e 2029",
      "site": "https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO"
    },
    "abertos": [
      {
        "cargo": "Delegado de Polícia",
        "situacao": "Aberto — inscrições de 07/05/2026 a 25/05/2026",
        "edital": "Edital nº 1/2026, de 03/02/2026, retificado pelos Editais nº 3 e nº 4/2026",
        "salario": "R$ 26.690,15",
        "vagas": "50 imediatas + 100 cadastro de reserva = 150",
        "cotas": "AC, PcD, PP e HIPO, com distribuição retificada no Edital nº 3/2026",
        "idade": "18 anos na posse; CNH B ou superior; demais requisitos do edital",
        "escolaridade": "Bacharelado em Direito e três anos de atividade jurídica ou policial",
        "materias": [
          "Direito Administrativo",
          "Direito Constitucional",
          "Direito Penal",
          "Direito Processual Penal",
          "Direito Civil",
          "Direito Processual Civil",
          "Direito Empresarial",
          "Direito Tributário",
          "Direito Ambiental",
          "Criminologia",
          "Medicina Legal",
          "Direitos Humanos",
          "Legislação especial"
        ],
        "banca": "Cebraspe",
        "inscritos": {
          "periodo": "07/05/2026 a 25/05/2026",
          "taxa": "R$ 310,00",
          "pagamento": "até 27/05/2026",
          "total": "Dados em breve"
        },
        "etapas": [
          "Provas objetivas",
          "Provas discursivas",
          "Prova oral",
          "Identificação biométrica",
          "Avaliação médica",
          "Prova de capacidade física",
          "Avaliação psicológica",
          "Sindicância de vida pregressa e investigação social",
          "Curso de formação profissional",
          "Avaliação de títulos"
        ],
        "cfsd": "Curso de Formação Profissional, eliminatório, de responsabilidade do Cebraspe",
        "estagio": "Dados em breve",
        "validade": "Dados em breve — confirmar na homologação e atos posteriores",
        "previsao": "Locais de prova em 22/06/2026; provas objetiva e discursivas em 05/07/2026; prova oral entre 08 e 11/10/2026; TAF/toxicológico entre 09 e 13/04/2027; convocação para CFP em 17/09/2027; nomeações mínimas escalonadas em 2028 e 2029",
        "site": "https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO"
      }
    ],
    "pedidos_abertura": [
      {
        "cargo": "Agente Policial de Custódia",
        "situacao": "Planejamento oficial / contratação de banca prevista no PACC",
        "documento": "DODF nº 8, de 14/01/2026, item 84; DODF nº 66, de 10/04/2026, item 84",
        "vagas": "Dados em breve — a fonte oficial consultada registra contratação de instituição, mas não consolida vagas do edital",
        "banca": "Dados em breve",
        "proximo_passo": "Contratação da banca e publicação de edital específico",
        "fonte": "SINJ/DODF — PACC PCDF 2026"
      },
      {
        "cargo": "Perito Criminal, Perito Médico-Legista e Papiloscopista Policial",
        "situacao": "Planejamento oficial / contratação de banca prevista no PACC",
        "documento": "DODF nº 8, de 14/01/2026, item 85; DODF nº 66, de 10/04/2026, item 85",
        "vagas": "Dados em breve — a fonte oficial consultada registra contratação de instituição, mas não consolida vagas do edital",
        "banca": "Dados em breve",
        "proximo_passo": "Contratação da banca e publicação de edital específico para cada cargo/área",
        "fonte": "SINJ/DODF — PACC PCDF 2026"
      }
    ],
    "historico_recente": [
      {
        "cargo": "Agente de Polícia",
        "situacao": "Concurso público em andamento/histórico, com atos oficiais publicados pela PCDF em 2025",
        "edital": "Página oficial PCDF — Agente de Polícia, com editais até o nº 78/DODF nº 220, de 19/11/2025",
        "banca": "Cebraspe em certame anterior; conferir cada ato oficial",
        "vagas": "Dados em breve no resumo consolidado",
        "site": "https://www.pcdf.df.gov.br/concursos-publicos/agente-de-policia"
      },
      {
        "cargo": "Escrivão de Polícia",
        "situacao": "Concurso público em andamento/histórico, com atos oficiais publicados pela PCDF em 2025",
        "edital": "Página oficial PCDF — Escrivão de Polícia, com Edital nº 65/DODF nº 158, de 22/08/2025",
        "banca": "Cebraspe em certame anterior; conferir cada ato oficial",
        "vagas": "Dados em breve no resumo consolidado",
        "site": "https://www.pcdf.df.gov.br/concursos-publicos/escrivao-de-policia"
      }
    ],
    "fontes": [
      "https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO",
      "https://www.cebraspe.org.br/policia-civil-do-distrito-federal-divulga-novas-datas-do-concurso-para-delegado/",
      "https://www.pcdf.df.gov.br/noticias/15066/pcdf-publica-edital-de-concurso-para-delegado-de-policia",
      "https://www.sinj.df.gov.br/sinj/TextoArquivoDiario.aspx?id_file=faa7c7d2-2cb9-32fd-80ff-bc259ca22eec",
      "https://www.pcdf.df.gov.br/concursos-publicos/agente-de-policia",
      "https://www.pcdf.df.gov.br/concursos-publicos/escrivao-de-policia"
    ]
  },
```

## BLOCO C — Síntese narrativa da pesquisa

A pesquisa da PCDF foi tratada por certame, e não apenas por instituição, porque a Polícia Civil do Distrito Federal possui cargos com editais e etapas próprias. O destaque atual da aba Concursos é o concurso de Delegado de Polícia PCDF 2026, organizado pelo Cebraspe. O edital foi publicado pela PCDF em fevereiro de 2026 e depois teve o cronograma retificado, ficando com inscrições de 7 a 25 de maio de 2026, taxa de R$ 310,00 e pagamento até 27 de maio de 2026. A remuneração informada para Delegado é de R$ 26.690,15, com jornada de 40 horas semanais e regime de dedicação exclusiva.

A estrutura do card foi montada com o edital de Delegado como “Aberto / Último edital em destaque”, pois é o certame vigente com dados completos. A retificação de vagas foi incorporada: 50 vagas imediatas e 100 em cadastro de reserva, totalizando 150, com distribuição entre ampla concorrência, pessoas com deficiência, pessoas pretas/pardas e hipossuficientes. Também foram inseridas as etapas principais do certame: provas objetiva e discursivas, prova oral, identificação biométrica, avaliação médica, teste de aptidão física, avaliação psicológica, sindicância de vida pregressa e investigação social, Curso de Formação Profissional e avaliação de títulos.

Além do certame aberto, foram adicionados dois blocos de planejamento oficial: Agente Policial de Custódia e área pericial, abrangendo Perito Criminal, Perito Médico-Legista e Papiloscopista Policial. Nesses casos, o DODF/PACC registra a contratação de instituição para realização dos concursos, mas a fonte oficial consultada não consolida vagas, banca, taxa e cronograma final. Por isso, esses campos foram preenchidos como “Dados em breve”, respeitando o padrão do prompt e evitando inserir número de vagas sem lastro oficial suficiente.

Também foi incluído histórico recente de Agente de Polícia e Escrivão de Polícia com base nas páginas oficiais da PCDF, mas sem tratá-los como novo edital aberto. Assim, quando o usuário pesquisar por “pcdf” na aba Concursos, verá o card da instituição, o certame aberto de Delegado em destaque, os pedidos oficiais de novos concursos e os links de conferência.

## BLOCO D — Fontes consultadas

1. Cebraspe — página do concurso PCDF Delegado 2026: https://www.cebraspe.org.br/concursos/PC_DF_26_DELEGADO
2. Cebraspe — notícia de novas datas do concurso de Delegado PCDF: https://www.cebraspe.org.br/policia-civil-do-distrito-federal-divulga-novas-datas-do-concurso-para-delegado/
3. PCDF — notícia oficial de publicação do edital de Delegado: https://www.pcdf.df.gov.br/noticias/15066/pcdf-lanca-edital-de-concurso-para-o-cargo-de-delegado-de-policia-do-distrito-federal
4. Cebraspe — Edital nº 3/2026, retificação de vagas/cotas do concurso de Delegado PCDF.
5. Cebraspe — Edital nº 4/2026, retificação do cronograma do concurso de Delegado PCDF.
6. SINJ/DODF nº 8, de 14/01/2026 — PACC/PCDF, itens 83, 84 e 85.
7. SINJ/DODF nº 66, de 10/04/2026 — atualização PACC/PCDF, itens 83, 84 e 85.
8. PCDF — página de concursos de Agente de Polícia: https://www.pcdf.df.gov.br/concursos-publicos/agente-de-policia
9. PCDF — página de concursos de Escrivão de Polícia: https://www.pcdf.df.gov.br/concursos-publicos/escrivao-de-policia

## BLOCO E — Resumo executivo

- Inserida a PCDF no seletor da aba Concursos, em grupo próprio “Distrito Federal (DF)”.
- Criado card estático `data-inst="pcdf"`, filtrável pela busca da aba Concursos.
- O destaque atual é Delegado de Polícia PCDF 2026, com inscrições de 07/05/2026 a 25/05/2026.
- Foram cadastradas 50 vagas imediatas + 100 CR para Delegado, com distribuição de cotas da retificação oficial.
- Remuneração de Delegado cadastrada: R$ 26.690,15, 40h e dedicação exclusiva.
- Pedidos/planejamento de Agente Policial de Custódia e área pericial foram inseridos com “Dados em breve” nos campos ainda sem edital oficial.
- Histórico de Agente de Polícia e Escrivão foi incluído como acompanhamento/histórico, sem marcar como novo concurso aberto.
- Atualizado `js/data/concursos-data.js` com dados planos e estrutura por certame.
- Atualizado `js/ui/header-estados.js` para preservar campos estruturados como `ultimo`, `abertos`, `pedidos_abertura` e `historico_recente`.
- Adicionado CSS para subcards de certames múltiplos.

## BLOCO F — Migração / diff funcional

Arquivos alterados:

- `concursos.html`
  - Adicionado `<option value="pcdf">` no seletor de instituições.
  - Contador textual alterado de 45 para 46 instituições.
  - Inserido novo card PCDF com subcards de Delegado, Agente Policial de Custódia e área pericial.

- `js/data/concursos-data.js`
  - Inserido objeto `CONCURSOS["pcdf"]` com campos compatíveis com o comparador atual.
  - Adicionados campos estruturados: `ultimo`, `abertos`, `pedidos_abertura`, `historico_recente` e `fontes`.

- `js/ui/header-estados.js`
  - Normalizador de concursos passou a preservar campos estruturados além dos campos textuais legados.

- `css/pages/concursos-conteudo-estatico.css`
  - Inseridas classes `.concursos-certames-grade`, `.concursos-subcard`, `.concursos-subcard--destaque`, `.concursos-subcard--pedido` e `.concursos-subcard-tag`.

Validação executada:

```bash
node --check js/data/concursos-data.js
node --check js/ui/header-estados.js
node --check js/pages/concursos-comparador.js
```

Resultado: sem erros de sintaxe JavaScript.
