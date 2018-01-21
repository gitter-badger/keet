import { testEval } from './utils'
import { loopChilds } from './elementUtils'
 
const next = (i, c, rem, context, proxy) => {
  let hask
    , evtName
    , evthandler
    , handler
    , isHandler
    , argv
    , v
    , atts = c.attributes

  if(i < atts.length) {
    hask = /^k-/.test(atts[i].nodeName)
    if(hask){
      evtName = atts[i].nodeName.split('-')[1]
      evthandler = atts[i].nodeValue
      handler = evthandler.split('(')
      isHandler = testEval(context[handler[0]])
      if(typeof isHandler === 'function') {
        rem.push(atts[i].nodeName)
        argv = []
        v = handler[1].slice(0, -1).split(',').filter(f => f != '')
        if(v.length) v.map(v => argv.push(v))
        // c.removeEventListener(evtName, isHandler, false)
        c.addEventListener(evtName, isHandler.bind.apply(isHandler.bind(proxy), [c].concat(argv)), false)
      }
    }
    i++
    next(i, c, rem, context, proxy)
  } else {
    rem.map(f => c.removeAttribute(f))
  }
}

export default (kNode, context, proxy) => {
  let listKnodeChild = []
    , rem = []
    , i = 0
  loopChilds(listKnodeChild, kNode)
  listKnodeChild.map(c => {
    if (c.nodeType === 1 && c.hasAttributes())
      next(i, c, rem, context, proxy)
  })
  listKnodeChild = []
}