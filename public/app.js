/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap',
        'main-controller']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home.html',
                controller: 'MainController'
            })
            .when('/about', {
                templateUrl: 'public/views/about.html',
                controller: 'MainController'
            })
            .when('/cv', {
                templateUrl: 'public/views/cv.html',
                controller: 'MainController'
            })
            .when('/projects', {
                templateUrl: 'public/views/projects.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();