technoSuite.controller('addController', function ($scope, Article, Technology, Category, TechType) {
	$scope.techdetails = {};
	$scope.techsuite = {};
	
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
		$scope.addTechSuccess = false;
		$scope.techdetails.techName = "";
    };
	
	$scope.showDeleteModal = false;
    $scope.toggleDeleteModal = function(){
        $scope.showDeleteModal = !$scope.showDeleteModal;
    };
	
	$scope.techClassOptions = [{ name: "Client-Side", id: 1 }, { name: "Server-Side", id: 2 }];	
	$scope.techdetails.class = $scope.techClassOptions[0];

	Technology.query(function (data) {
		$scope.techOptions = data;
		$scope.techsuite.tech = $scope.techOptions[0];
	});

	Category.query(function (data) {
		$scope.category = data;
		$scope.techsuite.category = $scope.category[0];
	});

	TechType.query(function (data) {
		$scope.techType = data;
		$scope.techdetails.techType = $scope.techType[0];
	});
	
	$scope.addTechnology = function() {
        Technology.save($scope.techdetails, function () {
            $scope.addTechSuccess = true;
			
			Technology.query(function (data) {
				$scope.techOptions = data;
				$scope.techsuite.tech = $scope.techOptions[0];
			});
        });
	};
	
	$scope.deleteTechnology = function() {
	    Technology.delete({id: $scope.techsuite.tech.techName}, function () {
			$scope.showDeleteModal = false;
			
			Technology.query(function (data) {
				$scope.techOptions = data;
				$scope.techsuite.tech = $scope.techOptions[0];
			});
        });
	};
	
	$scope.addTechSuite = function() {
        Article.save($scope.techsuite, function () {
            console.log("Article Save Successfully");
        });	
	};
	
});
