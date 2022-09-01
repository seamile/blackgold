/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

import { getUser } from '../../utils/auth';
import { MP_BG_MY, MP_SETTING_UCENTER } from '../../utils/api.js';
import { get } from '../../utils/rest';

Page({

  data: {
    setting: {},
    user: undefined,
    menu: {},
  },

  default: {
    background: MP_BG_MY,
    menu: [ //views,likes,favorites,comments,about,feedback,contact,clear,split,link,page
      {
        tp: 'favorites',
        icon: '../../images/star.svg',
        title: '我的收藏',
        line: 1,
      },
      {
        tp: 'views',
        icon: '../../images/eye.svg',
        title: '浏览记录',
        line: 1,
      },
      // {
      //   tp: 'likes',
      //   icon: '../../images/fav1.svg',
      //   title: '我的点赞',
      //   line: 1,
      // },
      {
        tp: 'contact',
        icon: '../../images/service.svg',
        title: '在线客服',
        line: 1,
      },
      {
        tp: 'clear',
        icon: '../../images/clean.svg',
        title: '清除缓存',
        line: 0,
      },
      {
        tp: 'about',
        icon: '../../images/ours.svg',
        title: '关于我们',
        line: 1,
      },
    ]
  },

  onShow: function (_options) {
    let that = this;
    let user = getUser();
    that.setData({
      user: user
    });

    get(MP_SETTING_UCENTER).then(res => {
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
  gotoyinsi: function (_options) {
    wx.navigateTo({
      url: '../yinsi/yinsi',//要跳转到的页面路径
    })
  },

  //跳转到隐私协议页面
  gotoyonghu: function (_options) {
    wx.navigateTo({
      url: '../yonghu/yonghu',//要跳转到的页面路径
    })
  },

  //跳转到隐私协议页面
  gotogzh: function (_options) {
    wx.previewImage({
      urls: ["http://pixcdn.seamile.cn/ele/QR-Code.jpg"]
    })
  },

  //跳转到隐私协议页面
  gotoabout: function (_options) {
    wx.navigateTo({
      url: '../about/about',//要跳转到的页面路径
    })
  },

  onShareAppMessage: function () {
    return {
      title: getApp().appName,
      path: 'pages/index/index',
    }
  },

  onShareTimeline: function () {
    return {
      title: getApp().appName,
    }
  },

  handlerPostTrack: function (e) {
    if (!getUser()) {
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

  handlerguanwang: function (_e) {
    wx.navigateTo({
      url: '/pages/gongzh/gongzh',
    })
  },

  handlerClearCache: function (_e) {
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
            url: '/pages/index/index',
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
        fail: _res => {
          wx.showToast({
            title: '无效链接',
          })
        }
      })
    }
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
})
