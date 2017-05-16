module.exports = function(app) {

    var passport = app.get('passport');

    app.get('/bi', isLoggedIn, function(req, res) {
        var connection = app.infra.connectionFactory();
        var biDAO = new app.infra.BiDAO(connection);
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.lista(function(erros, resultados) {

            var ativos = 0;
            var inativos = 0;

            for (var i = 0; i < resultados.length; i++) {
                var usuario = resultados[i];
                if(usuario.ativo == 1)
                {
                    ativos++;
                }
                else
                {
                    inativos++;
                }
            }
            
            var usuariosAtivoInativo = {ativos: ativos, inativos:inativos};

            res.render('indicadores/bi', {graficoStatusUsuario: usuariosAtivoInativo, user : req.user});
            return;
        });

        biDAO.listaGraficoTipoDecisaoCPE(function(erros, graficoTipoDecisaoCPE) {
            res.render('indicadores/bi', {graficoTipoDecisaoCPE: graficoTipoDecisaoCPE[0], user : req.user});
            return;
        });
        
        connection.end();
    });
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
	{
		return next();
	}
	else
	{
		res.redirect('/login');
	}
}