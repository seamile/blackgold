import './common/runtime.js';
import './common/vendor.js';
import './common/main.js';
import { checkSession } from './utils/auth.js';
!function (t) {
  t && t.__esModule;
}(require("./utils/flcache"));

import { UBT } from "./utils/ubt";
import { flLoginRequest } from "./utils/login";
import { backfl } from "configApi";
import { get } from './utils/rest';
import { JIANGQIE_SETTING_AD } from './utils/api';

App({
  appName: '次元画册',
  lazyCodeLoading: "requiredComponents",

  globalData: {
    userInfo: null,
    objectId: "",
    isShenHe: false,
    PER_AD_REWARD: 15,
    AD_REWARD: "adunit-b1aef89d19d2e4da",
    AD_INTERSTITIAL: "adunit-f154314d6dfd9b36"
  },

  onLaunch: function () {
    checkSession();
  },

  onShow: function (t) {
    wx.setStorageSync("weapp_scene", t.scene);
    get(JIANGQIE_SETTING_AD).then(res => {
      if (!res.data.posisionad) {
        return
      } else {
        let ads = res.data;
        let posisionad = ads.posisionad.split(',');
        this.globalData.PER_AD_REWARD = Number(posisionad[posisionad.length - 1]);
        ads.rewardedVideoid && (this.globalData.AD_REWARD = ads.rewardedVideoid);
        ads.interstitialid && (this.globalData.AD_INTERSTITIAL = ads.interstitialid);
      }
    })
    console.log(this.globalData)
  },

  bindSpm: function (e) {
    var a = e.currentTarget.dataset.spm;
    var r = e.currentTarget.dataset.url;
    var n = e.currentTarget.dataset.type;
    var i = e.currentTarget.dataset.shopid;
    var o = e.currentTarget.dataset.appid;
    var u = e.currentTarget.dataset.lc;

    a && (0, UBT)(a), 2 == n ? this.getShopActivityPath(i, r, u, function (t) {
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
    (0, flLoginRequest)({
      url: backfl.reportFormId,
      data: {
        formid: r
      }
    }).then(function (t) { });
  },

  errLog: function (t) {
    console.log(t);
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
