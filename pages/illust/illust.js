import Util from '../../utils/util';
import {
  MP_POST_DETAIL,
  MP_USER_LIKE,
  MP_USER_FAVORITE
} from '../../utils/api.js';
import { get } from '../../utils/rest';
import { getUser } from '../../utils/auth';
import { wxParse } from '../../components/wxParse/wxParse';

var APP = getApp();
var rewardedVideoAd = null;
var downloadPoints = 0;

Page({
  data: {
    post: {},
    author: '未知',
    aid: '未知',
    // post_like: 0,
    favorite: 0,
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

    self.loadRewardedVideoAd();  // 加载激励广告
  },

  onShow: function () {
    if (!this.needRefresh) {
      this.needRefresh = true;
      return;
    }

    let self = this;

    get(MP_POST_DETAIL, {
      post_id: self.post_id
    }).then(res => {
      wx.setNavigationBarTitle({
        title: res.data.title,
      })

      // 设置 POST 数据
      let items = res.data.excerpt.split(',');
      self.setData({
        post: res.data,
        favorite: res.data.user.isfavorite || false,
        // post_like: res.data.user.islike,
        author: items[0],
        aid: items[1]
      });

      // 解析 POST 内容
      wxParse('illust', 'html', res.data.content, self, 5);

      // 获取下载次数
      downloadPoints = wx.getStorageSync('downloadPoints') || 0;
      console.log('downloadPoints: ' + downloadPoints);
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
    get(MP_USER_LIKE, {
      post_id: self.data.post.id
    })
  },

  // 收藏
  handlerFavoriteClick: function (_e) {
    let self = this;
    get(MP_USER_FAVORITE, {
      post_id: self.data.post.id
    }).then(_res => {
      self.setData({
        favorite: !self.data.favorite
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

    if (downloadPoints < 1) {
      // 播放次数不足
      wx.showModal({
        title: '壁纸下载',
        content: '您的下载次数不足。只需看一次广告，即可免费下载 ' + APP.globalData.PER_AD_REWARD + ' 张超清壁纸！',
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
    let self = this;
    wx.showLoading({ title: '正在保存...' })
    wx.downloadFile({
      url: self.data.illust.imageUrls[1],
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (_) {
            // 修改下载次数
            wx.setStorageSync('downloadPoints', --downloadPoints);
            console.log('downloadPoints: ' + downloadPoints)

            // 显示提示
            wx.showToast({
              title: '保存成功！',
              icon: "success",
              duration: 3e3
            });
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.showModal({
                title: "未获得授权",
                content: "您授权允许保存到相册后才能完成下载哦",
                showCancel: false,
                cancelText: "取消",
                confirmText: "确定",
                success() {
                  wx.openSetting({
                    success: function (_res) {
                      _res.authSetting["scope.writePhotosAlbum"] && self.saveIllust()
                    }
                  });
                }
              });
            }
          },
        })
      },
      complete: function () { wx.hideLoading(); }
    })
  },
})