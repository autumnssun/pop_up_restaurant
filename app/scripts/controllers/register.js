'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('RegisterCtrl', function($scope, ngToast,userService,$location) {
        $scope.doSubmit = function(_user) {
        	console.log(_user);
            userService.registerUser(_user).then(function(data) {
                console.log(data);
                ngToast.create({
                    content: '<label> User created</label><br><span>Going back to your profile page</span>'
                });
                userService.setSessionToken(data.data.sessionToken);
                userService.setUserName(_user.username);
                userService.setUserID(data.data.objectId);
                $location.path('userprofile');
            });
        };
    });
