// pages/about/about.js
var utils=require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about:null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAboutUs();
  },

  getAboutUs:function(){
    var that=this
    wx.request({
      url: 'https://www.ibilidi.cn/getAboutUs',
      complete:function(e){
        var a = utils.formatData(new Date(e.data.rows[0].date))
        e.data.rows[0].date = a
        that.setData({ about: e.data.rows[0]})
        console.log(e.data.rows[0].content)
      }
    })
  },

  goto:function(){
    wx.redirectTo({
      url: '../welcome/welcome',
    })
  },
  /**
   * 用户点击右上角分享
   * 
   */
  onShareAppMessage: function () {
  
  }
})