controllerModule = angular.module "mm.controllers", []

class AListController
	constructor: ( @$scope, @$timeout, @$routeParams, @APIServices, @dialogs ) ->
		@init()

	init: ->
		@loading = true
		@sortBy = "date"
		@where = {}

		@item = @$routeParams.item
		if @$routeParams.type then @type = @$routeParams.type
		
		@fetcher()

	fetcher: () ->
		queryParams = {
			sort: @sortBy
			where: {}
		}

		if @$routeParams.type
			queryParams.where[@$routeParams.type] = true

		@items = @APIServices[@$routeParams.item].query queryParams, ( data )=>
			@loading = false

	deleteItem: ( itemId, itemName, itemModel ) ->
		confirm = @dialogs.confirm "Are you sure?", "You want to delete #{@item} '#{itemName}'."
		confirm.result.then (btn) =>
			@loading = true
			@APIServices[itemModel].delete {id: itemId}, ( data )=>
				_.remove @items, (obj) -> 
					obj.id == itemId
				@loading = false

	sortList: () ->
		@loading = true
		@fetcher()


AListController.$inject =  ['$scope', '$timeout', '$routeParams', 'APIServices', 'dialogs']
controllerModule.controller "AListController", AListController;