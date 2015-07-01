'use strict';

app.controller('profileCtrl', ['$scope', 'identity','notifier', 'auth', 'imageService', 'baseServiceUrl', '$route',
    function($scope, identity, notifier, auth, imageService, baseServiceUrl, $route) {

        auth.info().then(function(userData) {
           for (var index = 0; index < userData.images.length; index++) {
               userData.images[index] = baseServiceUrl + '/' + userData.images[index];
           }
           $scope.currentUser = userData;
        });

        $scope.uploadFile = function(files) {
            var f = document.getElementById('fileInput').files[0],
                fd = new FormData();

                fd.append("file", f);
                imageService.addPhoto(fd).then(function() {
                    imageService.populateImages("").then(function(images) {
                       $route.reload();
                    });
                })
        };
    }]);