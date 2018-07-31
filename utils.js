var getId = function (id) {
  return document.getElementById(id)
}

exports.getId = getId

var loopChilds = function (arr, elem) {
  for (var child = elem.firstChild; child !== null; child = child.nextSibling) {
    arr.push(child)
    if (child.hasChildNodes()) {
      loopChilds(arr, child)
    }
  }
}

exports.loopChilds = loopChilds

exports.testEvent = function (tmpl) {
  return / k-/.test(tmpl)
}

/**
 * @private
 * @description
 * Check a node availability in 250ms, if not found silenty skip the event
 *
 * @param {string} id - the node id
 * @param {function} callback - the function to execute once the node is found
 */
exports.checkNodeAvailability = function (component, componentName, callback) {
  var ele = getId(component.el)

  if (ele) return ele
  else {
    var t = setInterval(function () {
      ele = getId(component.el)
      if (ele) {
        clearInterval(t)
        callback(component, componentName, ele)
      }
    }, 0)
    // silently ignore finding the node after sometimes
    setTimeout(function () {
      clearInterval(t)
    }, 250)
  }
}

/**
 * @private
 * @description
 * Confirm that a value is truthy, throws an error message otherwise.
 *
 * @param {*} val - the val to test.
 * @param {string} msg - the error message on failure.
 * @throws {Error}
 */
exports.assert = function (val, msg) {
  if (!val) throw new Error('(keet) ' + msg)
}

/**
 * @private
 * @description
 * Simple html template literals MODIFIED from : http://2ality.com/2015/01/template-strings-html.html
 * by Dr. Axel Rauschmayer
 * no checking for wrapping in root element
 * no strict checking
 * remove spacing / indentation
 * keep all spacing within html tags
 */
exports.html = function () {
  var literalSections = [].shift.call(arguments)
  var raw = literalSections.raw
  // remove spacing, indentation
  var trim = raw[raw.length - 1]
  trim = trim.split(/\n+/)
  trim = trim.map(function (t) {
    return t.trim()
  }).join('')
  return trim
}

/**
 * @private
 * @description
 * Copy with modification from preact-todomvc. Model constructor
 *
 * {{model:<myModel>}}<myModelTemplateString>{{/model:<myModel>}}
 *
 */
exports.createModel = function () {

  var onChanges = []

  this.inform = function() {
    for (var i = onChanges.length; i--;) {
      onChanges[i](this.list)
    }
  }

/**
 * @private
 * @description
 * The array model store
 */
  this.list = []

/**
 * @private
 * @description
 * Subscribe to the model changes (add/update/destroy)
 *
 * @param {Object} model - the model including all prototypes
 *
 */
  this.subscribe = function (fn) {
    onChanges.push(fn)
  }

/**
 * @private
 * @description
 * Add new object to the model list
 *
 * @param {Object} obj - new object to add into the model list
 *
 */
  this.add = function (obj) {
    this.list = this.list.concat(obj)
    this.inform()
  }

/**
 * @private
 * @description
 * Update existing object in the model list
 *
 * @param {String} lookupId - lookup id property name of the object
 * @param {Object} updateObj - the updated properties
 *
 */
  this.update = function (lookupId, updateObj) {
    this.list = this.list.map(function (obj) {
      return obj[lookupId] !== updateObj[lookupId] ? obj : Object.assign(obj, updateObj)
    })
    this.inform()
  }

/**
 * @private
 * @description
 * Removed existing object in the model list
 *
 * @param {String} lookupId - lookup id property name of the object
 * @param {String} objId - unique identifier of the lookup id
 *
 */
  this.destroy = function (lookupId, objId) {
    this.list = this.list.filter(function (obj) {
      return obj[lookupId] !== objId
    })
    this.inform()
  }
}
