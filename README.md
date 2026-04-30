# Universo Segurança Pública

Site institucional estático para apresentação de informações, cursos, direitos e conteúdos relacionados à segurança pública.

Esta versão foi organizada para ser publicada no GitHub e no GitHub Pages sem precisar de build, Node.js ou backend.

## Estrutura do projeto

```txt
.
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   └── dados.js
│   └── img/
│       └── imagens do site
├── .gitignore
├── .nojekyll
└── README.md
```

## Como rodar localmente

Por ser um site estático, basta abrir o arquivo `index.html` no navegador.

Para testar com um servidor local simples, use uma das opções abaixo:

### Python

```bash
python -m http.server 8000
```

Depois acesse:

```txt
http://localhost:8000
```

### VS Code

Instale a extensão **Live Server**, clique com o botão direito no `index.html` e escolha **Open with Live Server**.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste projeto para a raiz do repositório.
3. No GitHub, entre em **Settings > Pages**.
4. Em **Build and deployment**, escolha:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/root`
5. Salve.
6. Aguarde o GitHub gerar o link público do site.

## Comandos para subir pelo terminal

Dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Versão inicial do site Universo Segurança Pública"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Troque `SEU-USUARIO` e `NOME-DO-REPOSITORIO` pelos dados reais do seu GitHub.

## Observações importantes

- O arquivo `index.html` precisa ficar na raiz do repositório para o GitHub Pages funcionar com facilidade.
- A pasta `assets/` também precisa ser enviada junto, pois contém CSS, JavaScript e imagens.
- O site não depende de banco de dados, servidor ou instalação de pacotes.
- As informações do conteúdo devem ser revisadas em fontes oficiais antes de uso funcional, jurídico ou financeiro.

## Licença

Nenhuma licença pública foi definida ainda. Se este projeto for aberto para uso por terceiros, adicione uma licença adequada ao repositório.
