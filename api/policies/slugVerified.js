/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check if the slug is not already present
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

    var params = req.params.all();

    Slugs.findOne({
        name: params.slug
    }).exec(function( err, slug ){
        if ( slug ){
            return res.json({ status: "Err", err: "Slug is already present"});
        } else {
            return next();
        }
    });
};