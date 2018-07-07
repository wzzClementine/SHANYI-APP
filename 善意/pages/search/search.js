//【社区界面】index.js
var app = getApp()
Page({
  data: {
    searchInfo: [],
    history: [],
  },
  //动态内容列表
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'searchHistory',
      success: function (res) {
        that.setData({
          history: res.data
        })
      },
    })
  },
  //搜索框
  searchInfo: function (e) {
     var that = this
    console.log(e.detail.value)
    that.setData({
      searchInfo: e.detail.value
    })
    console.log(this.data.searchInfo)
    if (this.data.searchInfo != '') {
      wx.request({
        url: 'https://www.shananchuanmei.com/shanyi/wx/moment/search/' + this.data.searchInfo,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res.data)
          that.setData({
            contentInfo: res.data.data
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
  },
  //存储搜索历史
  saveHistory: function (e) {
    var that = this
    if (e.detail.value != '') {
      this.data.history.push(e.detail.value)
      wx.setStorage({
        key: 'searchHistory',
        data: this.data.history,
      })
    }
  },
  showSearch: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../showSearchContent/showSearchContent?mid=' + e.currentTarget.id,
    })
  },
  deleteHistory: function (e) {
    var that =this
    wx.clearStorage({
      key: 'searchHistory',
      success: function (res) {
        // success
        that.setData({
          history:null
        })
        wx.showToast({
          title: '清空成功',
          icon: 'success',
          duration: 1000
        })
      },
    })
  },
detail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../showSearchContent/showSearchContent?mid=' + e.currentTarget.id,
    })
  },
})
