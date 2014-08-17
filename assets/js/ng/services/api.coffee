apiservices = angular.module "mm.apiservices", []

apiservices.factory "APIServices", [
	'$resource', 
	($resource)->
		{ 
			movie: $resource('/movies/:id', {id: '@id'}, { update: {method:'PUT' } }),
			production: $resource('/productions/:id', {id: '@id'}, { update: {method:'PUT' } }),
			publication: $resource('/publications/:id', {id: '@id'}, { update: {method:'PUT' } }), 
			people: $resource('/people/:id', {id: '@id'}, { update: {method:'PUT' } }) 
		}
]