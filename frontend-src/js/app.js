angular.module("GekuInfodisplay", ['ngResource', 'rx'])

    .config(function() {
        console.log("config");
    })

    .run(function() {
        moment.locale('de');
    });