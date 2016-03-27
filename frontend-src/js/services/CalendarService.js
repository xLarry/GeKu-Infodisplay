angular.module("GekuInfodisplay")

  .factory("CalendarService", CalendarService);

function CalendarService ($http, rx, socket) {

  var subject = new rx.Subject();

  socket.on('calendar', (events) => subject.onNext(events));

  return {
    get    : function () {
      return $http.get('api/calendar')
        .then(response => response.data)
    },
    events : subject
  };
}