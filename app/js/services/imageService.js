app.factory('imageService', ['$http', '$q','notifier', 'authorization', 'baseServiceUrl', 'auth', function($http, $q, notifier, authorization, baseServiceUrl, auth) {
    var addPhotoUrl = baseServiceUrl +'/api/users/AddPhoto',
        getPhotos = baseServiceUrl +'/api/images';

    return {
        addPhoto: function (photo) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            headers['Content-Type'] = undefined;
            $http.post(addPhotoUrl, photo, { withCredentials: true, headers: headers, transformRequest: angular.identity })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    for (var errorMsg in error.ModelState) {
                        notifier.error(error.ModelState[errorMsg][0]);
                    }
                });

            return deferred.promise;
        },
        getImages: function (email) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(getPhotos + '?email=' + email, { headers: headers })
                .success(function (images) {
                    for (var index = 0; index < images.length; index++) {
                        images[index] = baseServiceUrl + '/' + images[index];
                    }
                    deferred.resolve(images);
                }).error(function (error) {
                    for (var errorMsg in error.ModelState) {
                        notifier.error(error.ModelState[errorMsg][0]);
                    }
                });

            return deferred.promise;
        }
    }
}]);