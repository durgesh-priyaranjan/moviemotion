class ANewEditController
	# Default Contructor
	constructor:(@$scope, @$timeout, @$routeParams, @$http, @SlugService, @BaseService, @APIServices, @toaster, @$upload)->
		@item = @$routeParams.item
		@activetab = 1
		@optionInit()
		@savedOnce = false

		@$scope.clear = () =>
			@$scope.releaseDate = null

		@$scope.open = ( $event ) =>
			$event.preventDefault()
			$event.stopPropagation()
			@$scope.opened = true

		if @$routeParams.id
			@loading = true
			@verb = "Edit"
			@fetcher(@$routeParams.item, @$routeParams.id)
		else
			@verb = "Add"
			@init()

		# Initilize arrays
		@base = @base || {}

		@base.social = @base.social || {}
		@base.social.others = @base.social.others || []

	# Custom initializer
	init:()->
		# Datepicker settings
		@$scope.today=()=>
			@$scope.releaseDate = new Date()
		@$scope.today()


	# Initial data fetcher from server
	fetcher:(model, id)->
		# Fetch the initial data based on id
		@base = @APIServices[model].get {id: id}, ( data )=>
			if data.slug then @savedOnce = true
			@loading = false

	# Slug presence/validity checker
	checkSlug:(slug)->
		unless slug
			@slugAvailable = ''
			return
		
		@SlugService.check slug
		.success ( data )=>
			if data.slugs then @slugAvailable = 'not-avail'
			else @slugAvailable = 'avail'
		.error ( data )=>
			@slugAvailable = ''

	# Save base data
	# Base includes base, meta, desc/plot, social
	submitBase:(isValid)->
		console.log @slugAvailable
		if !isValid or @slugAvailable is 'not-avail'
			@toaster.pop 'error', "Incomplete Form", "Please fill the form completely."
		else
			@BaseService.submit @item, @base
			.success ( data )=>
				if data.status is "Err"
					@toaster.pop 'error', "Error", data.err
					return
				@toaster.pop 'success', "Success", "Request processed successfully."
				@base = data
				@savedOnce = true
			.error ( data )=>
				@toaster.pop 'error', "Error", "Error occured while processing your request."

	# For uploading files
	onFileSelect:($files)->
		@uploading = true
		for file in $files
			@$scope.upload = @$upload.upload({
					url: "/upload/#{@base.slug}",
					data: {
						name: "images"
					}
					file: file,
					fileFormDataName: "image-uploader"
				}).success((data, status, headers, config) =>
					@uploading = true
				).error((data, status, headers, config) =>
					@uploading = true
				)

		return ""




	# Initialize data from tags and dropdowns
	optionInit:()->
		@languagesOption = {
			'multiple': true,
			'simple_tags': true,
			'tags': ['Hindi', 'English', 'Assamese', 'Bengali', 'Bhojpuri', 'Chhattisgarhi', 'Gujarati', 'Kannada', 'Konkani', 'Malayalam', 'Marathi', 'Oriya', 'Punjabi', 'Sindhi', 'Tamil', 'Telugu', 'Silent', 'Other'] 
		}

		@imagesOption = {
			'multiple': true,
			'simple_tags': true,
			'tags': ['Wallpaper', 'Poster', 'Music-release', 'Movie-release', 'Party', 'First-cut', 'Behind-the-scenes'] 
		}


	# #
	# Options/Array Item add functionality
	# Move rows up and down in options/Array
	# #

	addOptions:(type, objParams...)->
		params = {}
		params[x] = '' for x in objParams

		if type is 'social'
			@base.social.others = @base.social.others || []
			@base.social.others.push params

	moveUp:(type, index)->
		if type is 'social'
			_.move @base.social.others, index, index-1

	moveDown:(type, index)->
		if type is 'social'
			_.move @base.social.others, index, index+1

	# #
	# =====================================
	# #


ANewEditController.$inject =  ['$scope', '$timeout', '$routeParams', '$http', 'SlugService', 'BaseService', 'APIServices', 'toaster', '$upload']
controllerModule = angular.module "mm.controllers", []
controllerModule.controller "ANewEditController", ANewEditController;