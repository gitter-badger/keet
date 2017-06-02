var Keet = require('../../')
var log = console.log.bind(console)

var init = function() {
  var ctx = this
  var keet = function(tag) {
    return new Keet(ctx)
  }

  this.app = keet().link('app', '{{test}}')
  this.test = keet().template('div', 'testTag')
    .set('initial')

}

exports.vtag1 = function(t) {
  document.getElementById('app').innerHTML = ''
  var c = new init
  c.app.compose(function() { 
      var v = document.getElementById('testTag')
      t.ok(v.firstChild.nodeValue === 'initial', 'compose not force')
  })
}