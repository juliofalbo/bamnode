BamNode
===================

 **Obs: Código antigo e necessitando urgente de atualização e organização.**

Sistema de BI em tempo real escrito em **[NodeJS](https://nodejs.org/en/)**, utlizando o framework **[Express](http://expressjs.com/pt-br/)** e o framework front-end **[EJS](http://www.embeddedjs.com/)**.

----------


Documentação
-------------

#### <i class="icon-file"></i> **Criação do Banco de Dados**
> O banco de dados utilizado é o **MySQL**.

Será necessário a criação de 2 bancos, um para **teste** e um para **produção**.

**Script para criação do banco:**

*Banco de **Teste***
> create database bam_test; <br>
> use bam_test;

*Banco de **Produção***
> create database bam; <br>
> use bam;

CREATE TABLE users (<br>
id BIGINT NOT NULL AUTO_INCREMENT,<br>
username VARCHAR(20) NOT NULL ,<br>
password VARCHAR(60) NOT NULL ,<br>
nome VARCHAR(100) NOT NULL ,<br>
ativo TINYINT NOT NULL DEFAULT 1 ,<br>
email varchar(100) NOT NULL,<br>
data_criacao datetime NOT NULL,<br>
foto TEXT,<br>
site varchar(100),<br>
PRIMARY KEY (id)<br>
);

**Obs: Criar a tabela nos 2 bancos.**

#### <i class="icon-pencil"></i> **Rodando Testes**

Para rodar o teste é simples, basta executar em seu prompt de comando o comando: 
> **node node_modules/mocha/bin/mocha**

Obs: A API usada para os testa são: **mocha** e **supertest**.
<br>
Obs²: É preciso estar na pasta do projeto para rodar o teste com eficiência.

#### <i class="icon-pencil"></i> **Autenticação**

> passport.js

Atualmente o sistema utiliza o módulo passport para autenticações.
<br>
As estratégias adotas são:

- Local
- LinkedIn

#### <i class="icon-pencil"></i> **API's Utilizadas**
 - npm install --save **body-parser**
 - npm install --save **dateformat**
 - npm install --save **ejs**
 - npm install --save **express**
 - npm install --save **express-load**
 - npm install --save **express-validator**
 - npm install --save **express-session**
 - npm install --save **mysql**
 - npm install --save **nodemon**
 - npm install --save **socket.io**
 - npm install --save **database-cleaner** -dev
 - npm install --save **mocha** -dev
 - npm install --save **supertest** -dev
 - npm install --save **cookie-parser**
 - npm install --save **connect-flash**
 - npm install --save **bcrypt-nodejs**
 - npm install --save **morgan**
 - npm install --save **passport**
 - npm install --save **passport-linkedin-oauth2**
 - npm install --save **passport-local**
 

> As APIs **database-cleaner**, **mocha** e **supertest** foram instaladas usando o parâmetro **-dev**.

![http://juliosilveiradev.com](http://uploaddeimagens.com.br/images/000/917/707/original/logo.png?1494816890)
