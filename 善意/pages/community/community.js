//【社区界面】index.js
var app = getApp()
Page({
  data: {
    image:['../../image/com_like.png','../../image/goodAfter.png'],
  },
  /*点击跳转到发动态的界面*/
  bindViewTap: function () {
    wx.redirectTo({
      url: '../writeContent/writeContent'
    })
  },
  onLoad: function (e) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    console.log('Load', e)
    //获取发表的内容(返回aid,content,mid,time,uid)
    // else {
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/get_all',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('moment_get_all', res.data)
        that.setData({
          contentInfo: res.data.data
        })
        console.log('all_after', that.data.contentInfo)
      }
    })
    // }

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
            contentInfo: tmp_info,
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

  onPullDownRefresh: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 4000)
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/get_all',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log('success', res.data)
        that.setData({
          contentInfo: res.data.data
        })
        wx.hideLoading()
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //跳转到写评论的界面
  comment: function (e) {
    console.log('comment-nav:', e.target.id)
    wx.navigateTo({
      url: '../writeComment/writeComment?mid=' + e.currentTarget.dataset.mid + 'index=' + e.currentTarget.dataset.index,
    })
  },
  //点击文字跳转到动态详情的界面
  detail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../showContent/showContent?mid=' + e.currentTarget.id,
    })
  },
  //搜索框
  searchBindfocus: function (e) {
    this.setData({
      isSearch: true
    })
  },
  searchInfo: function (e) {
    //从数据库获取对应的信息
    wx.request({
      url: 'http://URL',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        this.setData({

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
  search: function (e) {
    wx.redirectTo({
      url: '../showSearchContent/showSearchContent'
    })
  },
  searchPage: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  showSearch: function (e) {
    wx.redirectTo({
      url: '../showSearchContent/showSearchContent'
    })
  },
  cancelSearch: function (e) {
    this.setData({
      isSearch: false
    })
  },
  deleteHistory: function (e) {
    wx.clearStorage({
      key: 'searchHistory',
    })
    wx.showToast({
      title: '清空成功！',
      icon: 'success',
      duration: 1000
    })
  },
  onReachBottom: function (e) {
    var that = this
    console.log('scroll-down:', e)
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 8000)
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/get_more/' + this.data.contentInfo.length,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log('more', res.data)
        console.log('before', that.data.contentInfo)
        var tmp_info = that.data.contentInfo
        for (var i in res.data.data) {
          // console.log('more-item', i)
          tmp_info.push(res.data.data[i])
        }
        that.setData({
          contentInfo: tmp_info
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
        wx.hideLoading()
        console.log('complete', that.data.contentInfo)
        console.log('windowHeight', )
        wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
      }
    })
  },
  previewImage:function(e){
    var that=this

    var i=0
    var pictureUrl=[]
    var sIndex=e.currentTarget.dataset.sindex
    var index=e.currentTarget.dataset.index
    var pictures=this.data.contentInfo[sIndex].images[index].md5

    for(i;i<this.data.contentInfo[sIndex].images.length;i++)
    {
           pictureUrl.push(this.data.contentInfo[sIndex].images[i].md5)
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
