var readline = require('readline');
var OccurrenceCounter = require('../lib/occurrence_counter');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var input = []

var doubles = OccurrenceCounter.build(2)
var triples = OccurrenceCounter.build(3)

function close() {
  var doublesCount = input.map(i => doubles.matches(i)).filter(m => m).length
  var triplesCount = input.map(i => triples.matches(i)).filter(m => m).length

  console.log(doublesCount * triplesCount)
}

rl.on('close', close)
rl.on('line', line => input.push(line))
