// pages/index/index.js
var app = getApp()
Page({
  data: {
    imgUrls: {
      "WakeupFamily小程序号上线啦！": 'http://www.suda.edu.cn/upload/scene/201611/20161104160836.jpg',
      "我们在Wakeup俱乐部": 'http://www.suda.edu.cn/upload/scene/201611/20161112110908.jpg',
      "愿你不辜负每一个清晨！": 'http://www.suda.edu.cn/upload/scene/201611/20161112110808.jpg'
    },
    userInfo:{},
    item1show: false,
    item2show: false,
    item3show: false,
    item4show: false,
    item5show: false,
    mypost: true,
    inputValue: "",
    rankdata: [{ name: 'wakeup', headURL: '/images/avator.jpg', count: 999 }, { name: '南溪', headURL: '/images/nancy.jpg', count: 888 }],

    info: [{ name: "南溪", photourl: "/images/nancy.jpg", school: "计算机科学与技术学院", intro: "新的一年，希望自己更努力一点，希望家人快快乐乐，希望能遇见更多有趣的人，希望wakeup俱乐部继续进步，我们继续成长！" }, { name: "南溪", photourl: "/images/nancy.jpg", school: "计算机科学与技术学院", intro: "新的一年，希望自己更努力一点，希望家人快快乐乐，希望能遇见更多有趣的人，希望wakeup俱乐部继续进步，我们继续成长！" },]
  },
  onReady: function () {
    console.log(this.data.rankdata)
  },
  onLoad: function () {
    var token = wx.getStorageSync("token")
    app.appData.token = token
    console.log(app.appData.token)
    if (!app.appData.token) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } 
    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/user/userInfoWithSign',
      data: {
        token:app.appData.token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.resultCode==0){
          wx.redirectTo({
        url: '/pages/login/login',
      })
        }else{
        console.log(res.data)
        app.appData.userInfo=res.data.data
        that.setData({userInfo:app.appData.userInfo})
        console.log(app.appData.userInfo)
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {

      }
    })

    

    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/user/point/allPointRank', //仅为示例，并非真实的接口地址
      data: {
        limit: 10,
        offset: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        that.setData({ rankdata: res.data.data })
      }
    })

  },
  showitem1: function () {
    var show = this.data.item1show;
    this.setData({ item1show: !show })
  },
  showitem2: function () {
    var show = this.data.item2show;
    this.setData({ item2show: !show })
  },
  showitem3: function () {
    var show = this.data.item3show;
    this.setData({ item3show: !show })
  },
  showitem4: function () {
    var show = this.data.item4show;
    this.setData({ item4show: !show })
  },
  showitem5: function () {
    var show = this.data.item5show;
    this.setData({ item5show: !show })
  },
  sendmypost: function () {
    this.setData({ mypost: false })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  allrank: function () {
    var that = this;
    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/user/point/allPointRank', //仅为示例，并非真实的接口地址
      data: {
        limit: 10,
        offset: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ rankdata: res.data.data })
      }
    })
  },
  monthrank: function () {
    var that = this;
    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/user/point/monthPointRank', //仅为示例，并非真实的接口地址
      data: {
        limit: 10,
        offset: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ rankdata: res.data.data })
      },

    })
  },
})