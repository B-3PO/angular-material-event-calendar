angular
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
    month: month
  };
  return service;


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
    var d = 1
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
        eventPlace = item.$$place;

        if (isStartThisDay) {
          if (isEndThisDay) { eventElement = buildEventItem('single', item);}
          else { eventElement = buildEventItem('start', item); }
        } else if (isEndThisDay) {
          if (dayOfWeek === 0) { eventElement = buildEventItem('end-continue', item); }
          else { eventElement = buildEventItem('end', item); }
        } else if (dayOfWeek === 0) {
          eventElement = buildEventItem('continue', item);
        } else if (dayOfWeek === 6) {
          eventElement = buildEventItem('wrap', item);
        } else {
          eventElement = buildEventItem('empty', item);
        }

        selected.every(function (sel) {
          if (sel.$$mdEventId !== undefined && sel.$$mdEventId === item.$$mdEventId) {
            eventElement.classList.add('md-selected');
            return false;
          }
          return true;
        });

        hasEvents = true;
        // add event if it fits
        if (item.$$hide !== true && ((eventPlace + 1) < maxEvents || pos === (validEvents.length-1))) { cell.appendChild(eventElement); }
        else {
          item.$$hide = true; // set hide so the event does not show on next day
          // if it doesn't fit add a link to see the rest
          cell.appendChild(buildShowMore(validEvents.length - pos));
          return false;
        }
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



    function buildShowMore(num) {
      var showMoreElement = document.createElement('div');
      showMoreElement.classList.add('md-event-calendar-cell-event-show-more');
      showMoreElement.textContent = num+' more';
      return showMoreElement;
    }

    function buildEventItem(type, eventObj) {
      var hash = getHashValue(eventObj);
      var eventElement = document.createElement('div');
      eventElement.classList.add('md-event-calendar-cell-event');
      eventElement.classList.add('md-'+type);
      eventElement.setAttribute('md-event-id', hash);

      if (type === 'single' || type === 'start' || type === 'continue' || type === 'end-continue') {
        if (type !== 'continue' && type !== 'end-continue' && eventObj.allDay !== true) {
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


    function buildDateRow(rowNumber) {
      var row = document.createElement('div');
      row.classList.add("md-event-calendar-month-row");
      return row;
    }
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
      return $$mdEventCalendarUtil.isValidDate(item.start)
              && $$mdEventCalendarUtil.isValidDate(item.end)
              ? ($$mdEventCalendarUtil.isSameMonthAndYear(date, item.start) || $$mdEventCalendarUtil.isSameMonthAndYear(date, item.end))
              : $$mdEventCalendarUtil.isSameMonthAndYear(date, item.start);
    }).sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a > b ? 1 : a < b ? -1 : 0;
    });
  }


  function cleanEvent(item) {
    item.$$hide = undefined;
    item.$$place = undefined;
  }
}
