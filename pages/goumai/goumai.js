var e, r = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty"));

Page((e = {
    data: {
        modalHidden: !0
    },
    onLoad: function(e) {},
    showPic: function() {},
    goToApp: function() {
        wx.navigateToMiniProgram({
            appId: "wx2795ab2f7c07769a",
            success: function(e) {}
        });
    },
    goToxmApp: function() {
        wx.navigateToMiniProgram({
            appId: "wx2db9e3f582c44b95",
            success: function(e) {}
        });
    }
}, (0, r.default)(e, "showPic", function() {
    wx.previewImage({
        urls: [ "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/71684750-83d6-489a-8540-71cb4e7a9173.jpg" ]
    });
}), (0, r.default)(e, "goBack", function() {
    wx.navigateBack({
        delta: 0
    });
}), (0, r.default)(e, "showMoneyPic", function() {
    wx.previewImage({
        urls: [ "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/fe04fb32-05a9-421f-a163-a5f30b63fba2.jpg" ]
    });
}), e));