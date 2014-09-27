'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('MapCtrl', function($scope, $http, $location, foodService, geolocation) {
        //get user current location as long as it is available zoom user to their current location
        geolocation.getLocation().then(function(data) {
            console.log(data);
            $scope.map.center.latitude = data.coords.latitude;
            $scope.map.center.longitude = data.coords.longitude;

        });
        foodService.getAllFood().then(function(data) {
            $scope.markers = (data);
            console.log($scope.markers);
        });
        //Creating the map here
        $scope.map = {
            control: {},
            center: {
                latitude: -27.500042700000000000,
                longitude: 153.006545700000060030
            },
            zoom: 14,
            draggable: true,
            options: {
                disableDefaultUI: true,

            }
        };

        $scope.zoomToFood = function(_lat, _long) {
            console.log('zoming');
            $scope.map.zoom = 17;
            $scope.map.center.latitude = _lat;
            $scope.map.center.longitude = _long;
        };

        //function to handle marker click
        $scope.markersEvents = {
            click: function(gMarker, eventName, model) {
                if (model.$id) {
                    model = model.coords; //use scope portion then
                }

                $location.path('/store\/' + model.objectId);
                //$scope.toggle('myOverlay', 'on');
                $scope.$apply();
            }
        };
    });
