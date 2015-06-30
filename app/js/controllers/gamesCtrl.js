'use strict';

app.controller('gamesCtrl', ['$scope', 'identity','tripsService','$routeParams', function($scope, identity,tripService,$routeParams) {
    var games = [{title: "TicTacToe", url: "#/gameTTT", description: "Tic Tac Toe game. You can play agains the CPU or against another player."}, 
                 {title: "Snake", url: "#/gameSnake", description: "You've probably owned a Nokia phone - you know the drill."},
                 {title: "Sonic", url: "#/gameSonic", description: "You've got 70 seconds to collect all coins, better hurry!"}
                 ];
    $scope.games = games;
}]);