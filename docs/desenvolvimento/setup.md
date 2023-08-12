# Configuração

Esta página definirá o passo a passo para compilar este projeto.


## Clonar o repositório

```bash
git clone https://github.com/ZRafaF/educa-utf

cd bolinho
```


## Instalar dependências

```bash
npm run install
```

---

## Documentação

> Este projeto foi desenvolvido usando a versão Python `Python 3.10.x`.
> A etapa a seguir é necessária apenas para aqueles que desejam **editar a documentação**.

Para compilar a documentação você precisará de [Python](https://www.python.org/), **PIP** e **GIT**.


### Criando um ambiente virtual

> A etapa a seguir não é obrigatória, mas é **recomendada**. Se você quiser saber um pouco mais sobre ambientes virtuais de python visite [https://docs.python.org/3/library/venv.html](https://docs.python.org/3/library/venv.html)

```bash
python -m pip install --user virtualenv

python -m venv venv
```

Um diretório `venv` deve ser criado na pasta raiz do projeto.

Como ativar:

!!! admonition-windows "Ativação no **Windows**"

    ``` bash title=""
    venv/Scripts/activate
    ```

or

!!! admonition-linux "Ativação no **Linux**"

    ``` bash title=""
    source venv/bin/activate
    ```

---

Com isso o ambiente virtual estará ativado e qualquer biblioteca instalada será aplicada apenas à esse ambiente.

### Instalando dependências

```bash
pip install -r docs/requirements.txt
```

Esse comando irá instalar todas as dependências contidas no arquivo `requirements.txt`

### Build

Para compilar a documentação temos duas opções:

-   **Serve**:

    Esta opção é usada para depuração, ela abrirá a página estática em uma das portas localhost.

    ```bash
    mkdocs serve
    ```

-   **Build**:
    Esta opção cria uma compilação da documentação e a salva no diretório `/site/`.
    ```bash
    mkdocs build
    ```

!!! note
    Esteja ciente da **Environment Variable** `ENABLE_PDF_EXPORT`, ela só irá gerar o PDF se essa variável estiver definida como `1`.

    Você pode alterar o arquivo `mkdocs.yml` e remover esta linha se preferir.


## Integração Pocketbase

Para gerar os Bindings do pocket base está sendo usado a biblioteca [pocketbase-typegen](https://github.com/patmood/pocketbase-typegen). Para gerar os tipos execute:

`yarn typegen`

O *output* está localizado em `/src/types/pocketbase-types.ts`.