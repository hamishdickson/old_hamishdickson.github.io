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

        var STARTING_POINT_X = 0,
            STARTING_POINT_Y = 0;

        var STARTING_VELOCITY_X = 0,
            STARTING_VELOCITY_Y = 0;

        var G = 1;

        var INITIAL_VELOCITY_X = 100,
            INITIAL_VELOCITY_Y = 100;

        var TIME_STEP = 10; // miniseconds

        var x = STARTING_POINT_X,
            y = STARTING_POINT_Y;

        var u_x = STARTING_VELOCITY_X,
            u_y = STARTING_VELOCITY_Y;

        var delta_x = 100,
            delta_y = 100;

        this.setNextStep = function() {
            // s = ut + 0.5at^2

            delta_x = u_x * TIME_STEP;
            delta_y = u_y * TIME_STEP;
        };

        $(function () {
            $('#comet').animate({left: '+=' + delta_x + "px", top: '+=' + delta_y + "px"}, 1000, 'linear');
        });
    });
})();