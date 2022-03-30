Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    set: function(e, r) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20;
        if (!r || !e) return !1;
        t = t || 3600;
        var a = {
            value: r,
            expire: new Date().getTime() + 864e5 * t
        };
        wx.setStorageSync(e, a);
    },
    get: function(r) {
        var t = wx.getStorageSync(r || "");
        if (!t) return "";
        var a = new Date().getTime();
        return !t.expire || t.expire < a ? (e.clear(r), "") : t.value;
    },
    clear: function(e) {
        wx.removeStorageSync(e);
    }
};

exports.default = e;