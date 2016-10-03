angular.module("GekuInfodisplay")
  .component('clock', {
    templateUrl : 'js/components/clock/clock.component.html',
    controller  : function ($interval) {
        
        
        var $ctrl = this;
        
        function setCurrentDate() {
            $ctrl.currentTime = new Date()
        }

        // Update Time once a Minute
        $interval(setCurrentDate, 1000);
        setCurrentDate();
    }
  });