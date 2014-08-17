var mm = angular.module('mm', [
    'ngRoute',
    'ngResource',
    'toaster',
    'ui.bootstrap',

    'pascalprecht.translate',
    'dialogs.main',

    // Services
    'mm.socketServices',

    // Controllers
    "mm.controllers",

    // Directives 
    'pluginDirectives'
]);


mm.config(['$routeProvider', '$locationProvider', 'dialogsProvider',
    function($routeProvider, $locationProvider, dialogsProvider) {

        // Alert dialogs
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(true);
        dialogsProvider.setSize('sm');

        // Set HTML5 routing to true
        $locationProvider.html5Mode(true);

        // Manage Routes
        $routeProvider.

        // Movies
        when('/admin/new/movie', {
            templateUrl: '/backend/templates/movie.html',
            controller: 'movieController',
            controllerAs: 'MovieCtrl'
        }).
        when('/admin/edit/movie/:id', {
            templateUrl: '/backend/templates/movie.html',
            controller: 'movieController',
            controllerAs: 'MovieCtrl'
        }).
        when('/admin/movies', {
            templateUrl: '/backend/templates/movies.html',
            controller: 'moviesController',
            controllerAs: 'MoviesCtrl'
        }).

        // User Articles
        when('/admin/new/article', {
            templateUrl: '/backend/templates/dashboard/dashboard.html',
            controller: 'ArticleCtrl'
        }).
        when('/admin/edit/article/:id', {
            templateUrl: '/backend/templates/dashboard/dashboard.html',
            controller: 'ArticleCtrl'
        }).
        when('/admin/new/review', {
            templateUrl: '/backend/templates/dashboard/dashboard.html',
            controller: 'ArticleCtrl'
        }).
        when('/admin/edit/review/:id', {
            templateUrl: '/backend/templates/dashboard/dashboard.html',
            controller: 'ArticleCtrl'
        }).

        // User Dashboard
        when('/admin/dashboard', {
            templateUrl: '/backend/templates/administrator/manage-users.html',
            controller: 'DashboardCtrl'
        }).

        // 404s
        when('/admin/404', {
            templateUrl: '/backend/templates/not-found.html'
        }).
        otherwise({
            redirectTo: '/adv/404'
        });
    }
]);


// To be enabled only for development environment.
// Do some grunt to remove this in production.
mm.run(["$rootScope", "$templateCache",
    function($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function() {
            // $templateCache.removeAll();
        });
    }
]);