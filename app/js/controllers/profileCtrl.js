'use strict';

app.controller('profileCtrl', ['$scope', 'identity','notifier', 'auth',
    function($scope, identity, notifier, auth) {
        if (identity.isAuthenticated()) {
            auth.info().then(function(userData) {
               $scope.currentUser = userData
            });
        }
    }]);