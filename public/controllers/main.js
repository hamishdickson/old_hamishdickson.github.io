/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', function () {

        var SUN_X = 200,
            SUN_Y = 200;

        var EARTH_X = 500,
            EARTH_Y = 650;

        var MARS_X = 1000,
            MARS_Y = 200;

        var starting_point_x = 0,
            starting_point_y = 0;

        var G = 1;

        var INITIAL_VELOCITY_X = 0,
            INITIAL_VELOCITY_Y = 0;

        var TIME_STEP = 1000; // miniseconds

        var x = starting_point_x,
            y = starting_point_y;

        var delta_x = 0,
            delta_y = 0;
        

        $(function () {
            $('#comet').animate({left: '+=100px', top: '+=100px'}, 1000, 'linear');
        });

        $(function () {
            $('#comet').animate({left: '+=250px', top: '+=100'}, 1000, 'linear');
        });
    });
})();