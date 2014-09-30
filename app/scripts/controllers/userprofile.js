'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('UserprofileCtrl', function($scope, $location, userService) {
        if (!userService.isLogin()) {
            $location.path('login');
        } else {
            userService.getCurrentUserData().then(function(data) {
                $scope.userInfo = data;
                console.log(data);
            });
        }
        $scope.doLogOut = function() {
            userService.logout();
            userService.setSessionToken(null);
            $location.path('login');
        };
    });
