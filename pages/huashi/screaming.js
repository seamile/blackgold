var t = getApp(), e = wx.createCanvasContext("myCanvas"), o = "";

Page({
    data: {
        ldata: !0,
        fontSize: [ {
            name: "equal",
            value: "同等"
        }, {
            name: "gradually",
            value: "渐大",
            checked: "true"
        } ],
        canvasImg: "",
        isShowMask: !1,
        isBack: !1,
        isShowSave: !1,
        bColors: [ {
            color: "black",
            title: "黑色"
        }, {
            color: "red",
            title: "红色"
        }, {
            color: "yellow",
            title: "黄色"
        }, {
            color: "blue",
            title: "蓝色"
        }, {
            color: "green",
            title: "绿色"
        }, {
            color: "white",
            title: "白色",
            checked: !0
        } ],
        fontColors: [ {
            color: "black",
            title: "黑色",
            checked: !0
        }, {
            color: "red",
            title: "红色"
        }, {
            color: "yellow",
            title: "黄色"
        }, {
            color: "blue",
            title: "蓝色"
        }, {
            color: "green",
            title: "绿色"
        }, {
            color: "white",
            title: "白色"
        } ],
        fontInfo: {
            fontSize: "gradually",
            background: {
                color: "white",
                title: "白色"
            },
            fontColor: {
                color: "black",
                title: "黑色"
            }
        },
        content: ""
    },
    onLoad: function(t) {
        var e = 1;
        this.rnd(2, 10, function(t) {
            e = t;
        });
    },
    onShow: function() {

    },
    radioChange: function(t) {
        for (var e = t.detail.value, o = this.data.fontSize, a = 0, n = o.length; a < n; a++) if (o[a].name == e) {
            o[a].checked = !0;
            var i = o[a].name;
        } else o[a].checked = !1;
        this.setData({
            fontSize: o,
            "fontInfo.fontSize": i
        });
    },
    showMask: function(t) {
        var e = "true" == t.currentTarget.dataset.isback, o = this.data.isShowMask;
        this.setData({
            isShowMask: !o,
            isBack: e
        });
    },
    changeColor: function(t) {
        for (var e = t.currentTarget.dataset.colortype, o = t.currentTarget.dataset.index, a = this.data.isShowMask, n = "bColors" == e ? this.data.bColors : this.data.fontColors, i = 0, s = n.length; i < s; i++) n[i].checked = i == o;
        "bColors" == e ? (this.setData({
            bColors: n,
            isShowMask: !a,
            "fontInfo.background": n[o]
        }), this.transformImg()) : (this.setData({
            fontColors: n,
            isShowMask: !a,
            "fontInfo.fontColor": n[o]
        }), this.transformImg());
    },
    textInput: function(t) {
        var e = t.detail.value;
        this.setData({
            content: e
        });
    },
    transformImg: function(s) {
        var o = this.data.content, a = this;
            for (var e = [], n = 0, i = o.length; n < i; n++) e.push(o.charAt(n));
            a.drawImg(e);
    },
    drawImg: function(t) {
        var o = this.data.fontInfo, a = o.fontSize;
        if (e.clearRect(0, 0, 525, 290), e.setFillStyle(o.background.color), e.fillRect(0, 0, 525, 290), 
        e.draw(), e.setTextAlign("left"), e.setTextBaseline("top"), e.setFillStyle(o.fontColor.color), 
        "gradually" == a) for (var n = 0, i = t.length; n < i; n++) s = n * (2 * n + 18), 
        e.setFontSize(4 * n + 18), e.fillText(t[n], s, 29.5), e.fillText(t[n], s - .5, 30); else if ("equal" == a) for (var n = 0, i = t.length; n < i; n++) {
            var s = 37 * n;
            e.setFontSize(37), e.fillText(t[n], s, 45);
        }
        e.draw(!0);
        var l = this;
        setTimeout(function() {
            l.saveImg();
        }, 200);
    },
    saveImg: function() {
        var t = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "myCanvas",
            success: function(e) {
                t.setData({
                    canvasImg: e.tempFilePath
                });
            }
        });
    },
    downimg: function() {
        if ("" != this.data.content) {
            var t = this;
            wx.getSetting({
                success: function(e) {
                    console.log(e), e.authSetting["scope.writePhotosAlbum"] ? t.saveToPhone() : wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function() {
                            t.saveToPhone();
                        },
                        fail: function(e) {
                            t.setData({
                                ldata: !1
                            });
                        }
                    });
                }
            });
        } else wx.showToast({
            title: "请输入内容"
        });
    },
    saveToPhone: function(t) {
        wx.showLoading({
            title: "正在保存..."
        });
        var e = this.data.canvasImg;
        wx.saveImageToPhotosAlbum({
            filePath: e,
            success: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "保存成功"
                });
            }
        });
    },
    clearContent: function() {
        this.setData({
            content: ""
        });
    },
    shoucang: function() {},
    hotJumpPageID: function(t) {
        console.log(t);
        var e = t.detail.formId;
        "" != t.detail.formId && a.formAdd(e, function(t) {});
    },
    rnd: function(t, e, o) {
        var a = Math.floor(Math.random() * (e - t + 1) + t);
        return o(a), a;
    },
    back: function() {
        getCurrentPages().length > 1 ? wx.navigateBack({}) : wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    handler: function(t) {
        var e = this;
        t.detail.authSetting["scope.writePhotosAlbum"] ? e.setData({
            ldata: !0
        }) : e.setData({
            ldata: !1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "一键生成尖叫字体",
            imageUrl: "",
            path: "/pages/screaming/screaming",
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success"
                });
            }
        };
    }
});