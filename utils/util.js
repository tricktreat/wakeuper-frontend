function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


function formatData(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()


  return [year, month, day].map(formatNumber).join('/')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isSignToday(openid) {
  var time = new Date()
  var flag = 1
  wx.request({
    url: 'https://www.ibilidi.cn/getLastSignTime',
    data: { openid: openid, offset: 0, n: 1 },
    complete: function (e) {
      if (new Date(e.data.rows[0].signtime).getDate() != time.getDate()) {
        return 0
      }
      else {
        return 1
      }
    }
  })
}

function showkcqd(kcxx, userinfo) {
  var sj = convertsj(kcxx.kssj)
  wx.request({
    data: { limit: sj.getTime(), qddd: kcxx.qddd },
    url: 'https://www.ibilidi.cn/getKCrec',
    success: function (e) {
      wx.navigateTo({
        url: '../kcqdinfo/kcqdinfo?info=' + JSON.stringify(e.data.rows) + '&kcxx=' + JSON.stringify(kcxx),
      })
    }
  })


}


function convertsj(str) {
  var now = new Date()
  var elements = str.split(":")
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(elements[0]), parseInt(elements[1]))
}


function kcqd(kcxx, userinfo) {
  if (!kcxx.qddd) {
    wx.showModal({
      showCancel: false,

      title: '考勤失败',
      content: '暂不支持该课程签到！',
    })
    return
  }
  
  var sj = convertsj(kcxx.kssj)
  wx.request({
    data: { limit: sj.getTime(), qddd: kcxx.qddd, openid: userinfo.openid },
    url: 'https://www.ibilidi.cn/getMyKCrec',
    success: function (e) {
      if (e.data.rows.length == 0) {
        wx.showLoading({
          mask:true,
          title: '考勤中...',
        })
        // 引入SDK核心类
        var QQMapWX = require('qqmap-wx-jssdk.js');

        // 实例化API核心类
        var demo = new QQMapWX({
          key: '6XABZ-X5ZW4-73VUU-DZ5O7-3KSZV-Z2BWB' // 必填
        });
        var diff = (new Date() - convertsj(kcxx.kssj)) / 60000
        wx.request({
          url: 'https://www.ibilidi.cn/getJXL',
          data: { jxl: kcxx.qddd.slice(0, 3) },
          fail: function () {
            wx.hideLoading()
            wx.showModal({
              showCancel: false,

              title: '考勤失败',
              content: '暂不支持该教学区域的考勤！',
            })
          },
          success: function (e) {

            demo.calculateDistance({
              to: [{
                latitude: e.data.rows[0].lat,
                longitude: e.data.rows[0].lng
              }],
              fail: function () {
                wx.hideLoading()
                wx.showModal({
                  showCancel: false,

                  title: '考勤失败',
                  content: '获取位置信息失败，请重新尝试！',
                })
              },
              success: function (res) {

                if (res.result.elements[0].distance > e.data.rows[0].distancelimit) {
                  wx.hideLoading()
                  wx.showModal({
                    showCancel: false,

                    title: '考勤失败',
                    content: '距离' + kcxx.qddd + '：' + res.result.elements[0].distance.toFixed(0) + '米\n请在对应教室签到！',
                  })


                } else {
                  if (diff < 0) {
                    wx.hideLoading()
                    wx.showModal({
                      showCancel: false,

                      title: '考勤失败',
                      content: '距离上课时间还有：' + Math.abs(diff).toFixed(0) + '分钟',
                    })
                  } else {
                    if (diff > e.data.rows[0].timelimit) {
                      wx.hideLoading()
                      wx.showModal({
                        showCancel: false,
                        title: '考勤失败',
                        content: '迟到' + diff.toFixed(0) + '分钟，禁止签到！',
                      })
                    } else {
                      wx.request({
                        data: { openid: userinfo.openid, xm: userinfo.name, bj: "null", xh: userinfo.studentid, kcdm: kcxx.kcdm, kcmc: kcxx.kcmc, qddd: kcxx.qddd },
                        url: 'https://www.ibilidi.cn/kcqd',
                        success: function (e) {
                          console.log(e)
                          wx.hideLoading()
                          wx.showToast({
                            title: '考勤成功！',
                          })
                        }
                      })

                    }
                  }
                }
              }
            });

          }
        })

      } else {
        wx.showModal({
          showCancel: false,
          title: '已经签过到了!',
          content: '不能重复签到...',
        })
      }
    }
  })




}

module.exports = {
  formatTime: formatTime,
  formatData: formatData,
  isSignToday: isSignToday,
  kcqd: kcqd,
  showkcqd: showkcqd
}
