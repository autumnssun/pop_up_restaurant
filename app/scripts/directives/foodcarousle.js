'use strict';

/**
 * @ngdoc directive
 * @name restaurantApp.directive:foodCarousle
 * @description
 * # foodCarousle
 */
angular.module('restaurantApp')
    .directive('foodCarousle', function($rootScope, $swipe) {
        return function(scope, element) {
            var startX = null;
            var startY = null;
            var endAction = 'cancel';

            var deltaX;
            var deltaXRatio;
            var carouselId = element.parent().parent().attr('id');
            console.log(element.siblings());
            var translateAndRotate = function(x, y, z, deg) {
                element[0].style['-webkit-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
                element[0].style['-moz-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
                element[0].style['-ms-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
                element[0].style['-o-transform'] = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
                element[0].style.transform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotate(' + deg + 'deg)';
                //console.log(element.parent().length);
            };

            $swipe.bind(element, {

                start: function(coords) {
                    endAction = null;
                    startX = coords.x;
                    startY = coords.y;

                },

                cancel: function(e) {
                	console.log(e);
                    endAction = null;
                    translateAndRotate(0, 0, 0, 0);
                    e.stopPropagation();
                },

                end: function(coords, e) {
                    if (endAction === 'prev') {
                        $rootScope.carouselPrev(carouselId);
                    } else if (endAction === 'next') {
                        $rootScope.carouselNext(carouselId);
                    }
                    translateAndRotate(0, 0, 0, 0);
                    translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
                    e.stopPropagation();
                },

                move: function(coords) {
                    if (startX !== null) {
                        deltaX = coords.x - startX;
                        deltaXRatio = deltaX / element[0].clientWidth;
                        if (deltaXRatio > 0.3) {
                            endAction = 'next';
                        } else if (deltaXRatio < -0.3) {
                            endAction = 'prev';
                        } else {
                            endAction = null;
                        }
                        translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
                    }
                }
            });
        };
    });
