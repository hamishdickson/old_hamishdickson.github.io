/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', function () {

        var sun_x = 200,
            sun_y = 200;

        var earth_x = 500,
            earth_y = 500;

        var mars_x = 200,
            mars_y = 700;

        var starting_point_x = 0,
            starting_point_y = 0;

        var G = 1;

        var initial_velocity_x = 0,
            initial_velocity_y = 0;

        var time_step = 1000; // miniseconds

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