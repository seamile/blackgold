/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */
const Api = require('api.js');
const Rest = require('rest.js');

var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, t = function(e) {
    wx.removeStorageSync(e);
};
function navigateBack() {
    wx.navigateBack({
        delta: 1,

        fail: function (res) {
            wx.switchTab({
              url: '/pages/index2/index2',
            })
        }
    });

    
}
function getAD(that,showad){
    Rest.get(Api.JIANGQIE_SETTING_AD).then(res => {
      if (!res.data.posisionad) {
        return
      } else {
        res.data.posisionad = res.data.posisionad.split(',');
        console.log(res.data)
        that.setData({
            setAD: res.data
        })
        showad();          
      }
    })
}
function getshare(that){
    Rest.get(Api.JIANGQIE_SETTING_SHARE).then(res => {
        that.setData({
            shares: res.data
        })
    })
}


module.exports = {
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), o = t.getHours(), u = t.getMinutes(), i = t.getSeconds();
        return [ r, n, a ].map(e).join("/") + " " + [ o, u, i ].map(e).join(":");
    },
    readCache: function(e) {
        var r = wx.getStorageSync(e) || null;
        if (!r) return {};
        var n = function() {
            var e = new Date().getTime();
            return parseInt(e.toString().substr(0, 10));
        }();
        return !r.expire || r.expire < n ? (t(e), {}) : r.value || {};
    },
    navigateBack,
    getAD,
    getshare,
    
    clearCache: t
}