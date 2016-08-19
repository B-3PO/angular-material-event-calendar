angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendar', eventCalendarDirective);


/**
 * @ngdoc directive
 * @name mdEventCalendar
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function eventCalendarDirective() {
  var directive = {
    restrict: 'E'
  };
  return directive;
}
