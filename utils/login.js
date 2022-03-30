Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkLogin = exports.doFlLogin = exports.doWxLogin = exports.flLoginRequest = exports.doTtmOldLogin = exports.checkFanliLogin = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./flcache")), t = require("./promisify"), n = require("../configApi"), i = wx.getStorageSync("weapp_scene") || "1001", a = function() {
    return new Promise(function(e, t) {
        wx.getSetting({
            success: function(n) {
                var i = n.authSetting["scope.userInfo"];
                (i = !!i) ? wx.getUserInfo({
                    success: function(t) {
                        t.encryptedData, t.iv, e(t);
                    }
                }) : t();
            }
        });
    });
}, c = function(t, n, i, a) {
    if (!e.default.get("wm_wx_ticket") || 2 == t) return e.default.clear("wm_wx_ticket"), 
    e.default.clear("wm_fanli_ticket"), e.default.clear("wm_wx_openid"), new Promise(function(e, c) {
        wx.login({
            success: function(r) {
                if (r.code) {
                    var f = r.code;
                    if (1 == t) {
                        var u = n ? n.encryptedData : "", d = n ? n.iv : "";
                        o(f, u, d, i, a).then(function(t) {
                            e(t, d);
                        });
                    } else if (2 == t) {
                        var s = n.detail.encryptedData, l = n.detail.iv;
                        s && l && o(f, s, l, i, a).then(function(t) {
                            e(t, l);
                        });
                    }
                } else c();
            },
            fail: function(e) {}
        });
    });
}, o = function(i, a, c, o, r, f) {
    return new Promise(function(u, d) {
        var s = 1 == r ? {
            code: i,
            encrypted_data: a || "",
            iv: c || "",
            fanli_devid: o || "",
            type: f || ""
        } : {
            code: i,
            encrypted_data: a || "",
            iv: c || "",
            fanli_userid: o || "",
            type: f || ""
        };
        (0, t.wxRequest)({
            url: n.backfl.bindinfo,
            data: s,
            header: {
                scene: wx.getStorageSync("weapp_scene") || "1001"
            }
        }).then(function(t) {
            if (1 == t.status) {
                var n = t.data.wx_login_target, i = t.data.fanli_login_target, a = t.data.openid;
                n && e.default.set("wm_wx_ticket", n), i && e.default.set("wm_fanli_ticket", i), 
                a && e.default.set("wm_wx_openid", a), u(t.data);
            }
        });
    });
}, r = function(t) {
    return function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(a, c) {
            var o = e.default.get("wm_wx_ticket"), r = e.default.get("wm_fanli_ticket"), f = e.default.get("wm_fanli_ticket"), u = e.default.get("wm_wx_ticket");
            n.header || (n.header = {}), n.header = Object.assign(n.header, {
                wx_ticket: o,
                fanli_ticket: r,
                wx_login_target: u,
                fanli_login_target: f,
                scene: i
            }), n.success = function(e) {
                a.apply(e, [ e.data ]);
            }, n.fail = function(e) {
                c(e);
            }, t(n);
        });
    };
}, f = r(wx.request);

exports.default = r, exports.checkFanliLogin = function() {
    var t = e.default.get("wm_fanli_ticket");
    return new Promise(function(e, n) {
        t ? e() : n();
    });
}, exports.doTtmOldLogin = o, exports.flLoginRequest = f, exports.doWxLogin = c, 
exports.doFlLogin = function(i) {
    e.default.clear("wm_fanli_ticket");
    var a = e.default.get("wm_wx_ticket");
    return new Promise(function(c, o) {
        var r = i.encryptedData, f = i.iv;
        r && f ? (0, t.wxRequest)({
            url: n.bindPhone,
            data: {
                wx_ticket: a,
                encryptedData: r,
                iv: f
            },
            header: {
                scene: wx.getStorageSync("weapp_scene") || "1001"
            }
        }).then(function(t) {
            if (1 == t.status) {
                var n = t.data.wx_ticket, i = t.data.fanli_ticket;
                i ? (n && e.default.set("wm_wx_ticket", n), i && e.default.set("wm_fanli_ticket", i), 
                c(t.data)) : o(3);
            } else o(2);
        }) : o(1);
    });
}, exports.checkLogin = function(t, n) {
    var i = e.default.get("wm_wx_ticket"), o = e.default.get("wm_fanli_ticket");
    return e.default.get("wm_wx_openid"), new Promise(function(e, r) {
        i ? new Promise(function(e, t) {
            wx.checkSession({
                success: function() {
                    e();
                },
                fail: function() {
                    t();
                }
            });
        }).then(function() {
            o && e(i, o);
        }).catch(function() {
            a().then(function(i) {
                c(1, i, t || "", n).then(function(t, n) {
                    e(t, n);
                });
            }).catch(function() {
                c(1, "", t || "", n).then(function(t, n) {
                    e(t, n);
                });
            });
        }) : a().then(function(i) {
            c(1, i, t || "", n).then(function(t, n) {
                e(t, n);
            });
        }).catch(function() {
            c(1, "", t || "", n).then(function(t, n) {
                e(t, n);
            });
        });
    });
};