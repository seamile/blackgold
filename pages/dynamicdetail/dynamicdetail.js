import { getUser } from '../../utils/auth';

var APP = getApp();
var interstitialAd = null;
var rewardedVideoAd = null;
var downloadPoints = 0;

Page({
  data: {
    videoSrc: "",
    imgSrc: "",
    hideBtn: false,
    isShare: false
  },
  navigateBack: function () {
    wx.navigateBack({ changed: true });//返回上一页
  },

  onLoad: function (a) {
    wx.showLoading({ title: "壁纸加载中..." });

    this.setData({
      videoSrc: decodeURIComponent(a.url),
      imgSrc: decodeURIComponent(a.imgSrc),
      isShare: a.isShare || false
    })

    // 插屏广告
    if (!this.data.isShare) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: APP.globalData.AD_INTERSTITIAL
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { console.log(err); })
      interstitialAd.onClose(() => { })
    }

    // 激励视频广告
    rewardedVideoAd = wx.createRewardedVideoAd({
      adUnitId: APP.globalData.AD_REWARD
    })
    rewardedVideoAd.onLoad(() => { })
    rewardedVideoAd.onError((err) => { console.log(err) })
    rewardedVideoAd.onClose((res) => {
      wx.createVideoContext("myVideo").play()
      if (res && res.isEnded) {
        // 视频完整播完, 更新下载次数
        downloadPoints += APP.globalData.PER_AD_REWARD;
        wx.setStorageSync('downloadPoints', downloadPoints);
        this.saveVideo()
      };
    })
  },

  onUnload: function (_) {
    wx.hideLoading();
  },

  onShow: function () {
    // 获取下载次数
    downloadPoints = wx.getStorageSync('downloadPoints') || 0;
    console.log(downloadPoints);
  },

  backTap: function (t) {
    this.data.isShare ? wx.reLaunch({
      url: "../../pages/dynamic/dynamic"
    }) : wx.navigateBack({
      delta: 1
    });
  },

  videoTap: function (t) {
    this.setData({
      hideBtn: !this.data.hideBtn
    });
  },

  // 打开激励视频
  showRewardedVideoAd: function () {
    wx.createVideoContext("myVideo").pause();
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => {
            wx.createVideoContext("myVideo").pause();
            rewardedVideoAd.show();
          })
          .catch(_err => { console.log('激励视频广告显示失败'); })
      })
  },

  downloadTap: function () {
    let self = this;
    // 判断用户是否登入
    if (!getUser()) {
      wx.showModal({
        title: '您尚未登录',
        content: '登录以后才可以下载壁纸哦~',
        confirmText: '点击前往',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/login/login' });
          }
        }
      })
      return;
    }

    if (downloadPoints < 1) {
      // 播放次数不足
      wx.showModal({
        title: '动态壁纸下载',
        content: '您的下载次数不足。看一次广告可免费下载 ' + APP.globalData.PER_AD_REWARD + ' 个动态壁纸！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.showRewardedVideoAd();
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      self.saveVideo();
    }
  },

  saveVideo: function () {
    var self = this;
    wx.showLoading({ title: "下载中..." });
    wx.downloadFile({
      url: self.data.videoSrc.replace("http", "https"),
      success: function (res) {
        res.statusCode === 200 && wx.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (_) {
            // 修改下载次数
            wx.setStorageSync('downloadPoints', --downloadPoints);
            wx.showModal({
              content: "保存成功，请在相册中查看",
              confirmText: "知道了",
              showCancel: false
            });
          }
        });
      },
      complete: function () { wx.hideLoading(); }
    });
  },

  bindloadedmetadata: function (t) {
    wx.hideLoading({})
  },

  onShareAppMessage: function (t) {
    return APP.globalData.isShenHe ? {
      title: "海量高清手机壁纸，动态壁纸，情侣头像",
      path: "pages/dynamic/dynamic",
      imageUrl: this.data.imgSrc
    } : {
        title: "送你一张好看的手机动态壁纸",
        path: "pages/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(this.data.videoSrc) + "&imgSrc=" + encodeURIComponent(this.data.imgSrc) + "&isShare=true",
        imageUrl: this.data.imgSrc
      };
  }
});