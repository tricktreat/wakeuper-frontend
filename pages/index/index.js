Page({
  data: {
    shake: 10,
    indexmenu: [
      {
        'icon': '../../images/icon_01.png',
        'text': '打卡记录',
        'url': '../signrecord/signrecord'
      },
      {
        'icon': '../../images/icon_13.png',
        'text': '早起排行',
        'url': '../rankinfo/rankinfo'
      },

      {
        'icon': '../../images/icon_27.png',
        'text': '校园喇叭',
        'url': '../addbroadcast/addbroadcast'
      },
      {
        'icon': '../../images/icon_11.png',
        'text': '教务信息',
        'url': '../jwxx/jwxx'
      },

      {
        'icon': '../../images/icon_07.png',
        'text': '我爱运动',
        'url': '../line/line'
      },
      {
        'icon': '../../images/icon_05.png',
        'text': '社团招新',
        'url': '../welcome/welcome'
      },
      {
        'icon': '../../images/icon_03.png',
        'text': '对外合作',
        'url': '../cooperate/cooperate'
      },
      {
        'icon': '../../images/icon_09.png',
        'text': '关于我们',
        'url': '../about/about'
      }
    ],
    imgUrls: [],
    broadcast: []
  },
  onShow: function () {
    this.initData()

  },
  initData: function () {
    var that = this
    wx.request({
      data:{n:3},
      url: 'https://www.ibilidi.cn/getBroadcast/allBroadcast',
      success: function (res) {
       that.setData({ broadcast: res.data.rows });
      }
    });
    wx.request({
      url: 'https://www.ibilidi.cn/getIndexImg',
      success: function (res) {
        that.setData({ imgUrls: res.data.rows });
      }
    });
  },
  onShareAppMessage:function(){
    title:"苏州大学wakeup俱乐部"
  }
})