// Create Module for mm controller [which is called from core.js]
;
var mmControllers = angular.module('mm.controllers', []);


var movieController = function($scope, $timeout, $socket, toaster, $routeParams) {

    var self = this;

    self.scope = $scope;
    self.timeout = $timeout;
    self.socket = $socket;
    self.toaster = toaster;
    self.routeParams = $routeParams;

    $scope.submitMovie = function() {
        self.submitMovie();
    };

    $scope.checkSlug = function() {
        self.checkSlug();
    };

    if (self.routeParams && self.routeParams.id) {
        self.initWithData(self.routeParams.id);
    } else {
        self.init();
    }
};

movieController.prototype.initWithData = function(id) {
    var self = this;

    self.scope.processing = true;
    self.socket.get('/movies/' + id, function(response) {

        self.scope.processing = false;
        self.scope.movie = response;
        self.scope.$apply();
    });
};

movieController.prototype.init = function() {
    var self = this;

    // Initiliaze date picker 
    self.scope.today = function() {
        self.scope.releaseDate = new Date();
    };
    self.scope.today();

    self.scope.clear = function() {
        self.scope.releaseDate = null;
    };

    self.scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        self.scope.opened = true;
    };
};


movieController.prototype.submitMovie = function(isValid) {
    var self = this,
        errs = "";
    self.scope.processing = true;

    if (isValid) {
        if (self.scope.movie && self.scope.movie.id) {
            this.socket.put('/movies/' + self.scope.movie.id, self.scope.movie, function(response) {
                self.scope.processing = false;

                if (response.id) {
                    self.toaster.pop('success', "Success", 'Saved successfully');
                } else {
                    self.toaster.pop('error', "Error in saving.", response);
                }
            });
        } else {
            this.socket.post('/movies', self.scope.movie, function(response) {
                self.scope.processing = false;

                if (response.id) {
                    self.scope.movie.id = response.id;
                    self.toaster.pop('success', "Success", 'Saved successfully');
                } else {
                    self.toaster.pop('error', "Error in saving.", response);
                }
            });
        }
    } else {

        if (!self.scope.movie || !self.scope.movie.name) {
            errs = errs + "<li> Movie name is required. </li>";
        }
        if (!self.scope.movie || !self.scope.movie.slug) {
            errs = errs + "<li> Movie slug is required. </li>";
        }
        if (!self.scope.movie || !self.scope.movie.releaseDate) {
            errs = errs + "<li> Date for movie release is required. </li>";
        }

        self.toaster.pop('error', "Error in saving.", '<ul>' + errs + '</ul>', null, 'trustedHtml');
    }
};


movieController.prototype.checkSlug = function() {
    var self = this;

    if (!self.scope || !self.scope.movie || !self.scope.movie.slug) {
        self.scope.slugAvailable = "";
        return;
    }

    this.socket.get('/slug/available/' + self.scope.movie.slug, function(response) {

        if (response && response.slugs) {
            self.scope.slugAvailable = "not-avail";
        } else {
            self.scope.slugAvailable = "avail";
        }

        self.scope.$apply();
    });
};


// Inject dependencies of the controller
movieController.$inject = ['$scope', '$timeout', '$socket', 'toaster', '$routeParams'];

// Create a controller in "converaControllers" named as listingPageController
mmControllers.controller('movieController', movieController);