"use strict";

var assert = require('assert');

var GuardFinder = require('../lib/guard_finder')

describe('GuardFinder', function() {
  describe('with ordered input', () => {
    var input = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up', // 20 mins
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up', // 15 mins
      // Guard #10 total 35 mins

      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up', // 10 mins
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up', // 5 mins
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up', // 10 mins
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up', // 10 mins
    ]    /*

    1. Find the guard that has the most minutes asleep.

    2. What minute does that guard spend asleep the most?

    3. What is the ID of the guard you chose multiplied by the minute you chose?

     */

    describe('guard_with_most_minutes_asleep', () => {
      it('identifies guard 10', () => {
        var guard_finder = GuardFinder.load(input)
        assert.strictEqual(guard_finder.guard_with_most_minutes_asleep(), 10)
      })
    })

    describe('mostFrequentAsleepMinute', () => {
      it('identifies guard 10', () => {
        var guard_finder = GuardFinder.load(input)
        assert.strictEqual(guard_finder.most_frequent_asleep_minute(10), 24)
      })
    })
  })


  describe('with unordered input', () => {
    var input = [
      '[1518-11-05 00:55] wakes up', // 10 mins
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:46] wakes up', // 10 mins
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:05] Guard #11 begins shift',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:50] wakes up', // 10 mins
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-03 00:29] wakes up', // 5 mins
      // Guard #10 total 35 mins
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-04 00:36] falls asleep',

      '[1518-11-01 00:25] wakes up', // 20 mins
      '[1518-11-01 00:55] wakes up', // 15 mins
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-01 00:00] Guard #11 begins shift',
      '[1518-11-05 00:03] Guard #99 begins shift',
    ];

    describe('guard_with_most_minutes_asleep', () => {
      it('identifies guard 11', () => {
        var guard_finder = GuardFinder.load(input)
        assert.strictEqual(guard_finder.guard_with_most_minutes_asleep(), 11)
      })
    })
  })



});
