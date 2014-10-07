'use strict';

/**
 * @ngdoc function
 * @name restaurantApp.controller:DininghistoryCtrl
 * @description
 * # DininghistoryCtrl
 * Controller of the restaurantApp
 */
angular.module('restaurantApp')
  .controller('DininghistoryCtrl', function ($scope,transactionServices,userService) {
    transactionServices.getAllOrder().then(function(data){
    	$scope.data=data;
    	
    	// if(userService.getUserObjecID()===data.customer.objectId){

    	// }
    })
  });
