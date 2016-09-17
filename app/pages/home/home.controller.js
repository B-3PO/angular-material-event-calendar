angular
  .module('eventCalendarApp')
  .controller('HomeController', HomeController);


function HomeController($scope, $timeout) {

  $scope.events = [
    {
      start: getDate(-6, 10),
      end: getDate(-6, 11),
      title: 'Event 1'
    },
    {
      start: getDate(0, 10),
      end: getDate(1, 11),
      title: 'Event 1'
    },
    {
      start: getDate(1, 11),
      end: getDate(2, 12),
      title: 'Event 2'
    },
    {
      start: getDate(2, 12),
      end: getDate(3, 13),
      title: 'Event 3'
    },
    {
      start: getDate(4, 12),
      end: getDate(5, 13),
      title: 'Event 4'
    },
    {
      start: getDate(5, 12),
      end: getDate(6, 13),
      title: 'Event 5'
    },
    {
      start: getDate(6, 12),
      end: getDate(6, 13),
      title: 'Event 6'
    },
    {
      start: getDate(6, 12),
      allDay: true,
      title: 'Event 7'
    },




    {
      start: getDate(8, 12),
      end: getDate(8, 13),
      title: 'Event 5'
    },
    {
      start: getDate(8, 12),
      end: getDate(8, 13),
      title: 'Event 6'
    },
    {
      start: getDate(8, 12),
      allDay: true,
      title: 'Event 7'
    }
  ];
  $scope.selected = $scope.events[0];

  $scope.eventClicked = function (item) {
    console.log(item);
  };

  $scope.createClicked = function (date) {
    console.log(date);
  };

  function getDate(offsetDays, hour) {
    offsetDays = offsetDays || 0;
    var offset = offsetDays * 24 * 60 * 60 * 1000;
    var date = new Date(new Date().getTime() + offset);
    if (hour) { date.setHours(hour); }
    return date;
  }


  $scope.dis = false;
  // $timeout(function () {
  //   $scope.events.push({
  //     date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  //     label: 'Event Three'
  //   });
  // }, 1000)
}
