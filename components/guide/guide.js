var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/flcache.js"));

Component({
    properties: {
        text: {
            type: String,
            value: ""
        },
        duration: {
            type: Number,
            value: 0
        }
    },
    data: {
        SHOW_TOP: !1
    },
    ready: function() {
        var e = this, a = t.default.get("PLUG-ADD-MYAPP-KEY"), u = t.default.get("SHOW-TIMES-KEY");
        a || 3 != u && (this.setData({
            SHOW_TOP: !0
        }), u = u ? u + 1 : 1, t.default.set("SHOW-TIMES-KEY", u, 365), setTimeout(function() {
            e.setData({
                SHOW_TOP: !1
            });
        }, 1e3 * this.data.duration));
    },
    methods: {
        okHandler: function() {
            this.setData({
                SHOW_TOP: !1
            }), t.default.set("PLUG-ADD-MYAPP-KEY", 1, 365);
        }
    }
});