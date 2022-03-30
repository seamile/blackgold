require("./server/data.js"), getApp();

var t = "";

Page({
    data: {},
    fuzhi: function(t) {
        var e = this.data.result;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功"
                }), wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    iosCopyEvent: function(t) {
        this.setData({
            result: "",
            textareaValue: ""
        }), this.fuzhi();
    },
    AndroidCopyEvent: function(t) {
        this.setData({
            result: " ",
            textareaValue: ""
        }), this.fuzhi();
    },
    onShow: function(e) {

    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: "送你微信昵称的各种玩法",
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