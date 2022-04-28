var e;
import { refreshUsedTimeAndDate, getConfig, getSearchVideo as _getSearchVideo } from "../../utils/api1";
var i = getApp();
var a = null;
var o = "";

Page({
  data: {
    videos: [],
    tabHidden: !0,
    refreshStatus: !1,
    scrollTop: 0,
    hideGuide: !0,
    scrollH: "88%"
  },
  navigateBack: function () {
    wx.navigateBack({ changed: true });//返回上一页
  },
  onShow: function () {
    refreshUsedTimeAndDate();
  },
  onLoad: function () {
    this.initHideGuide();
    var n = this;
    wx.showLoading({
      title: "加载中..."
    }), getConfig(function () {
      n.setData({
        tabHidden: i.globalData.isShenHe
      }), o = i.globalData.isShenHe ? "情侣壁纸" : "视频壁纸榜", e = 1, n.getSearchVideo();
    }), wx.createInterstitialAd && ((a = wx.createInterstitialAd({
      adUnitId: i.globalData.AD_CHAPING
    })).onLoad(function () { }), a.onError(function (e) { }), a.onClose(function () { }));
  },
  hideGuideTap: function (e) {
    this.setData({
      hideGuide: !0,
      scrollH: "88%"
    }), wx.setStorage({
      key: "hideGuide",
      data: !0
    });
  },
  getSearchVideo: function () {
    var i = this, a = this.data.videos;
    _getSearchVideo(o, e, function (t) {
      1 == e && (a = [], i.setData({
        scrollTop: 0
      }));
      for (var o = 0; o < t.length; o++) "1" != t[o].is_ads && a.push(t[o]);
      i.setData({
        videos: a,
        refreshStatus: !1
      }), wx.stopPullDownRefresh(), wx.hideLoading();
    }, function (e) {
      wx.stopPullDownRefresh(), wx.hideLoading();
    });
  },
  preview: function (e) {
    var t = e.currentTarget.dataset.item.video_preview_url, i = e.currentTarget.dataset.item.thumb_img;
    wx.navigateTo({
      url: "../../pages/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(t) + "&imgSrc=" + encodeURIComponent(i)
    });
  },
  refresh: function (t) {
    e = 1, this.getSearchVideo(), this.setData({
      refreshStatus: !0
    });
  },
  onScrollToLower: function (t) {
    e += 1, this.getSearchVideo(), 3 == e && a && a.show().catch(function (e) {
      console.error(e);
    });
  },
  searchTap: function (e) {
    wx.navigateTo({
      url: "/pages/searchvideo/searchvideo"
    });
  },
  dayTap: function (t) {
    wx.showLoading({
      title: "加载中..."
    }), o = "精选", e = 1, this.getSearchVideo();
  },
  chaoQingTap: function (t) {
    wx.showLoading({
      title: "加载中..."
    }), o = "超清", e = 1, this.getSearchVideo();
  },
  QLTap: function (t) {
    wx.showLoading({
      title: "加载中..."
    }), o = "情侣壁纸", e = 1, this.getSearchVideo();
  },
  initHideGuide: function () {
    var e = this;
    wx.getStorage({
      key: "hideGuide",
      success: function (t) {
        e.setData({
          hideGuide: t.data
        }), e.data.hideGuide ? e.setData({
          scrollH: "88%"
        }) : e.setData({
          scrollH: "81%"
        });
      },
      fail: function (t) {
        e.setData({
          hideGuide: !1,
          scrollH: "81%"
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: "海量高清手机壁纸，动态壁纸，情侣头像",
      path: "pages/dynamic/dynamic"
    };
  },
  onShareTimeline: function () {
    return {
      title: "海量高清手机壁纸，动态壁纸，情侣头像"
    };
  }
});