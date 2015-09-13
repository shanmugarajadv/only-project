/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('addProjectsController', ['$scope', 'Projects', function ($scope, Projects) {
    $scope.addProjectsSuccess = false;
    $scope.projectDetails = {};

    $scope.projectStatus = [{name: "Open", id: 1}, {name: "In Development", id: 2}, {name: "SIT", id: 3}
        , { name: "UAT", id: 4 } , {name: "PRD", id: 5}, {name: "Closed", id: 6}];

    $scope.projectsList = {};

    $scope.addProjects = function () {
        console.log($scope.projectDetails);
        Projects.save($scope.projectDetails, function () {
            $scope.addProjectsSuccess = true;
        });
    };
    
    $scope.totalItems = 0; // Variable containing the count of the total number of items for the particular Technology and Category
    $scope.currentPage = 1; // Variable to store the current page the user is in
    $scope.entries = 5; // Variable to configure the number of entries to be displayed per page
    $scope.maxSize = 6; // Variable to configure the maximum length of the pagination element
    $scope.projectString = "project"; // Variable to change the singular and plurality of the message to be displayed above the table

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
    Projects.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
      
        $scope.totalItems = data[0].count;
        $scope.changeProjectsString($scope.totalItems);
        $scope.projectsList = data[1].projects;
    });

    /**
     * Function to delete an article from the list
     * @param articleName Name of the article to be displayed
     */
    $scope.remove = function (projectName) {
        Projects.delete({id: projectName}, function () {
            $scope.success_message = "Projects removed from the list successfully";
			Projects.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
				$scope.totalItems = data[0].count;
        $scope.changeProjectsString($scope.totalItems);
        $scope.projectsList = data[1].projects;
			});
        });
    };

    /**
     * Function to fetch the details whenever the page is changed
     */
    $scope.pageChanged = function () {
        Projects.get({"id": $scope.currentPage, "category": $scope.entries, "list": true}, function (data) {
            $scope.totalItems = data[0].count;
            $scope.changeProjectsString($scope.totalItems);
            $scope.projectsList = data[1].projects;
        });
    };

    /**
     * Function to change the message when the count of the articles changes
     * @param count Count of the number of articles
     */
    $scope.changeProjectsString = function(count) {
        if (count > 1) {
            $scope.projectString = "projects";
        }
        else {
            $scope.projectString = "project";
        }
    };

  $scope.today = function() {
    $scope.projectDetails.sitDate = new Date();
    $scope.projectDetails.startDate = new Date();
    $scope.projectDetails.uatDate = new Date();
    $scope.projectDetails.prdDate = new Date();
  };
  $scope.today();

  $scope.calendarState = {"startDate" : { "opened" : false }, "sitDate" : { "opened" : false }, "uatDate" : { "opened" : false }
     , "prdDate" : { "opened" : false }};
  
  $scope.clear = function () {
    $scope.sitDate = null;
    $scope.projectDetails.startDate = null;
    $scope.projectDetails.uatDate = null;
    $scope.projectDetails.prdDate = null;
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
     /*
     Project Name
     Start Date
     End date
     Developers with %
     SIT Date
     UAT Date
     PRD Date
     Status
     Comments
     Project Manager
     */
}]);
