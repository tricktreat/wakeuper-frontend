var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec'
    });
  },
  onLoad: function (e) {
    var that=this
    this.getRunDate()
    
  },
  getRunDate: function () {
    var that = this
    wx.getWeRunData({
      complete: function (e) {
        wx.request({
          data: {
            sessionkey: app.globalData.userInfo.sessionkey,
            encryptedData: e.encryptedData,
            iv: e.iv
          },
          url: 'https://www.ibilidi.cn/dataCrypt',
          complete: function (e) {
            console.log(e)
            var time = []
            var steps = []
            for (var i in e.data.stepInfoList) {
              time.push(new Date(e.data.stepInfoList[i].timestamp * 1000).toLocaleDateString())
              steps.push(e.data.stepInfoList[i].step)
              that.setData({ time: time, steps: steps })
              var windowWidth = 320;
              try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
              } catch (e) {
                console.error('getSystemInfoSync failed!');
              }

              lineChart = new wxCharts({
                canvasId: 'lineCanvas',
                type: 'line',
                categories: time,
                animation: false,
                background: '#f5f5f5',
                series: [
                  {
                    name: '近30天步数',
                    data: steps,
                    // format: function (val, name) {
                    //   return val.toFixed(2) + '万';
                    // }
                  }],
                xAxis: {
                  disableGrid: true
                },
                yAxis: {
                  title: '每日步数 (步)',
                  // format: function (val) {
                  //   return val.toFixed(2);
                  // },
                  min: 0
                },
                width: windowWidth,
                height: 240,
                dataLabel: false,
                dataPointShape: true,
                extra: {
                  lineStyle: 'curve'
                }
              });
            }
          }
        })
      }
    })
   
  }
});