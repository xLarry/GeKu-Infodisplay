angular.module("GekuInfodisplay")

    .controller("DisplayCtrl", function(MessageService) {

        var display = this;

        display.name = "GeKu";

        MessageService
            .getMessages()
            .then(function(response) {
                display.messages = response;
            });

    });