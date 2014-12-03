(function () {

    'use strict';

    describe('LoginController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$compile_, _$httpBackend_, $rootScope, $cookieStore, $location, $controller) {
            
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();
            $compile     = _$compile_;
            ctrl         = $controller('LoginController', {$scope:scope});

            createElement('<div global-directives />');
        }));

        afterEach(function () {
            cookieStore.remove('session');
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        }); 

        describe('Method > authenticateUser - successful login', function () {

            beforeEach(function () {
                $httpBackend.expectPOST('/api/authenticateUser').respond({ user: { id: 2, username: 'alaneicker' } });
                location.path('/login');
                scope.model = { username: 'alaneicker', password: 'tellnoone44' };
                scope.authenticateUser();
                $httpBackend.flush();
            });

            it('should reset $scope.model', function () {
                expect(scope.model).toEqual({});
            });

            it('location.path should equal "/"', function () {
                expect(location.path()).toEqual('/');
            });

            it('cookie "session" should be defined', function () {
                expect(cookieStore.get('session')).toBeDefined();
            });

        });

        describe('Method > authenticateUser - failed login', function () {

            beforeEach(function () {
                $httpBackend.expectPOST('/api/authenticateUser').respond({ user: null });
                location.path('/login');
                scope.model = { username: 'alaneicker', password: 'tellnoone44' };
                scope.authenticateUser();
                $httpBackend.flush();
            });

            it('$scope.loginError should be true', function () {
                expect(scope.loginError).toBeTruthy();
            });

        });


    });

})();