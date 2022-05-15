import { refreshUsedTimeAndDate, getSearchVideo as _getSearchVideo } from "../../utils/api1";
var APP = getApp();
var a = null;
var keyword = "";
var page = 1;

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
    wx.navigateBack({ changed: true });  //返回上一页
  },
  onShow: function () {
    refreshUsedTimeAndDate();
  },

  onLoad: function () {
    let self = this;
    self.initHideGuide();
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
    let interstitialAd = wx.createInterstitialAd({
      adUnitId: APP.globalData.AD_INTERSTITIAL
    });

    interstitialAd.onLoad(function () { });
    interstitialAd.onError(function (err) { console.log(err); });
    interstitialAd.onClose(function () { });
  },

  hideGuideTap: function () {
    this.setData({
      hideGuide: !0,
      scrollH: "88%"
    }), wx.setStorage({
      key: "hideGuide",
      data: !0
    });
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
    page = 1, this.getSearchVideo(), this.setData({
      refreshStatus: !0
    });
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

  initHideGuide: function () {
    var self = this;
    wx.getStorage({
      key: "hideGuide",
      success: function (res) {
        self.setData({
          hideGuide: res.data
        }), self.data.hideGuide ? self.setData({
          scrollH: "88%"
        }) : self.setData({
          scrollH: "81%"
        });
      },
      fail: function (_res) {
        self.setData({
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