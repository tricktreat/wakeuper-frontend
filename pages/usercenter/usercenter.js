var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  onShow: function () {
    this.initData()
  },
  initData: function () {
    this.setData({ userInfo: app.globalData.userInfo })
  },
  setInfo: function () {
    wx.navigateTo({
      url: '../setinfo/setinfo',
    })
  }
})