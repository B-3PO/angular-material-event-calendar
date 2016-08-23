angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarHeader', mdEventCalendarHeaderDirective);

// TODO replace arrows with custom buttons, so it will look the same without angular material
/**
 * @ngdoc directive
 * @name mdEventCalendarHeaderDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarHeaderDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<div class="md-event-calendar-header">'+
      '<md-button class="md-icon-button" ng-click="mdEventCalendar.previousMonth()" aria-label="previous month">'+
        '<img class="md-arrow md-left-arrow" src="icons/ic_keyboard_arrow_right_black_24px.svg" />'+
      '</md-button>'+
      '<div class="md-event-calendar-header-label">{{mdEventCalendar.monthDisplay + " " + mdEventCalendar.yearDisplay}}</div>'+
      '<md-button class="md-icon-button" ng-click="mdEventCalendar.nextMonth()" aria-label="mext month">'+
        '<img class="md-arrow" src="icons/ic_keyboard_arrow_right_black_24px.svg" />'+
      '</md-button>'+
    '</div>'
  };
  return directive;
}
