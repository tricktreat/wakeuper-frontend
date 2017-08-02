var utils = require('../../utils/util.js')
Page({
  data: {
    modalflag: false,
    about: null
  },
  modalOk: function () {
    this.setData({ modalflag: true })
  }
})