(function () {
 
    var module = angular.module("myApp");
 
    module.controller("GetCouponsCtrl", GetCouponsCtrlCtor);
 
    function GetCouponsCtrlCtor(mockServiceHTTP) {
        this.coupons = [];
        var self = this;
 
        var promise = mockServiceHTTP.getCoupons();
        promise.then(
        function (resp) {
            //alert(resp.data);
            self.coupons = resp.data;
 
        },
        function (err) {
            alert(err.data);
        });
 
 
    }
 
})();