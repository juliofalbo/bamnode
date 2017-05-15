BamNode
===================


Sistema de BI em tempo real escrito em **[NodeJS](https://nodejs.org/en/)**, utlizando o framework **[Express](http://expressjs.com/pt-br/)** e o framework front-end **[EJS](http://www.embeddedjs.com/)**.

----------


Documentação
-------------

#### <i class="icon-file"></i> **Criação do Banco de Dados**
> - O banco de dados utilizado é o **MySQL**.

Será necessário a criação de 2 bancos, um para **teste** e um para **produção**.
> **Script para criação do banco:**

*Banco de **Teste***
> create database bam_test;
> use bam_test;

*Banco de **Produção***
> create database bam;
> use bam;

CREATE TABLE usuarios (
id BIGINT NOT NULL AUTO_INCREMENT,
login VARCHAR(45) NOT NULL ,
senha VARCHAR(45) NOT NULL ,
nome VARCHAR(100) NOT NULL ,
ativo TINYINT NOT NULL DEFAULT 1 ,
email varchar(100) NOT NULL,
data_criacao datetime NOT NULL,
foto TEXT,
site varchar(100),
PRIMARY KEY (id)
);

insert into usuarios values(null, 'julio.silveira', '123', 'Júlio Silveira', 1, 'julio.silveira.rj@gmail.com', now(), null, 'http://juliosilveiradev.com');

**Obs: Criar a tabela nos 2 bancos.**

#### <i class="icon-pencil"></i> **Rodando Testes**

Para rodar o teste é simples, basta executar em seu prompt de comando o comando: 
> **node node_modules/mocha/bin/mocha**

Obs: A API usada para os testa são: **mocha** e **supertest**.
<br>
Obs²: É preciso estar na basta do projeto para rodar o teste com eficiência.

#### <i class="icon-pencil"></i> **API's Utilizadas**
 - body-parser
 - dateformat
 - ejs
 - express
 - express-load
 - express-validator
 - mysql
 - nodemon
 - socket.io
 - database-cleaner
 - mocha
 - supertest

> As APIs **database-cleaner**, **mocha** e **supertest** foram instaladas usando o parâmetro **-dev**.

![http://juliosilveiradev.com](http://uploaddeimagens.com.br/images/000/917/707/original/logo.png?1494816890)