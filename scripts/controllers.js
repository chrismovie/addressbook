(function () {

    'use strict';

    // AddressBookController 
    addressbook.controller('AddressBookController', ['$scope', '$log', '$cookieStore', '$window', '$timeout', 'API', function ($scope, $log,  $cookieStore, $window, $timeout, API) {

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showLoader();
            $scope.getAllContacts();
            $scope.toTop();
        });

        $scope.getAllContacts = function () {
            API.httpRequest({ url: '/api/getAllContacts' }).query(
                function (res) {
                    $scope.model = res;
                    $scope.hideLoader();
                }, 
                function (error) {
                    $log.debug(error);
                }
            );
        };

        $scope.toggleAsFavorite = function (userid, isFavorite) {
            $scope.showLoader();
            API.httpRequest({ url: '/api/toogleAsFavorite/' + userid, method: 'POST', isArray: false }).query(
                { isFavorite: (isFavorite === 0 ? 1 : 0) },
                function (res) {
                    if (res.affectedRows > 0) {
                        $scope.getAllContacts();
                    }
                },
                function (error) {
                    $log.debug(error);
                }
            );
        };

        $scope.printContactList = function () {
            var newWin = $window.open('#/contact-print-list', '', 'top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            newWin.focus();
            $timeout(function () { newWin.print(); }, 800);
        };

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

    // BaseController
    addressbook.controller('BaseController', ['$scope', '$location', '$cookieStore', function ($scope, $location, $cookieStore) {

        $scope.$on('$routeChangeSuccess', function () {
            $scope.pagetitle = $scope.setPageTitle();
            if (!$cookieStore.get('session')) {
                $location.path('/login');
            }
        });

        $scope.setPageTitle = function () {
            return 'Address Book | ' + ($location.path() !== '/' ? $location.path().replace(/\/|[0-9]/g,'') : 'home');
        };

        $scope.logout = function () {
            $cookieStore.remove('session');
        };

    }]);

    // ContactPrintListController
    addressbook.controller('ContactPrintListController', ['$scope', 'API', function ($scope, API) {

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

    // CreateGroupController
    addressbook.controller('CreateGroupController', ['$scope', '$log', '$location', 'API', function ($scope, $log, $location, API) {

        $scope.formData = {};
        $scope.userids = [];

        API.httpRequest({ url: '/api/getAllContacts' }).query(
            function (res) {
                $scope.model = res;
                $scope.hideLoader();
            }, 
            function (error) {
                $log.debug(error);
            }
        );

        $scope.addOrRemoveFromGroup = function (userid) {
            var userIdIndex = $scope.userids.indexOf(userid);
            if (userIdIndex !== -1) {
                $scope.userids.splice(userIdIndex, 1);
            }
            else {
                $scope.userids.push(userid);
            }
        };

        $scope.submitForm = function () {
            
            $scope.formData.userids = $scope.userids;
            
            $scope.showConfirmation = false;
            $scope.showError        = false;

            API.httpRequest({ url: '/api/addContactGroup', method: 'POST', isArray: false }).query($scope.formData,
                function (res) {
                    if (res.affectedRows > 0) {
                        $scope.showConfirmation = true;
                    }
                    else {
                        $scope.showError = true;
                    }
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

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showLoader();
        });

        $scope.action = 'update';

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

    // LoginController
    addressbook.controller('LoginController', ['$scope', '$log', '$location', '$cookieStore', 'API', function ($scope, $log, $location, $cookieStore, API) {

        $scope.model      = {};
        $scope.loginError = false;

        $scope.authenticateUser = function () {
            $scope.showLoader();
            API.httpRequest({ url: '/api/authenticateUser', method: 'POST', isArray: false }).query($scope.model, 
                function (res) {
                    if (res.user !== null) {
                        $scope.model = {};
                        $cookieStore.put('session', { id: res.user.id, username: res.user.username } );
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

    // MyUserController
    addressbook.controller('MyUserController', ['$scope', '$log', '$cookieStore', 'API', function ($scope, $log, $cookieStore, API) {

        var cookie = $cookieStore.get('session');

        $scope.model           = {};
        $scope.model.username  = cookie.username;
        $scope.sessionid       = cookie.id;

        $scope.submitForm = function () {
            API.httpRequest({ url: '/api/updateUser/' + $scope.sessionid, method: 'POST', isArray: false }).query($scope.model, 
                function (res) {
                    if (res.affectedRows > 0) {
                        $cookieStore.put('session', { id: $scope.sessionid, username: $scope.model.username } );
                        $scope.userUpdated = true;
                        $scope.updatepasssword = null;
                        delete $scope.model.oldpassword;
                        delete $scope.model.newpassword;
                    }
                }, 
                function (error) {
                    $log.debug(error);
                }
            );
        };

    }]);

    // SendEmailController
    addressbook.controller('SendEmailController', ['$scope', '$log', '$routeParams', 'API', function ($scope, $log, $routeParams, API) {

        $scope.emailSent  = false;
        $scope.emailError = false;

        $scope.model = {
            recipient: $routeParams.email
        };

        $scope.submitForm = function () {
            $scope.showLoader();
            API.httpRequest({ url: '/api/sendEmail', method: 'POST', isArray: false }).query($scope.model,
                function (res) {
                    if (res.MessageID) {
                        delete $scope.model.name;
                        delete $scope.model.sender;
                        delete $scope.model.subject;
                        delete $scope.model.message;
                        $scope.showConfirmation = true;
                    }
                    else {
                        $scope.showError = true;
                    }
                    $scope.hideLoader();
                }, 
                function (error) {
                    $log.debug(error);
                }
            );
        };

    }]);

})();