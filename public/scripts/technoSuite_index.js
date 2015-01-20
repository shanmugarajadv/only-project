var technoSuite = angular.module('technoSuite', ['ngRoute']);

technoSuite.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/html', {
                templateUrl: 'partials/html_content.html',
                controller: 'mainController'
            }).
            when('/htmlDemo', {
                templateUrl: 'partials/html_demo.html',
                controller: 'mainController'
            }).
            when('/htmlTroubleshoot', {
                templateUrl: 'partials/html_troubleshoot.html',
                controller: 'mainController'
            }).
            when('/htmlBestPractices', {
                templateUrl: 'partials/html_best_practices.html',
                controller: 'mainController'
            }).
            otherwise({
                redirectTo: '/html'
            });
    }]);
