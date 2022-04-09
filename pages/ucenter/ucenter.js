/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Auth = require('../../utils/auth');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');

Page({

  data: {
    setting: {},
    user: undefined,
    menu: {},
  },

  default: {
    background: Api.JIANGQIE_BG_MY,
    menu: [ //views,likes,favorites,comments,about,feedback,contact,clear,split,link,page
      {
        tp: 'views',
        icon: '../../images/eye.svg',
        title: '我的浏览',
        line: 1,
      },
      {
        tp: 'likes',
        icon: '../../images/like2.svg',
        title: '我的点赞',
        line: 1,
      },
      {
        tp: 'favorites',
        icon: '../../images/star.svg',
        title: '我的收藏',
        line: 1,
      },
      {
        tp: 'about',
        icon: '../../images/gzh.svg',
        title: '公众号',
        line: 0,
      },
      {
        tp: 'split'
      },
      // {
      //     tp: 'about',
      //     icon: '',
      //     title: '关于我们',
      //     line: 1,
      // },

      {
        tp: 'contact',
        icon: '',
        title: '在线客服',
        line: 1,
      },
      {
        tp: 'feedback',
        icon: '',
        title: '意见反馈',
        line: 1,
      },
      {
        tp: 'clear',
        icon: '',
        title: '清除缓存',
        line: 0,
      },
    ]
  },

  onShow: function (options) {
    let that = this;
    let user = Auth.getUser();
    that.setData({
      user: user
    });

    Rest.get(Api.JIANGQIE_SETTING_UCENTER).then(res => {
      let menu = that.default.menu;
      if (res.data.menu.length > 0) {
        menu = res.data.menu;
      }
      that.setData({
        setting: {
          background: res.data.background ? res.data.background : that.default.background,
        },
        menu: menu
      });
    })
  },

  //跳转到隐私协议页面  
  gotoyinsi: function (options) {
    wx.navigateTo({
      url: '../yinsi/yinsi',//要跳转到的页面路径
    })
  },

  //跳转到隐私协议页面  
  gotoyonghu: function (options) {
    wx.navigateTo({
      url: '../yonghu/yonghu',//要跳转到的页面路径
    })
  },

  //跳转到隐私协议页面  
  gotogzh: function (options) {
    wx.previewImage({
      urls: ["https://pixcdn.seamile.cn/ele/QR-Code.jpg"]
    })
  },

  //跳转到隐私协议页面  
  gotoabout: function (options) {
    wx.navigateTo({
      url: '../about/about',//要跳转到的页面路径
    })
  },

  onShareAppMessage: function () {
    return {
      title: getApp().appName,
      path: 'pages/index2/index2',
    }
  },

  onShareTimeline: function () {
    return {
      title: getApp().appName,
    }
  },

  handlerPostTrack: function (e) {
    if (!Auth.getUser()) {
      this.setData({
        showPopLogin: true
      });
      return;
    }

    let track = e.currentTarget.dataset.track;
    wx.navigateTo({
      url: '/pages/list/list?track=' + track
    })
  },

  handlerguanwang: function (e) {
    wx.navigateTo({
      url: '/pages/gongzh/gongzh',
    })
  },

  handlerClearCache: function (e) {
    wx.showModal({
      title: '提示',
      content: '清除缓存 需要重新登录',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '清除完毕',
          });
          wx.reLaunch({
            url: '/pages/index2/index2',
          })
        }
      }
    });
  },

  handlerLinkClick: function (e) {
    let link = e.currentTarget.dataset.link;
    if (link.startsWith('/pages')) {
      wx.navigateTo({
        url: link,
      })
    } else {
      wx.navigateToMiniProgram({
        appId: link,
        fail: res => {
          wx.showToast({
            title: '无效链接',
          })
        }
      })
    }
  },

  handlerLoginCancelClick: function (e) {
    this.setData({
      showPopLogin: false
    });
  },

  handlerDoLoginClick: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });

    this.setData({
      showPopLogin: false
    });
  },
})