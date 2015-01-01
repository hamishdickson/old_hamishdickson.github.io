/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', function () {

        // todo when happy remove the jQuery files et
/*
        var SUN_X = 200,
            SUN_Y = 200;

        var EARTH_X = 500,
            EARTH_Y = 650;

        var MARS_X = 1000,
            MARS_Y = 200;

        var STARTING_POINT_X = 0,
            STARTING_POINT_Y = 0;

        var STARTING_VELOCITY_X = 10,
            STARTING_VELOCITY_Y = 10;

        var G = 1;

        var TIME_STEP = 10; // miniseconds

        var x = STARTING_POINT_X,
            y = STARTING_POINT_Y;

        var u_x = STARTING_VELOCITY_X,
            u_y = STARTING_VELOCITY_Y;

        var delta_x = 1,
            delta_y = 1;

        this.setNextStep = function () {
            // s = ut + 0.5at^2

            delta_x = u_x * TIME_STEP;
            delta_y = u_y * TIME_STEP;

            x += delta_x;
            y += delta_y;

            console.log("x: " + x);
            console.log("y: " + y);
        };

        this.xAcceleration = function () {

        };

        //for (count = 0; count < 100; count++) {

        if (x > 1350) {
            x = 0;

            $(document).ready(function () {
                $('#comet').css('left', '0');
            });

        }

        if (y > 500) {
            y = 0;

            $(document).ready(function () {
                $('#comet').css('top', '0');
            });

        }

        this.setNextStep();

        $(function () {
            $('#comet').animate({left: '+=' + delta_x + "px", top: '+=' + delta_y + "px"}, 1000, 'linear');

            $('#comet').css('top', '0');
            $('#comet').css('left', '0');
            $('#comet').animate({left: '+=' + delta_x + "px", top: '+=' + delta_y + "px"}, 1000, 'linear');
        });*/

        /*var snapB = Snap('#sun');

        // SVG B - "Squiggly" Path
        var myPathB = snapB.path("M62.9 14.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1").attr({
            id: "squiggle",
            fill: "none",
            strokeWidth: "4",
            stroke: "#ffffff",
            strokeMiterLimit: "10",
            strokeDasharray: "9 9",
            strokeDashOffset: "988.01"
        });

        // SVG B - Draw Path
        var lenB = myPathB.getTotalLength();

        // SVG B - Animate Path
        myPathB.attr({
            stroke: '#fff',
            strokeWidth: 4,
            fill: 'none',
            // Draw Path
            "stroke-dasharray": lenB + " " + lenB,
            "stroke-dashoffset": lenB
        }).animate({"stroke-dashoffset": 10}, 2500,mina.easeinout);

        // SVG B - Circle
        var CircleB = snapB.circle(16,16,8);
        CircleB.attr({
            fill: "#3f4445",
            stroke: "#fff",
            strokeWidth: 2
        });

        setTimeout( function() {
            Snap.animate(0, lenB, function( value ) {
                movePoint = myPathB.getPointAtLength( value );
                CircleB.attr({ cx: movePoint.x, cy: movePoint.y }); // move along path via cx & cy attributes
            }, 2500,mina.easeinout);
        });


        setTimeout( function() {
            Snap.animate(0, len, function( value ) {
                movePoint = myPathA.getPointAtLength( value );
                CircleA.attr({ cx: movePoint.x, cy: movePoint.y }); // move along path via cx & cy attributes
            }, 2500,mina.easeinout);
        });*/


        var s = Snap('#svg');
        var sun = Snap('#sun');
        var earth = Snap('#earth');
        var mars = Snap('#mars');
        var comet = Snap('#comet');

        var smallCircle = s.circle(150, 100, 20);

        smallCircle.attr({
            fill: "grey",
            stroke: "dimgrey",
            strokeWidth: 5
        });

        var sunCircle = sun.circle(200, 200, 30);
        
        sunCircle.attr({
            fill: "yellow",
            stroke: "orange",
            strokeWidth: 4
        });



        falling();

        function falling(){
            animateBall(smallCircle); // Send it to be infinitely animated
        }

        function animateBall(ball){
            ball.attr({ transform: 't0 -200'}); // Reset the ball's position to behind the cloud
            var timing = getRandomArbitrary(1000, 10000); // Random transition time between times we specify
            // Animate the flake and do a new animation for it when it's done (repeat this function)
            ball.stop().animate({ transform: 't250 500 '}, timing, function(){ animateBall(ball);});
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    });
})();