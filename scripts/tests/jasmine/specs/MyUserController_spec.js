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

    });

})();