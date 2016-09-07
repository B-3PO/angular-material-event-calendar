angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarToday', mdEventCalendarTodayDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarTodayDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarTodayDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<md-button class="md-button" ng-click="mdEventCalendar.setToday()" aria-label="today" ng-disabled="mdEventCalendar.isTodayDisabled">Today</md-button>'
  };
  return directive;
}
