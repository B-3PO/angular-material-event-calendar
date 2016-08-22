/**
 * @ngdoc module
 * @name material.components.eventCalendar
 *
 * @description
 * Calendar Component
 */
angular
  .module('material.components.eventCalendar', [])
  .config(addEventCalendarTheme);


/*@ngInject*/
function addEventCalendarTheme($injector, EVENT_CALENDAR_THEME) {
  var $mdThemingProvider;
  if ($injector.has('$mdThemingProvider')) {
    $mdThemingProvider = $injector.get('$mdThemingProvider');
    $mdThemingProvider.registerStyles(EVENT_CALENDAR_THEME);
  }
}
