controllerModule = angular.module "mm.controllers", []

class FListController
	constructor: ( @$scope, @$timeout, @$routeParams, @APIServices, @dialogs, @$http ) ->
		@type = @$routeParams.item
		@init()

	init: ->
		@limit = 50
		@loading = true
		@listItems = []
		@fetcher(@type)

	fetcher: ( category ) ->

		if category is "star" then url = "/api/people?sort=name&limit=#{@limit}&skip=#{@listItems.length}&where={\"star\":true}"

		@loading = true
		@$http.get url
		.success ( data ) =>
			console.log data
			@listItems = _.union @listItems, data
			@loading = false
		.error ( data ) =>
			@loading = false

FListController.$inject =  ['$scope', '$timeout', '$routeParams', 'APIServices', 'dialogs', '$http']
controllerModule.controller "FListController", FListController;