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

        describe('Method > setPageTitle', function () {

            it('should set the page title to the home if path is /', function () {
                location.path('/');
                rootScope.$broadcast('$routeChangeSuccess');
                expect(scope.pagetitle).toBe('Address Book | home');
            });

            it('should set the page title to the current page path', function () {
                location.path('/create');
                rootScope.$broadcast('$routeChangeSuccess');
                expect(scope.pagetitle).toBe('Address Book | create');
            });

            it('should remove any ID from the page path before setting page title', function () {
                location.path('/edit/12345');
                rootScope.$broadcast('$routeChangeSuccess');
                expect(scope.pagetitle).toBe('Address Book | edit');
            });

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