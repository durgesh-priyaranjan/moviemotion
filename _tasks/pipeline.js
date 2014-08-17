/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// ***********************************
// Defaults are used for frontend.
// ***********************************


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'frontend/styles/**/*.css'
];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Below, as a demonstration, you'll see the built-in dependencies
  // linked in the proper order order

  // Bring in the socket.io client
  'frontend/js/socket.io.js',

  // then beef it up with some convenience logic for talking to Sails.js
  'frontend/js/sails.io.js',

  // finally, include a simple boilerplate script that connects a socket
  // to the Sails backend with some example code
  'frontend/js/connection.example.js',

  //
  // *->    you might put other dependencies like jQuery or Angular here   <-*
  //

  // All of the rest of your app scripts
  'frontend/js/**/*.js'
];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'frontend/templates/**/*.html'
];

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});


// ***********************************
// Backend Configuration
// ***********************************

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssBackFilesToInject = [
  'backend/styles/**/*.css'
];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsBackFilesToInject = [

  // Below, as a demonstration, you'll see the built-in dependencies
  // linked in the proper order order

  // Bring in the socket.io client
  'backend/js/socket.io.js',

  // then beef it up with some convenience logic for talking to Sails.js
  'backend/js/sails.io.js',

  // finally, include a simple boilerplate script that connects a socket
  // to the Sails backend with some example code
  'backend/js/connection.example.js',

  // Jquery
  'backend/js/jquery/libs/dependencies/**/*.js',  
  'backend/js/jquery/libs/**/*.js',  
  'backend/js/jquery/inhouse/**/*.js',  

  // Angular
  'backend/js/ng/libs/dependencies/**/*.js',  
  'backend/js/ng/libs/**/*.js',  
  'backend/js/ng/controllers/**/*.js',  
  'backend/js/ng/directives/**/*.js',  
  'backend/js/ng/services/**/*.js',  
  'backend/js/ng/**/*.js',  

  // All of the rest of your app scripts
  'backend/js/**/*.js'
];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateBackFilesToInject = [
  'backend/templates/**/*.html'
];

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssBackFilesToInject = cssBackFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsBackFilesToInject = jsBackFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateBackFilesToInject = templateBackFilesToInject.map(function(path) {
  return 'assets/' + path;
});