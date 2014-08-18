class EditImageModalController
	constructor: (@$scope, @$modalInstance, @image, @slideshows, @APIServices) ->
		@$scope.slideshowOptions = {
			multiple: true
			data: @slideshows
			formatSelection: (item)->
				item.name
			formatResult: (item)->
				item.name
		}
		@$scope.image = @image

		@$scope.cancel = ()=>
			@$modalInstance.dismiss 'cancel'
		
		@$scope.confirmEdit = ()=>
			@APIServices.image.update {id: @image.id}, @$scope.image, (data)=>
				if data.id then @$modalInstance.close @$scope.image

EditImageModalController.$inject =  ["$scope", "$modalInstance", "image", "slideshows", "APIServices"]


class EditSlideshowModalController
	constructor: (@$scope, @$modalInstance, @slideshow, @APIServices) ->
		@$scope.slideshow = @slideshow
		@$scope.cancel = ()=>
			@$modalInstance.dismiss 'cancel'

		@$scope.confirmEdit = ()=>
			@APIServices.slideshow.update {id: @slideshow.id}, @$scope.slideshow, (data)=>
				if data.id then @$modalInstance.close @$scope.slideshow

EditSlideshowModalController.$inject =  ["$scope", "$modalInstance", "slideshow", "APIServices"]
	


class ANewEditController
	# Default Contructor
	constructor:(@$scope, @$timeout, @$routeParams, @$http, @SlugService, @BaseService, @APIServices, @toaster, @$upload, @$modal, @dialogs)->
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
		@images = @images || []
		@slideshows = @slideshows || []

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
			if data.slug
				@savedOnce = true
				@images = @APIServices.image.query { owner: data.slug}
				@APIServices.slideshow.query { owner: data.slug}, (data)=>
					@slideshows = data

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
		async.each $files, 
					(file, callback)=>
						@$scope.upload = @$upload.upload({
								url: "/upload/#{@base.slug}",
								data: {
									name: "images"
								}
								file: file,
								fileFormDataName: "image-uploader"
							}).success((data, status, headers, config) =>
								if data.success then @images.push data.file
								callback()
							).error((data, status, headers, config) =>
								callback()
							)
					, ( err ) =>
						@uploading = false

	editThumb:(image)->
		editImageModalInstance = @$modal.open {
    		templateUrl: "/templates/modal-edit-image.html"
    		controller: "EditImageModalController"
    		size: "lg"
    		resolve: {
        		image: ()=>
           			image
           		slideshows: ()=>
           			@slideshows
      		}
    	}

	deleteThumb:(image)->
		confirm = @dialogs.confirm "Are you sure?", "You want to delete image."
		confirm.result.then (btn) =>
			@loading = true
			@APIServices.image.delete {id: image.id}, (data)=>
				_.remove @images, (obj) -> 
					obj.id == image.id
				@loading = false

	createSlideshow: ()->
		unless @newSlideshowName or @newSlideshowDesc
			@toaster.pop 'error', "Incomplete Form", "Slideshow name and description are required."
			return

		@APIServices.slideshow.save {
			name: @newSlideshowName
			description: @newSlideshowDesc
			owner: @base.slug
		}, (data)=>
			@slideshows.push data


	openEditSlideshowModal: (slideshow)->
		editSlideshowModalInstance = @$modal.open({
    		templateUrl: "/templates/modal-edit-slideshow.html"
    		controller: "EditSlideshowModalController"
    		size: "lg"
    		resolve: {
        		slideshow: ()->
           			slideshow
      		}
    	}).result.then (editedSlideshow)->
    		""


	deleteSlideshow: (slideshow)->
		confirm = @dialogs.confirm "Are you sure?", "You want to delete slideshow. #{slideshow.name}"
		confirm.result.then (btn) =>
			@loading = true
			@APIServices.slideshow.delete {id: slideshow.id}, (data)=>
				_.remove @slideshows, (obj) -> 
					obj.id == slideshow.id
				@loading = false

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


ANewEditController.$inject =  ['$scope', '$timeout', '$routeParams', '$http', 'SlugService', 'BaseService', 'APIServices', 'toaster', '$upload', '$modal', 'dialogs']
controllerModule = angular.module "mm.controllers", []
controllerModule.controller "ANewEditController", ANewEditController;