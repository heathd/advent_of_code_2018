var assert = require('assert');

var r = require('../lib/repetition_detector')

describe('repetition_detector', function() {
  var detector;

  beforeEach(function() {
    detector = r.build()
  })

  it("doesn't treat the first value as a repeat", function() {
    assert(!detector.put(1));
  })

  it("detects a 1 repeated", function() {
    detector.put(1)
    assert(detector.put(1));
  })

  it("doesn't signal a repetition if 1,2 input", function() {
    detector.put(1)
    assert(!detector.put(2));
  })

  it("detects 1,2,1", function() {
    detector.put(1)
    detector.put(2)
    assert(detector.put(1));
  })

  it("detects -1,2,-1", function() {
    detector.put(-1)
    detector.put(2)
    assert(detector.put(-1));
  })
});
