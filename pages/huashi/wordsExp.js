var t = require("./utils/ywz.js"), a = require("./utils/zf.js"), e = require("./utils/bq.js"), i = (getApp(), 
"");

Page({
    data: {
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "点击下方内容输入，完成后点击：点我复制",
        newValue: [],
        activeIndex: 0,
        ywzdata: [],
        zfdata: [],
        bqdata: []
    },
    onLoad: function() {
        this.setData({
            ywzdata: t,
            zfdata: a,
            bqdata: e
        });
    },
    onShow: function() {

    },
    changeTab: function(t) {
        var a = t.target.dataset.index;
        this.setData({
            activeIndex: a
        });
    },
    swiperTab: function(t) {
        var a = t.detail.current;
        this.setData({
            activeIndex: a
        });
    },
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        }), console.log(this.data.current);
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            scrollTop: 0,
            inputVal: "",
            textareaValue: "点击下方内容输入，完成后点击：点我复制",
            inputShowed: !1
        });
    },
    addText: function(t) {
        if ("点击下方内容输入，完成后点击：点我复制" != this.data.textareaValue) {
            if (t.target.id) {
                var a = this.data.textareaValue + t.target.id;
                this.setData({
                    textareaValue: a
                });
            }
        } else if (t.target.id) {
            var e = t.target.id;
            this.setData({
                textareaValue: e
            });
        }
    },
    textCopy: function() {
        "点击下方内容输入，完成后点击：点我复制" != this.data.textareaValue ? (this.data.current = this.data.textareaValue, 
        wx.setClipboardData({
            data: this.data.current,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        })) : wx.showToast({
            title: "还没有输入内容",
            icon: "none",
            duration: 800
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "送你微信聊天的各种玩法",
            path: "/pages/index/index",
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "分享失败",
                    icon: "loading",
                    duration: 2e3
                });
            }
        };
    }
});