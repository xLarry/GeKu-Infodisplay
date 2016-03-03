angular.module("GekuInfodisplay")

    .factory("MessageService", ['$resource', MessageService]);

function MessageService($resource) {
    return $resource(
        'api/messages'
        , {}
        , {
            get: {method: 'GET', isArray: true}
            , create: {method: 'PUT'}
            , delete: {method: 'DELETE'}
        }
    )
}