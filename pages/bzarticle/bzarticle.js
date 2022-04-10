/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Constants = require('../../utils/constants');
const Util = require('../../utils/util');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');
const Auth = require('../../utils/auth');
const WxParse = require('../../components/wxParse/wxParse');
const Poster = require('../../components/poster/poster/poster');
let rewardedVideoAd = null;
var e = getApp(), o = null;
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
  post_id: 0,

  //小程序码
  wxacode: '',

  //返回页面是否需要刷新
  needRefresh: true,

  onLoad: function (options) {
    if (options.scene) {
      this.post_id = decodeURIComponent(options.scene);
    } else if (options.post_id) {
      this.post_id = options.post_id;
    }

    //小程序码
    this.loadWxacode();
    this.getDate(), this.data.isShare || wx.createInterstitialAd && ((o = wx.createInterstitialAd({
      adUnitId: e.globalData.AD_CHAPING
    })).onLoad(function () { }), o.onError(function (t) { }), o.onClose(function () { }))
  },

  onShow: function () {
    if (!this.needRefresh) {
      this.needRefresh = true;
      return;
    }

    let that = this;
    Util.getAD(that, function () {
      // that.setInterstitialAd(); //加载插屏广告
      //加载广告
      that.loadInterstitialAd();
    })
    Rest.get(Api.JIANGQIE_POST_DETAIL, {
      post_id: that.post_id
    }).then(res => {
      // console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.title,
      })

      that.setData({
        post: res.data,
        // post_like: res.data.user.islike,
        post_favorite: res.data.user.isfavorite || 0,
        like_list: res.data.like_list,
      });

      WxParse.wxParse('bzarticle', 'html', res.data.content, that, 5);
    });
  },

  // 获取小程序插屏广告
  setInterstitialAd: function () {
    var that = this;
    if (that.data.setAD.interstitialid && wx.createInterstitialAd) {
      let interstitialAd = wx.createInterstitialAd({
        adUnitId: that.data.setAD.interstitialid
      })
      // 监听插屏错误事件
      interstitialAd.onError((err) => {
        console.error(err)
      })
      // 显示广告
      if (interstitialAd) {
        if (that.data.setAD.switch_inad == 'yes') {
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
  // onHide(){
  //   clearInterval(setinad);
  // },
  onReachBottom: function () {
    if (!this.data.pullUpOn) {
      return;
    }
    this.loadComments(false);
  },

  onShareAppMessage: function () {
    let that = this;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: "【" + that.data.post.title + "】分享这张好看的手机壁纸给你~",
      imageUrl: this.data.post.thumbnail,
      path: 'pages/bzarticle/bzarticle?post_id=' + this.post_id,
    }
  },

  onShareTimeline: function () {
    let that = this;
    return {
      title: "【" + that.data.post.title + "】分享这张好看的手机壁纸给你~",
      query: 'post_id=' + that.post_id,
      imageUrl: that.data.post.thumbnail,
    }
  },

  switchOptionBarState: function () {
    this.setData({
      showOptionBar: (!this.data.showOptionBar),
    })
  },

  // 收藏
  onAddToFavorites: function () {
    var that = this;
    return {
      title: that.data.post.title,
      imageUrl: that.data.post.thumbnail,
    }
  },
  /**
   * 海报分享
   */
  sharePosterClick: function (e) {
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
      Poster.create(true); // 入参：true为抹掉重新生成 
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
  jumpBtn: function (options) {
    Util.navigateBack();
  },

  /**
   * 文章 点赞
   */
  handlerLikeClick: function (e) {
    let that = this;
    Rest.get(Api.JIANGQIE_USER_LIKE, {
      post_id: that.data.post.id
    }).then(res => {
      let avatar = Auth.getUser().avatar;
      var index = that.data.like_list.indexOf(avatar);
      if (index > -1) {
        that.data.like_list.splice(index, 1);
      } else {
        that.data.like_list.unshift(avatar);
      }

      that.setData({
        // post_like: (that.data.post_like == 1 ? 0 : 1),
        like_list: that.data.like_list
      });
    })
  },

  /**
   * 文章 收藏
   */
  handlerFavoriteClick: function (e) {
    let that = this;
    Rest.get(Api.JIANGQIE_USER_FAVORITE, {
      post_id: that.data.post.id
    }).then(res => {
      that.setData({
        post_favorite: 1 - that.data.post_favorite
      });
    })
  },

  /**
   * 加载小程序码
   */
  loadWxacode: function () {
    let that = this;
    Rest.get(Api.JIANGQIE_POST_WXACODE, {
      post_id: that.post_id
    }).then(res => {
      that.wxacode = res.data;
    }, err => {
      console.log(err);
    });
  },

  handlerLoginCancelClick: function (e) {
    this.setData({
      showPopLogin: false
    });
  },

  getDate: function () {
    var t = new Date(), e = (t.getFullYear(), t.getMonth() + 1), o = t.getDate(), n = t.getHours(), a = t.getMinutes(), i = (t.getSeconds(),
      e + "月" + o + "日"), c = [n, a].map(this.formatNumber).join(":");
    this.setData({
      date: i,
      time: c
    });
  },
  formatNumber: function (t) {
    return (t = t.toString())[1] ? t : "0" + t;
  },

  handlerDoLoginClick: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });

    this.setData({
      showPopLogin: false
    });
  },
  // 二开版权信息
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 二开版权信息end

  //没流量主壁纸下载

  downloadPhoto1: function (e) {
    // 判断用户是否登入
    if (!Auth.getUser()) {
      this.setData({
        showPopLogin: true
      });
      return;
    }
    var t = this;
    var photourl = t.data.bzarticle.imageUrls[1];
    wx.showLoading({
      title: '正在保存...',
    })
    wx.downloadFile({
      url: photourl,
      success: function (e) {
        wx.saveImageToPhotosAlbum({
          filePath: e.tempFilePath,
          success: function (e) {
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
            wx.showToast({
              title: '保存成功',
              icon: "success",
              duration: 2e3
            })
          },
          fail: function (e) {
            "saveImageToPhotosAlbum:fail auth deny" === e.errMsg && wx.openSetting({
              success: function (e) {
                console.log(e), e.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，给出再次点击图片保存到相册的提示。") : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
              }
            });
          },
          complete: function (e) {
            wx.hideLoading();
          }
        })
      }
    })
  },
  // 二开下载
  downloadPhotos: function (e) {
    // 判断用户是否登入
    if (!Auth.getUser()) {
      this.setData({
        showPopLogin: true
      });
      return;
    }

    //准备下载壁纸
    var self = this;
    //缓存
    var openAdLogs = wx.getStorageSync('openAdLogs');
    var atdate = new Date();
    atdate = atdate.getFullYear() + "-" + (atdate.getMonth() + 1) + '-' + atdate.getDate();
    console.log("当前日期：" + atdate);

    if (openAdLogs.length <= 0) { //缓存不存在
      wx.showModal({
        title: '壁纸下载',
        content: '您只需要看一次广告即可在24小时内免费下载所有壁纸！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            self.readMore();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else { //缓存存在
      if (openAdLogs[0].date == atdate) {
        if (openAdLogs[0].num != 0) {
          openAdLogs[0].num = openAdLogs[0].num - 1
          wx.setStorageSync('openAdLogs', openAdLogs);
          self.downloadPhoto(e);
        } else {
          wx.showModal({
            title: '提示',
            content: '已经下载10张啦~需要我帮你收藏这张壁纸吗？等明天再来下载',
            success(res) {
              if (res.confirm) {
                self.handlerFavoriteClick(e);
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      } else {
        wx.showModal({
          title: '壁纸下载',
          content: '您只需要看一次广告即可在24小时内免费下载所有壁纸！~',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');

              self.readMore();

              console.log("无广告下载~");

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },


  // 打开激励视频
  readMore: function () {
    var self = this;
    var platform = self.data.platform
    if (platform == 'devtools') {
      wx.showToast({
        title: "开发工具无法显示激励视频",
        icon: "none",
        duration: 2000
      });
      self.setData({
        detailSummaryHeight: ''
      })
    } else {
      rewardedVideoAd.show()
        .catch(() => {
          rewardedVideoAd.load()
            .then(() => rewardedVideoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败');
              self.setData({
                detailSummaryHeight: ''
              })
            })
        })
    }
  },

  //下载壁纸
  downloadPhoto: function (e) {
    var t = this;
    var photourl = t.data.bzarticle.imageUrls[1];
    wx.showLoading({
      title: '正在保存...',
    })
    wx.downloadFile({
      url: photourl,
      success: function (e) {
        wx.saveImageToPhotosAlbum({
          filePath: e.tempFilePath,
          success: function (e) {
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
            wx.showToast({
              title: '保存成功',
              icon: "success",
              duration: 2e3
            })
          },
          fail: function (e) {
            "saveImageToPhotosAlbum:fail auth deny" === e.errMsg && wx.openSetting({
              success: function (e) {
                console.log(e), e.authSetting["scope.writePhotosAlbum"] ? console.log("获取权限成功，给出再次点击图片保存到相册的提示。") : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
              }
            });
          },
          complete: function (e) {
            wx.hideLoading();
          }
        })
      }
    })
  },



  //加载广告
  loadInterstitialAd: function () {
    var self = this;
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: self.data.setAD.rewardedVideoid
      })
      rewardedVideoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      rewardedVideoAd.onError((err) => {
        console.log(err);
        this.setData({
          detailSummaryHeight: ''
        })
      })
      rewardedVideoAd.onClose((res) => {

        var id = self.data.post.id;
        if (res && res.isEnded) {

          var nowDate = new Date();
          nowDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();

          var openAdLogs = [];
          // 过滤重复值
          if (openAdLogs.length > 0) {
            openAdLogs = openAdLogs.filter(function (log) {
              return log["id"] !== id;
            });
          }
          // 如果超过指定数量不再记录
          if (openAdLogs.length < 21) {
            var log = {
              "id": id,
              "date": nowDate,
              "num": 9
            }
            openAdLogs.unshift(log);
            wx.setStorageSync('openAdLogs', openAdLogs);
            console.log(openAdLogs);

          }
          this.setData({
            detailSummaryHeight: ''
          })
          self.downloadPhoto();
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
})