angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService) {

        var display = this;

        display.message = "My awesome message";

        display.createMessage = function createMessage() {
            MessageService
                .create({content: display.message}, function(res) {
                    display.messages.push(res);
                });
        };

        display.deleteMessage = function deleteMessage(message) {
            MessageService
                .delete({id: message.id}, function() {
                    display.messages.splice(display.messages.indexOf(message), 1);
                });
        };

        display.getMessages = function getMessages() {
            display.messages = MessageService.get();
        };

        display.getMessages();

    });