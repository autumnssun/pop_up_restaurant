'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:CookingCtrl
 * @description
 * # CookingCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('CookingCtrl', function($scope, userService, foodService, addressService) {
        $scope.food = {};
        //just some dummy data 1st
        $scope.links=['http://img.gawkerassets.com/img/199vu342jcfpwjpg/original.jpg','http://www.shiftcomm.com/wp-content/uploads/2014/07/storymaker-best-hubble-space-telescope-images-20092-514x268.jpg'];
        $scope.food.numberOfServe = 20;
        // get current user
        $scope.food.cooker = userService.getUserPointer();

        addressService.getCurrentAddress().then(function(data) {
            console.log(data);
            $scope.food.location = createParseGeoPoint(data.coords.latitude, data.coords.longitude);
            $scope.food.address = data.decodeAddress[0];
        });

        //
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
            $scope.food.readyTime=onTimeSet($scope.sharedDate);
            console.log(_food);
        };

    });
