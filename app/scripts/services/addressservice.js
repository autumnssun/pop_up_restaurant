'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.addressService
 * @description
 * # addressService
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .service('addressService', function addressService($http, $q, geolocation) {
        var decodeAddress = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';

        var getCurrentLocation = function() {
            //this is a promise that will return current location of the device
            return geolocation.getLocation().then(function(data) {
                return data;
            });
        };

        var addressFromLatLng = function(_lat, _long) {
            return $http.get(decodeAddress + _lat + ',' + _long).then(function(data) {
                return (data.data.results);
            });
        };

        var getCurrentAddress = function() {
            //this is a promise that will return the current addresss as returnobject
            return getCurrentLocation().then(function(data) {
                returnObject = data;
                //this will get the http request to take all the geocoding
                return addressFromLatLng(data.coords.latitude, data.coords.longitude).then(function(addressFromLatLngData) {
                    returnObject.decodeAddress = addressFromLatLngData;
                    return returnObject;
                });
            });
        };


        var returnObject = {
            addressFromLatLng: addressFromLatLng,
            getCurrentAddress: getCurrentAddress,
            getCurrentLocation: getCurrentLocation
        };
        return returnObject;
    });
