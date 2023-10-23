<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Backend

Foi utilizado o Banco de dados / backend de código aberto [PocketBase](https://pocketbase.io/).

Um dos grandes problemas enfrentado para a criação de conteúdo por parte dos usuários é a possibilidade de injetar código malicioso nos arquivos de Markdown, por tanto algumas medidas tiveram de ser tomadas que acabaram tornando a aplicação menos customizável. 

## Setup
Para desenvolvimento recomendo realizar em uma **máquina LINUX** como seu sistema operacional. Algumas funções do backend assumem que estão rodando em um ambiente UNIX e pode apresentar funcionamento incorreto se executado em outro sistema operacional.

!!! tip
    Caso seu ambiente de desenvolvimento seja o windows dê uma olhada em [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/pt-br/windows/wsl/).

### Variáveis de ambiente

Para iniciar o backend é necessário criar as seguintes **Variáveis de Ambiente**:
```sh
UTF_AUTH_TOKEN=meutokendeautenticacao
```

#### Docker compose
O docker-compose da aplicação carrega os segredos a partir de um arquivo `.env`. Portanto a variável `UTF_AUTH_TOKEN` deve estar lá.

Exemplo de `.env`

```sh
UTF_AUTH_TOKEN=meutokendeautenticacao
```


### Executando o aplicativo

Você pode executar a seguinte linha na *root* do projeto:

```bash
UTF_AUTH_TOKEN=meutokendeautenticacao ./pocketbase serve
```

Ou carregar a chave de autenticação apartir de um arquivo `secrets.txt` com

```bash
source secrets.txt && ./pocketbase serve
```

## Como a autenticação é feita?
A autenticação de usuários da UTFPR é feito através de um HTTP POST request para o *endpoint* `api/educautf/utfpr-auth`.

O corpo do request deve seguir o formato:
``` json
{
    "username": "my-username",
    "password": "my-password",
}
```


### Riscos
A autenticação no sistema da UTFPR é feito diretamente no Backend sem acesso ao usuário através de um *hook*, para saber mais visite <https://github.com/zRafaF/educa-utf-db/tree/main/pb_hooks>. A única vulnerabilidade para ataque direto seria através do spoofing de senhas.



## Como a compressão de imagens é feita?


