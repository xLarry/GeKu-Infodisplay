angular.module("GekuInfodisplay")

    .factory("WeatherService", ['$resource', WeatherService]);

function WeatherService($resource) {
    return $resource(
        'api/weather'
        , {}
        , {
            get: {method: 'GET', isArray: false}
        }
    )
}