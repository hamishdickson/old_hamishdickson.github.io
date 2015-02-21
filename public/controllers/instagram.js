/**
 * Created by hamishdickson on 21/02/15.
 */
(function () {
    var app = angular.module('instagram-directive', []);

    app.directive('instgram', ['$http', function ($http, $scope) {

        return {
            restrict: 'E',
            templateUrl: 'public/views/instagram.html',
            controller: function () {
                var instagramApiUrl = "https://api.instagram.com/v1/media/popular?client_id=1e35c120cf174b948e06c09bb6f5422af&callback=JSON_CALLBACK";

                $scope.pics = [];

                $http.get(instagramApiUrl)
                    .success(function(response) {
                        $scope.pics.push(response.data);
                    })
                    .error(function() {
                        console.log("hmm")
                    });
            },
            controllerAs: "instagram"
        };
    }]);
})();


/*
angular.module("myApp", [])
    .filter('fromTo', function() {
        return function(input, from, total, lessThan) {
            from = parseInt(from);
            total = parseInt(total);
            for (var i = from; i < from + total && i < lessThan; i++) {
                input.push(i);
            }
            return input;
        }
    })
    .factory('instagram', ['$http',
        function($http) {
            return {
                fetchPopular: function(callback) {

                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }
    ])
    .controller("Example", function($scope, $interval, instagram) {
        $scope.pics = [];
        $scope.have = [];
        $scope.orderBy = "-likes.count";
        $scope.getMore = function() {
            instagram.fetchPopular(function(data) {
                for(var i=0; i<data.length; i++) {
                    if (typeof $scope.have[data[i].id]==="undefined") {
                        $scope.pics.push(data[i]) ;
                        $scope.have[data[i].id] = "1";
                    }
                }
            });
        };
        $scope.getMore();

        $scope.tags = [
            'Bootstrap', 'AngularJS', 'Instagram', 'Factory'
        ]
    });*/
