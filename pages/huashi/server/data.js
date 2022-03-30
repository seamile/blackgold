var o = require("config.js"), n = require("request.js"), u = {
    num: o.server_url + "/tool/num",
    del: o.server_url + "/tool/del",
    abc: o.server_url + "/tool/abc",
    line: o.server_url + "/tool/line",
    wing: o.server_url + "/tool/wing",
    mohu: o.server_url + "/tool/mohu",
    blue: o.server_url + "/tool/blue",
    blank: o.server_url + "/tool/blank"
}, c = {
    blank1: function(o, c) {
        n.post(u.blank, {
            word: o,
            go1: "安卓转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    blank2: function(o, c) {
        n.post(u.blank, {
            word: o,
            go: "苹果转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    blue: function(o, c) {
        n.post(u.blue, {
            word: o
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    mohu: function(o, c) {
        n.post(u.mohu, {
            word: o,
            go: "一键转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    wing: function(o, c) {
        n.post(u.wing, {
            word: o,
            go: "一键转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    line: function(o, c) {
        n.post(u.line, {
            word: o,
            go: "一键转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    abc: function(o, c) {
        n.post(u.abc, {
            word: o,
            go: "一键转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    del: function(o, c) {
        n.post(u.del, {
            word: o,
            go: "一键转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    num1: function(o, c) {
        n.post(u.num, {
            word: o,
            go: "上标转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    },
    num2: function(o, c) {
        n.post(u.num, {
            word: o,
            go1: "下标转换"
        }, {
            success: function(o) {
                o && c(o);
            },
            fail: function(o) {},
            complete: function(o) {}
        });
    }
};

module.exports = c;