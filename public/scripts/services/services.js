/**
 * Custom service do CRUD operations of Articles using RESTful services
 */
technoSuite.factory('Article', function ($resource) {
    return $resource("/article/:id/:category/:list/:entries", {}, {
        get: {method: "GET", isArray: true},
        update: {method: 'PUT'}
    });
});

/**
 * Custom service do CRUD operations of Technology using RESTful services
 */
technoSuite.factory('Technology', function ($resource) {
    return $resource("/tech/:id", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

/**
 * Custom service do CRUD operations of Category using RESTful services
 */
technoSuite.factory('Category', function ($resource) {
    return $resource("/category", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

/**
 * Custom service do CRUD operations of Technology Type using RESTful services
 */
technoSuite.factory('TechType', function ($resource) {
    return $resource("/techType", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

/**
 * Custom service do CRUD operations of Technology Type using RESTful services
 */
technoSuite.factory('Developers', function ($resource) {
    return $resource("/developers/:projectName", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

technoSuite.factory('Role', function ($resource) {
    return $resource("/role", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});
