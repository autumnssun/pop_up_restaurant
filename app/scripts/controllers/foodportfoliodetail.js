'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:FoodportfoliodetailCtrl
 * @description
 * # FoodportfoliodetailCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('FoodportfoliodetailCtrl', function($scope, dataBouncer, $rootScope,Restangular,$location) {
        // var storeID = $routeParams.dta;
        $scope.thisFood = dataBouncer.getTempData();

        console.log(dataBouncer.getTempData());
        $scope.showMod = function() {
            $rootScope.toggle('modOverlay', 'on');
        };
        $scope.showDele = function() {
            $rootScope.toggle('deleteOverlay', 'on');
        };
        $scope.cancel = function() {
            $rootScope.toggle('deleteOverlay', 'off');
            $rootScope.toggle('modOverlay', 'off');
        };

        $scope.deleteMe = function(_f) {
            console.log(_f);
            _f.showme = false;
            var thisobj = Restangular.one('classes/food', _f.objectId);
            thisobj.active = false;
            thisobj.put().then(function(data) {
                console.log(data);
                $rootScope.toggle('deleteOverlay', 'off');
                $location.path('foodPortfolio');

            });
        };

    });
