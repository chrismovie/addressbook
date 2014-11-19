// Main application namespance
var addressbook = angular.module('addressbook', ['ngSanitize','services']);

// Services namespace
var services    = angular.module('services', ['ngResource']);

// Directives namespace
var directives  = angular.module('directives', []);