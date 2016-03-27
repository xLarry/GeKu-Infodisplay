angular.module('GekuInfodisplay')
  .factory('SunriseService', function ($http) {
    var today = new Date();

    function getDateAsString (date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = date.getDate().toString();
      return yyyy + '-' + mm + '-' + dd
    }

    return function () {
      //var lat = 51.459265, long = 7.013491;
      return $http.get('http://api.sunrise-sunset.org/json?lat=51.459265&lng=7.013491&date=today')
        .then(function (response) {
          return {
            sunrise : Date.parse(getDateAsString(today) + ' ' + response.data.results.sunrise + ' GMT'),
            sunset  : Date.parse(getDateAsString(today) + ' ' + response.data.results.sunset + ' GMT')
          }
        });
    }
  });