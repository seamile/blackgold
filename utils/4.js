export function alert(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return new Promise(function (n, s) {
    wx.showToast(Object.assign({
      title: e,
      success: n,
      fail: s
    }, t));
  });
}

export function request(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return new Promise(function (n, s) {
    wx.request(Object.assign({}, t, {
      url: e,
      success: function (e) {
        n(e);
      },
      fail: function () {
        s(new Error("微信接口调用失败"));
      }
    }));
  });
}

export function setStorage(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return new Promise(function (s, o) {
    wx.setStorage(Object.assign({}, n, {
      key: e,
      data: t,
      success: function () {
        s(!0);
      },
      fail: function () {
        o(new Error("微信接口调用失败"));
      }
    }));
  });
}

export function getSystemInfo() {
  return new Promise(function (e, t) {
    wx.getSystemInfo({
      success: function (t) {
        e(t);
      },
      fail: t
    });
  });
}

export function getSystemInfoSync() {
  return wx.getSystemInfoSync();
}