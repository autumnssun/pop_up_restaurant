'use strict';

describe('Service: transactionServices', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var transactionServices;
  beforeEach(inject(function (_transactionServices_) {
    transactionServices = _transactionServices_;
  }));

  it('should do something', function () {
    expect(!!transactionServices).toBe(true);
  });

});
