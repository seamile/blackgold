import { JIANGQIE_SETTING_AD, JIANGQIE_SETTING_SHARE } from 'api.js';
import { get } from 'rest.js';

function navigateBack() {
  wx.navigateBack({
    delta: 1,
    fail: function (_res) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  });
}
function getAD(that, showad) {
  get(JIANGQIE_SETTING_AD).then(res => {
    if (!res.data.posisionad) {
      return
    } else {
      res.data.posisionad = res.data.posisionad.split(',');
      that.setData({
        setAD: res.data
      })
      showad();
    }
  })
}

function getshare(that) {
  get(JIANGQIE_SETTING_SHARE).then(res => {
    that.setData({
      shares: res.data
    })
  })
}

export default {
  navigateBack,
  getAD,
  getshare,
}