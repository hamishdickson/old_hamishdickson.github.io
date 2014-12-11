/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap',
        'main-controller', 'cv-controller']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home.html',
                controller: 'MainController'
            })
            .when('/cv', {
                templateUrl: 'public/views/cv.html',
                controller: 'CvController'
            })
            .otherwise({
                redirectTo: '/'
            });

    }]);
})();