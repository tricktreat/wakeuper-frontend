var util = require('/utils/util.js')
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    var that = this
    //调用登录接口
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
        wx.login({
          success: function (res) {
            wx.request({
              data: { code: res.code },
              url: 'https://www.ibilidi.cn/getOpenid',
              complete: function (res) {
                that.globalData.userInfo.openid = res.data.openid
                that.registerUser()
              }
            })
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.request({
      data: { openid: this.globalData.userInfo.openid },
      url: 'https://www.ibilidi.cn/getUserInfo',
      complete: function (res) {

        if (res.data.rows.length == 0) {

          wx.request({
            data: that.globalData.userInfo,
            url: 'https://www.ibilidi.cn/userRegister',
            complete: function (e) {
              console.log("全局数据为：",that.globalData.userInfo)
            }
          })
        }
        else {
          Object.assign(that.globalData.userInfo, res.data.rows[0])
          if (that.globalData.userInfo['birthday']) {
            that.globalData.userInfo['birthday'] = util.formatData(new Date(that.globalData.userInfo.birthday))
          }
          console.log("全局数据为：",that.globalData.userInfo)
        }
      }
    })
    this.signIn()
  },
  signIn: function () {
    var that = this
    var time = new Date()
    time.getHours() == 6 || (time.getHours() == 7 && time.getMinutes() <= 20)
    if (1) {
      wx.request({
        url: 'https://www.ibilidi.cn/getLastSignTime',
        data: { openid: this.globalData.userInfo.openid, offset:0,n: 1 },
        complete: function (e) {
          if (!e.data.rows[0]) {
              wx.request({
                url: 'https://www.ibilidi.cn/signIn',
                data: { signtime: util.formatTime(time), openid: that.globalData.userInfo.openid },
                complete: function () {
                  wx.showModal({
                    title: '签到成功！',
                    content: "早起时间\r\n" + time.toLocaleString()
                  })
                }
              })
          }else{
            if(new Date(e.data.rows[0].signtime).getDate() != time.getDate()){
              wx.request({
                url: 'https://www.ibilidi.cn/signIn',
                data: { signtime: util.formatTime(time), openid: that.globalData.userInfo.openid },
                complete: function () {
                  wx.showModal({
                    title: '签到成功！',
                    content: "早起时间\r\n" + time.toLocaleString()
                  })
                }
              })
            }
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  }
})