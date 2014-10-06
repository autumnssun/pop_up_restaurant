'use strict';

/**
 * @ngdoc directive
 * @name restaurantApp.directive:fileUpload
 * @description
 * # fileUpload



 <div class="fileUpload btn btn-primary">
    <span>Upload</span>
    <input type="file" class="upload" />
</div>

 */
angular.module('restaurantApp')
    .directive('fileUpload', function($http) {
        var the_button =

            '<div class="fileUpload">' +
            '<span><i class="glyphicon glyphicon-camera"/><br/>Add Photo</span>' +
            '<input type="file"  class="upload" name="file" ng-model="scope.fileLinks" onchange="angular.element(this).scope().uploadFile(this.files)" />' +
            '</div>';
        return {
            template: '<div></div>',
            restrict: 'EA',
            link: function postLink(scope, element) { /*attrs*/
                scope.fileLinks = [];
                scope.overLayOn = false;
                element.html(the_button);
                scope.uploadFile = function(files) {
                    scope.overLayOn = true;
                    $http.post('https://api.parse.com/1/files/' + files[0].name, files[0], {
                        withCredentials: false,
                        headers: {
                            'X-Parse-Application-Id': 'dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg',
                            'X-Parse-REST-API-Key': 'MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0',
                            'Content-Type': 'image/jpeg'
                        },
                        // transformRequest: angular.identity
                    }).then(function(data) {
                        scope.overLayOn = false;
                        scope.fileLinks.push(data.data.url);
                    });
                };
            }
        };
    });
