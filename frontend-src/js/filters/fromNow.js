angular.module("GekuInfodisplay")

    .filter("fromNow", function() {
        var fromNow = function(date) {
            return moment(date).fromNow();
        };
        fromNow.$stateful = true;
        return fromNow;
    });