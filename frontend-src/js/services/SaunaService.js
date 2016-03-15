angular.module("GekuInfodisplay")

    .factory("SaunaService", ['$resource', SaunaService]);

function SaunaService($resource) {
    return $resource(
        'api/sauna'
        , {}
        , {
            get: {method: 'GET', isArray: false}
        }
    )
}