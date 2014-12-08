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
            expect(scope.action).toBe('update');
        });

        it('scope.model should be defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('should set scope.model.userid with userid passed in the $routeParams', function () {
            expect(scope.model.userid).toBe(12345);
        });

        describe('Method > submitForm', function () {
            
            beforeEach(function () {
                location.path('/edit/12345');
                spyOn(scope, 'getProfileImg').and.returnValue('/images/default_profile_img.png');
                $httpBackend.expectPOST('/api/editContact/12345').respond(updateResponse);
                scope.submitForm();
                $httpBackend.flush();
            });

            it('should redirect bact to "/" on successful update', function () {
                expect(location.path()).toEqual('/');
            });

        });

    });

})();