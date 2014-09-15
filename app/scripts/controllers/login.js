'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('LoginCtrl', function($scope, Restangular, $location, userService) {

        $scope.user = {
            username: 'nano',
            password: '123'
        };

        $scope.getSession = function() {
            console.log(userService.getSessionToken());
        };

        $scope.doLogOut = function() {
            userService.logout();
            userService.setSessionToken(null);
        };

        $scope.doSubmit = function() {
            userService.login($scope.user.username, $scope.user.password).then(function(data) {
                userService.setSessionToken(data.data.sessionToken);
                userService.setUser
                console.log('Yay!!');

            }, function() {

                // console.log('wrong password!!');
            });
        };

    });
