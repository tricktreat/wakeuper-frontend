// pages/setinfo/setinfo.js
var util = require("../../utils/md5.js")
var app = getApp()
Page({
  data: {
    birthday: null,
    campus: null,
    school: null,
    userInfo: null,
    campusarray: ['天赐庄', '独墅湖', '阳澄湖'],
    schoolarray: ['文学院',
      '凤凰传媒学院',
      '社会学院',
      '政治与公共管理学院',
      '马克思主义学院',
      '外国语学院',
      '东吴商学院（财经学院）',
      '王健法学院',
      '教育学院',
      '艺术学院',
      '音乐学院',
      '体育学院',
      '金螳螂建筑学院',
      '数学科学学院',
      '物理与光电·能源学部',
      '材料与化学化工学部',
      '纳米科学技术学院',
      '计算机科学与技术学院',
      '电子信息学院',
      '机电工程学院',
      '沙钢钢铁学院',
      '纺织与服装工程学院',
      '城市轨道交通学院',
      '医学部'
    ],
  },

  onLoad: function (options) {
    this.initData()
  },
  initData: function () {
    this.setData({ userInfo: app.globalData.userInfo, birthday: app.globalData.userInfo['birthday'], campus: app.globalData.userInfo['campus'], school: app.globalData.userInfo['school'] })

  },
  setInfo: function (e) {
    e.detail.value['openid'] = this.data.userInfo.openid     //将openid放入表单信息中，之后一起提交到服务器
    if (e.detail.value['pwd']) {
      e.detail.value['pwd'] = util.md5(e.detail.value['pwd'])     //如果更新密码，则对表单填入的新密码加密
    } else {
      e.detail.value['pwd'] = app.globalData.userInfo.pwd       //如果未更新密码，则使用原密码（全局变量之中）更新信息
    }
    wx.request({
      data: e.detail.value,  //与下面picker的点击函数不同，这里form获取的picker的value值就是value中的值，而下方的e.details.value为点击索引
      url: 'https://www.ibilidi.cn/setInfo',
      method: "POST",
      complete: function (i) {
        if (i.statusCode == 200) {
          Object.assign(app.globalData.userInfo, e.detail.value)  //更新表单数据到全局变量
          wx.showToast({
            title: '修改成功',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../usercenter/usercenter',
                })
              }, 1000)
            }
          })
        } else {
          wx.showToast({
            title: '修改失败',
            mask: true,            
            icon: '',
            image: '../../images/biaoxingfill.png',
            duration: 1000
          })
        }
      },
    })
  },
  bindDateChange: function (e) {
    this.setData({ birthday: e.detail.value })   //这里的e.detail.value是填入的birthday数据
  },
  bindCampusChange: function (e) {
    this.setData({ campus: this.data.campusarray[e.detail.value] })   //这里的e.detail.value是选择的索引
  },
  bindSchoolChange: function (e) {
    this.setData({ school: this.data.schoolarray[e.detail.value] })   //这里的e.detail.value是选择的索引

  },
})