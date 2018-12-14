var assert = require('assert');

var react = require('../lib/react')

describe('acceptance', function() {
  it("reduces the sample string", () => {
    assert.strictEqual(react('dabAcCaCBAcCcaDA'), 'dabCBAcaDA')
  })
});
