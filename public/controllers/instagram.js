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
                var bob = "token=27979401.1e35c12.80379493f0604b47a60ee2873cac3c13";
                var u = "instagram.com";

                //var instagramApiUrl = "https://api.instagram.com/v1/media/popular?client_id=1e35c120cf174b948e06c09bb6f5422a";
                var instagramApiUrl = "https://api." + u + "/v1/users/self/feed?access_" + bob;

                var pics = [];

                $http.get(instagramApiUrl)
                    .success(function(response) {
                        pics.push(response.data);
                    })
                    .error(function() {
                        console.log("hmm dat no worky")
                    });
            },
            controllerAs: "instagram"
        };
    }]);
})();