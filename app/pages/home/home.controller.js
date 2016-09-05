angular
  .module('eventCalendarApp')
  .controller('HomeController', HomeController);


function HomeController($scope, $timeout) {

  $scope.events = [
    {
      start: getDate(-120),
      allDay: true,
      title: 'Event 1'
    },
    {
      start: getDate(-144),
      end: getDate(-96),
      title: 'Event 1'
    },
    {
      start: getDate(-96),
      end: getDate(-96),
      title: 'Event 1'
    },
    {
      start: getDate(-96),
      end: getDate(-24),
      title: 'Event 1'
    },
    {
      start: getDate(-96),
      allDay: true,
      title: 'Event 1'
    },
    {
      start: getDate(0),
      end: getDate(48),
      title: 'Event 1'
    },
  ];
  $scope.selected = $scope.events[0];

  $scope.eventClicked = function (item) {
    console.log(item);
  };

  function getDate(offsetHours) {
    offsetHours = offsetHours || 0;
    return new Date(new Date().getTime() + offsetHours * 60 * 60 * 1000);
  }


  // $timeout(function () {
  //   $scope.events.push({
  //     date: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
  //     label: 'Event Three'
  //   });
  // }, 1000)
}
