import { getSearchVideo as _getSearchVideo } from "../../utils/videoApi";
import util from '../../utils/util.js';

var APP = getApp();
var a = null;
var keyword = "";
var page = 1;

Page({
  data: {
    videos: [],
    tabHidden: false,
    refreshStatus: false,
    scrollTop: 0,
    hideGuide: !0,
    scrollH: "88%"
  },

  navigateBack: function () {
    wx.navigateBack({ changed: true });  //返回上一页
  },

  onLoad: function () {
    let self = this;

    wx.showLoading({
      title: "加载中..."
    });

    self.setData({
      tabHidden: false
    });

    keyword = APP.globalData.isShenHe ? "情侣壁纸" : "视频壁纸榜";
    page = 1;
    self.getSearchVideo();

    // 插屏广告
    util.getAD(self, self.showInterstitialAd);
  },

  // 是否可以显示插屏广告
  canShowInterstitialAd: function () {
    let lastShowIntAd = wx.getStorageSync('lastShowIntAd') || 0;
    let current = new Date().getTime();
    let pastSeconds = (current - lastShowIntAd) / 1000;
    console.log(lastShowIntAd, pastSeconds);
    return pastSeconds > 300;  // 距离上次显示插屏广告超过 5 分钟时，可以再次显示
  },

  // 获取插屏广告
  showInterstitialAd: function () {
    var self = this;
    let canShow = self.canShowInterstitialAd();
    if (canShow && self.data.setAD.interstitialid && wx.createInterstitialAd) {
      // 记录当前时间
      wx.setStorageSync('lastShowIntAd', new Date().getTime());

      let interstitialAd = wx.createInterstitialAd({
        adUnitId: self.data.setAD.interstitialid
      })
      // 监听插屏错误事件
      interstitialAd.onError((err) => { console.error(err) })
      // 显示广告
      interstitialAd.show().catch((err) => { console.error(err) })
    }
  },

  getSearchVideo: function () {
    var self = this;
    var videos = this.data.videos;

    _getSearchVideo(keyword, page, function (t) {
      if (page == 1) {
        videos = [];
        self.setData({ scrollTop: 0 })
      };

      for (var idx = 0; idx < t.length; idx++) {
        if (t[idx].is_ads != "1")
          videos.push(t[idx]);
      };
      self.setData({
        videos: videos,
        refreshStatus: false
      });
      wx.stopPullDownRefresh();
      wx.hideLoading();
    }, function (_e) {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    });
  },

  preview: function (item) {
    var t = item.currentTarget.dataset.item.video_preview_url, i = item.currentTarget.dataset.item.thumb_img;
    wx.navigateTo({
      url: "../../pages/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(t) + "&imgSrc=" + encodeURIComponent(i)
    });
  },

  refresh: function (_target) {
    page = 1;
    this.getSearchVideo();
    this.setData({ refreshStatus: false });
  },

  onScrollToLower: function (_target) {
    page++
    this.getSearchVideo()
    if (3 == page && a)
      a.show().catch(function (err) {
        console.error(err);
      });
  },

  searchTap: function (_target) {
    wx.navigateTo({
      url: "/pages/searchvideo/searchvideo"
    });
  },

  dayTap: function () {
    wx.showLoading({
      title: "加载中..."
    }), keyword = "精选", page = 1, this.getSearchVideo();
  },

  chaoQingTap: function () {
    wx.showLoading({
      title: "加载中..."
    }), keyword = "超清", page = 1, this.getSearchVideo();
  },

  QLTap: function (_target) {
    wx.showLoading({
      title: "加载中..."
    }), keyword = "情侣壁纸", page = 1, this.getSearchVideo();
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