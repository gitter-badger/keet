!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Keet=e()}}(function(){return function o(s,a,l){function c(t,e){if(!a[t]){if(!s[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var r=a[t]={exports:{}};s[t][0].call(r.exports,function(e){return c(s[t][1][e]||e)},r,r.exports,o,s,a,l)}return a[t].exports}for(var u="function"==typeof require&&require,e=0;e<l.length;e++)c(l[e]);return c}({1:[function(e,t,n){t.exports=function(e){return Array.isArray(e)?e.map(function(e){return e}):function(e){var t={};if("object"!=typeof e)return t.copy=e,t.copy;for(var n in e)t[n]=e[n];return t}(e)}},{}],2:[function(e,t,n){var l=e("./copy"),c=e("./tag"),u=e("./tmplHandler"),p=e("./tmplStylesHandler"),d=e("./tmplClassHandler"),f=e("./tmplAttrHandler"),h=e("./processEvent"),s=e("./utils").selector,a=e("./strInterpreter"),m=e("./nodesVisibility"),y=e("hash-sum"),v=e("set-dom"),g=function(){var n,i,r=this,o=[].slice.call(arguments);"object"==typeof this.base?Object.keys(this.base).map(function(e){var t=r.base[e]["keet-id"];(n=s(t))||"string"!=typeof r.base[e]||(n=document.getElementById(r.el)),i=x.apply(r,[r.base[e]].concat(o)),r.base.hasOwnProperty("template")&&(i.id=r.el),v(n,i)}):(n=document.getElementById(r.el))&&((i=x.apply(r,[r.base].concat(o))).id=r.el,v(n,i))},b=function(e,t){var n=this;if(e<this.__stateList__.length){var i=this.__stateList__[e],r=this[i];if(void 0===r&&(r=a(i)),r&&Array.isArray(r)){var o=this[r[0]][r[1]];Object.defineProperty(this[r[0]],r[1],{enumerable:!1,configurable:!0,get:function(){return o},set:function(e){o=e,g.apply(n,t)}})}else Object.defineProperty(this,i,{enumerable:!1,configurable:!0,get:function(){return r},set:function(e){r=e,g.apply(n,t)}});e++,b.apply(this,[e,t])}},_=function(e){b.apply(this,[0,e])},E=function(e){this.__stateList__=this.__stateList__.concat(e)},x=function(){var e=[].shift.call(arguments),t=[].slice.call(arguments),n=document.createElement("div"),i=l(e);delete i.template,delete i.tag,delete i.style,delete i.class,this.__stateList__=[];var r=e.template?u.call(this,e.template,E.bind(this)):"string"==typeof e?u.call(this,e,E.bind(this)):null,o=p.call(this,e.style,E.bind(this)),s=d.call(this,e,E.bind(this));s&&(i.class=s),t&&t.length&&f.apply(this,[i].concat(t));var a=e.tag?c(e.tag,r||"",i,o):r;return a=m.call(this,a),n.innerHTML=a,n.childNodes.forEach(function(e){1===e.nodeType&&e.setAttribute("data-checksum",y(e.outerHTML))}),"input"===e.tag&&(i.checked?n.childNodes[0].setAttribute("checked",""):n.childNodes[0].removeAttribute("checked")),_.call(this,t),h.call(this,n),"string"==typeof e?n:e.tag?n.childNodes[0]:n};n.genElement=x,n.setState=_,n.updateStateList=E},{"./copy":1,"./nodesVisibility":4,"./processEvent":6,"./strInterpreter":7,"./tag":8,"./tmplAttrHandler":9,"./tmplClassHandler":10,"./tmplHandler":11,"./tmplStylesHandler":12,"./utils":13,"hash-sum":15,"set-dom":16}],3:[function(e,t,n){var r=e("./processEvent"),a="";t.exports=function(e){var t,n=this.args,i=this.base.template.match(/{{([^{}]+)}}/g);return a=this.base.template,function e(t,n,i,r){if(t<i.length){var o=i[t].replace(/{{([^{}]+)}}/g,"$1");if(a=a.replace(/{{([^{}]+)}}/,n[o]),r&&~r.indexOf(o)&&!n[o]){var s=new RegExp(" "+o+'="'+n[o]+'"',"g");a=a.replace(s,"")}e(++t,n,i,r)}}(0,e,i,n),(t=document.createElement("div")).innerHTML=a,/ k-/.test(a)&&r.call(this,t),t.childNodes[0].setAttribute("keet-id",e["keet-id"]),t.childNodes[0]}},{"./processEvent":6}],4:[function(e,t,n){t.exports=function(r){var o=this;return this.__stateList__.map(function(e){if(!o[e]){var t=new RegExp("("+("\\{\\{\\?"+e+"\\}\\}")+")(.*?)(?="+("\\{\\{\\/"+e+"\\}\\}")+")"),n=t.test(r),i=r.match(t);n&&i&&(r=r.replace(i[2],""))}r=(r=r.replace("{{?"+e+"}}","")).replace("{{/"+e+"}}","")}),r}},{}],5:[function(e,t,n){var c=e("./genElement").genElement,u=e("./genElement").setState,p=e("./tmplHandler"),d=e("./processEvent"),f=e("./utils").genId,i=e("./genTemplate"),h=e("./nodesVisibility"),m=e("hash-sum");t.exports=function(){var s=this,a=[],l=[].slice.call(arguments);if(Array.isArray(this.base.model))this.base.template=this.base.template.trim().replace(/\s+/g," "),this.base.model=this.base.model.map(function(e){return e["keet-id"]=f(),e}),this.base.model.map(function(e){a.push(i.call(s,e))});else if("object"==typeof this.base)Object.keys(this.base).map(function(e){var t=s.base[e];if(t&&"object"==typeof t){var n=f();t["keet-id"]=n,s.base[e]["keet-id"]=n;var i=c.apply(s,[t].concat(l));a.push(i)}else{s.__stateList__=[];var r=p.call(s,t,function(e){s.__stateList__=s.__stateList__.concat(e)});r=h.call(s,r);var o=document.createElement("div");o.innerHTML=r,u.call(s,l),d.call(s,o),o.childNodes.forEach(function(e){1===e.nodeType&&e.setAttribute("data-checksum",m(e.outerHTML)),a.push(e)})}});else if("string"==typeof this.base){this.__stateList__=[];var e=p.call(this,this.base,function(e){s.__stateList__=s.__stateList__.concat(e)});e=h.call(this,e);var t=document.createElement("div");t.innerHTML=e,u.call(this,l),d.call(this,t),t.childNodes.forEach(function(e){1===e.nodeType&&e.setAttribute("data-checksum",m(e.outerHTML)),a.push(e)})}return a}},{"./genElement":2,"./genTemplate":3,"./nodesVisibility":4,"./processEvent":6,"./tmplHandler":11,"./utils":13,"hash-sum":15}],6:[function(e,t,n){var r=e("./utils").loopChilds,c=function(e,t,n){var i,r,o,s,a,l=t.attributes;e<l.length?(/^k-/.test(l[e].nodeName)&&(i=l[e].nodeName.split("-")[1],"function"==typeof(o=this[(r=l[e].nodeValue.split("("))[0]])&&(n.push(l[e].nodeName),s=[],(a=r[1].slice(0,-1).split(",").filter(function(e){return""!==e})).length&&a.map(function(e){s.push(e)}),t.addEventListener(i,o.bind.apply(o.bind(this),[t].concat(s)),!1))),e++,c.apply(this,[e,t,n])):n.map(function(e){t.removeAttribute(e)})};t.exports=function(e){var t=this,n=[],i=[];r(n,e),n.map(function(e){1===e.nodeType&&e.hasAttributes()&&c.apply(t,[0,e,i])}),n=[]}},{"./utils":13}],7:[function(e,t,n){t.exports=function(e){var t=e.match(/\.*\./g);if(t&&0<t.length)return e.split(".")}},{}],8:[function(e,t,n){t.exports=function(){return function(){var e,t,n=[].slice.call(arguments),i=["<",n[0],">",n[1],"</",n[0],">"];if(2<n.length&&"object"==typeof n[2])for(e in n[2])"boolean"==typeof n[2][e]&&n[2][e]?i.splice(2,0," ",e):"class"===e&&Array.isArray(n[2][e])?i.splice(2,0," ",e,'="',n[2][e].join(" ").trim(),'"'):i.splice(2,0," ",e,'="',n[2][e],'"');if(3<n.length&&"object"==typeof n[3]){for(e in t=[i.indexOf(">"),0,' style="'],n[3])t.push(e),t.push(":"),t.push(n[3][e]),t.push(";");t.push('"'),i.splice.apply(i,t)}return i}.apply(null,arguments).join("")}},{}],9:[function(e,t,n){var s=e("./genElement");t.exports=function(){var r=this,o=[].shift.call(arguments);Object.keys(o).map(function(n){var e=o[n].match(/{{([^{}]+)}}/g);if(e&&e.length){var i="";e.map(function(e){var t=e.replace(/{{([^{}]+)}}/g,"$1");void 0!==r[t]&&(s.updateStateList.call(r,t),!1===r[t]?delete o[n]:(i+=r[t],o[n]=i))})}})}},{"./genElement":2}],10:[function(e,t,n){t.exports=function(e,n){var i=this;if(e.class){var t=e.class.match(/{{([^{}]+)}}/g),r="";return t&&t.length&&t.map(function(e){var t=e.replace(/{{([^{}]+)}}/g,"$1");void 0!==i[t]&&(n(t),i[t].cstore.map(function(e){r+=e+" "}))}),r.length?r.trim():e.class}return!1}},{}],11:[function(e,t,n){var s=e("./strInterpreter");t.exports=function(i,r){var o=this,e=i.match(/{{([^{}]+)}}/g);return e&&e.length&&e.map(function(e){var t=e.replace(/{{([^{}]+)}}/g,"$1"),n=s(t);n?(r(t),i=i.replace("{{"+t+"}}",o[n[0]][n[1]])):void 0!==o[t]&&(r(t),i=i.replace("{{"+t+"}}",o[t])),t.match(/^\?/g)&&r(t.replace("?",""))}),i}},{"./strInterpreter":7}],12:[function(e,t,n){var s=e("./copy");t.exports=function(e,i){var r=this,o=s(e);return e&&Object.keys(o).map(function(n){var e=o[n].match(/{{([^{}]+)}}/g);e&&e.length&&e.map(function(e){var t=e.replace(/{{([^{}]+)}}/g,"$1");void 0!==r[t]&&(i(t),o[n]=o[n].replace(/{{([^{}]+)}}/,r[t]))})}),o}},{"./copy":1}],13:[function(e,t,n){n.getId=function(e){return document.getElementById(e)},n.genId=function(){return Math.round(1*Math.random()*1e12).toString(32)},n.selector=function(e){return document.querySelector('[keet-id="'+e+'"]')};var i=function(e,t){for(var n=t.firstChild;null!==n;n=n.nextSibling)e.push(n),n.hasChildNodes()&&i(e,n)};n.loopChilds=i},{}],14:[function(e,t,n){"use strict";var i=e("./components/utils").getId,r=e("./components/utils").genId,l=e("./components/utils").selector,o=e("./components/parseStr"),c=e("./components/genTemplate"),u=e("set-dom"),s=function(e,t,n){var i,r=this;if(e<n.length)t.childNodes[e]||t.appendChild(n[e]),e++,s.apply(this,[e,t,n]);else{"object"==typeof this.base&&(this.baseProxy=(i=this.base,new Proxy(i,{set:function(e,t,n){return e[t]=n,r.base[t]=e[t],!0},deleteProperty:function(e,t){var n=e[t]["keet-id"],i=l(n);return i&&i.remove(),delete r.base[t],!0}}))),this.componentDidMount&&"function"==typeof this.componentDidMount&&this.componentDidMount()}};function a(){Object.defineProperty(this,"__stateList__",{enumerable:!1,writable:!0})}a.prototype.mount=function(t){return"object"==typeof t?Object.keys(t).map(function(e){"string"==typeof t[e]?t[e]=t[e].trim().replace(/\s+/g," "):"object"==typeof t[e]&&"string"==typeof t[e].template&&(t[e].template=t[e].template.trim().replace(/\s+/g," "))}):"string"==typeof t&&(t=t.trim().replace(/\s+/g," ")),this.base=t,this},a.prototype.flush=function(e){var t=i(this.el);return t&&(t.innerHTML=""),this},a.prototype.link=function(e){return this.el=e,this.componentWillMount&&"function"==typeof this.componentWillMount&&this.componentWillMount(),this.render(),this},a.prototype.render=function(){var e=i(this.el),t=o.apply(this,this.args);return e&&s.apply(this,[0,e,t]),this},a.prototype.cluster=function(){var e=[].slice.call(arguments);0<e.length&&e.map(function(e){"function"==typeof e&&e()})},a.prototype.add=function(e){var t=i(this.el);e["keet-id"]=r(),this.base.model=this.base.model.concat(e),t.appendChild(c.call(this,e))},a.prototype.destroy=function(i,r){this.base.model=this.base.model.filter(function(e,t){if(i!==e[r])return e;var n=l(e["keet-id"]);n&&n.remove()})},a.prototype.update=function(r,o,s){var a=this;this.base.model=this.base.model.map(function(e,t,n){if(r===e[o]){s&&"object"==typeof s&&Object.assign(e,s);var i=l(e["keet-id"]);i&&u(i,c.call(a,e))}return e})},t.exports=a},{"./components/genTemplate":3,"./components/parseStr":5,"./components/utils":13,"set-dom":16}],15:[function(e,t,n){"use strict";function c(e,t){var n,i;if(0===t.length)return e;for(n=0,i=t.length;n<i;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e<0?-2*e:e}function u(e,t,n,i){var r,o,s,a,l=c(c(c(e,n),(r=t,Object.prototype.toString.call(r))),typeof t);return null===t?c(l,"null"):void 0===t?c(l,"undefined"):"object"==typeof t?-1!==i.indexOf(t)?c(l,"[Circular]"+n):(i.push(t),o=l,s=t,a=i,Object.keys(s).sort().reduce(function(e,t){return u(e,s[t],t,a)},o)):c(l,t.toString())}t.exports=function(e){return function(e,t){for(;e.length<t;)e="0"+e;return e}(u(0,e,"",[]).toString(16),8)}},{}],16:[function(e,t,n){"use strict";c.KEY="data-key",c.IGNORE="data-ignore",c.CHECKSUM="data-checksum";var i=e("./parse-html"),r="_set-dom-",o=r+"mounted",s=1,a=9,l=11;function c(e,t){!function(e,t){if(!e)throw new Error("set-dom: "+t)}(e&&e.nodeType,"You must provide a valid node to update."),e.nodeType===a&&(e=e.documentElement),t.nodeType===l?u(e,t):p(e,"string"==typeof t?i(t,e.nodeName):t),e[o]||(e[o]=!0,m(e))}function p(e,t){if(e.nodeType===t.nodeType)if(e.nodeType===s){if(r=t,h(i=e)&&h(r)||f(i)===f(r)||i.isEqualNode(r))return;if(u(e,t),e.nodeName===t.nodeName)!function(e,t){var n,i,r,o,s;for(n=e.length;n--;)i=e[n],o=i.namespaceURI,s=i.localName,(r=t.getNamedItemNS(o,s))||e.removeNamedItemNS(o,s);for(n=t.length;n--;)i=t[n],o=i.namespaceURI,s=i.localName,(r=e.getNamedItemNS(o,s))?r.value!==i.value&&(r.value=i.value):(t.removeNamedItemNS(o,s),e.setNamedItemNS(i))}(e.attributes,t.attributes);else{for(var n=t.cloneNode();e.firstChild;)n.appendChild(e.firstChild);e.parentNode.replaceChild(n,e)}}else e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);else e.parentNode.replaceChild(t,y(e)),m(t);var i,r}function u(e,t){for(var n,i,r,o,s,a,l=e.firstChild,c=t.firstChild,u=0;l;)u++,i=d(n=l),l=l.nextSibling,i&&(a||(a={}),a[i]=n);for(l=e.firstChild;c;)u--,c=(r=c).nextSibling,a&&(o=d(r))&&(s=a[o])?(delete a[o],s!==l?e.insertBefore(s,l):l=l.nextSibling,p(s,r)):l?(l=(n=l).nextSibling,d(n)?(e.insertBefore(r,n),m(r)):p(n,r)):(e.appendChild(r),m(r));for(i in a)u--,e.removeChild(y(a[i]));for(;0<=--u;)e.removeChild(y(e.lastChild))}function d(e){if(e.nodeType===s){var t=e.getAttribute(c.KEY)||e.id;return t?r+t:void 0}}function f(e){return e.getAttribute(c.CHECKSUM)||NaN}function h(e){return null!=e.getAttribute(c.IGNORE)}function m(e){return v(e,"mount")}function y(e){return v(e,"dismount")}function v(e,t){if(d(e)){var n=document.createEvent("Event"),i={value:e};n.initEvent(t,!1,!1),Object.defineProperty(n,"target",i),Object.defineProperty(n,"srcElement",i),e.dispatchEvent(n)}for(var r=e.firstChild;r;)r=v(r,t).nextSibling;return e}t.exports=c},{"./parse-html":17}],17:[function(e,t,n){"use strict";var l=window.DOMParser&&new window.DOMParser,c="HTML",i=!1,u=!1,r="text/html",p="application/xhtml+xml",o='<wbr class="A"/>';try{var s=l.parseFromString(o,r).body.firstChild,a=document.createElement("div");if(a.appendChild(s),"A"!==a.firstChild.classList[0])throw new Error;i=!0}catch(e){}var d=document.implementation.createHTMLDocument(""),f=d.documentElement,h=d.body;try{f.innerHTML+="",u=!0}catch(e){l.parseFromString(o,p);var m=/(<body[^>]*>)([\s\S]*)<\/body>/}function y(e,t){if(t===c){if(u)return f.innerHTML=e,f;var n=e.match(m);if(n){var i=n[2],r=n.index+n[1].length,o=r+i.length;e=e.slice(0,r)+e.slice(o),h.innerHTML=i}for(var s=l.parseFromString(e,p),a=s.body;h.firstChild;)a.appendChild(h.firstChild);return s.documentElement}return h.innerHTML=e,h.firstChild}t.exports=i?function(e,t){var n=l.parseFromString(e,r);return n.body?t===c?n.documentElement:n.body.firstChild:y(e,t)}:y},{}]},{},[14])(14)});
/**
 * Keetjs v3.5.1 Alpha release: https://github.com/keetjs/keet.js
 * Minimalist view layer for the web
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Keetjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */
