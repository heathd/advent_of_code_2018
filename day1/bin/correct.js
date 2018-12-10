var readline = require('readline');
var f = require('../lib/frequency_corrector');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


rl.on('close', function() {
  console.log(f.adjustment())
})

rl.on('line', function(line){
  f.accum(line)
})
