var emoApp = angular.module('empDetails', ['infinite-scroll']);
emoApp.constant('chunkSize', 10);
emoApp.controller('empListCtrl', function($scope, $http, chunkSize) {
    $scope.rangeSearch = 0;
    var start = 0;
    $scope.pages = 0;
    var number;
    $scope.getNumber = function(count) {
        number = count;
        var call = [];
        var i;
        for (i = 0; i < number; i++) {
            call.push(i);
        }
        return call;
    }
    $scope.getlowNumber = function() {
        var call = [];
        var i;
        for (i = number; i < 10; i++) {
            call.push(i);
        }
        return call;
    }

    $http.get('inc/employee.json').success(function(empdata) {
        $scope.itemsList = [];
        $scope.total=empdata.length;
        var totalNoPages = Math.ceil(empdata.length / chunkSize);
        $scope.loadMoreData = function() {
            $scope.pages++;
            var rowsLimit = chunkSize * $scope.pages;
            if ($scope.pages <= totalNoPages && $scope.itemsList.length <= empdata.length) {
                var result = empdata.slice(start, rowsLimit);
                start = rowsLimit;
                for (var i = 0; i < result.length; i++) {
                    $scope.itemsList.push(result[i]);
                }
            }
        };
        $scope.loadMoreData();
    });
    $http.get('inc/citiesList.json').success(function(citiesdata) {
        $scope.citiesList = citiesdata;
    });
    $http.get('inc/industryList.json').success(function(industrydata) {
        $scope.industryList = industrydata;
    });
});
emoApp.filter('rangeFilter', function() {
    return function(input, expRange) {
        if (expRange == undefined || expRange == 0)
            return input;
        var filtered = [];
        var min = 0;
        var max = parseInt(expRange);
        angular.forEach(input, function(item) {
            if (item.exp == max) {
                filtered.push(item);
            }
        });
        return filtered;
    }
});
emoApp.filter('locationFilter', function() {
    return function(input, locations) {
        var filtered = [];
        var min = 0;
        if (locations == undefined)
            return input;
        else
            var locArray = locations.split(',');
        for (var i = 0; i < locArray.length; i++) {
            angular.forEach(input, function(item) {
                if (item.ct.indexOf(locArray[i]) > -1) {
                    filtered.push(item);
                }
            });
        }
        return filtered;
    }
});
emoApp.filter('industryFilter', function() {
    return function(input, industry) {
        var filtered = [];
        var min = 0;
        if (industry == undefined)
            return input;
        else
            var industryArray = industry.split(',');
        for (var i = 0; i < industryArray.length; i++) {
            angular.forEach(input, function(item) {
                if (item.org.indexOf(industryArray[i]) > -1) {
                    filtered.push(item);
                }
            });
        }
        return filtered;
    }
});
/*emoApp.directive('autoFillSync', function($timeout) {
   return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ngModel) {
          var origVal = elem.val();
          $timeout(function () {
              var newVal = elem.val();
              if(ngModel.$pristine && origVal !== newVal) {
                  ngModel.$setViewValue(newVal);
              }
          }, 500);
      }
   }
});*/
