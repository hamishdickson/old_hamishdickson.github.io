angular.module("MyApp").run(["$templateCache", function($templateCache) {$templateCache.put("views/home.html","<div>\n    <div>\n        <div class=\"body\" ng-controller=\"MainController\">\n            <button class=\"btn btn-default\" ng-click=\"iterate()\">Start game of life</button>\n\n            <table>\n            <tr ng-repeat=\"row in grid track by $index\">\n                <td ng-repeat=\"cell in row track by $index\"><div class=\"{{getCellCssClass($parent.$index, $index)}} {{getHamishClass($parent.$index, $index)}}\"></div></td>\n            </tr>\n            </table>\n\n        </div>\n    </div>\n</div>");}]);