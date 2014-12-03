(function () {

    'use strict';

    describe('BaseController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $cookieStore, $location, $controller) {
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();
            ctrl         = $controller('BaseController', {$scope:scope});
        }));

        afterEach(function () {
            cookieStore.remove('session');
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        }); 

        it('should redirect to login page if "session" cookie IS NOT defined', function () {
            rootScope.$broadcast('$routeChangeSuccess');
            expect(location.path()).toBe('/login');
        });

        it('should not redirect to login page if "session" cookie IS defined', function () {
            cookieStore.put('session', true);
            rootScope.$broadcast('$routeChangeSuccess');
            expect(location.path()).not.toBe('/login');
        });

        describe('Method > logout', function () {

            it('should remove the cookie "session"', function () {
                cookieStore.put('session', true);
                scope.logout();
                expect(cookieStore.get('session')).not.toBeDefined();
            });

        });

    });

})();