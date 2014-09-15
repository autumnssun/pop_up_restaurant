'use strict';

describe('Directive: foodCarousle', function () {

  // load the directive's module
  beforeEach(module('restaurantApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<food-carousle></food-carousle>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the foodCarousle directive');
  }));
});
