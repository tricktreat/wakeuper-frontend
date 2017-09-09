// pages/rankinfo/rankinfo.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    userInfo: null,
    rankinfo: null,
    tip:"今日打卡排行"
  },


  onLoad: function (options) {
    this.initData()
  },
  initData: function () {
    this.setData({ userInfo: app.globalData.userInfo })
    this.getMyMonthRec()
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
        that.setData({ rankinfo: data,tip: "今日打卡排行" })
      }
    })
  },
  getMyMonthRec: function () {
    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/getMyMonthRec',
      data: { openid: that.data.userInfo.openid },
      complete: function (e) {
        var data = e.data.rows
        for (var i in data) {
          data[i].signtime = util.formatTime(new Date(data[i].signtime))
        }
        that.setData({ rankinfo: data, tip: "我的本月打卡"})
      }
    })

  },
  change:function(){
    if (this.data.tip == "今日打卡排行"){
      this.getMyMonthRec()
    }else{
      this.getRankInfo()
    }
  }
})