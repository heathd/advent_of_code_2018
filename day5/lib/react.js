function isLower(char) {
  return /[a-z]/.test(char)
}

function isUpper(char) {
  return /[A-Z]/.test(char)
}

function differInCase(l, r) {
  return isLower(l) != isLower(r)
}

function sameLetter(l, r) {
  return l.toLowerCase() === r.toLowerCase()
}

function canReact(l, r) {
  return differInCase(l, r) && sameLetter(l, r)
}

function react(input) {
  var currentString = input
  fullreaction: while (currentString.length > 1) {
    for (var i=0; i+1<currentString.length; i++) {
      if (canReact(currentString.charAt(i), currentString.charAt(i+1))) {
        currentString = currentString.substring(0, i) + '' + currentString.substring(i+2)
        continue fullreaction
      }
    }
    return currentString
  }
  return currentString
}

module.exports = react
