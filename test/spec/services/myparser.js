'use strict';

describe('Service: myParser', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var myParser;
  beforeEach(inject(function (_myParser_) {
    myParser = _myParser_;
  }));

  it('should do something', function () {
    expect(!!myParser).toBe(true);
  });

});
