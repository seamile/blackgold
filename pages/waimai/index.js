// pages/waimai/index.js
var timer=null,i = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], s = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodname: "今天吃什么呢？",
    fooditems: ["呀,啥都没摇到"],
    animate: false,
    isclick: false,
    dateMonth: i[new Date().getMonth()],
    dateDay: new Date().getDate(),
    dateWeek: s[new Date().getDay()],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTimeFood();
  },

  getTimeFood: function () {
    var t = this,
      n = new Date().getHours() + ":" + new Date().getMinutes();
    console.log(n), wx.request({
      url: "https://res.guqule.com/time.json?v=" + new Date().getMinutes(),
      method: "get",
      data: {},
      success: function (e) {
        console.log(e.data), e.data.map(function (e, o) {
          (t.equalDate(n, e.start_time) || t.compareDate(e.start_time, n)) && t.compareDate(n, e.end_time) && (
            t.setData({
              foodname: e.text,
              fooditems: e.menus,
            }));
        }), "今天吃什么呢？" == t.foodname && (t.foodname = e.data[4].text, t.fooditems = e.data[4].menus);
      }
    });
  },

  compareDate: function (e, t) {
    var n = new Date(),
      o = e.split(":"),
      a = t.split(":");
    return n.setHours(o[0], o[1]) < n.setHours(a[0], a[1]);
  },

  equalDate: function (e, t) {
    var n = new Date(),
      o = e.split(":"),
      a = t.split(":");
    return n.setHours(o[0], o[1]) == n.setHours(a[0], a[1]);
  },

  rolledUp: function () {
    console.log(this.data.animate)
    this.data.animate || (
      this.setData({
        isclick: true,
        animate: true,
      }), this.bbb(100, 10, 0));
  },

  bbb: function (e, t, n) {
    var o = this;
    o.setData({
      foodname: o.data.fooditems[Math.floor(Math.random() * o.data.fooditems.length)],
    })
    o.timer = setInterval(function () {
      o.setData({
        foodname: o.data.fooditems[Math.floor(Math.random() * o.data.fooditems.length)],
      }),clearInterval(o.timer), 
      o.timer = null, t > n ? o.bbb(e, t, n + 1) : o.setData({animate:false});
  }, e);
  },

  gotoeleOtherApp:function(){
    wx.navigateToMiniProgram({
      appId: 'wxf8eb8474bc5605c9',
      path:'pages/elm/elm'
    })
  },

  gotoPinOtherApp:function(){
    wx.navigateToMiniProgram({
      appId: 'wxf8eb8474bc5605c9',
      path:'pages/index/index'
    })
  },

  gotoMeiOtherApp:function(){
    wx.navigateToMiniProgram({
      appId: 'wxf8eb8474bc5605c9',
      path:'pages/mt/mt'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})