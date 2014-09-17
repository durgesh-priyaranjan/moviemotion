/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


	// ***
	// Frontend Routes
	// ***
	'/': "RouteController.home",
	
	'/star/list': "FrontendviewroutesController",
	'/star/full/:id': "FrontendviewroutesController",

	'/production/list': "FrontendviewroutesController",
	'/production/full/:id': "FrontendviewroutesController",

	'/publication/list': "FrontendviewroutesController",
	'/publication/full/:id': "FrontendviewroutesController",
	
	'/movie/released': "FrontendviewroutesController",
	'/movie/upcoming': "FrontendviewroutesController",
	'/movie/list': "FrontendviewroutesController",
	'/movie/full/:id': "FrontendviewroutesController",

	//Credentials
	"/login": "RouteController.login",
	'/logout': "auth.logout",

	// Handle slug i.e movie and profile page
	'/:slug': "FrontendviewroutesController",


	// ***
	// Admin Routes
	// ***
	"/a": "BackendviewroutesController",

	"/a/:item/list/:type?": "BackendviewroutesController",
	"/a/:item/new": "BackendviewroutesController",
	"/a/:item/edit/:id": "BackendviewroutesController",

	"/a/new/article": "BackendviewroutesController",
	"/a/edit/article/:id": "BackendviewroutesController",
	"/a/edit/articles": "BackendviewroutesController",

	"/a/new/review": "BackendviewroutesController",
	"/a/edit/review/:id": "BackendviewroutesController",
	"/a/edit/reviews": "BackendviewroutesController",

	"/a/dashboard": "BackendviewroutesController",


	// ***
	// API routes
	// ***

	// Slug availability checker
	"/slug/available": "SlugsController.available",

	// Image Uploader
	"/upload/:slug": "ImagesController.upload"
};