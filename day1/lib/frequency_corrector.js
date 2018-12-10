var counter = 0;

function accum(input) {
  var amount = parseInt(input.substring(1));
  if (input.substring(0,1) == '+') {
    counter += amount
  } else {
    counter -= amount
  }
}
module.exports = {
  reset: function() {counter=0;},
  accum: accum,
  adjustment: function() { return counter }
}
