# 📚 Biblioteca de Leituras

Um site pessoal para registrar, organizar e consultar minhas leituras, utilizando **Markdown como fonte de conteúdo**, **Astro como framework** e **GitHub Pages como plataforma de hospedagem**.

A proposta é transformar minhas anotações de livros em uma biblioteca pessoal organizada, navegável e pesquisável.

---

## ✨ Sobre o projeto

A **Biblioteca de Leituras** é um espaço para documentar livros que estou lendo ou que já li.

Cada livro possui uma página própria com informações gerais, apresentação pessoal, status de leitura e uma relação dos capítulos. Cada capítulo, por sua vez, possui uma página independente contendo meu resumo, principais ideias, observações e aprendizados.

A organização segue uma hierarquia simples:

```text
Livros
└── Autor
    └── Livro
        ├── Apresentação
        ├── Capítulo 1
        ├── Capítulo 2
        ├── Capítulo 3
        └── ...
```

O conteúdo é mantido em arquivos **Markdown/MDX**, enquanto o Astro é responsável por transformar esses arquivos em páginas estáticas.

---

## 🎯 Objetivos

* Organizar minhas leituras em um único lugar;
* Registrar resumos dos capítulos;
* Documentar aprendizados e observações pessoais;
* Acompanhar livros em andamento e concluídos;
* Facilitar a consulta posterior das anotações;
* Possibilitar pesquisas por conteúdo;
* Manter todo o conteúdo versionado pelo Git;
* Publicar a biblioteca gratuitamente através do GitHub Pages.

---

## 🗂️ Organização do conteúdo

Os livros são organizados por autor:

```text
src/
└── content/
    └── books/
        ├── index.md
        │
        ├── autor/
        │   ├── index.md
        │   │
        │   └── livro/
        │       ├── index.md
        │       ├── 01-capitulo.md
        │       ├── 02-capitulo.md
        │       └── 03-capitulo.md
        │
        └── outro-autor/
            ├── index.md
            │
            └── livro/
                ├── index.md
                ├── 01-capitulo.md
                └── 02-capitulo.md
```

### Livros

A página `/books/` representa a biblioteca como um todo.

Ela apresenta os autores e os livros disponíveis.

### Autor

Cada autor possui uma página que reúne os livros que li ou estou lendo.

Exemplo:

```text
Robert C. Martin

├── Clean Architecture
├── The Clean Coder
└── Clean Code
```

### Livro

Cada livro possui uma página principal contendo:

* Título;
* Autor;
* Descrição;
* Capa;
* Status de leitura;
* Data de início;
* Data de conclusão;
* Avaliação;
* Apresentação;
* Observações;
* Lista de capítulos.

Exemplo:

```text
Clean Architecture
Robert C. Martin

Status: Em andamento

Sobre o livro
────────────────────────

Minha apresentação e impressões
sobre a obra.

Capítulos
────────────────────────

01. Introdução
02. Design e Arquitetura
03. Princípios de Design
04. Componentes
```

### Capítulos

Cada capítulo possui um arquivo Markdown independente.

A página pode conter:

* Resumo;
* Principais conceitos;
* Ideias importantes;
* Citações;
* Observações pessoais;
* Aprendizados;
* Relações com outros conceitos;
* Dúvidas.

---

## 📝 Markdown como fonte de conteúdo

O conteúdo do projeto é escrito principalmente em Markdown.

Exemplo:

```md
---
title: "Arquitetura de Software"
chapter: 3
---

# Arquitetura de Software

## Resumo

Neste capítulo...

## Principais conceitos

- Conceito A
- Conceito B
- Conceito C

## O que aprendi

...
```

O Markdown permite que o conteúdo permaneça simples, legível e independente da implementação visual do site.

---

## ⚡ MDX

Além do Markdown tradicional, o projeto suporta **MDX**.

Isso permite utilizar componentes dentro dos documentos quando o Markdown sozinho não for suficiente.

Por exemplo:

```mdx
# Arquitetura

<Callout type="info">
  Este conceito é especialmente importante.
</Callout>
```

Isso possibilita criar recursos específicos para as anotações, como:

* Avisos;
* Destaques;
* Caixas de informação;
* Exemplos de código;
* Diagramas;
* Vídeos;
* Componentes interativos.

---

## 🏗️ Arquitetura

O projeto utiliza **Astro** para gerar o site.

```text
                    ┌──────────────────┐
                    │    Markdown/MDX  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Astro Content    │
                    │ Collections      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │      Astro       │
                    │ Static Generator │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼               ▼               ▼
         ┌────────┐     ┌─────────┐     ┌─────────┐
         │Sidebar │     │ Layout  │     │   TOC   │
         └────────┘     └─────────┘     └─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    HTML/CSS/JS   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Pagefind     │
                    │      Search      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  GitHub Pages    │
                    └──────────────────┘
```

---

## 📁 Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   ├── favicon.svg
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   ├── BookCard.astro
│   │   ├── AuthorCard.astro
│   │   ├── ChapterList.astro
│   │   ├── BookStatus.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── Search.astro
│   │   └── TableOfContents.astro
│   │
│   ├── content/
│   │   └── books/
│   │       ├── index.md
│   │       ├── autores/
│   │       └── ...
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── DocsLayout.astro
│   │   ├── BookLayout.astro
│   │   └── ChapterLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   └── books/
│   │       └── [...slug].astro
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── markdown.css
│   │   └── variables.css
│   │
│   └── content.config.ts
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## 🧭 Navegação

A navegação do site será construída automaticamente a partir da estrutura dos conteúdos.

Exemplo:

```text
📚 Livros

▾ Robert C. Martin
    ▾ Clean Architecture
        Introdução
        Design e Arquitetura
        Princípios de Design
        Componentes

▸ Martin Fowler
    Refactoring
```

A estrutura física dos arquivos determina a hierarquia da biblioteca.

Isso significa que adicionar um novo livro não exige alterar manualmente o código do sidebar.

---

## 🔎 Busca

O projeto utiliza **Pagefind** para disponibilizar uma busca estática.

A busca será capaz de encontrar conteúdo dentro das páginas e capítulos.

Exemplo:

```text
┌─────────────────────────────────────────┐
│ 🔎 Pesquisar livros, capítulos...       │
└─────────────────────────────────────────┘

Resultados:

Clean Architecture
  "...princípios de arquitetura..."

Refactoring
  "...refatoração e code smells..."
```

Como a busca é gerada durante o build, não é necessário manter um servidor ou banco de dados para realizar as pesquisas.

---

## 📖 Status de leitura

Cada livro poderá possuir um status:

```text
planned
reading
completed
paused
abandoned
```

Exemplo:

```yaml
---
title: "Clean Architecture"
status: "reading"
---
```

Na interface, esses valores poderão ser apresentados de maneira amigável:

```text
🟡 Em andamento
🟢 Concluído
🔵 Planejado
🟠 Pausado
🔴 Abandonado
```

---

## 🏷️ Metadados

Os documentos podem utilizar Frontmatter para armazenar informações estruturadas.

Exemplo:

```yaml
---
title: "Clean Architecture"
author: "Robert C. Martin"
description: "Uma visão geral do livro."
status: "reading"
startedAt: 2026-09-01
finishedAt:
rating:
---
```

Para capítulos:

```yaml
---
title: "Princípios de Design"
chapter: 3
---
```

Esses metadados permitem que o Astro gere automaticamente diferentes partes da interface.

---

## 🌐 Publicação

O site será hospedado no **GitHub Pages**.

O processo de publicação será automatizado através do **GitHub Actions**.

```text
Alteração no Markdown
        │
        ▼
     git push
        │
        ▼
 GitHub Actions
        │
        ├── Instala dependências
        │
        ├── Executa o build
        │
        ├── Gera páginas estáticas
        │
        ├── Cria índice do Pagefind
        │
        └── Publica o dist/
                │
                ▼
          GitHub Pages
```

Dessa forma, o fluxo de publicação é simples:

```bash
git add .
git commit -m "docs: adiciona resumo do capítulo"
git push
```

Após o push, o GitHub Actions realiza o restante automaticamente.

---

## 🛠️ Tecnologias

| Tecnologia                    | Função                      |
| ----------------------------- | --------------------------- |
| [Astro](https://astro.build/) | Framework e geração do site |
| TypeScript                    | Tipagem                     |
| Markdown                      | Conteúdo                    |
| MDX                           | Markdown com componentes    |
| Pagefind                      | Busca                       |
| CSS                           | Estilização                 |
| Git                           | Versionamento               |
| GitHub Actions                | CI/CD                       |
| GitHub Pages                  | Hospedagem                  |

---

## 🚀 Desenvolvimento

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O site estará disponível localmente.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

---

## 📌 Princípios do projeto

### Conteúdo primeiro

O conteúdo deve continuar sendo útil mesmo sem a interface do site.

### Git como histórico

Todas as alterações nas anotações são versionadas pelo Git.

### Estrutura simples

A organização dos arquivos deve refletir a organização conceitual da biblioteca.

```text
Autor → Livro → Capítulo
```

### Automação

Sempre que possível, informações derivadas dos arquivos devem ser geradas automaticamente.

### Independência

O conteúdo não deve depender dos componentes visuais do site.

### Evolução gradual

A arquitetura deve permitir adicionar novos recursos sem exigir uma reorganização completa do conteúdo.

---

## 🔮 Possíveis funcionalidades futuras

* [ ] Dark mode;
* [ ] Busca avançada;
* [ ] Filtros por status de leitura;
* [ ] Filtros por autor;
* [ ] Tags;
* [ ] Avaliação dos livros;
* [ ] Progresso de leitura;
* [ ] Estatísticas da biblioteca;
* [ ] Página de livros atualmente em leitura;
* [ ] Página de livros concluídos;
* [ ] Sistema de citações;
* [ ] Notas pessoais;
* [ ] Relacionamento entre livros;
* [ ] Recomendações baseadas em temas;
* [ ] RSS;
* [ ] Sitemap;
* [ ] Open Graph;
* [ ] Suporte a Mermaid;
* [ ] Suporte a fórmulas matemáticas com KaTeX;
* [ ] Componentes personalizados para os resumos.

---

## 📚 Estrutura conceitual

A ideia central do projeto pode ser resumida em:

```text
                    📚 Biblioteca
                         │
             ┌───────────┴───────────┐
             │                       │
          👤 Autor                 👤 Autor
             │                       │
       ┌─────┴─────┐               │
       │           │               │
      📖 Livro    📖 Livro         📖 Livro
       │
   ┌───┼────┬────┐
   │   │    │    │
  📄  📄   📄   📄
 Cap. Cap. Cap. Cap.
```

O objetivo não é apenas criar um site sobre livros, mas construir uma **biblioteca pessoal de conhecimento**, onde cada leitura possa ser registrada, revisitada e conectada às demais.

---

## 📄 Licença

Este projeto contém anotações e conteúdos produzidos para uso pessoal.

A licença e as condições de utilização do conteúdo serão definidas futuramente.

