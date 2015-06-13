'use strict';

app.controller('gamesCtrl', ['$scope', 'identity','tripsService','$routeParams', function($scope, identity,tripService,$routeParams) {
    var games = [{title: "TicTacToe", url: "http://mitko-kerezov.github.io/TicTacToe/", description: "Tic Tac Toe game. You can play agains the CPU or against another player."}, 
                 {title: "Snake", url: "http://sttodorov.github.io/TheSnake/", description: "You've probably owned a Nokia phone - you know the drill."},
                 {title: "Sonic", url: "http://mitko-kerezov.github.io/Sonic/", description: "You've got 70 seconds to collect all coins, better hurry!"}
                 ];
    $scope.games = games;
}]);