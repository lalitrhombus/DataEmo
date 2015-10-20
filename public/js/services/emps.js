angular.module('empService', [])

	// super simple service
	// each function returns a promise object 
	.factory('emps', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/emps');
			},
			create : function(empsData) {
				return $http.post('/api/emps', empsData);
			},
			delete : function(id) {
				return $http.delete('/api/emps/' + id);
			}
		}
	}]);