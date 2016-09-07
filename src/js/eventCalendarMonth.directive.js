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
      if (mdEventCalendarCtrl.isCreateDisabled() === true) { return; }

      var eventId = e.target.getAttribute('md-event-id');
      var showMore = e.target.getAttribute('md-show-more');
      var showMoreClose = e.target.getAttribute('md-show-more-close');
      var createEvent = e.target.getAttribute('md-create-event') !== null;

      if (eventId) {
        var eventItem = getIdFromHash(eventId);
        scope.$apply(function () {
          mdEventCalendarCtrl.selectEvent(e, getIdFromHash(eventId));
        });
      }

      if (showMore) {
        buildShowMore(e.target, new Date(showMore));
      }

      if (showMoreClose) {
        angular.element(e.target.parentNode).remove();
      }

      if (createEvent) {
        var cellDate = getDateFromCreate(e.target);
        if (cellDate !== undefined) {
          scope.$apply(function () {
            mdEventCalendarCtrl.createEventClick(e, cellDate);
          });
        }
      }
    });

    function getDateFromCreate(el) {
      var dateString = el.getAttribute('md-date');
      while (dateString === null && el.nodeName !== 'MD-EVENT-CALENDAR-MONTH') {
        el = el.parentNode;
        dateString = el.getAttribute('md-date');
      }

      return dateString === null ? undefined : new Date(dateString);
    }


    function buildView() {
      var monthElement = $$mdEventCalendarBuilder.month({
        date: mdEventCalendarCtrl.date,
        events: mdEventCalendarCtrl.events,
        selected: mdEventCalendarCtrl.selectedEvents,
        labelProperty: mdEventCalendarCtrl.labelProperty,
        showCreateLink: mdEventCalendarCtrl.showCreateLink,
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
        labelProperty: mdEventCalendarCtrl.labelProperty
      });
      angular.element(el).parent().parent().append(showMoreElement);
    }

    function getIdFromHash(id) {
      return parseInt(id.replace('object_', ''));
    }
  }
}
