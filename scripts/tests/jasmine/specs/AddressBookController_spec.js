(function () {

    'use strict';

    describe('AddressBookController', function () {

        var location, rootScope, cookieStore;

        beforeEach(inject(function(_$compile_, _$httpBackend_, $rootScope, $cookieStore, $location, $controller) {
            
            $httpBackend = _$httpBackend_;
            rootScope    = $rootScope;
            cookieStore  = $cookieStore;
            location     = $location;
            scope        = $rootScope.$new();
            $compile     = _$compile_;

            $httpBackend.expectGET('/api/getAllContacts').respond(contacts);
            
            ctrl         = $controller('AddressBookController', {$scope:scope});

            createElement('<div global-directives />');
            $httpBackend.flush();
        }));

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should populate scope.model with contacts', function () {
            expect(scope.model.length).toBeGreaterThan(0);
        });

        describe('Method > showConfirmationDialog', function () {

            beforeEach(function () {
                scope.showConfirmationDialog(12345);
            });

            it('should set the value of scope.showDialog to true', function () {
                expect(scope.showDialog).toBeTruthy();
            });

            it('should set the calue if scope.deleteId to 12345', function () {
                expect(scope.deleteId).toBe(12345);
            });

        });

        describe('Method > cancelDelete', function () {

            beforeEach(function () {
                scope.showConfirmationDialog(12345);
            });
            
            it('should set the value of scope.showDialog to true', function () {
                scope.cancelDelete();
                expect(scope.showDialog).toBeFalsy();
            });

        });

        describe('Method > deleteContact', function () {

            beforeEach(function () {
                scope.model      = contacts;
                scope.showDialog = true;
                scope.deleteId   = 12345;
                $httpBackend.expectPOST('/api/deleteContact/12345').respond(updateResponse);
                scope.deleteContact(scope.deleteId);
                $httpBackend.flush();
            });
            
            it('should remove the selected contact from the model', function () {
                expect(scope.model.length).toBe(1);
            });

            it('should set the value of scope.deleteId to null', function () {
                expect(scope.deleteId).toBe(null);
            });

            it('should set the value of scope.showDialog to false', function () {
                expect(scope.showDialog).toBeFalsy();
            });

        });

    });

})();