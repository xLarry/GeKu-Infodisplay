angular.module("GekuInfodisplay")
  .component('sunrise', {
    templateUrl : 'js/components/sunrise/sunrise.component.html',
    controller  : function ($interval, SunriseService) {
      var updateSunriseData = () => SunriseService().then(data => this.sunData = data);
      updateSunriseData();

      // hourly update
      var hourly = 1000*60*60;
      $interval(updateSunriseData, hourly);
    }
  });