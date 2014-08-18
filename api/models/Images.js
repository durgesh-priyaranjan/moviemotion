/**
 * Images.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var fs = require('fs-extra');
module.exports = {

	attributes: {

	},

	afterDestroy: function(files, cb) {
		var mediaDir = __dirname + "/../../media/";

		// Iterate for each image uploaded
		async.each(files, function(file, callback) {

			// Create different sized images
			async.series({
					original: function(callback) {
						fs.remove(mediaDir + file.owner + "/original/" + file.name, function(err) {
							callback(err);
						});
					},
					large: function(callback) {
						fs.remove(mediaDir + file.owner + "/large/" + file.name, function(err) {
							callback(err);
						});
					},
					small: function(callback) {
						fs.remove(mediaDir + file.owner + "/small/" + file.name, function(err) {
							callback(err);
						});
					},
					xs: function(callback) {
						fs.remove(mediaDir + file.owner + "/xs/" + file.name, function(err) {
							callback(err);
						});
					}
				},
				function(err, results) {
					callback(err, results);
				});
		}, function(){
			cb();
		});
	}
};