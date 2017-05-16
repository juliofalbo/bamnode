module.exports = function(app) {

    var passport = app.get('passport');

	app.get('/', isLoggedIn, function(req, res) {
		res.render('home/index.ejs', {
			user : req.user
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
