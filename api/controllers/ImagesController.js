/**
 * ImagesController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra');
var gm = require('gm').subClass({
	imageMagick: true
});;

var createThumb = function createThumb(dirName, files, slug, user, res) {

	// Required Image Sizes in width
	// 366
	// 100
	// 35

	// Iterate for each image uploaded
	async.eachSeries(files, function(file, callback) {

		var fileName = file.fd.split("/").pop();

		// Create different sized images
		async.series({
				large: function(callback) {
					fs.ensureDir(dirName + "../large/", function() {
						gm(file.fd)
							.resize(366)
							.noProfile()
							.write(dirName + "../large/" + fileName, function(err) {
								callback(null);
							});
					});
				},
				small: function(callback) {
					fs.ensureDir(dirName + "../small/", function() {
						gm(file.fd)
							.resize(100)
							.noProfile()
							.write(dirName + "../small/" + fileName, function(err) {
								callback(null);
							});
					});
				},
				xs: function(callback) {
					fs.ensureDir(dirName + "../xs/", function(err) {
						gm(file.fd)
							.resize(35)
							.noProfile()
							.write(dirName + "../xs/" + fileName, function(err) {
								callback(null);
							});
					});
				}
			},
			function(err, results) {

				gm(dirName + "../original/" + fileName).size(function(err, value) {
					// Create entry in db
					Images.create({
						name: fileName,
						owner: slug,
						submittedBy: user.id,
						resolution: value
					}).exec(function(err, image) {
						res.json({
							err: null,
							success: true,
							file: image
						});
						callback(err, results);
					});
				});
			});
	});
};


module.exports = {
	upload: function upload(req, res) {
		var params = req.params.all();
		var mediaDir = __dirname + "/../../media/" + params.slug + "/original/";

		req.file('image-uploader')
			.upload({
				dirname: mediaDir
			}, function(err, uploadedFiles) {

				if (err) return res.send(500, err);

				// Create appropriate sized images
				createThumb(mediaDir, uploadedFiles, params.slug, req.user, res);
			});
	},

	destroy: function(req, res) {
		var params = req.params.all();
		Images.destroy({id: params.id}).exec(function(err, image){
			res.json({
				err: err,
				image: image
			})
		});
	}
};