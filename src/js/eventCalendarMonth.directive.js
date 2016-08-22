angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarMonth', eventCalendarMonthDirective);


/**
 * @ngdoc directive
 * @name eventCalendarMonthDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
 /*@ngInject*/
function eventCalendarMonthDirective($$mdEventCalendarBuilder) {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    link: link
  };
  return directive;


  function link(scope, element, attrs, ctrl) {
    var mdEventCalendarCtrl = ctrl;

    scope.$watch(function () { return mdEventCalendarCtrl.date; }, buildView);
    scope.$watch(function () { return mdEventCalendarCtrl.events; }, function (newValue, oldValue) {
      if (newValue === oldValue) { return; }
      buildView();
    }, true);
    scope.$watch(function () { return mdEventCalendarCtrl.selectedEvents; }, function (newValue, oldValue) {
      if (newValue === oldValue) { return; }
      buildView();
    }, true);


    element.on('click', function (e) {
      var eventId = e.target.getAttribute('md-event-id');
      if (eventId) {
        scope.$apply(function () {
          mdEventCalendarCtrl.selectEvent(getIdFromHash(eventId));
        });
      }
    });


    function buildView() {
      var monthElement = $$mdEventCalendarBuilder.month(mdEventCalendarCtrl.date, mdEventCalendarCtrl.events, mdEventCalendarCtrl.selectedEvents);
      element.empty();
      element.append(monthElement);
    }

    function getIdFromHash(id) {
      return parseInt(id.replace('object_', ''));
    }
  }
}
