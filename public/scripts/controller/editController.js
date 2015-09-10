/**
 * Controller to handle operations when updating the details of an article
 */
technoSuite.controller('editController', ['$scope', '$routeParams', 'Article', 'Technology', 'Category',function ($scope, $routeParams, Article, Technology, Category) {
    $scope.techsuite = {};
    $scope.editArticleSuccess = false;

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

    $scope.techsuite.articleTitle = $routeParams.name;

    /**
     * Function to fetch the details about the article to be updated
     */
    Article.get({id: $routeParams.name}, function (data) {
	    $scope.techsuite.tech = data[0].techName;
	    $scope.techsuite.category = data[0].category;
        $scope.techsuite.articlecontent = data[0].description;
    });

    /**
     * Function to update the details of the article
     */
    $scope.updateDetails = function () {
        Article.update($scope.techsuite, function () {
            $scope.editArticleSuccess = true;
        });

    };
}]);
