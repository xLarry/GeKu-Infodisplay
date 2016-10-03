angular.module("GekuInfodisplay")
  .component('clock', {
    templateUrl : 'js/components/clock/clock.component.html',
    controller  : function ($interval) {
        this.currentTime = new Date()
    }
  });