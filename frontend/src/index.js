// http://dev.markitondemand.com/Api/v2/Quote/json?symbol=AAPL
// http://dev.markitondemand.com/Api/v2/Lookup/json?input=apple

var app = angular.module('stockApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })
            .when('/add', {
                templateUrl : 'pages/add.html',
                controller  : 'addController'
            })
            .when('/stocks', {
                templateUrl : 'pages/stocks.html',
                controller  : 'stocksController'
            });
    });

    // create the controller and inject Angular's $scope
    app.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Lets get started!';
    });

    app.controller('addController', function($scope, $http, stockSearch, Tracked) {
        $scope.message = 'Type a symbol or company name.';

        $scope.lookup = function() {
          $scope.results = stockSearch.getStock($scope.stock);
        }

        $scope.addStock = function() {
          Tracked.create($scope.name)
            .then(function(data){
              console.log(data);
              $scope.stocklist = data.data;
            })
            .catch(function(error){
              console.log(error);
            });
        }
    });
    
    app.controller('stocksController', function($scope, Tracked) {
        $scope.message = 'Here are your stocks:';

        Tracked.read()
          .then(function(data){
            console.log(data);
            $scope.stocklist = data.data;
          })
          .catch(function(error){
            console.log(error);
        });

        $scope.remove = function(){
          if (typeof($scope.name)!== 'undefined') {
          for (var i = 0; i < symbolList.length; i++) {
            if (symbolList[i] === $scope.name) {
              console.log('before',symbolList);
              hasRemove = 1;
              symbolList.splice(i, 1);
              $scope.list = symbolList;
              console.log('after',symbolList);
              break;
            };
          }
          }
        };


    });

//////////////////////////////////////////////////
app.service('stockSearch', function($http){
  this.getStock = function(link) {
    var stocks = [];
    $http.jsonp('http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input='+ link + '&callback=JSON_CALLBACK')
      .success(function(data){
        for (var i=0; i<data.length; i++){
          stocks.push({
            name: data[i].Name,
            symb: data[i].Symbol
          });
        }
        console.log(stocks);
      })
      .error( function(error){
        console.log(error);
      });
      return stocks;
    };
  });

  app.constant('apiURL', 'http://localhost:8000')

  app.factory('Tracked', function ($http, apiURL) {
    var Tracked = function () {};

    Tracked.read = function () {
      return $http.get(apiURL + '/tracked');
    }

    Tracked.create = function (symbol) {
      console.log(symbol);
      return $http.post(apiURL + '/tracked', {newSymbol: symbol});
    }

    return Tracked;
  });
