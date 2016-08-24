angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarPrev', mdEventCalendarPrevDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarPrevDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarPrevDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<md-button class="md-icon-button" ng-click="mdEventCalendar.previousMonth()" aria-label="previous month">'+
      '<div class="md-arrow md-left-arrow" ng-include="\'icons/ic_keyboard_arrow_right_black_24px.svg\'"></div>'+
    '</md-button>'
  };
  return directive;
}
