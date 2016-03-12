angular.module("GekuInfodisplay", ['ngResource'])

    .config(function() {
        console.log("config");
    })

    .run(function() {
        moment.locale('de');
    });