function t(t) {
  return [t.getFullYear(), t.getMonth() + 1, t.getDate()].map(a).join("");
}

function a(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}

function e() {
  var t = wx.getStorageSync(w);
  return console.log("已用" + t), t;
}

function o() {
  wx.setStorage({
    key: w,
    data: 0
  });
}

function n() {
  return wx.getStorageSync("VIP");
}

function i(t) {
  wx.setStorage({
    key: "VIP",
    data: t
  });
}

var g = getApp();
var w = "usedTime";

export function getSearchVideo(keyword, page, e, o) {
  wx.request({
    url: "https://search.hyhuo.com/so/tag",
    method: "POST",
    data: {
      keyword: keyword,
      search_type: 3,
      sort: "hot",
      page: page
    },
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      wx.hideLoading(), res.data && res.data.data ? e(res.data.data.data_list) : o(res.data.errMsg);
    },
    fail: function (_res) {
      wx.hideLoading(), o(0);
    }
  });
}
export function getSearchImg(t, a, e, o) {
  wx.request({
    url: "https://search.hyhuo.com/search/image_tag",
    method: "POST",
    data: {
      keyword: t,
      sort: "hot",
      page: a
    },
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (t) {
      wx.hideLoading(), t.data && t.data.data ? e(t.data.data.data_list) : o(t.data.errMsg);
    },
    fail: function () {
      wx.hideLoading(), o(0);
    }
  });
}
export function getHeadCategory(t, a) {
  wx.request({
    url: "https://spare.maibaapp.com/bbs/newUgc/category/list/0",
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (e) {
      wx.hideLoading(), e.data && e.data.data ? t(e.data.data.categoryList) : a("");
    },
    fail: function () {
      wx.hideLoading(), a(0);
    }
  });
}
export function getHead(t, a, e, o, n) {
  wx.request({
    url: "https://spare.maibaapp.com/bbs/newUgc/category/info/0/" + t + "/" + a + "/" + e,
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (t) {
      wx.hideLoading(), t.data && t.data.data ? o(t.data.data.list) : n("");
    },
    fail: function () {
      wx.hideLoading(), n(0);
    }
  });
}
export function getSetCategory(t, a) {
  wx.request({
    url: "https://spare.maibaapp.com/bbs/newUgc/category/list/2",
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (e) {
      wx.hideLoading(), e.data && e.data.data ? t(e.data.data.categoryList) : a("");
    },
    fail: function () {
      wx.hideLoading(), a(0);
    }
  });
}
export function getSet(t, a, e, o, n) {
  wx.request({
    url: "https://spare.maibaapp.com/bbs/newUgc/category/info/2/" + t + "/" + a + "/" + e,
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (t) {
      wx.hideLoading(), t.data && t.data.data ? o(t.data.data.list) : n("");
    },
    fail: function () {
      wx.hideLoading(), n(0);
    }
  });
}


export const setVIP = i;
export const getIsVIP = n;