angular.module("GekuInfodisplay")
  .component('skycon', {
    template : '<canvas width="75" height="75"></canvas>',
    bindings : {
      data : '<'
    },
    controller : class {

      constructor ($element) {
        this.skycons = new Skycons();
        this.element = $element;
      }

      $postLink () {
        this.skycons.add(this.element.find('canvas')[0], this.data.icon);
        this.skycons.play();
      }

      $onChanges () {
        this.skycons.set(this.element.find('canvas')[0], this.data.icon);
      }

    }
  });

