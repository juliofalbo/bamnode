module.exports = function(app) {

    var passport = app.get('passport');

	app.get('/', isLoggedIn, function(req, res) {
		var user = req.user;
		if(Array.isArray(user))
		{
			user = user[0];
		}
		
		res.render('home/index.ejs', {
			user : user
		});
	});

	app.get('/login', function(req, res) {
		res.render('home/login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', 
            failureRedirect : '/login', 
            failureFlash : true
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	app.get('/auth/linkedin',
		passport.authenticate('linkedin', { state: 'SOME STATE'  }),
		function(req, res){
			//Nada será realizado aqui pois ao chamar a rota, a página de autenticação do LinkedIn será exibida
	});

	app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));
};

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
