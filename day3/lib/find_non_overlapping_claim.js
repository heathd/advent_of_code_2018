var Claim = require("./claim")
var stringify = require('string.ify')

module.exports = function(lines) {
  var claims = lines.map(Claim.parse)
  var overlapped;

  for (var i = 0; i < claims.length; i++) {
    overlapped = false;


    for(var j = 0; j < claims.length; j++) {
      if (j === i) {
        continue;
      }
      var overlapped = claims[i].overlapsClaim(claims[j])

      if (overlapped) {
        break;
      }
    }

    if (!overlapped) {
      return claims[i].id;
    }
  }

  return null;
}
