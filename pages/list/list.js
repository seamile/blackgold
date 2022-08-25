import { ALB_PER_PAGE_COUNT } from '../../utils/constants';
import Util from '../../utils/util';
import {
  JIANGQIE_POSTS_CATEGORY,
  JIANGQIE_POSTS_TAG,
  JIANGQIE_POSTS_SEARCH,
  JIANGQIE_POSTS_MY,
  JIANGQIE_POSTS_LAST
} from '../../utils/api.js';
import { get } from '../../utils/rest';
import util from '../../utils/util.js';
let setinad;

Page({
  data: {
    posts: [],
    loadding: false,
    pullUpOn: true,
    loaded: false,
    pagead: 3
  },

  tag_id: undefined,
  cat_id: undefined,
  search: undefined,
  track: undefined,

  onLoad: function (options) {
    let self = this;
    let title = '最新文章';
    if (options.cat_id) { //分类
      self.cat_id = options.cat_id;
      title = decodeURIComponent(options.title);
    } else if (options.tag_id) { //标签
      self.tag_id = options.tag_id;
      title = decodeURIComponent(options.title);
    } else if (options.search) { //搜索
      self.search = decodeURIComponent(options.search);
      title = '搜索【' + self.search + '】';
    } else if (options.track) { //我的足迹
      switch (options.track) {
        case 'likes':
          title = '我的点赞'; break;
        case 'favorites':
          title = '我的收藏'; break;
        default:
          title = '我的浏览';
      }
      self.track = options.track;
    }
    wx.setNavigationBarTitle({ title: title });
    util.getshare(self);

    util.getAD(self, self.setInterstitialAd);
  },

  onPullDownRefresh: function () {
  },

  onReachBottom: function () {
    if (!this.data.pullUpOn) {
      return;
    }

    this.loadPost(false);
  },

  onShow() {
    this.loadPost(false);
  },

  // 是否可以显示插屏广告
  canShowInterstitialAd: function () {
    let lastShowIntAd = wx.getStorageSync('lastShowIntAd') || new Date().getTime();
    let current = new Date().getTime();
    let pastSeconds = (current - lastShowIntAd) / 1000;
    return pastSeconds >= 300;  // 5分钟内不重复播放
  },

  // 获取插屏广告
  setInterstitialAd: function () {
    var self = this;
    let canShow = self.canShowInterstitialAd();
    if (canShow && self.data.setAD.interstitialid && wx.createInterstitialAd) {
      // 记录当前时间
      wx.setStorageSync('lastShowIntAd', new Date().getTime());

      let interstitialAd = wx.createInterstitialAd({
        adUnitId: self.data.setAD.interstitialid
      })
      // 监听插屏错误事件
      interstitialAd.onError((err) => { console.error(err) })
      // 显示广告
      setTimeout(() => {
        interstitialAd.show().catch((err) => { console.error(err) })
      }, 3000);
    }
  },

  onHide() {
    clearInterval(setinad);
  },
  onShareAppMessage: function () {
    var self = this;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: self.data.shares.share_title,
      imageUrl: self.data.shares.share_image,
    }
  },
  //转发朋友圈
  onShareTimeline: function () {
    var self = this;
    return {
      title: self.data.shares.share_title,
      imageUrl: self.data.shares.share_image,
    }
  },
  // 收藏
  onAddToFavorites: function () {
    var self = this;
    return {
      title: self.data.shares.share_title,
      imageUrl: self.data.shares.share_image,
    }
  },

  handlerArticleClick: function (e) {
    let post_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/illust/illust?post_id=' + post_id
    })
  },

  loadPost: function (refresh) {
    let self = this;

    self.setData({
      loadding: true
    });

    let offset = 0;
    if (!refresh) {
      offset = self.data.posts.length;
    }

    let url = '';
    let params = {
      offset: offset
    };

    if (self.cat_id !== undefined) {
      url = JIANGQIE_POSTS_CATEGORY;
      params.cat_id = self.cat_id;
    } else if (self.tag_id !== undefined) {
      url = JIANGQIE_POSTS_TAG;
      params.tag_id = self.tag_id;
    } else if (self.search !== undefined) {
      url = JIANGQIE_POSTS_SEARCH;
      params.search = self.search;
    } else if (self.track !== undefined) {
      url = JIANGQIE_POSTS_MY;
      params.track = self.track;
    } else {
      url = JIANGQIE_POSTS_LAST;
    }

    get(url, params).then(res => {
      self.setData({
        loaded: true,
        loadding: false,
        posts: refresh ? res.data : self.data.posts.concat(res.data),
        pullUpOn: res.data.length == ALB_PER_PAGE_COUNT
      });
    })
  },

  handlerLoginCancelClick: function (e) {
    this.setData({
      showPopLogin: false
    });
    Util.navigateBack();
  },

  handlerDoLoginClick: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    });

    this.setData({
      showPopLogin: false
    });
  },
})