(function () {

    'use strict';

    // BaseController
    addressbook.controller('BaseController', ['$scope', '$location', '$cookieStore', function ($scope, $location, $cookieStore) {

        $scope.$on('$routeChangeSuccess', function () {
            if (!$cookieStore.get('loggedIn')) {
                $location.path('/login');
            }
        });

        $scope.logout = function () {
            $cookieStore.remove('loggedIn');
        };

    }]);

    // LoginController
    addressbook.controller('LoginController', ['$scope', '$log', '$location', '$cookieStore', 'API', function ($scope, $log, $location, $cookieStore, API) {

        $scope.model      = {};
        $scope.loginError = false;

        $scope.authenticateUser = function () {
            $scope.showLoader();
            API.httpRequest({ url: '/api/authenticateUser', method: 'POST', isArray: false }).query($scope.model, 
                function (res) {
                    if (res.status === 'success') {
                        $scope.model = {};
                        $cookieStore.put('loggedIn', true);
                        $location.path('/');
                    }
                    else {
                        $scope.loginError = true;
                    }
                    $scope.hideLoader();
                }, 
                function (error) {
                    $scope.hideLoader();
                    $log.debug(error);
                }
            );
        };

    }]);

    // AddressBookController 
    addressbook.controller('AddressBookController', ['$scope', '$log', '$cookieStore', 'API', function ($scope, $log,  $cookieStore, API) {

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showLoader();
            $scope.toTop();
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
    addressbook.controller('EditContactController', ['$scope', '$log', '$routeParams', '$cookieStore', '$location', 'API', function ($scope, $log, $routeParams, $cookieStore, $location, API) {

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showLoader();
        });

        $scope.action = 'edit';

        API.httpRequest({ url: '/api/getContactById/' + $routeParams.userid, isArray: false }).query(
            function (res) {
                $scope.model = res;
                $scope.hideLoader();
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
    addressbook.controller('CreateContactController', ['$scope', '$log', '$location', '$cookieStore', 'API', function ($scope, $log, $location, $cookieStore, API) {

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