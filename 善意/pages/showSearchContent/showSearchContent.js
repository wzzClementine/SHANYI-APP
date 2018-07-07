// pages/showSearchContent/showSearchContent.js
// 【动态详情界面】pages/untitled/untitled.js
var app = getApp()
Page({
  data: {
    //动态内容列表
    contentInfo: {}
  },
  //加载动态的详情[内容，用户信息，图片以及评论]
  onLoad: function (options) {
    console.log('showContent:', options.mid)
    var that = this
    //获取发表的内容(时间，内容，图片,赞和评论的数量等)
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/get/' + options.mid,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          contentInfo: res.data
        })
        console.log(res.data)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
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
        }else{
          var tmp_info = that.data.contentInfo
          tmp_info.likeAmount++
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
  comment: function (e) {
    console.log('comment-nav:', e.target.id)
    wx.navigateTo({
      url: '../writeComment/writeComment?mid=' + e.currentTarget.dataset.mid + 'index=' + e.currentTarget.dataset.index,
    })
  },
  previewImage:function(e){
    var that=this

    var i=0
    var pictureUrl=[]

    var index=e.currentTarget.dataset.index
    var pictures=this.data.contentInfo.images[index].md5

    for(i;i<this.data.contentInfo.images.length;i++)
    {
           pictureUrl.push(this.data.contentInfo.images[i].md5)
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