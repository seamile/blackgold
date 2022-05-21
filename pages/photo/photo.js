import { getUser } from '../../utils/auth';

var APP = getApp();
var rewardedVideoAd = null;
var downloadPoints = 0;

Page({
  data: {
    src: "",
    item: ""
  },

  navigateBack: function () {
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
        wx.redirectTo({
          url: '../../circle/index/index?circleId=' + self.data.circleId
            + '&circleName=' + (self.data.circleName || '')
        });
      } else {
        wx.switchTab({
          url: "../../home/grouplist/grouplist"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页
    }
  },

  onLoad: function (n) {
    if (n.src != null)
      this.setData({ src: n.src })

    if (n.item != null) {
      let item = JSON.parse(n.item);
      this.setData({ item: item });
    }

    rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: APP.globalData.AD_REWARD })
    rewardedVideoAd.onError(function (err) { console.log(err) })
    rewardedVideoAd.onClose(function (res) {
      if (res && res.isEnded) {
        // 视频完整播完, 更新下载次数
        downloadPoints += APP.globalData.PER_AD_REWARD;
        wx.setStorageSync('downloadPoints', downloadPoints);
        wx.showToast({
          title: '奖励已到账！\n当前下载点数：' + downloadPoints,
          duration: 5,
        })
      };
    });
  },

  onShow: function () {
    // 获取下载次数
    downloadPoints = wx.getStorageSync('downloadPoints') || 0;
    console.log('downloadPoints: ' + downloadPoints);
  },

  // 打开激励视频
  showRewardedVideoAd: function () {
    rewardedVideoAd.show().catch(() => {
      rewardedVideoAd.load().then(() => {
        wx.createVideoContext("myVideo").pause();
        rewardedVideoAd.show();
      }).catch(_err => {
        console.log('激励视频广告显示失败');
      })
    })
  },

  canDownload: function (target) {
    if (target.currentTarget.dataset.src)
      return downloadPoints >= 1;
    else
      return downloadPoints >= 2;
  },

  downloadTap: function (target) {
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

    if (self.canDownload(target)) {
      self.saveImg(target);
    } else {
      // 播放次数不足
      wx.showModal({
        title: '次数不够啦',
        content: '您的下载次数不足。看一次广告可免费下载 ' + APP.globalData.PER_AD_REWARD + ' 次哦！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.showRewardedVideoAd();
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  saveToAlbum: function (src) {
    wx.getImageInfo({
      src: src,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: function () {
            // 修改下载次数
            wx.setStorageSync('downloadPoints', --downloadPoints);
            wx.showToast({
              title: "下载成功",
              icon: "success",
              duration: 2e3,
              mask: !0,
            });
          },
        });
      },
    })
  },

  saveImg: function (target) {
    let self = this;

    // 获取头像、套图的网址
    var gAvatar = target.currentTarget.dataset.avatar;
    gAvatar != null && (gAvatar = gAvatar.replace("http", "https"));
    var gCard = target.currentTarget.dataset.card;
    gCard != null && (gCard = gCard.replace("http", "https"));
    var avatar = target.currentTarget.dataset.src;
    avatar != null && (avatar = avatar.replace("http", "https"))

    // 下载
    wx.getSetting({
      success: function (res) {
        res.authSetting["scope.writePhotosAlbum"]
          ? (
            null != gAvatar && null != gCard && (self.saveToAlbum(gAvatar), self.saveToAlbum(gCard)),
            null != avatar && self.saveToAlbum(avatar)
          )
          : wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
              null != gAvatar && null != gCard && (
                self.saveToAlbum(gAvatar), self.saveToAlbum(gCard)),
                null != avatar && self.saveToAlbum(avatar);
            },
            fail: function () {
              wx.showModal({
                title: "未授权",
                content: "请授权",
                showCancel: false,
                cancelText: "取消",
                confirmText: "确定",
              });
            }
          });
      }
    });
  },

  copy: function (target) {
    var n = target.currentTarget.dataset.content;
    wx.setClipboardData({
      data: n,
      success: function () {
        wx.showToast({
          title: "复制完成",
          icon: "success",
          image: "",
          duration: 1e3,
          mask: !0,
          success: function () { },
          fail: function () { },
          complete: function () { }
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },


  onShareAppMessage: function () {
    return null != this.data.src && "" != this.data.src ? {
      title: "咚，好友发给你一张头像、请查收！",
      path: "pages/photo/photo?src=" + this.data.src + "&picId=" + this.data.picId + "&needcount=" + this.data.needcount,
      imageUrl: this.data.src
    } : {
        title: "咚，好友发给你一个套图、请查收！",
        path: "pages/photo/photo?item=" + JSON.stringify(this.data.item)
      };
  }
});