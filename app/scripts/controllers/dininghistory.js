'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:DininghistoryCtrl
 * @description
 * # DininghistoryCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('DininghistoryCtrl', function($scope, transactionServices, userService, foodService) {
        transactionServices.getAllOrder().then(function(data) {
            $scope.data = data;
            angular.forEach(data, function(value) {
                foodService.queryFood(value.food.objectId).then(function(fdata) {
                    value.foodData = (fdata.data);
                    userService.getUserData(fdata.data.cooker.objectId).then(function(ckdata) {
                        value.cookerData = ckdata;
                    });
                });
                userService.getUserData(value.customer.objectId).then(function(cdata) {
                    value.customerData = (cdata);
                });
            });
        });
    });
