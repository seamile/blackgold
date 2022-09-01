import { MP_VERSION } from '../../utils/constants';
import util from '../../utils/util.js';

Page({
  data: {
    version: MP_VERSION,
    pagead: 3
  },

  onLoad: function (_options) {
    util.getshare(this);
  },

  onShow() {
    var that = this;
    util.getAD(that, that.showInterstitialAd)
  },

  // 是否可以显示插屏广告
  canShowInterstitialAd: function () {
    let lastShowIntAd = wx.getStorageSync('lastShowIntAd') || 0;
    let current = new Date().getTime();
    let pastSeconds = (current - lastShowIntAd) / 1000;
    console.log(lastShowIntAd, pastSeconds);
    return pastSeconds > 300;  // 距离上次显示插屏广告超过 5 分钟时，可以再次显示
  },

  // 获取小程序插屏广告
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

  onShareAppMessage: function () {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: that.data.shares.share_title,
      imageUrl: that.data.shares.share_image,
    }
  },
  //转发朋友圈
  onShareTimeline: function () {
    var that = this;
    return {
      title: that.data.shares.share_title,
      imageUrl: that.data.shares.share_image,
    }
  },
  // 收藏
  onAddToFavorites: function () {
    var that = this;
    return {
      title: that.data.shares.share_title,
      imageUrl: that.data.shares.share_image,
    }
  },


  copy: function (e) {
    let text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success(_res) {
        wx.getClipboardData({
          success(_res) {
            wx.showToast({
              title: '微信号已复制',
            });
          }
        })
      }
    })
  },

  tipClick: function () {
    wx.showToast({
      icon: 'none',
      title: '酱茄小程序开源版 v1.1.8',
    })
  }
})