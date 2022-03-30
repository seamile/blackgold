const API = require('../utils/api');
const WxParse = require('../wxParse/wxParse');
const app = getApp();
// 获取文章详情
const getPostsDetail = function() {
  let id = this.data.id;
  API.getPostsbyID(id).then(res => {
      let args = {};
      let current = getCurrentPages();
      if (current.length === 1) {
        args.isShare = true;
      }
      // args.is_showloading = false
      args.detail = res;
      args.is_liked = res.islike;
      args.is_favored = res.isfav;
      this.getVideoAD(res.meta.global_download_type);
      this.setData(args);
      // 阅读记录缓存数据
      let record = {};
      let wallpaper = {};
      wallpaper = res.wallpaper;
      record.id = res.id;
      record.date = res.date;
      record.wallpaper = wallpaper;
      // 调用 API 从本地缓存中获取阅读记录并记录
      let logs = wx.getStorageSync('readLogs') || [];
      let readsave = true;
      // 过滤重复值
      if (logs.length > 0) {
        for (let i = 0; i < logs.length; i++) {
          if (logs[i].id == res.id) {
            readsave = false;
            break;
          }
        }
      }
      if (readsave) {
        logs.unshift(record);
      }
      // 如果超过指定数量
      if (logs.length > 30) {
        logs.pop(); // 去除最后一个
      }
      wx.setStorageSync('readLogs', logs);
      //阅读记录缓存结束
      wx.stopPullDownRefresh();
    })
    .catch(err => {
      if (this.data.isPull) {
        this.setData({
          isPull: false
        });
        wx.stopPullDownRefresh();
      }
      console.log(err);
    });
};

const getReviewDetail = function () {
  let id = this.data.id;
  API.getReviewByid(id).then(res => {
    //console.log(res)
    let args = {};
    let current = getCurrentPages();
    if (current.length === 1) {
      args.isShare = true;
    }
    if (res.media) {
      console.log(res.media.audio);
      backgroundAudioManager.title = res.title.rendered;
      backgroundAudioManager.coverImgUrl = res.meta.thumbnail;
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = res.media.audio;
      this.setData({
        isPlay: true
      });
    }
    args.isPull = false;
    args.detail = res;
    args.is_liked = res.islike;
    args.is_favored = res.isfav;
    args.is_showloading = false;
    this.setData(args);
    wx.stopPullDownRefresh();
  })
    .catch(err => {
      console.log(err);
    });
};

// 收藏文章
const postFav = function(e) {
  //console.log(e)
  let args = {};
  let that = this;
  let type = e.currentTarget.dataset.type;
  args.id = e.currentTarget.id;
  API.fav(args).then(res => {
      //console.log(res)
      if (res.status === 200) {
        that.data.detail.favs += 1;
        that.setData({
          detail: that.data.detail,
          is_favored: true,
        });
        wx.showToast({
          title: '收藏成功!',
          icon: 'success',
          duration: 900,
        });
      } else if (res.status === 202) {
        that.data.detail.favs -= 1;
        that.setData({
          detail: that.data.detail,
          is_favored: false,
        });
        wx.showToast({
          title: '取消收藏!',
          icon: 'success',
          duration: 900,
        });
      } else {
        wx.showToast({
          title: '数据出错!',
          icon: 'success',
          duration: 900,
        });
      }
    })
    .catch(err => {
      console.log(err);
      if (err.message = "授权信息有误") {
        that.setData({
          showlogin: true,
          nologin: true
        });
      }
    });
};

// 收藏壁纸
const postLike = function(e) {
  let args = {};
  let that = this;
  let type = e.currentTarget.dataset.type;
  if (!type) {
    type = this.data.types;
  }
  let index = e.currentTarget.dataset.index;
  let user = wx.getStorageSync('user');
  var data = {
    avatar: user.avatarUrl
  };
  args.id = e.currentTarget.id;
  API.like(args).then(res => {
      if (res.status === 200) {
        wx.showToast({
          title: '收藏好啦！',
          icon: 'success',
          duration: 900,
        });
        that.setData({
          isLike: true
        });
        if (!type) {
          this.getPostsDetail();
        } else if (type == "article") {
          that.data.posts[index].islike = true;
          that.setData({
            posts: that.data.posts,
          });
        } else if (type == 'topic') {
          that.data.posts[index].post_likes.push(data);
          that.data.posts[index].islike = true;
          that.setData({
            posts: that.data.posts,
          });
        } else if (type == "forum") {
          this.getForumsDetail();
        }
      } else if (res.status === 202) {
        that.setData({
          isLike: false
        });
        if (!type) {
          this.getPostsDetail();
        } else if (type == "article") {
          that.data.posts[index].islike = false;
          that.setData({
            posts: that.data.posts,
          });
        } else if (type == 'topic') {
          that.data.posts[index].post_likes.pop();
          that.data.posts[index].islike = false;
          that.setData({
            posts: that.data.posts,
          });
        }
      } else {
        wx.showToast({
          title: '数据出错!',
          icon: 'success',
          duration: 900,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });

};

//下载壁纸
const postDownload = function (e) {
  let that = this,
      id = this.data.detail.id,
      image_url = e.currentTarget.dataset.src,
      user_credit = parseInt(this.data.credit.credits),
      download_type = this.data.detail.meta.global_download_type,
      download_credit = this.data.detail.meta.global_download_credit;

  that.setData({
    download_url: image_url
  });
  switch(download_type){
    case 'credit':
      if (user_credit >= Math.abs(download_credit)) {
        that.downloadAction(id, image_url, true, download_credit);
      } else {
        that.setData({
          is_credit: true
        });
      }
      break;
    case  'ad':
      if (!that.data.is_incentive) {
        that.openVideoAD(false);
      }
      if (that.data.is_incentive) {
        that.downloadAction(id, image_url, false);
      }
      break;
    default:
      that.downloadAction(id, image_url, false);
  }
};

const downloadAction = function (id, src, credit, download_credit) {
  let that = this;
  let args = {};
  args.id = id;
  API.down(args).then(res => {
    wx.showLoading({
      title: '保存中...'
    });
    wx.downloadFile({
      url: src,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            if(credit){
              console.log('下载消耗积分'+download_credit);
              that.updateCreditCustom('下载', download_credit, false);
              // that.updateCredit('download', args.id, false);
            }
            wx.hideLoading();
            that.setData({
              is_downloaded: true
            });
            that.getUserMineInfo();
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.showModal({
                title: '无权限提示',
                content: '需要你授权才能保存到相册哦！',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '授权成功提示',
                          content: '获取权限成功，再次点击下载按钮即可保存到相册啦！',
                          showCancel: false,
                        });
                      } else {
                        wx.showModal({
                          title: '无权限提示',
                          content: '还未开启相册授权，无法保存哦~',
                          showCancel: false,
                        });
                      }
                    }
                  });
                }
              });
            }
          },
          complete(res) {
            wx.hideLoading();
          }
        });
      }
    });
  })
    .catch(err => {
      console.log(err);
    });
};

const getRelatePosts = function (id, per_page) {
  API.getRelatePosts(id, per_page).then(res => {
    this.setData({
      relateposts: res,
      is_related: true
    });
    wx.hideLoading();
  });
};

module.exports = function(obj) {
  obj.postFav = postFav;
  obj.postLike = postLike;
  obj.postDownload = postDownload;
  obj.downloadAction = downloadAction;
  obj.getPostsDetail = getPostsDetail;
  obj.getReviewDetail = getReviewDetail;
  obj.getRelatePosts = getRelatePosts;
};
