(function()
    {
 
        var module = angular.module("myApp");
 
        module.service("mockServiceHTTP", mockServiceHTTPCtor);
 
        function Company(id, name)
            {
                    this.id = id;
                    this.name = name;
            }
 
            function mockServiceHTTPCtor( $q )
                {
                        this.Company = [
                                    new Company (1, "Cafe cafe"),
                                    new Company (2, "Greg")
                                ];
 
                        this.getCompany = function()
                        {
                                var deferred = $q.defer();
                                deferred.resolve({ 
                                    status : 200,
                                    data : this.Company
                                });
                            return  deferred.promise;
                        }
                    this.getCompanyFailue = function()
                    {
                            return $q.reject(
                                 { status : 404, data : 'Company not found'}
                                 );
                            }
                        // in the future  will be replaced by 
                        //return $http.get('URL');
 
                        this.addCompany = function(Company)
                        {
                                this.Company.push(Company);
                                var deferred = $q.defer();
                                deferred.resolve({ 
                                    status : 200,
                                    data : this.Company
                                });
                            return  deferred.promise;
                        }
                    // in the future will be replaced by 
                    //return $http.post('URL', coupon);
                }
 
 
        })();