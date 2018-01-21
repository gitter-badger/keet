import copy from './copy'
import tag from './tag'
import tmplHandler from './tmplHandler'
import tmplStylesHandler from './tmplStylesHandler'
import tmplClassHandler from './tmplClassHandler'
import processEvent from './processEvent'

export default (child, context) => {
  let tempDiv = document.createElement('div')
  let cloneChild = copy(child)
  delete cloneChild.template
  delete cloneChild.tag
  delete cloneChild.style
  delete cloneChild.class

  // process template if has handlebars value
  let tpl = child.template ? tmplHandler(child.template, context) : null
  // process styles if has handlebars value
  let styleTpl = tmplStylesHandler(child.style, context)
  // process classes if has handlebars value
  let classTpl = tmplClassHandler(child, context)
  if(classTpl) cloneChild.class = classTpl

  let s = child.tag ?
    tag(child.tag,              // html tag
      tpl ? tpl.tmpl : '',      // nodeValue
      cloneChild,               // attributes including classes
      styleTpl                  // styles
    ) : child.template          // fallback if non exist, render the template as string

  tempDiv.innerHTML = s
  if (child.tag === 'input') {
    if (child.checked)
      tempDiv.childNodes[0].checked = true
    else
      tempDiv.childNodes[0].removeAttribute('checked')
  }

  processEvent(tempDiv, context, tpl ? tpl.proxyRes : null)
  return tempDiv.childNodes[0]
}