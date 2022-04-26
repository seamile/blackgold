/*
 * 酱茄小程序开源版 v1.3.5
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')

const Auth = require('./utils/auth.js');
!function (t) {
  t && t.__esModule;
}(require("./utils/flcache"));

var t = require("./utils/ubt"), e = require("./utils/login"), a = require("configApi");

App({

  appName: '次元画册',
  lazyCodeLoading: "requiredComponents",
  onLaunch: function (t) {
  },
  onShow: function (t) {
    wx.setStorageSync("weapp_scene", t.scene);
  },
  bindSpm: function (e) {
    var a = e.currentTarget.dataset.spm, r = e.currentTarget.dataset.url, n = e.currentTarget.dataset.type, i = e.currentTarget.dataset.shopid, o = e.currentTarget.dataset.appid, u = e.currentTarget.dataset.lc;
    a && (0, t.UBT)(a), 2 == n ? this.getShopActivityPath(i, r, u, function (t) {
      t.activity_path && wx.navigateToMiniProgram({
        appId: o,
        path: t.activity_path,
        envVersion: "release",
        success: function (t) { }
      });
    }) : r && wx.navigateTo({
      url: r
    });
  },
  uploadFormid: function (t) {
    var r = t.detail.formId;
    (0, e.flLoginRequest)({
      url: a.backfl.reportFormId,
      data: {
        formid: r
      }
    }).then(function (t) { });
  },
  globalData: {
    userInfo: null,
    objectId: "",
    isShenHe: !1,
    COUNT: 1e4,
    AD_REWARD: "adunit-b1aef89d19d2e4da",
    AD_CHAPING: "adunit-f154314d6dfd9b36",
    AD_CHAPING_HOME: "adunit-f154314d6dfd9b36"
  },
  errLog: function (t) {
    console.log(t);
  },
  onLaunch: function () {
    Auth.checkSession();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

})
