var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/flcache.js")), e = require("../../utils/login"), a = require("../../utils/ubt");

Page({
    data: {
        shareTitle: "",
        shareImg: "",
        token: "",
        isgoShare: !1
    },
    onLoad: function(t) {
        this.init(t), this.setData({
            token: t.token
        });
    },
    onShow: function() {
        var t = this;
        t.data.isgoShare && (t.ajaxFn({
            token: t.data.token
        }, "https://finder.fanli.com/wxwm/fission/addShareCard", function(t) {}), t.setData({
            isgoShare: !1
        }), wx.redirectTo({
            url: "/pages/orderFission/index?token=" + t.data.token
        }));
    },
    init: function(n) {
        var i = this;
        n.token && (wx.login({
            success: function(n) {
                var o = {};
                o.code = n.code, (0, e.flLoginRequest)({
                    data: o,
                    url: "https://finder.fanli.com/wxwm/fission/wxshareData"
                }).then(function(e) {
                    if (e.data.openid && t.default.set("wm_wx_openid", e.data.openid), 1 == e.status) {
                        var n = e.data;
                        i.setData({
                            shareTitle: n.title,
                            shareImg: n.img
                        }), (0, a.UBT)("page_name.h5.pty-pv~module-myhb~std-75215");
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "获取页面数据失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        }), i.ajaxFn({
            token: n.token
        }, "https://finder.fanli.com/wxwm/fission/hasShareCard", function(t) {
            1 == t.status && 1 == t.data.is_share && wx.redirectTo({
                url: "/pages/orderFission/index?token=" + i.data.token
            });
        }));
    },
    ajaxFn: function(t, a, n) {
        wx.login({
            success: function(i) {
                t.code = i.code, (0, e.flLoginRequest)({
                    data: t,
                    url: a
                }).then(function(t) {
                    n(t);
                });
            },
            fail: function() {}
        });
    },
    showToastOffline: function() {
        wx.showToast({
            title: "该活动已下线",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function(t) {
        return "button" == t.from ? (0, a.UBT)("page_name.h5.pty-share~module-myhb~std-75215") : (0, 
        a.UBT)("page_name.h5.pty-topshare~module-myhb~std-75215"), this.setData({
            isgoShare: !0
        }), {
            title: this.data.shareTitle,
            path: "/pages/orderFission/index?token=" + this.data.token,
            imageUrl: this.data.shareImg
        };
    }
});