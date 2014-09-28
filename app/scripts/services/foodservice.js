'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.foodService
 * @description
 * # foodService
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .service('foodService', function foodService(Restangular, $q) {
        var foodDb = Restangular.all('classes/food');
        var cookerDb = Restangular.all('users');
        var photoDb = Restangular.all('classes/photo');

        var queryFood = function(_ID) {
            return foodDb.get(_ID);
        };
        var queryCooker = function(_ID) {
            return cookerDb.get(_ID);
        };

        var queryPhotos = function(_IDs) {
            var photosPromises = [];
            angular.forEach(_IDs, function(id) {
                photosPromises.push(queryPhoto(id));
            });
            return $q.all(photosPromises);

        };

        var queryPhoto = function(_ID) {
            return photoDb.get(_ID).then(function(data) {
                return data.data;
            });
        };

        var queryPhotoUrl = function(_ID) {
            return photoDb.get(_ID).then(function(data) {
                return data.data.img.url;
            });
        };

        var getFoodAndThumbnail = function(_ID) {
            return queryFood(_ID).then(function(data) {
                returnObject = data.data;
                if (data.data.photos[0]) {
                    queryPhoto(data.data.photos[0]).then(function(pts) {
                        returnObject.thumb = pts;
                    });
                }

                return returnObject;
            });
        };

        var getAllFood = function() {
            return Restangular.all('classes/food').getList().then(function(thing) {
                var foods = thing.data;
                var i = 0;

                angular.forEach(foods, function(food) {
                    console.log(food);
                    food.id = i;
                    food.title = food.name;
                    food.latitude = food.location.latitude;
                    food.longitude = food.location.longitude;
                    food.thumb = food.photos[0];

                    food.options = {
                        icon: 'images/tip-01.png',
                        labelContent: food.name,
                        labelClass: 'labels-icon', // the CSS class for the label
                        labelAnchor: '6 31'
                    };

                    //if use photo as pointers then fo this
                    // if (food.photos) {
                    //     queryPhotoUrl(food.photos[0])
                    //         .then(function(data) {
                    //             food.thumb = data;

                    //             food.options = {
                    //                 icon: 'images/tip-01.png',
                    //                 labelContent: food.name,
                    //                 labelClass: 'labels-icon', // the CSS class for the label
                    //                 labelAnchor: '6 31'
                    //             };
                    //         });
                    //     i++;
                    // }
                });

                return foods;
            });
        };

        var buildCompledFood = function(_ID) {
            return queryFood(_ID).then(function(data) {
                returnObject = data.data;
                returnObject.photoList = [];
                returnObject.cookerinfo = {};
                returnObject.serveList = [];


                for (var i = 1; i < returnObject.numberOfServe + 1; i++) {
                    returnObject.serveList.push({
                        amount: i,
                        total: i * returnObject.price,
                    });
                }

                queryCooker(data.data.cooker.objectId).then(function(ckr) {
                    returnObject.cookerinfo = ckr.data;
                });
                //if using photos as pointer do this
                queryPhotos(data.data.photos).then(function(pts) {
                    returnObject.photoList = pts;
                });
                return returnObject;
            });
        };

        var saleFood = function(_food) {
            foodDb.post(_food).then(function(data) {
                console.log(data);
            });
        };

        var returnObject = {
            // queryFood: queryFood,
            // queryCooker: queryCooker,
            // queryPhoto: queryPhoto,
            // queryPhotos: queryPhotos,
            buildCompledFood: buildCompledFood,
            getFoodAndThumbnail: getFoodAndThumbnail,
            getAllFood: getAllFood,


            saleFood: saleFood,
        };

        return returnObject;

    });
