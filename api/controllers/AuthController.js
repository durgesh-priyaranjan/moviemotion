/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var passport = require('passport');

module.exports = {
    logout: function(req, res) {
        req.session.redirectTo = req.session.cookie.path;
        req.logout();
        res.redirect(req.session.redirectTo);
    },

    /**
     * [facebook Authentication]
     * https://developers.facebook.com/docs/
     * https://developers.facebook.com/docs/reference/login/
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    facebook: function(req, res) {
        req.session.redirectTo = req.session.cookie.path;
        passport.authenticate('facebook', {
            failureRedirect: '/signin',
            scope: ['email', 'public_profile']
        }, function(err, user) {
            req.logIn(user, function(err) {
                if (err) {
                    res.view('500');
                    return;
                }
                res.redirect(req.session.redirectTo);
                return;
            });
        })(req, res);
    },

    /**
     * [google Authentication]
     * https://developers.google.com/
     * https://developers.google.com/accounts/docs/OAuth2Login#scope-param
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    google: function(req, res) {
        req.session.redirectTo = req.session.cookie.path;
        passport.authenticate('google', {
            failureRedirect: '/signin?msg=failed',
            scope: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/plus.login'
            ]
        }, function(err, user) {
            req.logIn(user, function(err) {
                if (err) {
                    res.view('500');
                    return;
                }

                res.redirect(req.session.redirectTo);
                return;
            });
        })(req, res);
    },

    /**
     * [twitter Authentication]
     * https://apps.twitter.com/
     * https://apps.twitter.com/app/new
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    twitter: function(req, res) {
        req.session.redirectTo = req.session.cookie.path;
        passport.authenticate('twitter', {
            failureRedirect: '/signin'
        }, function(err, user) {
            req.logIn(user, function(err) {
                if (err) {
                    res.view('500');
                    return;
                }
                res.redirect(req.session.redirectTo);
                return;
            });
        })(req, res);
    }
};