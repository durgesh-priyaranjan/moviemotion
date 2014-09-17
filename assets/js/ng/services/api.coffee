;
apiservices = angular.module "mm.apiservices", []

apiservices.factory "APIServices", [
	'$resource', 
	($resource)->
		{ 
			movie: $resource('/api/movies/:id', {id: '@id'}, { update: {method:'PUT' } }),
			production: $resource('/api/productions/:id', {id: '@id'}, { update: {method:'PUT' } }),
			publication: $resource('/api/publications/:id', {id: '@id'}, { update: {method:'PUT' } }), 
			people: $resource('/api/people/:id', {id: '@id'}, { update: {method:'PUT' } }), 
			image: $resource('/api/images/:id', {id: '@id'}, { update: {method:'PUT' } }) ,
			slideshow: $resource('/api/slideshows/:id', {id: '@id'}, { update: {method:'PUT' } }) 
		}
]