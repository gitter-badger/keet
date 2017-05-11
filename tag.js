var tag = function() {
  function ktag(tag, value, attributes, styles) {
    var attr, idx, te, a = [].slice.call(arguments),
      ret = ['<', a[0], '>', a[1], '</', a[0], '>']
    if (a.length > 2 && typeof a[2] === 'object') {
      for (attr in a[2]) {
        ret.splice(2, 0, ' ', attr, '="', a[2][attr], '"')
      }
    }
    if (a.length > 3 && typeof a[3] === 'object') {
      idx = ret.indexOf('>')
      if (~idx) {
        te = [idx, 0, ' style="']
        for (attr in a[3]) {
          te.push(attr)
          te.push(':')
          te.push(a[3][attr])
        }
        te.push('"')
        ret.splice.apply(ret, te)
      }
    }
    return ret
  }
  var args = [].slice.call(arguments),
    arr = ktag.apply(null, args)
  return arr.join('')
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = tag
  }
  exports.tag = tag
}