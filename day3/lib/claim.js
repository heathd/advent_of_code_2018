
function create(id, x, y, w, h) {
  function toString() {
    return `(${id}: ${x}, ${y}, ${w}, ${h})`
  }
  function overlapsX(ox) {
    return (ox>=x) && (ox < (x+w))
  }

  function overlapsY(oy) {
    var p = (oy>=y) && (oy < (y+h))

    return p;
  }
  function coverage() {
    var covers = []
    for (var i = x; i < x+w; i++) {
      for (var j = y; j < y+h; j++) {
        covers.push([i,j])
      }
    }
    return covers;
  }

  function overlapsClaim(otherClaim) {
    return listOverlapsWith(otherClaim).length > 0
  }

  function listOverlapsWith(otherClaim) {
    return coverage().filter(c => otherClaim.overlaps(c[0], c[1]))
  }

  return {
    x: x,
    y: y,
    w: w,
    h: h,
    id: id,
    coverage: coverage,
    toString: toString,
    overlaps: function(ox, oy) {
      return overlapsX(ox) && overlapsY(oy);
    },
    overlapsClaim: overlapsClaim,
    listOverlapsWith: listOverlapsWith
  }
}

function parse(line) {
  //#1 @ 2,3: 4x5
  var re = /^#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)$/
  var match = re.exec(line)

  if (match) {
    return create(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
      parseInt(match[4]),
      parseInt(match[5])
    )
  }
  return null;
}

module.exports = {
  parse: parse,
  create: create
}
