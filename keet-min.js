(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Keet=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};exports.default=function(argv){var cop=function cop(v){var o={};if((typeof v==="undefined"?"undefined":_typeof(v))!=="object"){o.copy=v;return o.copy}else{for(var attr in v){o[attr]=v[attr]}}return o};return Array.isArray(argv)?argv.map(function(v){return v}):cop(argv)}},{}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var loopChilds=function loopChilds(arr,elem){if(!elem)return false;for(var child=elem.firstChild;child!==null;child=child.nextSibling){arr.push(child);if(child.hasChildNodes()){loopChilds(arr,child)}}};var insertAfter=function insertAfter(newNode,referenceNode){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling)};var nodeUpdate=function nodeUpdate(newNode,oldNode,watcher2){if(!newNode)return false;var oAttr=newNode.attributes,output={};if(oAttr){for(var i=oAttr.length-1;i>=0;i--){output[oAttr[i].name]=oAttr[i].value}}for(var iAttr in output){if(oldNode.attributes[iAttr]&&oldNode.attributes[iAttr].name===iAttr&&oldNode.attributes[iAttr].value!=output[iAttr]){oldNode.setAttribute(iAttr,output[iAttr])}}if(oldNode.textContent===""&&newNode.textContent){oldNode.textContent=newNode.textContent}if(watcher2&&oldNode.textContent!=newNode.textContent){oldNode.textContent=newNode.textContent}if(oldNode.type=="checkbox"&&!oldNode.checked&&newNode.checked){oldNode.checked=true}if(oldNode.type=="checkbox"&&oldNode.checked&&!newNode.checked){oldNode.checked=false}output={}};var nodeUpdateHTML=function nodeUpdateHTML(newNode,oldNode){if(!newNode)return false;if(newNode.nodeValue!==oldNode.nodeValue)oldNode.nodeValue=newNode.nodeValue};var updateElem=function updateElem(oldElem,newElem,watcher2){var oldArr=[],newArr=[];oldArr.push(oldElem);newArr.push(newElem);loopChilds(oldArr,oldElem);loopChilds(newArr,newElem);oldArr.map(function(ele,idx,arr){if(ele.nodeType===1&&ele.hasAttributes()){nodeUpdate(newArr[idx],ele,watcher2)}else if(ele.nodeType===3){nodeUpdateHTML(newArr[idx],ele)}if(idx===arr.length-1){oldArr.splice(0);newArr.splice(0)}})};exports.loopChilds=loopChilds;exports.insertAfter=insertAfter;exports.nodeUpdate=nodeUpdate;exports.nodeUpdateHTML=nodeUpdateHTML;exports.updateElem=updateElem},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(obj){var arrProps=this.base.template.match(/{{([^{}]+)}}/g),tmpl=void 0,tempDiv=void 0,ele=void 0;tmpl=this.base.template;arrProps.map(function(s){var rep=s.replace(/{{([^{}]+)}}/g,"$1");tmpl=tmpl.replace(/{{([^{}]+)}}/,obj[rep])});tempDiv=document.createElement("div");tempDiv.innerHTML=tmpl;(0,_processEvent2.default)(tempDiv,this);return tempDiv.childNodes[0]};var _processEvent=require("./processEvent");var _processEvent2=_interopRequireDefault(_processEvent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}},{"./processEvent":6}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _copy=require("./copy");var _copy2=_interopRequireDefault(_copy);var _tag=require("./tag");var _tag2=_interopRequireDefault(_tag);var _tmplHandler=require("./tmplHandler");var _tmplHandler2=_interopRequireDefault(_tmplHandler);var _tmplStylesHandler=require("./tmplStylesHandler");var _tmplStylesHandler2=_interopRequireDefault(_tmplStylesHandler);var _tmplClassHandler=require("./tmplClassHandler");var _tmplClassHandler2=_interopRequireDefault(_tmplClassHandler);var _processEvent=require("./processEvent");var _processEvent2=_interopRequireDefault(_processEvent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(child,context){var tempDiv=document.createElement("div");var cloneChild=(0,_copy2.default)(child);delete cloneChild.template;delete cloneChild.tag;delete cloneChild.style;delete cloneChild.class;var tpl=child.template?(0,_tmplHandler2.default)(child.template,context):null;var styleTpl=(0,_tmplStylesHandler2.default)(child.style,context);var classTpl=(0,_tmplClassHandler2.default)(child,context);if(classTpl)cloneChild.class=classTpl;var s=child.tag?(0,_tag2.default)(child.tag,tpl?tpl.tmpl:"",cloneChild,styleTpl):child.template;tempDiv.innerHTML=s;if(child.tag==="input"){if(child.checked)tempDiv.childNodes[0].checked=true;else tempDiv.childNodes[0].removeAttribute("checked")}(0,_processEvent2.default)(tempDiv,context,tpl?tpl.proxyRes:null);return tempDiv.childNodes[0]}},{"./copy":1,"./processEvent":6,"./tag":9,"./tmplClassHandler":11,"./tmplHandler":12,"./tmplStylesHandler":13}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};var _generateElement=require("./generateElement");var _generateElement2=_interopRequireDefault(_generateElement);var _tmplHandler=require("./tmplHandler");var _tmplHandler2=_interopRequireDefault(_tmplHandler);var _tmplArrayHandler=require("./tmplArrayHandler");var _tmplArrayHandler2=_interopRequireDefault(_tmplArrayHandler);var _processEvent=require("./processEvent");var _processEvent2=_interopRequireDefault(_processEvent);var _utils=require("./utils");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(context){if(_typeof(context.base)!="object")throw new Error("instance is not an object");var elemArr=[];if(Array.isArray(context.base.list)){var tpl=_tmplArrayHandler2.default.call(context);tpl.tmpl.map(function(ptmpl){var tempDiv=document.createElement("div");tempDiv.innerHTML=ptmpl;(0,_processEvent2.default)(tempDiv,context,tpl.proxyRes);elemArr.push(tempDiv.childNodes[0])});context.list=tpl.proxyRes}else{Object.keys(context.base).map(function(key){var child=context.base[key];if(child&&(typeof child==="undefined"?"undefined":_typeof(child))==="object"){var id=(0,_utils.genId)();child["keet-id"]=id;context.base[key]["keet-id"]=id;var newElement=(0,_generateElement2.default)(child,context);elemArr.push(newElement)}else{var _child=context.base[key];var _tpl=(0,_tmplHandler2.default)(_child,context);var tempDiv=document.createElement("div");tempDiv.innerHTML=_tpl.tmpl;(0,_processEvent2.default)(tempDiv,context,_tpl.proxyRes);elemArr.push(tempDiv.childNodes[0])}})}return elemArr}},{"./generateElement":4,"./processEvent":6,"./tmplArrayHandler":10,"./tmplHandler":12,"./utils":14}],6:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _utils=require("./utils");var _elementUtils=require("./elementUtils");var next=function next(i,c,rem,context,proxy){var hask=void 0,evtName=void 0,evthandler=void 0,handler=void 0,isHandler=void 0,argv=void 0,v=void 0,atts=c.attributes;if(i<atts.length){hask=/^k-/.test(atts[i].nodeName);if(hask){evtName=atts[i].nodeName.split("-")[1];evthandler=atts[i].nodeValue;handler=evthandler.split("(");isHandler=(0,_utils.testEval)(context[handler[0]]);if(typeof isHandler==="function"){rem.push(atts[i].nodeName);argv=[];v=handler[1].slice(0,-1).split(",").filter(function(f){return f!=""});if(v.length)v.map(function(v){return argv.push(v)});c.addEventListener(evtName,isHandler.bind.apply(isHandler.bind(proxy),[c].concat(argv)),false)}}i++;next(i,c,rem,context,proxy)}else{rem.map(function(f){return c.removeAttribute(f)})}};exports.default=function(kNode,context,proxy){var listKnodeChild=[],rem=[],i=0;(0,_elementUtils.loopChilds)(listKnodeChild,kNode);listKnodeChild.map(function(c){if(c.nodeType===1&&c.hasAttributes())next(i,c,rem,context,proxy)});listKnodeChild=[]}},{"./elementUtils":2,"./utils":14}],7:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _copy=require("./copy");var _copy2=_interopRequireDefault(_copy);var _generateElement=require("./generateElement");var _generateElement2=_interopRequireDefault(_generateElement);var _utils=require("./utils");var _elementUtils=require("./elementUtils");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var updateContext=function updateContext(key,contextPristine,obj){var context=(0,_copy2.default)(contextPristine);Object.keys(context.base).map(function(handlerKey){var tmplBase=context.base[handlerKey].template;if(tmplBase){var hasTmpl=tmplBase.match("{{"+key+"}}");if(hasTmpl&&hasTmpl.length){Object.assign(context,obj)}}var styleBase=context.base[handlerKey].style;if(styleBase){Object.keys(styleBase).map(function(style){var hasStyleAttr=styleBase[style].match("{{"+key+"}}");if(hasStyleAttr)Object.assign(context,obj)})}var id=context.base[handlerKey]["keet-id"],ele=(0,_utils.selector)(id),newElem=(0,_generateElement2.default)(context.base[handlerKey],context);(0,_elementUtils.updateElem)(ele,newElem)})};exports.default=function(context){var watchObject=function watchObject(obj){return new Proxy(obj,{set:function set(target,key,value){var obj={};obj[key]=value;updateContext(key,context,obj);return target[key]=value}})};return watchObject(context)}},{"./copy":1,"./elementUtils":2,"./generateElement":4,"./utils":14}],8:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _generateElement=require("./generateElement");var _generateElement2=_interopRequireDefault(_generateElement);var _copy=require("./copy");var _copy2=_interopRequireDefault(_copy);var _utils=require("./utils");var _elementUtils=require("./elementUtils");var _genTemplate=require("./genTemplate");var _genTemplate2=_interopRequireDefault(_genTemplate);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var arrProtoSplice=function arrProtoSplice(){var ele=(0,_utils.getId)(this.el),childLen=void 0,len=void 0,i=void 0,j=void 0,k=void 0,c=void 0,tempDivChildLen=void 0,tempDiv=void 0,argv=[].slice.call(arguments),start=[].shift.call(argv),count=[].shift.call(argv);tempDiv=document.createElement("div");if(argv.length){i=0;while(i<argv.length){tempDiv.appendChild(_genTemplate2.default.call(this,argv[i]));i++}}childLen=(0,_copy2.default)(ele.childNodes.length);tempDivChildLen=(0,_copy2.default)(tempDiv.childNodes.length);if(count&&count>0){for(i=start;i<childLen+1;i++){len=start+count;if(i<len){ele.removeChild(ele.childNodes[start]);if(i===len-1&&tempDivChildLen>0){c=start-1;for(j=start;j<tempDivChildLen+start;j++){(0,_elementUtils.insertAfter)(tempDiv.childNodes[0],ele.childNodes[c],ele);c++}}}}}else if(argv.length){c=start-1;for(k=start;k<tempDivChildLen+start;k++){(0,_elementUtils.insertAfter)(tempDiv.childNodes[0],ele.childNodes[c],ele);c++}}};var arrProtoUpdate=function arrProtoUpdate(index,value){var ele=(0,_utils.getId)(this.el);if(!ele.childNodes[index]){arrProtoSplice.apply(this,[index,0,value])}else{(0,_elementUtils.updateElem)(ele.childNodes[index],_genTemplate2.default.call(this,value))}};exports.default=function(list,context){var watchObject=function watchObject(obj){return new Proxy(obj,{set:function set(target,key,value){var num=parseInt(key);if(Number.isInteger(num)){arrProtoUpdate.apply(context,[num,value])}return target[key]=value},deleteProperty:function deleteProperty(target,key,value){var num=parseInt(key);if(Number.isInteger(num)){arrProtoSplice.apply(context,[num,1])}return target[key]}})};return watchObject(list)}},{"./copy":1,"./elementUtils":2,"./genTemplate":3,"./generateElement":4,"./utils":14}],9:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};function ktag(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}var attr=void 0,idx=void 0,te=void 0,ret=["<",args[0],">",args[1],"</",args[0],">"];if(args.length>2&&_typeof(args[2])==="object"){for(attr in args[2]){if(typeof args[2][attr]==="boolean"&&args[2][attr])ret.splice(2,0," ",attr);else if(attr==="class"&&Array.isArray(args[2][attr]))ret.splice(2,0," ",attr,'="',args[2][attr].join(" ").trim(),'"');else ret.splice(2,0," ",attr,'="',args[2][attr],'"')}}if(args.length>3&&_typeof(args[3])==="object"){idx=ret.indexOf(">");te=[idx,0,' style="'];for(attr in args[3]){te.push(attr);te.push(":");te.push(args[3][attr]);te.push(";")}te.push('"');ret.splice.apply(ret,te)}return ret}exports.default=function(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2]}return ktag.apply(null,[].concat(args)).join("")}},{}],10:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(){var str=this.base.template,list=this.base.list,arrProps=str.match(/{{([^{}]+)}}/g),tmpl=void 0,strList=[];if(arrProps&&arrProps.length){list.map(function(r){tmpl=str;arrProps.forEach(function(s){var rep=s.replace(/{{([^{}]+)}}/g,"$1");tmpl=tmpl.replace(/{{([^{}]+)}}/,r[rep])});strList.push(tmpl)})}var proxyRes=(0,_proxyList2.default)(list,this);return{tmpl:strList,proxyRes:proxyRes}};var _proxyList=require("./proxyList");var _proxyList2=_interopRequireDefault(_proxyList);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}},{"./proxyList":8}],11:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _proxy=require("./proxy");var _proxy2=_interopRequireDefault(_proxy);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(child,context){if(child.class){var c=child.class.match(/{{([^{}]+)}}/g);var classStr="";if(c&&c.length){c.forEach(function(s){var rep=s.replace(/{{([^{}]+)}}/g,"$1");if(context[rep]!==undefined){context[rep].cstore.map(function(c){classStr+=c+" "})}})}return classStr.trim()}}},{"./proxy":7}],12:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _proxy=require("./proxy");var _proxy2=_interopRequireDefault(_proxy);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(str,context,genElement){var arrProps=str.match(/{{([^{}]+)}}/g);if(arrProps&&arrProps.length){arrProps.forEach(function(s){var rep=s.replace(/{{([^{}]+)}}/g,"$1");if(context[rep]!==undefined){str=str.replace(/{{([^{}]+)}}/,context[rep])}})}var proxyRes=(0,_proxy2.default)(context);return{tmpl:str,proxyRes:proxyRes}}},{"./proxy":7}],13:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _proxy=require("./proxy");var _proxy2=_interopRequireDefault(_proxy);var _copy=require("./copy");var _copy2=_interopRequireDefault(_copy);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(styles,context){var copyStyles=(0,_copy2.default)(styles);if(styles){Object.keys(copyStyles).map(function(style){var arrProps=copyStyles[style].match(/{{([^{}]+)}}/g);if(arrProps&&arrProps.length){arrProps.map(function(s){var rep=s.replace(/{{([^{}]+)}}/g,"$1");if(context[rep]!==undefined){copyStyles[style]=copyStyles[style].replace(/{{([^{}]+)}}/,context[rep])}})}})}return copyStyles}},{"./copy":1,"./proxy":7}],14:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var getId=function getId(id){return document.getElementById(id)};var testEval=function testEval(ev){try{return eval(ev)}catch(e){return false}};var genId=function genId(){return Math.round(Math.random()*1*1e12).toString(32)};var selector=function selector(id){return document.querySelector('[keet-id="'+id+'"]')};exports.getId=getId;exports.testEval=testEval;exports.genId=genId;exports.selector=selector},{}],15:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _utils=require("./components/utils");var _parseStr=require("./components/parseStr");var _parseStr2=_interopRequireDefault(_parseStr);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}module.exports=function(){function Keet(context){_classCallCheck(this,Keet);this.base=context||{}}_createClass(Keet,[{key:"mount",value:function mount(instance){this.base=instance;return this}},{key:"link",value:function link(id){this.el=id;this.render();return this}},{key:"render",value:function render(){var ele=(0,_utils.getId)(this.el);if(ele)ele.innerHTML="";var els=(0,_parseStr2.default)(this,true),i=0;while(i<els.length){ele.appendChild(els[i]);if(i===els.length-1){document.addEventListener("_loaded",window._loaded&&typeof window._loaded==="function"?window._loaded(this.el):null,false)}i++}return this}},{key:"cluster",value:function cluster(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}args.map(function(f){if(typeof f==="function")f()})}}]);return Keet}()},{"./components/parseStr":5,"./components/utils":14}]},{},[15])(15)});
