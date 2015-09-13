/**
 * Controller to handle operations when adding an article
 */
technoSuite.controller('employeesController', ['$scope', 'Article', 'Technology', 'Category', 'TechType', function ($scope, Article, Technology, Category, TechType) {

      var employees = ["Nithyanandam", "Prasenjit", "Thilagaraj", "Janani", "Ilayaraja" 
      , "Selvarani", "John Basa", "Saravana Kumar", "Krishnamoorthi", "Pooja", "Hari Prashanth"];
        
      var data = {};
      var data_series = [];
      var temp_data =
[
[1441065600000,50],
[1441152000000,90],
[1441238400000,100],
[1441324800000,100],
[1441670400000,10],
[1441756800000,50],
[1441843200000,85],
[1441929600000,90]
];

      employees.forEach(function(element, index) {
        data[element] = temp_data;
        var tmp_series = {
                type: 'column',
                name: element,
                data: data[element],
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            };
              
        data_series.push(tmp_series);
      });

        var groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]];

        // create the chart
        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Employee Effort %'
            },

            yAxis: [{},
            {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Employee Effort %'
                },
                top: '15%',
                height: '90%',
                offset: 0,
                lineWidth: 2
            }],

            series: data_series
        });
        
}]);
