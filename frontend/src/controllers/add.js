app.controller('addController', function ($scope, $http, stockSearch, Tracked) {
  $scope.message = 'Type a symbol or company name.';

  $scope.lookup = function () {
    $scope.results = stockSearch.getStock($scope.stock);
  }

  $scope.addStock = function () {
    Tracked.create($scope.name)
      .then(function (data) {
        console.log(data);
        $scope.stocklist = data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});