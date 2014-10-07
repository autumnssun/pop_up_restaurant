'use strict';

describe('Controller: DininghistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('restaurantApp'));

  var DininghistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DininghistoryCtrl = $controller('DininghistoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
