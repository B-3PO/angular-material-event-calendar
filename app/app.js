angular.module('eventCalendarApp', [
  'ngRoute',
  'ngAnimate',
  'ngMaterial',
  'material.components.eventCalendar'
])
  .config(configApp);


configApp.$inject = ['$routeProvider'];
function configApp($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .otherwise('/');
}
