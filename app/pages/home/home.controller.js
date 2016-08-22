angular
  .module('eventCalendarApp')
  .controller('HomeController', HomeController);


function HomeController($scope, $timeout) {
  $scope.events = [
    {
      start: new Date(),
      label: 'Event One'
    },
    {
      start: new Date(),
      end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      label: 'Event Two Two Two'
    },
    {
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      label: 'Event Three'
    },
    {
      start: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      label: 'Event Three'
    },
    {
      start: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 144 * 60 * 60 * 1000),
      label: 'Event Four'
    }
  ];
  $scope.selected = $scope.events[0];


  // $timeout(function () {
  //   $scope.events.push({
  //     date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  //     label: 'Event Three'
  //   });
  // }, 1000)
}
