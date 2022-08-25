/*
 * 酱茄小程序开源版 v1.3.5
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

import { ALB_USER_KEY } from './constants';

//获取TOKEN
export function getToken() {
  let user = wx.getStorageSync(ALB_USER_KEY);
  if (!user) {
    return false;
  }

  return user.token;
}

//注销
export function logout() {
  wx.setStorageSync(ALB_USER_KEY, false);
}

export function checkSession() {
  wx.checkSession({
    fail() {
      logout();
    }
  });
}


export const isLogin = getToken;
export function getWXUser() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
export function setUser(user) {
  wx.setStorageSync(ALB_USER_KEY, user);
}
export function getUser() {
  return wx.getStorageSync(ALB_USER_KEY);
}