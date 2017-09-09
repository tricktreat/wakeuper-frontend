// pages/kcqdinfo/kcqdinfo.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kcxx:null,
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = JSON.parse(options.info)
    var kcxx = JSON.parse(options.kcxx)
    for (var i in info){
      info[i].qdsj = util.formatTime(new Date(info[i].qdsj ))
    }
    this.setData({ info: info})
    this.setData({ kcxx: kcxx })
    
  },

  
})