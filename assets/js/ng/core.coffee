moviemotion = angular.module "moviemotion", 
    [   
        "ngRoute",
        "ngResource",

        "ui.bootstrap",
        "toaster",
        "dialogs.main",
        "pascalprecht.translate",
        "dialogs.default-translations",
        "textAngular",
        "ui.select2",
        "angularFileUpload",

        "mm.controllers",

        "mm.apiservices",        
        "mm.services",
        "mm.socketServices",

        "mm.directives"
    ]

moviemotion.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
        $locationProvider.html5Mode on

        # Front End Routes
        $routeProvider.when '/',
            templateUrl: '/templates/home.html',
            controller: '',
            controllerAs: "HC"

        .when '/:slug',
            templateUrl: '/templates/f-slug.html',
            controller: 'FSlugController',
            controllerAs: "FSC"
        
        .when '/movies/just-released',
            templateUrl: '/templates/movie-list.html',
            controller: '',
            controllerAs: "LC"
        .when '/movies/coming-soon',
            templateUrl: '/templates/movie-list.html',
            controller: '',
            controllerAs: "LC"
        .when '/movie/calendar',
            templateUrl: '/templates/movie-calendar.html',
            controller: '',
            controllerAs: "CC"
        
        .when '/:item/list',
            templateUrl: '/templates/f-item-list.html',
            controller: 'FListController',
            controllerAs: "FLC"

        # .when '/:type/list',
        #     templateUrl: '/templates/list.html',
        #     controller: 'ListController',
        #     controllerAs: "LC"

        # Backend End Routes
        .when '/a/:item/list/:type?',
            templateUrl: '/templates/a-item-list.html',
            controllerAs: "ALC",
            controller: 'AListController'
        .when '/a/:item/new',
            templateUrl: '/templates/a-item-new-edit.html',
            controllerAs: "ANC",
            controller: 'ANewEditController'
        .when '/a/:item/edit/:id',
            templateUrl: '/templates/a-item-new-edit.html',
            controllerAs: "ANC",
            controller: 'ANewEditController'
    ]
