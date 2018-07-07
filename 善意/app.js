
var api = require('api.js')

App({
  globalData: {
    api,
    appid: 'wx8be8d1fc5a00af82',
    secret: 'a5755ebf1b597d0d7b8fb2d7a8a335d7'
  },
  onLaunch: function () {
    var that = this
    console.log('onLaunch')
    var open_id = wx.getStorageSync('open_id') || ''
    var expires_in = wx.getStorageSync('expires_in') || 0
    var userInfo = wx.getStorageSync('userInfo') || {}
    console.log(!open_id, (expires_in || Date.now()) < (Date.now() + 600))
    if ((!open_id || (expires_in || Date.now()) < (Date.now() + 600))){
      console.log('begin_login')
      wx.login({
        success: function (res) {
          console.log('login', res)
          if (res.code) {
            var js_code = res.code
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                objz.city = res.userInfo.city;
                objz.gender = res.userInfo.gender;
                //console.log(objz);  
                console.log('userInfo:', objz)
                wx.setStorageSync('userInfo', objz);//存储userInfo  


                var d = that.globalData;//这里存储了appid、secret、token串   
                console.log(d)
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + js_code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  data: {},
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                  // header: {}, // 设置请求的 header    
                  success: function (res) {
                    var obj = {};
                    obj.openid = res.data.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;
                    console.log(obj);
                    wx.setStorageSync('open_id', obj.openid);
                    //存储openid                  
                    wx.setStorageSync('expires_in', obj.expires_in)

                    that.setLogin()
                  }
                })
              },fail: function(){
          console.log('login_fail', res)
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }else{
      console.log('else')
    }
  },

  setLogin: function () {
    wx.request({
      url: 'https://www.shananchuanmei.com/shanyi/wx/user/login',
      data: {
        openId: wx.getStorageSync('open_id') || '',
        city: wx.getStorageSync('userInfo').city || '',
        gender: wx.getStorageSync('userInfo').gender || '',
        nickName: wx.getStorageSync('userInfo').nickName || '',
        avatarUrl: wx.getStorageSync('userInfo').avatarUrl || ''
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data.status) {
          console.log('success login')
        } else {
          console.log('failed login')
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

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
})
//调用API从本地缓存中获取数据

