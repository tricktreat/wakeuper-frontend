// pages/jwxx/jwxx.js.
var app = getApp()
Page({

  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "salmon"],
    kcxx: null,
    kc: [],
    activate: "1",
    week: 5

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
        //console.log(e.data)
        if (e.data.state == 2002 || e.data.state == 403) {
          wx.showToast({
            title: '学号和网关密码不匹配，请完善相关信息 ！',
            image: "../../images/yonghufill.png",
            complete: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../setinfo/setinfo',
                })
              }, 1500)
            }
          })
        }
        if (e.data.state == 200) {
          that.setData({ token: e.data.data.token })
          that.getLessons()
        }
      }
    })

  },
  bindLessons: function (e) {
    var that = this
    that.setData({ activate: e.target.dataset.activate })
    that.getLessons()
  },


  getLessons: function () {
    // var that = this
    // wx.request({
    //   url: 'https://www.ibilidi.cn/getMylessons',
    //   data: { token: this.data.token },
    //   complete: function (e) {
    //     that.setData({ kc: e.data.data })
    //     console.log(e.data.data )
    //   }
    // })
    var that = this
    wx.request({
      url: 'https://www.ibilidi.cn/getSchedule',
      data: { token: this.data.token, week: this.data.week },
      complete: function (e) {
        that.setData({ kcxx: e.data.data })
        console.log(e.data.data)
      }
    })
  },

  bindGrades: function (e) {

    this.setData({ activate: e.target.dataset.activate })
  },
  nextWeek: function () {
    var a = this.data.week + 1
    if (a > 17) {
      a = 17
    } else {
      this.setData({ week: a })
      this.getLessons()
    }
  },
  preWeek: function () {
    var a = this.data.week - 1
    if (a < 1) {
      a = 1
    } else {
      this.setData({ week: a })
      this.getLessons()
    }
  }
})