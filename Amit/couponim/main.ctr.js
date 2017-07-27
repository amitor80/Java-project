var module = angular.module("myApp");
 
module.controller("MainCtrl", mainCtrlCtor);
 
function mainCtrlCtor( $http )
    {
            this.name = name;
 
            this.id = id;
            
            var self = this;
 
            var promise = $http.get('http://localhost:60949/api/couponim/');
            promise.then(
                function (resp)
                {
                        console.log(resp.data);
                        self.couponim = resp.data;
                    },
                    function (err)
                    {
                            console.err(err);
                        });
            }