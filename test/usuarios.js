//Utilizando o módulo Supertest + Mocha

//O express é chamado para que o servidor do software não precise estar no ar, pois a lib supertest consegue simular as requisições http
var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

process.env.NODE_ENV = 'test';

describe('#UsuariosController', function(){

    //Usando a lib database-cleaner
    beforeEach(function(done){
        var databaseCleaner = new DatabaseCleaner('mysql');
        databaseCleaner.clean(express.infra.connectionFactory(), function() {
            done();
        });
  });

    //Sem usar a lib database-cleaner
    /*
    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from produtos", function(ex, result){
            if(!ex)
            {
                done();
            }
        });
    });
    */

    //a funções done é chamada pois como o Node trabalha de forma assíncrona, é preciso informar para o servidor de teste que o mesmo deve esperar o callback para exibir o resultado
    it('#listagem json', function(done){
        request.get('/usuarios')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/) //barra em javascript é pra criação de expressão regular
            .expect(200, done); //quando não é passado nenhum argumento e somente o resultado, o super test entende que é para ele verificar o statusCode do http.
            //como esse é o nosso último teste, é necessário passar a função done para que o supertest entenda que é a hora de finalizar os testes
    });

    it('#cadastro de usuario com erro', function(done){
        request.post('/usuarios')
        .send({
            login: ''
        })
        .expect(400, done)
    });

    it('#cadastro de usuario sem erro', function(done){
        request.post('/usuarios')
        .send({
            login: 'juliosilveira',
            senha: '123',
            email: 'julio.silveira.rj@gmail.com',
            nome: 'Júlio Silveira',
            site: 'http://juliosilveiradev.com'
        })
        .expect(302, done)
    });
});


//Utilizando apenas o módulo Mocha
/*
var http = require('http');
var assert = require('assert');

describe('#ProdutosController', function(){
    it('#listagem json', function(done){
        var configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/produtos',
            headers: {
                'Accept': 'application/json'
            }
        };

        http.get(configuracoes, function(res){
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
            done();
        }); 
    })
})
*/