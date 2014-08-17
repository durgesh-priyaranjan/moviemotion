/**
 * SlugsController
 *
 * @description :: Server-side logic for managing slugs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    available: function( req, res ){

        // Get the param
        var name = req.query.slug,
            match,
            sendInvalid = function () {
                res.json({
                    err: "Invalid slug"
                });
                return;
            };

        if ( !name ) {
            sendInvalid();
            return;
        }

        // If name is not valid slug
        match = name.match(/^[a-z0-9-]+$/);

        // If slug is not valid, return error
        if ( !match ) sendInvalid()

        // Find name param in URL
        Slugs.findOne({
            name: name
        }).exec(function(err, slugs){
            res.json({
                err: err,
                slugs: slugs
            });
        });
    }
};