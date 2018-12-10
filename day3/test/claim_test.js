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

  describe('.coverage', function() {
    it('lists the squares covered by a 1x1 claim', function() {
      var claim = Claim.create("123", 1, 1, 1, 1);
      assert.deepStrictEqual([[1,1]], claim.coverage());
    })

    it('lists the squares covered by a 1x1 claim at (2,1)', function() {
      var claim = Claim.create("123", 2, 1, 1, 1);
      assert.deepStrictEqual([[2,1]], claim.coverage());
    })

    it('lists the squares covered by a 2x1 claim', function() {
      var claim = Claim.create("123", 1, 1, 2, 1);
      assert.deepStrictEqual([[1,1], [2,1]], claim.coverage());
    })
  })

  describe('.listOverlapsWith', () => {
    it('lists a single point for a 1x1 overlapping point', () => {
      var claim1 = Claim.create("", 1, 1, 1, 1);
      var claim2 = Claim.create("", 1, 1, 1, 1);
      assert.deepStrictEqual([[1,1]], claim1.listOverlapsWith(claim2));
    });

    it('lists a single point for a 2x1 overlapping with a 1x1', () => {
      var claim1 = Claim.create("", 2, 1, 1, 1);
      var claim2 = Claim.create("", 1, 1, 2, 1);
      assert.deepStrictEqual([[2,1]], claim1.listOverlapsWith(claim2));
    });

    it('list multiple points for a 2x2 overlap', () => {
      /*
      .......
      .111...
      .1##22.
      .1##22.
      ..2222.
      ..2222.
      .......
      */
      var claim1 = Claim.create("", 1, 1, 3, 3);
      var claim2 = Claim.create("", 2, 2, 4, 4);
      assert.deepStrictEqual([[2,2],[2,3],[3,2],[3,3]], claim1.listOverlapsWith(claim2));
    });


    it('lists no overlaps for non-overlapping 1x1 points', () => {
      var claim1 = Claim.create("", 2, 1, 1, 1);
      var claim2 = Claim.create("", 1, 1, 1, 1);
      assert.deepStrictEqual([], claim1.listOverlapsWith(claim2));
    });
  })
});
