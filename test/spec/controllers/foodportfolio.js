'use strict';

describe('Controller: FoodportfolioCtrl', function () {

  // load the controller's module
  beforeEach(module('restaurantApp'));

  var FoodportfolioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoodportfolioCtrl = $controller('FoodportfolioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
