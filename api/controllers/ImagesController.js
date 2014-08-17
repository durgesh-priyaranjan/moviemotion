/**
 * ImagesController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs-extra');
var gm = require('gm').subClass({ imageMagick: true });;

var createThumb = function createThumb(dirName, files) {

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
					gm(file.fd)
						.resize(366)
						.noProfile()
						.write(dirName + "../large/" + fileName, function(err) {
							callback(null);
						});
				},
				small: function(callback) {
					gm(file.fd)
						.resize(100)
						.noProfile()
						.write(dirName + "../small/" + fileName, function(err) {
							callback(null);
						});
				},
				xs: function(callback) {
					gm(file.fd)
						.resize(35)
						.noProfile()
						.write(dirName + "../xs/" + fileName, function(err) {
							callback(null);
						});
				}
			},
			function(err, results) {
				callback(err, results)
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
				createThumb(mediaDir, uploadedFiles);

				return res.json({
					message: uploadedFiles.length + ' file(s) uploaded successfully!',
					files: uploadedFiles
				});
			});
	}
};