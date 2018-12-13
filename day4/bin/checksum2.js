var readline = require('readline');
var GuardFinder = require('../lib/guard_finder');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var input = []


function close() {
  var finder = GuardFinder.load(input)
  var g = finder.guard_most_frequently_asleep_on_same_minute()
  var m = g.mostFrequentAsleepMinute()
  var count = g.numberOfTimesAsleepAtMinute(m)
  console.log(`Guard id: ${g.id}`)
  console.log(`Most frequently asleep at minute: ${m}`)
  console.log(`Times asleep at that minute: ${count}`)
  console.log(`checksum: ${m * g.id}`)
}

rl.on('close', close)
rl.on('line', line => input.push(line))
