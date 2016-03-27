angular.module("GekuInfodisplay", ['ngResource', 'rx', 'btford.socket-io'])

  .config(function () {
    console.log("config");
  })

  .run(function () {
    moment.locale('de');

  })
  .factory('socket', socketFactory => socketFactory());

