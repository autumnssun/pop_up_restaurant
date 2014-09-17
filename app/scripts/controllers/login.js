'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('LoginCtrl', function($scope, Restangular, $location, userService,ngToast) {

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
                console.log(data.data);
                //saving important information into user services
                userService.setSessionToken(data.data.sessionToken);
                userService.setUserName(data.data.username);
                userService.setUserID(data.data.objectId);
                //console.log(userService.getUserName());
                //userService.setUser(data.data)
                console.log('Yay!!');
                
                ngToast.create({
                    content: '<label>Login Succesfull</label><br><span>Going back to home page</span>'
                });
                $location.path('#/');

            }, function() {

                // console.log('wrong password!!');
            });
        };

    });
