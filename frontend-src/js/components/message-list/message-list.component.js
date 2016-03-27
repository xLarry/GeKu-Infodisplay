angular.module("GekuInfodisplay")
  .component('messageList', {
    templateUrl : 'js/components/message-list/message-list.component.html',
    controller  : function ($interval, MessageService) {
      this.deleteMessage = (message) => {
        MessageService
          .delete(message)
          .then(this.getMessages)
      };

      MessageService.events.subscribe(messages => this.messages = messages);

    }
  });