/**
 * Controller to handle operations when listing and deleting the articles
 */
technoSuite.controller('listController', [ '$scope', '$routeParams', 'Article', function ($scope, $routeParams, Article) {
    $scope.totalItems = 0; // Variable containing the count of the total number of items for the particular Technology and Category
    $scope.currentPage = 1; // Variable to store the current page the user is in
    $scope.entries = 5; // Variable to configure the number of entries to be displayed per page
    $scope.maxSize = 6; // Variable to configure the maximum length of the pagination element
    $scope.articleString = "article"; // Variable to change the singular and plurality of the message to be displayed above the table

    // Initialize the sort variables
    $scope.sort = {
        column: '',
        descending: false
    };

    /**
     *  Function to change the sort variables for the orderBy filter to sort the table
     */
    $scope.changeSorting = function (column) {

        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    // Show and Hide the current sorting order
    $scope.selectedCls = function (column) {
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    };

    /**
     * Function to fetch all the articles to be listed in the page
     */
    Article.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
        $scope.totalItems = data[0].count;
        $scope.changeArticleString($scope.totalItems);
        $scope.articles = data[1].articles;
    });

    /**
     * Function to delete an article from the list
     * @param articleName Name of the article to be displayed
     */
    $scope.remove = function (articleName) {
        Article.delete({id: articleName}, function () {
            $scope.success_message = "Article removed from the list successfully";
			Article.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
				$scope.totalItems = data[0].count;
				$scope.changeArticleString($scope.totalItems);
				$scope.articles = data[1].articles;
			});
        });
    };

    /**
     * Function to fetch the details whenever the page is changed
     */
    $scope.pageChanged = function () {
        Article.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
            $scope.totalItems = data[0].count;
            $scope.changeArticleString($scope.totalItems);
            $scope.articles = data[1].articles;
        });
    };

    /**
     * Function to change the message when the count of the articles changes
     * @param count Count of the number of articles
     */
    $scope.changeArticleString = function(count) {
        if (count > 1) {
            $scope.articleString = "articles";
        }
        else {
            $scope.articleString = "article";
        }
    };
}]);
