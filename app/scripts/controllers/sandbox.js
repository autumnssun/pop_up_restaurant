'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:SandboxCtrl
 * @description
 * # SandboxCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('SandboxCtrl', function($scope) {
        $scope.sortbylist = [{
            'display': 'Cheap 1st',
            'model': 'price'
        }, {
            'display': 'Cheap lasst',
            'model': 'price'
        }];
    });
