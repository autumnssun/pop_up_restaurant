'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('MainCtrl', function($scope, $cookieStore, userService) {
    	console.log($cookieStore);
        $scope.userName=userService.getUserName();
        console.log(userService.getUserName());
    });
