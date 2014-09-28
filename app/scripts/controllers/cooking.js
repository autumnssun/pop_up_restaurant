'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:CookingCtrl
 * @description
 * # CookingCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('CookingCtrl', function($scope, userService, foodService, geolocation) {
        $scope.food = {};
        //just some dummy data 1st
        
        $scope.food.numberOfServe = 20;
        // get current user
        $scope.food.cooker = userService.getUserPointer();

        geolocation.getLocation().then(function(data) {
            console.log(data);
            $scope.food.location = createParseGeoPoint(data.coords.latitude, data.coords.longitude);
        });

        //
        var createParseGeoPoint = function(_lat, _long) {
            return {
                '__type': 'GeoPoint',
                'latitude': _lat,
                'longitude': _long
            };
        };

        $scope.onTimeSet = function(newDate) {
            var _time = {
                '__type': 'Date',
                'iso': newDate
            };
            console.log(_time);

            $scope.food.readyTime = _time;
        };

        $scope.selling = function(_food) {
            $scope.food.photos = $scope.fileLinks;
            console.log(_food);

            foodService.saleFood(_food);
        };

    });
