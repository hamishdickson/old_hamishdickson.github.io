/**
 * Created by hamishdickson on 02/11/14.
 *
 * changed to game of life 18/01/15
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', [ '$scope', function ($scope) {

        var HEIGHT = 20;
        var WIDTH = 20;

        $scope.ALIVE_CLASS = 'alive';
        var HAMISH_CLASS = 'hamish';
        $scope.DEAD_CLASS = 'dead';

        var INITIAL_GRID = [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ];



        $scope.getCellCssClass = function(x, y) {
            if ($scope.grid[x][y] == true) {
                return $scope.ALIVE_CLASS;
            } else {
                return $scope.DEAD_CLASS;
            }
        };

        $scope.grid = INITIAL_GRID;

        $scope.iterate = function() {
            var newGrid = emptyGrid();

            for (j = 0; j < HEIGHT; j++) {
                for (i = 0; i < WIDTH; i++) {
                    var numberOfNeighbours = countNeighbours(i, j);
                    if ($scope.grid[j][i]) {
                        newGrid[j][i] = (numberOfNeighbours == 2 || numberOfNeighbours == 3);
                    } else {
                        newGrid[j][i] = numberOfNeighbours == 3;
                    }
                }
            }

            $scope.grid = newGrid;
        };

        var emptyGrid = function() {
            var EMPTY_GRID = [
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            ];
            return EMPTY_GRID;
        };

        var isCellOnGrid = function(x, y) {
            return (x >= 0 && y >= 0 && x <= WIDTH - 1 && y <= HEIGHT - 1);
        };

        var isCellAlive = function(x, y) {
            return isCellOnGrid(x, y) && $scope.grid[y][x];
        };

        var countNeighbours = function(x, y) {
            var count = 0;
            if (isTopLeftCellAlive(x, y)) count++;
            if (isTopCellAlive(x, y)) count++;
            if (isTopRightCellAlive(x, y)) count++;
            if (isLeftCellAlive(x, y)) count++;
            if (isRightCellAlive(x, y)) count++;
            if (isBottomLeftCellAlive(x, y)) count++;
            if (isBottomCellAlive(x, y)) count++;
            if (isBottomRightCellAlive(x, y)) count++;
            return count;
        };

        var isBottomRightCellAlive = function(x, y) {
            return isCellAlive(x + 1, y + 1);
        };

        var isBottomCellAlive = function(x, y) {
            return isCellAlive(x, y + 1);
        };

        var isBottomLeftCellAlive = function (x, y) {
            return isCellAlive(x - 1, y + 1);
        };

        var isRightCellAlive = function(x, y) {
            return isCellAlive(x + 1, y);
        };

        var isLeftCellAlive = function(x, y) {
            return isCellAlive(x - 1, y);
        };

        var isTopRightCellAlive = function(x, y) {
            return isCellAlive(x + 1, y - 1);
        };

        var isTopCellAlive = function(x, y) {
            return isCellAlive(x, y - 1);
        };

        var isTopLeftCellAlive = function(x, y) {
            return isCellAlive(x-1, y-1);
        };

    }]);
})();