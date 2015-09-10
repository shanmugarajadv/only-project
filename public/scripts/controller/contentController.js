/**
 * Controller to handle operations when displaying the article for particular Technology and Category
 */
technoSuite.controller('contentController', ['$scope', '$routeParams', 'Article', function ($scope, $routeParams, Article) {
    $scope.totalItems = 0; // Variable containing the count of the total number of items for the particular Technology and Category
    $scope.currentPage = 1; // Variable to store the current page the user is in
    $scope.entries = 5; // Variable to configure the number of entries to be displayed per page
    $scope.maxSize = 6; // Variable to configure the maximum length of the pagination element


    if ($routeParams.name) {

        $scope.name = String($routeParams.name);
        $scope.category = parseInt($routeParams.category);
        var pageTitle = $scope.name;

	/*	var links = {
		"HTML": "https://tech.cognizant.com/online/etrade/Account%20General/Forms/AllItems.aspx?RootFolder=%2Fonline%2Fetrade%2FAccount%20General%2FETRADE%20Artifacts%2FWebdev%20Code%2FKnowledge%20Repository%2FHTML&View={EDCC774C-7754-46B9-A306-EDDEE0EAE364}&InitialTabId=Ribbon.Document&VisibilityContext=WSSTabPersistence"
		, "CSS": "https://tech.cognizant.com/online/etrade/Account%20General/Forms/AllItems.aspx?RootFolder=%2Fonline%2Fetrade%2FAccount%20General%2FETRADE%20Artifacts%2FWebdev%20Code%2FKnowledge%20Repository%2FCSS&FolderCTID=0x012000A80CFF0CA71CEC43B093252BC1AC3288&View={EDCC774C-7754-46B9-A306-EDDEE0EAE364}&InitialTabId=Ribbon.Document&VisibilityContext=WSSTabPersistence"
		, "JS": "https://tech.cognizant.com/online/etrade/Account%20General/Forms/AllItems.aspx?RootFolder=%2Fonline%2Fetrade%2FAccount%20General%2FETRADE%20Artifacts%2FWebdev%20Code%2FKnowledge%20Repository%2FJavaScript&FolderCTID=0x012000A80CFF0CA71CEC43B093252BC1AC3288&View={EDCC774C-7754-46B9-A306-EDDEE0EAE364}&InitialTabId=Ribbon.Document&VisibilityContext=WSSTabPersistence"
		, "AngularJS": "https://tech.cognizant.com/online/etrade/Account%20General/Forms/AllItems.aspx?RootFolder=%2Fonline%2Fetrade%2FAccount%20General%2FETRADE%20Artifacts%2FWebdev%20Code%2FKnowledge%20Repository%2FAngularJS&FolderCTID=0x012000A80CFF0CA71CEC43B093252BC1AC3288&View={EDCC774C-7754-46B9-A306-EDDEE0EAE364}"
		, "jQuery": "https://tech.cognizant.com/online/etrade/Account%20General/Forms/AllItems.aspx?RootFolder=%2Fonline%2Fetrade%2FAccount%20General%2FETRADE%20Artifacts%2FWebdev%20Code%2FKnowledge%20Repository%2FjQuery&FolderCTID=0x012000A80CFF0CA71CEC43B093252BC1AC3288&View={EDCC774C-7754-46B9-A306-EDDEE0EAE364}&InitialTabId=Ribbon.Document&VisibilityContext=WSSTabPersistence"
		};
		*/
		var links = {
		"HTML": "/uploads/HTML/"
		, "CSS": "/uploads/CSS"
		, "JS": "/uploads/JavaScript"
		, "AngularJS": "/uploads/AngularJS"
		, "jQuery": "/uploads/jQuery"
		, "Bootstrap": "/uploads/Bootstrap"
		};
		
		$scope.downloadLink = links[$scope.pageTitle];
		
        /**
         * Function to fetch all the article for the selected Technology and Category
         */
        Article.get({
            "id": $scope.name,
            "category": $scope.category,
            "list": $scope.currentPage,
            "entries": $scope.entries
        }, function (data) {
            $scope.totalItems = data[0].count;
            $scope.articles = data[1].articles;
        });

        switch ($scope.category) {
            case 1:
                var pageTitle = pageTitle + " - " + "Best Practices";
                break;
            case 2:
                var pageTitle = pageTitle + " - " + "Troubleshooting";
                break;
            case 3:
                var pageTitle = pageTitle + " - " + "Live Demo";
                break;
        }

        $scope.pageTitle = pageTitle;
    }

    /**
     * Function to fetch the details whenever the page is changed
     */
    $scope.contentPageChanged = function () {
        Article.get({
            "id": $scope.name,
            "category": $scope.category,
            "list": $scope.currentPage,
            "entries": $scope.entries
        }, function (data) {
            $scope.totalItems = data[0].count;
            $scope.articles = data[1].articles;
        });
    };

    /**
     * Function to show/hide modal window for adding new Technology
     */
    $scope.toggleUploadModal = function () {
        $scope.showModal = !$scope.showModal;
        $scope.uploadSuccess = false;
    };

}]);
