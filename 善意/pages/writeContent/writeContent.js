//【发表动态界面】logs.js
var util = require('../../utils/util.js')
const qiniuUploader = require("../../utils/qiniuUploader");

function initQiniu() {
  var options = {
    region: 'SCN', // 华北区
    uptokenFunc: function () { return 'zxxxzaqdf'; },
    domain: 'http://oo4l2ezdu.bkt.clouddn.com',
    uploadURL: 'https://up-z2.qbox.me',
    uptokenURL: 'https://www.shananchuanmei.com/shanyi/wx/api/uptoken',
  };
  qiniuUploader.init(options);
}

Page({
  data: {
    //动态内容列表
    contentInfo: [{
      userInfo: {},
      time: '',
      content: '',
      imageList: [],
    }],
    urls: []
  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },
  //点击按钮显示出来的三个选项的列表
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册选取', '拍照'],
      itemColor: "blue",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.pictures('album')
          } else if (res.tapIndex == 1) {
            that.pictures('camera')
          }
        }
      }
    })
  },
  //发布失败提示
  submit_error: function () {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '发布失败',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //选取照片的功能
  pictures: function (type) {
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // console.log(res);
        that.setData({
          imageList: res.tempFilePaths,
        })
      },
      fail: function () {
        console.log('选取失败！');
      },
      complete: function () {
        // complete
      }
    })
  },

  sendImage: function (imageList, i, length, uptokens, tmp_mid) {
    // console.log(res.data)
    var that = this
    // console.log(imageList, i, length, uptokens, tmp_mid)
    qiniuUploader.upload(imageList[i], (obj) => {
      this.data.urls.push(obj.imageURL)
      wx.request({
        url: 'https://www.shananchuanmei.com/shanyi/wx/moment/add_image',
        data: {
          mid: tmp_mid,
          md5: obj.key
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
          i++
          // console.log(cnt, length)
          if (i == length) {
            wx.hideLoading()
            console.log('发布成功')
            // wx.navigateTo({
            //   url: '../community/community',
            // })
            wx.reLaunch({
              url: '/pages/community/community?tmp_mid=' + tmp_mid,
            })
          } else {
            // console.log(this)
            that.sendImage(imageList, i, length, uptokens, tmp_mid)
          }
        }
      })
    }, (error) => {
      console.log('error: ', error);
    }, {
        uploadURL: 'https://up-z2.qbox.me',
        domain: 'http://oo4l2ezdu.bkt.clouddn.com',
        uptoken: uptokens[imageList[i]],
      })
  },

  //获取输入的内容和图片地址并存入数据库
  // textblur: function (e) {
  // },
  //点击发表按钮跳转到社区界面
  submit: function (e) {
    // initQiniu();
    wx.showLoading({
      title: '发布中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 8000)
    var that = this;
    //     wx.switchTab({
    //     url: '../community/community'
    //  })
    // console.log(e.detail.value.textarea, wx.getStorageSync('open_id'))
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/moment/create',
      data: {
        content: e.detail.value.textarea,
        openId: wx.getStorageSync('open_id'),
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        // console.log(res.data)
        var tmp_mid = res.data.data
        if (that.data.imageList) {
          wx.request({
            url: 'https://www.shananchuanmei.com/shanyi/wx/api/uptoken',
            data: that.data.imageList
            ,
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              var i = 0
              var length = that.data.imageList.length
              that.sendImage(that.data.imageList, i, length, res.data, tmp_mid)

            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        }
        else {
          wx.reLaunch({
            url: '/pages/community/community?tmp_mid=' + tmp_mid,
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
  chooselocation:function(e){
    var that=this
    wx.chooseLocation({
      success: function(res){
        // success
        // console.log(res)
        that.setData({
          name:res.name
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
