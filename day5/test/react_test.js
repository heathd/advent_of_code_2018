var assert = require('assert');

var react = require('../lib/react')

describe('react', function() {
  it("does not reduce a", () => {
    assert.strictEqual(react('a'), 'a')
  })

  it("does not reduce A", () => {
    assert.strictEqual(react('A'), 'A')
  })

  it("reduces aA to nothing", () => {
    assert.strictEqual(react('aA'), '')
  })

  it("does not reduce aa", () => {
    assert.strictEqual(react('aa'), 'aa')
  })

  it("does not reduce AA", () => {
    assert.strictEqual(react('AA'), 'AA')
  })

  it("reduces aAa to a", () => {
    assert.strictEqual(react('aAa'), 'a')
  })

  it("reduces aAAa to nothing", () => {
    assert.strictEqual(react('aAAa'), '')
  })
});
