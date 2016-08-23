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
function addEventCalendarTheme($injector, $provide, EVENT_CALENDAR_THEME) {
  var $mdThemingProvider;
  if ($injector.has('$mdThemingProvider')) {
    $mdThemingProvider = $injector.get('$mdThemingProvider');
    $mdThemingProvider.registerStyles(EVENT_CALENDAR_THEME);
  } else {
    $provide.decorator('$$rAF', ["$delegate", rAFDecorator]);
  }
}


function rAFDecorator($delegate) {
  $delegate.throttle = function(cb) {
    var queuedArgs, alreadyQueued, queueCb, context;
    return function debounced() {
      queuedArgs = arguments;
      context = this;
      queueCb = cb;
      if (!alreadyQueued) {
        alreadyQueued = true;
        $delegate(function() {
          queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
          alreadyQueued = false;
        });
      }
    };
  };
  return $delegate;
}
