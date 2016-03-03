angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService) {

        var display = this;

        display.message = "My awesome message";

        display.createMessage = function createMessage() {
            MessageService.create({content: display.message});
            display.getMessages();
        };

        display.deleteMessage = function deleteMessage(id) {
            MessageService.delete({id: id}).$promise.then(function(res) {
                display.getMessages();
            });
        };

        display.getMessages = function getMessages() {
            display.messages = MessageService.get();
        };

        display.getMessages();

    });