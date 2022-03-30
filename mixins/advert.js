const API = require('../utils/api');
const app = getApp();
let videoAd = null;
let interstitialAd = null;

const getVideoAD = function (type) {
  API.getAdvertVideo().then(res => {
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: res.data.code
      });
      videoAd.onLoad(() => {});
      videoAd.onError(err => {});
      videoAd.onClose((status) => {
        if (status && status.isEnded || status === undefined) {
          switch (type) {
            case 'ad':
              console.log('广告完成开始下载');
              this.downloadAction(this.data.id, this.data.download_url, false);
              break;
            case 'credit':
              // console.log('广告完成更新双倍积分');
              // this.updateCreditCustom('广告双倍', this.data.creditArchive.adview*2, false);
              console.log('广告完成更新积分');
              this.updateCredit('adview', this.data.id, false);
              this.getUserMineInfo();
              this.setData({
                is_incentive: true
              });
              break;
          }
        } else {
          console.log('用户中途退出了');
          wx.showToast({
            title: '看完才能获得奖励哦~',
            icon: 'none'
          });
          // this.setData({
          //   is_incentive_cancel: true
          // });
        }
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
};

const openVideoAD = function () {
  console.log('打开激励视频');
  if (videoAd) {
    videoAd.show().catch(() => {
      // 失败重试
      videoAd.load()
        .then(() => videoAd.show())
        .catch(err => {
          this.setData({
            is_incentive_err: ture
          });
          console.log('激励视频广告显示失败');
        });
    });
  }
};

const getInsertAD = function () {
  API.getAdvertInsert().then(res => {
    if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-f6bf138b94118649'
        });
        interstitialAd.onLoad(() => {
          console.log('插屏 广告加载成功');
        });
        interstitialAd.onError(err => {
          console.log(err);
        });
        interstitialAd.onClose(res => {
            console.log('插屏 广告关闭');
        });
    }
  })
  .catch(err => {
    console.log(err);
  });
};

const openInsertAD = function () {
  console.log('打开插屏广告');
  if (interstitialAd) {
    setTimeout(function(){
      interstitialAd.show().catch((err) => {
        console.error(err);
      });
    }, 300);
  }
};

const getDetailAD = function () {
  API.getAdvertDetail().then(res => {
    let args = {};
    if (res.status == 200) {
      args.detailAds = res.data;
      this.setData(args);
    }
  })
  .catch(err => {
    console.log(err);
  });
};

module.exports = function (obj) {
  obj.getVideoAD = getVideoAD;
  obj.openVideoAD = openVideoAD;
  obj.getInsertAD = getInsertAD;
  obj.openInsertAD = openInsertAD;
  obj.getDetailAD = getDetailAD;
};
