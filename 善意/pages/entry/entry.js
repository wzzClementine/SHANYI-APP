var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    item: {},
    attachments: {},
    footnotes: {},
    aid: ''
  },
  // 监听页面加载
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/activity/get/' + options.index,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        // console.log(res.data.data[0])
        var content = res.data.data.content
        WxParse.wxParse('content', 'html', content, that);
        console.log('title',res.data.data)
        that.setData({
          item: res.data.data,
          aid: options.index
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
    // 提取当前词条数据
    // var entryData = app.globalData.api.data[Number(options.index)]
    // console.dir(entryData)
    // // 设定数据
    // this.setData({
    //   item: entryData,
    //   attachments: entryData.attachments,
    //   footnotes: entryData.footnotes
    // }),
    // 设定导航栏标题
    // wx.setNavigationBarTitle({
    //   title: entryData.title
    // })
  },
  // 监听页面初次渲染完成
  onReady() {
    console.log('Entry Page: onReady.')
  },
  // 监听页面显示
  onShow() {
    console.log('Entry Page: onShow.')
  },
  // 监听页面隐藏
  onHide() {
    console.log('Entry Page: onHide.')
  },
  // 监听页面卸载
  onUnload() {
    console.log('Entry Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh() {
    console.info('Entry Page: onPullDownRefresh.')
  },
  join: function () {
    console.log('submit', this.data)
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/activity/participant/add',
      data: {
        aid: this.data.aid,
        openId: wx.getStorageSync('open_id')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.info || '报名成功',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
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
  },
  onShareAppMessage: function (e) {
    return {
      title:this.data.item.name ,
      desc: '一起来参加公益活动吧!',
      path: '/page/entry?aid=aid'
    }
  },
  alike:function(){
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/activity/like',
      data: {
        aid: this.data.aid,
        openId: wx.getStorageSync('open_id')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.info || '成功',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})
