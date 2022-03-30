Component({
    properties: {
        scrollNum: {
            type: Number,
            value: 0
        },
        itemHeight: {
            type: Number,
            value: 0
        },
        itemWidth: {
            type: Number,
            value: 0
        },
        fontSize: {
            type: Number,
            value: 0
        },
        dotWidth: {
            type: Number,
            value: 0
        },
        precision: {
            type: Number,
            value: 1
        }
    },
    lifetimes: {
        attached: function() {
            this.setItemStyle();
        }
    },
    attached: function() {
        this.setItemStyle();
    },
    observers: {
        scrollNum: function() {
            this.split(this.properties.scrollNum);
        }
    },
    data: {
        numAry: [ 0, 0 ],
        noTransFlag: !0,
        itemStyle: ""
    },
    methods: {
        setItemStyle: function() {
            var t = this.properties, e = t.itemHeight, i = t.fontSize, s = (t.itemWidth, "height: " + e + "rpx; line-height: " + e + "rpx; font-size: " + i + "rpx;");
            this.setData({
                itemStyle: s
            });
        },
        split: function(t) {
            var e = t && t > 0 ? t.toFixed(this.properties.precision) : "0.0";
            this.setData({
                numAry: e.replace(/[1-9]/gi, "0").split(""),
                noTransFlag: !0
            }, function() {
                var t = this;
                setTimeout(function() {
                    t.setData({
                        numAry: e.split(""),
                        noTransFlag: !1
                    });
                }, 50);
            });
        }
    }
});