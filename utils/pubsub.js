function r(r) {
    var n;
    for (n in r) if (r.hasOwnProperty(n)) return !0;
    return !1;
}

function n(r, n, t) {
    try {
        r(n, t);
    } catch (r) {
        setTimeout(function(r) {
            return function() {
                throw r;
            };
        }(r), 0);
    }
}

function t(r, n, t) {
    r(n, t);
}

function e(r, e, i, o) {
    var u, f = s[e], c = o ? t : n;
    if (s.hasOwnProperty(e)) for (u in f) f.hasOwnProperty(u) && c(f[u], r, i);
}

function i(r, n, t) {
    return function() {
        var i = String(r), o = i.lastIndexOf(".");
        for (e(r, r, n, t); -1 !== o; ) o = (i = i.substr(0, o)).lastIndexOf("."), e(r, i, n, t);
    };
}

function o(n) {
    for (var t = String(n), e = Boolean(s.hasOwnProperty(t) && r(s[t])), i = t.lastIndexOf("."); !e && -1 !== i; ) i = (t = t.substr(0, i)).lastIndexOf("."), 
    e = Boolean(s.hasOwnProperty(t) && r(s[t]));
    return e;
}

function u(r, n, t, e) {
    var u = i(r, n, e);
    return !!o(r) && (!0 === t ? u() : setTimeout(u, 0), !0);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = {}, f = -1, c = {
    publish: function(r, n) {
        return u(r, n, !1, c.immediateExceptions);
    },
    publishSync: function(r, n) {
        return u(r, n, !0, c.immediateExceptions);
    },
    subscribe: function(r, n) {
        if ("function" != typeof n) return !1;
        s.hasOwnProperty(r) || (s[r] = {});
        var t = "uid_" + String(++f);
        return s[r][t] = n, t;
    },
    subscribeOnce: function(r, n) {
        var t = c.subscribe(r, function() {
            c.unsubscribe(t), n.apply(this, arguments);
        });
        return c;
    },
    clearAllSubscriptions: function() {
        s = {};
    },
    clearSubscriptions: function(r) {
        var n;
        for (n in s) s.hasOwnProperty(n) && 0 === n.indexOf(r) && delete s[n];
    },
    unsubscribe: function(r) {
        var n, t, e, i = "string" == typeof r && (s.hasOwnProperty(r) || function(r) {
            var n;
            for (n in s) if (s.hasOwnProperty(n) && 0 === n.indexOf(r)) return !0;
            return !1;
        }(r)), o = !i && "string" == typeof r, u = "function" == typeof r, f = !1;
        if (!i) {
            for (n in s) if (s.hasOwnProperty(n)) {
                if (t = s[n], o && t[r]) {
                    delete t[r], f = r;
                    break;
                }
                if (u) for (e in t) t.hasOwnProperty(e) && t[e] === r && (delete t[e], f = !0);
            }
            return f;
        }
        c.clearSubscriptions(r);
    }
};

exports.default = c, exports.PUB_CLOSE_TOGGLEPANEL = "PUB_CLOSE_TOGGLEPANEL", exports.GET_SPINNER_NUMBER = "GET_SPINNER_NUMBER", 
exports.RETRY_SPINNER_BTN = "RETRY_SPINNER_BTN";