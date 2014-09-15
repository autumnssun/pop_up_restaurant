'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:SandboxCtrl
 * @description
 * # SandboxCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
    .controller('SandboxCtrl', function($scope, Restangular) {
        $scope.photoList = [];



        Restangular.one('classes/food', 'BOjxwmYMMz').get().then(function(data) {


                $scope.thisFood = data.data;
                //console.log(data.data.cooker.objectId);
                $scope.selectOptions = [];
                $scope.selectOptions.selected=[];
                $scope.selectOptions.selected.amount=0;
                //console.log(data.data.numberOfServe);
                //constructing the selectable numbers
                for (var i = 1; i < data.data.numberOfServe+1; i++) {
                    $scope.selectOptions.push({
                        amount: i,
                        total:i*data.data.price,
                    });

                }
                //console.log($scope.selectOptions);
                $scope.transaction = [];
                $scope.transaction.food = data.data.objectId;
                $scope.transaction.customer = 'me';
                $scope.transaction.serve = $scope.selectOptions.selected.amount;
                $scope.transaction.delivery = false;
                $scope.transaction.deliveryAddress = '';

                $scope.total = function() {
                    return  $scope.selectOptions.selected.amount * data.data.price;
                };

                //console.log($scope);

                Restangular.one('users', data.data.cooker.objectId).get().then(function(data) {
                    //console.log(data.data);
                    $scope.cooker = data.data;
                });




                $scope.country = {};
                $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
                    {
                        name: 'Afghanistan',
                        code: 'AF'
                    }, {
                        name: 'Åland Islands',
                        code: 'AX'
                    }, {
                        name: 'Albania',
                        code: 'AL'
                    }, {
                        name: 'Algeria',
                        code: 'DZ'
                    }, {
                        name: 'American Samoa',
                        code: 'AS'
                    }, {
                        name: 'Andorra',
                        code: 'AD'
                    }, {
                        name: 'Angola',
                        code: 'AO'
                    }, {
                        name: 'Anguilla',
                        code: 'AI'
                    }, {
                        name: 'Antarctica',
                        code: 'AQ'
                    }, {
                        name: 'Antigua and Barbuda',
                        code: 'AG'
                    }, {
                        name: 'Argentina',
                        code: 'AR'
                    }, {
                        name: 'Armenia',
                        code: 'AM'
                    }, {
                        name: 'Aruba',
                        code: 'AW'
                    }, {
                        name: 'Australia',
                        code: 'AU'
                    }
                ];

            }

        );
    });
