(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{1105:function(e,t,n){"use strict";(function(e){n("1d89");var t=c(n("f618")),r=c(n("66fd")),o=c(n("0153")),u=c(n("6274"));function c(e){return e&&e.__esModule?e:{default:e}}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}r.default.prototype.$music=u.default,r.default.use(o.default),r.default.config.productionTip=!1,t.default.mpType="app";var l=new r.default(a({},t.default));n("a48c")(l),e(l).$mount()}).call(this,n("543d")["createApp"])},"3cc2":function(e,t,n){"use strict";n.r(t);var r=n("4197"),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a},4197:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){console.log("App Launch")},onShow:function(t){t.query.referee_id&&t.query.referee_id>0&&e.setStorageSync("referee_id",t.query.referee_id),console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=n}).call(this,n("543d")["default"])},"458d":function(e,t,n){},bbaa:function(e,t,n){"use strict";var r=n("458d"),o=n.n(r);o.a},f618:function(e,t,n){"use strict";n.r(t);var r=n("3cc2");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("bbaa");var u,c,f,a,i=n("f0c5"),l=Object(i["a"])(r["default"],u,c,!1,null,null,null,!1,f,a);t["default"]=l.exports}},[["1105","common/runtime","common/vendor"]]]);