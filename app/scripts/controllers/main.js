'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('MainCtrl', function($scope, $cookies) {
    	$scope.showLoginBtn=true;

        if ($cookies.userSessionCookies) {
        	$scope.showLoginBtn=false;
            console.log('you alreay log in');

        }
    });
