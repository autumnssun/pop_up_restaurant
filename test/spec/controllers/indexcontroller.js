'use strict';

describe('Controller: IndexcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('restaurantApp'));

  var IndexcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexcontrollerCtrl = $controller('IndexcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
