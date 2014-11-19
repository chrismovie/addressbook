// API Service
services.factory('API', ['$resource', '$log', function ($resource, $log) {
    return {

        // HTTP request service
        httpRequest: function (opts) {
            
            var
                url      = opts.url,
                method   = opts.method !== undefined ? opts.method : 'GET',
                params   = opts.params !== undefined ? opts.params : {},
                qs       = opts.queryStr !== undefined ? opts.queryStr : {}, 
                isArray  = opts.isArray !== undefined ? opts.isArray : true
            ;

            try {

                if (url === undefined || url === '') { 
                    throw new Error('request URL required'); 
                }

                return $resource(url, qs, {
                    'query': {
                    'method' : method, 
                    'params' : params,
                    'isArray': isArray
                    }
                });
            }
            catch (e) {
                $log.debug(e);
            }
        }

    };
}]);