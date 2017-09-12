// pages/Mine/Mine.js
var common = require("../../utils/comm.js");
Page({
  // 页面的初始数据
  data: {
    navData: [{
      _src: "../img/home_icon_home.png",
      hover_src: "../img/home_icon_home.png",
      url: "../index/index",
      hoverIcon: true
    },{
      _src: "../img/home_icon.png",
      hover_src: "../img/home_icon_hover.png",
      url: "../Mine/Mine",
      hoverIcon: true
    }, {
      _src: "../img/home_dog.png",
      hover_src: "../img/home_dog_hover.png",
      url: "../rescueMe/rescueMe",
      hoverIcon: false
    }]
  },

  // 生命周期函数--监听页面加载
  onLoad: function(options) {

  },

  // 切换导航
  checkNav: function(ev) {
    console.log(ev);
    var that = this;
    var index = ev.currentTarget.dataset.inx;
    var _url = "";
    var navData = that.data.navData;
    var persionInfo = that.data.persionInfo;
    var dogfood = persionInfo.dog_food;
    var be_rescued_num = persionInfo.be_rescued_num;
    for (var i = 0; i < navData.length; i++) {
      navData[i].hoverIcon = false;
      navData[index].hoverIcon = true;
      _url = navData[index].url;
    };
    console.log(_url);
    that.setData({
      navData: navData
    });
    wx.redirectTo({
      url: _url +"?dogfood="+dogfood+"&be_rescued_num="+be_rescued_num
    })
  },

  // 修改资料
  editInfo:function(ev){
    console.log(ev);
    var status = wx.getStorageSync("status");
    if (status=="1") {
      wx.navigateTo({
       url: '../ModifyData/ModifyData'
      })
    }else {
      common.getUser();
    }

  },

  // 查看单身狗
  toSeeDog: function() {
    wx.navigateTo({
      url: '../myRescue/myRescue?frompage=Mine'
    })
  },

  // 购买狗粮
  buyDogFood: function() {
    wx.navigateTo({
      url: '../Store/Store'
    })
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function() {

  },

// 查看二维码
  prewQrCode:function(){
    var that = this;
    var code = that.data.persionInfo.qrcode;
    wx.previewImage({
    current:code , // 当前显示图片的http链接
    urls: [code] // 需要预览的图片http链接列表
    })
  },

  // prewPhoto
prewPhoto:function(ev){
   console.log(ev);
   var that = this;
   var _src = ev.currentTarget.dataset.src;
   var _srcArr = that.data.persionInfo.photo;
   wx.previewImage({
   current: _src,
   urls: _srcArr
 })
},

  // 生命周期函数--监听页面显示
  onShow: function() {
    var that = this;
    var avatarUrl = wx.getStorageSync('avatarUrl');
    var nickName = wx.getStorageSync("nickName");
    console.log("nickName",nickName);
    var sign = wx.getStorageSync("sign");
    wx.request({
      url:'https://single-dog.playonwechat.com/api/get-userinfo?sign='+sign,
      success(res){
        console.log(res);
        var persionInfo = res.data.data;
        if (persionInfo.sex==1) {
           persionInfo.sex = "男"
        }else{
          persionInfo.sex = "女"
        }
        console.log(persionInfo.education);
        if (persionInfo.education == "0") {
          persionInfo.education = "未知"
        } else if (persionInfo.education == "1") {
          persionInfo.education = "幼儿园"
        } else if (persionInfo.education == "2") {
          persionInfo.education = "小学"
        } else if (persionInfo.education == "3") {
          persionInfo.education = "初中"
        } else if (persionInfo.education == "4") {
          persionInfo.education = "高中"
        } else if (persionInfo.education == "5") {
          persionInfo.education = "专科"
        } else if (persionInfo.education == "6") {
          persionInfo.education = "本科"
        } else if (persionInfo.education == "7") {
          persionInfo.education = "硕士"
        } else if (persionInfo.education == "8") {
          persionInfo.education = "博士"
        } else if (persionInfo.education == "9") {
          persionInfo.education = "其他"
        };
        that.setData({
          persionInfo:persionInfo
        })
      }
    })
    that.setData({
      avatarUrl: avatarUrl,
      nickName:nickName
    })
  },

  // 生命周期函数--监听页面隐藏
  onHide: function() {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function() {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function() {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {

  },

  // 用户点击右上角分享
  onShareAppMessage: function() {

  }
})
