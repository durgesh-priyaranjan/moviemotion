;
controllerModule = angular.module "mm.controllers", []





class SigninModalController
	constructor: (@$scope, @$modalInstance) ->
		@$scope.cancel = ()=>
			@$modalInstance.dismiss 'cancel'





class BodyController
    constructor: ( @$scope, @$timeout, @$modal ) ->

    openSignInModal: -> 
    	signinModalInstance = @$modal.open {
    		templateUrl: "sigininModal.html"
    		controller: "SigninModalController"
    		size: "sm"
    	}



BodyController.$inject =  ['$scope', '$timeout', '$modal']
controllerModule.controller "BodyController", BodyController;