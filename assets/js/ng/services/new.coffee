mmServices = angular.module "mm.services", []

mmServices.factory "SlugService", ["$http", "$q", ( $http, $q )->

	check = ( slug, subslug=null ) ->

		# If params are not provided correctly
		deferred = $q.defer()
		promise = deferred.promise

		unless slug
			deferred.reject 'Cannot check slugs without proper params.'
			promise.success = ( fn )->
				promise.then fn
				promise
			promise.error = ( fn )->
				promise.then null, fn
				promise
			promise;

		url = "/slug/available/"
		data = {
			slug
			subslug
		}

		$http {
			method: "GET"
			url
			params: data
		}
	return {
		check
	}
]


mmServices.factory "BaseService", ["$http", "$q", ( $http, $q )->

	create = ( type, data ) ->
		# If params are not provided correctly
		deferred = $q.defer()
		promise = deferred.promise

		unless data or type
			deferred.reject 'Cannot submit base without proper params.'
			promise.success = ( fn )->
				promise.then fn
				promise
			promise.error = ( fn )->
				promise.then null, fn
				promise
			promise;

		if type isnt 'people' then type += "s"
		url = "/" + type + "/"

		$http.post url, data

	update = ( type, data ) ->
		# If params are not provided correctly
		deferred = $q.defer()
		promise = deferred.promise

		unless data or type
			deferred.reject 'Cannot submit base without proper params.'
			promise.success = ( fn )->
				promise.then fn
				promise
			promise.error = ( fn )->
				promise.then null, fn
				promise
			promise;

		if type isnt 'people' then type += "s"
		url = "/" + type + "/" + data.id

		$http.put url, data

	submit = ( type, data ) ->
		if data.id
			update type, data, data.id
		else
			create type, data

	return {
		submit: submit
	}
]
	