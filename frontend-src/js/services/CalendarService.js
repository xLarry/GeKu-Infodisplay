angular.module("GekuInfodisplay")

    .factory("CalendarService", ['$resource', CalendarService]);

function CalendarService($resource) {
    return $resource(
        'api/calendar'
        , {}
        , {
            get: {method: 'GET', isArray: true}
        }
    )
}