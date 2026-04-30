# Universo Segurança Pública — versão para GitHub Pages

Estrutura do projeto:

```text
/
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── image-fallback.js
    │   ├── app.js
    │   └── dados/
    │       ├── 01-parametros.js
    │       ├── 02-remuneracoes.js
    │       ├── 03-policia-penal.js
    │       ├── 04-acoes.js
    │       ├── 05-associacoes.js
    │       └── 06-concursos.js
    └── img/
        ├── barrafixa01.jpg
        ├── barrafixa02.jpg
        ├── botaacero.jpeg
        └── logoleao.jpeg
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas deste pacote para a raiz do repositório.
3. Coloque as imagens na pasta `assets/img/`.
4. Vá em **Settings > Pages**.
5. Em **Build and deployment**, selecione:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
6. Salve e aguarde o link do GitHub Pages aparecer.

## Observações

- O arquivo `index.html` contém a estrutura da página.
- O arquivo `assets/css/styles.css` contém todo o visual.
- Os arquivos em `assets/js/dados/` guardam os dados separados por assunto.
- O arquivo `assets/js/app.js` guarda as funções de interação, cálculo, navegação e renderização.
- O arquivo `assets/js/image-fallback.js` é carregado cedo para evitar erro quando uma imagem ainda não foi encontrada.
