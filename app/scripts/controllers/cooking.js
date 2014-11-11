'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:CookingCtrl
 * @description
 * # CookingCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('CookingCtrl', function($scope, userService, foodService, addressService, $location,ngToast) {
        // .controller('CookingCtrl', function($scope) {
        if (!userService.isLogin()) {
            $location.path('login');
        }
        $scope.food = {};
        $scope.food.cooker = userService.getUserPointer();

        addressService.getCurrentAddress().then(function(data) {
            console.log(data.decodeAddress[0].formatted_address);
            $scope.food.location = createParseGeoPoint(data.coords.latitude, data.coords.longitude);
            $scope.food.address = data.decodeAddress[0].formatted_address;
        });

        var createParseGeoPoint = function(_lat, _long) {
            return {
                '__type': 'GeoPoint',
                'latitude': _lat,
                'longitude': _long
            };
        };

        var onTimeSet = function(_time) {
            return {
                '__type': 'Date',
                'iso': _time
            };
        };

        $scope.selling = function(_food) {
            $scope.food.photos = $scope.fileLinks;
            $scope.food.readyTime = onTimeSet($scope.sharedDate);
            $scope.food.active=true;
            if ($scope.sellingFood.$valid) {
                foodService.saleFood(_food);
                $location.path('foodPortfolio');
            } else {
                 ngToast.create({
                    content: '<label> Missing information </label>',
                    class:'danger'
                });
            }
        };

    });
