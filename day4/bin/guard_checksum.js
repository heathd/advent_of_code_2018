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
  var guardId = finder.guard_with_most_minutes_asleep()
  var minute = finder.most_frequent_asleep_minute(guardId)

  console.log(`Guard ID: ${guardId}`)
  console.log(`Minute most asleep: ${minute}`)
  console.log(`Checksum: ${guardId * minute}`)
}

rl.on('close', close)
rl.on('line', line => input.push(line))
