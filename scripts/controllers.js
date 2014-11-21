(function () {

    'use strict';

    // AddressBookController 
    addressbook.controller('AddressBookController', ['$scope', '$log', 'API', function ($scope, $log, API) {

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showLoader();
        });

        API.httpRequest({ url: '/api/getAllContacts' }).query(
            function (res) {
                $scope.model = res;
                $scope.hideLoader();
            }, 
            function (error) {
                $log.debug(error);
            }
        );

        $scope.showConfirmationDialog = function (userid) {
            $scope.showDialog = true;
            $scope.deleteId   = userid;
        };

        $scope.cancelDelete = function () {
            $scope.showDialog = false;
        };

        $scope.deleteContact = function (userid) {
            $scope.showLoader();
            API.httpRequest({ url: '/api/deleteContact/' + userid, method: 'POST', isArray: false }).query(
                function (res) {
                    var updatedModel  = $scope.model.filter(function (item) { return item.userid !== $scope.deleteId; });
                    $scope.model      = updatedModel;
                    $scope.deleteId   = null;
                    $scope.showDialog = false;
                    $scope.hideLoader();
                },
                function (error) {
                    $log.debug(error);
                }
            );
        };

    }]);


    // EditContactController
    addressbook.controller('EditContactController', ['$scope', '$log', '$routeParams', '$location', 'API', function ($scope, $log, $routeParams, $location, API) {

        $scope.action = 'edit';

        API.httpRequest({ url: '/api/getContactById/' + $routeParams.userid, isArray: false }).query(
            function (res) {
                $scope.model = res;
            },
            function (error) {
                $log.debug(error);
            }
        );

        $scope.submitForm = function () {
            $scope.showLoader();
            $scope.model.imgurl = $scope.getProfileImg();
            API.httpRequest({ url: '/api/editContact/' + $routeParams.userid, method: 'POST', isArray:false }).query($scope.model, 
                function (res) {
                    if (res.affectedRows > 0) {
                        $location.path('/');
                    }
                }, function () {
                    $log.debug(error);
                }
            );
        };

    }]);

    // CreateContactController
    addressbook.controller('CreateContactController', ['$scope', '$log', '$location', 'API', function ($scope, $log, $location, API) {

        $scope.action = 'create';
        $scope.model = {};

        $scope.submitForm = function () {
            $scope.showLoader();
            $scope.model.imgurl = $scope.getProfileImg();
            $scope.model.userid = Math.round(Math.random() * 100000);
            API.httpRequest({ url: '/api/createContact', method: 'POST', isArray: false }).query($scope.model, 
                function (res) {
                    $location.path('/');
                }, 
                function (error) {
                    $log.debug(error);
                }
            );
        };

    }]);

})();