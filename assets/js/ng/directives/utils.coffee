;
directiveModule = angular.module "mm.directives", []

directiveModule.directive "capitalizeFirst", ()->
	{
		require: 'ngModel'
		link: (scope, element, attrs, modelCtrl) ->
			capitalize = (inputValue) ->
				capitalized = inputValue.charAt(0).toUpperCase()+inputValue.substring(1)
				if capitalized isnt inputValue
              		modelCtrl.$setViewValue(capitalized)
		            modelCtrl.$render()
	            return capitalized
	        modelCtrl.$parsers.push capitalize
	        capitalize scope[attrs.ngModel] 
	}
	
