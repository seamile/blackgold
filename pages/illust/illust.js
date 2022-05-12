import Util from '../../utils/util';
import {
  JIANGQIE_POST_DETAIL,
  JIANGQIE_USER_LIKE,
  JIANGQIE_USER_FAVORITE
} from '../../utils/api.js';
import { get } from '../../utils/rest';
import { getUser } from '../../utils/auth';
import { wxParse } from '../../components/wxParse/wxParse';

var APP = getApp();
var rewardedVideoAd = null;
var interstitialAd = null;
var downloadPoints = 0;

Page({
  data: {
    post: {},
    // post_like: 0,
    post_favorite: 0,
    showOptionBar: true,
    pagead: 7,
    posterConfig: null,
    loading: true,
    imode: 'aspectFill'
  },

  post_id: 0, // 插画ID
  needRefresh: true, // 返回页面是否需要刷新

  onLoad: function (options) {
    let self = this;

    if (options.scene) {
      self.post_id = decodeURIComponent(options.scene);
    } else if (options.post_id) {
      self.post_id = options.post_id;
    }

    self.loadInterstitialAd();  // 加载插屏广告
    self.loadRewardedVideoAd();  // 加载激励广告
  },

  onShow: function () {
    if (!this.needRefresh) {
      this.needRefresh = true;
      return;
    }

    let self = this;

    get(JIANGQIE_POST_DETAIL, {
      post_id: self.post_id
    }).then(res => {
      wx.setNavigationBarTitle({
        title: res.data.title,
      })

      // 设置 POST 数据
      self.setData({
        post: res.data,
        // post_like: res.data.user.islike,
        post_favorite: res.data.user.isfavorite || false,
        like_list: res.data.like_list,
      });

      // 解析 POST 内容
      wxParse('illust', 'html', res.data.content, self, 5);

      // 获取下载次数
      downloadPoints = wx.getStorageSync('downloadPoints') || 0;
    });
  },

  onIllustLoaded: function (res) {
    let inf = wx.getSystemInfoSync();
    let sysAspectRatio = inf.windowWidth / inf.windowHeight; // 屏幕宽高比
    let imgAspectRatio = res.detail.width / res.detail.height; // 图片宽高比

    this.setData({
      loading: false, // 关闭“加载中”状态
      imode: (imgAspectRatio >= sysAspectRatio) ? 'aspectFill' : 'widthFix' // 根据宽高比设置相应显示模式
    })
  },

  // 初始化插屏广告
  loadInterstitialAd: function () {
    interstitialAd = wx.createInterstitialAd({
      adUnitId: APP.globalData.AD_INTERSTITIAL
    })
    interstitialAd.onLoad(function () { })
    interstitialAd.onError((err) => { console.error(err); })
    interstitialAd.onClose(function () { })
  },

  // 显示插屏广告
  showInterstitialAd: function () {
    if (interstitialAd) {
      if (this.data.setAD.switch_inad == 'yes') {
        setinad = setInterval(() => {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }, 2000);
      }
      else {
        setTimeout(() => {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }, 6000);
      }
    }
  },

  //加载激励广告
  loadRewardedVideoAd: function () {
    let self = this;
    rewardedVideoAd = wx.createRewardedVideoAd({
      adUnitId: APP.globalData.AD_REWARD
    })
    rewardedVideoAd.onLoad(() => console.log('初始化激励视频'));
    rewardedVideoAd.onError((err) => {
      console.log(err);
      self.saveIllust(); // 视频播放异常时，允许用户下载
    })
    rewardedVideoAd.onClose((res) => {
      if (res && res.isEnded) {
        // 视频完整播完, 更新下载次数
        downloadPoints += APP.globalData.PER_AD_REWARD;
        wx.setStorageSync('downloadPoints', downloadPoints);
        // 下载插画
        self.saveIllust();
      } else {
        wx.showToast({
          title: "你中途关闭了视频",
          icon: "none",
          duration: 3000
        });
      }
    })
  },

  // 打开激励视频
  showRewardedVideoAd: function () {
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(_err => { console.log('激励视频广告显示失败'); })
      })
  },

  onShareAppMessage: function () {
    let self = this;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: "【" + self.data.post.title + "】分享这张好看的手机壁纸给你~",
      imageUrl: this.data.post.thumbnail,
      path: 'pages/illust/illust?post_id=' + this.post_id,
    }
  },

  onShareTimeline: function () {
    let self = this;
    return {
      title: "【" + self.data.post.title + "】分享这张好看的壁纸给你~",
      query: 'post_id=' + self.post_id,
      imageUrl: self.data.post.thumbnail,
    }
  },

  switchOptionBarState: function () {
    this.setData({
      showOptionBar: (!this.data.showOptionBar),
    })
  },

  // 收藏
  onAddToFavorites: function () {
    var self = this;
    return {
      title: self.data.post.title,
      imageUrl: self.data.post.thumbnail,
    }
  },

  // 文章中a标签点击
  wxParseTagATap: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.src
    });
  },

  // 点击 TAG
  handlerTagClick: function (e) {
    let tag_id = e.currentTarget.dataset.id;
    let tag = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '/pages/list/list?title=' + tag + '&tag_id=' + tag_id,
    })
  },

  // 返回上一页
  jumpBtn: function (_options) {
    Util.navigateBack();
  },

  // 点赞
  handlerLikeClick: function (_e) {
    let self = this;
    get(JIANGQIE_USER_LIKE, {
      post_id: self.data.post.id
    }).then(_res => {
      let avatar = getUser().avatar;
      var index = self.data.like_list.indexOf(avatar);
      if (index > -1) {
        self.data.like_list.splice(index, 1);
      } else {
        self.data.like_list.unshift(avatar);
      }

      self.setData({
        // post_like: (self.data.post_like == 1 ? 0 : 1),
        like_list: self.data.like_list
      });
    })
  },

  // 收藏
  handlerFavoriteClick: function (_e) {
    let self = this;
    get(JIANGQIE_USER_FAVORITE, {
      post_id: self.data.post.id
    }).then(_res => {
      self.setData({
        post_favorite: !self.data.post_favorite
      });
    })
  },

  handlerLoginCancelClick: function (_e) {
    this.setData({
      showPopLogin: false
    });
  },

  handlerDoLoginClick: function (_e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });

    this.setData({
      showPopLogin: false
    });
  },

  // 下载插画
  downloadIllust: function () {
    let self = this;

    // 判断用户是否登入
    if (!getUser()) {
      self.setData({ showPopLogin: true });
      return;
    }
    console.log(downloadPoints)
    if (downloadPoints <= 0) {
      // 播放次数不足
      wx.showModal({
        title: '壁纸下载',
        content: '只需看一次广告，即可免费下载 ' + APP.globalData.PER_AD_REWARD + ' 张超清壁纸！',
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
      self.saveIllust();
    }
  },

  //下载壁纸
  saveIllust: function () {
    wx.showLoading({ title: '正在保存...' })
    wx.downloadFile({
      url: this.data.illust.imageUrls[1],
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (_e) {
            setTimeout(function () { wx.hideLoading() }, 2000);
            wx.setStorageSync('downloadPoints', --downloadPoints);  // 修改下载次数
            // 显示提示
            wx.showToast({
              title: '保存成功！',
              icon: "success",
              duration: 3e3
            });
          },
          fail: function (e) {
            console.log(e);
            "saveImageToPhotosAlbum:fail auth deny" === e.errMsg && wx.openSetting({
              success: function (e) {
                console.log(e)
                e.authSetting["scope.writePhotosAlbum"]
                  ? console.log("获取权限成功，给出再次点击图片保存到相册的提示。")
                  : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
              }
            });
          },
          complete: function (_e) {
            wx.hideLoading();
          }
        })
      }
    })
  },
})