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
        if(userService.isLogin()){
            $location.path('userProfile');
        }
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.getSession = function() {
            console.log(userService.getSessionToken());
        };

        $scope.doLogOut = function() {
            userService.logout();
            userService.setSessionToken(null);
        };

        $scope.doSubmit = function() {
            userService.login($scope.user.username, $scope.user.password).f
                console.log(data.data);
                //saving important information into user services
                userService.setSessionToken(data.data.sessionToken);
                userService.setUserName(data.data.username);
                userService.setUserID(data.data.objectId);
                //console.log(userService.getUserName());
                //userService.setUser(data.data)
                //console.log('Yay!!');
                
                ngToast.create({
                    content: '<label>Login Succesfull</label><br><span>Going back to home page</span>'
                });
                $location.path('#/');

            }, function() {

                // console.log('wrong password!!');
            });
        };

    });
