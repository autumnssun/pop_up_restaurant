'use strict';

describe('Controller: UserprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('restaurantApp'));

  var UserprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserprofileCtrl = $controller('UserprofileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});