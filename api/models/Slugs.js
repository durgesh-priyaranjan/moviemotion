/**
 * Slugs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var fs = require('fs-extra');
var media = "./media/"

module.exports = {

	attributes: {
		name: 'STRING'
	},

	afterCreate: function(slug, cb) {

		// Create folders to save images
		async.parallel({
				cover: function(callback) {
					fs.mkdirs(media + slug.name + "/cover/", function(err) {
						callback(err);
					});
				},
				dps: function(callback) {
					fs.mkdirs(media + slug.name + "/dps/", function(err) {
						callback(err);
					});
				},
				large: function(callback) {
					fs.mkdirs(media + slug.name + "/large/", function(err) {
						callback(err);
					});
				},
				small: function(callback) {
					fs.mkdirs(media + slug.name + "/small/", function(err) {
						callback(err);
					});
				},
				xs: function(callback) {
					fs.mkdirs(media + slug.name + "/xs/", function(err) {
						callback(err);
					});
				},
				original: function(callback) {
					fs.mkdirs(media + slug.name + "/original/", function(err) {
						callback(err);
					});
				},
			},
			function(err, results) {
				cb();
			});
	},

	afterDestroy: function(slug, cb) {
		fs.remove(media + slug.name, function(err) {
			cb();
		});
	}
};