angular.module("GekuInfodisplay")

  .factory("SaunaService", SaunaService);

function SaunaService ($http, socket, rx) {

  var subject = new rx.Subject();

  socket.on('sauna', function (temp) {
    subject.onNext(temp)
  });

  return {
    get : function () {
      return $http.get('/api/sauna')
        .then(response => response.data)
    },
    events: subject
  };
}