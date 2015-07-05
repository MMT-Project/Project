'use strict';

app.controller('driverDetailsCtrl', ['$scope', 'identity','notifier','driversService','imageService','$routeParams','$location', function($scope, identity, notifier,driversDetails,imageService,$routeParams,$location) {

    $scope.isAuth = identity.isAuthenticated();
    $scope.publicTrips = "views/partials/tripsPublic.html";

    driversDetails.getDriverDetails($routeParams.id).then(function (data) {
        $scope.driver = data;
        $scope.latestTrips = data.trips;

        imageService.getImages($scope.driver.name).then(function(images) {
			$scope.images = images;
		});
    });

}]);

