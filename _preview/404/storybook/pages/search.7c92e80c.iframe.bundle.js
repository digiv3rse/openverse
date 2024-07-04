/*! For license information please see search.7c92e80c.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[196,22],{"./src/components/VScrollButton.vue":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var runtime=__webpack_require__("./node_modules/.pnpm/@nuxtjs+composition-api@0.33.1_cche4dkf5nk7uchm2m2hnrg5am/node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs"),emits=__webpack_require__("./src/types/emits.ts"),components_VScrollButtonvue_type_script_lang_ts_=Object(runtime.b)({name:"VScrollButton",props:{isFilterSidebarVisible:{type:Boolean,default:!0}},emits:{tab:Object(emits.a)()},setup:function setup(props){return{hClass:Object(runtime.a)((function(){return props.isFilterSidebarVisible?"ltr:right-[21rem] rtl:left-[21rem]":"ltr:right-4 rtl:left-4"})),scrollToTop:function scrollToTop(){window.scrollTo({top:0,left:0,behavior:"smooth"})}}}}),componentNormalizer=__webpack_require__("./node_modules/.pnpm/vue-loader@15.10.0_vfhh4b6254cvzngpxpqvqoexz4/node_modules/vue-loader/lib/runtime/componentNormalizer.js");const __vuedocgen_export_0=Object(componentNormalizer.a)(components_VScrollButtonvue_type_script_lang_ts_,(function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c("button",{staticClass:"scroll sticky bottom-4 mb-4 h-14 w-14 rounded-full bg-pink text-center text-white transition-all duration-100 ease-linear ms-auto hover:bg-dark-pink hover:shadow-md",class:_vm.hClass,attrs:{"aria-label":_vm.$t("browse-page.aria.scroll"),type:"button"},on:{click:_vm.scrollToTop,keydown:function keydown($event){return!$event.type.indexOf("key")&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")||$event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey?null:_vm.$emit("tab",$event)}}},[_c("svg",{staticClass:"h-full w-full fill-curr",attrs:{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false"}},[_c("path",{attrs:{d:"M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"}})])])}),[],!1,null,null,null).exports;__webpack_exports__.default=__vuedocgen_export_0;__vuedocgen_export_0.__docgenInfo={displayName:"VScrollButton",exportName:"default",description:"",tags:{},props:[{name:"isFilterSidebarVisible",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],events:[{name:"tab"}]}},"./src/pages/search.vue":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.async-iterator.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.symbol.to-string-tag.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.json.to-string-tag.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.math.to-string-tag.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.get-prototype-of.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.object.set-prototype-of.js"),__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.array.slice.js");var esm_typeof=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/typeof.js"),asyncToGenerator=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");__webpack_require__("./node_modules/.pnpm/core-js@3.27.2/node_modules/core-js/modules/es.string.trim.js");function isShallowEqualObjects(a,b){if(a===b)return!0;const aKeys=Object.keys(a),bKeys=Object.keys(b);if(aKeys.length!==bKeys.length)return!1;let i=0;for(;i<aKeys.length;){const key=aKeys[i],aValue=a[key];if(void 0===aValue&&!b.hasOwnProperty(key)||aValue!==b[key])return!1;i++}return!0}var runtime=__webpack_require__("./node_modules/.pnpm/@nuxtjs+composition-api@0.33.1_cche4dkf5nk7uchm2m2hnrg5am/node_modules/@nuxtjs/composition-api/dist/runtime/index.mjs"),media=__webpack_require__("./src/stores/media/index.ts"),search=__webpack_require__("./src/stores/search.ts"),provides=__webpack_require__("./src/types/provides.ts"),VSearchGrid=__webpack_require__("./src/components/VSearchGrid.vue"),VSkipToContentContainer=__webpack_require__("./src/components/VSkipToContentContainer.vue"),VScrollButton=__webpack_require__("./src/components/VScrollButton.vue");function _regeneratorRuntime(){_regeneratorRuntime=function _regeneratorRuntime(){return exports};var exports={},Op=Object.prototype,hasOwn=Op.hasOwnProperty,defineProperty=Object.defineProperty||function(obj,key,desc){obj[key]=desc.value},$Symbol="function"==typeof Symbol?Symbol:{},iteratorSymbol=$Symbol.iterator||"@@iterator",asyncIteratorSymbol=$Symbol.asyncIterator||"@@asyncIterator",toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";function define(obj,key,value){return Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}),obj[key]}try{define({},"")}catch(err){define=function define(obj,key,value){return obj[key]=value}}function wrap(innerFn,outerFn,self,tryLocsList){var protoGenerator=outerFn&&outerFn.prototype instanceof Generator?outerFn:Generator,generator=Object.create(protoGenerator.prototype),context=new Context(tryLocsList||[]);return defineProperty(generator,"_invoke",{value:makeInvokeMethod(innerFn,self,context)}),generator}function tryCatch(fn,obj,arg){try{return{type:"normal",arg:fn.call(obj,arg)}}catch(err){return{type:"throw",arg:err}}}exports.wrap=wrap;var ContinueSentinel={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var IteratorPrototype={};define(IteratorPrototype,iteratorSymbol,(function(){return this}));var getProto=Object.getPrototypeOf,NativeIteratorPrototype=getProto&&getProto(getProto(values([])));NativeIteratorPrototype&&NativeIteratorPrototype!==Op&&hasOwn.call(NativeIteratorPrototype,iteratorSymbol)&&(IteratorPrototype=NativeIteratorPrototype);var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(IteratorPrototype);function defineIteratorMethods(prototype){["next","throw","return"].forEach((function(method){define(prototype,method,(function(arg){return this._invoke(method,arg)}))}))}function AsyncIterator(generator,PromiseImpl){function invoke(method,arg,resolve,reject){var record=tryCatch(generator[method],generator,arg);if("throw"!==record.type){var result=record.arg,value=result.value;return value&&"object"==Object(esm_typeof.a)(value)&&hasOwn.call(value,"__await")?PromiseImpl.resolve(value.__await).then((function(value){invoke("next",value,resolve,reject)}),(function(err){invoke("throw",err,resolve,reject)})):PromiseImpl.resolve(value).then((function(unwrapped){result.value=unwrapped,resolve(result)}),(function(error){return invoke("throw",error,resolve,reject)}))}reject(record.arg)}var previousPromise;defineProperty(this,"_invoke",{value:function value(method,arg){function callInvokeWithMethodAndArg(){return new PromiseImpl((function(resolve,reject){invoke(method,arg,resolve,reject)}))}return previousPromise=previousPromise?previousPromise.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(innerFn,self,context){var state="suspendedStart";return function(method,arg){if("executing"===state)throw new Error("Generator is already running");if("completed"===state){if("throw"===method)throw arg;return doneResult()}for(context.method=method,context.arg=arg;;){var delegate=context.delegate;if(delegate){var delegateResult=maybeInvokeDelegate(delegate,context);if(delegateResult){if(delegateResult===ContinueSentinel)continue;return delegateResult}}if("next"===context.method)context.sent=context._sent=context.arg;else if("throw"===context.method){if("suspendedStart"===state)throw state="completed",context.arg;context.dispatchException(context.arg)}else"return"===context.method&&context.abrupt("return",context.arg);state="executing";var record=tryCatch(innerFn,self,context);if("normal"===record.type){if(state=context.done?"completed":"suspendedYield",record.arg===ContinueSentinel)continue;return{value:record.arg,done:context.done}}"throw"===record.type&&(state="completed",context.method="throw",context.arg=record.arg)}}}function maybeInvokeDelegate(delegate,context){var methodName=context.method,method=delegate.iterator[methodName];if(void 0===method)return context.delegate=null,"throw"===methodName&&delegate.iterator.return&&(context.method="return",context.arg=void 0,maybeInvokeDelegate(delegate,context),"throw"===context.method)||"return"!==methodName&&(context.method="throw",context.arg=new TypeError("The iterator does not provide a '"+methodName+"' method")),ContinueSentinel;var record=tryCatch(method,delegate.iterator,context.arg);if("throw"===record.type)return context.method="throw",context.arg=record.arg,context.delegate=null,ContinueSentinel;var info=record.arg;return info?info.done?(context[delegate.resultName]=info.value,context.next=delegate.nextLoc,"return"!==context.method&&(context.method="next",context.arg=void 0),context.delegate=null,ContinueSentinel):info:(context.method="throw",context.arg=new TypeError("iterator result is not an object"),context.delegate=null,ContinueSentinel)}function pushTryEntry(locs){var entry={tryLoc:locs[0]};1 in locs&&(entry.catchLoc=locs[1]),2 in locs&&(entry.finallyLoc=locs[2],entry.afterLoc=locs[3]),this.tryEntries.push(entry)}function resetTryEntry(entry){var record=entry.completion||{};record.type="normal",delete record.arg,entry.completion=record}function Context(tryLocsList){this.tryEntries=[{tryLoc:"root"}],tryLocsList.forEach(pushTryEntry,this),this.reset(!0)}function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod)return iteratorMethod.call(iterable);if("function"==typeof iterable.next)return iterable;if(!isNaN(iterable.length)){var i=-1,next=function next(){for(;++i<iterable.length;)if(hasOwn.call(iterable,i))return next.value=iterable[i],next.done=!1,next;return next.value=void 0,next.done=!0,next};return next.next=next}}return{next:doneResult}}function doneResult(){return{value:void 0,done:!0}}return GeneratorFunction.prototype=GeneratorFunctionPrototype,defineProperty(Gp,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),defineProperty(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,toStringTagSymbol,"GeneratorFunction"),exports.isGeneratorFunction=function(genFun){var ctor="function"==typeof genFun&&genFun.constructor;return!!ctor&&(ctor===GeneratorFunction||"GeneratorFunction"===(ctor.displayName||ctor.name))},exports.mark=function(genFun){return Object.setPrototypeOf?Object.setPrototypeOf(genFun,GeneratorFunctionPrototype):(genFun.__proto__=GeneratorFunctionPrototype,define(genFun,toStringTagSymbol,"GeneratorFunction")),genFun.prototype=Object.create(Gp),genFun},exports.awrap=function(arg){return{__await:arg}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,asyncIteratorSymbol,(function(){return this})),exports.AsyncIterator=AsyncIterator,exports.async=function(innerFn,outerFn,self,tryLocsList,PromiseImpl){void 0===PromiseImpl&&(PromiseImpl=Promise);var iter=new AsyncIterator(wrap(innerFn,outerFn,self,tryLocsList),PromiseImpl);return exports.isGeneratorFunction(outerFn)?iter:iter.next().then((function(result){return result.done?result.value:iter.next()}))},defineIteratorMethods(Gp),define(Gp,toStringTagSymbol,"Generator"),define(Gp,iteratorSymbol,(function(){return this})),define(Gp,"toString",(function(){return"[object Generator]"})),exports.keys=function(val){var object=Object(val),keys=[];for(var key in object)keys.push(key);return keys.reverse(),function next(){for(;keys.length;){var key=keys.pop();if(key in object)return next.value=key,next.done=!1,next}return next.done=!0,next}},exports.values=values,Context.prototype={constructor:Context,reset:function reset(skipTempReset){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(resetTryEntry),!skipTempReset)for(var name in this)"t"===name.charAt(0)&&hasOwn.call(this,name)&&!isNaN(+name.slice(1))&&(this[name]=void 0)},stop:function stop(){this.done=!0;var rootRecord=this.tryEntries[0].completion;if("throw"===rootRecord.type)throw rootRecord.arg;return this.rval},dispatchException:function dispatchException(exception){if(this.done)throw exception;var context=this;function handle(loc,caught){return record.type="throw",record.arg=exception,context.next=loc,caught&&(context.method="next",context.arg=void 0),!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i],record=entry.completion;if("root"===entry.tryLoc)return handle("end");if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc"),hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc)return handle(entry.catchLoc,!0);if(this.prev<entry.finallyLoc)return handle(entry.finallyLoc)}else if(hasCatch){if(this.prev<entry.catchLoc)return handle(entry.catchLoc,!0)}else{if(!hasFinally)throw new Error("try statement without catch or finally");if(this.prev<entry.finallyLoc)return handle(entry.finallyLoc)}}}},abrupt:function abrupt(type,arg){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&this.prev<entry.finallyLoc){var finallyEntry=entry;break}}finallyEntry&&("break"===type||"continue"===type)&&finallyEntry.tryLoc<=arg&&arg<=finallyEntry.finallyLoc&&(finallyEntry=null);var record=finallyEntry?finallyEntry.completion:{};return record.type=type,record.arg=arg,finallyEntry?(this.method="next",this.next=finallyEntry.finallyLoc,ContinueSentinel):this.complete(record)},complete:function complete(record,afterLoc){if("throw"===record.type)throw record.arg;return"break"===record.type||"continue"===record.type?this.next=record.arg:"return"===record.type?(this.rval=this.arg=record.arg,this.method="return",this.next="end"):"normal"===record.type&&afterLoc&&(this.next=afterLoc),ContinueSentinel},finish:function finish(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.finallyLoc===finallyLoc)return this.complete(entry.completion,entry.afterLoc),resetTryEntry(entry),ContinueSentinel}},catch:function _catch(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if("throw"===record.type){var thrown=record.arg;resetTryEntry(entry)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function delegateYield(iterable,resultName,nextLoc){return this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc},"next"===this.method&&(this.arg=void 0),ContinueSentinel}},exports}var searchvue_type_script_lang_ts_=Object(runtime.b)({name:"BrowsePage",components:{VScrollButton:VScrollButton.default,VSearchGrid:VSearchGrid.default,VSkipToContentContainer:VSkipToContentContainer.default},beforeRouteEnter:function beforeRouteEnter(to,from,next){var searchStore=Object(search.b)();to.query.q&&to.query.q!==searchStore.searchTerm&&searchStore.setSearchTerm(to.query.q),next()},layout:"content-layout",middleware:function middleware(_ref){var route=_ref.route,redirect=_ref.redirect;if(!route.query.q&&!route.query.searchBy)return redirect("/")},scrollToTop:!1,setup:function setup(){var searchGridRef=Object(runtime.p)(null),showScrollButton=Object(runtime.f)("showScrollButton"),isSidebarVisible=Object(runtime.f)(provides.b),mediaStore=Object(media.a)(),searchStore=Object(search.b)();searchStore.refreshRecentSearches();var searchTerm=Object(runtime.a)((function(){return searchStore.searchTerm})),searchType=Object(runtime.a)((function(){return searchStore.searchType})),query=Object(runtime.a)((function(){return searchStore.searchQueryParams}));return{searchGridRef:searchGridRef,showScrollButton:showScrollButton,searchTerm:searchTerm,searchType:searchType,supported:Object(runtime.a)((function(){return searchStore.searchTypeIsSupported})),query:query,resultCount:Object(runtime.a)((function(){return mediaStore.resultCount})),fetchState:Object(runtime.a)((function(){return mediaStore.fetchState})),resultItems:Object(runtime.a)((function(){return mediaStore.resultItems})),needsFetching:Object(runtime.a)((function(){return Boolean(searchStore.searchTypeIsSupported&&!mediaStore.resultCount&&""!==searchStore.searchTerm.trim())})),isSidebarVisible:isSidebarVisible}},asyncData:function asyncData(_ref2){return Object(asyncToGenerator.a)(_regeneratorRuntime().mark((function _callee(){var route,$pinia,searchStore;return _regeneratorRuntime().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return route=_ref2.route,$pinia=_ref2.$pinia,searchStore=Object(search.b)($pinia),_context.next=4,searchStore.initProviderFilters();case 4:searchStore.setSearchStateFromUrl({path:route.path,urlQuery:route.query});case 5:case"end":return _context.stop()}}),_callee)})))()},fetch:function fetch(){var _this=this;return Object(asyncToGenerator.a)(_regeneratorRuntime().mark((function _callee2(){return _regeneratorRuntime().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(!_this.needsFetching){_context2.next=3;break}return _context2.next=3,_this.fetchMedia();case 3:case"end":return _context2.stop()}}),_callee2)})))()},watch:{$route:function $route(newRoute,oldRoute){var _this2=this;return Object(asyncToGenerator.a)(_regeneratorRuntime().mark((function _callee3(){var query,path;return _regeneratorRuntime().wrap((function _callee3$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:if(newRoute.path===oldRoute.path&&isShallowEqualObjects(newRoute.query,oldRoute.query)){_context3.next=6;break}return query=newRoute.query,path=newRoute.path,Object(search.b)(_this2.$nuxt.$pinia).setSearchStateFromUrl({urlQuery:query,path:path}),_context3.next=6,_this2.fetchMedia();case 6:case"end":return _context3.stop()}}),_callee3)})))()}},methods:{fetchMedia:function fetchMedia(){var payload=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},mediaStore=Object(media.a)(this.$pinia);return mediaStore.fetchMedia(payload)}}}),pages_searchvue_type_script_lang_ts_=searchvue_type_script_lang_ts_,componentNormalizer=__webpack_require__("./node_modules/.pnpm/vue-loader@15.10.0_vfhh4b6254cvzngpxpqvqoexz4/node_modules/vue-loader/lib/runtime/componentNormalizer.js"),component=Object(componentNormalizer.a)(pages_searchvue_type_script_lang_ts_,(function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c("VSkipToContentContainer",{staticClass:"browse-page flex w-full flex-col px-6 lg:px-10"},[_c("VSearchGrid",{ref:"searchGridRef",attrs:{"fetch-state":_vm.fetchState,query:_vm.query,supported:_vm.supported,"search-type":_vm.searchType,"results-count":_vm.resultCount,"data-testid":"search-grid"},scopedSlots:_vm._u([{key:"media",fn:function fn(){return[_c("NuxtChild",{key:_vm.$route.path,attrs:{"result-items":_vm.resultItems,"fetch-state":_vm.fetchState,"search-term":_vm.query.q,supported:_vm.supported,"data-testid":"search-results"}})]},proxy:!0}])}),_vm._v(" "),_c("VScrollButton",{directives:[{name:"show",rawName:"v-show",value:_vm.showScrollButton,expression:"showScrollButton"}],attrs:{"is-filter-sidebar-visible":_vm.isSidebarVisible,"data-testid":"scroll-button"}})],1)}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VSearchGrid:__webpack_require__("./src/components/VSearchGrid.vue").default,VScrollButton:__webpack_require__("./src/components/VScrollButton.vue").default,VSkipToContentContainer:__webpack_require__("./src/components/VSkipToContentContainer.vue").default}),__vuedocgen_export_0.__docgenInfo={displayName:"BrowsePage",exportName:"default",description:"",tags:{}}}}]);
//# sourceMappingURL=search.7c92e80c.iframe.bundle.js.map