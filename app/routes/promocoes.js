module.exports = function(app)
{
    app.get('/promocoes/form', function(req, res){
        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);  

        usuariosDAO.lista(function(erros, resultados) {
            res.render('promocoes/form', {lista: resultados});
        });
        
        connection.end();
    });

    app.post('/promocoes', function(req, res, next){
        var promocao = req.body;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);  

        usuariosDAO.getById(promocao.livro.id, function(erros, resultado){

            if(erros != null)
            {
                res.redirect("/promocoes/form");
            }
            else
            {
                if (typeof resultado !== 'undefined' && resultado.length > 0)
                {
                    promocao.livro = resultado[0];
                    app.get('io').emit('novaPromocao', promocao);
                    res.redirect("/promocoes/form");
                }
                else
                {
                    res.redirect("/promocoes/form");
                }
            }
        });

        connection.end();

    });
}