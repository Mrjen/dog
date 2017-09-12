// pages/rescueMe/rescueMe.js
Page({
  data: {
    navData:[{
      _src:"../img/home_icon_home.png",
      hover_src:"../img/home_icon_home.png",
      url:"../index/index",
      hoverIcon:false
    },{
      _src:"../img/home_icon.png",
      hover_src:"../img/home_icon_hover.png",
      url:"../Mine/Mine",
      hoverIcon:false
    },{
      _src:"../img/home_dog.png",
      hover_src:"../img/home_dog_hover.png",
      url:"../rescueMe/rescueMe",
      hoverIcon:true
    }]
  },

  onLoad: function (options) {
    console.log("页面参数",options);
    var that = this;
    that.setData({
      foodNum:options.dogfood,
      rescueMe:options.be_rescued_num
    })
  },

  // 切换导航
checkNav:function(ev){
  var that = this;
  var index = ev.currentTarget.dataset.inx;
  var navData = that.data.navData;
  var _url = "";
  for (var i = 0; i < navData.length; i++) {
    navData[i].hoverIcon = false;
    navData[index].hoverIcon = true;
    _url = navData[index].url;
  };
  that.setData({
    navData:navData
  });
  wx.redirectTo({
    url: _url
  })
},

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    var avatarUrl = wx.getStorageSync("avatarUrl");
    var nickName = wx.getStorageSync("nickName");
    that.setData({
      avatarUrl:avatarUrl,
      nickName:nickName
    })
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})
