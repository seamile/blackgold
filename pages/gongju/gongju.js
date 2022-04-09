var e = require("../../utils/api"), t = null;

Page({
    data: {
        posts: [],
        page: 1,
        indicatorDots: !1,
        autoplay: !0,
        interval: 3e3,
        currentSwiper: 0,
        navBarHeight: wx.getSystemInfoSync().statusBarHeight,
        placeHolder: "输入你想知道的内容...",
        autoFocus: !1,
        inputEnable: !0,
        scrollable: !0,
        toolsall: [ {
            title: "动态壁纸",
            des: "每日精选，60帧超清，情侣等动态壁纸等你拿",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8abb7d10-c6db-41f7-8df7-27282a074249.jpg",
            url: "/pages/dynamic/dynamic"
        }, {
            title: "精美头像",
            des: "超多男头，女头，情侣头像，速来下载！",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/02a2dd1d-1299-4c44-9039-3ee899b4b02e.jpg",
            url: "/pages/profile/profile"
        }, {
            title: "精美套图",
            des: "昵称，签名，头像，背景图一键打包获取，",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/40f1fecb-b655-4adf-b145-2301286f3442.jpg",
            url: "/pages/gallery/gallery"
        }, {
            title: "花式昵称",
            des: "各类微信炫酷，透明昵称全面升级",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8ec31f85-8dc7-45d2-8937-8c54a758dd2b.jpg",
            url: "/pages/huashi/index"
        }]
    },
    onLoad: function() {
        var e = this;
        wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: "adunit-5809e52ca8e02862"
        })).onLoad(function() {}), t.onError(function(e) {}), t.onClose(function() {})),
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    isIphoneX: t.model.match(/iPhone X/gi)
                });
            }
        }), this.getSiteInfo(), this.getStickyPosts(), this.getCategories(), this.getAdvert(),
        this.getPostList();
    },
    onReady: function() {},
    gotoDetail: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onClear: function() {
        this.setData({
            searchKey: ""
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            posts: []
        }), this.getPostList();
    },
    onReachBottom: function() {
        this.data.isLastPage || this.getPostList({
            page: this.data.page
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.siteInfo.name,
            path: "/pages/index/index"
        };
    },

    onInput: function(e) {
        this.setData({
            searchKey: e.detail.value
        });
    },
    currentChange: function(e) {
        this.setData({
            currentSwiper: e.detail.current
        });
    },
    getStickyPosts: function() {
        var t = this;
        e.getStickyPosts().then(function(e) {
            t.setData({
                stickyPost: e
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    getCategories: function() {
        var t = this;
        e.getCategories().then(function(e) {
            t.setData({
                category: e
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    getPostList: function(t) {
        var a = this;
        e.getPostsList(t).then(function(e) {
            var t = {};
            e.length < 10 && a.setData({
                isLastPage: !0,
                loadtext: "到底啦",
                showloadmore: !1
            }), a.data.isBottom, t.posts = [].concat(a.data.posts, e), t.page = a.data.page + 1,
            a.setData(t), wx.stopPullDownRefresh();
        }).catch(function(e) {
            console.log(e), wx.stopPullDownRefresh();
        });
    },
    getAdvert: function() {
        var a = this;
        e.indexAdsense().then(function(e) {
            console.log(e), 200 === e.status && (a.setData({
                advert: e.data
            }), t && t.show().catch(function(e) {
                console.error(e);
            }));
        }).catch(function(e) {
            console.log(e);
        });
    },
    bindCateByID: function(e) {
        var t = e.currentTarget.id;
        wx.navigateTo({
            url: "/pages/list/list?id=" + t
        });
    },
    onClick: function(e) {
        e.currentTarget.id;
        wx.navigateTo({
            url: "/pages/gongzhong/index"
        });
    },
    bindCateList: function() {
        wx.switchTab({
            url: "/pages/category/category"
        });
    },
    bindDetail: function(e) {
        var t = e.currentTarget.id;
        wx.navigateTo({
            url: "/pages/detail/detail?id=" + t
        });
    },
    onConfirm: function(e) {
        var t = e.detail.value;
        wx.navigateTo({
            url: "/pages/list/list?s=" + t
        });
    }
});
