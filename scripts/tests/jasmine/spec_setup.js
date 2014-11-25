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

beforeEach(function () {
    var app = module('addressbook');
    jasmine.getFixtures().fixturesPath = 'http://localhost:3000/public';
});