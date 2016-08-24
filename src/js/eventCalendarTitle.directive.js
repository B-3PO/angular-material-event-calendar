angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarTitle', mdEventCalendarTitleDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarTitleDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarTitleDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<div class="md-event-calendar-header-label">{{mdEventCalendar.monthDisplay + " " + mdEventCalendar.yearDisplay}}</div>',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ctrl) {
    scope.mdEventCalendar = ctrl;
  }
}
