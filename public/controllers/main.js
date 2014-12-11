/**
 * Created by hamishdickson on 02/11/14.
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', function () {

        $(function () {
            $('#comet').animate({left: '+=100px', top: '+=100px'}, 1000, 'linear');
        });

        $(function () {
            $('#comet').animate({left: '+=250px', top: '+=100'}, 1000, 'linear');
        });
    });
})();