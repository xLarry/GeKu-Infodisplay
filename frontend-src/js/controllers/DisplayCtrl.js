angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService, $interval) {

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
             MessageService.get(function(messages) {
                 display.messages = messages;
            });
        };

        display.getMessages();

        $interval(function() {
            display.getMessages();
        }, 10 * 1000);

    });