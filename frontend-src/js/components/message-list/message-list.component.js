angular.module("GekuInfodisplay")
  .component('messageList', {
    templateUrl : 'js/components/message-list/message-list.component.html',
    controller  : function ($interval, MessageService) {
      this.deleteMessage = (message) => {
        MessageService
          .delete(message)
          .then(this.getMessages)
      };

      this.getMessages = () => {
        MessageService.get()
          .then(messages => this.messages = messages);
      };

      this.getMessages();

      // Alle 10 Sekunden
      $interval(this.getMessages, 10 * 1000);

    }
  });