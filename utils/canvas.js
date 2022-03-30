const API = require('../utils/api');

// 判断字符串长度
const StringLength = function (string) {
  return string.replace(/[\u0391-\uFFE5]/g, "aa").length;
};

// 清理字符串 HTML 标签
const removeHTML = function (s) {
  let str = s.replace(/<\/?.+?>/g, "");
  str = str.replace(/[\r\n]/g, ""); //去掉回车换行
  return str.replace(/ /g, "");
};

// 当前日期星期几
const CurrentDate = function () {
  let today = new Date();
  let toDays = {};
  toDays.Year = today.getFullYear();
  toDays.Month = today.getMonth();
  toDays.Day = today.getDate();
  if (today.getDay() == 0) {
    toDays.Week = "星期日";
  }
  if (today.getDay() == 1) {
    toDays.Week = "星期一";
  }
  if (today.getDay() == 2) {
    toDays.Week = "星期二";
  }
  if (today.getDay() == 3) {
    toDays.Week = "星期三";
  }
  if (today.getDay() == 4) {
    toDays.Week = "星期四";
  }
  if (today.getDay() == 5) {
    toDays.Week = "星期五";
  }
  if (today.getDay() == 6) {
    toDays.Week = "星期六";
  }
  return toDays;
};

const CreatCanvas = function (currentImage) {
  wx.showLoading({
    title: '海报制作中...',
  });
  let args = {};
  let name = '';
  let prefix = '';
  let qrcode = '';
  let avatar = '';
  let avatarUrl = '';
  let description = '';
  if (this.data.user) {
    avatarUrl = this.data.user.avatarUrl;
  }
  args.id = this.data.id;
  args.path = "/pages/detail/preview?id=" + this.data.id + "&current=" + this.data.current + "&isShared=true";
  // 获取网站基本信息
  API.getSiteInfo().then(res => {
    name = res.name;
    description = res.description;
  })
    .catch(err => {
      console.log(err);
    });
  // 获取页面二维码
  API.getCodeImg(args).then(res => {
    if (res.status === 200) {
      let qrcodeurl = res.qrcode;
      let coverurl = currentImage;
      wx.downloadFile({
        url: qrcodeurl,
        success: res => {
          if (res.statusCode === 200) {
            qrcode = res.tempFilePath;
            console.log("二维码图片本地位置：" + res.tempFilePath);
            wx.downloadFile({
              url: coverurl,
              success: res => {
                if (res.statusCode === 200) {
                  prefix = res.tempFilePath;
                  console.log("文章图片本地位置：" + res.tempFilePath);
                  if (avatarUrl) {
                    wx.downloadFile({
                      url: avatarUrl,
                      success: res => {
                        if (res.statusCode === 200) {
                          avatar = res.tempFilePath;
                          console.log("用户头像本地位置：" + res.tempFilePath);
                          if (qrcode && prefix) {
                            let data = {};
                            data.name = name;
                            data.prefix = prefix;
                            data.qrcode = qrcode;
                            data.avatar = avatar;
                            data.description = description;
                            this.CanvasImage(data);
                          } else {
                            console.log(res);
                            wx.showToast({
                              title: "生成失败...",
                              mask: true,
                              icon: 'loading',
                              duration: 2000
                            });
                            return false;
                          }
                        }
                      }
                    });
                  } else {
                    wx.showToast({
                      title: '获取相关图像...',
                      icon: 'success',
                      duration: 900,
                    });
                    if (qrcode && prefix) {
                      let data = {};
                      data.name = name;
                      data.prefix = prefix;
                      data.qrcode = qrcode;
                      data.avatar = avatar;
                      data.description = description;
                      this.CanvasImage(data);
                    } else {
                      // console.log(res);
                      wx.showToast({
                        title: "生成失败...",
                        mask: true,
                        icon: 'loading',
                        duration: 2000
                      });
                      return false;
                    }
                  }
                }
              }
            });
          }
        }
      });
    }
  })
    .catch(err => {
      console.log(err);
    });
};

const CanvasImage = function (data) {
  //console.log(data)
  let that = this;
  let args = {};
  let today = CurrentDate();
  let todayMonth = Number(today.Month) + Number(1);
  if (todayMonth < 10) { todayMonth = '0' + todayMonth };
  let YearAndMonth = today.Year + "年" + todayMonth + "月";
  let prefix = data.prefix;
  let qrcode = data.qrcode;
  let avatar = '';
  let name = data.name;
  let description = data.description ? data.description : "你的朋友正在阅读什么精彩的内容呢？";
  let information = description + " -- 『" + name + "』";
  if (data.avatar) {
    avatar = data.avatar;
  } else {
    avatar = '../../images/icon.png';
  }
  let context = wx.createCanvasContext('prefix');
  let gradient = context.createLinearGradient(0, 0, 0, 150);
  // args.title = this.data.detail.title.rendered
  // args.excerpt = this.data.detail.excerpt.rendered
  wx.showToast({
    title: '制作成功...',
    icon: 'success',
    duration: 900,
  });
  context.setFillStyle('#ffffff');//填充背景色
  context.fillRect(0, 0, 750, 1334);
  context.drawImage(prefix, 0, 0, 750, 1134);//绘制首图
  context.setFillStyle('#ffffff');//填充背景色
  context.fillRect(0, 1134, 750, 1334);
  context.drawImage(qrcode, 40, 1174, 120, 120);//绘制二维码
  context.setFillStyle("#151617");
  context.setFontSize(28);
  context.setTextAlign('left');
  context.fillText(information.substring(0, 18), 200, 1200);
  context.fillText(information.substring(18, 36), 200, 1240);
  context.setFillStyle("#676869");
  context.setFontSize(24);
  context.setTextAlign('left');
  context.fillText("长按识别小程序码，看更多精选壁纸", 200, 1285);
  // CanvasTextContent(context, args)
  context.draw();
  setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: 'prefix',
      success: function (res) {
        console.log("海报图片路径：" + res.tempFilePath);
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath]
        });
        that.setData({
          modalTarget: '',
          prefix: res.tempFilePath
        });
      },
      fail: function (res) {
        console.log(res);
      }
    },this);
  }, 900);
};

const CanvasTextContent = function (context, args) {
  context.setFillStyle("#000000");
  let title = removeHTML(args.title);
  let excerpt = removeHTML(args.excerpt);
  if (StringLength(title) <= 17) {
    //14字以内绘制成一行，美观一点
    context.setFontSize(38);
    context.setTextAlign('left');
    context.fillText(title, 30, 580);
  } else {
    //题目字数很多的，只绘制前34个字（如果题目字数在15到18个字则也是一行，不怎么好看）
    context.setFontSize(30);
    context.setTextAlign('left');
    context.fillText(title.substring(0, 18), 30, 560);
    if (StringLength(title) > 28) {
      context.fillText(title.substring(18, 28) + "...", 30, 600);
    } else {
      context.fillText(title.substring(18, 28), 30, 600);
    }
  }
  context.setFillStyle("#000000");
  context.beginPath();//分割线
  context.moveTo(30, 640);
  context.lineTo(670, 640);
  context.stroke();
  context.setFillStyle("#666666");
  context.setFontSize(28);
  context.setTextAlign('left');
  for (let i = 0; i <= 66; i += 22) {
    //摘要只绘制前66个字，这里是用截取字符串
    context.fillText(excerpt.substring(i, i + 22), 35, 700 + i * 2);
  }
  context.stroke();
  context.save();
  wx.hideLoading();
};



module.exports = function (obj) {
  obj.CreatCanvas = CreatCanvas;
  obj.CanvasImage = CanvasImage;
};
