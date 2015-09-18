app.controller('stocksController', function ($scope, Tracked) {
  $scope.message = 'Here are your stocks:';

  Tracked.read()
    .then(function (data) {
      console.log(data);
      $scope.stocklist = data.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  $scope.remove = function () {
    if (typeof ($scope.name) !== 'undefined') {
      for (var i = 0; i < symbolList.length; i++) {
        if (symbolList[i] === $scope.name) {
          console.log('before', symbolList);
          hasRemove = 1;
          symbolList.splice(i, 1);
          $scope.list = symbolList;
          console.log('after', symbolList);
          break;
        };
      }
    }
  };
});