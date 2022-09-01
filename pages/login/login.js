/*
 * 酱茄小程序开源版 v1.3.5
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

import Util from '../../utils/util';
import { getWXUser, setUser } from '../../utils/auth';
import {
  MP_SETTING_CATEGORY, MP_USER_LOGIN
} from '../../utils/api.js';
import { get } from '../../utils/rest';

Page({

  data: {
    title: ''
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

  handlerCancelClick: function (_) {
    Util.navigateBack();
  },

  onLoad: function (_) {
    this.setData({
      title: getApp().appName
    })
    get(MP_SETTING_CATEGORY).then(res => {
      console.log(res)
      this.setData({
        title: res.data.title,
        description: res.data.description
      })
    })
  },
  /*结束*/
  handlerLoginClick: function (e) {
    wx.getUserProfile({
      desc: '使用微信的头像昵称初始化用户',
      success: function (wxUser) {
        wx.showLoading({ title: '登录中, 请稍后' });
        getWXUser().then(res => {
          return get(MP_USER_LOGIN, {
            code: res.code,
            nickName: wxUser.userInfo.nickName,
            avatarUrl: wxUser.userInfo.avatarUrl,
          })
        }).then(res => {
          let user = res.data;
          setUser(user);
          Util.navigateBack();
          wx.hideLoading();
        });
      },
      fail: function (_) {
        wx.showToast({
          title: '允许后才能登录',
          icon: 'error',
          duration: 1500,
        })
      }
    });
  }
})