(function () {
 
    var module = angular.module("myApp");
 
    module.controller("CreateCouponCtrl", CreateCouponCtrlCtor);
 
    // Ctor method for the RemoveCompanyCtrl
    function RemoveCompanyCtrlCtor(mockServiceHTTP) {
 
        this.success = false;
        this.failure = false;
 
        this.removeCompany = function () {
            console.log(this.newCompany);
            if (this.newCompany != undefined || this.newCompany.id != undefined || this.newCompany.name != undefined)
            {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;
            var self = this;
            var promisePost = mockServiceHTTP.addCoupon(this.newCompany);
            promisePost.then(
             function (resp) {
                 //alert(resp.data);
                 self.company = resp.data;
                 self.newCompany = {};
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