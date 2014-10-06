'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:CookingCtrl
 * @description
 * # CookingCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('CookingCtrl', function($scope, userService, foodService, addressService,$location) {
        // .controller('CookingCtrl', function($scope) {
        if(!userService.isLogin()){
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
            //appending photo array and sharedTime array
            $scope.food.photos = $scope.fileLinks;
            $scope.food.readyTime = onTimeSet($scope.sharedDate);
            if($scope.food.photos!==null&&$scope.food.readyTime!==null&&$scope.food.location!==null&&$scope.food.numberOfServe>0){
                foodService.saleFood(_food);
                $location.path('dining');
            }else{
                console.log('can not sell missing information');
            }            
        };

    });
