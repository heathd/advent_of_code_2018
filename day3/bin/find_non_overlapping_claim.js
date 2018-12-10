var readline = require('readline');
var find_non_overlapping_claim = require('../lib/find_non_overlapping_claim');
var stringify = require ('string.ify')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var lines = [];

function close() {
  console.log(`Non overlapping claim ID: ${find_non_overlapping_claim(lines)}`);
}

rl.on('close', close)
rl.on('line', line => lines.push(line))
