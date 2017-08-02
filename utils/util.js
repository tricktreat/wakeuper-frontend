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
  var flag=1
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

module.exports = {
  formatTime: formatTime,
  formatData: formatData,
  isSignToday: isSignToday
}
