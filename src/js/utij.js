angular
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
