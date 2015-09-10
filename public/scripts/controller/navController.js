
/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('navController', ['$scope', '$location', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);
