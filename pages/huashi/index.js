getApp();

var e = "";

Page({
    data: {
        datalist: [ {
            name: "翅膀昵称",
            path: "/pages/huashi/nickname"
        }, {
            name: "特效字体",
            path: "/pages/huashi/textshow"
        }, {
            name: "尖叫文字",
            path: "/pages/huashi/screaming"
        }, {
            name: "蓝色昵称",
            path: "/pages/huashi/blue"
        }, {
            name: "文字表情",
            path: "/pages/huashi/wordsExp"
        }, {
            name: "字符表情",
            path: "/pages/huashi/emoticon"
        },  {
            name: "透明昵称",
            path: "/pages/huashi/blank"
        } ],
        wjbh: "更多工具"
    },
   onLoad:function(){

   },
    onShareAppMessage: function(e) {
        return {
            title: "送你微信昵称的各种玩法",
            path: "/pages/index/index",
            success: function(e) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success"
                });
            }
        };
    }
});