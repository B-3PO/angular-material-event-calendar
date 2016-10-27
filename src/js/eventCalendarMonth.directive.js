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
function eventCalendarMonthDirective($$mdEventCalendarBuilder, $window, $$rAF, $timeout) {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    link: link
  };
  return directive;


  function link(scope, element, attrs, ctrl) {
    var showMoreData;

    var mdEventCalendarCtrl = ctrl;
    var rebuildThrottle = $$rAF.throttle(function () {
      scope.$evalAsync(function () {
        setAutoHeight();
        element.toggleClass('fitted', mdEventCalendarCtrl.fitted);
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

    $$rAF(function () {
      setAutoHeight();
      element.toggleClass('fitted', mdEventCalendarCtrl.fitted);
    });

    function setAutoHeight() {
      if (!mdEventCalendarCtrl.autoHeight) { return; }
      mdEventCalendarCtrl.fitted = true;
      var top = element[0].getBoundingClientRect().top;
      var height = $window.innerHeight - top - mdEventCalendarCtrl.offset;
      element.css('height', height+'px');
    }

    hideCreateLinkOnEventItemHover();

    // When user mouses over an existing event, add a class of md-event-hover to
    // the month element, so that the create link is hidden from view.
    function hideCreateLinkOnEventItemHover() {
      element.on('mouseenter', function () {
        element.on('mousemove', checkForEventItemRAF);
      });

      element.on('mouseleave', function () {
        element.off('mousemove', checkForEventItemRAF);
        element.removeClass('md-event-hover');
      });

      var lastHoverItem;
      var checkForEventItemRAF = $$rAF.throttle(checkForEventItem);
      function checkForEventItem(e) {
        if (mdEventCalendarCtrl.isCreateDisabled() === true) { return; }
        if (lastHoverItem === e.target) { return; }
        lastHoverItem = e.target;

        var targetIsEvent = !!e.target.getAttribute('md-event-id');

        element.toggleClass('md-event-hover', targetIsEvent);
      }
    }

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
        return;
      }

      removeShowMore(true);
      if (showMore) {
        addShowMore(new Date(showMore));
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
      var cellHeight;
      if (mdEventCalendarCtrl.fitted) {
        cellHeight = element[0].offsetHeight / 5;
      } else {
        cellHeight = mdEventCalendarCtrl.$element[0].offsetWidth / 7;
      }

      var monthElement = $$mdEventCalendarBuilder.month({
        date: mdEventCalendarCtrl.date,
        events: mdEventCalendarCtrl.events,
        selected: mdEventCalendarCtrl.selectedEvents,
        labelProperty: mdEventCalendarCtrl.labelProperty,
        showCreateLink: mdEventCalendarCtrl.showCreateLink,
        cellHeight: cellHeight
      });
      element.empty();
      element.append(monthElement);

      buildShowMore();
    }


    function addShowMore(date) {
      showMoreData = {
        date: date
      };
      buildShowMore(true);
    }

    function buildShowMore(animate) {
      if (showMoreData === undefined) { return; }
      if (showMoreData.element) {
        angular.element(showMoreData.element).remove();
        showMoreData.element = undefined;
      }

      var cell = getCellFromDate(showMoreData.date);
      var showMoreFragment = $$mdEventCalendarBuilder.showMore({
        date: showMoreData.date,
        selected: mdEventCalendarCtrl.selectedEvents,
        events: mdEventCalendarCtrl.events,
        labelProperty: mdEventCalendarCtrl.labelProperty,
        cell: cell
      });

      element.append(showMoreFragment);
      showMoreData.element = element[0].lastChild;
      positonShowMore();

      if (animate) {
        // add class after element added so animation
        $timeout(function () {
          angular.element(showMoreData.element).addClass('show');
        }, 0);
      } else {
        angular.element(showMoreData.element).addClass('no-transition');
        angular.element(showMoreData.element).addClass('show');
      }
    }

    function positonShowMore() {
      var showMoreBounds = showMoreData.element.getBoundingClientRect();
      var minTop = $window.innerHeight - showMoreBounds.height;
      var minLeft = $window.innerWidth - showMoreBounds.width;
      var leftDiff = showMoreBounds.left - minLeft;

      if (showMoreBounds.top > minTop) {
        showMoreData.element.style.top = minTop+'px';
      }

      if (leftDiff > 0) {
        showMoreData.element.style.left = minLeft+'px';
        // offset date

        leftDiff -= 10;
        if (leftDiff > 0) {
          showMoreData.element.querySelector('.md-event-calendar-show-more-date-label').style.marginLeft = leftDiff+'px';
        }
      }
    }

    function getCellFromDate(date) {
      return element[0].querySelector('[md-date="'+date+'"]');
    }

    function removeShowMore(animate) {
      if (!showMoreData) { return; }

      var el = showMoreData.element;
      showMoreData = undefined;

      if (animate) {
        angular.element(el).removeClass('no-transition');
        $timeout(function () {
          angular.element(el).removeClass('show');
        }, 0);
        $timeout(function () {
          el.remove();
          el = undefined;
        }, 400);
      } else {
        el.remove();
        el = undefined;
      }
    }


    function getClosestCell(el) {
      var target = angular.element(el).parent();
      while (target.hasClass('md-event-calendar-month-cell') === false) {
        target = target.parent();
      }
      return target;
    }

    function getIdFromHash(id) {
      return parseInt(id.replace('object_', ''));
    }
  }
}
