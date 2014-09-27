'use strict';

describe('Service: foodService', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var foodService;
  beforeEach(inject(function (_foodService_) {
    foodService = _foodService_;
  }));

  it('should do something', function () {
    expect(!!foodService).toBe(true);
  });

});
