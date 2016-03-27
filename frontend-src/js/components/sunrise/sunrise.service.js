angular.module('GekuInfodisplay')
  .factory('SunriseService', function (WeatherService, rx) {
    return function () {
      //var lat = 51.459265, long = 7.013491;
      return rx.Observable.fromPromise(WeatherService.get().$promise)
        .map(function (weather) {
          return {
            sunrise : weather.daily.data[0].sunriseTime * 1000,
            sunset  : weather.daily.data[0].sunsetTime * 1000
          }
        });
    }
  });