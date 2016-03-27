angular.module("GekuInfodisplay")
  .component('messageCreate', {
    templateUrl : 'js/components/message-create/message-create.component.html',
    controller  : function ($location, MessageService) {
      this.createMessage = (message) => {
        MessageService
          .create({content : message})
          .then((res) => {
            $location.url('/');
          });
      };

    }
  });