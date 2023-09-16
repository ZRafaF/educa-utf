<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Docker

## Criando um container da aplicação NEXT.js

### Dockerfile

Cheque a configuração do arquivo `Dockerfile`, a versão contida no repositório foi gerada apartir do projeto [nextjs-with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

**ATENÇÃO** As variáveis de ambiente `ENV` definidas na `Dockerfile`, principalmente `PB_URL` essa variável define a URL do backend

### Criando a imagem

A imagem oficial desse projeto pode ser encontrada em [https://hub.docker.com/r/zrafaf/educa_utf_nextjs](https://hub.docker.com/r/zrafaf/educa_utf_nextjs)

Rode `docker build -t educa_utf_nextjs .` na root do projeto.

### Dando *push* em uma imagem para o [docker hub](https://hub.docker.com/)

1. Faça login no docker usando `docker login`
2. Crie uma nova tag para sua imagem com `docker tag educa_utf_nextjs [username]/educa_utf_nextjs:[version]`
3. Faça o push com `docker push [username]/educa_utf_nextjs:[version]`

!!! info "Fazendo `push` de uma imagem como `latest`"
    1. `docker tag educa_utf_nextjs zrafaf/educa_utf_nextjs`
    2. `docker push zrafaf/educa_utf_nextjs`


> A qualquer momento você pode encontrar suas imagens através de `docker images`

## Iniciando os Containers



### Docker compose

Para iniciar os containers você pode utilizar o seguinte docker-compose

``` yaml
version: "3.7"

services:
    next:
        depends_on:
            - pocketbase
        image: zrafaf/educa_utf_nextjs:latest
        restart: unless-stopped
        ports:
            - 3000:3000
    pocketbase:
        image: zrafaf/educa_utf_pocketbase:latest
        restart: unless-stopped
        ports:
            - 8090:8090
        volumes:
            - ./pocketbase_data:/pb/pb_data
    watchtower:
        image: containrrr/watchtower
        restart: unless-stopped
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
        command: --interval 30
```

Você pode iniciar os containers com `docker compose up`.

!!! info
    Se algo der errado você pode tentar criar o volume manualmente com:
    ``` bash
    mkdir -p ~/pocketbase-data
    chown -R $USER:$USER ~/pocketbase-data
    ```
    Você também pode checar se o usuário tem permissão de leitura e escrita com 
    ``` bash
    chmod -R 755 ~/pocketbase-data
    ```

### Atualizando a imagem `educa_utf_nextjs`

Para atualizar para a ultima versão disponivel será necessário **apagar** a imagem defasada.

Para ver as imagens atuais execute `docker images`. Você deve ver algo parecido com:

``` bash
REPOSITORY                TAG       IMAGE ID       CREATED          SIZE
zrafaf/educa_utf_nextjs   latest    ffb4489371c3   15 minutes ago   818MB
```

Para deletar a imagem defasada **FORÇADO** você pode executar: `docker rmi [id] -f`.

> No caso da imagem a cima seria necessário executar `docker rmi ffb4489371c3 -f`