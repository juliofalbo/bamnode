var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/usuarios',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo' + body);
    });
});

var usuario = {
    login: 'juliosilveira',
    senha: '123',
    email: 'julio.silveira.rj@gmail.com',
    nome: 'Júlio Silveira',
    site: 'http://juliosilveiradev.com'
};

client.end(JSON.stringify(usuario));
