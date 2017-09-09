var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo:null,
    signinday:0
  },

  onShow: function () {
    this.initData()
  },
  initData: function () {
    var that = this
    that.setData({ userInfo: app.globalData.userInfo })
    wx.request({
      url: 'https://www.ibilidi.cn/getMyAllRec',
      data: { openid: app.globalData.userInfo.openid},
      complete:function(e){
        that.setData({ signinday: e.data.rows[0].num })
        
      }
    })
  },
  setInfo: function () {
    wx.navigateTo({
      url: '../setinfo/setinfo',
    })
  }
})