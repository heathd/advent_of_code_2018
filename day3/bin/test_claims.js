var readline = require('readline');
var Claim = require('../lib/claim');
var stringify = require ('string.ify')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var claims = [];
var overlapCount = 0;

function close() {
  claims.forEach((c) => console.log(`${c.id} ${c.x} ${c.y} ${c.w} ${c.h}`))

  for(var x=0; x<1000; x++) {
    for(var y=0; y<1000; y++) {
      var o = claims.filter((c) => c.overlaps(x,y))

      if (o.length >= 2) {
        overlapCount++;
      }
    }
  }

  console.log(`Overlap count: ${overlapCount}`)
}

rl.on('close', close)
rl.on('line', line => claims.push(Claim.parse(line)))
