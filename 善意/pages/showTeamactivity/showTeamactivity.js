var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data:{
    userInfo: {},                     //用户信息
    thumb:'666',                      //赞的个数
    state:'进行中',
    stateValue:0,
//想要用statevalue判断活动的状态，从而改变css样式。
    stateColor:'#20BF55',
    label:'这里是他们的口号或者理念',   //口号或理念
    intro:'这是他们的社团简介我猜测可能会长一些足够长了吗应该够长了吧。',                         //社团简介
    entries: app.globalData.api.data,
                                      //轮播图地址
   imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492865516973&di=4096470fd64eaa806f9413700d090b98&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2Fb2%2F3c%2F3%2F8e754b39d0a794a79c14c1ec6d2_p1_mk1.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492924988385&di=230743c823d07ccbaab6103a953ea6cf&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160511%2Ffa8f4a8318504374812b91e19c661816_th.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492865686634&di=f6cd566648132ff11571e04900a90cd5&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F13%2F34%2F01%2F61b1OOOPIC36.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    winWidth: 0,  
    winHeight: 0,  
    currentTab: 0,                  //tab切换  
  },  
onLoad: function() {  
var that = this;  

wx.getStorage({                 //赞数
  key: 'thumb',
  success: function(res) {
    that.setData({
      thumb:res.data
  })
} 
}),

wx.getStorage({                 //社团简介
  key: 'label',
  success: function(res){
    that.setData({
      intro:res.data
    })
  }
}),
// wx.getStorage({                     //状态栏颜色
//   key: 'stateValue',
//   success: function(res){
//     if(res.stateValue==0){
//       that.setData({
//         stateColor: '#20BF55'
//       })
//     }
//   } 
// }),
app.getUserInfo(function(userInfo){
  that.setData({                        //用户信息
    userInfo:userInfo
  })
}), 

wx.request({                            //跳转
  success (res) {
    that.setData({
      banner: res.data.top_stories,
      list: [{ header: '精彩活动' }].concat(res.data.stories)
    })
  }
}),

this.index = 1,

wx.getSystemInfo({  
  success: function( res ) {  
    that.setData( {  
      winWidth: res.windowWidth,  
      winHeight: res.windowHeight  
    });  
  }  
});  

}, 

bindChange: function( e ) {          //滑动切换tab
  var that = this;  
  that.setData( { currentTab: e.detail.current });  
},  

swichNav: function( e ) {          //点击切换tab
  var that = this;  
  if( this.data.currentTab === e.target.dataset.current ) return false;
  else {  
    that.setData( {  
    currentTab: e.target.dataset.current  
    })  
  }  
},  

  // 监听页面初次渲染完成
  onReady () {
    console.log('Index Page: onReady.')
  },
  // 监听页面显示
  onShow () {
    console.log('Index Page: onShow.')
  },
  // 监听页面隐藏
  onHide () {
    console.log('Index Page: onHide.')
  },
  // 监听页面卸载
  onUnload () {
    console.log('Index Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh () {
    console.info('Index Page: onPullDownRefresh.')
  },
                  
  touchEntry (e) {                     // 跳转详情页
    wx.navigateTo({
      url: '../home/home?index=' + e.currentTarget.dataset.index
    })
  }
})