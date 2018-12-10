function matches(input, expectedRepetitions) {
  var counts = {}
  var c;

  for (var i=0; i < input.length; i++) {
    c = input.charAt(i)

    if (!(c in counts)) {
      counts[c] = 0
    }

    counts[c]++
  }
  var values = Object.values(counts)

  return values.some(element => element == expectedRepetitions)
}

module.exports = {
  build: function(expectedRepetitions) {
    return {
      matches: input => matches(input, expectedRepetitions)
    }
  }
}
