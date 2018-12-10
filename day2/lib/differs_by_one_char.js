module.exports = function(left, right) {
  if (left.length != right.length) {
    return false
  }

  var diffCount = 0
  for (var i = 0; i < left.length; i++) {
    if(left[i] != right[i]) {
      diffCount++
    }
    if (diffCount > 1) {
      return false
    }
  }

  return diffCount == 1
}
