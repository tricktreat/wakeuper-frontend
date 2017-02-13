// pages/circle/circle.js


var app = getApp()
Page({
  data: {
    imgUrls: {
      "WakeupFamily小程序号上线啦！": 'http://www.suda.edu.cn/upload/scene/201611/20161104160836.jpg',
      "我们在Wakeup俱乐部": 'http://www.suda.edu.cn/upload/scene/201611/20161112110908.jpg',
      "愿你不辜负每一个清晨！": 'http://www.suda.edu.cn/upload/scene/201611/20161112110808.jpg'
    },
    sharecontent:{},
    userInfo: {}
  },
  onLoad:function(){
    var that=this
    wx.request({
      url: 'http://121.42.163.226:8080/wakeup/commonShare/getCommonShare',
      data: {
        token:app.appData.token,
        limit:10,
        offset:0
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({sharecontent:res.data.data})
        console.log(res.data.data)
      }
    })
    
  }
  
})