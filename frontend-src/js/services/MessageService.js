angular.module("GekuInfodisplay")

    .factory("MessageService", function($http) {

        var apiUrl = "http://localhost:3000/api";

        function getMessages() {
            return $http
                .get(apiUrl + "/messages")
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }

        return {
            getMessages: getMessages
        };

    });