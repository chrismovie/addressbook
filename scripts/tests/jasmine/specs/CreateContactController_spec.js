(function () {

    'use strict';

    describe('CreateContactController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $cookieStore, $location, $controller) {
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();
            ctrl         = $controller('CreateContactController', { $scope:scope });
            createElement('<div global-directives />');
        }));

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        }); 

        it('should set the value of scope.action to "create"', function () {
            expect(scope.action).toBe('create');
        });

        it('scope.model should be empty object', function () {
            expect(scope.model).toEqual({});
        });

        describe('Method > submitForm', function () {
            
            beforeEach(function () {
                location.path('/create');
                spyOn(scope, 'getProfileImg').and.returnValue('/images/default_profile_img.png');
                $httpBackend.expectPOST('/api/createContact').respond(updateResponse);
                scope.submitForm();
                $httpBackend.flush();
            });

            it('should redirect bact to "/" on successful insert of new contact', function () {
                expect(location.path()).toEqual('/');
            });

        });

    });

})();