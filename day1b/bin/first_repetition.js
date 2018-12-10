var readline = require('readline');
var f = require('../lib/frequency_corrector');
var r = require('../lib/repetition_detector').build();

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

r.put(0);

var input = []

function proccessLine(line) {
  input.push(line)
}

function close() {
  var v;
  var done = false;
  for (var i = 0; !done; i++) {
    console.log(i % input.length)
    console.log(input[i % input.length])
    v = f.accum(input[i % input.length])
    console.log(v)
    if (r.put(v)) {
      console.log(v)
      done = true
    }
  }
}

rl.on('close', close)
rl.on('line', proccessLine)
