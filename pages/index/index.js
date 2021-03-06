import { JQ_PER_PAGE_COUNT } from '../../utils/constants';
import {
  JIANGQIE_SETTING_HOMEBZ,
  JIANGQIE_BG_INDEX,
  JIANGQIE_POSTS_LAST,
  JIANGQIE_POSTS_CATEGORY
} from '../../utils/api.js';
import { get } from '../../utils/rest';
import util from '../../utils/util.js';
let setinad;

Page({
  data: {
    logo: '',
    background: '',

    //顶部导航
    topNavbz: [{
      id: 0,
      name: '最新'
    }],
    currentTabbz: 0, //预设当前项的值


    iconNavbz: [],
    //公告
    iconNac: [],


    //图片导航
    iconNavbzbz: [],

    //热门文章
    hotbz: [],

    //热门tab
    postsLast: [],
    loaddingLast: false,
    pullUpOnLast: true,

    //其他tab
    posts: [],
    loadding: false,
    pullUpOn: true,


    //弹窗广告
    tcad: [],
    tcad1: [],

    //列表模式
    listModebz: 3,
    pagead: 0
  },

  //弹窗广告开始
  // 点击隐藏弹出蒙版
  hiddenMsak() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    //首先获取是否执行过
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showAd: true
      })
    }.bind(this), 200)

  },



  //输入
  handlerSearchInput: function (e) {
    this.keyword = e.detail.value;
    this.setData({
      canSearch: this.keyword.length > 0
    });
  },

  handerSearchConfirm: function (e) {
    this.search();
  },

  //搜索
  handerSearchClick: function (e) {
    this.search();
  },

  search: function () {
    let that = this;
    wx.getStorage({
      key: Constant.JQ_SEARCH_KEY,
      success(res) {
        let keys = [that.keyword];
        for (let i = 0; i < res.data.length && keys.length < Constant.JQ_SEARCH_MAX_COUNT; i++) {
          if (that.keyword == res.data[i]) {
            continue;
          }

          keys.push(res.data[i]);
        }

        that.setData({
          historySearch: keys
        });

        wx.setStorage({
          data: keys,
          key: Constant.JQ_SEARCH_KEY,
        })
      },

      fail(e) {
        let keys = [that.keyword];

        that.setData({
          historySearch: keys
        });

        wx.setStorage({
          data: keys,
          key: Constant.JQ_SEARCH_KEY,
        })
      }
    });

    wx.navigateTo({
      url: '/pages/list/list?search=' + this.keyword
    })
  },

  //取消搜索
  handerCancelClick: function (e) {
    Util.navigateBack();
  },


  onLoad: async function (_options) {
    let that = this;
    util.getshare(that);

    // 时间
    let now = new Date();
    let hour = now.getHours();
    let isoTime = now.toISOString();
    if (0 <= hour && hour < 6) {
      console.log(isoTime + " 凌晨了，要注意身体啊，快去睡吧！");
    } else if (6 <= hour && hour < 8) {
      console.log(isoTime + " 早上好，奋斗的你，元气满满！加油哦！");
    } else if (8 <= hour && hour < 11) {
      console.log(isoTime + " 上午好，时间一分一秒的溜走，再也不回来！");
    } else if (11 <= hour && hour < 14) {
      console.log(isoTime + " 中午好，再忙再累，也要按时吃饭哦！");
    } else if (14 <= hour && hour < 17) {
      console.log(isoTime + " 下午好，有点懒洋洋啊！打起精神来！");
    } else if (17 <= hour && hour < 19) {
      console.log(isoTime + " 天黑咯，坚持一会，下班后就会充满活力！");
    } else if (19 <= hour && hour < 22) {
      console.log(isoTime + " 晚上好，改一个Bug就去休息哦！身体最重要！");
    } else {
      console.log(isoTime + " 夜深了，记得好好照顾自已，别熬夜！");
    }

    //加载topNav，也就是顶部分类导航栏
    await that.init();
    let today = wx.getStorageSync('today')
    if (!today) {
      wx.setStorageSync("today", new Date().toLocaleDateString());
      that.setData({
        tcad1: that.data.tcad
      })
    } else {
      if (today != new Date().toLocaleDateString()) {
        that.setData({
          tcad1: that.data.tcad
        })
      } else {
        that.setData({
          tcad1: []
        })
      }
    }
  },

  init: async function () {
    let that = this;

    //获取配置
    get(JIANGQIE_SETTING_HOMEBZ).then(res => {
      console.log(res);

      that.setData({
        logo: res.data.logo,
        topNavbz: that.data.topNavbz.concat(res.data.top_navbz),
        iconNavbzbz: res.data.icon_navbzbz,
        iconNavbz: res.data.icon_navbz,
        tcad: res.data.tcad,
        iconNac: res.data.icon_nac,
        activesbz: res.data.activesbz,
        hotbz: res.data.hotbz,
        listModebz: res.data.list_modebz,

        background: (res.data.slide && res.data.slide.length > 0) ? JIANGQIE_BG_INDEX : '',
      });

      if (res.data.title && res.data.title.length > 0) {
        getApp().appName = res.data.title;
      }
    })

    //加载文章
    this.loadPostLast(true);
  },

  onReachBottom: function () {
    if (this.data.currentTabbz == 0) {
      if (!this.data.pullUpOnLast) {
        return;
      }

      this.loadPostLast(false);
    } else {
      if (!this.data.pullUpOn) {
        return;
      }

      this.loadPost(false);
    }
  },

  onShow() {
    var that = this;
    util.getAD(that, function () {
      that.setInterstitialAd(); //加载插屏广告
    })

  },

  // 获取小程序插屏广告
  setInterstitialAd: function () {
    var that = this;
    if (that.data.setAD.interstitialid && wx.createInterstitialAd) {
      let interstitialAd = wx.createInterstitialAd({
        adUnitId: that.data.setAD.interstitialid
      })
      // 监听插屏错误事件
      interstitialAd.onError((err) => { console.error(err) })
      // 显示广告
      setTimeout(() => {
        interstitialAd.show().catch((err) => { console.error(err) })
      }, 6000);
    }
  },

  onHide() {
    clearInterval(setinad);
  },

  onShareAppMessage: function () {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return {
      title: that.data.shares.share_title,
      imageUrl: that.data.shares.share_image,
    }
  },

  //获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },


  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }



  },


  onShareTimeline: function () {
    var that = this;
    return {
      title: that.data.shares.share_title,
      path: 'pages/index/index',
      imageUrl: that.data.shares.share_image,
    }
  },

  //nav start----
  handlerSearchClick: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  //nav end ----

  //slide start----
  handlerSlideChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

  //slide end----

  //tab -- start
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTabbz == cur) {
      return false;
    }

    this.setData({
      background: (cur == 0 && this.data.slide && this.data.slide.length > 0) ? JIANGQIE_BG_INDEX : '',
      currentTabbz: cur
    })

    if (cur !== 0) {
      this.loadPost(true);
    }
  },

  handlerTabMoreClick: function (e) {
    wx.switchTab({
      url: '/pages/categories/categories',
    })
  },

  //tab -- end

  handlerIconNavClick: function (e) {
    let link = e.currentTarget.dataset.link;
    this.openLink(link);
  },

  handlerActiveClick: function (e) {
    let link = e.currentTarget.dataset.link;
    this.openLink(link);
  },

  handlerArticleClick: function (e) {
    let post_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/illust/illust?post_id=' + post_id
    })
  },

  //加载数据
  loadPostLast: function (refresh) {
    let that = this;

    that.setData({
      loaddingLast: true
    });

    let offset = 0;
    if (!refresh) {
      offset = that.data.postsLast.length;
    }

    get(JIANGQIE_POSTS_LAST, {
      'offset': offset
    }).then(res => {
      that.setData({
        loaddingLast: false,
        postsLast: refresh ? res.data : that.data.postsLast.concat(res.data),
        pullUpOnLast: res.data.length >= JQ_PER_PAGE_COUNT
      });
    })
  },

  loadPost: function (refresh) {
    let that = this;

    that.setData({
      loadding: true
    });

    let offset = 0;
    if (!refresh) {
      offset = that.data.posts.length;
    }

    get(JIANGQIE_POSTS_CATEGORY, {
      'offset': offset,
      'cat_id': that.data.topNavbz[that.data.currentTabbz].id
    }).then(res => {
      that.setData({
        loadding: false,
        posts: refresh ? res.data : that.data.posts.concat(res.data),
        pullUpOn: res.data.length >= JQ_PER_PAGE_COUNT
      });
    })
  },

  openLink: function (link) {
    if (link.startsWith('/pages')) {
      wx.navigateTo({
        url: link,
      })
    } else {
      wx.navigateToMiniProgram({
        appId: link,
        fail: res => {
          wx.showToast({
            title: '无效链接',
          })
        }
      })
    }

  }
})