/**
 * People.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        autosubscribe: ['destroy', 'update', 'add', 'remove'],
        provider: 'STRING',
        uid: 'STRING',
        name: 'STRING',
        email: 'STRING',
        firstname: 'STRING',
        lastname: 'STRING',
        gender: 'STRING',
        picture: 'STRING',
        /**
         * Strips the password out of the json
         * object before its returned from waterline.
         * @return {object} the model results in object form
         */
        toJSON: function() {

            // this gives you an object with the current values
            var obj = this.toObject();
            delete obj.password;

            // return the new object without password
            return obj;
        },

        /**
         * Adds a method called fullName to the response object
         * @return {string} firstName and LastName concat'd
         */
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        }
    },


    // ******
    // BEFORE Lifecycle callbacks
    // ******
    // beforeUpdate: function(movie, cb) {

    //  // TO not update/change the slug during modification
    //  if (movie.slug) {
    //      delete movie.slug;
    //  }
    //  cb();
    // },


    // ******
    // AFTER Lifecycle callbacks
    // ******

    // After creation of movie doc
    afterCreate: function(person, cb) {

        // Create hash and handle entry in TweetFilters
        // Make entry in the Slugs for the unique slug
        async.parallel({
                handle: function(callback) {
                    if (person.handle) {
                        Tweetfilters.findOrCreate({
                            name: person.handle,
                            type: "#"
                        }, {
                            name: person.handle,
                            type: "#"
                        }).exec(function(err, record) {
                            callback(err, record);
                        });
                    } else {
                        callback(null);
                    }
                },
                hash: function(callback) {
                    if (person.hash) {
                        Tweetfilters.findOrCreate({
                            name: person.hash,
                            type: "@"
                        }, {
                            name: person.hash,
                            type: "@"
                        }).exec(function(err, record) {
                            callback(err, record);
                        });
                    } else {
                        callback(null);
                    }
                },
                slug: function(callback) {
                    if (!person.slug) {
                        callback();
                    } else {
                        Slugs.findOrCreate({
                            name: person.slug,
                            model: "People",
                            owner: person.id
                        }, {
                            name: person.slug,
                            model: "People",
                            owner: person.id
                        }).exec(function(err, slug) {
                            callback(err, slug);
                        });
                    }
                }
            },
            function(err, results) {
                if (err) return cb(err);
                cb();
            });
    },

    afterUpdate: function(person, cb) {

        // Create hash and handle entry in TweetFilters
        async.parallel({
                handle: function(callback) {
                    if (person.handle) {
                        Tweetfilters.findOrCreate({
                            name: person.handle,
                            type: "#"
                        }, {
                            name: person.handle,
                            type: "#"
                        }).exec(function(err, record) {
                            callback(err, record);
                        });
                    } else {
                        callback(null);
                    }
                },
                hash: function(callback) {
                    if (person.hash) {
                        Tweetfilters.findOrCreate({
                            name: person.hash,
                            type: "@"
                        }, {
                            name: person.hash,
                            type: "@"
                        }).exec(function(err, record) {
                            callback(err, record);
                        });
                    } else {
                        callback(null);
                    }
                },
                slug: function(callback) {
                    if (!person.slug) {
                        callback();
                    } else {
                        Slugs.findOrCreate({
                            name: person.slug,
                            model: "People",
                            owner: person.id
                        }, {
                            name: person.slug,
                            model: "People",
                            owner: person.id
                        }).exec(function(err, slug) {
                            callback(err, slug);
                        });
                    }
                }
            },
            function(err, results) {
                if (err) return cb(err);
                cb();
            });
    },

    afterDestroy: function(person, cb) {

        // Remove entry from the Slugs for the unique slug
        Slugs.destroy({
            name: person[0].slug
        }).exec(function deleteCB(err) {
            if (err) return cb(err);

            cb();
        });
    }
};