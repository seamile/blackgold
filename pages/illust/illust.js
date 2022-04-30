import Util from '../../utils/util';
import { JIANGQIE_POST_DETAIL, JIANGQIE_USER_LIKE, JIANGQIE_USER_FAVORITE, JIANGQIE_POST_WXACODE } from '../../utils/api.js';
import { get } from '../../utils/rest';
import { getUser } from '../../utils/auth';
import { wxParse } from '../../components/wxParse/wxParse';
import { create } from '../../components/poster/poster/poster';

var rewardedVideoAd = null;
var e = getApp();

Page({
  data: {
    post: {},
    // post_like: 0,
    post_favorite: 0,
    loadding: false,
    pullUpOn: true,
    loaded: false,
    showOptionBar: true,
    pagead: 7,
    posterConfig: null
  },

  post_id: 0, // 插画ID
  wxacode: '', // 小程序码
  needRefresh: true, // 返回页面是否需要刷新

  onLoad: function (options) {
    if (options.scene) {
      this.post_id = decodeURIComponent(options.scene);
    } else if (options.post_id) {
      this.post_id = options.post_id;
    }


    this.loadWxacode();  // 小程序码
    if (this.data.isShare || wx.createInterstitialAd) {
      let interstitialAd = wx.createInterstitialAd({
        adUnitId: e.globalData.AD_CHAPING
      })
      interstitialAd.onLoad(function () { })
      interstitialAd.onError(function (_t) { })
      interstitialAd.onClose(function () { })
    }
  },

  onShow: function () {
    if (!this.needRefresh) {
      this.needRefresh = true;
      return;
    }

    let self = this;
    Util.getAD(self, function () {
      self.loadInterstitialAd();  // 加载插屏广告
      self.loadRewardedVideoAd();  // 加载激励广告
    })
    get(JIANGQIE_POST_DETAIL, {
      post_id: self.post_id
    }).then(res => {
      // console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.title,
      })

      self.setData({
        post: res.data,
        // post_like: res.data.user.islike,
        post_favorite: res.data.user.isfavorite || false,
        like_list: res.data.like_list,
      });

      wxParse('illust', 'html', res.data.content, self, 5);
    });
  },

  // 获取小程序插屏广告
  loadInterstitialAd: function () {
    if (this.data.setAD.interstitialid && wx.createInterstitialAd) {
      let interstitialAd = wx.createInterstitialAd({
        adUnitId: this.data.setAD.interstitialid
      })
      // 监听插屏错误事件
      interstitialAd.onError((err) => {
        console.error(err)
      })
      // 显示广告
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
    }
  },

  //加载激励广告
  loadRewardedVideoAd: function (_e) {
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: this.data.setAD.rewardedVideoid
      })
      rewardedVideoAd.onLoad(() => console.log('初始化激励视频'))
      rewardedVideoAd.onError((err) => {
        console.log(err);
        // 视频播放异常时，允许用户下载
        this.saveIllust();
      })
      rewardedVideoAd.onClose((res) => {
        if (res && res.isEnded) {
          // 视频完整播完, 记录时间
          let now = new Date();
          wx.setStorageSync('rewardedAdTime', now);
          console.log('视频已播完' + now.toISOString());
          // 下载插画
          this.saveIllust();
        } else {
          wx.showToast({
            title: "你中途关闭了视频",
            icon: "none",
            duration: 3000
          });
        }
      })
    }
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
      title: "【" + self.data.post.title + "】分享这张好看的手机壁纸给你~",
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

  // 海报分享
  sharePosterClick: function (_e) {
    let posterConfig = {
      width: 750,
      height: 1334,
      backgroundColor: '#23aaff',
      debug: false,
      pixelRatio: 1,
      blocks: [{
        width: 690,
        height: 1000,
        x: 30,
        y: 234,
        backgroundColor: '#EEEEEE'
      },],
      texts: [{
        x: 375,
        y: 120,
        baseLine: 'middle',
        textAlign: 'center',
        text: this.data.post.title,
        width: 600,
        fontSize: 38,
        color: '#EEEEEE',
      },
      {
        x: 70,
        y: 780,
        fontSize: 28,
        lineHeight: 40,
        baseLine: 'middle',
        text: this.data.post.excerpt,
        width: 600,
        lineNum: 3,
        color: '#000000',
        zIndex: 200,
      },
      {
        x: 360,
        y: 1170,
        baseLine: 'middle',
        textAlign: 'center',
        text: getApp().appName,
        fontSize: 28,
        color: '#888888',
        zIndex: 200,
      }
      ],
      images: [
        {
          width: 690,
          height: 520,
          x: 30,
          y: 200,
          url: this.data.post.thumbnail,
          zIndex: 100
        },
        {
          width: 200,
          height: 200,
          x: 275,
          y: 920,
          url: this.wxacode,
        }
      ]

    }

    this.setData({
      posterConfig: posterConfig
    }, () => {
      create(true); // 入参：true为抹掉重新生成 
    });
  },

  /**
   * 画报生成成功
   */
  onPosterSuccess(e) {
    this.needRefresh = false;

    const {
      detail
    } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },

  /**
   * 画报生成失败
   */
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 文章中a标签点击
   */
  wxParseTagATap: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.src
    });
  },

  /**
   * 点击 TAG
   */
  handlerTagClick: function (e) {
    let tag_id = e.currentTarget.dataset.id;
    let tag = e.currentTarget.dataset.tag;
    wx.navigateTo({
      url: '/pages/list/list?title=' + tag + '&tag_id=' + tag_id,
    })
  },

  /**
   * 跳转返回
   */
  jumpBtn: function (_options) {
    Util.navigateBack();
  },

  // 文章 点赞
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

  // 文章 收藏
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

  // 加载小程序码
  loadWxacode: function () {
    get(JIANGQIE_POST_WXACODE, {
      post_id: this.post_id
    }).then(res => {
      this.wxacode = res.data;
    }, err => {
      console.log(err);
    });
  },

  handlerLoginCancelClick: function (_e) {
    this.setData({
      showPopLogin: false
    });
  },

  formatNumber: function (t) {
    return (t = t.toString())[1] ? t : "0" + t;
  },

  handlerDoLoginClick: function (_e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });

    this.setData({
      showPopLogin: false
    });
  },

  // 打开激励视频
  openRewardedVideoAd: function () {
    rewardedVideoAd.show()
      .catch(() => {
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(_err => { console.log('激励视频广告显示失败'); })
      })
  },

  // 下载
  downloadIllusts: function () {
    let self = this;
    // 判断用户是否登入
    if (!getUser()) {
      self.setData({ showPopLogin: true });
      return;
    }

    //缓存
    var rewardedAdTime = wx.getStorageSync('rewardedAdTime');
    if (!rewardedAdTime) {
      // 上次播放时间不存在时
      wx.showModal({
        title: '壁纸下载',
        content: '只需要看一次广告，即可在 10 分钟内无限下载所有壁纸！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.openRewardedVideoAd();
          } else {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var now = new Date();
      let timeDiff = now - rewardedAdTime;
      console.log("当前日期：" + now.toISOString());
      console.log("时间差值：" + timeDiff.toString());

      if (timeDiff <= 600e3) {
        self.saveIllust();
      } else {
        wx.showModal({
          title: '壁纸下载',
          content: '只需要看一次广告，即可在 10 分钟内无限下载所有壁纸！',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              self.openRewardedVideoAd();
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },

  //下载壁纸
  saveIllust: function () {
    wx.showLoading({ title: '正在保存...' })
    wx.downloadFile({
      url: this.data.illust.imageUrls[1],
      success: function (e) {
        wx.saveImageToPhotosAlbum({
          filePath: e.tempFilePath,
          success: function (_e) {
            setTimeout(function () { wx.hideLoading() }, 2000)
            wx.showToast({
              title: '保存成功',
              icon: "success",
              duration: 2e3
            })
          },
          fail: function (e) {
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