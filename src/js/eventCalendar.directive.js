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
function eventCalendarDirective($injector) {
  var $mdTheming = $injector.has('$mdTheming') ? $injector.get('$mdTheming') : undefined;
  var directive = {
    restrict: 'E',
    require: ['mdEventCalendar', '?ngModel'],
    scope: {
      events: '=mdEvents'
    },
    template: '<div class="md-event-calendar">'+
      '<md-event-calendar-header></md-event-calendar-header>'+
      '<md-event-calendar-month></md-event-calendar-month>'+
    '</div>',
    link: link,
    controller: controller,
    controllerAs: 'mdEventCalendar',
    bindToController: true
  };
  return directive;


  function link(scope, element, attrs, ctrls) {
    var mdEventCalendarCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1];
    if ($mdTheming) {
      element.addClass('_md');
      $mdTheming(element);
    }


    if (ngModelCtrl) {
      ngModelCtrl.$render = render;
      mdEventCalendarCtrl.ngModelCtrl = ngModelCtrl;
    }


    function render() {
      var viewValue = ngModelCtrl.$viewValue || ngModelCtrl.$modelValue || [];
      mdEventCalendarCtrl.selectedEvents = [].concat(viewValue);
    }
  }

  /*@ngInject*/
  function controller($$mdEventCalendarUtil) {
    /*jshint validthis:true*/
    var vm = this;

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


    function selectEvent(id) {
      if (!vm.ngModelCtrl) { return false; }

      // TODO create hashkeys for all events and store in reference object
      var value = vm.events.filter(function (item) {
        return item.$$mdEventId === id;
      });

      vm.ngModelCtrl.$setViewValue(value[0]);
      vm.ngModelCtrl.$render();

      return true;
    }
  }
}
