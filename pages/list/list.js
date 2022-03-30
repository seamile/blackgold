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
const util = require('../../utils/util.js');
let setinad;
Page({

    data: {
        posts: [],
        loadding: false,
        pullUpOn: true,
        loaded: false,
        pagead:3
    },

    tag_id: undefined,
    cat_id: undefined,
    search: undefined,
    track: undefined,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        if (options.cat_id) { //分类
            wx.setNavigationBarTitle({
                title: options.title,
            });

            this.cat_id = options.cat_id;
        } else if (options.tag_id) { //标签
            wx.setNavigationBarTitle({
                title: options.title,
            });

            this.tag_id = options.tag_id;
        } else if (options.search) { //搜索
            wx.setNavigationBarTitle({
                title: '搜索【' + options.search + '】',
            });

            this.search = options.search;
        } else if (options.track) { //我的足迹
            let title = '我的浏览';
            if (options.track == 'likes') {
                title = '我的点赞';
            } else if (options.track == 'favorites') {
                title = '我的收藏';
            } else if (options.track == 'comments') {
                title = '我的评论';
            }
            wx.setNavigationBarTitle({
                title: title,
            });
            this.track = options.track;
        } else { //最新
            wx.setNavigationBarTitle({
                title: '最新文章',
            });
        }
        var that= this;
        util.getshare(that);
    },



    onPullDownRefresh: function () {

    },

    onReachBottom: function () {
        if (!this.data.pullUpOn) {
            return;
        }

        this.loadPost(false);
    },

    onShow(){
        var that = this;
        util.getAD(that,function(){
            that.setInterstitialAd(); //加载插屏广告
        })
        this.loadPost(true);
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

    handlerArticleClick: function (e) {
        let post_id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/bzarticle/bzarticle?post_id=' + post_id
        })
    },

    loadPost: function (refresh) {
        let that = this;

        that.setData({
            loadding: true
        });

        let offset = 0;
        if (!refresh) {
            offset = that.data.posts.length;
        }

        let url = '';
        let params = {
            offset: offset
        };

        if (that.cat_id !== undefined) {
            url = Api.JIANGQIE_POSTS_CATEGORY;
            params.cat_id = that.cat_id;
        } else if (that.tag_id !== undefined) {
            url = Api.JIANGQIE_POSTS_TAG;
            params.tag_id = that.tag_id;
        } else if (that.search !== undefined) {
            url = Api.JIANGQIE_POSTS_SEARCH;
            params.search = that.search;
        } else if (that.track !== undefined) {
            url = Api.JIANGQIE_POSTS_MY;
            params.track = that.track;
        } else {
            url = Api.JIANGQIE_POSTS_LAST;
        }

        Rest.get(url, params).then(res => {
            that.setData({
                loaded: true,
                loadding: false,
                posts: refresh ? res.data : that.data.posts.concat(res.data),
                pullUpOn: res.data.length == Constants.JQ_PER_PAGE_COUNT
            });
        })
    },

    handlerLoginCancelClick: function (e) {
        this.setData({
            showPopLogin: false
        });
        Util.navigateBack();
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