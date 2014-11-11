'use strict';

describe('Service: dataBouncer', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var dataBouncer;
  beforeEach(inject(function (_dataBouncer_) {
    dataBouncer = _dataBouncer_;
  }));

  it('should do something', function () {
    expect(!!dataBouncer).toBe(true);
  });

});
