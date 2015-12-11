angular.module('ClassyAngular',[
    'ui.router',
    'recipes'
]).config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider', ($stateProvider, $urlRouterProvider, $interpolateProvider) ->
    $interpolateProvider.startSymbol('[[')
    $interpolateProvider.endSymbol(']]')

    $urlRouterProvider.otherwise '/'

    # Global Routing
    $stateProvider
        .state "app",
            url: "/"
            template:'RABBLE RABBLE RABBLE'

    return
])
