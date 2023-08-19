<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Desenvolvimento

Esta coleção é focada principalmente para os interessados em modificar a aplicação.

Serão apresentandas

Para informações sobre o setup do ambiente de desenvolvimento visite [setup](setup.md).

## Arquitetura
A aplicação principal foi escrita majoritariamente na linguagem de programação `.tsx` um superconjunto de [TypeScript](https://www.typescriptlang.org/).

Os conteúdos são escritos em uma especie de Markdown customizado, utilizando aspectos da linguagem `.mdx`.

O *front-end* do Educa UTF foi desenvolvido a partir da biblioteca [ReactJS](https://react.dev/). Para mais informações acesse a página [front-end](front-end.md)

## Github
O repositório [educa-utf](https://github.com/ZRafaF/educa-utf) no Github é o responsável em criar novas **Releases** automaticamente da imagem docker.

### Continuous Integration Docker-hub
A integração continua com o Docker-hub é realizada no momento que ocorre uma ação de `push` na *branch* `release`.

!!! attention
    A `tag` da release é o **titulo do *Pull Request***.
    Por isso preste atenção no momento que fizer um PR de outra *branch* para a *branch* `release`.

