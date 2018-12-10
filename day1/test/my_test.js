var f = require('../lib/frequency_corrector')

var assert = require('assert');
describe('frequency_corrector', function() {
  beforeEach(function() {
    f.reset();
  })

  it('should start at zero ', function(){
    assert.equal(0, f.adjustment());
  });

  it('should increment by 1', function(){
    f.accum("+1")
    assert.equal(1, f.adjustment())
  })

  it('should increment by 2', function(){
    f.accum("+2")
    assert.equal(2, f.adjustment())
  })

  it('should decrement by 1', function(){
    f.accum("-1")
    assert.equal(-1, f.adjustment())
  })

  it('should decrement by 2', function(){
    f.accum("-2")
    assert.equal(-2, f.adjustment())
  })

  it('should decrement and increment', function(){
    f.accum("-2")
    f.accum("+7")
    f.accum("-5")
    f.accum("+12345")
    assert.equal(12345, f.adjustment())
  })

});
