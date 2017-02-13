// pages/login/login.js
var app = getApp()
Page({
  data: {
    inputuserid: null,
    inputpassword: null
  },
  inputuserid: function (e) {
    this.setData({ inputuserid: e.detail.value })
  },
  inputpassword: function (e) {
    this.setData({ inputpassword: e.detail.value })
  },
  loginbtn: function () {

    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/user/login',
      data: {
        phone: this.data.inputuserid,
        password: this.data.inputpassword
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      complete: function (res) {
        if (res.data.resultCode==200) {
          
          app.appData.userInfo = res.data.data;
          wx.setStorage({

            key: 'token',
            data: app.appData.userInfo.token,
          })

          wx.switchTab({
            url: '/pages/index/index',
          })

        }
        console.log(res.data)
      }

    })
    
  }
})