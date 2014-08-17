controllerModule = angular.module "mm.controllers", []

class HomeController
	constructor: ( @$scope, @$timeout ) ->
		@init()

	init: ->
		console.log "Home controller called"

HomeController.$inject =  ['$scope', '$timeout']
controllerModule.controller "HomeController", HomeController;