Component({
    properties: {
        remain: {
            type: Number,
            value: 0
        },
        showMillisecond: {
            type: Boolean,
            value: !1
        }
    },
    options: {
        multipleSlots: !0
    },
    externalClasses: [ "outer-class", "unit-class", "scroll-unit" ],
    observers: {
        remain: function(t) {
            var s = this;
            this.setData({
                seconds: t
            }, function() {
                s.countdown();
            });
        }
    },
    data: {
        seconds: 0,
        stop: !1
    },
    methods: {
        countdown: function() {
            var t = this, s = this.data.seconds;
            0 !== s ? setTimeout(function() {
                s -= 1, t.setData({
                    seconds: s
                }), t.countdown();
            }, 1e3) : 0 !== this.properties.remain && (this.setData({
                stop: !0
            }), this.triggerEvent("expiry"));
        }
    }
});