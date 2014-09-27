'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.loginService
 * @description
 * # loginService
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .factory('userService', function userService(Restangular, localStorageService) {
        var userDB = Restangular.all('login');
        // $rootScope.sessionToken = null;
        // $rootScope.userObjectID= null;
        // $rootScope.userName=null;

        function getToken() {
            return localStorageService.get('token');
        }

        function setToken(_tk) {
            localStorageService.set('token', _tk);
        }
        //userName
        function getUserName() {
            return localStorageService.get('username');
        }

        function setUserName(_ursName) {
            localStorageService.set('username', _ursName);
        }

        //user ID
        function setUserObjecID(_objID) {
            localStorageService.set('userID', _objID);
        }

        function getUserObjecID() {
            return localStorageService.get('userID');
        }

        //get user poitner
        function getUserPointer() {
            return {
                '__type': 'Pointer',
                'className': '_User',
                'objectId':localStorageService.get('userID')
            };
        }


        function isLogin() {
            if (localStorageService.get('token') !== null) {
                return true;
            } else {
                return false;
            }
        }

        function logout() {
            localStorageService.clearAll();
            //$cookcookieStoreies.remove('userSessionCookies');
        }

        function login(_username, _password) {
            return userDB.get('?username=' + _username + '&password=' + _password);
        }

        // style guide
        // http://www.johnpapa.net/angular-style-guide/


        var service = {
            isLogin: isLogin,
            logout: logout,
            login: login,
            getSessionToken: getToken,
            setSessionToken: setToken,
            getUserID: getUserObjecID,
            setUserID: setUserObjecID,
            getUserName: getUserName,
            setUserName: setUserName,
            getUserPointer: getUserPointer,
        };

        return service;
    });
