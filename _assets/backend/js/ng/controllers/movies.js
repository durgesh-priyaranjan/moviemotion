// Create Module for mm controller [which is called from core.js]
;
var mmControllers = angular.module('mm.controllers', []);


var moviesController = function($scope, $timeout, $socket, toaster, $translate, dialogs) {

    var self = this;

    self.scope = $scope;
    self.timeout = $timeout;
    self.socket = $socket;
    self.toaster = toaster;
    self.dialogs = dialogs;

    $scope.delete = function() {
        self.delete();
    };

    self.init();
};

moviesController.prototype.init = function() {
    var self = this;

    // The movie data
    self.scope.processing = true;

    self.socket.get('/movies', function(response) {
        self.scope.processing = false;
        self.scope.movies = response;
        self.scope.$apply();
    });
};


moviesController.prototype.delete = function(movieId, movieName) {
    var self = this;

    var dlg = self.dialogs.confirm("Confirm", "Delete " + movieName + "?");

    dlg.result.then(function(btn) {

        // YES
        self.scope.processing = true;
        self.socket.remove('/movies/' + movieId, function(response) {
            self.scope.processing = false;
            _.remove(self.scope.movies, function(item) {
                return item.id === movieId;
            });
            self.scope.$apply();
        });
    }, function(btn) {

        // NO
    });
};



// Inject dependencies of the controller
moviesController.$inject = ['$scope', '$timeout', '$socket', 'toaster', '$translate', 'dialogs'];

// Create a controller in "converaControllers" named as listingPageController
mmControllers.controller('moviesController', moviesController);