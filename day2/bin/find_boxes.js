var readline = require('readline');
var differs_by_one_char = require('../lib/differs_by_one_char');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var input = []

function close() {
  for(var i=0; i<input.length; i++) {
    for(var j=i+1; j<input.length; j++) {
      if (differs_by_one_char(input[i], input[j])) {
        console.log(`'${input[i]}', '${input[j]}'`)
      }
    }
  }
}

rl.on('close', close)
rl.on('line', line => input.push(line))
