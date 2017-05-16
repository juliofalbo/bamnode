/**
 * Created by barrett on 8/28/14.
 */

var mysql = require('mysql');
var createDBConnection = require('../app/infra/connectionFactory')();
var connection = createDBConnection();

//connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE users ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `nome` VARCHAR(100) NOT NULL, \
    `ativo` TINYINT NOT NULL DEFAULT 1, \
    `email` VARCHAR(100) NOT NULL, \
    `data_criacao` datetime NOT NULL, \
    `site` VARCHAR(100), \
    `foto` TEXT, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Sucesso: Tabela de Login Criada!')

connection.end();
