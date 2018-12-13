"use strict";

var assert = require('assert');
var stringify = require('string.ify');
const {List} = require('immutable');

const collate_events = require('../lib/collate_events')
const Event = require('../lib/event')

describe('collate_events', function() {

  it('identifies two guards', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep', // awake 10 mins until now
      '[1518-11-04 00:20] wakes up', // asleep 10 mins, awake 40 minutes more (until 0059)
      '[1518-11-04 00:00] Guard #2 begins shift',
      '[1518-11-04 00:10] falls asleep', // awake 10 mins until now
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.size, 2)
    assert(collated.map((g) => g.id).equals(List.of(1,2)))
  })

  it('calculates the asleep minutes for a guard who does not fall asleep', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).asleepMinutes(), 0)
  })

  it('calculates the asleep minutes for a guard who falls asleep for one minute', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).asleepMinutes(), 1)
  })

  it('calculates the asleep minutes for a guard who falls asleep for multiple one minute periods', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
      '[1518-11-04 00:30] falls asleep',
      '[1518-11-04 00:21] wakes up',
      '[1518-11-04 00:20] falls asleep',
      '[1518-11-04 00:31] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).asleepMinutes(), 3)
  })

  it('calculates the asleep minutes for a guard who falls asleep for multiple one minute periods on different days', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
      '[1518-11-05 00:00] Guard #1 begins shift',
      '[1518-11-05 00:20] falls asleep',
      '[1518-11-05 00:21] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).asleepMinutes(), 2)
  })

  it('identifies the most frequent asleep minute', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
      '[1518-11-05 00:00] Guard #1 begins shift',
      '[1518-11-05 00:10] falls asleep',
      '[1518-11-05 00:11] wakes up',
      '[1518-11-05 00:14] falls asleep',
      '[1518-11-05 00:16] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).mostFrequentAsleepMinute(), 10)
  })

  it('identifies the number of times asleep on a particular minute', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
      '[1518-11-05 00:00] Guard #1 begins shift',
      '[1518-11-05 00:10] falls asleep',
      '[1518-11-05 00:11] wakes up',
      '[1518-11-05 00:14] falls asleep',
      '[1518-11-05 00:16] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(10), 2)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(0), 0)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(12), 0)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(14), 1)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(15), 1)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMinute(16), 0)
  })

  it('identifies the number of times asleep at the most frequent minute', () => {
    var input = List.of(
      '[1518-11-04 00:00] Guard #1 begins shift',
      '[1518-11-04 00:10] falls asleep',
      '[1518-11-04 00:11] wakes up',
      '[1518-11-05 00:00] Guard #1 begins shift',
      '[1518-11-05 00:10] falls asleep',
      '[1518-11-05 00:11] wakes up',
      '[1518-11-05 00:14] falls asleep',
      '[1518-11-05 00:16] wakes up',
    ).map(Event.parse)

    var collated = collate_events(input)
    assert.strictEqual(collated.get(0).numberOfTimesAsleepAtMost(), 2)
  })

});
