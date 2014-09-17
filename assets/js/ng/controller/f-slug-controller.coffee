;
controllerModule = angular.module "mm.controllers", []

class FSlugController
	constructor: ( @$scope, @$timeout ) ->
		@init()

	init: ->
		console.log "Home controller called"

FSlugController.$inject =  ['$scope', '$timeout']
controllerModule.controller "FSlugController", FSlugController;