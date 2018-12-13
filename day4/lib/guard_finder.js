const { List } = require('immutable');
const stringify = require('string.ify')
var Event = require('../lib/event')
const collate_events = require('../lib/collate_events')

function load(input) {
  var ordered = List(input.map(Event.parse)).sort()

  return {
    guard_with_most_minutes_asleep: function() {
      var guards = collate_events(ordered).sortBy((g) => g.asleepMinutes())
      return guards.last().id
    },
    most_frequent_asleep_minute: function(guardId) {
      var guard = collate_events(ordered).find(g => g.id === guardId)
      return guard.mostFrequentAsleepMinute()
    },
    guard_most_frequently_asleep_on_same_minute: function() {
      var guards = collate_events(ordered)
      var asleepCounts = guards.map(g => [g, g.numberOfTimesAsleepAtMost()])
      var sorted = asleepCounts.sortBy(([_, n]) => n)
      var [guard, _] = sorted.last()
      return guard
    }
  }
}

module.exports = {
  load: load,
}
