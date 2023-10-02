<!--
 Copyright (c) 2023 Rafael Farias
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Métricas

## Umami
Para as métricas do website está sendo utilizado [Umami](https://umami.is/) através de uma *build* customizada.

## Customização da *build*
Para adequar as variaveis do container foi feito um *fork* do repositório original, esse *fork* pode ser acessado em <https://github.com/zRafaF/educa-utf-umami>, nele adicionei dois *workflows* um para [checar nomenclatura de *releases*](https://github.com/zRafaF/educa-utf-umami/blob/master/.github/workflows/pr-title-check.yml) e outro para realizar a [*build* e publicação automática do *container*](https://github.com/zRafaF/educa-utf-umami/blob/master/.github/workflows/publish-container.yml), observe a variável `BASE_PATH`.

O repositório no DockerHub pode ser acessado em <https://hub.docker.com/r/zrafaf/educa_utf_umami>

## Dashboard
A aplicação está acessível através do proxy reverso em <https://educautf.td.utfpr.edu.br/umami>.

Você também pode visualizar os dados públicos em <https://educautf.td.utfpr.edu.br/umami/share/NmknLrXmtHfUfTwY/EducaUTF>