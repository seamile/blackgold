function t(t) {
    return [ t.getFullYear(), t.getMonth() + 1, t.getDate() ].map(a).join("");
}

function a(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function e() {
    var t = wx.getStorageSync(w);
    return console.log("已用" + t), t;
}

function o() {
    wx.setStorage({
        key: w,
        data: 0
    });
}

function n() {
    return wx.getStorageSync("VIP");
}

function i(t) {
    wx.setStorage({
        key: "VIP",
        data: t
    });
}

var d = "a76e8f5ee36e2233", c = "305420", r = "Config", s = "cKPWEEEN", u = require("./Bmob-2.2.5.min.js"), g = getApp(), w = "usedTime";

module.exports = {
    getConfig: function(t) {
        wx.showLoading({
            title: "加载中..."
        }), g.globalData.objectId ? t() : (u.initialize(d, c), u.Query(r).get(s).then(function(a) {
            console.log(a), g.globalData.objectId = a.objectId, g.globalData.isShenHe = a.isShenHe, 
            g.globalData.COUNT = a.count, t();
        }).catch(function(t) {
            console.log(t);
        }));
    },
    getSearchVideo: function(t, a, e, o) {
        wx.request({
            url: "https://search.hyhuo.com/so/tag",
            method: "POST",
            data: {
                keyword: t,
                search_type: 3,
                sort: "hot",
                page: a
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), t.data && t.data.data ? e(t.data.data.data_list) : o(t.data.errMsg);
            },
            fail: function(t) {
                wx.hideLoading(), o(0);
            }
        });
    },
    getSearchImg: function(t, a, e, o) {
        wx.request({
            url: "https://search.hyhuo.com/search/image_tag",
            method: "POST",
            data: {
                keyword: t,
                sort: "hot",
                page: a
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), t.data && t.data.data ? e(t.data.data.data_list) : o(t.data.errMsg);
            },
            fail: function(t) {
                wx.hideLoading(), o(0);
            }
        });
    },
    getHeadCategory: function(t, a) {
        wx.request({
            url: "https://spare.maibaapp.com/bbs/newUgc/category/list/0",
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), e.data && e.data.data ? t(e.data.data.categoryList) : a("");
            },
            fail: function(t) {
                wx.hideLoading(), a(0);
            }
        });
    },
    getHead: function(t, a, e, o, n) {
        wx.request({
            url: "https://spare.maibaapp.com/bbs/newUgc/category/info/0/" + t + "/" + a + "/" + e,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), t.data && t.data.data ? o(t.data.data.list) : n("");
            },
            fail: function(t) {
                wx.hideLoading(), n(0);
            }
        });
    },
    getSetCategory: function(t, a) {
        wx.request({
            url: "https://spare.maibaapp.com/bbs/newUgc/category/list/2",
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), e.data && e.data.data ? t(e.data.data.categoryList) : a("");
            },
            fail: function(t) {
                wx.hideLoading(), a(0);
            }
        });
    },
    getSet: function(t, a, e, o, n) {
        wx.request({
            url: "https://spare.maibaapp.com/bbs/newUgc/category/info/2/" + t + "/" + a + "/" + e,
            method: "GET",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), t.data && t.data.data ? o(t.data.data.list) : n("");
            },
            fail: function(t) {
                wx.hideLoading(), n(0);
            }
        });
    },
    refreshUsedTimeAndDate: function() {
        wx.getStorage({
            key: "date",
            success: function(a) {
                a.data != t(new Date()) && (wx.setStorage({
                    key: "date",
                    data: t(new Date())
                }), o(), i(!1));
            },
            fail: function(a) {
                wx.setStorage({
                    key: "date",
                    data: t(new Date())
                }), o(), i(!1);
            }
        });
    },
    addUsedTime: function() {
        var t = e();
        t += 1, wx.setStorage({
            key: w,
            data: t
        });
    },
    canUse: function(t) {
        return !(!n() && e() >= g.globalData.COUNT && (wx.showModal({
            title: "",
            content: "今日赠送下载次数已用完，观看一小段广告解锁今日无限次下载",
            confirmText: "观看",
            confirmColor: "red",
            success: function(a) {
                a.confirm && t();
            }
        }), 1));
    },
    setVIP: i,
    getIsVIP: n
};