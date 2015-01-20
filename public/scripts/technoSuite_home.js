var technoSuite = angular.module('technoSuite', ['ngRoute', 'ui.bootstrap', 'textAngular', 'ngResource', 'ngSanitize']);

technoSuite.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
			when('/content/:name/:category', {
                templateUrl: 'partials/content.html',
                controller: 'mainController'			
			}).
            when('/addSuite', {
                templateUrl: 'partials/add_tech_suite.html',
                controller: 'mainController'
            }).
            when('/listArticles', {
                templateUrl: 'partials/list_articles.html',
                controller: 'listController'
            }).			
            otherwise({
                redirectTo: "/content/html/0"
            });

    }]);
