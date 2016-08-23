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
function eventCalendarMonthDirective($$mdEventCalendarBuilder, $window, $$rAF) {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    link: link
  };
  return directive;


  function link(scope, element, attrs, ctrl) {
    var mdEventCalendarCtrl = ctrl;
    var rebuildThrottle = $$rAF.throttle(function () {
      scope.$evalAsync(function () {
        buildView();
      });
    });

    scope.$watch(function () { return mdEventCalendarCtrl.date; }, buildView);
    scope.$watch(function () { return mdEventCalendarCtrl.events; }, function (newValue, oldValue) {
      if (newValue === oldValue) { return; }
      buildView();
    }, true);
    scope.$watch(function () { return mdEventCalendarCtrl.selectedEvents; }, function (newValue, oldValue) {
      if (newValue === oldValue) { return; }
      buildView();
    }, true);

    angular.element($window).on('resize', rebuildThrottle);
    scope.$on('$destroy', function () {
      angular.element($window).off('resize', rebuildThrottle);
    });


    element.on('click', function (e) {
      var eventId = e.target.getAttribute('md-event-id');
      var showMore = e.target.getAttribute('md-show-more');
      if (eventId) {
        var eventItem = getIdFromHash(eventId);
        scope.$apply(function () {
          mdEventCalendarCtrl.selectEvent(e, getIdFromHash(eventId));
        });
      }

      if (showMore) {
        buildShowMore(e.target, new Date(showMore));
      }
    });


    function buildView() {
      var monthElement = $$mdEventCalendarBuilder.month({
        date: mdEventCalendarCtrl.date,
        events: mdEventCalendarCtrl.events,
        selected: mdEventCalendarCtrl.selectedEvents,
        labelProperty: mdEventCalendarCtrl.labelProperty,
        bounds: {
          width: mdEventCalendarCtrl.$element[0].offsetWidth
        }
      });
      element.empty();
      element.append(monthElement);
    }

    function buildShowMore(el, date) {
      var showMoreElement = $$mdEventCalendarBuilder.showMore({
        date: date,
        selected: mdEventCalendarCtrl.selectedEvents,
        events: mdEventCalendarCtrl.events,
        labelProperty: mdEventCalendarCtrl.labelProperty,
      });
      // console.log(el.parentNode);
      angular.element(el).parent().parent().append(showMoreElement)
      // element.append(showMoreElement);
    }

    function getIdFromHash(id) {
      return parseInt(id.replace('object_', ''));
    }
  }
}
