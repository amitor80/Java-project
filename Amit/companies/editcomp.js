(function() {

	var module = angular.module("myApp");
	module.controller("editcompctrl", editcompctrl)

	function editcompctrl(companyMockService) {
		this.password;
		this.newPassword;

		var self = this;

		this.sumbit = function() {
			var promisePost = companyMockService.getPassword();
			promisePost
					.then(
							function(resp) {
								if (self.password = resp.data) {
									promisePost2 = companyMockService
											.setPassword(self.newPassword);
									promisePost2
											.then(
													function(resp) {
														swal(
																"Password changed!",
																"your password was successfully changed.",
																"info")
													},
													function(err) {
														if (err.status == 401)
															window.location
																	.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
														else
															alert(err);
													});
								}
							},
							function(err) {
								if (err.status == 401)
									window.location
											.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
								else
									alert(err);
							});
		}

	}
})();