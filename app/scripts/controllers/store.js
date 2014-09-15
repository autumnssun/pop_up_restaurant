'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('StoreCtrl', function($scope,$routeParams, Restangular, userService) {
        //Defining the data to be return to the view
        $scope.photoList = [];
        $scope.transaction = {};
        $scope.selectOptions = [];
        $scope.selectOptions.selected = [];
        $scope.selectOptions.selected.amount = 1;
        var storeID=$routeParams.dta;

        var orderDB = Restangular.all('classes/order');
        var foodDB = Restangular.one('classes/food', storeID);
       
        var createParsePointer = function(_className, _objID) {
            return {
                '__type': 'Pointer',
                'className': _className,
                'objectId': _objID
            };
        };

        $scope.buy = function() {
            $rootScope.toggle('myOverlay', 'on');
        };

        //confirm buying function
        $scope.confirm = function() {
            if (userService.isLogin) {
                orderDB.post(angular.toJson($scope.transaction)).then(function(config) {
                    console.log('transaction recorded');
                    console.log(config);
                });
            }
        };

        //starting of page logic
        if ($routeParams.dta) {
            var _food;
            foodDB.get().then(function(data) {
                    $scope.thisFood = data.data;

                    _food = data.data;

                    for (var i = 1; i < _food.numberOfServe + 1; i++) {
                        $scope.selectOptions.push({
                            amount: i,
                            total: i * _food.price,
                        });

                    }

                    $scope.transaction.food = createParsePointer('food', _food.objectId);
                    // $scope.transaction.customer = createParsePointer('_user', );
                    $scope.transaction.serve = $scope.selectOptions.selected.amount;
                    $scope.transaction.delivery = false;
                    $scope.transaction.deliveryAddress = '';
                    $scope.transaction.paid = false;

                    $scope.total = function() {
                        return $scope.selectOptions.selected.amount * _food.price;
                    };
                    // userService.login().

                    var cookerDB = Restangular.one('users', _food.cooker.objectId);
                    cookerDB.get().then(function(data) {
                        //console.log(data.data);
                        $scope.cooker = data.data;
                    });

                    if (_food.photos) {
                        angular.forEach(_food.photos, function(value) {
                            Restangular.one('classes/photo', value).get().then(function(data) {
                                $scope.photoList.push(data.data);
                            });
                        });
                    }
                }

            );
        }


    });
