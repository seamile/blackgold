var t = {
    get: function(t, e, o) {
        e || (e = {}), e.session_id = wx.getStorageSync("session_id"), wx.request({
            url: t,
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(t) {
                console.log(t), 200 == t.statusCode ? o.success(t.data) : wx.showToast({
                    title: t.statusCode
                });
            },
            fail: function(t) {
                o.fail(t);
            },
            complete: function(t) {
                o.complete(t);
            }
        });
    },
    post: function(t, e, o) {
        wx.showLoading({
            title: "请稍等..."
        }), e || (e = {}), e.session_id = wx.getStorageSync("session_id"), console.log("params", e), 
        wx.request({
            url: t,
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t), 200 == t.statusCode ? (o.success(t.data), wx.showToast({
                    title: "转换成功，可以直接复制",
                    icon: "none"
                })) : wx.showToast({
                    title: t.statusCode
                });
            },
            fail: function(t) {
                o.fail(t), wx.hideLoading();
            },
            complete: function(t) {
                o.complete(t);
            }
        });
    }
};

module.exports = t;