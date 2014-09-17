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
        // var allfood=Restangular.all('classes/food');
        //  allfood.getList().then(function(data){
            var thisobj=Restangular.one('classes/food','d73VcdrWs0');

            console.log(thisobj);

            //thisobj.name='more awsome fooo';
            //var tem=thisobj.numberOfServ
            //console.log(thisobj.numberOfServe);
            //thisobj.numberOfServe=3+tem;
            //console.log(thisobj.numberOfServe);
            thisobj.put().then(function(d){
                console.log(d);
            });
            //console.log(thisobj/getRestangularUrl());
        // });
    });
