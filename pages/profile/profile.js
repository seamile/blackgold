import t from "../../utils/1.js";
var e = t(require("../../utils/2.js"));
var n = t(require("../../utils/3.js"));
import { request } from "../../utils/4.js";

Page({
  data: {
    TabCur: 1,
    categoryList: [],
    photos: [],
    nextStart: 0
  },

  navigateBack: function () {
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
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

  onLoad: function () {
    var e = this;
    this.getCategory().then(function (t) {
      var n = t.categoryList;
      e.setData({
        categoryList: n
      });
    }).catch(function (t) {
      console.error(t);
    }), this.prepareData();
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.setData({
      nextStart: 0
    }), this.prepareData();
  },
  onReachBottom: function () {
    var t = this, e = this.data.TabCur, n = this.data.nextStart;
    this.getPhotos(e, n).then(function (e) {
      t.setData({
        nextStart: e.nextStart,
        photos: t.data.photos.concat(e.list)
      });
    }).catch(function (t) {
      console.error(t);
    });
  },
  prepareData: function () {
    var t = this, e = this.data.TabCur, n = this.data.nextStart;
    this.getPhotos(e, n).then(function (e) {
      console.log(e.list), t.setData({
        nextStart: e.nextStart,
        photos: e.list
      }), wx.stopPullDownRefresh();
    }).catch(function (t) {
      console.error(t), wx.stopPullDownRefresh();
    });
  },
  getCategory: function () {
    var t = (0, n.default)(e.default.mark(function t() {
      return e.default.wrap(function (t) {
        for (; ;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, new Promise(function (t, e) {
              request("https://spare.maibaapp.com/bbs/newUgc/category/list/0").then(function (n) {
                200 == n.statusCode && "request:ok" == n.errMsg && 0 == n.data.code && "success" == n.data.msg ? t(n.data.data) : e("获取分类失败");
              }).catch(function () {
                e("获取分类失败");
              });
            });

          case 2:
            return t.abrupt("return", t.sent);

          case 3:
          case "end":
            return t.stop();
        }
      }, t);
    }));
    return function () {
      return t.apply(this, arguments);
    };
  }(),
  getPhotos: function () {
    var t = (0, n.default)(e.default.mark(function t(n, r) {
      return e.default.wrap(function (t) {
        for (; ;) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, new Promise(function (t, e) {
              request("https://spare.maibaapp.com/bbs/newUgc/category/info/0/" + n + "/" + r + "/" + (r + 17)).then(function (n) {
                200 == n.statusCode && "request:ok" == n.errMsg && 0 == n.data.code && "success" == n.data.msg ? t(n.data.data) : e("获取图片列表失败");
              }).catch(function () {
                e("获取图片列表失败");
              });
            });

          case 2:
            return t.abrupt("return", t.sent);

          case 3:
          case "end":
            return t.stop();
        }
      }, t);
    }));
    return function () {
      return t.apply(this, arguments);
    };
  }(),
  tabSelect: function (t) {
    var e = t.currentTarget.dataset.cid;
    this.setData({
      TabCur: e,
      nextStart: 0
    }), this.prepareData();
  },
  info: function (t) {
    var e = t.currentTarget.dataset.src;
    wx.navigateTo({
      url: "../photo/photo?src=" + e,
      success: function () { },
      fail: function () { },
      complete: function () { }
    });
  },
  onShareAppMessage: function () {
    return "" != this.data.src ? {
      title: "快来看看这张精美头像吧~",
      path: "/pages/photo/photo?src=" + this.data.src,
      imageUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/f482ecb3-40db-48f2-a75b-2292570117fd.png"
    } : "" != this.data.item ? {
      path: "/pages/photo/photo?item=" + JSON.stringify(this.data.item)
    } : void 0;
  }
});

wx.navigateBack({
  delta: 1,
  success: function () {
    setTimeout(function () {
      beforePage.openInsertAD();
    }, 100);
  }
});

