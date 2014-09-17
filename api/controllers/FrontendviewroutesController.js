/**
 * BackendviewroutesController
 *
 * @description :: Server-side logic for managing backendviewroutes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res) {

        var classes = req.isAuthenticated() ? "homepage authenticated" : "homepage unauthenticated",
            image = (req.user) ? (req.user.hostedImage || req.user.gravatar+"?s=30") : null;
            
        res.view("pages/homepage.ejs", {
            classes: classes,
            user: req.user,
            userimage: image,
            isAuthenticated: req.isAuthenticated()
        });
    }
};