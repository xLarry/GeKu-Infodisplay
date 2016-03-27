angular.module('GekuInfodisplay')
  .factory('SunriseService', function (WeatherService) {
    return function () {
      //var lat = 51.459265, long = 7.013491;
      return WeatherService.get().$promise
        .then(function (weather) {
          return {
            sunrise : weather.daily.data[0].sunriseTime * 1000,
            sunset  : weather.daily.data[0].sunsetTime * 1000
          }
        });
    }
  });