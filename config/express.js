var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //Middlewares
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
