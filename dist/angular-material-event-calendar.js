(function(){"use strict";/**
 * @ngdoc module
 * @name material.components.eventCalendar
 *
 * @description
 * Calendar Component
 */
addEventCalendarTheme.$inject = ["$injector", "$provide", "EVENT_CALENDAR_THEME"];
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
}());
(function(){"use strict";angular.module("material.components.eventCalendar").run(["$templateCache", function($templateCache) {$templateCache.put("icons/ic_close_black_24px.svg","<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>");
$templateCache.put("icons/ic_keyboard_arrow_right_black_24px.svg","<svg fill=\"#EEEEEE\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\"/>\n    <path d=\"M0-.25h24v24H0z\" fill=\"none\"/>\n</svg>\n");}]);}());
(function(){"use strict";angular.module("material.components.eventCalendar")

.constant("EVENT_CALENDAR_THEME", "md-event-calendar._md md-event-calendar-header {\n  color: #EEE;\n  background: '{{primary-default}}'; }\n\nmd-event-calendar._md md-event-calendar-month .md-event-calendar-month-row-header {\n  color: #EEE;\n  background: '{{primary-default}}'; }\n  md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row-header .md-arrow {\n    fill: #EEE; }\n\nmd-event-calendar._md md-event-calendar-month .md-event-calendar-month-row {\n  background: '{{background-hue-1}}';\n  border-color: '{{foreground-4}}'; }\n  md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell-divider {\n    border-color: '{{foreground-4}}'; }\n  md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell {\n    border-color: '{{foreground-4}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell:last-child {\n      border-color: '{{foreground-4}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell .md-event-calendar-month-cell-content .md-event-calendar-cell-data-label {\n      color: '{{foreground-3}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell .md-event-calendar-month-cell-content .md-event-calendar-cell-event-show-more-link {\n      color: '{{primary-default}}'; }\n\nmd-event-calendar._md .md-event-calendar-cell-event {\n  background: '{{foreground-4}}';\n  color: '{{background-900}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected {\n    color: #EEE;\n    background: '{{primary-default}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-continue-left:after, md-event-calendar._md .md-event-calendar-cell-event.md-end-left:after {\n    border-right: 13px solid '{{foreground-4}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-continue-right:after, md-event-calendar._md .md-event-calendar-cell-event.md-start-right:after {\n    border-left: 13px solid '{{foreground-4}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-continue-left:after, md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-end-left:after {\n    border-right: 13px solid '{{primary-default}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-continue-right:after, md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-start-right:after {\n    border-left: 13px solid '{{primary-default}}'; }\n\nmd-event-calendar._md .md-event-calendar-show-more-container .md-event-calendar-show-more-date-label {\n  color: '{{foreground-3}}'; }\n")

;}());
(function(){"use strict";
eventCalendarDirective.$inject = ["$injector", "$parse"];angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendar', eventCalendarDirective);


/**
 * @ngdoc directive
 * @name mdEventCalendar
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function eventCalendarDirective($injector, $parse) {
  controller.$inject = ["$$mdEventCalendarUtil", "$element", "$attrs"];
  var $mdTheming = $injector.has('$mdTheming') ? $injector.get('$mdTheming') : undefined;
  var directive = {
    restrict: 'E',
    require: ['mdEventCalendar', '?ngModel'],
    scope: {
      events: '=mdEvents',
    },
    template: '<div class="md-event-calendar">'+
      '<md-event-calendar-header></md-event-calendar-header>'+
      '<md-event-calendar-month></md-event-calendar-month>'+
    '</div>',
    compile: compile,
    controller: controller,
    controllerAs: 'mdEventCalendar',
    bindToController: true
  };
  return directive;


  function compile(tElement, tAttr) {
    var fn = tAttr.mdEventClick ? $parse(tAttr.mdEventClick, null, true) : undefined;

    return function postLink(scope, element, attrs, ctrls) {
      var mdEventCalendarCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      if ($mdTheming) {
        element.addClass('_md');
        $mdTheming(element);
      }

      mdEventCalendarCtrl.callEventClick = function (e, eventItem) {
        if (!attrs.mdEventClick) { return; }
        fn(scope.$parent, {$event: e, $selectedEvent: eventItem});
      };

      if (ngModelCtrl) {
        ngModelCtrl.$render = render;
        mdEventCalendarCtrl.ngModelCtrl = ngModelCtrl;
      }


      function render() {
        var viewValue = ngModelCtrl.$viewValue || ngModelCtrl.$modelValue || [];
        mdEventCalendarCtrl.selectedEvents = [].concat(viewValue);
      }
    };
  }


  /*@ngInject*/
  function controller($$mdEventCalendarUtil, $element, $attrs) {
    /*jshint validthis:true*/
    var vm = this;

    vm.$element = $element;
    vm.labelProperty = $attrs.mdLabel || 'title';
    vm.selectedEvents = [];
    vm.today = $$mdEventCalendarUtil.createDateAtMidnight();
    vm.date = $$mdEventCalendarUtil.createDateAtMidnight();
    vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
    vm.yearDisplay = vm.date.getFullYear();

    vm.nextMonth = nextMonth;
    vm.previousMonth = previousMonth;
    vm.selectEvent = selectEvent;



    function nextMonth() {
      vm.date = $$mdEventCalendarUtil.getDateInNextMonth(vm.date);
      vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
      vm.yearDisplay = vm.date.getFullYear();
    }


    function previousMonth() {
      vm.date = $$mdEventCalendarUtil.getDateInPreviousMonth(vm.date);
      vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
      vm.yearDisplay = vm.date.getFullYear();
    }


    function selectEvent(e, id) {
      // TODO create hashkeys for all events and store in reference object
      var value = vm.events.filter(function (item) {
        return item.$$mdEventId === id;
      });

      if (vm.ngModelCtrl) {
        vm.ngModelCtrl.$setViewValue(value[0]);
        vm.ngModelCtrl.$render();
      }
      vm.callEventClick(e, value[0]);

      return true;
    }
  }
}
}());
(function(){"use strict";
mdEventCalendarBuilderService.$inject = ["$$mdEventCalendarUtil"];angular
  .module('material.components.eventCalendar')
  .factory('$$mdEventCalendarBuilder', mdEventCalendarBuilderService);


var nextId = 0;

/**
 * @ngdoc service
 * @name $$mdEventCalendarBuilder
 * @module material.components.eventCalendar
 **/
 /*@ngInject*/
function mdEventCalendarBuilderService($$mdEventCalendarUtil) {
  var service = {
    month: month,
    showMore: showMore
  };
  return service;



  function showMore(opts) {
    var date = opts.date;
    var selected = opts.selected  || [];
    var events = opts.events ? filterEventsOnDay(date, opts.events) : [];
    var labelProperty = opts.labelProperty;
    var showMoreBody = document.createDocumentFragment();
    var container = document.createElement('div');
    container.classList.add('md-event-calendar-show-more-container');
    var content = document.createElement('div');
    content.classList.add('md-event-calendar-show-more-content');
    var dateLabel = document.createElement('div');
    dateLabel.classList.add('md-event-calendar-show-more-date-label');
    dateLabel.textContent = $$mdEventCalendarUtil.dates[date.getDate()];
    var closeButton = document.createElement('img');
    closeButton.classList.add('md-event-calendar-show-more-close');
    closeButton.setAttribute('src', 'icons/ic_close_black_24px.svg');
    closeButton.setAttribute('md-show-more-close', 'true');
    container.appendChild(dateLabel);
    container.appendChild(closeButton);
    container.appendChild(content);
    showMoreBody.appendChild(container);

    events.forEach(function (item) {
      var eventElement;
      var isStartThisDay = $$mdEventCalendarUtil.isSameDay(date, item.start);
      var isEndThisDay = $$mdEventCalendarUtil.isValidDate(item.end) ? $$mdEventCalendarUtil.isSameDay(date, item.end) : true;

      if (isStartThisDay && isEndThisDay) {
        eventElement = buildEventItem('single', true, item, labelProperty);
      } else if (isStartThisDay) {
        eventElement = buildEventItem('start-right', true, item, labelProperty);
      } else if (isEndThisDay) {
        eventElement = buildEventItem('end-left', true, item, labelProperty);
      } else {
        eventElement = buildEventItem('continue', true, item, labelProperty);
      }


      selected.every(function (sel) {
        if (sel.$$mdEventId !== undefined && sel.$$mdEventId === item.$$mdEventId) {
          eventElement.classList.add('md-selected');
          return false;
        }
        return true;
      });

      content.appendChild(eventElement);
    });

    return showMoreBody;
  }



  function month(opts) {
    var date = $$mdEventCalendarUtil.isValidDate(opts.date) ? opts.date : new Date();
    var events = opts.events ? filterEventsOnMonth(date, opts.events) : [];
    var selected = opts.selected || [];
    var labelProperty = opts.labelProperty;
    var cellSize = opts.bounds.width / 7;
    var maxEvents = Math.floor((cellSize - 27) / 27);
    events.forEach(cleanEvent);

    var firstDayOfMonth = $$mdEventCalendarUtil.getFirstDateOfMonth(date);
    var firstDayOfTheWeek = (firstDayOfMonth.getDay() + 7) % 7;
    var numberOfDaysInMonth = $$mdEventCalendarUtil.getNumberOfDaysInMonth(date);
    var monthBody = document.createDocumentFragment();
    var rowNumber = 1;
    var blankCellOffset = 0;
    var headerRow = document.createElement('div');
    headerRow.classList.add('md-event-calendar-month-row-header');
    var row = buildDateRow(rowNumber);
    monthBody.appendChild(headerRow);
    monthBody.appendChild(row);

    $$mdEventCalendarUtil.days.forEach(function (name) {
      var dayHeader = document.createElement('div');
      dayHeader.classList.add('md-event-calendar-month-cell-header');
      dayHeader.textContent = name.slice(0,3).toLowerCase();
      headerRow.appendChild(dayHeader);
    });



    if (firstDayOfTheWeek <= 2) {
    } else {
      blankCellOffset = 3;
    }


    var i = 0;
    while (i < firstDayOfTheWeek) {
      row.appendChild(buildDateCell());
      i += 1;
    }


    // Add a cell for each day of the month, keeping track of the day of the week so that
    // we know when to start a new row.
    var dayOfWeek = firstDayOfTheWeek;
    var iterationDate = firstDayOfMonth;
    var d = 1;
    while (d <= numberOfDaysInMonth) {
      // If we've reached the end of the week, start a new row.
      if (dayOfWeek === 7) {
        dayOfWeek = 0;
        rowNumber++;
        row = buildDateRow(rowNumber);
        monthBody.appendChild(row);
      }

      iterationDate.setDate(d);
      var cell = buildDateCell(iterationDate, dayOfWeek, selected);
      row.appendChild(cell);

      dayOfWeek += 1;
      d += 1;
    }

    // Ensure that the last row of the month has 7 cells.
    while (row.childNodes.length < 7) {
      row.appendChild(buildDateCell());
    }

    return monthBody;



    function buildDateCell(date, dayOfWeek, selected) {
      var cell = document.createElement('div');
      cell.classList.add('md-event-calendar-month-cell');

      var cellSpacer = document.createElement('div');
      cellSpacer.classList.add('md-event-calendar-month-cell-spacer');
      cell.appendChild(cellSpacer);

      var divider = document.createElement('div');
      divider.classList.add('md-event-calendar-month-cell-divider');
      cell.appendChild(divider);

      var cellContent = document.createElement('div');
      cellContent.classList.add('md-event-calendar-month-cell-content');
      cell.appendChild(cellContent);

      if (date) {
        var dateLabel = document.createElement('div');
        dateLabel.classList.add('md-event-calendar-cell-data-label');
        dateLabel.textContent = $$mdEventCalendarUtil.dates[date.getDate()];
        cellContent.appendChild(dateLabel);
        buildEvents(date, dayOfWeek, selected, cellContent);
      }

      return cell;
    }



    function buildEvents(date, dayOfWeek, selected, cell) {
      var eventPlace = 0; // place in single day cell, from the first time used
      var first = true;
      var hasEvents = false;

      var takenPlaces = [];
      var validEvents = events.filter(function (item) {
        var isInRange = $$mdEventCalendarUtil.isDateWithinRange(date, item.start, item.end || item.start);
        if (isInRange) {
          if (item.$$place) { takenPlaces.push(item.$$place); }
          return true;
        } else { return false; }
      });
      validEvents.forEach(function(item) {
        if (!item.$$place) {
          item.$$place = getPlace();
        }
      });

      eventPlace = 0;
      validEvents.sort(function(a, b) {
        if (a.$$place > b.$$place) { return 1; }
        if (a.$$place < b.$$place) { return -1; }
        return 0;
      }).every(function (item, pos) {
        var eventElement;
        var isStartThisDay = $$mdEventCalendarUtil.isSameDay(date, item.start);
        var isEndThisDay = $$mdEventCalendarUtil.isValidDate(item.end) ? $$mdEventCalendarUtil.isSameDay(date, item.end) : true;
        if (first && item.$$place > 0) { addEventSpacer(item.$$place, cell); } // spacer if first event is from previous day and not at the top
        else if (item.$$place > eventPlace + 1) { addEventSpacer((item.$$place - (eventPlace+1)), cell); } // spacer for gaps
        first = false;
        hasEvents = true;
        eventPlace = item.$$place;


        // if it doesn't fit add a link to see the rest
        if (item.$$hide === true || ((eventPlace + 1) >= maxEvents && pos !== (validEvents.length-1))) {
          item.$$hide = true; // set hide so the event does not show on next day
          cell.appendChild(buildShowMoreLink(validEvents.length - pos, date));
          return false;
        }


        if (isStartThisDay && isEndThisDay) {
          eventElement = buildEventItem('single', true, item, labelProperty);
        } else if (isStartThisDay) {
          eventElement = buildEventItem('start', true, item, labelProperty);
        } else if (isEndThisDay && dayOfWeek === 0) {
          eventElement = buildEventItem('end-left', false, item, labelProperty);
        } else if (isEndThisDay) {
          eventElement = buildEventItem('end', false, item, labelProperty);
        } else if (dayOfWeek === 0) {
          eventElement = buildEventItem('continue-left', true, item, labelProperty);
        } else if (dayOfWeek === 6) {
          eventElement = buildEventItem('continue-right', false, item, labelProperty);
        } else {
          eventElement = buildEventItem('continue', false, item, labelProperty);
        }

        selected.every(function (sel) {
          if (sel.$$mdEventId !== undefined && sel.$$mdEventId === item.$$mdEventId) {
            eventElement.classList.add('md-selected');
            return false;
          }
          return true;
        });

        cell.appendChild(eventElement);
        return true;
      });

      if (hasEvents === true) {
        cell.classList.add('md-has-events');
      }

      function getPlace() {
        while (takenPlaces.indexOf(eventPlace) !== -1) {
          eventPlace += 1;
        }
        takenPlaces.push(eventPlace);
        return eventPlace;
      }
    }



    function buildShowMoreLink(num, date) {
      var showMoreElement = document.createElement('div');
      showMoreElement.classList.add('md-event-calendar-cell-event-show-more-link');
      showMoreElement.textContent = num+' more';
      showMoreElement.setAttribute('md-show-more', date.toISOString());
      return showMoreElement;
    }


    function buildDateRow(rowNumber) {
      var row = document.createElement('div');
      row.classList.add("md-event-calendar-month-row");
      return row;
    }
  }






  function buildEventItem(type, showLabel, eventObj, labelProperty) {
    var hash = getHashValue(eventObj);
    var eventElement = document.createElement('div');
    eventElement.classList.add('md-event-calendar-cell-event');
    eventElement.classList.add('md-'+type);
    eventElement.setAttribute('md-event-id', hash);

    if (showLabel === true) {
      if (type.indexOf('continue') === -1 && eventObj.allDay !== true) {
        var dateLabelTime = document.createElement('span');
        dateLabelTime.classList.add('md-event-calendar-cell-event-time');
        dateLabelTime.textContent = $$mdEventCalendarUtil.formatEventTime(eventObj.start);
        eventElement.appendChild(dateLabelTime);
      }

      var dateLabelText = document.createElement('span');
      dateLabelText.textContent = eventObj[labelProperty];
      eventElement.appendChild(dateLabelText);
    }

    return eventElement;
  }



  function addEventSpacer(place, cell) {
    var spacer = document.createElement('div');
    spacer.classList.add('md-event-calendar-cell-event-spacer');
    spacer.style.minHeight = place * 23 + ((place-1) * 4); // 23 is the height of an event item. 4 for padding inbetween
    cell.appendChild(spacer);
  }


  function getHashValue(value) {
    if (angular.isObject(value)) {
      return 'object_' + (value.$$mdEventId || (value.$$mdEventId = ++nextId));
    }
    return value;
  }

  function filterEventsOnMonth(date, events) {
    return !events || !events.length ? [] : events.filter(function (item) {
      var isStartValid = $$mdEventCalendarUtil.isValidDate(item.start);
      var isEndValid = $$mdEventCalendarUtil.isValidDate(item.end);
      var isStartSame = $$mdEventCalendarUtil.isSameMonthAndYear(date, item.start);
      return isStartValid && isEndValid ? (isStartSame || $$mdEventCalendarUtil.isSameMonthAndYear(date, item.end)) : isStartSame;
    }).sort(function(a, b) {
      a = new Date(a.start);
      b = new Date(b.start);
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }


  function filterEventsOnDay(date, events) {
    return !events || !events.length ? [] : events.filter(function (item) {
      return $$mdEventCalendarUtil.isDateWithinRange(date, item.start, item.end || item.start);
    }).sort(function(a, b) {
      a = new Date(a.start);
      b = new Date(b.start);
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }


  function cleanEvent(item) {
    item.$$hide = undefined;
    item.$$place = undefined;
  }
}
}());
(function(){"use strict";angular
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
}());
(function(){"use strict";
eventCalendarMonthDirective.$inject = ["$$mdEventCalendarBuilder", "$window", "$$rAF"];angular
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
      var showMoreClose = e.target.getAttribute('md-show-more-close');

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
      angular.element(el).parent().parent().append(showMoreElement);
    }

    function getIdFromHash(id) {
      return parseInt(id.replace('object_', ''));
    }
  }
}
}());
(function(){"use strict";
utilService.$inject = ["$injector", "$locale", "$filter"];angular
  .module('material.components.eventCalendar')
  .factory('$$mdEventCalendarUtil', utilService);


function utilService($injector, $locale, $filter) {
  var $mdDateLocale = $injector.has('$mdDateLocale') ? $injector.get('$mdDateLocale') : undefined;
  var dateFilter = $filter('date');
  var months = $mdDateLocale ? $mdDateLocale.months : $locale.DATETIME_FORMATS.MONTH;
  var shortMonths = $mdDateLocale ? $mdDateLocale.shortMonths : $locale.DATETIME_FORMATS.SHORTMONTH;
  var days = $mdDateLocale ? $mdDateLocale.days : $locale.DATETIME_FORMATS.DAY;
  var shortDays = $mdDateLocale ? $mdDateLocale.shortDays : $locale.DATETIME_FORMATS.SHORTDAY.map(function(day) {
    return day.substring(0, 1);
  });
  // The default dates are simply the numbers 1 through 31.
  var defaultDates = Array(32);
  for (var i = 1; i <= 31; i++) {
    defaultDates[i] = i;
  }


  var service = {
    months: months,
    shortMonths: shortMonths,
    days: days,
    dates: $mdDateLocale ? $mdDateLocale.dates : defaultDates,
    shortDays: shortDays,
    isValidDate: isValidDate,
    createDateAtMidnight: createDateAtMidnight,
    getDateInNextMonth: getDateInNextMonth,
    getDateInPreviousMonth: getDateInPreviousMonth,
    getFirstDateOfMonth: getFirstDateOfMonth,
    getNumberOfDaysInMonth: getNumberOfDaysInMonth,
    weekNumberFormatter: $mdDateLocale ? $mdDateLocale.weekNumberFormatter : weekNumberFormatter,
    isSameMonthAndYear: isSameMonthAndYear,
    isSameDay: isSameDay,
    isDateWithinRange: isDateWithinRange,
    formatEventTime: formatEventTime
  };
  return service;




  function formatEventTime(date) {
    return dateFilter(date, 'h:mm a');
  }



  /**
    * Checks if a date is within a min and max range, ignoring the time component.
    * If minDate or maxDate are not dates, they are ignored.
    * @param {Date} date
    * @param {Date} minDate
    * @param {Date} maxDate
    */
  function isDateWithinRange(date, minDate, maxDate) {
    var dateAtMidnight = createDateAtMidnight(date);
    var minDateAtMidnight = isValidDate(minDate) ? createDateAtMidnight(minDate) : null;
    var maxDateAtMidnight = isValidDate(maxDate) ? createDateAtMidnight(maxDate) : null;
    return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
       (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
  }



  /**
   * Default week number formatter.
   * @param number
   * @returns {string}
   */
  function weekNumberFormatter(number) {
    return 'Week ' + number;
  }


  /**
     * Sets a date's time to midnight.
     * @param {Date} date
     */
  function setDateTimeToMidnight(date) {
    if (isValidDate(date)) {
      date.setHours(0, 0, 0, 0);
    }
  }

  /**
     * Checks whether a date is valid.
     * @param {Date} date
     * @return {boolean} Whether the date is a valid Date.
     */
  function isValidDate(date) {
    return date && date.getTime && !isNaN(date.getTime());
  }


  /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {number|Date=} opt_value
     * @return {Date} New date with time set to midnight.
     */
  function createDateAtMidnight(opt_value) {
    var date;
    if (opt_value === undefined) {
      date = new Date();
    } else {
      date = new Date(opt_value);
    }
    setDateTimeToMidnight(date);
    return date;
  }



  /**
     * Get an arbitrary date in the month after the given date's month.
     * @param date
     * @returns {Date}
     */
  function getDateInNextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }



  /**
     * Get an arbitrary date in the month before the given date's month.
     * @param date
     * @returns {Date}
     */
  function getDateInPreviousMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }




  /**
     * Gets the first day of the month for the given date's month.
     * @param {Date} date
     * @returns {Date}
     */
  function getFirstDateOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }


  /**
     * Gets the number of days in the month for the given date's month.
     * @param date
     * @returns {number}
     */
  function getNumberOfDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }


  /**
     * Gets whether two dates have the same month and year.
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
  function isSameMonthAndYear(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  }


  /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {Date} d1
     * @param {Date} d2
     * @returns {boolean}
     */
  function isSameDay(d1, d2) {
    return d1.getDate() == d2.getDate() && isSameMonthAndYear(d1, d2);
  }
}
}());