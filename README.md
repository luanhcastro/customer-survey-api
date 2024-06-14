# Customer Survey API

### Funcionalidades

* Adicionar nichos de clientes
* Criar pesquisas personalizadas por nicho
* Adicionar respostas
* Editar respostas
* Listar respostas por nicho

### Como executar a aplicação

Para iniciar o projeto é necessário ter o docker e o docker-compose instalados, veja em: [Docker install](https://docs.docker.com/compose/install/)

``` $ docker-compose up build```

A aplicação executará na porta 3000

#### Documentação: 
Acesse /api-docs e veja toda documentação interativa com o swagger.

#### Testes

`$ npm install`

`$ npm run test`

### Estrutura

#### Banco de dados:

O banco de dados é dividido em 3 tabelas

**Niche**: representa um nicho de clientes, por exemplo, Geeks, Minimalistas, atletas.
```sql
CREATE TABLE "Niche" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Niche_pkey" PRIMARY KEY ("id")
);
```


**NicheQuestion**: É cada pergunta personalizada que pode fazer parte da pesquisa de um ou mais nichos.
```sql
CREATE TABLE "NicheQuestion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "niches" TEXT[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "NicheQuestion_pkey" PRIMARY KEY ("id")
);
```
**Survey**: É cada resposta, aonde a quantidade de estrelas, o email e
nicho são obrigatórios, e em nicheAnswers temos as perguntas adicionais personalizadas.
```sql
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "nicheId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "nicheAnswers" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);
```

### Como funciona:

O client que consumir essa API deve listar os nichos com a rota

`get /niches`

E com base nos nichos retornados, escolherá um deles, que será utilizado para a busca de perguntas personalizadas em: 

`get /niche-questions/:nicheId`

Com o resultado dessa rota, será possível montar o objeto com chave e valor das `nicheAnswers` de cada `Survey`, e então cadastrar uma nova resposta em:

`post /surveys`.

###

### Vantagens:

Qualquer nova pergunta pode ser facilmente adicionada e compatível com diferentes nichos, dessa forma fica dinâmica e flexível a manipulação das pesquisas de satisfação.