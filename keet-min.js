!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Keet=e()}}(function(){return function r(a,l,s){function c(t,e){if(!l[t]){if(!a[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var o=l[t]={exports:{}};a[t][0].call(o.exports,function(e){return c(a[t][1][e]||e)},o,o.exports,r,a,l,s)}return l[t].exports}for(var u="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t){t.exports=function(o){var r=this;return this.__componentList__.map(function(e){if(r[e]){var t=RegExp("(\\{\\{component:"+e+"\\}\\})"),n=o.match(t);if(n){var i=r[e].render("asString");o=o.replace(n[0],r.__componentStub__[e]=i)}}}),o}},{}],2:[function(e,t,n){var i=e("./tmplHandler"),o=e("./processEvent"),r=e("./utils").getId,a=e("./utils").testEvent,l=e("./strInterpreter"),s=e("./componentParse"),c=e("./modelParse"),u=e("./nodesVisibility"),f=e("morphdom"),d={ttl:null,status:"ready"},p=function(){var e=this;"pooling"===d.status||(d.status="pooling",clearTimeout(d.ttl),d.ttl=setTimeout(function(){(function(){var e=r(this.el),t=_.call(this,this.base);t.id=this.el,f(e,t),d.status="ready"}).call(e)},0))},m=function(e){var t=this;if(e<this.__stateList__.length){var n=this.__stateList__[e],i=this[n];if(void 0===i&&(i=l(n)),i&&Array.isArray(i)){var o=this[i[0]][i[1]];Object.defineProperty(this[i[0]],i[1],{enumerable:!1,configurable:!0,get:function(){return o},set:function(e){o=e,p.call(t)}})}else Object.defineProperty(this,n,{enumerable:!1,configurable:!0,get:function(){return i},set:function(e){i=e,p.call(t)}});m.call(this,++e)}},h=function(){m.call(this,0)},v=function(e){this.__stateList__=this.__stateList__.concat(e)},_=function(e){var t=document.createElement("div"),n=i.call(this,e,v.bind(this));return n=s.call(this,n),n=c.call(this,n),n=u.call(this,n),t.innerHTML=n,h.call(this),a(n)&&o.call(this,t),t};n.genElement=_,n.setState=h,n.updateStateList=v},{"./componentParse":1,"./modelParse":4,"./nodesVisibility":5,"./processEvent":7,"./strInterpreter":8,"./tmplHandler":10,"./utils":11,morphdom:13}],3:[function(e,t){var l=e("./ternaryOps"),s="";t.exports=function(e,t){var n,i,o=e.match(/{{([^{}]+)}}/g);s=e;for(var r=0,a=o.length;r<a;r++)n=o[r].replace(/{{([^{}]+)}}/g,"$1"),i=l.call(t,n),s=s.replace("{{"+n+"}}",i?i.value:t[n]);return s}},{"./ternaryOps":9}],4:[function(e,t){var l=e("./genModelTemplate");t.exports=function(r){var a=this;return this.__modelList__.map(function(e){if(a[e]){var t=RegExp("(\\{\\{model:"+e+"\\}\\})(.*?)(\\{\\{\\/model:"+e+"\\}\\})"),n=r.match(t);if(n){var i=a.base.match(t),o="";a[e].list.map(function(e){o+=l.call(a,i[2],e)}),r=r.replace(n[2],o)}}r=(r=r.replace("{{model:"+e+"}}","")).replace("{{/model:"+e+"}}","")}),r}},{"./genModelTemplate":3}],5:[function(e,t){t.exports=function(o){var r=this;return this.__stateList__.map(function(e){if(!r[e]){var t=RegExp("("+("\\{\\{\\?"+e+"\\}\\}")+")(.*?)(?="+("\\{\\{\\/"+e+"\\}\\}")+")"),n=t.test(o),i=o.match(t);n&&i&&(o=o.replace(i[2],""))}o=(o=o.replace("{{?"+e+"}}","")).replace("{{/"+e+"}}","")}),o}},{}],6:[function(e,t){var o=e("./genElement").setState,r=e("./tmplHandler"),a=e("./processEvent"),l=e("./utils").getId,s=e("./utils").testEvent,c=e("./componentParse"),u=e("./modelParse"),f=e("./nodesVisibility"),d=e("./utils").checkNodeAvailability;t.exports=function(e){var t,n,i=this;if("string"==typeof this.base){if(this.__stateList__=this.__stateList__||[],this.__modelList__=this.__modelList__||[],this.__componentList__=this.__componentList__||[],this.__componentStub__=this.__componentStub__||{},n=r.call(this,this.base,function(e){i.__stateList__=i.__stateList__.concat(e)}),n=c.call(this,n),n=u.call(this,n),n=f.call(this,n),e)return n;(t=l(this.el))&&(t.innerHTML=n,this.__componentList__.map(function(e){var t=i[e];t&&d(t.el,function(){t.stubRender(i.__componentStub__[e])})}),o.call(this),s(n)&&a.call(this,t))}}},{"./componentParse":1,"./genElement":2,"./modelParse":4,"./nodesVisibility":5,"./processEvent":7,"./tmplHandler":10,"./utils":11}],7:[function(e,t){var o=e("./utils").loopChilds,f=function(e,t,n){var i,o,r,a,l,s,c,u=t.attributes;e<u.length?(/^k-/.test(u[e].nodeName)&&(i=u[e].nodeName.replace(/^[^-]+-/,""),o=u[e].nodeValue.match(/[a-zA-Z]+(?![^(]*\))/)[0],r=(c=u[e].nodeValue.match(/\(([^{}]+)\)/))?c[1]:"","function"==typeof(a=this[o])&&(n.push(u[e].nodeName),l=[],(s=r.split(",").filter(function(e){return""!==e})).length&&s.map(function(e){l.push(e)}),t.addEventListener(i,a.bind.apply(a.bind(this),[t].concat(l)),!1))),f.call(this,++e,t,n)):n.map(function(e){t.removeAttribute(e)})};t.exports=function(e){var t=this,n=[],i=[];o(n,e),n.map(function(e){1===e.nodeType&&e.hasAttributes()&&f.call(t,0,e,i)}),n=[]}},{"./utils":11}],8:[function(e,t){t.exports=function(e){var t=e.match(/\.*\./g);if(t&&0<t.length)return e.split(".")}},{}],9:[function(e,t){function r(e){return"''"===e||'""'===e?"":e}t.exports=function(e){if(e.match(/([^?]*)\?([^:]*):([^;]*)|(\s*=\s*)[^;]*/g)){var t=e.split("?"),n=t[0],i=t[1].split(":")[0],o=t[1].split(":")[1];return this[n]?{value:r(i),state:n}:{value:r(o),state:n}}return!1}},{}],10:[function(e,t){var c=e("./strInterpreter"),u=e("./ternaryOps");t.exports=function(a,l){var s=this,e=a.match(/{{([^{}]+)}}/g);return e&&e.length&&e.map(function(e){var t=e.replace(/{{([^{}]+)}}/g,"$1"),n=c(t),i=u.call(s,t);if(n?(l(t),a=a.replace("{{"+t+"}}",s[n[0]][n[1]])):void 0!==s[t]?(l(t),a=a.replace("{{"+t+"}}",s[t])):i&&(l(i.state),a=a.replace("{{"+t+"}}",i.value)),t.match(/^\?/g)&&l(t.replace("?","")),t.match(/^model:/g)){var o=t.replace("model:","");~s.__modelList__.indexOf(o)||s.__modelList__.push(o)}if(t.match(/^component:/g)){var r=t.replace("component:","");~s.__componentList__.indexOf(r)||s.__componentList__.push(r)}}),a}},{"./strInterpreter":8,"./ternaryOps":9}],11:[function(e,t,n){var o=function(e){return document.getElementById(e)};n.getId=o,n.genId=function(){return Math.round(1*Math.random()*1e12).toString(32)};var i=function(e,t){for(var n=t.firstChild;null!==n;n=n.nextSibling)e.push(n),n.hasChildNodes()&&i(e,n)};n.loopChilds=i,n.testEvent=function(e){return/ k-/.test(e)},n.checkNodeAvailability=function(e,t){var n=!1,i=setInterval(function(){o(e)&&(clearInterval(i),n=!0,t())},0);setTimeout(function(){n||clearInterval(i)},50)},n.assert=function(e,t){if(!e)throw Error("keet: "+t)}},{}],12:[function(e,t){"use strict";var n=e("./components/utils").getId,i=e("./components/parseStr"),o=e("./components/genElement").setState,r=e("./components/utils").testEvent,a=e("./components/processEvent");function l(){}l.prototype.mount=function(t){return"object"==typeof t?Object.keys(t).map(function(e){"string"==typeof t[e]?t[e]=t[e].trim().replace(/\s+/g," "):"object"==typeof t[e]&&"string"==typeof t[e].template&&(t[e].template=t[e].template.trim().replace(/\s+/g," "))}):"string"==typeof t&&(t=t.trim().replace(/\s+/g," ")),this.base=t,this},l.prototype.flush=function(){var e=n(this.el);return e&&(e.innerHTML=""),this},l.prototype.link=function(e){return this.el=e,this.componentWillMount&&"function"==typeof this.componentWillMount&&this.componentWillMount(),this.render(),this},l.prototype.render=function(e){return e?i.call(this,e):(i.call(this),this.componentDidMount&&"function"==typeof this.componentDidMount&&this.componentDidMount(),this)},l.prototype.cluster=function(){var e=[].slice.call(arguments);0<e.length&&e.map(function(e){"function"==typeof e&&e()})},l.prototype.stubRender=function(e){var t=n(this.el);t&&(o.call(this),r(e)&&a.call(this,t))},t.exports=l},{"./components/genElement":2,"./components/parseStr":6,"./components/processEvent":7,"./components/utils":11}],13:[function(e,t){"use strict";var I,M="http://www.w3.org/1999/xhtml",O="undefined"==typeof document?void 0:document,n=O?O.body||O.createElement("div"):{},s=n.hasAttributeNS?function(e,t,n){return e.hasAttributeNS(t,n)}:n.hasAttribute?function(e,t,n){return e.hasAttribute(n)}:function(e,t,n){return null!=e.getAttributeNode(t,n)};function V(e,t){var n=e.nodeName,i=t.nodeName;return n===i||!!(t.actualize&&n.charCodeAt(0)<91&&90<i.charCodeAt(0))&&n===i.toUpperCase()}function i(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n,""))}var P={OPTION:function(e,t){i(e,t,"selected")},INPUT:function(e,t){i(e,t,"checked"),i(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),s(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var i=e.firstChild;if(i){var o=i.nodeValue;if(o==n||!n&&o==e.placeholder)return;i.nodeValue=n}},SELECT:function(e,t){if(!s(t,null,"multiple")){for(var n=0,i=t.firstChild;i;){var o=i.nodeName;if(o&&"OPTION"===o.toUpperCase()){if(s(i,null,"selected")){n;break}n++}i=i.nextSibling}e.selectedIndex=n}}};function w(){}function R(e){return e.id}var U,o=(U=function(e,t){var n,i,o,r,a,l=t.attributes;for(n=l.length-1;0<=n;--n)o=(i=l[n]).name,a=i.value,(r=i.namespaceURI)?e.getAttributeNS(r,o=i.localName||o)!==a&&e.setAttributeNS(r,o,a):e.getAttribute(o)!==a&&e.setAttribute(o,a);for(n=(l=e.attributes).length-1;0<=n;--n)!1!==(i=l[n]).specified&&(o=i.name,(r=i.namespaceURI)?s(t,r,o=i.localName||o)||e.removeAttributeNS(r,o):s(t,null,o)||e.removeAttribute(o))},function(h,v,e){if(e||(e={}),"string"==typeof v)if("#document"===h.nodeName||"HTML"===h.nodeName){var t=v;(v=O.createElement("html")).innerHTML=t}else n=v,!I&&O.createRange&&(I=O.createRange()).selectNode(O.body),I&&I.createContextualFragment?i=I.createContextualFragment(n):(i=O.createElement("body")).innerHTML=n,v=i.childNodes[0];var n,i,o,_=e.getNodeKey||R,g=e.onBeforeNodeAdded||w,r=e.onNodeAdded||w,b=e.onBeforeElUpdated||w,y=e.onElUpdated||w,a=e.onBeforeNodeDiscarded||w,l=e.onNodeDiscarded||w,N=e.onBeforeElChildrenUpdated||w,s=!0===e.childrenOnly,E={};function x(e){o?o.push(e):o=[e]}function S(e,t,n){!1!==a(e)&&(t&&t.removeChild(e),l(e),function e(t,n){if(1===t.nodeType)for(var i=t.firstChild;i;){var o=void 0;n&&(o=_(i))?x(o):(l(i),i.firstChild&&e(i,n)),i=i.nextSibling}}(e,n))}function L(e){r(e);for(var t=e.firstChild;t;){var n=t.nextSibling,i=_(t);if(i){var o=E[i];o&&V(t,o)&&(t.parentNode.replaceChild(o,t),A(o,t))}L(t),t=n}}function A(e,t,n){var i,o=_(t);if(o&&delete E[o],!v.isSameNode||!v.isSameNode(h)){if(!n){if(!1===b(e,t))return;if(U(e,t),y(e),!1===N(e,t))return}if("TEXTAREA"!==e.nodeName){var r,a,l,s,c=t.firstChild,u=e.firstChild;e:for(;c;){for(l=c.nextSibling,r=_(c);u;){if(a=u.nextSibling,c.isSameNode&&c.isSameNode(u)){c=l,u=a;continue e}i=_(u);var f=u.nodeType,d=void 0;if(f===c.nodeType&&(1===f?(r?r!==i&&((s=E[r])?u.nextSibling===s?d=!1:(e.insertBefore(s,u),a=u.nextSibling,i?x(i):S(u,e,!0),u=s):d=!1):i&&(d=!1),(d=!1!==d&&V(u,c))&&A(u,c)):3!==f&&8!=f||(d=!0,u.nodeValue!==c.nodeValue&&(u.nodeValue=c.nodeValue))),d){c=l,u=a;continue e}i?x(i):S(u,e,!0),u=a}if(r&&(s=E[r])&&V(s,c))e.appendChild(s),A(s,c);else{var p=g(c);!1!==p&&(p&&(c=p),c.actualize&&(c=c.actualize(e.ownerDocument||O)),e.appendChild(c),L(c))}c=l,u=a}for(;u;)a=u.nextSibling,(i=_(u))?x(i):S(u,e,!0),u=a}var m=P[e.nodeName];m&&m(e,t)}}!function e(t){if(1===t.nodeType)for(var n=t.firstChild;n;){var i=_(n);i&&(E[i]=n),e(n),n=n.nextSibling}}(h);var c,u,f=h,d=f.nodeType,p=v.nodeType;if(!s)if(1===d)1===p?V(h,v)||(l(h),f=function(e,t){for(var n=e.firstChild;n;){var i=n.nextSibling;t.appendChild(n),n=i}return t}(h,(c=v.nodeName,(u=v.namespaceURI)&&u!==M?O.createElementNS(u,c):O.createElement(c)))):f=v;else if(3===d||8===d){if(p===d)return f.nodeValue!==v.nodeValue&&(f.nodeValue=v.nodeValue),f;f=v}if(f===v)l(h);else if(A(f,v,s),o)for(var m=0,C=o.length;m<C;m++){var T=E[o[m]];T&&S(T,T.parentNode,!1)}return!s&&f!==h&&h.parentNode&&(f.actualize&&(f=f.actualize(h.ownerDocument||O)),h.parentNode.replaceChild(f,h)),f});t.exports=o},{}]},{},[12])(12)});
/**
 * Keetjs v4.0.0 Alpha release: https://github.com/keetjs/keet.js
 * Minimalist view layer for the web
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Keetjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */
