technoSuite.controller('listController', function ($scope, $routeParams, Article) {
    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

	Article.query(function(data){
		console.log(JSON.stringify(data));
		$scope.articles = data;
	});
});
