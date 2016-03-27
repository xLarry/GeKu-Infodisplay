angular.module("GekuInfodisplay")
  .component('sunrise', {
    templateUrl : 'js/components/sunrise/sunrise.component.html',
    controller  : function (SunriseService) {
      SunriseService().then(function (data) {
        this.sunData = data;
      }.bind(this))
    }
  });