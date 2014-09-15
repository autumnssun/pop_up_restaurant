'use strict';

/**
 * @ngdoc service
 * @name restaurantApp.loginService
 * @description
 * # loginService
 * Service in the restaurantApp.
 */
angular.module('restaurantApp')
    .factory('userService', function userService(Restangular, $cookieStore) {
        var userDB = Restangular.all('login');
        var sessionToken = null;
        var userObjectID= null;

        function getToken() {
            return sessionToken;
        }
        function getUserObjecID(){
        	return userObjectID;
        }
        function setToken(_tk){
        	sessionToken=_tk;
        }
        function setUserObjecID(_objID){
        	userObjectID=_objID;
        }

        function isLogin() {
            if (sessionToken!==null) {
                return true;
            } else {
                return false;
            }
        }

        function logout() {
            $cookieStore.remove('userSessionCookies');
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
            getUser:getUserObjecID,
            setUser:setUserObjecID
        };

        return service;
    });
