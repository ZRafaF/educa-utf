<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Docker

## Criando um container da aplicação NEXT.js

### Dockerfile

Cheque a configuração do arquivo `Dockerfile`, a versão contida no repositório foi gerada apartir do projeto [nextjs-with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

**ATENÇÃO** As variáveis de ambiente `ENV` definidas na `Dockerfile`, principalmente `PB_URL` essa variável defini a URL do backend

### Criando a imagem

A imagem oficial desse projeto pode ser encontrada em [https://hub.docker.com/r/zrafaf/educa_utf_nextjs](https://hub.docker.com/r/zrafaf/educa_utf_nextjs)

Rode `docker build -t educa_utf_nextjs .` na root do projeto.

### Dando *push* em uma imagem para o [docker hub](https://hub.docker.com/)

1. Faça login no docker usando `docker login`
2. Crie uma nova tag para sua imagem com `docker tag educa_utf_nextjs [username]/educa_utf_nextjs:[version]`
3. Faça o push com `docker push [username]/educa_utf_nextjs:[version]`

> A qualquer momento você pode encontrar suas imagens através de `docker images`

## Iniciando os Containers

Para iniciar os containers você pode utilizar o seguinte docker-compose

``` yml
version: "3.7"

services:
    next:
        environment:
            - PB_URL=http://127.0.0.1:8090
        image: zrafaf/educa_utf_nextjs:latest
        restart: unless-stopped
        ports:
            - 3000:3000

    pocketbase:
        image: augustodelg/pocketbase:latest
        restart: unless-stopped
        ports:
            - 8090:8090
        volumes:
            - pocketbase-volume:/pb_data
            - pocketbase-volume:/pb_hooks
volumes:
    pocketbase-volume:

```