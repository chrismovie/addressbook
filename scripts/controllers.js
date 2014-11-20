(function () {

    'use strict';

    // AddressBookController 
    addressbook.controller('AddressBookController', ['$scope', '$log', 'API', function ($scope, $log, API) {

        API.httpRequest({ url: '/api/getAllContacts' }).query(
            function (res) {
                $scope.model = res;
            }, 
            function (error) {
                $log.debug(error);
            }
        );

    }]);


    // EditContactController
    addressbook.controller('EditContactController', ['$scope', '$log', '$routeParams', 'API', function ($scope, $log, $routeParams, API) {

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
            $scope.model.imgurl = $scope.getProfileImg();
            API.httpRequest({ url: '/api/editContact/' + $routeParams.userid, method: 'POST' }).query($scope.model);
        };

    }]);

    // CreateContactController
    addressbook.controller('CreateContactController', ['$scope', '$log', 'API', function ($scope, $log, API) {

        $scope.action = 'create';
        $scope.model = {};

        $scope.submitForm = function () {

        };

    }]);

})();