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
        urls: [ "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/8838e73c-be40-4ea0-ba68-6f229c3d2af8.jpg" ]
    });
}), (0, r.default)(e, "goBack", function() {
    wx.navigateBack({
        delta: 0
    });
}), (0, r.default)(e, "showMoneyPic", function() {
    wx.previewImage({
        urls: [ "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/d4f90b3f-e7ed-4761-81b3-024657a84028.jpg" ]
    });
}), e));