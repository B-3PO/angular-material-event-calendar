angular
  .module('eventCalendarApp')
  .controller('HomeController', HomeController);


function HomeController($scope, $timeout) {
  $scope.events = [
    {
      start: new Date(new Date().getTime() - 348 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() - 296 * 60 * 60 * 1000),
      title: 'Event 1'
    },
    {
      start: new Date(new Date().getTime() - 348 * 60 * 60 * 1000),
      allDay: true,
      title: 'Event 2'
    },
    {
      start: new Date(new Date().getTime() - 348 * 60 * 60 * 1000),
      title: 'Event 3'
    },

    {
      start: new Date(new Date().getTime() - 348 * 60 * 60 * 1000),
      title: 'Event 4'
    },
    {
      start: new Date(new Date().getTime() - 348 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() - 296 * 60 * 60 * 1000),
      title: 'Event 5'
    },
    {
      start: new Date(),
      title: 'Event One'
    },
    {
      start: new Date(),
      end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      title: 'Event Two Two Two'
    },
    {
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
      title: 'Event Three'
    },
    {
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      title: 'Event Three2'
    },
    {
      start: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      title: 'Event four'
    },

    {
      start: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      title: 'Event four2'
    },
    {
      start: new Date(new Date().getTime() + 72 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 144 * 60 * 60 * 1000),
      title: 'Event five'
    },
    {
      start: new Date(new Date().getTime() + 144 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 144 * 60 * 60 * 1000),
      title: 'Event six'
    }
  ];
  $scope.selected = $scope.events[0];

  $scope.eventClicked = function (item) {
    console.log(item);
  };


  // $timeout(function () {
  //   $scope.events.push({
  //     date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  //     label: 'Event Three'
  //   });
  // }, 1000)
}
