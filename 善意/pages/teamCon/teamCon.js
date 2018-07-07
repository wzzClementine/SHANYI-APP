//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    team: {

    },
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('person:onLoad', options)
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/user/corp/get/' + options.t_uid, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status) {
          that.setData({
            team: res.data.data[0]
          })
        }
        console.log(res.data.data)
      }
    });
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/activity/get_by_uid/' + options.t_uid, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status) {
          that.setData({
            aList: res.data
          })
        }
        console.log(res.data.data)
      }
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: this.data.team.name,
      desc: '加入我们的社团！',
      path: '/page/teamCon?t_uid=t_uid'
    }
  },
  turnTo: function (e) {
    wx.navigateTo({
      url: '../showTeamactivity/showTeamactivity',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  previewImage: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index

    wx.previewImage({
      current: this.data.testImage[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: this.data.testImage,
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
})
