angular.module("GekuInfodisplay")

    .filter("fromNow", function() {
        return function(date) {
            return moment(date).fromNow();
        };
    });