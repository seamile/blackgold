/*
 * 酱茄小程序开源版 v1.1.8
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Constant = require('../../utils/constants');
const util = require('../../utils/util.js');
let setinad;
Page({
    data: {
        version: Constant.JQ_VERSION,
        pagead:3
    },

    onLoad: function (options) {
        util.getshare(this);
    },

    onShow(){
        var that = this;
        util.getAD(that,function(){
            that.setInterstitialAd(); //加载插屏广告
        })
        
    },
 // 获取小程序插屏广告
 setInterstitialAd: function () {
     var that = this;
    if(that.data.setAD.interstitialid&&wx.createInterstitialAd){
        let interstitialAd = wx.createInterstitialAd({
            adUnitId: that.data.setAD.interstitialid
        })
         // 监听插屏错误事件
        interstitialAd.onError((err) => {
            console.error(err)
        })
         // 显示广告
        if (interstitialAd) {
            if(that.data.setAD.switch_inad=='yes'){
                setinad = setInterval(() => {
                    interstitialAd.show().catch((err) => {
                        console.error(err)
                    })
                }, 2000);
            }
            else{
                setTimeout(() => {
                    interstitialAd.show().catch((err) => {
                        console.error(err)
                    })
                }, 6000);
            }
            
     }
    }
},
onHide(){
clearInterval(setinad);
},
    onShareAppMessage: function () {
        var that = this;
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
        return {
            title: that.data.shares.share_title,
            imageUrl: that.data.shares.share_image,
        }
    },
    //转发朋友圈
    onShareTimeline: function () {
        var that = this;
        return {
            title: that.data.shares.share_title,
            imageUrl: that.data.shares.share_image,
        }
    },
    // 收藏
    onAddToFavorites:function(){
        var that = this;
        return {
            title: that.data.shares.share_title,
            imageUrl: that.data.shares.share_image,
        }
    },


    copy: function (e) {
        let text = e.currentTarget.dataset.text;
        wx.setClipboardData({
            data: text,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        wx.showToast({
                            title: '微信号已复制',
                        });
                    }
                })
            }
        })
    },

    tipClick: function () {
        wx.showToast({
            icon: 'none',
            title: '酱茄小程序开源版 v1.1.8',
        })
    }
})