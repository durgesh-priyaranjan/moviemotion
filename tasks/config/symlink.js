/**
 * Create symbolic link for folder media
 * So that it can be accessed from .tmp
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 * 		https://www.npmjs.org/package/grunt-symbolic-link
 */
module.exports = function(grunt) {

	grunt.config.set('symlink', {
		media: {
			target: __dirname + '/../../media',
			link: __dirname +  '/../../.tmp/public/media'
		}
	});

	grunt.loadNpmTasks('grunt-symbolic-link');
};