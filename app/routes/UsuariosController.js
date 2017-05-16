module.exports = function(app) {
    
    var passport = app.get('passport');

    app.get('/usuarios', isLoggedIn, function(req, res, next) {

        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }

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
                            mensagemSucesso:mensagemSucesso,
                            user : user
                        });
                },
                json: function(){
                    res.json(resultados);
                }
            });

        });

        connection.end();
    });

    app.get("/usuarios/form", isLoggedIn, function(req, res) {
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }
        
        res.render('usuarios/form', {validationErrors:{}, usuario: {}, user : user});
    });

    app.get('/signup', function(req, res) {
		res.render('home/signup.ejs', { messageError: req.flash('signupMessageError'), message: req.flash('signupMessage'), user : req.user });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/signup',
		successFlash : true,
		failureRedirect : '/signup',
		failureFlash : true
	}));

    app.get('/signupInterno', isLoggedIn, function(req, res) {
        
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }

        var messageError = req.flash('signupMessageError');
        console.log(messageError);

        var message = req.flash('signupMessage');
        console.log(message);

        if(messageError != null && messageError.length > 0)
        {
            var validationErrors = [{msg: messageError}];
            res.status(400).render('usuarios/form',{validationErrors:validationErrors, usuario:{}, user : user});
        }
        else if(message != null && message.length > 0)
        {
            var mensagemSucesso = "Usuário cadastrado com Sucesso!";
            res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
        }
	});

	app.post('/signupInterno', isLoggedIn, passport.authenticate('local-signup', {
		successRedirect : '/signupInterno',
		successFlash : true,
		failureRedirect : '/signupInterno',
		failureFlash : true
	}));

    //Não está sendo usado, pois todas os logins são criados a partir da rota /signup
    app.post("/usuarios", isLoggedIn, function(req, res) {
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }
       
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
                    res.status(400).render('usuarios/form',{validationErrors:erros,usuario: usuario, user : user});
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
                res.status(400).render('usuarios/form',{validationErrors:errosArray, usuario: usuario, user : user});
                return;
            }
            else
            {
                var mensagemSucesso = "Usuário "+usuario.nome+" cadastrado com Sucesso!";
                res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
            }
        });
    });

   app.delete("/usuarios/:id", isLoggedIn, function(req, res) {
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }

        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.deleta(id, function(erros, resultados) {
            if(erros)
            {
                console.log(erros);
                var errosArray= [{msg:"Ocorreu um erro interno ao tentar excluir o Usuário! Nossa equipe já foi informada do erro. Pedimos desculpas pelo transtorno!"}];
                res.status(400).render('/usuarios',{mensagemErro:mensagemErro, mensagemSucesso:'', user : user});
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

    app.get("/usuarios/:id", isLoggedIn, function(req, res) {
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }
        
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var usuariosDAO = new app.infra.UsuariosDAO(connection);

        usuariosDAO.recuperaPeloId(id, function(erros, usuarios) {
            var usuario = usuarios[0];
            res.render('usuarios/form', {validationErrors:{}, usuario: usuario, user : user});
        });

        connection.end();
    });

    app.put("/usuarios/:id", isLoggedIn, function(req, res) {
        var user = req.user;
        if(Array.isArray(user))
        {
            user = user[0];
        }

        var id = req.params.id;

        var usuario = req.body;
        usuario.id = id;

        req.assert('nome', 'O campo Nome é obrigatório!').notEmpty();
        req.assert('email', 'O campo Email é obrigatório!').notEmpty();

        var erros = req.validationErrors();
        if(erros)
        {
            res.format({
                html: function(){
                    res.status(400).render('usuarios/form',{validationErrors:erros,usuario: usuario, user : user});
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
                res.status(400).render('usuarios/form',{validationErrors:errosArray, usuario: usuario, user : user});
                return;
            }
            else
            {
                var mensagemSucesso = "Usuário "+usuario.nome+" editado com Sucesso!";

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
                    app.get('io').emit('atualizarGraficoUsuario', usuariosAtivoInativo);
                    res.redirect('/usuarios?mensagemSucesso=' + mensagemSucesso);
                    return;
                });
            }
        });
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