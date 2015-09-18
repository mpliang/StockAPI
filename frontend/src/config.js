app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/pages/home.html',
      controller: 'mainController'
    })
    .state('add', {
      url: '/add',
      templateUrl: '/pages/add.html',
      controller: 'addController'
    })
    .state('stocks', {
      url: '/stocks',
      templateUrl: '/pages/stocks.html',
      controller: 'stocksController'
    })
});
