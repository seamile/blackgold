var t = null;
Page({
    data: {
        src: "",
        item: ""
    },

    navigateBack: function () {
        var self = this;
        var pages = getCurrentPages();
        if (pages.length == 1) {
          if (self.data.circleId && self.data.circleId >0) {
            wx.redirectTo({
              url: '../../circle/index/index?circleId=' + self.data.circleId
              + '&circleName=' + (self.data.circleName || '')
            });
          } else {
            wx.switchTab({
              url: "../../home/grouplist/grouplist"
            });
          }
        } else {
          wx.navigateBack({ changed: true });//返回上一页
        }
      },

    onLoad: function(n) {
        wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
            adUnitId: ""
        })).onError(function() {}), t.onClose(function(t) {
            t && t.isEnded;
        }));
        var o = n.src;
        if (null != o && this.setData({
            src: o
        }), null != n.item) {
            var c = JSON.parse(n.item);
            this.setData({
                item: c
            });
        }
        var that = this;
        wx.request({
          url: 'https://wag.qmniy.cn/api.php',
          data: {
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data);
            that.setData({
              gglist: res.data
            });
          }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    saveImg: function(n) {
        t && t.show().catch(function() {
            t.load().then(function() {
                return t.show();
            }).catch(function() {
                console.log("激励视频 广告显示失败");
            });
        });
        var o = n.currentTarget.dataset.avatar;
        null != o && (o = o.replace("http", "https"));
        var c = n.currentTarget.dataset.card;
        null != c && (c = c.replace("http", "https"));  
        var e = n.currentTarget.dataset.src;
        null != e && (e = e.replace("http", "https")), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? (null != o && null != c && (wx.getImageInfo({
                    src: o,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.path,
                            success: function() {
                                wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    image: "",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function() {},
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                }), wx.getImageInfo({
                    src: c,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.path,
                            success: function() {
                                wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    image: "",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function() {},
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                })), null != e && wx.getImageInfo({
                    src: e,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.path,
                            success: function() {
                                wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    image: "",
                                    duration: 1e3,
                                    mask: !0,
                                    success: function() {},
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                })) : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        null != o && null != c && (wx.getImageInfo({
                            src: o,
                            success: function(t) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.path,
                                    success: function() {
                                        wx.showToast({
                                            title: "下载成功",
                                            icon: "success",
                                            image: "",
                                            duration: 1e3,
                                            mask: !0,
                                            success: function() {},
                                            fail: function() {},
                                            complete: function() {}
                                        });
                                    },
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        }), wx.getImageInfo({
                            src: c,
                            success: function(t) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.path,
                                    success: function() {
                                        wx.showToast({
                                            title: "下载成功",
                                            icon: "success",
                                            image: "",
                                            duration: 1e3,
                                            mask: !0,
                                            success: function() {},
                                            fail: function() {},
                                            complete: function() {}
                                        });
                                    },
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        })), null != e && wx.getImageInfo({
                            src: e,
                            success: function(t) {
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.path,
                                    success: function() {
                                        wx.showToast({
                                            title: "下载成功",
                                            icon: "success",
                                            image: "",
                                            duration: 1e3,
                                            mask: !0,
                                            success: function() {},
                                            fail: function() {},
                                            complete: function() {}
                                        });
                                    },
                                    fail: function() {},
                                    complete: function() {}
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        });
                    },
                    fail: function() {
                        wx.showModal({
                            title: "未授权",
                            content: "请授权",
                            showCancel: !0,
                            cancelText: "取消",
                            cancelColor: "",
                            confirmText: "确定",
                            confirmColor: "",
                            success: function() {},
                            fail: function() {},
                            complete: function() {}
                        });
                    }
                });
            }
        });
    },
    copy: function(t) {
        var n = t.currentTarget.dataset.content;
        wx.setClipboardData({
            data: n,
            success: function() {
                wx.showToast({
                    title: "复制完成",
                    icon: "success",
                    image: "",
                    duration: 1e3,
                    mask: !0,
                    success: function() {},
                    fail: function() {},
                    complete: function() {}
                });
            },
            fail: function() {},
            complete: function() {}
        });
    },
    onShareAppMessage: function() {
        return null != this.data.src && "" != this.data.src ? {
            title: "咚，好友发给你一张头像、请查收！",
            path: "pages/photo/photo?src=" + this.data.src + "&picId=" + this.data.picId + "&needcount=" + this.data.needcount,
            imageUrl: this.data.src
        } : {
            title: "咚，好友发给你一个套图、请查收！",
            path: "pages/photo/photo?item=" + JSON.stringify(this.data.item)
        };
    }
});