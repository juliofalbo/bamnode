module.exports = function(app) {

    app.get('/bi', function(req, res) {
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

            res.render('indicadores/bi', {graficoStatusUsuario: usuariosAtivoInativo});
            return;
        });

        biDAO.listaGraficoTipoDecisaoCPE(function(erros, graficoTipoDecisaoCPE) {
            res.render('indicadores/bi', {graficoTipoDecisaoCPE: graficoTipoDecisaoCPE[0]});
            return;
        });
        
        connection.end();
    });
}