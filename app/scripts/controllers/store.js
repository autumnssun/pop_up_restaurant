'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('StoreCtrl', function($scope, $routeParams, $location, userService, $rootScope, foodService, Restangular, ngToast) {
        //Defining the data to be return to the view
        //console.log(foodService.queryFood($routeParams.dta));
        //selections object
        var orderDB = Restangular.all('classes/order');
        var storeID = $routeParams.dta;
        $scope.transaction={};
        $scope.thisFood={};
        $scope.thisFood.readyTime={};
        $scope.thisFood.readyTime.iso='34123083';
        $scope.showCashier = false;
        foodService.buildCompledFood(storeID).then(function(_return) {
            $scope.thisFood = _return;
            console.log(_return);
        });

        $scope.gotoCashier = function() {
            $scope.showCashier = !$scope.showCashier;
        };



        $scope.billTotal = function() {
            if ($scope.thisFood.serveList && $scope.thisFood.serveList.selected && $scope.thisFood.serveList.selected.amount) {
                return $scope.thisFood.serveList.selected.amount * $scope.thisFood.price;
            } else {
                return 0;
            }
        };

        $scope.total = function(a, b) {
            return a * b;
        };

        var createParsePointer = function(_className, _objID) {
            var ptr = {
                '__type': 'Pointer',
                'className': _className,
                'objectId': _objID
            };
            console.log(ptr);
            return ptr;
        };


        //confirm buying function
        $scope.confirm = function() {
            /* Tobe implemented later;
            $scope.transaction.delivery = false;
            $scope.transaction.deliveryAddress = '';
            $scope.transaction.paid = false;
            */
            //only place the 
            var thisobj = Restangular.one('classes/food', $scope.thisFood.objectId);
            //updating the new one
            thisobj.numberOfServe = $scope.thisFood.numberOfServe - $scope.thisFood.serveList.selected.amount;
            //console.log(thisobj.numberOfServe);
            //console.log(userService.isLogin());

            if (thisobj.numberOfServe >= 0 && userService.isLogin() && userService.getUserID() !== null) {

                $scope.transaction.food = createParsePointer('food', $scope.thisFood.objectId);
                $scope.transaction.customer = createParsePointer('_User', userService.getUserID());
                $scope.transaction.serve = $scope.thisFood.serveList.selected.amount;

                //Deduct the number of stock
                orderDB.post(angular.toJson($scope.transaction)).then(function() {
                    //update the foodbd
                    ngToast.create({
                        content: '<p>Thank you for odering the food</p>'
                    });
                    $rootScope.toggle('myOverlay', 'off');
                    //console.log(config);
                }, function() {
                    ngToast.create({
                        class: 'danger',
                        content: 'Cannot place order at the moment'
                    });
                });

                //recordign the transaction
                thisobj.put().then(function(d) {
                        console.log(d);
                        ngToast.create({
                            content: 'Order place sucessfully'
                        });
                        $location.path('dining');
                        $rootScope.toggle('myOverlay', 'off');
                    },
                    function() {
                        ngToast.create({
                            content: 'Problem with order'
                        });
                        $rootScope.toggle('myOverlay', 'off');
                    });
            } else {
                ngToast.create({
                    class: 'danger',
                    content: 'Can not place order now'
                });
            }

        };
    });
