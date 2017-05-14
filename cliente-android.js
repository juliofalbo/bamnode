var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/usuarios',
    headers: {
        'Accept': 'application/json'
        //'Accept': 'text/html'
    }
};

http.get(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo:' + body);
    });
});
