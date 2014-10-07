'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.transactionServices
 * @description
 * # transactionServices
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .service('transactionServices', function transactionServices(Restangular) {
        var orderDB = Restangular.all('classes/order');
        var getAllOrder = function() {
            return orderDB.getList().then(function(thing) {
                var orders = thing.data;
                return orders;
            });
        };

        var returnObject = {
            getAllOrder: getAllOrder
        };

        return returnObject;
    });
