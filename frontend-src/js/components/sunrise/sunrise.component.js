angular.module("GekuInfodisplay")
  .component('sunrise', {
    templateUrl : 'js/components/sunrise/sunrise.component.html',
    controller  : function (WeatherService) {
      WeatherService.events
        .subscribe((weather) => {
          this.sunData = {
            sunrise : weather.daily.data[0].sunriseTime * 1000,
            sunset  : weather.daily.data[0].sunsetTime * 1000
          }
        });
    }
  });