// http://dev.markitondemand.com/Api/v2/Quote/json?symbol=AAPL
// http://dev.markitondemand.com/Api/v2/Lookup/json?input=apple
'use strict';

import './module';

import './controllers/home';
import './controllers/add';
import './controllers/stocks';

import './config'


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
