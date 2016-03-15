angular.module("GekuInfodisplay")

    .filter("calendar", function() {
        var calendar = function(date) {
            return moment(date).calendar();
        };
        calendar.$stateful = true;
        return calendar;
    });