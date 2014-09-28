'use strict';

/**
 * @ngdoc directive
 * @name restaurantApp.directive:fileUpload
 * @description
 * # fileUpload
 */
angular.module('restaurantApp')
    .directive('fileUpload', function($http) {

        return {
            template: '<div></div>',
            restrict: 'EA',
            link: function postLink(scope, element) { /*attrs*/
            	scope.fileLinks=[];
            	scope.status='ready';
                element.html('<input type="file" class="custom-file-input" name="file" ng-model="scope.fileLinks" onchange="angular.element(this).scope().uploadFile(this.files)" />');
                scope.uploadFile = function(files) {
                	scope.status='uploading';
                    $http.post('https://api.parse.com/1/files/' + files[0].name, files[0], {
                        withCredentials: false,
                        headers: {
                            'X-Parse-Application-Id': 'dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg',
                            'X-Parse-REST-API-Key': 'MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0',
                            'Content-Type': 'image/jpeg'
                        },
                        transformRequest: angular.identity
                    }).then(function(data) {
                    	console.log(data);
                       	scope.fileLinks.push(data.data.url); 	
                       	console.log(scope.fileLinks);
                    });
                };
            }
        };
    });
