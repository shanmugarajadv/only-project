angular.module('projects', ['ngRoute', 'ui.bootstrap', 'ngResource']);

/**
 * Configure routing to map different views to different URLs
 */
angular.module('projects').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/addProjects', {
                templateUrl: 'partials/projects.html',
                controller: 'addProjectsController'
            }).
            when('/addDevelopers', {
                templateUrl: 'partials/developers.html',
                controller: 'addDevelopersController'
            }).
            otherwise({
                redirectTo: "/"
            });

    }]);
