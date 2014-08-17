/**
 * RouteController
 *
 * @description :: Server-side logic for managing routes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	home: function(req, res) {

		var classes = req.isAuthenticated() ? "homepage authenticated" : "homepage unauthenticated",
			image = (req.user) ? (req.user.hostedImage || req.user.gravatar+"?s=30") : null;
			
		res.view("pages/homepage.ejs", {
			classes: classes,
			user: req.user,
			userimage: image,
			isAuthenticated: req.isAuthenticated()
		});
	},


	login: function(req, res) {

		var classes = "loginpage unauthenticated";
		res.view("pages/login.ejs", {
			classes: classes
		});
	},


	movie: function(req, res) {

		var classes = req.isAuthenticated() ? "homepage authenticated" : "homepage unauthenticated";
		res.view("pages/movie.ejs", {
			classes: classes,
			isAuthenticated: req.isAuthenticated()
		});
	}
};