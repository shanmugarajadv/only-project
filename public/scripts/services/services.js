technoSuite.factory('Article', function ($resource) {
    return $resource("/article/:id/:category", {}, {
        get: {method: "GET", isArray: true},
        update: {method: 'PUT'}
    });
});

technoSuite.factory('Technology', function ($resource) {
    return $resource("/tech/:id", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

technoSuite.factory('Category', function ($resource) {
    return $resource("/category", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});

technoSuite.factory('TechType', function ($resource) {
    return $resource("/techType", {}, {
        get: {method: "GET"},
        update: {method: 'PUT'}
    });
});