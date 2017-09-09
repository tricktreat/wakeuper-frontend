var util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    signrec: null,
    userInfo: null,
  },
  onLoad: function () {
    this.initData()
    this.getsignrec()
  },
  initData: function () {
    this.setData({ userInfo: app.globalData.userInfo })
  },
  getsignrec: function () {
    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/getLastSignTime',
      data: { openid: this.data.userInfo.openid, n: 7, offset: 0 },
      complete: function (e) {
        var data = e.data.rows
        console.log(data)
        for (var i in data) {
          var item = new Date(data[i].signtime)
          data[i]['day'] = item.getDay()
          if (data[i]['day'] == 0) {
            data[i]['day'] = 7
          }
          data[i].signtime = util.formatTime(item)
        }
        
        that.setData({ signrec: e.data.rows })
      }
    })
  }

})