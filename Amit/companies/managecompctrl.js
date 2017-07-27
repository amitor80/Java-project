(function() {
	var module = angular.module("myApp");
	module.controller("manageCompaniesCTRL", manageCompaniesCTOR)

	function manageCompaniesCTOR(mockServiceHTTP) {
		// ===============================================================================================
		this.companies = [];
		this.company;
		var self = this;
		this.show = false;
		this.showCompany = false;
		this.createCompanyButton = false;
		this.order = "";
		this.goUp = false;
		// ===============================================================================================
		// Create Company form :
		// ===============================================================================================
		this.createCompanyShow = function() {
			this.createCompanyButton = true;
		}
		// ===============================================================================================
		// Get All companies
		// ===============================================================================================
		var promise = mockServiceHTTP.getAllCompanies();
		promise
				.then(
						function(resp) {
							self.companies = resp.data;
						},
						function(err) {
							if (err.status == 401)
								window.location
										.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							else
								alert(err);
						});

		// ===============================================================================================
		// Delete Company
		// ===============================================================================================
		this.deleteCompany = function(id) {
			swal(
					{
						title : "Are you sure?",
						text : "you want to delete Company #" + id,
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "Yes, delete it!",
						closeOnConfirm : false,
					},
					function() {
						var promisePost = mockServiceHTTP.deleteCompany(id);
						promisePost
								.then(
										function(resp) {
											swal(
													"Company Deleted!",
													"Company #"
															+ id
															+ " has been deleted.",
													"info");
											location.reload();
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											if(err.status==418)
											swal("Something Went Wrong!",
													"Company #" + id
															+ " is not found.",
													"error");
											else
												alert(err.data);
										});
					});
		}
		// ===============================================================================================
		// Get Company
		// ===============================================================================================
		this.getCompany = function() {
			swal(
					{
						title : "Search Company by ID",
						text : "Input company's ID",
						type : "input",
						showCancelButton : true,
						closeOnConfirm : false,
						animation : "slide-from-top",
						inputPlaceholder : "Company ID"
					},
					function(inputValue) {
						if (inputValue === false)
							return false;

						if (inputValue === "") {
							swal
									.showInputError("You need to input company ID!");
							return false
						}
						var id = inputValue;
						var promisePost = mockServiceHTTP.getCompany(id);
						promisePost
								.then(
										function(resp) {
											self.company = resp.data;
											self.showCompany = true;
											swal.close();
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											else{
												var div = document.createElement('div');
												div.innerHTML = err.data;
												var messageBlock = div.querySelector('h1');
												var message = 'Error on server';
												if (messageBlock) {
													message = messageBlock.innerText;
													message = message
															.substring(message.lastIndexOf('-') + 2);
												}
												swal("Something Went Wrong!",message,"error");
											}
										});
					});
		}
		// ===============================================================================================
		// Show update company form
		// ===============================================================================================
		this.showUpdateCompany = function() {
			this.show = true;
		}
		// ===============================================================================================
		// Hide update company form and Update Company
		// ===============================================================================================
		this.hideUpdateCompany = function(company) {
			var promisePost = mockServiceHTTP.updateCompany(company);
			promisePost
					.then(
							function(resp) {
								swal("Company Updated!", "Company #"
										+ company.id + " has been updated.",
										"info");
							},
							function(err) {
								if (err.status == 401)
									window.location
											.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
								else
									alert(err.data);
							});
			this.show = false;
		}
		// ===============================================================================================
		// Order By
		// ===============================================================================================
		this.orderBy = function(header) {
			if (header == self.order) {
				self.goUp = !self.goUp;
			}
			self.order = header;
		}
		// ===============================================================================================
		// Hide
		// ===============================================================================================
		this.hide = function() {
			this.showCompany = false;
			this.createCompanyButton = false;
		}

	}
})();