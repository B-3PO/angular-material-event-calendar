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

  // if using angular material, then register the event theme css
  if ($injector.has('$mdThemingProvider')) {
    $mdThemingProvider = $injector.get('$mdThemingProvider');
    $mdThemingProvider.registerStyles(EVENT_CALENDAR_THEME);
  } else {
    $provide.decorator('$$rAF', ["$delegate", rAFDecorator]);
  }
}


// polly fill rAF throttle if not using angular material
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

.constant("EVENT_CALENDAR_THEME", "md-event-calendar._md md-event-calendar-header {\n  color: '{{foreground-1}}';\n  background: '{{background-hue-1}}';\n  border-color: '{{foreground-4}}'; }\n  md-event-calendar._md md-event-calendar-header md-event-calendar-next .md-arrow svg, md-event-calendar._md md-event-calendar-header md-event-calendar-prev .md-arrow svg {\n    fill: '{{foreground-2}}'; }\n\nmd-event-calendar._md md-event-calendar-month .md-event-calendar-month-row-header {\n  color: '{{foreground-3}}';\n  background: '{{background-hue-1}}';\n  border-color: '{{foreground-4}}'; }\n\nmd-event-calendar._md md-event-calendar-month .md-event-calendar-month-row {\n  background: '{{background-hue-1}}';\n  border-color: '{{foreground-4}}'; }\n  md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell-divider {\n    border-color: '{{foreground-4}}'; }\n  md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell {\n    border-color: '{{foreground-4}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell .md-event-calendar-month-cell-content .md-event-calendar-create-link {\n      color: '{{primary-default}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell .md-event-calendar-month-cell-content .md-event-calendar-cell-data-label {\n      color: '{{foreground-3}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell .md-event-calendar-month-cell-content .md-event-calendar-cell-event-show-more-link {\n      color: '{{primary-default}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell.different-month {\n      background: '{{background-hue-2}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell.today {\n      box-shadow: inset 0px 0px 0px 1px '{{primary-default}}'; }\n      md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell.today .md-event-calendar-month-cell-content .md-event-calendar-cell-data-label {\n        color: '{{primary-default}}'; }\n    md-event-calendar._md md-event-calendar-month .md-event-calendar-month-row .md-event-calendar-month-cell:last-child {\n      border-color: '{{foreground-4}}'; }\n\nmd-event-calendar._md .md-event-calendar-cell-event {\n  background: '{{foreground-4}}';\n  color: '{{background-900}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected {\n    color: #EEE;\n    background: '{{primary-default}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-continue-left:after, md-event-calendar._md .md-event-calendar-cell-event.md-end-left:after {\n    border-right-color: '{{foreground-4}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-continue-right:after, md-event-calendar._md .md-event-calendar-cell-event.md-start-right:after {\n    border-left-color: '{{foreground-4}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-continue-left:after, md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-end-left:after {\n    border-right-color: '{{primary-default}}'; }\n  md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-continue-right:after, md-event-calendar._md .md-event-calendar-cell-event.md-selected.md-start-right:after {\n    border-left-color: '{{primary-default}}'; }\n\nmd-event-calendar._md .md-event-calendar-show-more-container .md-event-calendar-show-more-date-label {\n  color: '{{foreground-3}}'; }\n\nmd-event-calendar._md .md-event-calendar-show-more-container .md-event-calendar-show-more-close svg {\n  fill: '{{foreground-1}}'; }\n\nmd-event-calendar._md.md-primary md-event-calendar-header {\n  color: '{{background-100}}';\n  background: '{{primary-default}}'; }\n  md-event-calendar._md.md-primary md-event-calendar-header md-event-calendar-next .md-arrow svg, md-event-calendar._md.md-primary md-event-calendar-header md-event-calendar-prev .md-arrow svg {\n    fill: '{{background-100}}'; }\n\nmd-event-calendar._md.md-primary md-event-calendar-month .md-event-calendar-month-row-header {\n  color: '{{background-100}}';\n  background: '{{primary-default}}'; }\n")

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
      events: '=mdEvents'
    },
    compile: compile,
    controller: controller,
    controllerAs: 'mdEventCalendar',
    bindToController: true
  };
  return directive;


  function compile(tElement, tAttr) {
    var eventClickFunc = tAttr.mdEventClick ? $parse(tAttr.mdEventClick, null, true) : undefined;
    var createEventClickFunc = tAttr.mdCreateEventClick ? $parse(tAttr.mdCreateEventClick, null, true) : undefined;
    var mdCreateDisabled = tAttr.mdCreateDisabled ? $parse(tAttr.mdCreateDisabled) : undefined;
    tElement.append('<md-event-calendar-month></md-event-calendar-month>');

    return function postLink(scope, element, attrs, ctrls) {
      var createDisabled = false;
      var mdEventCalendarCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      if ($mdTheming) {
        element.addClass('_md');
        $mdTheming(element);
      }

      mdEventCalendarCtrl.isCreateDisabled = isCreateDisabled;
      mdEventCalendarCtrl.callEventClick = callEventClick;
      mdEventCalendarCtrl.createEventClick = createEventClick;

      if (ngModelCtrl) {
        ngModelCtrl.$render = render;
        mdEventCalendarCtrl.ngModelCtrl = ngModelCtrl;
      }


      function render() {
        var viewValue = ngModelCtrl.$viewValue || ngModelCtrl.$modelValue || [];
        mdEventCalendarCtrl.selectedEvents = [].concat(viewValue);
      }


      function callEventClick(e, eventItem) {
        if (!attrs.mdEventClick) { return; }
        eventClickFunc(scope.$parent, {$event: e, $selectedEvent: eventItem});
      }

      function createEventClick(e, date) {
        if (!attrs.mdCreateEventClick) { return; }
        createEventClickFunc(scope.$parent, {$event: e, $date: date});
      }

      function isCreateDisabled() {
        return createDisabled;
      }

      // watch for create being disabled
      if (mdCreateDisabled) {
        scope.$watch(function () { return mdCreateDisabled(scope.$parent); }, function (value) {
          createDisabled = value;
          element.toggleClass('md-create-disabled', value);
        });

      // if no string was given check to see if the attr exists
      } else if (tAttr.mdCreateDisabled !== undefined) {
        createDisabled = true;
        element.addClass('md-create-disabled');
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
    vm.isToday = $$mdEventCalendarUtil.isSameDay(vm.date, new Date());
    vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
    vm.yearDisplay = vm.date.getFullYear();
    vm.isTodayDisabled = true;
    vm.showCreateLink = $attrs.mdShowCreateLink !== undefined && $attrs.mdShowCreateLink !== 'false';
    vm.nextMonth = nextMonth;
    vm.previousMonth = previousMonth;
    vm.selectEvent = selectEvent;
    vm.setToday = setToday;
    vm.autoHeight = $attrs.autoHeight !== undefined;
    vm.fitted = $attrs.fitted !== undefined;
    vm.offset = vm.autoHeight === false || $attrs.autoHeight === '' || isNaN($attrs.autoHeight.replace('px', '')) ? 0 : parseInt($attrs.autoHeight.replace('px', ''));


    function nextMonth() {
      vm.date = $$mdEventCalendarUtil.getDateInNextMonth(vm.date);
      vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
      vm.yearDisplay = vm.date.getFullYear();
      vm.isTodayDisabled = vm.date.getMonth() === (new Date()).getMonth();
    }


    function previousMonth() {
      vm.date = $$mdEventCalendarUtil.getDateInPreviousMonth(vm.date);
      vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
      vm.yearDisplay = vm.date.getFullYear();
      vm.isTodayDisabled = vm.date.getMonth() === (new Date()).getMonth();
    }

    function setToday() {
      vm.date = new Date();
      vm.monthDisplay = $$mdEventCalendarUtil.months[vm.date.getMonth()];
      vm.yearDisplay = vm.date.getFullYear();
      vm.isTodayDisabled = true;
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
mdEventCalendarBuilderService.$inject = ["$$mdEventCalendarUtil", "$templateCache"];angular
  .module('material.components.eventCalendar')
  .factory('$$mdEventCalendarBuilder', mdEventCalendarBuilderService);


var nextId = 0;

/**
 * @ngdoc service
 * @name $$mdEventCalendarBuilder
 * @module material.components.eventCalendar
 **/
 /*@ngInject*/
function mdEventCalendarBuilderService($$mdEventCalendarUtil, $templateCache) {
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
    var closeButton = document.createElement('div');
    closeButton.classList.add('md-event-calendar-show-more-close');
    closeButton.innerHTML = $templateCache.get('icons/ic_close_black_24px.svg');
    closeButton.setAttribute('md-show-more-close', 'true');
    container.appendChild(dateLabel);
    container.appendChild(closeButton);
    container.appendChild(content);
    showMoreBody.appendChild(container);

    events.forEach(function (item) {
      var eventElement;
      var isStartThisDay = $$mdEventCalendarUtil.isSameDay(date, item.start);
      var isEndThisDay = $$mdEventCalendarUtil.isValidDate(item.end) ? $$mdEventCalendarUtil.isSameDay(date, item.end) : true;
      var eventOptions = {
        labelProperty: labelProperty,
        selected: selected
      };

      if (isStartThisDay && isEndThisDay) {
        eventElement = createEventElement({className: 'single', hasLabel: true}, item, eventOptions);
      } else if (isStartThisDay) {
        eventElement = createEventElement({className: 'start-right', hasLabel: true}, item, eventOptions);
      } else if (isEndThisDay) {
        eventElement = createEventElement({className: 'end-left', hasLabel: true}, item, eventOptions);
      } else {
        eventElement = createEventElement({className: 'continue', hasLabel: true}, item, eventOptions);
      }

      content.appendChild(eventElement);
    });


    var bounds = opts.cell.getBoundingClientRect();
    var cellTop = opts.cell.offsetTop;
    var cellLeft = opts.cell.offsetLeft;
    container.style.top = cellTop+'px';
    container.style.left = cellLeft+'px';

    return showMoreBody;
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












  function month(options) {
    var calendarStartDate;
    var lastCalendarDayNum;
    var d = 0;
    var rowNumber = 1;
    var firstCalendarDay = true;
    var lastCalendarDay = false;
    var today = $$mdEventCalendarUtil.createDateAtMidnight();
    var date = $$mdEventCalendarUtil.isValidDate(options.date) ? options.date : new Date();
    var firstDayOfMonth = $$mdEventCalendarUtil.getFirstDateOfMonth(date);
    var firstDayOfTheWeek = (firstDayOfMonth.getDay() + 7) % 7;
    var numberOfDaysInMonth = $$mdEventCalendarUtil.getNumberOfDaysInMonth(date);
    var events = filterCurrentCalendar(date, options.events);
    events.forEach(cleanEvent);
    var selected = options.selected  || [];
    var monthElement = createMonthElement();
    var row = createRowElement();
    monthElement.appendChild(row);
    var cellSize = options.cellHeight - 48;
    var maxEvents = Math.floor(cellSize / 24);


    // days from last month
    if (firstDayOfTheWeek > 0) {
      calendarStartDate = $$mdEventCalendarUtil.getFirstDateOfMonth(date);
      calendarStartDate.setDate(calendarStartDate.getDate() - firstDayOfTheWeek);
      while (d < firstDayOfTheWeek) {
        row.appendChild(createCellElement(getCellOptions(calendarStartDate, d, true)));
        firstCalendarDay = false;
        d += 1;
        calendarStartDate.setDate(calendarStartDate.getDate() + 1);
      }
    }



    // Add a cell for each day of the month, keeping track of the day of the week so that
    // we know when to start a new row.
    var dayOfWeek = firstDayOfTheWeek;
    var iterationDate = firstDayOfMonth;
    d = 1;
    while (d <= numberOfDaysInMonth) {
      // If we've reached the end of the week, start a new row.
      if (dayOfWeek === 7) {
        dayOfWeek = 0;
        row = createRowElement();
        firstCalendarDay = false;
        monthElement.appendChild(row);
      }

      if (dayOfWeek === 6 && d === numberOfDaysInMonth) {
        lastCalendarDay = true;
      }

      iterationDate.setDate(d);
      row.appendChild(createCellElement(getCellOptions(iterationDate, dayOfWeek)));
      firstCalendarDay = false;
      dayOfWeek += 1;
      d += 1;
    }


    lastCalendarDayNum = d;
    // fill in the rest of the row with next month
    while (row.childNodes.length < 7) {
      if (dayOfWeek === 6) {
        lastCalendarDay = true;
      }
      iterationDate.setDate((d - lastCalendarDayNum) + 1);
      row.appendChild(createCellElement(getCellOptions(iterationDate, dayOfWeek, true)));
      dayOfWeek += 1;
      d += 1;
    }


    return monthElement;


    function getCellOptions(cellDate, dayOfWeek, differentMonth) {
      return {
        date: cellDate, // date for day on calendar
        today: today, // todays date at midnight
        dayOfWeek: dayOfWeek, // 0-6 (sun-sat)
        differentMonth: differentMonth || false, // previous or next month overflow days
        events: events, // events arr
        isFirstDay: firstCalendarDay, // is first day of current month view. not the first day of month(unless that is sunday)
        isLastDay: lastCalendarDay, // last day of calenday. not last day of month (unless sat)
        maxEvents: maxEvents, // max events that can be displayed in a day cell. based on cell size
        selected: selected, // array of selected events. from ngModel
        labelProperty: options.labelProperty, // name of the label property. default: title
        showCreateLink: options.showCreateLink // show create link on hover of day cell
      };
    }
  }



  function createCellElement(options) {
    var cell = document.createElement('div');
    cell.classList.add('md-event-calendar-month-cell');
    cell.setAttribute('md-date', options.date);
    if (options.differentMonth === true) { cell.classList.add('different-month'); }
    if ($$mdEventCalendarUtil.isSameDay(options.date, options.today)) { cell.classList.add('today'); }

    var cellSpacer = document.createElement('div');
    cellSpacer.classList.add('md-event-calendar-month-cell-spacer');
    cell.appendChild(cellSpacer);

    var divider = document.createElement('div');
    divider.classList.add('md-event-calendar-month-cell-divider');
    cell.appendChild(divider);

    var cellContent = document.createElement('div');
    cellContent.setAttribute('md-create-event', '');
    cellContent.classList.add('md-event-calendar-month-cell-content');
    cell.appendChild(cellContent);

    var cellHeader = document.createElement('div');
    cellHeader.setAttribute('md-create-event', '');
    cellHeader.classList.add('layout-row');
    cellContent.appendChild(cellHeader);

    var dateLabel = document.createElement('div');
    dateLabel.setAttribute('md-create-event', '');
    dateLabel.classList.add('md-event-calendar-cell-data-label');
    dateLabel.textContent = $$mdEventCalendarUtil.dates[options.date.getDate()];
    cellHeader.appendChild(dateLabel);

    if (options.showCreateLink === true) {
      var createLink = document.createElement('div');
      createLink.setAttribute('md-create-event', '');
      createLink.classList.add('md-event-calendar-create-link');
      createLink.textContent = 'Create';
      cellHeader.appendChild(createLink);
    }

    createEventElements(cellContent, options);

    return cell;
  }



  function createEventElements(cellContent, options) {
    var i;
    var place = 0;
    var hasEvents = false;
    var matchingEvents = getEventsInRange(options.date, options.events);
    matchingEvents = setEventPlaces(matchingEvents, options.dayOfWeek);
    matchingEvents.every(function (eventItem, pos) {
      var type = getEventDisplayType(eventItem, options);
      var placeDiff = eventItem.$$place - place;
      hasEvents = true;
      place = eventItem.$$place + 1;
      i = 0;
      // add spacer items for overflow events from last day
      while (i < placeDiff) {
        if (place >= options.maxEvents) {
          cellContent.appendChild(createShowMore(matchingEvents.length - pos, options.date));
          return false;
        }
        cellContent.appendChild(createEventSpacerElement());
        i += 1;
      }

      if (place >= options.maxEvents) {
        cellContent.appendChild(createShowMore(matchingEvents.length - pos, options.date));
        return false;
      }
      cellContent.appendChild(createEventElement(type, eventItem, options));
      return true;
    });

    if (hasEvents === true) {
      cellContent.classList.add('md-has-events');
    }
  }


  function createShowMore(num, date) {
    var showMoreElement = document.createElement('div');
    showMoreElement.classList.add('md-event-calendar-cell-event-show-more-link');
    showMoreElement.textContent = num+' more';
    showMoreElement.setAttribute('md-show-more', date.toISOString());
    return showMoreElement;
  }


  function createEventSpacerElement() {
    var spacer = document.createElement('div');
    spacer.classList.add('md-event-calendar-cell-event-spacer');
    return spacer;
  }

  function createEventElement(type, eventItem, options) {
    var hash = getHashValue(eventItem);
    var eventElement = document.createElement('div');
    eventElement.setAttribute('md-event-id', hash);
    eventElement.classList.add('md-event-calendar-cell-event');
    eventElement.classList.add('md-'+type.className);
    if (eventItem.customClass) { eventElement.classList.add(eventItem.customClass); }

    if (type.hasLabel === true) {
      // do not show time for allDay events
      if (type.allDay !== true) {
        var dateLabelTime = document.createElement('span');
        dateLabelTime.classList.add('md-event-calendar-cell-event-time');
        dateLabelTime.textContent = $$mdEventCalendarUtil.formatEventTime(eventItem.start);
        eventElement.appendChild(dateLabelTime);
      }

      var dateLabelText = document.createElement('span');
      dateLabelText.textContent = eventItem[options.labelProperty];
      eventElement.appendChild(dateLabelText);
    }

    options.selected.every(function (sel) {
      if (sel.$$mdEventId !== undefined && sel.$$mdEventId === eventItem.$$mdEventId) {
        eventElement.classList.add('md-selected');
        return false;
      }
      return true;
    });

    return eventElement;
  }



  function getHashValue(value) {
    if (angular.isObject(value)) {
      return 'object_' + (value.$$mdEventId || (value.$$mdEventId = ++nextId));
    }
    return 'id_' + (++nextId);
  }


  function getEventDisplayType(item, options) {
    var className;
    var hasLabel;

    var isStartThisDay = $$mdEventCalendarUtil.isSameDay(options.date, item.start);
    var isEndThisDay = $$mdEventCalendarUtil.isValidDate(item.end) ? $$mdEventCalendarUtil.isSameDay(options.date, item.end) : true;

    // single day event
    if (isStartThisDay && (options.allDay || isEndThisDay)) {
      className = 'single';
      hasLabel = true;

    // starts today on last day of week
    } else if (isStartThisDay && options.dayOfWeek === 6) {
      className = 'start-right';
      hasLabel = true;

    // starts today
    } else if (isStartThisDay) {
      className = 'start';
      hasLabel = true;

    // ends on sunday
    } else if (isEndThisDay && options.dayOfWeek === 0) {
      className = 'end-left';
      hasLabel = true;

    // last day of event
    } else if (isEndThisDay) {
      className = 'end';
      hasLabel = options.isFirstDay; // add label if event is continuing from last month

    // continuation on sunday
    } else if (options.dayOfWeek === 0) {
      className = 'continue-left';
      hasLabel = true;

    // continue on sat
    } else if (options.dayOfWeek === 6) {
      className = 'continue-right';
      hasLabel = false;

    // continuation
    } else {
      className = 'continue';
      hasLabel = false;
    }

    return {
      className: className,
      hasLabel: hasLabel,
      allDay: item.allDay || false
    };
  }

  function getEventsInRange(date, events) {
    return events.filter(function (item) {
      return $$mdEventCalendarUtil.isDateWithinRange(date, item.start, item.end || item.start);
    });
  }

  function setEventPlaces(events, dayOfWeek) {
    var takenPlaces = [];
    var sorted = events.sort(function (a, b) {
      if (a.end > b.end) { return -1; }
      if (a.end < b.end) { return 1; }
      return 0;
    });

    // if not first day of week then get event palces. this is for dates that come from previous days
    // otherwise reset places
    sorted.forEach(function (item) {
      if (dayOfWeek === 0) { item.$$place = undefined; }
      else if (item.$$place !== undefined) { takenPlaces.push(item.$$place); }
    });

    // fill in places that have not been set
    sorted.forEach(function(item) {
      if (item.$$place === undefined) { item.$$place = getPlace(); }
    });

    // sort on places
    return sorted.sort(function(a, b) {
      if (a.$$place > b.$$place) { return 1; }
      if (a.$$place < b.$$place) { return -1; }
      return 0;
    });


    // find lowest place not taken
    function getPlace() {
      var place = 0;
      while (takenPlaces.indexOf(place) !== -1) {
        place++;
      }
      takenPlaces.push(place);
      return place;
    }
  }


  function createMonthElement() {
    var monthBody = document.createDocumentFragment();
    var headerRow = document.createElement('div');
    headerRow.classList.add('md-event-calendar-month-row-header');
    monthBody.appendChild(headerRow);

    // add header day labels
    $$mdEventCalendarUtil.days.forEach(function (name) {
      var dayHeader = document.createElement('div');
      dayHeader.classList.add('md-event-calendar-month-cell-header');
      dayHeader.textContent = name.slice(0,3).toLowerCase();
      headerRow.appendChild(dayHeader);
    });

    return monthBody;
  }

  function createRowElement() {
    var row = document.createElement('div');
    row.classList.add("md-event-calendar-month-row");
    return row;
  }


  function filterCurrentCalendar(date, events) {
    if (!events || !events.length) { return []; }
    // back fill 6 days for posibility of last month days showing up
    var start = $$mdEventCalendarUtil.getFirstDateOfMonth(date).getDate(-6);
    // front fill 6 days for posibility of next month days showing up
    var end = $$mdEventCalendarUtil.getFirstDateOfMonth(date).getDate(37);

    return events.filter(function (item) {
      if (!$$mdEventCalendarUtil.isValidDate(item.start)) { return false; }
      if ($$mdEventCalendarUtil.isDateWithinRange(item.start, start, end)) { return true; }
      if (!$$mdEventCalendarUtil.isValidDate(item.end)) { return false; }
      if ($$mdEventCalendarUtil.isDateWithinRange(item.end, start, end)) { return true; }
      return false;
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
(function(){"use strict";
eventCalendarMonthDirective.$inject = ["$$mdEventCalendarBuilder", "$window", "$$rAF", "$timeout"];angular
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
}());
(function(){"use strict";angular
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
}());
(function(){"use strict";angular
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
}());
(function(){"use strict";angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarTitle', mdEventCalendarTitleDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarTitleDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarTitleDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<div class="md-event-calendar-header-label">{{mdEventCalendar.monthDisplay + " " + mdEventCalendar.yearDisplay}}</div>',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ctrl) {
    scope.mdEventCalendar = ctrl;
  }
}
}());
(function(){"use strict";angular
  .module('material.components.eventCalendar')
  .directive('mdEventCalendarToday', mdEventCalendarTodayDirective);

/**
 * @ngdoc directive
 * @name mdEventCalendarTodayDirective
 * @module material.components.eventCalendar
 *
 * @restrict E
 **/
function mdEventCalendarTodayDirective() {
  var directive = {
    restrict: 'E',
    require: '^mdEventCalendar',
    template: '<md-button class="md-button" ng-click="mdEventCalendar.setToday()" aria-label="today" ng-disabled="mdEventCalendar.isTodayDisabled">Today</md-button>'
  };
  return directive;
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