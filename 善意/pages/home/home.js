var app = getApp()
Page({
  data: {
    item: {},
    attachments: {},
    footnotes: {},
    navbar: ['活动', '团队'], 
    currentTab: 0,
    team:{}
  },
  // 监听页面加载
  onLoad: function (options) {
    console.log('Entry Page: onLoad.')
    // 提取当前词条数据
    var entryData = app.globalData.api.data[Number(options.index)]
   app.getUserInfo(function(teamInfo){
      //更新数据
      that.setData({
        teamInfo:teamInfo
      })
    })
    console.dir(entryData)
    // 设定数据
    this.setData({
      item: entryData,
      attachments: entryData.attachments,
      footnotes: entryData.footnotes
    }),
    // 设定导航栏标题
    wx.setNavigationBarTitle({
      title: entryData.title
    })
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx  
       })
    },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../writeContent/writeContent'
    })
  },
})
