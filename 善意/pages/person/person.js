//【个人界面】 pages/untitled(1)/untitled(1).js
var app = getApp()
Page({
  data: {
    array: ['请选择社团', '重庆大学五彩石协会','重庆大学青年志愿者协会','重庆大学爱心社', '绿色青年志愿者服务队', '重庆大学善意协会'],
    objectArray: [
      {
        id: 0,
        name: '请选择社团'
      },
      {
        id: 1,
        name: '重庆大学五彩石协会'
      },
      {
        id: 2,
        name: '重庆大学青年志愿者协会'
      },
       {
        id: 3,
        name: '重庆大学爱心社'
      },
      {
        id: 4,
        name: '绿色青年志愿者服务队'
      },
      {
        id: 5,
        name: '重庆大学善意协会'
      }
    ],
    index: 0,
    userInfo: {},
    label: '点击选择标签',
    signValue:'编辑个性签名',
    Activity: {
      content: '善意'
    },
    goodSum:0
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/activity/myrecently/' + wx.getStorageSync('open_id'),
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('myrecently:', res.data)
        that.setData({
          rencentlyAct: res.data.data
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    wx.request({
        url: 'https://www.shananchuanmei.com/shanyi/wx/moment/owner_get/' + wx.getStorageSync('open_id'),
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          var i=0
          var good=0
          for(i;i<res.data.data.length;i++){
             good+=res.data.data[i].likeAmount
          }
          console.log('person',res.data)
          console.log('person',res.data.data[0])
          that.setData({
            contentInfo: res.data,
            goodSum:good
          })
        }
      })
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //获取标签
    wx.getStorage({
      key: 'label',
      success: function (res) {
        that.setData({
          label: res.data
        })
      },
    })
    wx.getStorage({
      key: 'sign',
      success: function(res){
        // success
        that.setData({
          signValue:res.data
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
    wx.getStorage({
      key: 'club',
      success: function(res){
        // success
        that.setData({
          index:res.data
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },

  //选择标签
  chooseLabel: function (e) {
    wx.redirectTo({
      url: '../chooseLabel/chooseLabel',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      key: 'club',
      data: e.detail.value,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: this.data.userInfo.nickName,
      desc: '来善小意看看我做了哪些公益活动!',
      path: '/page/person'
    }
  },
  //将个性签名的信息存入数据库
  save: function (e) {
     wx.setStorage({
       key: 'sign',
       data: e.detail.value,
       success: function(res){
         // success
       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
     })
  },
  //跳转到参加过的活动界面
  showActivity: function (e) {
    wx.navigateTo({
      url: '../showActivity/showActivity'
    })
  },
  //跳转到显示动态的界面
  showMyContent: function (e) {
    wx.navigateTo({
      url: '../showMyContent/showMyContent'
    })
  }
})
