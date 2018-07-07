var util = require('../../utils/util.js')

Page({
  data: {
    moment: {
      user: {},
      content: '',
      time: '',
    },
    mid: ''
  },
  onLoad: function (options) {
    console.log(options.mid)
    this.setData({
      mid: options.mid
    })
  },
  //获取输入的【内容】和【发表评论的用户的信息】并存入数据库
  textblur: function (e) {
    console.log(e.detail.value)
  },
  //点击发表按钮跳转到社区界面
  submit: function (e) {
    console.log(e.detail.value.textarea, )
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/create_comment',
      data: {
        mid: this.data.mid,
        openId: wx.getStorageSync('open_id') || '',
        content: e.detail.value.textarea
      },
      header:{
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.status ? '评论成功' : '评论失败',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack()
              // wx.switchTab({
              //   url: '../community/community'
              // })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete

      }
    })
  }
})