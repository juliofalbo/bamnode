module.exports = function(app) {

    app.get('/', function(req, res) {
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.lista(function(erros, resultados) {
            res.render('home/index', {livros: resultados});
        });
        
        connection.end();
    });
}