getApp();

var t = "";

Page({
    data: {
        key: "sup",
        result: "",
        tool: {
            key: "blue",
            name: "彩色昵称生成器",
            placeholder: "请输入您的英文小写昵称"
        }
    },
    onLoad: function() {
        this.setData({
            key: "blue"
        });
    },
    onShow: function() {
 
    },
    generate: function(t) {
        var e = t.detail.value.trim();
        "sup" == this.data.key ? this.setData({
            result: "℡" + this.strReplace(e, [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ], [ "⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹" ])
        }) : "sub" == this.data.key ? this.setData({
            result: "℡" + this.strReplace(e, [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ], [ "₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉" ])
        }) : "sup2" == this.data.key ? this.setData({
            result: this.strReplace(e, [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "D", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "T", "U", "V", "W" ], [ "⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵒ⃒", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ", "ᴬ", "ᴮ", "ᴰ", "ᴱ", "ᴳ", "ᴴ", "ᴵ", "ᴶ", "ᴷ", "ᴸ", "ᴹ", "ᴺ", "ᴼ", "ᴾ", "ᴿ", "ᵀ", "ᵁ", "ⱽ", "ᵂ" ])
        }) : "blur" == this.data.key ? this.setData({
            result: "҈" + this.combining(e, "҈")
        }) : "underline" == this.data.key ? this.setData({
            result: "꯭" + this.combining(e, "꯭")
        }) : "blue" == this.data.key ? this.setData({
            result: this.strReplace(e, [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], [ "🇦 ", "🇧 ", "🇨 ", "🇩 ", "🇪 ", "🇫 ", "🇬 ", "🇭 ", "🇮 ", "🇯 ", "🇰 ", "🇱 ", "🇲 ", "🇳 ", "🇴 ", "🇵 ", "🇶 ", "🇷 ", "🇸 ", "🇹 ", "🇺 ", "🇻 ", "🇼 ", "🇽 ", "🇾 ", "🇿" ])
        }) : "wing" == this.data.key && this.setData({
            result: "꧁꫞" + e + "꫞꧂"
        });
    },
    strReplace: function(t, e, a) {
        var s;
        if (e.length == a.length) {
            for (var i = 0; i < e.length; i++) s = new RegExp(e[i], "g"), t = t.replace(s, a[i]);
            return t;
        }
        alert("find 和 replace 數量不一致");
    },
    combining: function(t, e) {
        for (var a = "", s = t.length; s; ) a = a + t.substr(0, 1) + e, s = (t = t.substr(1, s)).length;
        return a;
    },
    copyResult: function(t) {
        wx.setClipboardData({
            data: this.data.result
        });
    },
    onShareAppMessage: function() {
        return {
            title: "昵称的各种玩法",
            imageUrl: "",
            path: "/pages/index/index",
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success"
                });
            }
        };
    }
});