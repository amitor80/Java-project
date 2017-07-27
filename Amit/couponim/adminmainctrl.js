(function() {

	var module = angular.module("myApp");
	module.controller("adminMainCTRL", adminMainCTOR)

	function adminMainCTOR(mockServiceHTTP, loginService) {
		var promisePost = mockServiceHTTP.getAllCompanies();
		promisePost
				.then(
						function(resp) {
						},
						function(err) {
							if (err.status == 401)
								window.location
										.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							else
								alert(err);
						});

		this.logout = function() {
			swal({
				  title: "Are you sure?",
				  text: "You will be redirected to the Login page",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Logout",
				  closeOnConfirm: false
				},
				function(){
					var promisePost = loginService.logout();
					promisePost
					.then(
							function(resp) {
								window.location
								.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							}, function(err) {
								alert(err);
							});
				});
		}
	}
})();