var assert = require('assert');

var differs_by_one_char = require('../lib/differs_by_one_char')

describe('DiffersByOneChar', function() {
  var d;

  describe('two letter occurence counter', function() {
    it('it returns false if strings of different length', function() {
      assert.strictEqual(false, differs_by_one_char('a', 'aa'))
    });

    it('it returns false for one character strings with the same string', function() {
      assert.strictEqual(false, differs_by_one_char('a', 'a'))
    });

    it('it returns true for one character strings with different char', function() {
      assert.strictEqual(true, differs_by_one_char('a', 'b'))
    });

    it('it returns false for two character strings same chars', function() {
      assert.strictEqual(false, differs_by_one_char('aa', 'aa'))
    });

    it('it returns false for two character strings where both chars differ', function() {
      assert.strictEqual(false, differs_by_one_char('aa', 'bb'))
    });

    it('it returns true for two character strings where one char differs', function() {
      assert.strictEqual(true, differs_by_one_char('aa', 'ab'))
    });

    [
      ['aaa', 'aab'],
      ['aaaa', 'aaab'],
      ['baaa', 'aaaa'],
      ['abcdefghijklmnop', 'abcdefghzjklmnop'],
    ].forEach(function(testvalue) {
      var left = testvalue[0]
      var right = testvalue[1]
      it("it returns true for the strings '" + left +"', '" + right + "'", function() {
        assert.strictEqual(true, differs_by_one_char(left, right));
      });
    });


    [
      ['aaa', 'aaa'],
      ['aaaa', 'aazb'],
      ['baaa', 'aaaz'],
      ['abcdefghijklmnop1', 'abcdefghzjklmnop2'],
    ].forEach(function(testvalue) {
      var left = testvalue[0]
      var right = testvalue[1]
      it("it returns false for the strings '" + left +"', '" + right + "'", function() {
        assert.strictEqual(false, differs_by_one_char(left, right));
      });
    })

  });
});
