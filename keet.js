/** 
 * Keetjs v3.0.0 Alpha release: https://github.com/syarul/keet
 * Minimalist view layer for the web
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Keetjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */

import { getId } from './components/utils'
import parseStr from './components/parseStr'

const next = function(...args) {
  let [ i, ele, els ] = args
  if(i < els.length) {
    ele.appendChild(els[i])
    i++
    next.apply(this, [ i, ele, els ])
  } else {
    // bind proxy to methods
    Object.getOwnPropertyNames(this.__proto__)
      .filter(fn => fn !== 'constructor')
      .map(fn => this[fn] = this[fn].bind(this._proxy_))

    if(this.componentDidMount && typeof this.componentDidMount === 'function'){
      this.componentDidMount()
    }
  }
}

module.exports = class Keet {
  constructor(context) {
    this.base = context || {}
  }
  mount(instance) {
    this.base = instance
    return this
  }
  link(id) {
    this.el = id
    this.render()
    return this
  }
  render() {
    let ele = getId(this.el)
      , els = parseStr.call(this)
      , i = 0
    if (ele) {
      ele.innerHTML = ''
      next.apply(this, [ i, ele, els ])
    }
    return this
  }
  cluster(...args){
    args.map(f => {
      if(typeof f === 'function') f()
    })
  }
}