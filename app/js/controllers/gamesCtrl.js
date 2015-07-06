'use strict';

app.controller('gamesCtrl', ['$scope', 'identity','tripsService','$routeParams', function($scope, identity,tripService,$routeParams) {
    var games = [{title: "TicTacToe", url: "#/gameTTT", description: "Tic Tac Toe game. You can play agains the CPU or against another player.", img: 'img/TicTacToe.png'}, 
                 {title: "Snake", url: "#/gameSnake", description: "You've probably owned a Nokia phone - you know the drill.", img: 'img/Snake.PNG'},
                 {title: "Sonic", url: "#/gameSonic", description: "You've got 70 seconds to collect all coins, better hurry!", img: 'img/Sonic.PNG'}
                 ];
    $scope.games = games;
}]);