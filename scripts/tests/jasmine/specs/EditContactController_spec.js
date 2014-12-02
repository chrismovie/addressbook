(function () {

    'use strict';

    describe('EditContactController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $cookieStore, $location, $controller, $routeParams) {
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();

            $httpBackend.expectGET('/api/getContactById/12345').respond(contact);

            ctrl         = $controller('EditContactController', { $scope:scope, $routeParams: { userid: 12345 } });

            createElement('<div global-directives />');
            $httpBackend.flush();
        }));

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        }); 

        it('should set the value of scope.action to "edit"', function () {
            expect(scope.action).toBe('edit');
        });

        it('scope.model should be defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('should set scope.model with data corresponding to the userid passed in the $routeParams', function () {
            expect(scope.model.userid).toBe(12345);
        });

    });

})();