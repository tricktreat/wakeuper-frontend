// pages/rankinfo/rankinfo.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    userInfo: null,
    rankinfo: null,
  },


  onLoad: function (options) {
    this.initData()



  },
  initData: function () {
    this.setData({ userInfo: app.globalData.userInfo })
    this.getRankInfo()
  },
  getRankInfo: function () {
    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/getSignRecToday',
      complete: function (e) {
        var data = e.data.rows
        for (var i in data) {
          data[i].signtime = util.formatTime(new Date(data[i].signtime))
        }
        that.setData({ rankinfo: data })
      }
    })
  }
})