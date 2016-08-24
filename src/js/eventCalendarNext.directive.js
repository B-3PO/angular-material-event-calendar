angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarNext', mdEventCalendarNextDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarNextDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarNextDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<md-button class="md-icon-button" ng-click="mdEventCalendar.nextMonth()" aria-label="mext month">'+
        '<div class="md-arrow" ng-include="\'icons/ic_keyboard_arrow_right_black_24px.svg\'"></div>'+
      '</md-button>'
  };
  return directive;
}
