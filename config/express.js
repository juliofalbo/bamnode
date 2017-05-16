var express = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');

var passport = require('passport');
var flash = require('connect-flash');
require('../config/passport')(passport); // pass passport for configuration

module.exports = function() {
    var app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.set('passport', passport);

    //Middlewares
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use( function( req, res, next ) {
        if ( req.query._method == 'DELETE' ) {
            req.method = 'DELETE';
            req.url = req.path;
        }
        else if ( req.query._method == 'PUT' ) {
            req.method = 'PUT';
            req.url = req.path;
        }
        next(); 
    });

    // required for passport
    app.use(session({
        secret: 'vidyapathaisalwaysrunning',
        resave: true,
        saveUninitialized: true
    } )); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    app.use(function(req, res, next){
        res.status(404).render('erros/404');
    });

    app.use(function(error, req, res, next){
        if(process.env.NODE_ENV == 'production')
        {
            res.status(500).render('erros/500');
            return;
        }
        else
        {
            next(error);
        }
    });

    return app;
}
