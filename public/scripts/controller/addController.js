/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('addController', ['$scope', 'Article', 'Technology', 'Category', 'TechType', function ($scope, Article, Technology, Category, TechType) {
    $scope.techdetails = {}; // Object to store the technology user input details
    $scope.techsuite = {}; // Object to store the article user input details
    $scope.showModal = false;
    $scope.addTechSuccess = false;
    $scope.addArticleSuccess = false;
    $scope.showDeleteModal = false;

    /**
     * Function to show/hide modal window for adding new Technology
     */
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
        $scope.addTechSuccess = false;
        $scope.techdetails.techName = "";
    };

    /**
     * Function to show/hide modal window for deleting a Technology
     */
    $scope.toggleDeleteModal = function () {
        $scope.showDeleteModal = !$scope.showDeleteModal;
    };

    $scope.techClassOptions = [{name: "Client-Side", id: 1}, {name: "Server-Side", id: 2}];
    $scope.techdetails.class = $scope.techClassOptions[0];

    /**
     * Function to fetch all technologies
     */
    Technology.query(function (data) {
        $scope.techOptions = data;
        $scope.techsuite.tech = $scope.techOptions[0];
    });

    /**
     * Function to fetch all categories
     */
    Category.query(function (data) {
        $scope.category = data;
        $scope.techsuite.category = $scope.category[0];
    });

    /**
     * Function to fetch all technology types
     */
    TechType.query(function (data) {
        $scope.techType = data;
        $scope.techdetails.techType = $scope.techType[0];
    });

    /**
     * Function to add a Technology
     */
    $scope.addTechnology = function () {
        Technology.save($scope.techdetails, function () {
            $scope.addTechSuccess = true;

            Technology.query(function (data) {
                $scope.techOptions = data;
                $scope.techsuite.tech = $scope.techOptions[0];
            });
        });
    };

    /**
     * Function to delete a Technology
     */
    $scope.deleteTechnology = function () {
        Technology.delete({id: $scope.techsuite.tech.techName}, function () {
            $scope.showDeleteModal = false;

            Technology.query(function (data) {
                $scope.techOptions = data;
                $scope.techsuite.tech = $scope.techOptions[0];
            });
        });
    };

    /**
     * Function to add article and its details
     */
    $scope.addTechSuite = function () {
        Article.save($scope.techsuite, function () {
            $scope.addArticleSuccess = true;
        });
    };

}]);
