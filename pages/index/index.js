/*
 * 酱茄小程序开源版 v1.3.5
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

import { JQ_PER_PAGE_COUNT } from '../../utils/constants';
import {
  JIANGQIE_SETTING_HOME,
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
    bh: '', // 当前小时
    background: 'https://hoperp-han-1300874036.cos.ap-shanghai.myqcloud.com/2020/09/1599615195-id_bg.png',
    Greetings: "",//问候语
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


  onLoad: async function (options) {

    let that = this;
    await util.getshare(that);
    await get(JIANGQIE_SETTING_HOME).then(res => {
      that.setData({
        //topNav: that.data.topNav.concat(res.data.top_nav)
      })
    })

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log("当前时间戳为：" + timestamp);

    //获取当前时间
    var n = timestamp * 1000;

    var date = new Date(n);
    //获取时
    var h = date.getHours();
    if (0 < h && h <= 6) {
      console.log("  0：00—6:00凌晨:勤奋的你")
      that.setData({
        bh: '凌晨了，',
        Greetings: "凌晨勤奋的你，要注意身体哟！"
      })
    } else if (6 <= h && h < 9) {
      console.log("6：00—6:00早上:奋斗的你")
      that.setData({
        bh: '早上好，',
        Greetings: "早起奋斗的你，加油哦！"
      })
    }
    else if (9 <= h && h < 11) {
      console.log("6：00—6:00早上:奋斗的你")
      that.setData({
        bh: '早上好，',
        Greetings: "时间一分一秒的溜走，再也不回来！"
      })
    }
    else if (11 <= h && h <= 14) {

      console.log("11：00—13:00中午:激情的你")
      that.setData({
        bh: '中午好，',
        Greetings: "再忙再累，也要按时吃饭哦！"
      })
    } else if (14 <= h && h <= 16) {

      console.log("18:00—24:00下午:懒洋洋的你")
      that.setData({
        bh: '下午好，',
        Greetings: "有点懒洋洋哦！打起精神来！"
      })
    }
    else if (16 <= h && h <= 18) {

      console.log("16：00：00—18:00傍晚:活力的你")
      that.setData({
        bh: '晚上好，',
        Greetings: "坚持一会，下班后就会充满活力！"
      })
    }
    else if (18 <= h && h <= 21) {
      that.setData({
        bh: '晚上好，',
        Greetings: "在看一会就要去休息哦！身体重要！"
      })
    }
    else {
      that.setData({
        bh: '晚上好，',
        Greetings: "晚上啦，记得好好照顾自已，别熬夜！"
      })

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
      let logo = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f7f3f46c-2ca3-4514-81d9-6144e0e5180f/2542a804-ead0-435d-b402-9f022a12b348.png';
      if (res.data.logo && res.data.logo.length > 0) {
        logo = res.data.logo;
      }
      that.setData({
        logo: logo,
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
      interstitialAd.onError((err) => {
        console.error(err)
      })
      // 显示广告
      if (interstitialAd) {
        if (that.data.setAD.switch_inad == 'yes') {
          setinad = setInterval(() => {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }, 2000);
        }
        else {
          setTimeout(() => {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }, 6000);
        }

      }
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