var e = "";

Page({
    data: {
        array: [ {
            mode: "scaleToFill",
            text1: "",
            text2: "点击下面方框内区域，弹出空白图片",
            text3: "保存到本地就可以去设为微信头像了",
            text4: "点击框内，长按保存到本地"
        } ],
        src: "../../img/touming.png",
        src1: "../../img/sys.png"
    },
    onShow: function() {
  
    },
    imageError: function(e) {
        console.log("image3发生error事件，携带值为", e.detail.errMsg);
    },
    previewImageblankhead: function(e) {
        var t = "https://mmbiz.qpic.cn/mmbiz_png/Ieo4dmQbUwBcoSvT9AMm6ADPjf3FGLC36iclgRE7g3KnYY4PJXh9MSgmolC10Vks8dkjibIjIZbAoiaPvRBmuXsoA/0?wx_fmt=png";
        console.log(t.split(",")), wx.previewImage({
            urls: t.split(",")
        });
    },
    previewImageGZH: function(e) {
        var t = "https://mmbiz.qpic.cn/mmbiz_jpg/Ieo4dmQbUwAejqQXibOxb5Jh7N8kLzKCYnqLrmVcj22DuVytu5opPXAbOibr5ibaZqAHXj78R28gY0XVcIhNf1eHQ/0?wx_fmt=jpeg";
        console.log(t.split(",")), wx.previewImage({
            urls: t.split(",")
        });
    }
});