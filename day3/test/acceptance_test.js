/*
  What is the ID of the only claim that doesn't overlap?
*/
var assert = require('assert');

var find_non_overlapping_claim = require('../lib/find_non_overlapping_claim')

describe('find_non_overlapping_claim', function() {
  var input_lines = [
    '#1 @ 1,1: 2x2',
    '#2 @ 2,2: 2x2',
    '#3 @ 3,3: 1x1',
    '#4 @ 50,50: 1x1',
  ]

  it('identifies 4 as non-overlapping', () => {
    assert.strictEqual(find_non_overlapping_claim(input_lines), 4);
  })
})

