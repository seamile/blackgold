var e, t = require("../../utils/api1");

Page({
    data: {
        keyword: "",
        videos: [],
        scrollTop: 0
    },
    onLoad: function(e) {},
    search: function() {
        if (this.data.keyword) {
            var a = this;
            t.getSearchVideo(this.data.keyword, e, function(t) {
                console.log(t);
                var i = a.data.videos;
                if (1 == e) {
                    if (0 == t.length) return void wx.showToast({
                        title: "暂无结果",
                        icon: "error"
                    });
                    i = [], a.setData({
                        videos: i,
                        scrollTop: 0
                    });
                }
                for (var o = 0; o < t.length; o++) "1" != t[o].is_ads && i.push(t[o]);
                a.setData({
                    videos: i
                });
            }, function(e) {});
        }
    },
    preview: function(e) {
        var t = e.currentTarget.dataset.item.video_preview_url, a = e.currentTarget.dataset.item.thumb_img;
        wx.navigateTo({
            url: "../../pages/dynamicdetail/dynamicdetail?url=" + encodeURIComponent(t) + "&imgSrc=" + encodeURIComponent(a)
        });
    },
    onScrollToLower: function(t) {
        e += 1, this.search();
    },
    handleConfirm: function(t) {
        this.setData({
            keyword: t.detail.value
        }), this.data.keyword && (wx.showLoading({
            title: "搜索中..."
        }), e = 1, this.search());
    },
    onShareAppMessage: function() {
        return {
            title: "海量高清手机壁纸，动态壁纸，情侣头像",
            path: "pages/dynamic/dynamic"
        };
    }
});