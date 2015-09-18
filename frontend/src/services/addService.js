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


    this.getData = function(symbol) {
      console.log('add stock clicked');
      console.log(symbol);

    }


  });
