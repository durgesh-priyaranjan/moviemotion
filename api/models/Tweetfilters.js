/**
 * Tweetfilters.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


var tweetController = require("../controllers/TweetsController");

module.exports = {

    beforeCreate: function(filter, cb){
        if ((filter.name.indexOf("#") === 0) || (filter.name.indexOf("@") === 0)){
            filter.name.substr(0,1);
        }
        cb();
    },

    attributes: {
        name: 'STRING', // # or @
        type: 'STRING' // Can be of type hash(#) or handle(@)
    },

    afterCreate: function(filter, cb) {
        tweetController.changed(filter);
        cb();
    }
};