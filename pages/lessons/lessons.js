// pages/lessons/lessons.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  sign: function (e) {

    util.kcqd(e.currentTarget.dataset, app.globalData.userInfo)
  },

  showinfo: function (e) {

    util.showkcqd(e.currentTarget.dataset, app.globalData.userInfo)

  },

  getLessons: function () {
    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/getSchedule',
      data: { token: this.data.token },
      complete: function (e) {
        if (e.data.data.slist.length == 0) {
          wx.showToast({
            title: '今天没有课程。',
            success: function () {

              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)

            }
          })
        } else {
          that.setData({ kcxx: e.data.data.slist })
        }
      }
    })
  },
  onShow: function () {
    this.loginJWXT();

  },

  loginJWXT: function () {

    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/loginJWXT',
      method: "POST",
      data: { u: app.globalData.userInfo.studentid, p: app.globalData.userInfo.pwd },
      complete: function (e) {
        if (e.data.state == 2002 || e.data.state == 403) {
          wx.showToast({
            title: '学号和网关密码不匹配，请完善相关信息 ！',
            image: "../../images/yonghufill.png",
            complete: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../setinfo/setinfo',
                })
              }, 1500)
            }
          })
        }
        if (e.data.state == 200) {
          that.setData({ token: e.data.data.token })
          console.log(e.data)
          that.getLessons()
        }
      }
    })

  },

  onShareAppMessage: function () {
    return {
      title: "考勤平台"
    }
  }
})