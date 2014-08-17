/**
 * Movies.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		autosubscribe: ['destroy', 'update', 'add', 'remove']
	},

	// ******
	// AFTER Lifecycle callbacks
	// ******

	// After creation of movie doc
	afterCreate: function(movie, cb) {

		// Create hash and handle entry in TweetFilters
		// Make entry in the Slugs for the unique slug
		async.parallel({
				handle: function(callback) {
					if (movie.handle) {
						Tweetfilters.findOrCreate({
							name: movie.handle,
							type: "#"
						},{
							name: movie.handle,
							type: "#"
						}).exec(function(err, record) {
							callback(err, record);
						});
					} else {
						callback(null);
					}
				},
				hash: function(callback) {
					if (movie.hash) {
						Tweetfilters.findOrCreate({
							name: movie.hash,
							type: "@"
						}, {
							name: movie.hash,
							type: "@"
						}).exec(function(err, record) {
							callback(err, record);
						});
					} else {
						callback(null);
					}
				},
				slug: function(callback) {
					Slugs.create({
						name: movie.slug,
						model: "Movies",
						owner: movie.id
					}).exec(function(err, slug) {
						callback(err, slug);
					});
				}
			},
			function(err, results) {
				if (err) return cb(err);
				cb();
			});
	},

	afterUpdate: function(movie, cb) {

		// Create hash and handle entry in TweetFilters
		async.parallel({
				handle: function(callback) {
					if (movie.handle) {
						Tweetfilters.findOrCreate({
							name: movie.handle,
							type: "#"
						}, {
							name: movie.handle,
							type: "#"
						}).exec(function(err, record) {
							callback(err, record);
						});
					} else {
						callback(null);
					}
				},
				hash: function(callback) {
					if (movie.hash) {
						Tweetfilters.findOrCreate({
							name: movie.hash,
							type: "@"
						}, {
							name: movie.hash,
							type: "@"
						}).exec(function(err, record) {
							callback(err, record);
						});
					} else {
						callback(null);
					}
				}
			},
			function(err, results) {
				if (err) return cb(err);
				cb();
			});
	},

	afterDestroy: function(movie, cb) {

		// Remove entry from the Slugs for the unique slug
		Slugs.destroy({
			name: movie[0].slug
		}).exec(function deleteCB(err) {
			if (err) return cb(err);

			cb();
		});
	}
};