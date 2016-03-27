angular.module("GekuInfodisplay")

  .factory("MessageService", function MessageService ($http, rx, socket) {

    var baseUrl = 'api/messages/';

    var transformData = (response) => response.data;

    function createMessage (message) {
      return $http.put(baseUrl, message).then(transformData);
    }

    function deleteMessage (message) {
      return $http.delete(baseUrl + message.id);
    }

    function getMessages () {
      return $http.get(baseUrl).then(transformData);
    }

    var subject = new rx.Subject();

    socket.on('messages', function(events){
      subject.onNext(events)
    });

    return {
      get : getMessages,
      create : createMessage,
      delete : deleteMessage,
      events: subject
    };
  });

