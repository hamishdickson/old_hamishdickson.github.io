/**
 * Created by hamishdickson on 02/11/14.
 *
 * changed to game of life 18/01/15
 */
(function () {
    var app = angular.module('main-controller', []);

    app.controller('MainController', [ '$scope', '$timeout', function ($scope, $timeout) {

        var HEIGHT = 35;
        var WIDTH = 70;
        var INTERVAL_TIME = 500;

        $scope.ALIVE_CLASS = 'alive';
        var HAMISH_CLASS = 'hamish';
        $scope.DEAD_CLASS = 'dead';

        var INITIAL_GRID = init();

        function init() {
            var localGrid = [];
            for (var initPositionHeight = 0; initPositionHeight < HEIGHT; initPositionHeight++) {
                localGrid[initPositionHeight] = initRow();
            }

            return localGrid;
        }

        function initRow() {
            var row = [];

            var SEED_SIZE = 7;

            for (var initPositionWidth = 0; initPositionWidth < WIDTH; initPositionWidth++) {
                var next = Math.floor(Math.random() * SEED_SIZE);

                if (next > SEED_SIZE - 2) {
                    row[initPositionWidth] = true;
                } else {
                    row[initPositionWidth] = false;
                }
            }

            return row;
        };


        $scope.getCellCssClass = function(x, y) {
            if ($scope.grid[x][y] == true) {
                return $scope.ALIVE_CLASS;
            } else {
                return $scope.DEAD_CLASS;
            }
        };

        $scope.grid = INITIAL_GRID;

        $scope.iterate = function () {
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

            $timeout(function() { $scope.iterate(); }, INTERVAL_TIME);
        };

        var emptyGrid = function() {

            var emptyGrid = [];

            for (var emptyY = 0; emptyY < HEIGHT; emptyY++) {
                emptyGrid[emptyY] = emptyRow();
            }

            return emptyGrid;
        };

        function emptyRow() {
            emptyRowArray = [];
            for (var emptyX = 0; emptyX < WIDTH; emptyX++) {
                emptyRowArray[emptyX] = false;
            }

            return emptyRowArray;
        }

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