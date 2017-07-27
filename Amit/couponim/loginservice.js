(function() {
	// ======================================================================================
	var module = angular.module("myApp");
	module.service("loginService", loginCTOR);
	// ======================================================================================
	function loginCTOR($http) {
		this.login = function(id, password, type) {
			return $http
					.get("http://localhost:8080/WEB/webapi/LoginService/login/"
							+ id + "/" + password + "/" + type);
		}
		
		this.logout = function() {
			return $http.get("http://localhost:8080/WEB/webapi/LoginService/logout");
		}
	}
})();