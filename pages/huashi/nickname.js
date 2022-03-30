var t = require("./utils/nick.js"),
    a = getApp(),
    e = "";

Page({
    onShareAppMessage: function (t) {
        return {
            title: "送你微信昵称的各种玩法",
            path: "/pages/index/index",
            success: function (t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function (t) {
                wx.showToast({
                    title: "分享失败",
                    icon: "loading",
                    duration: 2e3
                });
            }
        };
    },
    data: {
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "效果展示",
        newValue: [],
        nickdata: []
    },
    onLoad: function () {
        this.setData({
            nickdata: t
        });
    },
    onShow: function () {

    },
    bindKeyInput: function (t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    clearInput: function () {
        this.data.current = null, this.setData({
            scrollTop: 0,
            inputVal: "",
            textareaValue: "效果展示",
            inputShowed: !1
        });
    },
    changeText: function (t) {
        var e = this;
        var n = t.target.id.replace(/昵称/, e.data.current);
        e.setData({
            textareaValue: n
        }), e.textCopy();

    },
    textCopy: function () {
        "效果展示" != this.data.textareaValue ? wx.setClipboardData({
            data: this.data.textareaValue,
            success: function (t) {
                wx.getClipboardData({
                    success: function (t) {
                        console.log(t.data), t.data, wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "还没有输入昵称",
            icon: "none",
            duration: 800
        });
    }
});