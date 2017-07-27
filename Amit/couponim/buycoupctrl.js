/**
 * 
 */

(function() {

	var module = angular.module("myApp");
	module.controller("buyCouponCTRL", buyCouponCTOR)

	function buyCouponCTOR(CustomerMockService) {

		this.allCoupons = [];
		this.myCoupons = [];
		this.message = "";

		this.order = "";
		this.goUp = false;

		this.searchType;
		this.searchedCouponsByType = [];
		this.showSearchByType = false;

		this.AllsearchType;
		this.AllsearchedCouponsByType = [];
		this.AllshowSearchByType = false;

		this.searchPrice;
		this.searchedCouponsByPrice = [];
		this.showSearchByPrice = false;

		this.AllsearchPrice;
		this.AllsearchedCouponsByPrice = [];
		this.AllshowSearchByPrice = false;

		this.searchDate;
		this.searchedCouponsByDate = [];
		this.showSearchByDate = false;

		this.AllsearchDate;
		this.AllsearchedCouponsByDate = [];
		this.AllshowSearchByDate = false;

		this.showUpdate = false;

		var self = this;
		// ====================================================================================================
		// Getting my Coupon
		// ====================================================================================================
		var promise = CustomerMockService.getCoupons();
		promise.then(function(resp) {
			self.myCoupons = resp.data;
		}, function(err) {
			alert(err.data);
		});
		// ====================================================================================================
		// Getting all the Coupons
		// ====================================================================================================
		var promise = CustomerMockService.getAllCoupouns();
		promise
				.then(
						function(resp) {
							self.allCoupons = resp.data;
						},
						function(err) {
							if (err.status == 401)
								window.location
										.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
							else
								alert(err);
						});
		// ====================================================================================================
		// Buy Coupon
		// ====================================================================================================
		this.buy = function(coupon) {
			swal(
					{
						title : "Attention!",
						text : "Are you sure you want to buy coupon #"
								+ coupon.id + "?",
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "Yes, buy it!",
						closeOnConfirm : false
					},
					function() {
						var promise = CustomerMockService.buyCoupon(coupon);
						promise
								.then(
										function(resp) {
											self.myCoupons = resp.data;
											self.message = "Coupon #"
													+ coupon.id
													+ " has been added to your shopping cart.";
											swal.close();
											// ===================================
											// Counting the number of purchases
											// ===================================
											if (localStorage
													.getItem(coupon.type) == null) {
												localStorage.setItem(
														coupon.type, 1);
											} else {
												var hits = localStorage
														.getItem(coupon.type);
												hits++;
												localStorage.setItem(
														coupon.type, hits);
											}
											// ===================================
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											var div = document
													.createElement('div');
											div.innerHTML = err.data;
											var messageBlock = div
													.querySelector('h1');
											var message = 'Error on server';
											if (messageBlock) {
												message = messageBlock.innerText;
												message = message
														.substring(message
																.lastIndexOf(':') + 2);
											}
											swal("Something Went Wrong!",
													message, "error");
										});
					});
		}
		// ====================================================================================================
		this.deleteCoupon = function(coupon) {

			swal(
					{
						title : "Attention!",
						text : "Are you sure you want to delete coupon #"
								+ coupon.id + " from your cart?",
						type : "warning",
						showCancelButton : true,
						confirmButtonColor : "#DD6B55",
						confirmButtonText : "Yes, delete it!",
						closeOnConfirm : false
					},
					function() {
						var promise = CustomerMockService.deleteCoupon(coupon);
						promise
								.then(
										function(resp) {
											swal("Coupon Deleted!", "Coupon #"
													+ coupon.id
													+ " has been deleted.",
													"info");
										},
										function(err) {
											if (err.status == 401)
												window.location
														.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
											else
												alert(err);
										});
					});
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
		// ========================================================================================
		// Search Purchased by Type - GetPurchasedCouponByType
		// ========================================================================================
		this.searchByType = function() {
			if (this.searchType == null) {
				swal("Attention!", "Please choose a valid type", "warning");
			} else {
				var promise = CustomerMockService
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
									if (err.status == 401)
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									else
										alert(err);
								});
			}
		}
		// ========================================================================================
		// Search All by Type - GetAllCouponByType
		// ========================================================================================
		this.AllsearchByType = function() {
			if (this.AllsearchType == null) {
				swal("Attention!", "Please choose a valid type", "warning");
			} else {
				var promise = CustomerMockService
						.getAllCouponsByType(this.AllsearchType);
				promise
						.then(
								function(resp) {
									self.AllsearchedCouponsByType = resp.data;
									if (self.AllsearchedCouponsByType.length == 0) {
										swal("Something Went Wrong!",
												"No coupons from the type "
														+ self.AllsearchType,
												"error");
									} else
										self.AllshowSearchByType = true;
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
		// ========================================================================================
		// Search Purchased by Price - GetPurchasedCouponByPrice
		// ========================================================================================
		this.searchByPrice = function() {
			if (this.searchPrice == null) {
				swal("Attention!", "Please insert a valid price", "warning");
			} else {
				var promise = CustomerMockService
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
									if (err.status == 401)
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									else
										alert(err);
								});
			}
		}
		// ========================================================================================
		// Search All by Price - GetAllCouponByPrice
		// ========================================================================================
		this.AllsearchByPrice = function() {
			if (this.AllsearchPrice == null) {
				swal("Attention!", "Please insert a valid price", "warning");
			} else {
				var promise = CustomerMockService
						.getAllCouponsByPrice(this.AllsearchPrice);
				promise
						.then(
								function(resp) {
									self.AllsearchedCouponsByPrice = resp.data;
									if (self.AllsearchedCouponsByPrice.length == 0) {
										swal("Something Went Wrong!",
												"No coupons under "
														+ self.AllsearchPrice
														+ "$.", "error");
									} else
										self.AllshowSearchByPrice = true;
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
		// ========================================================================================
		// Search Purchased by Date - GetPurchasedCouponUntilDate
		// ========================================================================================
		this.searchByDate = function() {
			if (this.searchDate == null) {
				swal("Attention!", "Please choose a valid date", "warning");
			} else {
				var promise = CustomerMockService
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
									if (err.status == 401)
										window.location
												.replace("http://localhost:8080/WEB/HTMLs/index.html#/main");
									else
										alert(err);
								});
			}
		}
		// ========================================================================================
		// Search All by Date - GetAllCouponUntilDate
		// ========================================================================================
		this.AllsearchByDate = function() {
			if (this.AllsearchDate == null) {
				swal("Attention!", "Please choose a valid date", "warning");
			} else {
				var promise = CustomerMockService
						.getAllCouponsByDate(this.AllsearchDate.getTime());
				promise
						.then(
								function(resp) {
									self.AllsearchedCouponsByDate = resp.data;
									if (self.AllsearchedCouponsByDate.length == 0) {
										swal("Something Went Wrong!",
												"No coupons with exp. date before "
														+ self.AllsearchDate
														+ ".", "error");
									} else {
										self.AllshowSearchByDate = true;
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
		// ========================================================================================
		// Hide
		// ========================================================================================
		this.hideAll = function() {
			this.showSearchByDate = false;
			this.showSearchByPrice = false;
			this.showSearchByType = false;
			this.showSearch = false;
			this.AllshowSearchByType = false;
			this.AllshowSearchByPrice = false;
			this.AllshowSearchByDate = false;
		}
		// ===============================================================================================
	}
})();