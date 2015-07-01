app.factory('imageService', ['$http', '$q','notifier', 'authorization', 'baseServiceUrl', 'auth', function($http, $q, notifier, authorization, baseServiceUrl, auth) {
    var addPhotoUrl = baseServiceUrl +'/api/users/AddPhoto';

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
        populateImages: function (email) {
            var deferred = $q.defer();            
            auth.info(email).then(function(userData) {
               for (var index = 0; index < userData.images.length; index++) {
                   userData.images[index] = baseServiceUrl + '/' + userData.images[index];
               }
               deferred.resolve(userData.images);
            });
            
            return deferred.promise;
        }
    }
}]);