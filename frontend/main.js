var app = angular.module('stocktest', []);

app.controller('testCtrl', function ($scope, Tracked) {

  Tracked.read()
    .then(function(data){
      console.log(data);
      $scope.stocklist = data.data;
    })
    .catch(function(error){
      console.log(error);
  });

  $scope.addStock = function() {
    Tracked.create($scope.stock)
      .then(function(data){
        console.log(data);
        $scope.stocklist = data.data;
      })
      .catch(function(error){
        console.log(error);
      });
  }
});

app.constant('apiURL', 'http://localhost:3000/')

app.factory('Tracked', function ($http, apiURL) {
  var Tracked = function () {};

  Tracked.read = function () {
    return $http.get(apiURL + '/tracked');
  }

  Tracked.create = function (symbol) {
    return $http.post(apiURL + '/tracked', {newSymbol: symbol});
  }

  return Tracked;
});
