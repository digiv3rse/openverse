(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{"./src/components/VErrorSection/VNoResults.vue":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("../node_modules/.pnpm/core-js@3.36.1/node_modules/core-js/modules/es.function.name.js");var vue=__webpack_require__("../node_modules/.pnpm/vue@2.7.16/node_modules/vue/dist/vue.js"),use_analytics=__webpack_require__("./src/composables/use-analytics.ts"),use_external_sources=__webpack_require__("./src/composables/use-external-sources.ts"),ui=__webpack_require__("./src/stores/ui.ts"),VButton=__webpack_require__("./src/components/VButton.vue"),VErrorSection_VNoResultsvue_type_script_lang_ts=Object(vue.defineComponent)({name:"VNoResults",components:{VButton:VButton.a},props:{searchTerm:{type:String,required:!0}},setup:function setup(props){var _useExternalSources=Object(use_external_sources.a)(),externalSources=_useExternalSources.externalSources,externalSourcesType=_useExternalSources.externalSourcesType,sendCustomEvent=Object(use_analytics.a)().sendCustomEvent;return Object(vue.onMounted)((function(){Object(ui.a)().setFiltersState(!1)})),{handleClick:function handleClick(sourceName){sendCustomEvent("SELECT_EXTERNAL_SOURCE",{name:sourceName,mediaType:externalSourcesType.value,query:props.searchTerm,component:"VNoResults"})},externalSources:externalSources}}}),componentNormalizer=__webpack_require__("../node_modules/.pnpm/vue-loader@15.11.1_@vue+compiler-sfc@3.3.4_babel-core@7.0.0-bridge.0_@babel+core@7.24.4__css-_kpa2jm6q5lntp7j2v7yhhjk7he/node_modules/vue-loader/lib/runtime/componentNormalizer.js");const __vuedocgen_export_0=Object(componentNormalizer.a)(VErrorSection_VNoResultsvue_type_script_lang_ts,(function render(){var _vm=this,_c=_vm._self._c;_vm._self._setupProxy;return _c("div",{staticClass:"no-results text-center md:text-left"},[_c("h1",{staticClass:"heading-4 md:heading-2 break-words"},[_vm._v("\n    "+_vm._s(_vm.$t("noResults.heading",{query:_vm.searchTerm}))+"\n  ")]),_vm._v(" "),_c("h2",{staticClass:"description-regular md:heading-5 mt-4"},[_vm._v("\n    "+_vm._s(_vm.$t("noResults.alternatives"))+"\n  ")]),_vm._v(" "),_c("div",{staticClass:"mt-10 flex flex-col flex-wrap gap-4 sm:flex-row"},_vm._l(_vm.externalSources,(function(source){return _c("VButton",{key:source.name,staticClass:"label-bold !w-full text-dark-charcoal sm:!w-auto",attrs:{as:"VLink",href:source.url,variant:"bordered-gray",size:"medium","show-external-icon":"","has-icon-end":"","external-icon-size":6},on:{mousedown:function mousedown($event){return _vm.handleClick(source.name)}}},[_vm._v("\n      "+_vm._s(source.name)+"\n    ")])})),1)])}),[],!1,null,null,null).exports;__webpack_exports__.default=__vuedocgen_export_0;__vuedocgen_export_0.__docgenInfo={displayName:"VNoResults",exportName:"default",description:"",tags:{},props:[{name:"searchTerm",description:"The search term for which the external sources links are generated.",type:{name:"string"},required:!0}]}}}]);