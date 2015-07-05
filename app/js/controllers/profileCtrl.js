'use strict';

app.controller('profileCtrl', ['$scope', 'identity','notifier', 'auth', 'imageService', 'baseServiceUrl', '$route',
    function($scope, identity, notifier, auth, imageService, baseServiceUrl, $route) {

        auth.info().then(function(userData) {

          $scope.currentUser = userData;
          imageService.getImages($scope.currentUser.email).then(populateImages);

          function populateImages(images) {
            $scope.images = images;
          }

          $scope.uploadFile = function(files) {
            var f = document.getElementById('fileInput').files[0],
                fd = new FormData();

            fd.append("file", f);
            imageService.addPhoto(fd).then(function() {
                imageService.getImages($scope.currentUser.email).then(populateImages);
            })
          };
        });

    }]);