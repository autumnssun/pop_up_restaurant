'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.dataBouncer
 * @description
 * # dataBouncer
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .service('dataBouncer', function dataBouncer(localStorageService) {
        var setTempData = function(data) {
            localStorageService.set('temptData', data);
        };
        var getTempData = function() {
            return localStorageService.get('temptData');
        };
        var returnObject = {
            setTempData: setTempData,
            getTempData: getTempData
        };

        return returnObject;
    });
