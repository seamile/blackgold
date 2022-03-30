Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = wx.getStorageSync("weapp_scene") || "1001", t = function(t) {
    return function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(r, s) {
            n.header || (n.header = {}), n.header = Object.assign(n.header, {
                scene: e
            }), n.success = function(e) {
                r.apply(e, [ e.data ]);
            }, n.fail = function(e) {
                s(e);
            }, t(n);
        });
    };
}, n = t(wx.request);

exports.default = t, exports.wxRequest = n;