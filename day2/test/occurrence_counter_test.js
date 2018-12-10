var assert = require('assert');

var OccurenceCounter = require('../lib/occurrence_counter')

describe('occurrence_counter', function() {
  var c;

  describe('two letter occurence counter', function() {
    beforeEach(function() {
      c = OccurenceCounter.build(2)
    })

    it('it returns false for an empty string input', function() {
      assert(!c.matches(''));
    });

    ['aa', 'aabb', 'aabbcc', 'zzbcde'].forEach(function(testvalue) {
      it("it returns true for the string '" + testvalue +"'", function() {
        assert(c.matches(testvalue));
      })
    });

    ['ba', 'aaa', 'aaaa', 'aaaaa'].forEach(function(testvalue) {
      it("it returns false for the string '" + testvalue +"'", function() {
        assert(!c.matches(testvalue));
      })
    });
  });

  describe('three letter occurence counter', function() {
    beforeEach(function() {
      c = OccurenceCounter.build(3)
    })

    it('it returns false for an empty string input', function() {
      assert(!c.matches(''));
    });

    ['aaa', 'aaabb', 'aaabbbccc', 'zzzbcde'].forEach(function(testvalue) {
      it("it returns true for the string '" + testvalue +"'", function() {
        assert(c.matches(testvalue));
      })
    });

    ['ba', 'aa', 'aaaa', 'aaaaa'].forEach(function(testvalue) {
      it("it returns false for the string '" + testvalue +"'", function() {
        assert(!c.matches(testvalue));
      })
    });
  });
});
