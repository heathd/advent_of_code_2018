module.exports = {
  build: function() {
    var seq = []

    return {
      put: function(value) {
        if (seq.lastIndexOf(value) != -1) {
          return true;
        } else {
          seq.push(value)
          return false
        }
      }
    }
  }
}
