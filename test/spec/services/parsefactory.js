'use strict';

describe('Service: ParseFactory', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var ParseFactory;
  beforeEach(inject(function (_ParseFactory_) {
    ParseFactory = _ParseFactory_;
  }));

  it('should do something', function () {
    expect(!!ParseFactory).toBe(true);
  });

});
