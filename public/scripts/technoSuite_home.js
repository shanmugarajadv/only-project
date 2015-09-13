var technoSuite = angular.module('technoSuite', ['ngRoute', 'ui.bootstrap', 'textAngular', 'ngResource', 'ngSanitize', 'angularFileUpload', 'ngAnimate']);

/**
 * Configure routing to map different views to different URLs
 */
technoSuite.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/content/:name/:category', {
                templateUrl: 'partials/content.html',
                controller: 'contentController'
            }).
            when('/addSuite', {
                templateUrl: 'partials/add_tech_suite.html',
                controller: 'addController'
            }).
            when('/editArticle/:name', {
                templateUrl: 'partials/edit_tech_suite.html',
                controller: 'editController'
            }).
            when('/listArticles', {
                templateUrl: 'partials/list_articles.html',
                controller: 'listController'
            }).
            when('/addDevelopers', {
                templateUrl: 'partials/add_developers.html',
                controller: 'addDevelopersController'
            }).
            when('/addProjects', {
                templateUrl: 'partials/projects.html',
                controller: 'addProjectsController'
            }).
            when('/listProjects', {
                templateUrl: 'partials/list_projects.html',
                controller: 'addProjectsController'
            }).
            when('/employees', {
                templateUrl: 'partials/employees.html',
                controller: 'employeesController'
            }).            
            otherwise({
                redirectTo: "/content/HTML/0"
            });

    }]);
