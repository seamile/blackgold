import { MP_SETTING_AD, MP_SETTING_SHARE } from 'api.js';
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
function getAD(self, showad) {
  get(MP_SETTING_AD).then(res => {
    if (!res.data.posisionad) {
      return
    } else {
      res.data.posisionad = res.data.posisionad.split(',');
      self.setData({
        setAD: res.data
      })
      showad();
    }
  })
}

function getshare(self) {
  get(MP_SETTING_SHARE).then(res => {
    self.setData({
      shares: res.data
    })
  })
}

export default {
  navigateBack,
  getAD,
  getshare,
}