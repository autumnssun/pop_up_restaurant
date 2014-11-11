'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:FoodportfolioCtrl
 * @description
 * # FoodportfolioCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('FoodportfolioCtrl', function($scope, foodService, userService, dataBouncer, $location, Restangular) {
        $scope.selectMe = function(_food) {
            console.log('fasdas');
            dataBouncer.setTempData(_food);
            $location.path('foodPortfolioDetail');
        };
        foodService.getAllFood().then(function(data) {
            $scope.allfood = data;
            console.log(data);
            // if(!$scope.allfood){
            //     $location.path('#');
            // }
            angular.forEach(data, function(food) {
                if (food.cooker.objectId === userService.getUserID()) {
                    food.showme = true;
                } else {
                    food.showme = false;
                }
            });
        });
        $scope.deleteMe = function(_f) {
            console.log(_f);
            _f.showme = false;
            var thisobj = Restangular.one('classes/food', _f.objectId);
            thisobj.active = false;
            thisobj.put().then(function(data) {

            });
        };


        $scope.cordinate = {};
        $scope.endTouch = function endTouch(e) {

            $scope.cordinate = {
                'visibility': 'hidden'
            };
            $scope.$apply();
        };
        $scope.tada = function tada(e) {
            angular.forEach(e.pointers, function(value) {
                console.log(value)
                $scope.cordinate = {
                    'visibility': 'visible',
                    'left': value.pageX + 'px',
                    'top': value.pageY -60+ 'px'
                };
                $scope.$apply();
                console.log($scope.cordinate);
            });
        };
        $scope.tada2 = function tada2(e) {
            angular.forEach(e.pointers, function(value) {
                $scope.cordinate = {
                    'visibility': 'visible',
                    'margin-left': value.pageX + 'px',
                    'margin-top': value.pageY -60+ 'px'
                };
                $scope.$apply();
            });
        };
    });
