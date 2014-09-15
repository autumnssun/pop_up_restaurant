'use strict';

describe('Service: browseStore', function () {

  // load the service's module
  beforeEach(module('restaurantApp'));

  // instantiate service
  var browseStore;
  beforeEach(inject(function (_browseStore_) {
    browseStore = _browseStore_;
  }));

  it('should do something', function () {
    expect(!!browseStore).toBe(true);
  });

});
