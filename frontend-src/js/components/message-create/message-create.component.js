angular.module("GekuInfodisplay")
  .component('messageCreate', {
    templateUrl : 'js/components/message-create/message-create.component.html',
    controller  : function (MessageService) {
      this.createMessage = (message) => {
        MessageService
          .create({content : message})
          .then((res) => {
            window.location = '/';
          });
      };

    }
  });