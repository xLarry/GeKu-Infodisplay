angular.module("GekuInfodisplay")

    .factory("MessageService", function($http, $httpParamSerializerJQLike) {

        var apiUrl = "http://localhost:3000/api";

        function getMessages() {
            return $http
                .get(apiUrl + "/messages")
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        function createMessage(messageText) {
            return $http
                .put(apiUrl + "/messages", $httpParamSerializerJQLike({
                content: messageText
            }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {
                    return response.data;
                });
        }

        function deleteMessage(messageId) {
            return $http({
                url: apiUrl + "/messages",
                method: 'DELETE',
                data: $httpParamSerializerJQLike({ id: messageId }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function(response) {
                    return response.data;
                });
        }

        return {
            getMessages: getMessages,
            createMessage: createMessage,
            deleteMessage: deleteMessage
        };

    });