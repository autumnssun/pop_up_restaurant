'use strict';

describe('Service: fileUpLoader', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var fileUpLoader;
  beforeEach(inject(function (_fileUpLoader_) {
    fileUpLoader = _fileUpLoader_;
  }));

  it('should do something', function () {
    expect(!!fileUpLoader).toBe(true);
  });

});
