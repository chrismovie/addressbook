(function () {

    'use strict';

    addressbook.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'AddressBookController' 
            })
            .when('/edit/:userid', {
                templateUrl: 'views/edit.html',
                controller: 'EditContactController' 
            })
            .when('/create', {
                templateUrl: 'views/edit.html',
                controller: 'CreateContactController' 
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController' 
            })
            .when('/myuser', {
                templateUrl: 'views/myuser.html',
                controller: 'MyUserController' 
            })
            .when('/contact-print-list', {
                templateUrl: 'views/contacts-printable-list.html',
                controller: 'ContactPrintListController' 
            })
            .otherwise({
                redirectTo: '/'
            });
    });

})();