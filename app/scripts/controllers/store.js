'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('StoreCtrl', function($scope, $routeParams, Restangular, $location, userService, $rootScope, ngToast) {
        //Defining the data to be return to the view
        $scope.photoList = [];
        $scope.transaction = {};
        $scope.selectOptions = [];
        $scope.selectOptions.selected = [];
        $scope.selectOptions.selected.amount=1;
        var storeID = $routeParams.dta;
        var foodDB = Restangular.one('classes/food', storeID);
        var orderDB = Restangular.all('classes/order');
        var _food;

        var createParsePointer = function(_className, _objID) {
            var ptr = {
                '__type': 'Pointer',
                'className': _className,
                'objectId': _objID
            };
            return ptr;
        };

        $scope.buy = function() {
            $rootScope.toggle('myOverlay', 'on');
        };

        //confirm buying function
        $scope.confirm = function() {


            /* Tobe implemented later;
            $scope.transaction.delivery = false;
            $scope.transaction.deliveryAddress = '';
            $scope.transaction.paid = false;
            */
            //only place the 
            if (userService.isLogin() && userService.getUserID()!== null) {
                
                $scope.transaction.food = createParsePointer('food', _food.objectId);
                $scope.transaction.customer = createParsePointer('_User', userService.getUserID());
                $scope.transaction.serve = $scope.selectOptions.selected.amount;

                console.log($scope.transaction);
                orderDB.post(angular.toJson($scope.transaction)).then(function() {
                    //update the foodbd

                    ngToast.create({
                        content: '<p>Order placed</p>'
                    });
                    $rootScope.toggle('myOverlay', 'off');
                    //console.log(config);
                }, function() {
                    ngToast.create({
                        class: 'danger',
                        content: 'Cannot place order at the moment'
                    });
                });
            } else {
                ngToast.create({
                    class: 'danger',
                    content: 'Please login to place order'
                });
            }
        };

        $scope.remove = function(){
            var updating=Restangular.one('classes/food/'+storeID);
            
            $scope.thisFood.numberOfServe-=$scope.selectOptions.selected.amount;
            console.log(updating);
            console.log($scope.thisFood.numberOfServe);
            
            var json='{"numberOfServe":'+$scope.thisFood.numberOfServe+'}';
            json='{"price":4534}';
            console.log(json);
            
            updating.customPUT(null,null,storeID,json).then(function(data){
                console.log(data.data);
            },function(data){
                console.log(data);
            });
        };

        //starting of page logic
        if ($routeParams.dta) {
            //fetching this food in formation
            
            foodDB.get().then(function(data) {
                    _food = data.data;
                    $scope.thisFood = _food;

                    for (var i = 1; i < _food.numberOfServe + 1; i++) {
                        $scope.selectOptions.push({
                            amount: i,
                            total: i * _food.price,
                        });

                    }
                    $scope.total = function() {
                        return $scope.selectOptions.selected.amount * _food.price;
                    };

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
                },
                //incase the promise fail inform people what happened
                function() {
                    ngToast.create({
                        class: 'danger',
                        content: '<label>This food is not available</label><br><span>Going back to home page</span>'
                    });
                    $location.path('#/dining');
                });
        } else {

        }


    });
