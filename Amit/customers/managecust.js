(function() {
	var module = angular.module("myApp");
	module.controller("managecustctrl", managecustctrl)

	function managecustctrl(mockServiceHTTP) {
		this.customers = [];
		this.customer;
		this.id;
		this.showCustomer = false;
		var self = this;
		this.show = false;
		this.createCustomerButton = false;
		this.order = "";
		this.goUp = false;
		// ===============================================================================================
		this.createCustomerShow = function() {
			this.createCustomerButton = true;
		}

		// ===============================================================================================
		var promise = mockServiceHTTP.getAllCustomers();
		promise
				.then(
						function(resp) {
							self.customers = resp.data;
						},
						function(err) {
							if (err.status == 401)
								window.location
										.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							else
								alert(err.data);
						});
		// ===============================================================================================
		this.deleteCustomer = function(id) {
			swal(
					{
						title : "Are you sure?",
						text : "you want to delete Customer #" + id,
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "Yes, delete it!",
						animation : "pop",
						closeOnConfirm : false,

					},
					function() {
						var promisePost = mockServiceHTTP.deleteCustomer(id);
						promisePost
								.then(
										function(resp) {
											swal("Customer Deleted!",
													"Customer with the ID #"
															+ id
															+ " was deleted.",
													"info");
											location.reload();
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											if (err.status == 418)
												swal(
														"Something Went Wrong!",
														"Customer #"
																+ id
																+ " was not found",
														"error");
											else
												alert(err.data);
										});
					});
		}
		// ===============================================================================================
		// Get Customer
		// ===============================================================================================
		this.getCustomer = function() {
			swal(
					{
						title : "Search Customer by ID",
						text : "Input customer's ID",
						type : "input",
						showCancelButton : true,
						closeOnConfirm : false,
						animation : "slide-from-top",
						inputPlaceholder : "Customer ID"
					},
					function(inputValue) {
						if (inputValue === false)
							return false;

						if (inputValue === "") {
							swal
									.showInputError("You need to input customer ID!");
							return false
						}

						var id = inputValue;
						var promisePost = mockServiceHTTP.getCustomer(id);
						promisePost
								.then(
										function(resp) {
											self.customer = resp.data;
											self.showCustomer = true;
											swal.close();
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											else
												{
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
		this.showUpdateCustomer = function() {
			this.show = true;
		}
		// ===============================================================================================
		this.hideUpdateCustomer = function(customer) {
			var promisePost = mockServiceHTTP.updateCustomer(customer);
			promisePost
					.then(
							function(resp) {
								swal("Customer updated!", "Customer #"
										+ customer.id + " updated.", "info");
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
		
		this.hide = function() {
			self.showCustomer = false;
			self.show = false;
		}
	}
})();