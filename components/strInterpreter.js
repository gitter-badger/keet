module.exports = function (str) {
  var res = str.match(/\.*\./g)
  var result = null
  if (res && res.length > 0) {
    result = str.split('.')
  }
  return result
}
