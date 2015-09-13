/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('addDevelopersController', ['$scope', 'Developers', 'Projects', function ($scope, Developers, Projects) {

    $scope.showModal = false;
    $scope.addDevelopersSuccess = false;
    $scope.showDeleteModal = false;
    $scope.projectDetails = {};
    $scope.selectedProjectDetails = {};
    $scope.selectedProjectDetails.projectName = "";

    $scope.developerRoleMap = {
        "developerName": "",
        "developerID": ""
        ,
        "roles": [{
            "role": "Development",
            "efforPercent": "50",
            "startDate": "2015-09-10 00:00:00",
            "endDate": "2015-09-10 00:00:00"
        }]
    };

    $scope.projects = Projects.query(function (data) {
        $scope.projectsList = data;
    });

    $scope.projects.$promise.then(function(){
      if ($scope.selectedProjectDetails.projectName != "") {
        Developers.get({"projectName": $scope.projectDetails.projectName}, function (data) {
            $scope.developersList = data;
        });
      }
    });

    $scope.getDevelopers = function () {
      console.log($scope.selectedProjectDetails.projectName);
      if ($scope.selectedProjectDetails.projectName != "") {
        Developers.get({"projectName": $scope.selectedProjectDetails.projectName}, function (data) {
            $scope.developersList = data;
        });
      }
    };
    
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

        if ($scope.projectDetails.projectName != "") {
          var details = {"projectName": $scope.selectedProjectDetails.projectName, "developersList": $scope.developerRoleMap};

          console.log(details);

          Developers.save(details, function () {
              $scope.addDevelopersSuccess = true;
          });
        }
    };

    var removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value )) {

                arr.splice(i, 1);

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
        if (!found) {
            $scope.developerRoleMap.roles.push(newRole);
        }

    };

    $scope.deleteRole = function (role) {

        removeByAttr($scope.developerRoleMap.roles, 'role', role);

    };
    
  $scope.today = function() {
    $scope.projectDetails.sitDate = new Date("2015-03-25");
    $scope.projectDetails.startDate = new Date("2015-03-25");
    $scope.projectDetails.uatDate = new Date("2015-03-25");
    $scope.projectDetails.prdDate = new Date("2015-03-25");
  };
  $scope.today();

  $scope.calendarState = {"startDate" : { "opened" : false }, "endDate" : { "opened" : false }, "uatDate" : { "opened" : false }
     , "prdDate" : { "opened" : false }};
  
  $scope.clear = function () {
    $scope.endDate = null;
    $scope.projectDetails.startDate = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.open = function($event, id) {
    $scope.calendarState[id].opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
      
}]);
