var readline = require('readline');
var react = require('../lib/react');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var input = []

function close() {
  for(i=0; i<26; i++) {
    var lower = String.fromCharCode('a'.codePointAt() + i)
    var cap = String.fromCharCode('A'.codePointAt() + i)
    var regexp = new RegExp(`[${lower}${cap}]`, 'g')
    var stripped = input[0].replace(regexp, '')
    console.log(`${cap}: ${react(stripped).length}`)
  }
}

rl.on('close', close)
rl.on('line', line => input.push(line))
