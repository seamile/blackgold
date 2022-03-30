var o = getApp();
var  list = require('./list');
Page({
    data: {
        list: [],
        rgb_list: []
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {
        var n = this, t = o.globalData.key, a = list.list[t], i = a.rgb.split(",");
        n.setData({
            list: a,
            rgb_list: i
        });
        var e = a.en + " " + a.cn;
        wx.setNavigationBarTitle({
            title: e
        });
        var r = a.color, l = a.sixteen;
        l = l.replace(/(^\s*)|(\s*$)/g, ""), wx.setNavigationBarColor({
            frontColor: r,
            backgroundColor: l
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});