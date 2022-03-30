const API = require('../utils/api');
const app = getApp();

const getSiteInfo = function() {
  API.getSiteInfo().then(res => {
      let args = {};
      args.appTitle = res.name;
      args.appDescription = res.description;
      args.appVersion = res.version;
      wx.setNavigationBarTitle({
        title: args.appTitle,
      });
      this.setData(args);
    })
    .catch(err => {
      console.log(err);
    });
};

const getOptionSettings = function(type) {
  let that = this;
  API.getOptionSettings().then(res => {
      let args = {};
      let post_role = res.app.post_role;
      args.appOptions = res;
      if (type) {
        switch(type){
          case 'color':
            if (res.app.is_color) {
              that.getColor();
            }
            if (res.app.is_user_post) {
              API.getProfile().then(data => {
                let user_role = data.role;
                if (post_role == 'limit_hide_enter') {
                  if (user_role == 'administrator' || user_role == 'editor' || user_role == 'contributor') {
                    args.is_user_post = true;
                    args.is_role_post = true;
                  } else {
                    args.is_user_post = false;
                    args.is_role_post = false;
                  }
                }
                if (post_role == 'limit_show_enter') {
                  args.is_user_post = true;
                  if (user_role == 'administrator' || user_role == 'editor' || user_role == 'contributor') {
                    args.is_role_post = true;
                  } else {
                    args.is_role_post = false;
                  }
                }
                if (post_role == 'all') {
                  args.is_user_post = true;
                  args.is_role_post = true;
                }
                that.setData(args);
              });
            }
            break;
          case 'role':
            if (res.app.is_user_post) {
              API.getProfile().then(data => {
                let user_role = data.role;
                if (post_role == 'limit_hide_enter') {
                  if (user_role == 'administrator' || user_role == 'editor' || user_role == 'contributor') {
                    args.is_user_post = true;
                    args.is_role_post = true;
                  } else {
                    args.is_user_post = false;
                    args.is_role_post = false;
                  }
                }
                if (post_role == 'limit_show_enter') {
                  args.is_user_post = true;
                  if (user_role == 'administrator' || user_role == 'editor' || user_role == 'contributor') {
                    args.is_role_post = true;
                  } else {
                    args.is_role_post = false;
                  }
                }
                if (post_role == 'all') {
                  args.is_user_post = true;
                  args.is_role_post = true;
                }
                // 投稿审核管理判断
                if (res.app.is_review && user_role == 'administrator' || user_role == 'editor' || user_role == 'superadmin') {
                  args.is_user_review = true;
                }
                that.setData(args);
              });
            }
            break;
        }
      }
      that.setData(args);
    })
    .catch(err => {
      console.log(err);
    });
};

const getAdvert = function() {
  API.getAdvertSettings().then(res => {
      let args = {};
      args.appAdvert = res;
      this.setData(args);
    })
    .catch(err => {
      console.log(err);
    });
};

const getAboutSettings = function () {
  API.getAboutSettings().then(res => {
    let args = {};
    if (res.status === 200) {
      args.aboutOptions = res.data;
      args.isList = true;
      this.setData(args);
    }
    if (res.status === 400) {
      this.setData({
        isList: false
      });
    }
  })
    .catch(err => {
      console.log(err);
    });
};

const getNavigation = function () {
  API.getMenuSetting().then(res => {
    let args = {};
    if (res.status === 200) {
      args.navigation = res.data;
      this.setData(args);
    }
  })
    .catch(err => {
      console.log(err);
    });
};

const getCreditSetting = function (type) {
  var that = this;
  API.getCreditSetting().then(res => {
      let args = {};
      if (res.status === 200) {
        switch (type) {
          case 'lite':
            let count = res.data.length;
            for (let i = 0; i < count; i++) {
              var credit = res.data[i].credit;
              if (res.data[i].credit < 0) {
                credit = Math.abs(res.data[i].credit);
              }
              if (res.data[i].action == 'sign') {
                that.data.creditArchive.sign = credit;
              }
              if (res.data[i].action == 'download') {
                that.data.creditArchive.download = credit;
              }
              if (res.data[i].action == 'adview') {
                that.data.creditArchive.adview = credit;
              }
              if (res.data[i].action == 'invite') {
                that.data.creditArchive.invite = credit;
              }
              args.creditArchive = that.data.creditArchive;
              that.setData(args);
            }
            break;
          default:
            args.creditArchive = res.data;
            that.setData(args);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// 获取用户信息
const getUserInfoFun=function(e) {
  if (e.detail.errMsg == "getUserInfo:ok") {
    wx.setStorageSync('scope', true);
    this.getProfile();
    wx.showLoading({
      title: '登陆中...',
    });
  } else {
    return;
  }
};

// 获取用户信息
const getUserMineInfo = function () {
  let that = this;
  API.getMineInfo().then(res => {
    //console.log(res)
    let args = {};
    args.user = res.user;
    args.credit = res.credit;
    that.setData(args);
  })
  .catch(err => {
    console.log(err);
    if (err.message == "无效授权登录信息,或授权登录已过期") {
      that.setData({
        showlogin: true,
        nologin: true,
      });
    }
  });
};

// 获取用户信息
const getProfile = function(e) {
  let that = this;
  let share_user_id = wx.getStorageSync('share_user_id');
  API.getProfile().then(res => {
    // console.log(res)
    wx.hideLoading();
    that.setData({
      user: res,
      showlogin: false,
      nologin: false
    });
    if(share_user_id){
      that.updateCreditUser(share_user_id, 'invite', false);
      wx.setStorageSync('shared_user_id', share_user_id);
      wx.removeStorageSync('share_user_id');
    } else {
      that.getUserMineInfo();
    }
  })
  .catch(err => {
    console.log(err);
    wx.hideLoading();
  });
};

// 获取授权信息
const getAuthtoken = function() {
  if (app.globalData.user) {
    this.setData({
      user: app.globalData.user
    });
  } else {
    API.getProfile().then(res => {
        console.log(res);
        this.setData({
          user: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// 更新分享积分
const updataShareCredit = function (uid) {
  let that = this;
  let share_user_id = wx.getStorageSync('share_user_id');
  API.getMineInfo().then(res => {
    that.setData({
      user: res.user
    });
    that.updateCreditUser(share_user_id, 'invite', false);
    wx.setStorageSync('shared_user_id', share_user_id);
    wx.removeStorageSync('share_user_id');
  })
    .catch(err => {
      console.log(err);
      if (err.message == "无效授权登录信息,或授权登录已过期") {
        that.setData({
          showlogin: true,
          nologin: true,
        });
      }
    });
};

const goPages = function(e) {
  // console.log(e);
  let id = e.currentTarget.id;
  let type = e.currentTarget.dataset.type;
  let current = e.currentTarget.dataset.current;
  switch (type) {
    case 'post':
      wx.navigateTo({
        url: '/pages/detail/preview?id=' + id
      });
      break;
    case 'wallpaper':
      wx.navigateTo({
        url: '/pages/detail/preview?id=' + id + '&current=' + current
      });
      break;
    case 'review':
      wx.navigateTo({
        url: '/pages/review/review-detail?id=' + id
      });
      break;
    case 'userPost':
      wx.navigateTo({
        url: '/pages/review/review-detail?id=' + id + '&userPost=true'
      });
      break;
    case 'relate':
      wx.redirectTo({
        url: '/pages/detail/preview?id=' + id
      });
      break;
    case 'page':
      wx.navigateTo({
        url: '/pages/page/page?id=' + id
      });
      break;
    case 'tag':
      wx.navigateTo({
        url: '/pages/list/list?tag=' + id
      });
      break;
    default:
      wx.navigateTo({
        url: '/pages/detail/preview?id=' + id
      });
  }
};

const goHomePage = function() {
  wx.switchTab({
    url: '/pages/index/index'
  });
};

const goCategoryPage = function () {
  wx.switchTab({
    url: '/pages/category/index'
  });
};

const goUserPage = function () {
  wx.switchTab({
    url: '/pages/mine/mine',
  });
};

const goBack = function() {
  wx.navigateBack();
};

const updateCredit = function (action, id, show) {
  API.updateCredit({
    action: action,
    id: id
  }).then(res => {
    console.log(res);
    if (show) {
      wx.showToast({
        title: res.message,
      });
    }
  });
};

const updateCreditCustom = function (action, credit, show) {
  API.updateCredit({
    action: action,
    credit: credit
  }).then(res => {
    // console.log(res);
    if (show) {
      wx.showToast({
        title: res.message,
      });
    }
  });
};

const updateCreditUser = function ( uid, action, show) {
  API.updateCreditUser({
    uid: uid,
    action: action
  }).then(res => {
    // console.log(res);
    if (show) {
      wx.showToast({
        title: res.message,
      });
    }
  });
};

// 注销用户登录
const LoginOut = function () {
  API.Loginout();
  wx.showToast({
    title: '正在注销',
    icon: 'loading',
    duration: '1500',
    success: function(){
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  });
};

const doNothingMove = function(e) {
  // do nothing……
};

module.exports = function(obj) {
  obj.getOptionSettings = getOptionSettings;
  obj.getAboutSettings = getAboutSettings;
  obj.getAdvert = getAdvert;
  obj.goPages = goPages;
  obj.goBack = goBack;
  obj.goHomePage = goHomePage;
  obj.goCategoryPage = goCategoryPage;
  obj.goUserPage = goUserPage;
  obj.getProfile = getProfile;
  obj.getSiteInfo = getSiteInfo;
  obj.getAuthtoken = getAuthtoken;
  obj.getUserInfoFun = getUserInfoFun;
  obj.getNavigation = getNavigation;
  obj.getCreditSetting = getCreditSetting;
  obj.getUserMineInfo = getUserMineInfo;
  obj.updataShareCredit = updataShareCredit;
  obj.updateCredit = updateCredit;
  obj.updateCreditCustom = updateCreditCustom;
  obj.updateCreditUser = updateCreditUser;
  obj.doNothingMove = doNothingMove;
  obj.LoginOut = LoginOut;
};
