// pages/chooseLabel/chooseLabel.js
Page({
  data:{
    label:[{
      labelValue:'叫我红领巾'},
      {labelValue:'有我护你成长'},
      {labelValue:'把爱心献出来'},
      {labelValue:'头顶一片蓝色天空'},
      {labelValue:'想要一颗绿色的地球'},
      {labelValue:'路边野花我不踩'},
      {labelValue:'拥抱绿色生活'
      }],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  //选择标签
  chooselabel:function(e){
    wx.setStorage({
      key: 'label',
      data: e.detail.value,
    })
  },
  //提交选择的标签
submit:function(e){
  wx.switchTab({
    url:'../person/person'
  })
},
back:function(e){
 wx.switchTab({
    url:'../person/person'
  })
}
})