var o = require("config.js"), n = require("request.js"), e = {
    login: o.server_url + "/login/login",
    checkLogin: o.server_url + "/login/check_login"
}, s = {
    code: "",
    login: function(o, n) {
        var e, c, i;
        e = wx.getStorageSync("session_id"), c = wx.getStorageSync("user_info"), i = wx.getStorageSync("is_login"), 
        s.checkLogin(o, e, function(o) {
            console.log("loginEnable = " + o), o ? e && c && 1 == i ? (console.log("is_login = 1"), 
            console.log(c), "function" == typeof n && n(c)) : (console.log("is_login = 0"), 
            wx.login({
                success: function(o) {
                    s.code = o.code, s.getUserInfo(function(o) {
                        s.userLogin(o, n);
                    });
                },
                fail: function() {}
            })) : (console.log("is_login = 0"), wx.login({
                success: function(o) {
                    s.code = o.code, s.getUserInfo(function(o) {
                        s.userLogin(o, n);
                    });
                },
                fail: function() {
                    console.log("wxLogin fail");
                }
            }));
        });
    },
    getUserInfo: function(o) {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(n) {
                console.log("getUserInfo success = "), console.log(n), "function" == typeof o && o(n);
            },
            fail: function(n) {
                console.log("getUserInfo fail = "), console.log(n), wx.showModal({
                    content: "检测到您没打用户信息权限,是否去设置打开?",
                    success: function(n) {
                        n.confirm && wx.openSetting({
                            success: function(n) {
                                console.log(n), n.authSetting["scope.userInfo"] && s.getUserInfo(o);
                            }
                        });
                    }
                });
            },
            complete: function(o) {}
        });
    },
    openSetting: function() {
        wx.showModal({
            content: "检测到您没打用户信息权限,是否去设置打开?",
            success: function(o) {
                o.confirm && wx.openSetting({
                    success: function(o) {
                        console.log(o), o.authSetting["scope.userInfo"] && s.getUserInfo(function(o) {});
                    }
                });
            }
        });
    },
    userLogin: function(o, c) {
        n.post(e.login, {
            code: s.code,
            encryptedData: o.encryptedData,
            iv: o.iv,
            rawData: o.rawData,
            signature: o.signature
        }, {
            success: function(o) {
                if ("string" == typeof o && "" != o) n = JSON.parse(o.trim()); else var n = o;
                0 == n.error ? (wx.setStorageSync("session_id", n.session_id), wx.setStorageSync("user_info", n.user_info), 
                wx.setStorageSync("is_login", 1), c(n.user_info), console.log("save userinfo success")) : console.log("save userinfo error");
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    checkLogin: function(o, s, c) {
        o ? s ? n.post(e.checkLogin, {}, {
            success: function(o) {
                c(0 == o.error);
            },
            fail: function(o) {
                c(!1);
            },
            complete: function(o) {}
        }) : c(!1) : c(!0);
    }
};

module.exports = s;