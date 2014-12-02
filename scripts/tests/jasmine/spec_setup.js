var 
    scope, 
    ctrl, 
    $httpBackend, 
    model, 
    controller, 
    reqURL, 
    element, 
    scope, 
    $compile
;

// creates and compiles and Angular element
var createElement = function  ($el) {
    element = angular.element($el);
    $compile(element)(scope);
    scope.$digest();
};

var contacts = [
    {
        "id": 1,
        "userid": 12345,
        "firstName": "Dave",
        "lastname": "Simpson",
        "imgurl": "/images/default_profile_img.png",
        "email": "dsimpson@gmail.com",
        "homephone": "312-556-7890",
        "cellphone": "224-555-6789",
        "workphone": "773-789-6654",
        "address": "1913 Linden Ave",
        "address2": "",
        "city": "Chicago",
        "state": "IL",
        "zip": "60631"
    },
    {
        "id": 1,
        "userid": 44567,
        "firstName": "Fred",
        "lastname": "Wilson",
        "imgurl": "/images/default_profile_img.png",
        "email": "fwilson@gmail.com",
        "homephone": "312-556-7890",
        "cellphone": "224-555-6789",
        "workphone": "773-789-6654",
        "address": "2304 Devon Ave",
        "address2": "",
        "city": "Chicago",
        "state": "IL",
        "zip": "60631"
    }
];

var contact = {
    "id": 1,
    "userid": 12345,
    "firstName": "Dave",
    "lastname": "Simpson",
    "imgurl": "/images/default_profile_img.png",
    "email": "dsimpson@gmail.com",
    "homephone": "312-556-7890",
    "cellphone": "224-555-6789",
    "workphone": "773-789-6654",
    "address": "1913 Linden Ave",
    "address2": "",
    "city": "Chicago",
    "state": "IL",
    "zip": "60631"
};

var deleteResponse = { 
    "fieldCount": 0,
    "affectedRows": 2,
    "insertId": 0,
    "serverStatus": 34,
    "warningCount": 0,
    "message": "" 
};

beforeEach(function () {
    var app = module('addressbook');
    jasmine.getFixtures().fixturesPath = 'http://localhost:3000/public';
});