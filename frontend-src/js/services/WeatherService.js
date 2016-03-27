angular.module("GekuInfodisplay")

  .factory("WeatherService", WeatherService);

function WeatherService ($http, socket, rx) {

  var subject = new rx.Subject();

  socket.on('weather', function (temp) {
    subject.onNext(temp)
  });

  return {
    get    : function () {
      return $http.get('/api/weather')
        .then(response => response.data)
    },
    events : subject
  };
}