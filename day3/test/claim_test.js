var assert = require('assert');

var Claim = require('../lib/claim')

describe('Claim', function() {
  var d;

/**
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........

*/

  describe('can parse a claim from an input string', function() {
    it('works', function() {
      var claim = Claim.parse('#1 @ 2,3: 4x5')
      assert.strictEqual(claim.id, 1)
      assert.strictEqual(claim.x, 2)
      assert.strictEqual(claim.y, 3)
      assert.strictEqual(claim.w, 4)
      assert.strictEqual(claim.h, 5)
    })
  });

  describe('failure case', function() {
    it('works', function() {
      var claim = Claim.parse('#1 @ 1,3: 4x4')
      assert.strictEqual(claim.overlaps(1,8), false)
    });
  });

  describe('a simple claim x=1, y=1, w=1, h=1', function() {
    var claim = Claim.create("123", 1, 1, 1, 1)


    it('overlaps position 1, 1', function() {
      assert.strictEqual(claim.overlaps(1,1), true)
    });

    [
      [0,0],
      [1,0],
      [2,0],

      [0,1],
      [2,1],

      [0,2],
      [1,2],
      [2,2]
    ].forEach(function(testvalue) {
      var testx = testvalue[0]
      var testy = testvalue[1]

      it(`does not overlap position ${testx}, ${testy}`, function() {
        assert.strictEqual(claim.overlaps(testx, testy), false)
      });
    });
  });

  describe('a claim x=1, y=1, w=2, h=3', function() {
    var claim = Claim.create("123", 1, 1, 2, 3);

    [
      [1,1], [2,1],
      [1,2], [2,2],
      [1,3], [2,3]
    ].forEach(function(testvalue) {
      var testx = testvalue[0]
      var testy = testvalue[1]

      it(`overlaps position ${testx}, ${testy}`, function() {
        assert.strictEqual(claim.overlaps(testx, testy), true)
      });
    });

    [
      [0,0], [1,0], [2,0], [3,0],
      [0,1],               [3,1],
      [0,2],               [3,2],
      [0,3],               [3,3],
      [0,4], [1,4], [2,4], [3,4]
    ].forEach(function(testvalue) {
      var testx = testvalue[0]
      var testy = testvalue[1]

      it(`does not overlap position ${testx}, ${testy}`, function() {
        assert.strictEqual(claim.overlaps(testx, testy), false)
      });
    });
  });
});
