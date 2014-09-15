'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('MapCtrl', function($scope, $http, $location, Restangular) {

        Restangular.all('classes/food').getList().then(function(thing) {
            var foods = thing.data;
            for (var i = 0; i < foods.length; i++) {
                foods[i].id = i;
                foods[i].title = foods[i].name;
                foods[i].latitude = foods[i].location.latitude;
                foods[i].longitude = foods[i].location.longitude;
            }
            $scope.markers = foods;
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

        //function to handle marker click
        $scope.markersEvents = {
            click: function(gMarker, eventName, model) {
                if (model.$id) {
                    model = model.coords; //use scope portion then
                }
                //$scope.model = model;

                $location.path('/store\/' + model.objectId);
                //$scope.toggle('myOverlay', 'on');
                $scope.$apply();
            }
        };

        //rotation handlers
        $scope.myRot = function(event) {
            console.log($scope.map.control.getGMap());
            $scope.map.control.getGMap().setHeading(event.gesture.angle);
        };
    });
