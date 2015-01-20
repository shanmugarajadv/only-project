technoSuite.controller('mainController', function ($scope, $routeParams, Article) {
    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
	
	$scope.name = String($routeParams.name);
	$scope.category = parseInt($routeParams.category);
	var pageTitle = $scope.name.toUpperCase();
	
	if ($routeParams.name) {
		if ($scope.name == "angular") {
			pageTitle = "AngularJS";
		} else  if ($scope.name == "jq") {
			pageTitle = "jQuery";
		}
		
		Article.get({"id": $scope.name, "category": $scope.category}, function(data){
			$scope.articles = data;
		});		
	}

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
	};

	$scope.pageTitle = pageTitle;

});
