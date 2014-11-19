// AddressBookController controller
addressbook.controller('AddressBookController', ['$scope', '$log', 'API', function ($scope, $log, API) {

    $scope.title = 'Address Book';

    $scope.getAllContacts = function () { 
        API.httpRequest({ url: '/api/getAllContacts' }).query(
            function (res) {
                $scope.contacts = res;
            }, 
            function (error) {
                $log.debug(error);
            }
        );
    };

    $scope.getAllContacts();

}]);