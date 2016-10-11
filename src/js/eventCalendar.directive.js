angular
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
