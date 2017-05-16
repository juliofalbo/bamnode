// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var createDBConnection = require('../app/infra/connectionFactory')();
var connection = createDBConnection();

var userDAO = require('../app/infra/UsuariosDAO')();
var usuariosDAO = new userDAO(connection);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            var corpo = req.body;
            var nome = corpo.nome;
            var email = corpo.email;
            var site = corpo.site;
            var ativo = corpo.ativo;
            if(ativo == null)
            {
                ativo = 0;
            }

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                {
                    return done(err);
                }
                if (rows.length) 
                {
                    return done(null, false, req.flash('signupMessageError', 'Usuário já cadastrado no sistema.'));
                } 
                else 
                {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        nome: nome,
                        ativo: ativo,
                        email: email,
                        site: site
                    };

                    var insertQuery = "INSERT INTO users ( username, password, nome, ativo, email, data_criacao, site, foto ) values (?, ?, ?, ?, ?, now(), ?, null)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.nome, newUserMysql.ativo, newUserMysql.email, newUserMysql.site ],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, false, req.flash('signupMessage', 'Solicitação enviada com sucesso!'));
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE ativo = 1 and username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Usuário/Senha inválidos.'));
                }

                if (!bcrypt.compareSync(password, rows[0].password))
                {
                    return done(null, false, req.flash('loginMessage', 'Senha incorreta.'));
                }

                return done(null, rows[0]);
            });
        })
    );


    passport.use(new LinkedInStrategy({
        clientID: '7872fcaj1n0asj',
        clientSecret: '4Trg3cODpjoIpgR1',
        callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
        }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            var usuario = 
            {
                username: profile._json.firstName + '.linkedin',
                nome: profile._json.formattedName,
                email: profile._json.emailAddress,
                site: profile._json.publicProfileUrl,
                foto: profile.photos[0].value
            };

            usuariosDAO.recuperaPeloUsername(usuario.username, function(erros, user) {
                if(erros)
                {
                    console.log(erros);
                }
                else if(!user)
                {
                    usuariosDAO.salvaUsuarioLinkedIn(usuario, function(erros, user) {
                        if(erros)
                        {
                            console.log(erros);
                        }
                        return done(null, user);
                    });
                }
                else
                {
                    return done(null, user);
                }
            });
            
            
        });
    }));

};
