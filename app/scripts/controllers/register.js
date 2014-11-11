'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('RegisterCtrl', function($scope, ngToast, userService, $location,Facebook) {
        $scope.doSubmit = function(_user) {
            console.log(_user);
            _user.photo = dummyPhoto();
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

        $scope.$watch(function() {
            // This is for convenience, to notify if Facebook is loaded and ready to go.
            return Facebook.isReady();
        }, function(newVal) {
            // You might want to use this to disable/show/hide buttons and else
            $scope.facebookReady = true;
            console.log('aksjdhaksdj');
        });

        function dummyPhoto() {
            return {
                '__type': 'File',
                'name': 'tfss-5f229e30-6d7a-439b-8fb2-1f9a38855e68-photo.png',
                'url': 'http://files.parsetfss.com/92a0b306-c88d-47f1-a627-0b37dc12503e/tfss-5f229e30-6d7a-439b-8fb2-1f9a38855e68-photo.png'
            }
        };
        $scope.fbLogin = function() {
            // From now on you can use the Facebook service just as Facebook api says
            Facebook.login(function(response) {
                console.log(response);
            });
        };
    });
