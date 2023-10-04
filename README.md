## Links
* [Educa UTF](https://educautf.td.utfpr.edu.br/)
* [Umami](https://educautf.td.utfpr.edu.br/umami)
* [PB](https://educautf.td.utfpr.edu.br/db/_)
* [Documentação](https://zrafaf.github.io/educa-utf/)
* [PDF](https://zrafaf.github.io/educa-utf/pdf/document.pdf)

## Dependências

-   [Markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Using Docker

Repositório no Docker-hub[https://hub.docker.com/r/zrafaf/educa_utf_nextjs](https://hub.docker.com/r/zrafaf/educa_utf_nextjs)

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t educa_utf_nextjs .`.
3. Tag you image `docker tag educa_utf_nextjs zrafaf/educa_utf_nextjs`
4. Publish your image `docker push zrafaf/educa_utf_nextjs`
5. Run your container: `docker run -p 3000:3000 educa_utf_nextjs`.

You can view your images created with `docker images`.