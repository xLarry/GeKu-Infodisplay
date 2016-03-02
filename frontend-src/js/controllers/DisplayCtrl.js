angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService) {

        var display = this;

        display.message = "My awesome message";

        display.createMessage = function createMessage() {
            MessageService
                .createMessage(display.message)
                .then(function() {
                    display.getMessages();
                });
        };

        display.deleteMessage = function deleteMessage(id) {
            MessageService
                .deleteMessage(id)
                .then(function() {
                    display.getMessages();
                });
        };

        display.getMessages = function getMessages() {
            MessageService
                .getMessages()
                .then(function(response) {
                    display.messages = response;
                });
        };

        display.getMessages();

    });