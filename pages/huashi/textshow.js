var t = require("./utils/hxw.js"), a = require("./utils/tel.js"), e = getApp(), r = "";

Page({
    data: {
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "",
        newValue: []
    },

    onLoad: function(){
      wx.showModal({
        title: '提示',
        content: '请先输入文字再转换！',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    },

    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    onShow: function() {
      
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            textareaValue: ""
        });
    },
    changeText: function(r) {
        var n = this;
        wx.showLoading({
            title: "生成中",
            mask: !0
        })
            switch (r.target.id) {
              case "hxw":
                for (var c = "", o = n.data.current, h = 0; h < o.length; h++) -1 != t.ftPYStr().indexOf(o.charAt(h)) ? c += t.qqPYStr().charAt(t.ftPYStr().indexOf(o.charAt(h))) : -1 != t.charPYStr().indexOf(o.charAt(h)) ? c += t.qqPYStr().charAt(t.charPYStr().indexOf(o.charAt(h))) : c += o.charAt(h);
                n.setData({
                    textareaValue: c
                }), n.textCopy();
                break;

              case "ftz":
                for (var c = "", o = n.data.current, h = 0; h < o.length; h++) -1 != t.charPYStr().indexOf(o.charAt(h)) ? c += t.ftPYStr().charAt(t.charPYStr().indexOf(o.charAt(h))) : -1 != t.qqPYStr().indexOf(o.charAt(h)) ? c += t.ftPYStr().charAt(t.qqPYStr().indexOf(o.charAt(h))) : c += o.charAt(h);
                n.setData({
                    textareaValue: c
                }), n.textCopy();
                break;

              case "sbdh":
                for (var c = "", o = n.data.current, h = 0; h < o.length; h++) c += a.tpTELStr().charAt(a.charTELStr().indexOf(o.charAt(h)));
                n.setData({
                    textareaValue: "℡" + c
                }), n.textCopy();
                break;

              case "xbdh":
                for (var c = "", o = n.data.current, h = 0; h < o.length; h++) c += a.ftTELStr().charAt(a.charTELStr().indexOf(o.charAt(h)));
                n.setData({
                    textareaValue: "℡" + c
                }), n.textCopy();
                break;

              case "lhz":
                for (var s = String.fromCharCode(1160), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "jhw":
                for (var s = String.fromCharCode(1161), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "tmw1":
                for (var s = "ζั͡ ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += s + g.charAt(h);
                n.setData({
                    textareaValue: u + "ζั͡✾"
                }), n.textCopy();
                break;

              case "tmw2":
                for (var s = "ζั͡ ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += s + g.charAt(h);
                n.setData({
                    textareaValue: u + "ζั͡✿"
                }), n.textCopy();
                break;

              case "tmw3":
                for (var s = "ζั͡ ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += s + g.charAt(h);
                n.setData({
                    textareaValue: u + "ζั͡❀"
                }), n.textCopy();
                break;

              case "hbw":
                for (var s = String.fromCharCode(2954), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "ctw":
                for (var s = String.fromCharCode(3572), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "kaw":
                for (var s = String.fromCharCode(4326), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += s + g.charAt(h);
                n.setData({
                    textareaValue: u + s
                }), n.textCopy();
                break;

              case "pgyw":
                for (var s = "ོ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: "៚" + u + "ོ ͜✿ ҉҉҉҉҉"
                }), n.textCopy();
                break;

              case "blw":
                for (var s = String.fromCharCode(794), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "myw":
                for (var s = "็้", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "sbw":
                for (var s = String.fromCharCode(860), u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "htw":
                for (var d = String.fromCharCode(862), l = String.fromCharCode(863), x = "", h = 0, i = (f = n.data.current).length; h < i; h++) x += d + f.charAt(h) + l;
                n.setData({
                    textareaValue: x
                }), n.textCopy();
                break;

              case "shtw":
                for (var d = String.fromCharCode(831), l = String.fromCharCode(839), x = "", f = n.data.current, h = 0, i = f.length; h < i; h++) x += d + f.charAt(h) + l;
                n.setData({
                    textareaValue: x
                }), n.textCopy();
                break;

              case "fnw":
                for (var s = "ོ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "yfw":
                for (var s = "♫", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: "∮" + u
                }), n.textCopy();
                break;

              case "scx":
                for (var s = "̶", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "xhx":
                for (var s = "꯭", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: "꯭" + u
                }), n.textCopy();
                break;

              case "mlw":
                for (var s = "ℳℓ", u = "", h = 0, i = (g = n.data.current).length; h < i; h++) u += s + g.charAt(h);
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              case "mtz":
                for (var s = "ืุ", u = "", g = n.data.current, h = 0, i = g.length; h < i; h++) u += g.charAt(h) + s;
                n.setData({
                    textareaValue: u
                }), n.textCopy();
                break;

              default:
                n.setData({});
            }
        
    },
    textCopy: function() {
        wx.setClipboardData({
            data: this.data.textareaValue,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), t.data, wx.showToast({
                            title: "复制成功"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "送你微信昵称的各种玩法",
            path: "/pages/index/index",
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "分享失败",
                    icon: "loading",
                    duration: 2e3
                });
            }
        };
    }
});