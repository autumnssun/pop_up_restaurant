'use strict';

describe('Service: myParse', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var myParse;
  beforeEach(inject(function (_myParse_) {
    myParse = _myParse_;
  }));

  it('should do something', function () {
    expect(!!myParse).toBe(true);
  });

});
