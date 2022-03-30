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
        toolsall1: [ {
            title: "重要通知",
            des: "必看！必看！必看！点击查看通知。",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/128bdfab-1405-42a7-9978-8e113bde7df6.jpg",
            url: "/pages/gongzh/gongzh"
        }, {
            title: "外卖红包",
            des: "外卖超省钱,领红包点外卖,一年省一辆车",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8a658141-835c-44a6-b381-16447788b37d.jpg",
            url: "/pages/waimai/index"
        }, {
            title: "红包封面",
            des: "超多免费红包封面，让你换个不停，快来试试~",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/c43ff92f-7ee2-4a95-8f9d-1f02f0cafd7e.jpg",
            url: "/pages/cover/index"
        }, {
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
        }, {
            title: "头像挂件",
            des: "冬奥会，冰墩墩，节日头像挂件制作",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8031f133-fe23-439d-8f8d-f0a0c9e655c2.jpg",
            url: "/pages/avatar/index"
        }, {
            title: "色卡推荐",
            des: "一组小清新的色卡参考，程序员专用~",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/3392f994-f709-4602-8d72-1a801c2a5aaa.jpg",
            url: "/pages/seka/index"
        }, {
            title: "搭建同款小程序",
            des: "点击这个模块可以查看详情~感兴趣的老板看看",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/6fd3aaf1-b532-4ace-8ad6-f3062fb0de05.jpg",
            url: "/pages/goumai/goumai"
        } ],
        toolsall: [ {
            title: "外卖红包",
            des: "外卖超省钱,领红包点外卖,一年剩一辆车",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8a658141-835c-44a6-b381-16447788b37d.jpg",
            url: "/pages/waimai/index"
        }, {
            title: "趣味测试题",
            des: "趣味测试，爱情测试，缘分测试，性格测试等~",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/dd9ef7ab-b619-4cb1-af99-74c586c06726.jpg",
            url: "/pages/index1/index"
        }, {
            title: "亲戚计算器",
            des: "最全面的中国亲戚关系计算器，逢年过节",
            src: "https://img.zcool.cn/community/01e0e960bedb7911013eaf7026a55e.jpg@520w_390h_1c_1e_2o_100sh.jpg",
            url: "/pages/qinqi/index"
        }, {
            title: "花式昵称",
            des: "各类微信炫酷，透明昵称全面升级",
            src: "https://img.zcool.cn/community/01853a60bc736011013eaf70ddb4ff.jpg@520w_390h_1c_1e_2o_100sh.jpg",
            url: "/pages/huashi/index"
        }, {
            title: "程序员黄历",
            des: "敲代码测试修复提交之前求一签！",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/5c77d39f-bf48-4fca-b662-9cf00a41d67e.jpg",
            url: "/pages/chengxuyuan/index"
        }, {
            title: "免费QQ名片赞",
            des: "每天免费获取1000+QQ名片赞！！！",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/6fd3aaf1-b532-4ace-8ad6-f3062fb0de05.jpg",
            url: "/pages/lingzan/index"
        }, {
            title: "尺子套餐",
            des: "提供直尺，量角器小工具，学霸必备！",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/d5675218-aab8-4881-bbe7-405ff49f0cc3.jpg",
            url: "/pages/chizi/index"
        }, {
            title: "指尖光环",
            des: "超火的聚会喝酒神器，指尖光环",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/cf83518c-cf48-4f64-b17a-4ab8bd60468d.jpg",
            url: "/pages/zhijian/index"
        }, {
            title: "BMI体重指数",
            des: "计算您的体脂率，帮助您检测身体状况",
            src: "https://img.zcool.cn/community/01da0660bd9fe111013eaf70b1be76.jpg@520w_390h_1c_1e_2o_100sh.jpg",
            url: "/pages/bmi/index"
        }, {
            title: "房贷计算器",
            des: "最专业的免费房贷税费计算神器！",
            src: "https://img.zcool.cn/community/0187f560bef1c211013eaf70bcc9c1.jpg@520w_390h_1c_1e_2o_100sh.jpg",
            url: "/pages/fangdai/index"
        }, {
            title: "色卡推荐",
            des: "一组小清新的色卡参考",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/3392f994-f709-4602-8d72-1a801c2a5aaa.jpg",
            url: "/pages/seka/index"
        }, {
            title: "金额大写转换",
            des: "金额转大写工具",
            src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/5a42b4bd-6f5b-444b-93f1-2ff0b9528a87.jpg",
            url: "/pages/upcasing/index"
        } ]
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