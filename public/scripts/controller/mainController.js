/**
 * Controller to handle operations in the home.html page
 */
technoSuite.controller('mainController', ['$scope', function ($scope) {
    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

}]);
