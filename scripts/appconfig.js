// Main application namespance
var addressbook = angular.module('addressbook', ['ngSanitize', 'ngRoute', 'ngCookies', 'services', 'directives']);

// Services namespace
var services    = angular.module('services', ['ngResource']);

// Directives namespace
var directives  = angular.module('directives', []);