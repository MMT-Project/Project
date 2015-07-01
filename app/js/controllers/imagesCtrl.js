'use strict';

app.controller('imagesCtrl', ['$scope', 'identity','notifier', 'auth', 'baseServiceUrl', 'imageService',
    function($scope, identity, notifier, auth, baseServiceUrl, imageService) {
        imageService.populateImages("").then(function(images) {
           $scope.images = images;
        });
    }]);