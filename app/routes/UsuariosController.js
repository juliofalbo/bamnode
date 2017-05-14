module.exports = function(app) {
    app.get('/usuarios', function(req, res, next) {

        var mensagemSucesso = req.query.mensagemSucesso;

        var mensagemErro = req.query.mensagemErro;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.lista(function(erros, resultados) {
            if(erros)
            {
                return next(erros);
            }

            res.format({
                html: function(){
                    res.render('usuarios/lista', {
                            lista: resultados, 
                            mensagemErro:mensagemErro, 
                            mensagemSucesso:mensagemSucesso
                        });
                },
                json: function(){
                    res.json(resultados);
                }
            });

        });

        connection.end();
    });

    app.get("/usuarios/form",function(req, res) {
        res.render('usuarios/form', {validationErrors:{}, usuario: {}});
    });

    app.post("/usuarios",function(req, res) {
        var usuario = req.body;

        req.assert('login', 'O campo Login é obrigatório!').notEmpty();
        req.assert('senha', 'O campo Senha é obrigatório!').notEmpty();
        req.assert('nome', 'O campo Nome é obrigatório!').notEmpty();
        req.assert('email', 'O campo Email é obrigatório!').notEmpty();

        var erros = req.validationErrors();
        if(erros)
        {
            res.format({
                html: function(){
                    res.status(400).render('usuarios/form',{validationErrors:erros,usuario: usuario});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.salva(usuario, function(erros, resultados) {
            if(erros)
            {
                console.log(erros);
                var errosArray= [{msg:"Ocorreu um erro interno ao tentar cadastrar o Usuário! Nossa equipe já foi informada do erro. Pedimos desculpas pelo transtorno!"}];
                res.status(400).render('usuarios/form',{validationErrors:errosArray, usuario: usuario});
                return;
            }
            else
            {
                var mensagemSucesso = "Usuário "+usuario.nome+" cadastrado com Sucesso!";
                res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
            }
        });
    });

   app.delete("/usuarios/:id",function(req, res) {
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.deleta(id, function(erros, resultados) {
            if(erros)
            {
                console.log(erros);
                var errosArray= [{msg:"Ocorreu um erro interno ao tentar excluir o Usuário! Nossa equipe já foi informada do erro. Pedimos desculpas pelo transtorno!"}];
                res.status(400).render('/usuarios',{mensagemErro:mensagemErro, mensagemSucesso:''});
                return;
            }
            else
            {
                var mensagemSucesso = "Usuário deletado com Sucesso!";
                res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
            }
        });

        connection.end();
    });

    app.get("/usuarios/:id", function(req, res) {
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.recuperaPeloId(id, function(erros, usuarios) {
            var usuario = usuarios[0];
            res.render('usuarios/form', {validationErrors:{}, usuario: usuario});
        });

        connection.end();
    });

    app.put("/usuarios/:id", function(req, res) {
        var id = req.params.id;

        var usuario = req.body;
        usuario.id = id;

        req.assert('login', 'O campo Login é obrigatório!').notEmpty();
        req.assert('nome', 'O campo Nome é obrigatório!').notEmpty();
        req.assert('email', 'O campo Email é obrigatório!').notEmpty();

        var erros = req.validationErrors();
        if(erros)
        {
            res.format({
                html: function(){
                    res.status(400).render('usuarios/form',{validationErrors:erros,usuario: usuario});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.edita(usuario, function(erros, resultados) {
            if(erros)
            {
                console.log(erros);
                var errosArray= [{msg:"Ocorreu um erro interno ao tentar cadastrar o Usuário! Nossa equipe já foi informada do erro. Pedimos desculpas pelo transtorno!"}];
                res.status(400).render('usuarios/form',{validationErrors:errosArray, usuario: usuario});
                return;
            }
            else
            {
                var mensagemSucesso = "Usuário "+usuario.nome+" editado com Sucesso!";
                res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
            }
        });
    });
}
