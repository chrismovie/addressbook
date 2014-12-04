(function () {

    'use strict';

    describe('MyUserController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $cookieStore, $location, $controller) {
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();

            cookieStore.put('session', { id: 2, username: 'alaneicker' });
            
            ctrl         = $controller('MyUserController', {$scope:scope});
        }));

        afterEach(function () {
            cookieStore.remove('session');
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        }); 

        it('should set scope.model.username with username from cookie', function () {
            expect(scope.model.username).toBe('alaneicker');
        });

        it('should set scope.model.sessionid with id from cookie', function () {
            expect(scope.sessionid).toBe(2);
        });

        describe('submitForm', function () {

            beforeEach(function () {
                $httpBackend.expectPOST('/api/updateUser/' + scope.sessionid).respond(updateResponse);
                scope.model.username = 'test';
                scope.submitForm();
                $httpBackend.flush();
            });

            it('should reset the session cookie with new username', function () {
                expect(cookieStore.get('session').username).toBe('test');
            });

            it('should set scope.userUpdated to true', function () {
                expect(scope.userUpdated).toBeTruthy();
            });

        });

    });

})();