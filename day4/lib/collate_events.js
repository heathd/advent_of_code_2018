const {Map, List, Range} = require('immutable');

class Guard {
  constructor(id) {
    this.id = id
    this.sleepSpansByDate = Map()
    this.date = null
  }

  fallsAsleep(date, asleepAt) {
    this.date = date
    this.asleepAt = asleepAt
    if (!this.sleepSpansByDate.has(date)) {
      this.sleepSpansByDate = this.sleepSpansByDate.set(date, List())
    }
  }

  wakesUp(date, awakeAt) {
    if (date != this.date) {
      throw new Error(`Unexpected date change ${date} => ${this.date}`)
    }
    var sleepSpansForThisDate = this.sleepSpansByDate.get(date)
    this.sleepSpansByDate = this.sleepSpansByDate.set(date, sleepSpansForThisDate.push([this.asleepAt, awakeAt]))
    this.asleepAt = undefined
  }

  asleepMinutes() {
    var spansByDay = this.sleepSpansByDate.valueSeq()
    var asleepMinutesByDay = spansByDay.map(s=>s.reduce((sum, [from, to]) => sum + to - from, 0))
    var totalAsleepMinutes = asleepMinutesByDay.reduce((sum, v) => sum + v, 0)
    return totalAsleepMinutes
  }

  expandSpanToList(span) {
    var [from, to] = span
    return Range(from,to).toArray()
  }

  mostFrequentAsleepMinute() {
    return this.sleepSpansByDate
      .valueSeq()
      .flatMap((spanList) => spanList.flatMap(this.expandSpanToList))
      .groupBy(v=>v)
      .map(l => l.size)
      .sortBy((size) => size)
      .keySeq()
      .last()
  }

  numberOfTimesAsleepAtMinute(minute) {
    var listOfSleeps = this.sleepSpansByDate
      .valueSeq()
      .flatMap((spanList) => spanList.flatMap(this.expandSpanToList))
      .groupBy(v=>v)
      .get(minute)
    return listOfSleeps ? listOfSleeps.size : 0
  }

  numberOfTimesAsleepAtMost() {
    return this.numberOfTimesAsleepAtMinute(this.mostFrequentAsleepMinute())
  }

}



module.exports = function(events) {
  var guards = Map()
  var currentGuard = null
  var awakenedAt = null
  var spans = List()

  events.forEach((event) => {
    switch (event.type) {
      case "shift start":
        if (!guards.has(event.guardNumber)) {
          guards = guards.set(event.guardNumber, new Guard(event.guardNumber))
        }
        currentGuard = guards.get(event.guardNumber)
        break;

      case "falls asleep":
        currentGuard.fallsAsleep(event.date, event.minute)
        break;

      case "wakes up":
        currentGuard.wakesUp(event.date, event.minute)
        break;
      }
  })

  return guards.toList()
}
