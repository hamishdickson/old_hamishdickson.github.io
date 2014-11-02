/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap',
        'main-controller', 'timer-controller', 'burnup-controller']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home.html',
                controller: 'MainController'
            })
            .when('/timer', {
                templateUrl: 'views/timer.html',
                controller: 'TimerController'
            })
            .when('/burnup', {
                templateUrl: 'views/burnup.html',
                controller: 'BurnupController'
            })
            .otherwise({
                redirectTo: '/'
            });

    }]);
})();