// pages/showMyContent/showMyContent.js
var app = getApp()
Page({
  data:{
    contentInfo:[]
  },
  //！！！【此处仅加载此用户的动态内容！】
//加载动态的详情[内容，用户信息，图片以及评论]
  onLoad: function (options) {
    var that = this
    
    //获取发表的内容(时间，内容，图片,赞和评论的数量等)
    wx.request({
        url: 'https://www.shananchuanmei.com/shanyi/wx/moment/owner_get/' + wx.getStorageSync('open_id'),
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log('showMyContent',res.data)
          that.setData({
            contentInfo: res.data
          })
        }
      })
},
del:function(e){
  var tmp_mid = e.target.id
  console.log('del', tmp_mid)
  wx.showModal({
  title: '提示',
  content: '删除这条动态？',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
      wx.request({
    url: 'https://www.shananchuanmei.com/shanyi/wx/moment/delete/' + tmp_mid,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 1000
})
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
  
},
detail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../showContent/showContent?mid=' + e.currentTarget.id,
    })
  },
  comment: function (e) {
    console.log('comment-nav:', e.target.id)
    wx.navigateTo({
      url: '../writeComment/writeComment?mid=' + e.currentTarget.dataset.mid + 'index=' + e.currentTarget.dataset.index,
    })
  },
 like: function (e) {
    console.log('like:', e)
    var that = this
    var index = e.currentTarget.dataset.index
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/like',
      data: {
        mid: e.target.id,
        openId: wx.getStorageSync('open_id') || ''
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (!res.data.status) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.info,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          var tmp_info = that.data.contentInfo
          console.log(tmp_info, index)
          tmp_info[index].likeAmount++
          console.log('like_amount', tmp_info)
          that.setData({
            contentInfo: tmp_info
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  previewImage:function(e){
    var that=this

    var i=0
    var pictureUrl=[]
    var sIndex=e.currentTarget.dataset.sindex
    var index=e.currentTarget.dataset.index
    var pictures=this.data.contentInfo.data[sIndex].images[index].md5
    console.log(pictures)
    for(i;i<this.data.contentInfo.data[sIndex].images.length;i++)
    {
           pictureUrl.push(this.data.contentInfo.data[sIndex].images[i].md5)
    }
    
    wx.previewImage({
      current:pictures, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: pictureUrl,
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
})