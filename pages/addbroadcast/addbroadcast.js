var app = getApp();
Page({
  data: {
    count: 0,
    nickname: null,
    content: null,
    openid: null,
    mybroadcast:null
  },
  onLoad: function () {
    this.fetchData()
    this.getMyBroadcast();
  },

  fetchData: function () {
    this.setData({ nickname: app.globalData.userInfo.nickName, openid: app.globalData.userInfo.openid });
  },
  countinput: function (e) {
    this.setData({ count: e.detail.value.length })
  },

  bindFormSubmit: function (e) {
    this.setData({ content: e.detail.value.content })
    wx.request({
      url: 'https://www.ibilidi.cn/addBroadcast',
      data: {
        openid: this.data.openid,
        nickname: this.data.nickname,
        content: this.data.content

      },
      success: function () {
        wx.showToast({
          title: '发送小广播成功！',
          icon: "success",
          image: '../../images/xihuanfill.png',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index',
              })
            }, 1000)
          }
        })
      }
    })
  },
  getMyBroadcast:function(){
    var that=this
    wx.request({
      url: 'https://www.ibilidi.cn/getBroadcast/userBroadcast',
      data: {
        openid: this.data.openid,
      },
      success: function (e) {
        that.setData({ mybroadcast:e.data.rows})
      }
    })
  },
  delBroadcast:function(e){
    var that = this
    var temp = this.data.mybroadcast
    temp.splice(e.target.dataset.index, 1);
    wx.request({
      data:{id:e.target.dataset.id},
      url: 'https://www.ibilidi.cn/delBroadcast',
      complete:function(){
        that.setData({ mybroadcast: temp })
      }
    })
  }
})


