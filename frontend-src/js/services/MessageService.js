angular.module("GekuInfodisplay")

  .factory("MessageService", function MessageService ($http) {

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

    return {
      get : getMessages,
      create : createMessage,
      delete : deleteMessage
    };
  });

