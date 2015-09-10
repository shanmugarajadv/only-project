/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('addDevelopersController', ['$scope', 'Developers', 'Role', function ($scope, Developers, Role) {

    $scope.showModal = false;
    $scope.addDevelopersSuccess = false;
    $scope.showDeleteModal = false;
    $scope.projectDetails = {};
    $scope.projectDetails.projectName = "WAVI";
    
    $scope.developersList = [{"id": "jsingara", "name": "Jeyasarathi", "createdOn": "2015-09-10 00:00:00"}
      , {"id": "nvanniya", "name": "Nithyanandam", "createdOn": "2015-09-10 00:00:00"}];
    
    $scope.developerRoleMap = {"developerName": "", "developerID": ""
      , "roles": [{"role": "Development", "efforPercent": "50", "startDate": "2015-09-10 00:00:00", "endDate": "2015-09-10 00:00:00"}]};
    
    
			Developers.get({"projectName": $scope.projectDetails.projectName}, function (data) {
				console.log(data);
			});     
    /**
     * Function to show/hide modal window for adding new Technology
     */
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
        $scope.addDevelopersSuccess = false;
    };

    /**
     * Function to show/hide modal window for deleting a Technology
     */
    $scope.toggleDeleteModal = function () {
        $scope.showDeleteModal = !$scope.showDeleteModal;
    };
        
    /**
     * Function to add article and its details
     */
    $scope.addDeveloper = function () {
		
		var details = {"projectName": $scope.projectDetails.projectName, "developersList": $scope.developerRoleMap};
		
		console.log(details);
				
        Developers.save(details, function () {
            $scope.addDevelopersSuccess = true;
        });
    };

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

    $scope.addRole = function (role) {
		
		var newRole = {"role": "", "efforPercent": "10", "startDate": "", "endDate": ""};
		
  var id = $scope.developerRoleMap.roles.length + 1;
  var found = $scope.developerRoleMap.roles.some(function (el) {
    return el.role === role;
  });
  if (!found) { $scope.developerRoleMap.roles.push(newRole); }
  		
    };
    
    $scope.deleteRole = function (role) {
		
		removeByAttr($scope.developerRoleMap.roles, 'role', role);

    };    
}]);
