(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabbar/index"],{4590:function(e,n,a){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"tabbar",data:function(){return{}},props:{name:{type:String,value:"avatar"}},methods:{onClickItem:function(n){switch(console.log(n),n){case"avatar":e.reLaunch({url:"/pages/avatar/index"});break;case"cover":e.reLaunch({url:"/pages/cover/index"});break;case"me":e.reLaunch({url:"/pages/me/index"});break}}}};n.default=a}).call(this,a("543d")["default"])},acbf:function(e,n,a){"use strict";a.r(n);var t=a("4590"),r=a.n(t);for(var u in t)"default"!==u&&function(e){a.d(n,e,(function(){return t[e]}))}(u);n["default"]=r.a},ad47:function(e,n,a){"use strict";a.r(n);var t=a("f7c6"),r=a("acbf");for(var u in r)"default"!==u&&function(e){a.d(n,e,(function(){return r[e]}))}(u);var o,c=a("f0c5"),i=Object(c["a"])(r["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],o);n["default"]=i.exports},f7c6:function(e,n,a){"use strict";a.d(n,"b",(function(){return r})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return t}));var t={uTabbar:function(){return Promise.all([a.e("common/vendor"),a.e("node-modules/uview-ui/components/u-tabbar/u-tabbar")]).then(a.bind(null,"6e56"))},uTabbarItem:function(){return Promise.all([a.e("common/vendor"),a.e("node-modules/uview-ui/components/u-tabbar-item/u-tabbar-item")]).then(a.bind(null,"2408"))}},r=function(){var e=this,n=e.$createElement;e._self._c},u=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabbar/index-create-component',
    {
        'components/tabbar/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ad47"))
        })
    },
    [['components/tabbar/index-create-component']]
]);
