// pages/Notice/Notice.js
Page({
  data: {
      page:2
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
     var that = this;
     var avatarUrl = wx.getStorageSync("avatarUrl");
     var sign = wx.getStorageSync("sign");
     var logo = "https://single-dog.playonwechat.com/static/home/logo.png";
     wx.request({
       url: 'https://single-dog.playonwechat.com/api/get-notice-list?sign=' + sign,
       success(res){
         console.log(res);
         var notice = res.data.data;
         for (var i = 0; i < notice.length; i++) {
           if (notice[i].type=="1") {
              notice[i].avatarurl = logo;
              notice[i].wx_name = "有只单身狗";
           }
         }
         that.setData({
           notice:notice
         });
         console.log(notice);
       }
     })
     that.setData({
       avatarUrl:avatarUrl
     })
  },

  // 跳转
  navTo:function(ev){
    var that = this;
    var did = ev.currentTarget.dataset.did;
    var notice = that.data.notice;
    var navNum = "";
    for (var i = 0; i < notice.length; i++) {
      if (notice[i].did==did) {
         navNum = notice[i].redirect;
      }
    };
    console.log(navNum);
    if (navNum=="1") {
      wx.navigateTo({
        url: '../myRescue/myRescue?did='+did
      })
    }else if (navNum=="2") {
      wx.navigateTo({
        url: '../rescueMeList/rescueMeList?did='+did
      })
    }
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  // onShareAppMessage: function () {
  //
  // }
})
