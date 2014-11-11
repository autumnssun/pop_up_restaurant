'use strict';

/**
 * @ngdoc overview
 * @name restaurantApp
 * @description
 * # restaurantApp
 *
 * Main module of the application.
 */
angular
    .module('restaurantApp', [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'google-maps',
        'FBAngular',
        'angular-gestures',
        'angular-loading-bar',
        'mobile-angular-ui',
        'restangular',
        'ui.router',
        'ui.select',
        'ngToast',
        'LocalStorageModule',
        'angularFileUpload',
        'timer',
        'geolocation',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'mgcrea.ngStrap',
        'pageslide-directive',
        'angulartics',
        'angulartics.google.analytics',
        'angular.filter',
        'hmTouchEvents',
        'facebook'
    ])
    // .run(function(user) {
    //     user.init({ appId: '' });
    // });
    .config(function($routeProvider, cfpLoadingBarProvider, RestangularProvider, uiSelectConfig,FacebookProvider) {
        cfpLoadingBarProvider.includeSpinner = false; //configuring the loading theme

        //uiSelectConfig.theme = 'selectize'; //configuring the selection theme
        uiSelectConfig.theme = 'selectize'; //configuring the selection theme

        //configure facebook thing
        FacebookProvider.init('1619826378244292');

        //congfiguring restangular directive
        //master key : gpCg1eiaS0HRGqbb1fxqaoaFzHlvLEveSFbPlOC8
        RestangularProvider.setBaseUrl('https://api.parse.com/1/');
        RestangularProvider.setDefaultHeaders({
            'X-Parse-Application-Id': 'dCmrudTKTJFxZAZNMoFjolAutEpwrCDMX91tzGLg',
            'X-Parse-REST-API-Key': 'MgOlryPflpjonYxpj2DvK9OPbbGc4xeFbQ4Np2o0',
            'Content-Type': 'application/json'
        });
        RestangularProvider.setRestangularFields({
            id: 'objectId'
        });
        RestangularProvider.setFullResponse(true);
        RestangularProvider.setResponseExtractor(function(response, operation) {
            var newResponse;
            // This is a get for a list
            switch (operation) {
                case 'getList':
                    newResponse = response.results;
                    break;
                default:
                    newResponse = response;
                    break;
            }
            // console.log(newResponse);
            return newResponse;
        });
        //end of restangular config

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/dining', {
                templateUrl: 'views/map.html',
                controller: 'MapCtrl'
            })
            .when('/store', {
                templateUrl: 'views/store.html',
                controller: 'StoreCtrl'
            })
            .when('/store/:dta', {
                templateUrl: 'views/store.html',
                controller: 'StoreCtrl'
            })
            .when('/cooker', {
                templateUrl: 'views/cooking.html',
                controller: 'CookingCtrl'
            })
            .when('/sandbox', {
                templateUrl: 'views/sandbox.html',
                controller: 'SandboxCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/sandbox', {
                templateUrl: 'views/sandbox.html',
                controller: 'SandboxCtrl'
            })
            .when('/userProfile', {
                templateUrl: 'views/userprofile.html',
                controller: 'UserprofileCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/diningHistory', {
                templateUrl: 'views/dininghistory.html',
                controller: 'DininghistoryCtrl'
            })
            .when('/foodPortfolio', {
              templateUrl: 'views/foodportfolio.html',
              controller: 'FoodportfolioCtrl'
            })
            .when('/foodPortfolioDetail', {
              templateUrl: 'views/foodportfoliodetail.html',
              controller: 'FoodportfoliodetailCtrl'
            })
            .when('/foodPortfolioDetail/:dta', {
                templateUrl: 'views/foodportfoliodetail.html',
                controller: 'FoodportfoliodetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
