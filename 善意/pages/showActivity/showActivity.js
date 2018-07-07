
Page({
  data:{
    Activity:[{
      organizer:'',
      time:'',
      name:'',
      summary:'',
      participantSum:'',//参与者数量和
      picture:[]//仅需要一张图作背景图
    }],
  },

  onLoad:function(options){
      //从数据库中获得所有参加过的活动信息
    wx.request({
      url: 'https://URL',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    //获取每一条活动信息的第一张图片
    wx.request({
      url: 'https://URL',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }, 
})