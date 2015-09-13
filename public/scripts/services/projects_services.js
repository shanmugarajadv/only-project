
angular.module('projects').factory('Projects', function ($resource) {
    return $resource("/projects", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});