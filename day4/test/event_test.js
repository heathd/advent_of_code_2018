"use strict";

var assert = require('assert');
var stringify = require('string.ify');
const {List} = require('immutable');

var Event = require('../lib/event')

describe('event', function() {
  describe('.parse', () => {
    var input = [
      '[1518-11-04 00:00] Guard #99 begins shift',
      '[1518-11-04 00:10] falls asleep', // awake 10 mins until now
      '[1518-11-04 00:20] wakes up', // asleep 10 mins, awake 40 minutes more (until 0059)
    ];

    it('parses a guard shift beginning', () => {
      var event = Event.parse(input[0])
      assert.strictEqual(event.type, "shift start")
      assert.strictEqual(event.guardNumber, 99)
      assert.strictEqual(event.time, "1518-11-04 00:00")
      assert.strictEqual(event.date, "1518-11-04")
      assert.strictEqual(event.minute, 0)
    })

    it('parses a guard falling asleep', () => {
      var event = Event.parse(input[1])
      assert.strictEqual(event.type, "falls asleep")
      assert.strictEqual(event.time, "1518-11-04 00:10")
      assert.strictEqual(event.minute, 10)
    })

    it('parses a guard waking up', () => {
      var event = Event.parse(input[2])
      assert.strictEqual(event.type, "wakes up")
      assert.strictEqual(event.time, "1518-11-04 00:20")
      assert.strictEqual(event.minute, 20)
    })
  })

  describe('sorting', () => {
    var input = List.of(
      Event.parse('[1518-11-04 00:02] Guard #2 begins shift'),
      Event.parse('[1518-11-04 00:01] Guard #1 begins shift'),
      Event.parse('[1518-11-04 00:03] Guard #3 begins shift'),
    );

    it('is sortable', () => {
      var guardNos = input.sort().map((e) => e.guardNumber)
      assert(guardNos.equals(List([1,2,3])))
    })
  })
});
