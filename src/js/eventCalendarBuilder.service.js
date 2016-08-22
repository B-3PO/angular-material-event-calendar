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



  function month(selectedDate, events, selected) {
    var date = $$mdEventCalendarUtil.isValidDate(selectedDate) ? selectedDate : new Date();
    events = filterEventsOnMonth(date, events);

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


    $$mdEventCalendarUtil.shortDays.forEach(function (name) {
      var dayHeader = document.createElement('div');
      dayHeader.classList.add('md-event-calendar-month-cell-header');
      dayHeader.textContent = name;
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
      cellSpacer.tabIndex = -1;
      cellSpacer.classList.add('md-event-calendar-month-cell-spacer');
      cell.appendChild(cellSpacer);

      var cellContent = document.createElement('div');
      cellContent.tabIndex = -1;
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

      events.forEach(function (item) {
        if ($$mdEventCalendarUtil.isDateWithinRange(date, item.start, item.end || item.start) === false) { return; }
        var isStartThisDay = $$mdEventCalendarUtil.isSameDay(date, item.start);
        var isEndDate = $$mdEventCalendarUtil.isValidDate(item.end);
        var isEndThisDay = isEndDate ? $$mdEventCalendarUtil.isSameDay(date, item.end) : true;
        var eventElement;

        if (item.$$place) { eventPlace = item.$$place; }
        else { item.$$place = ++eventPlace; }
        if (first && item.$$place > 1) { addEventSpacer(item.$$place, cell); } // add space to align events accross days
        first = false;

        if (isStartThisDay) {
          if (isEndThisDay) {
            eventElement = buildEventItem('single', item);
          } else {
            eventElement = buildEventItem('start', item);
          }
        } else if (isEndThisDay) {
          if (dayOfWeek === 0) {
            eventElement = buildEventItem('end-continue', item);
          } else {
            eventElement = buildEventItem('end', item);
          }
        } else if (dayOfWeek === 0) {
          eventElement = buildEventItem('continue', item);
        } else {
          eventElement = buildEventItem('empty', item);
        }

        if (selected.indexOf(item) !== -1) {
          eventElement.classList.add('md-selected');
        }
        cell.appendChild(eventElement);
      });
    }
  }

  function addEventSpacer(place, cell) {
    var spacer = document.createElement('div');
    spacer.classList.add('md-event-calendar-cell-event-spacer');
    spacer.style.minHeight = ((place-1) * 23); // 23 is the height of an event item
    cell.appendChild(spacer);
  }

  function buildEventItem(type, event) {
    var hash = getHashValue(event);
    var eventItem = document.createElement('div');
    eventItem.classList.add('md-event-calendar-cell-event');
    eventItem.classList.add('md-'+type);
    eventItem.setAttribute('md-event-id', hash);

    if (type === 'single' || type === 'start' || type === 'continue' || type === 'end-continue') {
      var dateLabelTime = document.createElement('span');
      dateLabelTime.classList.add('md-event-calendar-cell-event-time');
      dateLabelTime.textContent = $$mdEventCalendarUtil.formatEventTime(event.start);
      eventItem.appendChild(dateLabelTime);

      var dateLabelText = document.createElement('span');
      dateLabelText.textContent = event.label;
      eventItem.appendChild(dateLabelText);
    }

    return eventItem;
  }


  function buildDateRow(rowNumber) {
    var row = document.createElement('div');
    row.classList.add("md-event-calendar-month-row");
    return row;
  }



  function getHashValue(value) {
    if (angular.isObject(value)) {
      return 'object_' + (value.$$mdEventId || (value.$$mdEventId = ++nextId));
    }
    return value;
  }
}
