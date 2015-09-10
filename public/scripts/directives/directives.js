/**
 * Directive to display the header using custom directives (element)
 */
technoSuite.directive("headerNav", function () {

    return {
        restrict: 'AE',
        templateUrl: "templates/header-nav.html"
    };

});

/**
 * Directive to display the footer using custom directives (element)
 */
technoSuite.directive("myFooter", function () {

    return {
        restrict: 'AE',
        templateUrl: "templates/footer.html"
    };

});

/**
 * Directive to display the side bar using custom directives (element)
 */
technoSuite.directive("mySideBar", function () {

    return {
        restrict: 'AE',
        templateUrl: "templates/side-bar-acc.html"
    };

});

/**
 * Directive to display the article navigation bar using custom directives (element)
 */
technoSuite.directive("articleNav", function () {

    return {
        restrict: 'AE',
        templateUrl: "templates/article-nav.html"
    };

});

/**
 * Directive to display the article navigation bar using custom directives (element)
 */
technoSuite.directive("projectNav", function () {

    return {
        restrict: 'AE',
        templateUrl: "templates/projects-nav.html"
    };

});

/**
 * Directive to display the modal window using custom directives (element)
 */
technoSuite.directive('modal', function () {
    return {
        template: '<div class="modal fade col-sm-10">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
  
technoSuite.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);  
