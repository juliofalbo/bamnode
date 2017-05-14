var app = require('./config/express')();
//Necessário pois a função do socket.io espera o http nativo do Node
//Então é necessário dar o require no http nativo e passar o app informando que continuamos usando o express
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dateFormat = require('dateformat');

//Tornando a variavel 'io' publica pra todos os arquivos que usem o app
app.set('io', io);
app.set('dateFormat', dateFormat);

var porta = process.env.PORT || 3000;

var server = http.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Servidor no ar em http://%s:%s', host, port);

});