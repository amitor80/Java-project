(function() {
	var module = angular.module("myApp");
	module.controller("manageCouponsCTRL", manageCouponsCTOR)

	function manageCouponsCTOR(companyMockService) {
		this.coupons = [];
		this.comp_id;

		this.searchID;
		this.searchedCoupon = [];
		this.showSearch = false;

		this.searchType;
		this.searchedCouponsByType = [];
		this.showSearchByType = false;

		this.searchPrice;
		this.searchedCouponsByPrice = [];
		this.showSearchByPrice = false;

		this.searchDate;
		this.searchedCouponsByDate = [];
		this.showSearchByDate = false;

		this.showUpdate = false;

		this.order = "";
		this.goUp = false;

		var self = this;
		// ========================================================================================
		// Get All Coupons
		// ========================================================================================
		var promise = companyMockService.getAllCoupons();
		promise
				.then(
						function(resp) {
							self.coupons = resp.data;
						},
						function(err) {
							if (err.status == 401) {
								window.location
										.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							} else {
								alert(err.sdata);
							}
						});
		// ========================================================================================
		// Delete Coupon
		// ========================================================================================
		this.deleteCoupon = function(id) {
			swal(
					{
						title : "Are you sure?",
						text : "you want to delete Coupon #" + id,
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "Yes, delete it!",
						animation : "pop",
						closeOnConfirm : false,

					},
					function() {
						var promise = companyMockService.deleteCoupon(id);
						promise
								.then(
										function(resp) {
											swal("Coupon Deleted!",
													"Cuopon with the ID #"
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
														"Coupon #"
																+ id
																+ " was not found",
														"error");
											else
												alert(err.data);
										});
					});
		}
		// ========================================================================================
		// Show update
		// ========================================================================================
		this.showUpdateButton = function() {
			this.showUpdate = true;
		}
		// ========================================================================================
		// Save Update
		// ========================================================================================
		this.saveUpdateButton = function(c) {
			var promise = companyMockService.updateCoupon(c);
			promise
					.then(
							function(resp) {
								swal("Coupon Updated!", "Coupon #" + c.id
										+ " updated.", "info");
							},
							function(err) {
								if (err.status == 401) {
									window.location
											.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
								} else {
									swal(
											"Something Went Wrong!",
											"Notice that the cupon URL is no longer than 100 chars\n",
											"error");
								}
							});
			this.showUpdate = false;
		}
		// ========================================================================================
		// Search by ID - GetCoupon
		// ========================================================================================
		this.searchByID = function() {
			if (this.searchID == null) {
				swal("Attention!", "Please insert a valid ID", "warning");
			} else {
				var promise = companyMockService.getCoupon(this.searchID);
				promise
						.then(
								function(resp) {
									self.searchedCoupon = resp.data;
									self.showSearch = true;
								},
								function(err) {
									if (err.status == 401) {
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									} else {
										swal("Something Went Wrong!",
												"Coupon #" + self.searchID
														+ " was not found.",
												"error");
									}
								});
			}
		}
		// ========================================================================================
		// Search by Type - GetCouponByType
		// ========================================================================================
		this.searchByType = function() {
			if (this.searchType == null) {
				swal("Attention!", "Please choose a valid type", "warning");
			} else {
				var promise = companyMockService
						.getCouponsByType(this.searchType);
				promise
						.then(
								function(resp) {
									self.searchedCouponsByType = resp.data;
									if (self.searchedCouponsByType.length == 0) {
										swal("Something Went Wrong!",
												"No coupons from the type "
														+ self.searchType,
												"error");
									} else
										self.showSearchByType = true;
								},
								function(err) {
									if (err.status == 401) {
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									} else {
										alert(err.sdata);
									}
								});
			}
		}
		// ========================================================================================
		// Search by Price - GetCouponByPrice
		// ========================================================================================
		this.searchByPrice = function() {
			if (this.searchPrice == null) {
				swal("Attention!", "Please insert a valid price", "warning");
			} else {
				var promise = companyMockService
						.getCouponsByPrice(this.searchPrice);
				promise
						.then(
								function(resp) {
									self.searchedCouponsByPrice = resp.data;
									if (self.searchedCouponsByPrice.length == 0) {
										swal("Something Went Wrong!",
												"No coupons under "
														+ self.searchPrice
														+ "$.", "error");
									} else
										self.showSearchByPrice = true;
								},
								function(err) {
									if (err.status == 401) {
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									} else {
										alert(err.sdata);
									}
								});
			}
		}
		// ========================================================================================
		// Search by Date - GetCouponUntilDate
		// ========================================================================================
		this.searchByDate = function() {
			if (this.searchDate == null) {
				swal("Attention!", "Please choose a valid date", "warning");
			} else {
				var promise = companyMockService
						.getCouponsByDate(this.searchDate.getTime());
				promise
						.then(
								function(resp) {
									self.searchedCouponsByDate = resp.data;
									if (self.searchedCouponsByDate.length == 0) {
										swal(
												"Something Went Wrong!",
												"No coupons with exp. date before "
														+ self.searchDate + ".",
												"error");
									} else {
										self.showSearchByDate = true;
									}
								},
								function(err) {
									if (err.status == 401) {
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									} else {
										alert(err.sdata);
									}
								});
			}
		}
		// ========================================================================================
		// Hide
		// ========================================================================================
		this.hideAll = function() {
			this.showSearchByDate = false;
			this.showSearchByPrice = false;
			this.showSearchByType = false;
			this.showSearch = false;
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
	}
})();