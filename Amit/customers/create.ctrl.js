(function () {
 
    var module = angular.module("myApp");
 
    module.controller("CreateCouponCtrl", CreateCouponCtrlCtor);
 
    // Ctor method for the CreateCouponCtrl
    function CreateCouponCtrlCtor(mockServiceHTTP) {
 
        this.success = false;
        this.failure = false;
 
        this.createCoupon = function () {
            console.log(this.newCoupon);
            if (this.newCoupon == undefined || this.newCoupon.id == undefined || this.newCoupon.name == undefined)
            {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;
            var self = this;
            var promisePost = mockServiceHTTP.addCoupon(this.newCoupon);
            promisePost.then(
             function (resp) {
                 //alert(resp.data);
                 self.coupons = resp.data;
                 self.newCoupon = {};
                 self.success = true;
                 self.failure = false;
 
             },
                function (err) {
                    alert(err.data);
                    self.success = false;
                    self.failure = true;
                });
 
        }
 
    }
 
})();