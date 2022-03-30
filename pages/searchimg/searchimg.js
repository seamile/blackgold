var a, t = require("../../utils/api");

Page({
    data: {
        keyword: "",
        imgs: [],
        scrollTop: 0
    },
    onLoad: function(a) {},
    search: function() {
        if (this.data.keyword) {
            var e = this;
            t.getSearchImg(this.data.keyword, a, function(t) {
                console.log(t);
                var i = e.data.imgs;
                if (1 == a) {
                    if (0 == t.length) return void wx.showToast({
                        title: "暂无结果",
                        icon: "error"
                    });
                    i = [], e.setData({
                        imgs: i,
                        scrollTop: 0
                    });
                }
                for (var o = 0; o < t.length; o++) "1" != t[o].is_ads && i.push(t[o]);
                e.setData({
                    imgs: i
                });
            }, function(a) {});
        }
    },
    preview: function(a) {
        var t = this.data.imgs[a.currentTarget.dataset.index].image_group[0].img_url;
        console.log(t), wx.navigateTo({
            url: "../../pages/paperdetail/paperdetail?url=" + encodeURIComponent(t)
        });
    },
    onScrollToLower: function(t) {
        a += 1, this.search();
    },
    handleConfirm: function(t) {
        this.setData({
            keyword: t.detail.value
        }), this.data.keyword && (wx.showLoading({
            title: "搜索中..."
        }), a = 1, this.search());
    },
    onShareAppMessage: function() {
        return {
            title: "海量高清手机壁纸，动态壁纸，情侣头像",
            path: "pages/dynamic/dynamic"
        };
    }
});