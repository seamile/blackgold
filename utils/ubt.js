function e() {
    return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
        var t = 16 * Math.random() | 0;
        return ("x" == e ? t : 3 & t | 8).toString(16);
    }).toUpperCase();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.UBT = exports.traceid = void 0, exports.guid = e;

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./flcache")), x = (exports.traceid = e(), wx.getSystemInfoSync()), n = function() {
    var x = void 0;
    return t.default.get("PUBLIC_CUID") || (x = e(), t.default.set("PUBLIC_CUID", x, 60), 
    x);
}(), o = t.default.get("wm_wx_openid"), r = function(e) {
    if (e) {
        var r = [ "client=weapp_wm", "cuid=" + n, "timestamp=" + Date.now().toString(), "spm=" + encodeURIComponent(e) ];
        /evttype\=.+/.test(arguments.length <= 1 ? void 0 : arguments[1]) ? r.push(arguments.length <= 1 ? void 0 : arguments[1]) : r.push("evttype=cd"), 
        o || (o = t.default.get("wm_wx_openid")), r.push("openid=" + o), r.push("sysinfo=" + JSON.stringify(x));
        var u = "https://ubt" + Math.round(9 * Math.random()) + ".fanli.com/index.html";
        u = u + "?" + r.join("&"), wx.request({
            url: u,
            header: {
                Accept: "text/html",
                "Content-Type": "text/html"
            }
        });
    }
};

r.expo = function(e) {
    r("common_baoguang." + (n || "[userid]") + "." + e, "evttype=exposure");
}, exports.UBT = r;